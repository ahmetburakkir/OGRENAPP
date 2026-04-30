import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Briefcase, ArrowLeft, CheckCircle2, ArrowRight, RotateCcw, Target, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getTests, getTestById, submitTest, generateRecommendation, TestDto, SubmitAnswerDto, AiRecommendationDto } from '../../shared/api/client';

const JobPrepTest: React.FC = () => {
  const navigate = useNavigate();
  const { token, userId } = useAuth();
  
  const [testData, setTestData] = useState<TestDto | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState<SubmitAnswerDto[]>([]);
  
  const [isFinished, setIsFinished] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState<AiRecommendationDto | null>(null);

  useEffect(() => {
    const initTest = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const tests = await getTests(token);
        if (tests.length > 0) {
          const firstTest = await getTestById(tests[0].id, token);
          setTestData(firstTest);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    void initTest();
  }, [token]);

  const handleAnswerSelect = (optionKey: string) => {
    if (isAnswered) return;
    setSelectedAnswer(optionKey);
  };

  const submitAnswer = () => {
    if (!selectedAnswer || !testData?.questions) return;
    setIsAnswered(true);
    
    setUserAnswers(prev => [
      ...prev,
      {
        questionId: testData.questions![currentQIndex].id,
        selectedAnswer,
        rank: 1
      }
    ]);
  };

  const nextQuestion = async () => {
    if (!testData?.questions) return;

    if (currentQIndex < testData.questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      setSubmitting(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      try {
        if (!userId || !token) return;
        const submitResponse = await submitTest({
          userId,
          testId: testData.id,
          answers: [...userAnswers, { questionId: testData.questions[currentQIndex].id, selectedAnswer, rank: 1 }] // Current one wasn't added if state wasn't updated, but wait, submitAnswer adds it. Let's make sure it's in the state. 
          // Wait, userAnswers state is updated asynchronously. It's safer to use the combined array.
        }, token);

        const recommendation = await generateRecommendation(submitResponse.testResultId, token);
        setAiRecommendation(recommendation);
      } catch (err) {
        console.error(err);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setUserAnswers([]);
    setIsFinished(false);
    setAiRecommendation(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 w-full transition-colors duration-700">
         <Loader2 className="w-12 h-12 text-fuchsia-500 animate-spin" />
      </div>
    );
  }

  if (!testData || !testData.questions || testData.questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 w-full transition-colors duration-700 gap-4">
         <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Henüz uygun bir test bulunmuyor.</h2>
         <button onClick={() => navigate(-1)} className="px-6 py-2 bg-slate-200 dark:bg-slate-800 rounded-xl font-bold">Geri Dön</button>
      </div>
    );
  }

  const currentQ = testData.questions[currentQIndex];

  return (
    <div className="min-h-screen p-6 sm:p-10 w-full max-w-5xl mx-auto flex flex-col gap-6 transition-colors duration-700">
      <motion.header 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4 relative z-10"
      >
        <button 
          onClick={() => navigate('/dashboard/universite')}
          className="p-3 bg-white/40 hover:bg-white/70 dark:bg-white/5 dark:hover:bg-white/10 rounded-2xl border border-white/40 dark:border-white/10 text-slate-700 dark:text-white transition-all shadow-sm"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-indigo-600 dark:from-fuchsia-400 dark:to-indigo-400">
            {isFinished ? 'Kariyer Sentezi ve Analiz' : (testData.title || 'İşe Hazırlık Testi')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-medium text-sm sm:text-base">
            {isFinished ? 'Senin için en uygun meslek profilleri' : (testData.description || 'Mülakat senaryolarıyla soft-skill analizini yap')}
          </p>
        </div>
      </motion.header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col relative"
      >
        {!isFinished ? (
          <>
            <div className="p-6 sm:p-8 border-b border-white/40 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-3 bg-fuchsia-500/10 rounded-xl">
                  <Briefcase className="w-6 h-6 text-fuchsia-600 dark:text-fuchsia-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800 dark:text-white uppercase tracking-wider">Soru {currentQIndex + 1}</h2>
                  <p className="text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-400">
                    {currentQ.topicNames && currentQ.topicNames.length > 0 ? currentQ.topicNames.join(', ') : 'Yetkinlik Sorusu'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400">İlerleme</p>
                <p className="text-xl font-black text-slate-800 dark:text-white">{currentQIndex + 1} / {testData.questions.length}</p>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col gap-6 max-w-4xl mx-auto w-full">
              <p className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 leading-relaxed mb-4">
                {currentQ.content}
              </p>

              <div className="flex flex-col gap-4">
                {Object.entries(currentQ.options || {}).map(([key, value]) => {
                  const isSelected = selectedAnswer === key;

                  return (
                    <button
                      key={key}
                      onClick={() => handleAnswerSelect(key)}
                      disabled={isAnswered}
                      className={`p-5 rounded-2xl flex items-start gap-4 text-left border-2 transition-all ${
                        isSelected 
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 shadow-sm' 
                          : 'border-white/40 dark:border-white/5 hover:border-indigo-300 dark:hover:border-indigo-500/30 bg-white/60 dark:bg-slate-900/40'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-black border-2 ${
                        isSelected ? 'border-indigo-500 text-indigo-600' : 'border-slate-300 text-slate-500 dark:border-slate-600 dark:text-slate-400'
                      }`}>
                        {isSelected ? <CheckCircle2 className="w-5 h-5" /> : key}
                      </div>
                      <span className={`text-base font-medium leading-relaxed ${isSelected ? 'text-indigo-900 dark:text-indigo-300 font-bold' : 'text-slate-700 dark:text-slate-300'}`}>
                        {value}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-white/30 dark:bg-black/20 border-t border-white/40 dark:border-white/10 flex justify-end">
              {!isAnswered ? (
                <button 
                  onClick={submitAnswer}
                  disabled={!selectedAnswer}
                  className="px-8 py-4 bg-indigo-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all disabled:cursor-not-allowed shadow-md"
                >
                  Cevabı Onayla
                </button>
              ) : (
                <button 
                  onClick={nextQuestion}
                  className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all flex items-center gap-3 shadow-md"
                >
                  {currentQIndex < testData.questions.length - 1 ? 'Sonraki Senaryo' : 'Kariyer Analizini Gör'} <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="p-6 sm:p-10 flex flex-col items-center justify-center min-h-[500px] w-full max-w-3xl mx-auto">
            
            {submitting ? (
               <div className="flex flex-col items-center gap-6">
                 <Loader2 className="w-16 h-16 text-fuchsia-500 animate-spin" />
                 <h2 className="text-2xl font-black text-slate-800 dark:text-white text-center">Analiz Hazırlanıyor...</h2>
                 <p className="text-slate-600 dark:text-slate-400 text-center font-medium">
                   Yapay zeka verdiğin cevapları analiz ediyor ve kariyer profilini çıkarıyor.
                 </p>
               </div>
            ) : aiRecommendation ? (
              <div className="w-full">
                <div className="flex justify-center mb-8">
                  <div className="w-20 h-20 rounded-full bg-fuchsia-100 dark:bg-fuchsia-500/20 flex items-center justify-center border-4 border-fuchsia-200 dark:border-fuchsia-500/30">
                    <Target className="w-10 h-10 text-fuchsia-600 dark:text-fuchsia-400" />
                  </div>
                </div>
                
                <h2 className="text-3xl font-black text-slate-800 dark:text-white text-center mb-8">AI Kariyer Sentezi</h2>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-sm mb-12 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-[40px] pointer-events-none" />
                  <p className="text-lg text-slate-700 dark:text-slate-200 font-medium leading-relaxed whitespace-pre-wrap relative z-10">
                    {aiRecommendation.content}
                  </p>
                </motion.div>

                <div className="flex justify-center">
                  <button
                     onClick={resetQuiz}
                     className="px-8 py-4 bg-slate-100 border border-slate-300 dark:bg-white/5 dark:border-white/10 text-slate-800 dark:text-white font-bold rounded-xl flex items-center gap-3 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors shadow-sm"
                   >
                     <RotateCcw className="w-5 h-5" /> Testi Yeniden Başlat
                   </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-black text-rose-500 mb-4">Bir Hata Oluştu</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8">Analiz sonuçları alınamadı. Lütfen daha sonra tekrar dene.</p>
                <button
                   onClick={resetQuiz}
                   className="px-8 py-4 bg-slate-100 border border-slate-300 dark:bg-white/5 dark:border-white/10 text-slate-800 dark:text-white font-bold rounded-xl flex items-center gap-3 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors shadow-sm mx-auto"
                 >
                   <RotateCcw className="w-5 h-5" /> Başa Dön
                 </button>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default JobPrepTest;

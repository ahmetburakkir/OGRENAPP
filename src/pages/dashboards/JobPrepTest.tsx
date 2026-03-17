import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Briefcase, ArrowLeft, CheckCircle2, XCircle, ArrowRight, RotateCcw, Target, Users, GitBranch, LineChart, Database, Search, Network, Server, Infinity as InfinityIcon } from 'lucide-react';
import { jobPrepQuestions } from '../../data/jobPrepQuestions';

const JobPrepTest: React.FC = () => {
  const navigate = useNavigate();
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswerSelect = (optionKey: string) => {
    if (isAnswered) return;
    setSelectedAnswer(optionKey);
  };

  const submitAnswer = () => {
    if (!selectedAnswer) return;
    setIsAnswered(true);
    if (selectedAnswer === jobPrepQuestions[currentQIndex].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQIndex < jobPrepQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const resetQuiz = () => {
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCareerRecommendations = (currentScore: number) => {
    if (currentScore >= 9) {
      return {
        level: "Liderlik ve Problem Çözme Odaklı",
        message: "EQ ve iletişim becerilerin oldukça gelişmiş! İnisiyatif alma ve kriz yönetimi gerektiren roller sana çok uygun.",
        careers: [
           { id: 1, title: 'Ürün Yöneticisi (Product Manager)', desc: 'Ekip liderliği, stratejik karar alma ve yüksek iletişim becerileri gerektirir.', icon: Target, color: 'text-fuchsia-500', bg: 'bg-fuchsia-500/10' },
           { id: 2, title: 'Yazılım Ekip Lideri (Tech Lead)', desc: 'Teknik vizyon sağlama ve takımı problem çözmeye yönlendirme.', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
           { id: 3, title: 'Sistem Mimarı (System Architect)', desc: 'Geniş çaplı düşünme ve karmaşık problemleri basite indirgeme yeteneği.', icon: GitBranch, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        ]
      };
    } else if (currentScore >= 5) {
      return {
        level: "Analitik ve Süreç Odaklı",
        message: "Durumlara mantık çerçevesinde ve süreç bazlı yaklaşmayı seviyorsun. Analiz yapabileceğin ve operasyon yürüteceğin roller öne çıkıyor.",
        careers: [
           { id: 1, title: 'Veri Analisti (Data Analyst)', desc: 'Verilerden anlam çıkarma, mantıksal problem çözme ve sunum becerileri.', icon: LineChart, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
           { id: 2, title: 'Veritabanı Yöneticisi (DBA)', desc: 'Dikkatli, detaylı ve metodik çalışma alışkanlıkları gerektirir.', icon: Database, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
           { id: 3, title: 'QA & Test Mühendisi', desc: 'Sürekli öğrenme, açık iletişim ve geri bildirim kültürü odaklıdır.', icon: Search, color: 'text-orange-500', bg: 'bg-orange-500/10' },
        ]
      };
    } else {
      return {
        level: "Operasyonel ve Teknik Odaklı",
        message: "Şu an için bireysel odaklanma ve teknik derinlik gerektiren, daha kurallı alanlarda rahat edebilirsin. EQ yetkinliklerini zamanla geliştirebilirsin.",
        careers: [
           { id: 1, title: 'Network (Ağ) Uzmanı', desc: 'Kurallı operasyonları yönetme, esneklik ve altyapı sahiplenme.', icon: Network, color: 'text-blue-500', bg: 'bg-blue-500/10' },
           { id: 2, title: 'Backend Geliştirici (Core Logic)', desc: 'Odaklanmış çalışma yeteneği ve teknik çözümler üretme.', icon: Server, color: 'text-purple-500', bg: 'bg-purple-500/10' },
           { id: 3, title: 'DevOps Mühendisi', desc: 'Otomasyon tasarımında ve sürekli entegrasyonda problem çözme zihniyeti.', icon: InfinityIcon, color: 'text-rose-500', bg: 'bg-rose-500/10' },
        ]
      };
    }
  };

  const currentQ = jobPrepQuestions[currentQIndex];

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
            {isFinished ? 'Kariyer Sentezi ve Analiz' : 'İşe Hazırlık Testi'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-medium text-sm sm:text-base">
            {isFinished ? 'Senin için en uygun meslek profilleri' : 'Mülakat senaryolarıyla soft-skill analizini yap'}
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
                  <h2 className="text-lg font-bold text-slate-800 dark:text-white uppercase tracking-wider">{currentQ.competency}</h2>
                  <p className="text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-400">Yetkinlik Sorusu</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Soru</p>
                <p className="text-xl font-black text-slate-800 dark:text-white">{currentQIndex + 1} / {jobPrepQuestions.length}</p>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col gap-6 max-w-4xl mx-auto w-full">
              <p className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 leading-relaxed mb-4">
                {currentQ.question}
              </p>

              <div className="flex flex-col gap-4">
                {Object.entries(currentQ.options).map(([key, value]) => {
                  const isSelected = selectedAnswer === key;
                  const isCorrect = isAnswered && key === currentQ.correctAnswer;
                  const isWrongSelected = isAnswered && isSelected && !isCorrect;

                  return (
                    <button
                      key={key}
                      onClick={() => handleAnswerSelect(key)}
                      disabled={isAnswered}
                      className={`p-5 rounded-2xl flex items-start gap-4 text-left border-2 transition-all ${
                        isSelected && !isAnswered 
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10' 
                          : isCorrect
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 shadow-sm'
                            : isWrongSelected
                              ? 'border-rose-500 bg-rose-50 dark:bg-rose-500/10'
                              : 'border-white/40 dark:border-white/5 hover:border-indigo-300 dark:hover:border-indigo-500/30 bg-white/60 dark:bg-slate-900/40'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-black border-2 ${
                        isSelected && !isAnswered ? 'border-indigo-500 text-indigo-600' :
                        isCorrect ? 'border-emerald-500 text-emerald-600 bg-emerald-100 dark:bg-emerald-500/20' :
                        isWrongSelected ? 'border-rose-500 text-rose-600 bg-rose-100 dark:bg-rose-500/20' :
                        'border-slate-300 text-slate-500 dark:border-slate-600 dark:text-slate-400'
                      }`}>
                        {isCorrect ? <CheckCircle2 className="w-5 h-5" /> : isWrongSelected ? <XCircle className="w-5 h-5" /> : key}
                      </div>
                      <span className={`text-base font-medium leading-relaxed ${isCorrect ? 'text-emerald-900 dark:text-emerald-300 font-bold' : isWrongSelected ? 'text-rose-900 dark:text-rose-300' : 'text-slate-700 dark:text-slate-300'}`}>
                        {value}
                      </span>
                    </button>
                  )
                })}
              </div>

              <AnimatePresence>
                {isAnswered && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 p-6 rounded-2xl overflow-hidden mt-4"
                  >
                    <h4 className="flex items-center gap-2 font-bold text-indigo-800 dark:text-indigo-300 mb-3 text-lg">
                      📌 Eğitmenin Notu: {selectedAnswer === currentQ.correctAnswer ? 'Mükemmel Seçim!' : 'Biraz Daha Düşünelim'}
                    </h4>
                    <p className="text-base text-indigo-900/80 dark:text-indigo-200/80 leading-relaxed font-medium">
                      {currentQ.explanation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-6 sm:p-8 bg-white/30 dark:bg-black/20 border-t border-white/40 dark:border-white/10 flex justify-end">
              {!isAnswered ? (
                <button 
                  onClick={submitAnswer}
                  disabled={!selectedAnswer}
                  className="px-8 py-4 bg-indigo-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all disabled:cursor-not-allowed shadow-md"
                >
                  Cevabı Gönder
                </button>
              ) : (
                <button 
                  onClick={nextQuestion}
                  className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all flex items-center gap-3 shadow-md"
                >
                  {currentQIndex < jobPrepQuestions.length - 1 ? 'Sonraki Senaryo' : 'Kariyer Analizini Gör'} <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="p-6 sm:p-10 flex flex-col items-center justify-center min-h-[500px] w-full max-w-3xl mx-auto">
            <div className="w-24 h-24 rounded-full bg-fuchsia-100 dark:bg-fuchsia-500/20 flex items-center justify-center border-4 border-fuchsia-200 dark:border-fuchsia-500/30 mb-8">
              <span className="text-4xl font-black text-fuchsia-600 dark:text-fuchsia-400">{score}</span>
            </div>
            
            <h2 className="text-3xl font-black text-slate-800 dark:text-white text-center mb-4">Profilin: {getCareerRecommendations(score).level}</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 text-center font-medium max-w-xl mb-12">
              {getCareerRecommendations(score).message}
            </p>

            <div className="w-full">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-4">
                <Target className="w-6 h-6 text-indigo-500" /> Sana En Uygun Kariyer Hedefleri
              </h3>
              
              <div className="space-y-4">
                {getCareerRecommendations(score).careers.map((career, index) => {
                  const CareerIcon = career.icon;
                  return (
                    <motion.div 
                      key={career.id} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 flex items-center gap-6 group hover:border-indigo-400 dark:hover:border-indigo-500 transition-all"
                    >
                      <div className={`w-16 h-16 rounded-2xl ${career.bg} ${career.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <CareerIcon className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-sm font-black px-2.5 py-0.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">#{index + 1}</span>
                          <h4 className="text-lg font-bold text-slate-800 dark:text-white">{career.title}</h4>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 font-medium">{career.desc}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            <button
               onClick={resetQuiz}
               className="mt-12 px-8 py-4 bg-slate-100 border border-slate-300 dark:bg-white/5 dark:border-white/10 text-slate-800 dark:text-white font-bold rounded-xl flex items-center gap-3 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors shadow-sm"
             >
               <RotateCcw className="w-5 h-5" /> Testi Yeniden Başlat
             </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default JobPrepTest;

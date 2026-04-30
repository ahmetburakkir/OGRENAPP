import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { generateRecommendation, getTestById, getTests, submitTest } from '../../shared/api/client';
import { ApiError } from '../../shared/api/http';

interface QuestionOption {
  label: string;
}

interface QuestionModel {
  id: string;
  questionText: string | undefined;
  answerType: string | undefined;
  options: QuestionOption[];
}

const KarakterTesti: React.FC = () => {
  const navigate = useNavigate();
  const { token, userId } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<QuestionModel[]>([]);
  const [testId, setTestId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const parseOptions = (value: Record<string, string> | undefined): QuestionOption[] => {
    if (!value) return [];
    return Object.values(value).map(v => ({ label: v }));
  };

  useEffect(() => {
    const loadTest = async () => {
      if (!token) {
        setError('Oturum bulunamadı. Lütfen tekrar giriş yap.');
        setLoading(false);
        return;
      }

      try {
        const tests = await getTests(token);
        if (!tests.length) {
          setError('Sistemde aktif test bulunamadı.');
          setLoading(false);
          return;
        }

        const selectedTestId = tests[0].id;
        const detail = await getTestById(selectedTestId, token);
        const preparedQuestions = (detail.questions || []).map((item) => ({
          id: item.id,
          questionText: item.content,
          answerType: item.answerType,
          options:
            item.answerType === 'scale'
              ? ['1', '2', '3', '4', '5'].map((label) => ({ label }))
              : parseOptions(item.options),
        }));

        setTestId(selectedTestId);
        setQuestions(preparedQuestions);
      } catch (err) {
        const message = err instanceof ApiError ? err.message : 'Test verileri yüklenemedi.';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    void loadTest();
  }, [token]);

  const handleAnswer = (value: string) => {
    const question = questions[currentQuestion];
    if (!question) return;
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const progress = useMemo(() => {
    if (!questions.length) return 0;
    return ((currentQuestion + (isFinished ? 1 : 0)) / questions.length) * 100;
  }, [currentQuestion, isFinished, questions.length]);

  const submitToBackend = async () => {
    if (!token || !userId || !testId) {
      setError('Submit için gerekli kimlik bilgisi eksik.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const payloadAnswers = questions.map((question) => ({
        questionId: question.id,
        selectedAnswer: answers[question.id] ?? '',
        rank: 0,
      }));

      const submitResult = await submitTest(
        {
          userId,
          testId,
          answers: payloadAnswers,
        },
        token,
      );

      const recommendationResult = await generateRecommendation(submitResult.testResultId, token);
      setRecommendation(recommendationResult.content || null);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Sonuçlar backend\'e kaydedilemedi.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isFinished) {
      return;
    }
    if (recommendation || submitting) {
      return;
    }
    void submitToBackend();
  }, [isFinished, recommendation, submitting]);

  if (loading) {
    return (
      <div className="min-h-screen p-6 sm:p-10 w-full max-w-4xl mx-auto flex items-center justify-center">
        <p className="text-slate-700 dark:text-slate-300 font-semibold">Test verileri yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 sm:p-10 w-full max-w-4xl mx-auto flex flex-col gap-8 pb-32 sm:pb-10 transition-colors duration-700">
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 relative z-10"
      >
        <button 
          onClick={() => navigate('/dashboard/lise')}
          className="p-3 bg-white/60 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 rounded-2xl transition-colors text-slate-800 dark:text-white shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600 dark:from-purple-400 dark:to-fuchsia-300">
            Karakter Analizi Testi
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Kendini keşfetmeye hazır mısın?</p>
        </div>
      </motion.header>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-white/5 rounded-full h-2 relative z-10 border border-slate-300 dark:border-white/10 overflow-hidden shadow-sm">
        <motion.div 
          className="h-full bg-gradient-to-r from-fuchsia-500 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Quiz Container */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-2xl bg-white/60 dark:bg-white/10 backdrop-blur-2xl border border-white/60 dark:border-white/20 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col gap-8 relative overflow-hidden transition-colors"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-fuchsia-400/20 dark:bg-fuchsia-500/10 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="flex flex-col gap-2 text-center relative z-10">
                <span className="text-fuchsia-600 dark:text-fuchsia-400 font-bold uppercase tracking-widest text-xs">
                  Soru {currentQuestion + 1} / {questions.length}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white leading-tight">
                  {questions[currentQuestion]?.questionText}
                </h2>
              </div>

              <div className="flex flex-col gap-4 mt-6 relative z-10">
                {(questions[currentQuestion]?.options ?? []).map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option.label)}
                    className="w-full text-left p-6 bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-purple-500/20 border border-slate-300 dark:border-white/10 hover:border-purple-400 dark:hover:border-purple-500/50 rounded-2xl text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-all group flex items-center justify-between shadow-sm"
                  >
                    <span className="text-lg font-bold">{option.label}</span>
                    <div className="w-8 h-8 rounded-full border-2 border-slate-400 dark:border-white/20 group-hover:border-purple-500 dark:group-hover:border-purple-400 flex items-center justify-center transition-colors">
                      <span className="text-transparent group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">●</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-2xl bg-gradient-to-br from-purple-100/80 to-fuchsia-100/80 dark:from-purple-900/40 dark:to-fuchsia-900/20 backdrop-blur-2xl border border-fuchsia-300 dark:border-fuchsia-500/30 rounded-3xl p-10 text-center shadow-2xl flex flex-col items-center gap-6 transition-colors"
            >
              <div className="w-20 h-20 bg-fuchsia-500/10 dark:bg-fuchsia-500/20 rounded-full flex items-center justify-center border border-fuchsia-400 dark:border-fuchsia-500/50 shadow-sm">
                <Sparkles className="w-10 h-10 text-fuchsia-600 dark:text-fuchsia-400" />
              </div>
              <h2 className="text-3xl font-black text-slate-800 dark:text-white">Analiz Tamamlandı!</h2>
              {submitting && <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed font-medium">Cevapların kaydediliyor ve AI önerisi hazırlanıyor...</p>}
              {error && <p className="text-rose-600 dark:text-rose-400 text-lg leading-relaxed font-semibold">{error}</p>}
              {!submitting && !error && recommendation && (
                <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed font-medium">{recommendation}</p>
              )}
              <button 
                onClick={() => navigate('/dashboard/lise')}
                className="mt-4 px-8 py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 dark:from-fuchsia-500 dark:to-purple-500 hover:from-fuchsia-500 hover:to-purple-500 dark:hover:from-fuchsia-400 dark:hover:to-purple-400 text-white rounded-2xl font-bold transition-all shadow-lg shadow-fuchsia-500/25 flex items-center gap-2"
              >
                Sonuçları Göster
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};

export default KarakterTesti;

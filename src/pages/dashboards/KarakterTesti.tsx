import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';

const quizQuestions = [
  {
    id: 1,
    text: "Bir problemle karşılaştığında nasıl yaklaşırsın?",
    options: [
      { text: "Tüm detayları analiz ederek plan yaparım", trait: "Analitik Düşünme" },
      { text: "Farklı ve alışılmadık çözümler ararım", trait: "Yaratıcılık" }
    ]
  },
  {
    id: 2,
    text: "Grup çalışmalarında genellikle hangi rolü üstlenirsin?",
    options: [
      { text: "İnsanları organize eder ve iletişimi sağlarım", trait: "Sosyal Zeka" },
      { text: "Fikirlerimi savunur ve grubu yönlendiririm", trait: "İkna Kabiliyeti" }
    ]
  },
  {
    id: 3,
    text: "Çalışma ortamında senin için en önemlisi nedir?",
    options: [
      { text: "Her şeyin düzenli ve eksiksiz olması", trait: "Detay Odaklılık" },
      { text: "Sürekli yeni şeyler öğrenebileceğim dinamik bir yapı", trait: "Yaratıcılık" }
    ]
  }
];

const KarakterTesti: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (trait: string) => {
    setAnswers({ ...answers, [currentQuestion]: trait });
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const progress = ((currentQuestion + (isFinished ? 1 : 0)) / quizQuestions.length) * 100;

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
                  Soru {currentQuestion + 1} / {quizQuestions.length}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white leading-tight">
                  {quizQuestions[currentQuestion].text}
                </h2>
              </div>

              <div className="flex flex-col gap-4 mt-6 relative z-10">
                {quizQuestions[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option.trait)}
                    className="w-full text-left p-6 bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-purple-500/20 border border-slate-300 dark:border-white/10 hover:border-purple-400 dark:hover:border-purple-500/50 rounded-2xl text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-all group flex items-center justify-between shadow-sm"
                  >
                    <span className="text-lg font-bold">{option.text}</span>
                    <div className="w-8 h-8 rounded-full border-2 border-slate-400 dark:border-white/20 group-hover:border-purple-500 dark:group-hover:border-purple-400 flex items-center justify-center transition-colors">
                       <Check className="w-4 h-4 text-transparent group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
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
              <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed font-medium">
                Verdiğin cevaplara göre profilini güncelledik. Artık Lise modülünde sana en uygun bölümleri daha isabetli önerebiliriz.
              </p>
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

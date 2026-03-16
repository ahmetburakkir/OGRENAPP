import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Flame, Target, Star, CheckCircle2, ChevronRight, BrainCircuit, Play } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock Data
const stats = {
  xp: 0,
  level: 1,
  streak: 0,
  completedModules: 0,
  nextLevelXp: 100
};

const achievements = [
  { id: 1, title: 'İlk Adım', desc: 'Sisteme kayıt oldun.', icon: Star, unlocked: true, color: 'text-yellow-500 dark:text-yellow-400', bg: 'bg-yellow-500/10 dark:bg-yellow-500/20' },
  { id: 2, title: 'Ateşli Öğrenci', desc: '7 günlük seriye ulaştın.', icon: Flame, unlocked: false, color: 'text-slate-400 dark:text-slate-500', bg: 'bg-slate-200 dark:bg-slate-800' },
  { id: 3, title: 'Mülakat Avcısı', desc: 'İlk teknik mülakat simülasyonunu bitirdin.', icon: Target, unlocked: false, color: 'text-slate-400 dark:text-slate-500', bg: 'bg-slate-200 dark:bg-slate-800' },
  { id: 4, title: 'Bölüm Uzmanı', desc: 'Lise modülündeki tüm eşleşmeleri inceledin.', icon: CheckCircle2, unlocked: false, color: 'text-slate-400 dark:text-slate-500', bg: 'bg-slate-200 dark:bg-slate-800' },
  { id: 5, title: 'Bilgi Küpü', desc: '30 Günlük Genel Kültür testini tam puanla geçtin.', icon: BrainCircuit, unlocked: false, color: 'text-slate-400 dark:text-slate-500', bg: 'bg-slate-200 dark:bg-slate-800' },
];

const dailyQuizQuestions = [
  {
    q: "Dünyanın en derin noktası olan Mariana Çukuru hangi okyanustadır?",
    options: ["Atlas Okyanusu", "Hint Okyanusu", "Pasifik Okyanusu", "Arktik Okyanusu"],
    answer: 2
  },
  {
    q: "Hangi elementin kimyasal sembolü 'Fe'dir?",
    options: ["Fosfor", "Demir", "Flor", "Fransiyum"],
    answer: 1
  },
  {
    q: "Ünlü 'Yıldızlı Gece' tablosu hangi ressama aittir?",
    options: ["Pablo Picasso", "Claude Monet", "Vincent van Gogh", "Salvador Dali"],
    answer: 2
  }
];

const ProgressDashboard: React.FC = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [earnedXp, setEarnedXp] = useState(0);

  const handleOptionSelect = (idx: number) => {
    if (selectedOption !== null) return; // Prevent multiple clicks
    setSelectedOption(idx);
    
    setTimeout(() => {
      if (idx === dailyQuizQuestions[currentQIndex].answer) {
        setQuizScore(prev => prev + 1);
        setEarnedXp(prev => prev + 50); // 50 XP per correct answer
      }

      if (currentQIndex < dailyQuizQuestions.length - 1) {
        setCurrentQIndex(prev => prev + 1);
        setSelectedOption(null);
      } else {
        setQuizFinished(true);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen p-6 sm:p-10 w-full max-w-7xl mx-auto flex flex-col gap-8 pb-32 sm:pb-10 transition-colors duration-700">
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 w-fit text-sm font-bold shadow-sm">
          <Trophy className="w-4 h-4" />
          Kişisel Gelişim Haritası
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-500 dark:from-emerald-400 dark:to-cyan-300">
          Gelişim Sayfası
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">XP kazan, serini koru ve yeni başarımların kilitlerini aç!</p>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 w-full">
        
        {/* Left Column: Stats & Next Goal */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* Main XP Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-2xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-[50px] pointer-events-none group-hover:bg-emerald-500/20 transition-colors" />
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider font-bold mb-1">Mevcut Seviye</p>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-black text-slate-800 dark:text-white">{stats.level}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold mb-1">Lv</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="space-y-2 relative z-10">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-slate-700 dark:text-slate-300">Toplam XP</span>
                <span className="text-emerald-600 dark:text-emerald-400">{stats.xp + earnedXp} / {stats.nextLevelXp}</span>
              </div>
              <div className="h-3 w-full bg-slate-200 dark:bg-black/40 rounded-full border border-white/40 dark:border-white/5 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${((stats.xp + earnedXp) / stats.nextLevelXp) * 100}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full shadow-sm"
                />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-500 text-right mt-1 font-medium">Sonraki seviyeye {stats.nextLevelXp - (stats.xp + earnedXp)} XP kaldı</p>
            </div>
          </motion.div>

          {/* Micro Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center text-center group hover:bg-white/80 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-xl"
            >
              <Flame className="w-8 h-8 text-orange-500 dark:text-orange-400 mb-2 group-hover:scale-110 transition-transform drop-shadow-sm" />
              <span className="text-2xl font-black text-slate-800 dark:text-white">{stats.streak}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1 font-bold">GÜNLÜK SERİ</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center text-center group hover:bg-white/80 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-xl"
            >
              <Trophy className="w-8 h-8 text-purple-500 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform drop-shadow-sm" />
              <span className="text-2xl font-black text-slate-800 dark:text-white">{stats.completedModules}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1 font-bold">MODÜL BİTTİ</span>
            </motion.div>
          </div>

        </div>

        {/* Middle/Right Column: Daily Quiz & Achievements */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Daily General Knowledge Quiz Module */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-indigo-50/80 to-blue-50/80 dark:from-indigo-900/40 dark:to-blue-900/20 backdrop-blur-xl border border-indigo-200 dark:border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-[0_0_30px_rgba(79,70,229,0.15)] relative overflow-hidden transition-colors"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="p-3 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-xl">
                <BrainCircuit className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Günlük Genel Kültür Testi</h2>
                <p className="text-sm text-slate-600 dark:text-indigo-200 font-medium">Her gün 3 soru, ekstra XP kazanma şansı!</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!quizStarted && !quizFinished && (
                <motion.div 
                  key="start"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col sm:flex-row items-center justify-between bg-white/60 dark:bg-black/30 rounded-2xl p-6 border border-slate-300 dark:border-white/5 relative z-10 shadow-sm"
                >
                  <p className="text-slate-700 dark:text-slate-300 mb-4 sm:mb-0 font-medium">Bugünün testini çözerek <strong className="text-indigo-600 dark:text-indigo-400">+150 XP'ye</strong> kadar kazanabilirsin.</p>
                  <button 
                    onClick={() => setQuizStarted(true)}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-indigo-500/25 whitespace-nowrap"
                  >
                    <Play className="w-4 h-4 fill-current" /> Teste Başla
                  </button>
                </motion.div>
              )}

              {quizStarted && !quizFinished && (
                <motion.div 
                  key="quiz"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="bg-white/60 dark:bg-black/30 rounded-2xl p-6 sm:p-8 border border-white/80 dark:border-white/5 relative z-10 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-6 text-sm font-bold text-slate-500 dark:text-slate-400">
                    <span>Soru {currentQIndex + 1} / {dailyQuizQuestions.length}</span>
                    <span className="text-indigo-600 dark:text-indigo-400">Puan: {quizScore * 50} XP</span>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl text-slate-800 dark:text-white font-black mb-6 leading-relaxed">
                    {dailyQuizQuestions[currentQIndex].q}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {dailyQuizQuestions[currentQIndex].options.map((opt, idx) => {
                      const isSelected = selectedOption === idx;
                      const isCorrect = idx === dailyQuizQuestions[currentQIndex].answer;
                      const isWrongSelected = isSelected && !isCorrect;
                      const isCorrectRevealed = selectedOption !== null && isCorrect;

                      return (
                        <button
                          key={idx}
                          onClick={() => handleOptionSelect(idx)}
                          disabled={selectedOption !== null}
                          className={cn(
                            "p-4 rounded-xl text-left font-bold transition-all duration-300 border shadow-sm",
                            selectedOption === null ? "bg-white/80 dark:bg-white/5 border-slate-300 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 hover:border-indigo-400/50 text-slate-700 dark:text-slate-200" : "",
                            isWrongSelected ? "bg-red-500/20 border-red-500/50 text-red-700 dark:text-red-200" : "",
                            isCorrectRevealed ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-700 dark:text-emerald-200" : "",
                            (!isSelected && !isCorrectRevealed && selectedOption !== null) ? "opacity-50 bg-slate-200 dark:bg-white/5 border-slate-300 dark:border-white/5 text-slate-500" : ""
                          )}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {quizFinished && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center bg-white/60 dark:bg-black/30 rounded-2xl p-8 border border-emerald-500/30 relative z-10 shadow-sm"
                >
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Test Tamamlandı!</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6 font-medium"> {dailyQuizQuestions.length} sorudan {quizScore} tanesini doğru bildin.</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold rounded-lg border border-emerald-500/30">
                    +{quizScore * 50} XP Kazandın
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Achievements Container */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-2xl transition-colors"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Trophy className="text-fuchsia-600 dark:text-fuchsia-400" /> Başarımlar & Rozetler
              </h2>
              <button className="text-sm text-fuchsia-600 dark:text-fuchsia-400 hover:text-fuchsia-500 font-bold flex items-center gap-1 transition-colors">
                Tümünü Gör <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              {achievements.map((ach) => {
                const Icon = ach.icon;
                return (
                  <div 
                    key={ach.id} 
                    className={cn(
                      "flex items-start gap-4 p-4 rounded-2xl border transition-all shadow-sm",
                      ach.unlocked 
                        ? "bg-white/80 dark:bg-white/5 border-slate-300 dark:border-white/10 hover:bg-white dark:hover:bg-white/10" 
                        : "bg-slate-200 dark:bg-black/20 border-transparent opacity-60 grayscale hover:grayscale-0"
                    )}
                  >
                    <div className={cn("p-3 rounded-xl shrink-0 transition-colors", ach.unlocked ? ach.bg : "bg-slate-300 dark:bg-white/5")}>
                      <Icon className={cn("w-6 h-6", ach.unlocked ? ach.color : "text-slate-500")} />
                    </div>
                    <div>
                      <h4 className={cn("font-bold text-sm sm:text-base mb-1", ach.unlocked ? "text-slate-800 dark:text-white" : "text-slate-500 dark:text-slate-400")}>
                        {ach.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        {ach.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;

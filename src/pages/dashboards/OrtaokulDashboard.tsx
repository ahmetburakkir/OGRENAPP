import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookMarked, CheckCircle2, TrendingUp, HelpCircle, ArrowUpRight, ChevronRight, ChevronLeft, Target, Activity, Users, MonitorPlay, BrainCircuit } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock Data
const studyTasks = [
  { id: 1, title: 'Matematik: Çarpanlar ve Katlar', time: '45 dk', completed: false },
  { id: 2, title: 'Türkçe: Paragrafta Anlam Soru Çözümü', time: '30 dk', completed: false },
  { id: 3, title: 'Fen: Günlük Tekrar Okuması', time: '20 dk', completed: false },
];

const softSkillsTasks = [
  { id: 4, title: 'Bir Takım Sporu Oyna (Basketbol vb.)', icon: Users, completed: false, xp: 50 },
  { id: 5, title: 'Kodlama Eğitimi Videosu İzle', icon: MonitorPlay, completed: false, xp: 100 },
  { id: 6, title: '30 Sayfa Roman Oku', icon: BookMarked, completed: false, xp: 30 },
];

const futureProfessions = [
  {
    title: "Veri Analisti",
    desc: "Şirketlerin karar almasını kolaylaştırmak için devasa verileri inceler ve anlamlı sonuçlar çıkarır.",
    tools: ["Python", "SQL", "Excel"],
    icon: Activity
  },
  {
    title: "Yapay Zeka Mühendisi",
    desc: "Makinelerin tıpkı insanlar gibi öğrenmesini ve düşünmesini sağlayan algoritmalar geliştirir.",
    tools: ["TensorFlow", "Matematik", "Mantık"],
    icon: BrainCircuit
  },
  {
    title: "Siber Güvenlik Uzmanı",
    desc: "Dijital dünyadaki sistemleri bilgisayar korsanlarından koruyarak verilerin güvenliğini sağlar.",
    tools: ["Ağ Yönetimi", "Şifreleme", "Analiz"],
    icon: Target
  }
];

const OrtaokulDashboard: React.FC = () => {
  const [profIndex, setProfIndex] = useState(0);

  const nextProfession = () => setProfIndex((prev) => (prev + 1) % futureProfessions.length);
  const prevProfession = () => setProfIndex((prev) => (prev - 1 + futureProfessions.length) % futureProfessions.length);

  return (
    <div className="min-h-screen p-6 sm:p-10 w-full max-w-7xl mx-auto flex flex-col gap-8 pb-32 sm:pb-10 transition-colors duration-700">
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 relative z-10"
      >
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 w-fit text-sm font-bold shadow-sm">
            <BookMarked className="w-4 h-4" />
            Okul Destek & Hazırlık
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
            Ortaokul Modülü
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Temellerini sağlamlaştır, hedeflerine odaklan!</p>
        </div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/10 rounded-2xl p-4 flex items-center gap-4 shadow-xl dark:shadow-2xl backdrop-blur-md transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-400/30">
            <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Haftalık Puan</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">0 <span className="text-sm text-emerald-600 dark:text-emerald-400 font-normal">XP</span></p>
          </div>
        </motion.div>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          {/* Study & Soft Skills Tracker */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="text-teal-500 dark:text-teal-400" /> Günlük Gelişim Takibi
              </h2>
            </div>

            <div className="space-y-6">
              {/* Academic Tasks */}
              <div>
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Ders Çalışmaları</h3>
                <div className="space-y-3">
                  {studyTasks.map((task) => (
                    <div 
                      key={task.id}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group shadow-sm",
                        task.completed 
                          ? "bg-emerald-500/10 border-emerald-500/30" 
                          : "bg-white/50 dark:bg-white/5 border-white/40 dark:border-white/10 hover:border-teal-400/50"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                          task.completed ? "border-emerald-500 bg-emerald-500" : "border-slate-400 dark:border-slate-500 group-hover:border-teal-400"
                        )}>
                          {task.completed && <CheckCircle2 className="w-3 h-3 text-white dark:text-slate-900" />}
                        </div>
                        <span className={cn(
                          "font-medium sm:text-base transition-colors",
                          task.completed ? "text-emerald-700 dark:text-emerald-300 line-through opacity-70" : "text-slate-700 dark:text-slate-200"
                        )}>
                          {task.title}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-black/5 dark:bg-black/20 px-2 py-1 rounded-md">
                        {task.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Soft Skills Tasks */}
              <div>
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Sosyal Beceriler (Soft Skills)</h3>
                <div className="space-y-3">
                  {softSkillsTasks.map((task) => {
                    const TaskIcon = task.icon;
                    return (
                      <div 
                        key={task.id}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group shadow-sm",
                          task.completed 
                            ? "bg-purple-500/10 border-purple-500/30" 
                            : "bg-white/50 dark:bg-white/5 border-white/40 dark:border-white/10 hover:border-purple-400/50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <TaskIcon className={cn("w-5 h-5", task.completed ? "text-purple-600 dark:text-purple-400" : "text-slate-400")} />
                          <span className={cn(
                            "font-medium sm:text-base transition-colors",
                            task.completed ? "text-purple-700 dark:text-purple-300 line-through opacity-70" : "text-slate-700 dark:text-slate-200"
                          )}>
                            {task.title}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-1 rounded-md">
                          +{task.xp} XP
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* High School Target Simulator */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-2xl relative transition-colors"
          >
            <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-6">
              <Target className="text-rose-500 dark:text-rose-400" /> Lise Hedef Simülatörü
            </h3>
            
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 w-full space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="text-lg font-bold text-slate-700 dark:text-slate-200">Hedef: Fen Lisesi</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Gereken Puan: 450</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-rose-500 dark:text-rose-400">0</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Son Deneme Skorun</p>
                  </div>
                </div>
                
                <div className="w-full h-4 bg-black/10 dark:bg-black/30 rounded-full overflow-hidden border border-white/20 dark:border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '0%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-rose-400 to-orange-400 rounded-full relative"
                  >
                     <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50" />
                  </motion.div>
                </div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300 text-center">
                  Sisteme ilk deneme puanını girmelisin. Hedefine giden yolculukta başarılar!
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Future Professions & Quiz */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          {/* Future Professions Dictionary Slider */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-indigo-500/10 to-blue-600/10 dark:from-indigo-900/40 dark:to-blue-900/20 backdrop-blur-xl border border-indigo-500/30 rounded-3xl p-6 relative overflow-hidden shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                 <MonitorPlay className="text-indigo-600 dark:text-indigo-400" /> Geleceğin Meslekleri
               </h3>
               <div className="flex gap-2">
                 <button onClick={prevProfession} className="p-1 rounded-lg bg-white/50 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20 transition-colors text-slate-800 dark:text-white"><ChevronLeft className="w-5 h-5" /></button>
                 <button onClick={nextProfession} className="p-1 rounded-lg bg-white/50 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20 transition-colors text-slate-800 dark:text-white"><ChevronRight className="w-5 h-5" /></button>
               </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={profIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-white/60 dark:bg-black/30 rounded-2xl p-6 border border-white/50 dark:border-white/5 relative z-10"
              >
                {React.createElement(futureProfessions[profIndex].icon, { className: "w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" })}
                <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{futureProfessions[profIndex].title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {futureProfessions[profIndex].desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {futureProfessions[profIndex].tools.map((tool, i) => (
                    <span key={i} className="text-xs font-semibold px-2 py-1 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 rounded-md border border-indigo-500/20">
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
          
          {/* Lise Uyumu Testi */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-emerald-500/20 to-teal-600/20 dark:from-emerald-600/20 dark:to-teal-800/20 border border-emerald-500/30 rounded-3xl p-6 relative overflow-hidden group hover:border-emerald-400/50 shadow-xl"
          >
             <div className="absolute -right-4 -top-4 text-emerald-600/10 dark:text-emerald-500/10 transform rotate-12 group-hover:scale-110 transition-transform">
                <HelpCircle className="w-32 h-32" />
             </div>
             
             <div className="relative z-10">
               <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Lise Uyumu Testi</h3>
               <p className="text-slate-700 dark:text-emerald-100/70 text-sm leading-relaxed mb-6">
                 Fen lisesi mi, meslek lisesi mi yoksa sosyal bilimler mi? Potansiyelini keşfet.
               </p>
               <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2">
                 Teste Başla <ArrowUpRight className="w-5 h-5" />
               </button>
             </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default OrtaokulDashboard;

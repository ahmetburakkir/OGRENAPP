import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Send, Target, Zap, Github, ExternalLink, TrendingUp, Calendar, MapPin, Briefcase, ChevronRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const mockMessages = [
  { id: 1, sender: 'ai', text: 'Merhaba! Bugün React.js hooks üzerine bir teknik mülakat simülasyonu yapalım. Hazır mısın?' },
];

const mockEvents = [
  { id: 1, title: 'Global AI Hackathon 2026', date: '24 Mayıs', type: 'Yarışma', icon: Zap, color: 'text-blue-500' },
  { id: 2, title: 'Tech Career Fair İstanbul', date: '05 Haziran', type: 'Kariyer Fuarı', icon: Briefcase, color: 'text-purple-500' },
  { id: 3, title: 'AWS Cloud Workshop', date: '12 Haziran', type: 'Eğitim', icon: Terminal, color: 'text-orange-500' },
];

const UniversiteDashboard: React.FC = () => {
  const [chatInput, setChatInput] = useState('');

  return (
    <div className="min-h-screen p-6 sm:p-10 w-full max-w-7xl mx-auto flex flex-col gap-8 pb-32 sm:pb-10 transition-colors duration-700">
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col gap-2 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 w-fit text-sm font-bold shadow-sm">
          <Target className="w-4 h-4" />
          Kariyer & Mülakat Hazırlığı
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
          Üniversite Modülü
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">Gerçek dünyaya hazırlan. CV'ni oluştur, sektör trendlerini yakala.</p>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        
        {/* Left Column (Span 2) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Digital CV & Portfolio Row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-2xl transition-colors flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-1">
                <div className="w-full h-full bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center font-bold text-2xl text-slate-800 dark:text-white">
                  JD
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">Jane Doe</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> Yazılım Mühendisliği Öğrencisi
                </p>
                <div className="flex gap-4 mt-3">
                  <a href="#" className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors flex items-center gap-1 text-sm font-bold">
                    <Github className="w-4 h-4" /> GitHub 
                  </a>
                  <a href="#" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors flex items-center gap-1 text-sm font-bold">
                    <ExternalLink className="w-4 h-4" /> Portfolio 
                  </a>
                </div>
              </div>
            </div>
            
            <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 dark:bg-white/10 dark:hover:bg-white/20 text-white font-bold rounded-xl transition-all shadow-md">
              CV'yi Dışa Aktar (PDF)
            </button>
          </motion.div>

          {/* Real-time Market Trends */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full bg-gradient-to-r from-blue-500/10 to-transparent dark:from-blue-900/40 dark:to-transparent border border-blue-500/20 rounded-2xl p-4 flex items-center gap-4 shadow-sm"
          >
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">CANLI PİYASA TRENDLERİ</p>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Bu ay <span className="font-bold text-emerald-600 dark:text-emerald-400">Junior React Geliştirici</span> ilanlarında <span className="font-bold text-emerald-600 dark:text-emerald-400">%15 artış</span> gözlemlendi. Python (Veri Bilimi) staj başvuru yoğunluğu zirvede!
              </p>
            </div>
          </motion.div>

          {/* Interview Simulator */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex-1 flex flex-col h-[500px] bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl shadow-xl dark:shadow-2xl overflow-hidden relative transition-colors"
          >
            <div className="p-6 border-b border-white/40 dark:border-white/10 flex items-center justify-between bg-white/60 dark:bg-white/5 z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-xl">
                  <Terminal className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white">Teknik Mülakat Simülatörü</h2>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-300">AI Mülakat Uzmanı ile Pratik Yap</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                </span>
                <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Canlı Bağlantı</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 z-10 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-white/10 scrollbar-track-transparent">
              {mockMessages.map((msg) => (
                <div 
                  key={msg.id}
                  className={cn(
                    "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed font-medium shadow-sm",
                    msg.sender === 'ai' 
                      ? "bg-white/60 dark:bg-white/10 text-slate-800 dark:text-slate-200 self-start border border-white/40 dark:border-white/5 rounded-tl-none" 
                      : "bg-gradient-to-br from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 text-white self-end rounded-tr-none"
                  )}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="p-4 bg-white/60 dark:bg-black/20 border-t border-white/40 dark:border-white/10 z-10 mt-auto">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Cevabınızı buraya yazın..."
                    className="w-full bg-white/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400/50 transition-colors"
                  />
                </div>
                <button className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-md">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        
        </div>

        {/* Right Column (Span 1) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* Skills Radar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 shadow-xl dark:shadow-2xl relative overflow-hidden group hover:border-blue-400/30 transition-colors"
          >
            <div className="flex items-center gap-2 mb-6 relative z-10">
               <Zap className="w-6 h-6 text-yellow-500 dark:text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
               <h3 className="text-xl font-bold text-slate-800 dark:text-white">Yetkinlik Radarı</h3>
            </div>

            <div className="space-y-4 relative z-10">
              {[
                { name: 'React / Next.js', score: 0, color: 'bg-cyan-500 text-cyan-500' },
                { name: 'Python (FastAPI)', score: 0, color: 'bg-emerald-500 text-emerald-500' },
                { name: 'UI / UX Tasarım', score: 0, color: 'bg-purple-500 text-purple-500' },
                { name: 'Sistem Tasarımı', score: 0, color: 'bg-blue-500 text-blue-500' },
              ].map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1 font-bold">
                     <span className="text-slate-700 dark:text-slate-300">{skill.name}</span>
                     <span className={skill.color.split(' ')[1]}>% {skill.score}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden border border-white/40 dark:border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.score}%` }}
                      transition={{ duration: 1, delay: 0.5 + (i * 0.1), ease: "easeOut" }}
                      className={cn("h-full rounded-full shadow-sm", skill.color.split(' ')[0])}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Event & Opportunity Calendar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex-1 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-blue-600/10 dark:to-cyan-600/5 backdrop-blur-xl border border-indigo-200 dark:border-blue-400/20 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col"
          >
             <div className="flex items-center gap-2 mb-6 relative z-10">
               <Calendar className="w-6 h-6 text-indigo-600 dark:text-blue-400" />
               <h3 className="text-xl font-bold text-slate-800 dark:text-white">Etkinlik Radarı</h3>
             </div>

             <div className="space-y-4 relative z-10 flex-1">
               {mockEvents.map((event) => {
                 const EventIcon = event.icon;
                 return (
                   <div key={event.id} className="p-4 bg-white/60 dark:bg-black/30 rounded-2xl border border-white/50 dark:border-white/5 flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                     <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center flex-shrink-0">
                       <EventIcon className={cn("w-6 h-6", event.color)} />
                     </div>
                     <div>
                       <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-1">{event.title}</h4>
                       <div className="flex gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                         <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.date}</span>
                         <span className={event.color}>{event.type}</span>
                       </div>
                     </div>
                   </div>
                 );
               })}
             </div>
             
             <button className="mt-4 w-full py-3 bg-white/80 hover:bg-white dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white rounded-xl font-bold transition-colors border border-slate-200 dark:border-white/10 flex items-center justify-center gap-2 shadow-sm">
               Tüm Fırsatları Gör <ChevronRight className="w-4 h-4" />
             </button>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default UniversiteDashboard;

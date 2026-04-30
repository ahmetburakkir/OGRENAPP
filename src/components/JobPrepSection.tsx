import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Briefcase, BarChart3 } from 'lucide-react';
const MOCK_SKILLS = [
  { id: '1', competency: 'Liderlik ve İnisiyatif', score: 75 },
  { id: '2', competency: 'Problem Çözme', score: 82 },
  { id: '3', competency: 'İletişim ve Takım Çalışması', score: 68 },
  { id: '4', competency: 'Analitik Düşünme', score: 90 },
  { id: '5', competency: 'Kriz Yönetimi', score: 60 }
];

export const JobPrepSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full mt-4">
      {/* 1. Main Dashboard UI Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-xl dark:shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:items-start justify-between">
          
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white flex items-center gap-3 mb-2">
              <Briefcase className="w-8 h-8 text-fuchsia-500 dark:text-fuchsia-400" /> İşe Hazırlık Platformu
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium mb-8">
              Şirketlerin aradığı temel davranışsal yetkinlikler (Soft Skills). Hangi konularda güçlü olduğunu keşfet, zayıf yönlerini geliştir.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {MOCK_SKILLS.map((item) => (
                <div key={item.id} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.competency}</span>
                    <span className="text-xs font-black text-slate-500">% {item.score}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-black/40 rounded-full overflow-hidden border border-white/20 dark:border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-400 to-fuchsia-500 relative"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/3 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10 border border-fuchsia-500/20 rounded-3xl text-center shadow-inner">
             <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-900 border-4 border-fuchsia-500/30 flex items-center justify-center shadow-lg mb-6">
               <Briefcase className="w-10 h-10 text-fuchsia-500" />
             </div>
             <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Durum Testi</h3>
             <p className="text-sm text-slate-600 dark:text-slate-300 font-medium mb-8">
               Mülakat senaryolarıyla yetkinliklerini ölçmeye hazır mısın? 12 soruluk mini testi çöz, kendini analiz et.
             </p>
             <button 
               onClick={() => navigate('/dashboard/job-test')}
               className="w-full py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white rounded-2xl font-black text-lg shadow-lg hover:shadow-fuchsia-500/30 hover:scale-105 transition-all mb-3"
             >
               Testi Çöz &amp; Analiz Et
             </button>
             <button 
               onClick={() => navigate('/dashboard/job-test')}
               className="w-full py-3 bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 text-fuchsia-600 dark:text-fuchsia-400 border border-fuchsia-500/20 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
             >
               <BarChart3 className="w-5 h-5 group-hover:scale-110 transition-transform" /> Ayrıntılar ve Analizi Gör
             </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, Rocket, Star, Target, Sparkles, ChevronRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ----------------------------------------------------------------------
// Reusable Component: Floating Portal Card
// ----------------------------------------------------------------------
interface FloatingPortalCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  colorScheme: 'blue' | 'purple' | 'emerald';
  delay: number;
}

const FloatingPortalCard: React.FC<FloatingPortalCardProps> = ({ 
  title, 
  description, 
  icon, 
  to, 
  colorScheme,
  delay 
}) => {
  const schemes = {
    blue: {
      bg: "bg-blue-500/10",
      border: "border-blue-300/40 dark:border-blue-400/20 hover:border-blue-500/60 dark:hover:border-blue-400/50",
      glow: "shadow-blue-500/20 group-hover:shadow-blue-500/40",
      text: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-500/20 dark:bg-blue-500/20",
      lightGlow: "bg-blue-400/20 dark:bg-blue-500/20",
      badge: "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-400/30 dark:border-blue-500/30"
    },
    purple: {
      bg: "bg-purple-500/10",
      border: "border-purple-300/40 dark:border-purple-400/20 hover:border-purple-500/60 dark:hover:border-purple-400/50",
      glow: "shadow-purple-500/20 group-hover:shadow-purple-500/40",
      text: "text-purple-600 dark:text-purple-400",
      iconBg: "bg-purple-500/20 dark:bg-purple-500/20",
      lightGlow: "bg-purple-400/20 dark:bg-purple-500/20",
      badge: "bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-400/30 dark:border-purple-500/30"
    },
    emerald: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-300/40 dark:border-emerald-400/20 hover:border-emerald-500/60 dark:hover:border-emerald-400/50",
      glow: "shadow-emerald-500/20 group-hover:shadow-emerald-500/40",
      text: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-500/20 dark:bg-emerald-500/20",
      lightGlow: "bg-emerald-400/20 dark:bg-emerald-500/20",
      badge: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-400/30 dark:border-emerald-500/30"
    }
  };

  const scheme = schemes[colorScheme];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay, 
        duration: 0.6, 
        type: "spring",
        stiffness: 100 
      }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="h-full"
    >
      <Link 
        to={to} 
        className={cn(
          "relative group flex flex-col h-full p-8 rounded-[2rem] transition-all duration-300 overflow-hidden",
          "bg-white/50 dark:bg-white/5 backdrop-blur-xl border shadow-xl dark:shadow-2xl",
          scheme.border, scheme.glow
        )}
      >
        {/* Deep background glow */}
        <div className={cn("absolute top-0 right-0 w-32 h-32 rounded-full blur-[50px] transition-all duration-500 opacity-50 group-hover:opacity-100", scheme.lightGlow)} />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-6">
            <div className={cn("p-4 rounded-2xl", scheme.iconBg)}>
              {React.cloneElement(icon as React.ReactElement<any>, { className: cn("w-8 h-8", scheme.text) })}
            </div>
            <span className={cn("px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border", scheme.badge)}>
              Keşfet
            </span>
          </div>
          
          <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
            {title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 flex-grow font-medium">
            {description}
          </p>
          
          <div className={cn("mt-auto flex items-center text-sm font-bold transition-colors", scheme.text)}>
            Maceraya Başla 
            <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-2" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// ----------------------------------------------------------------------
// Main Welcome Component
// ----------------------------------------------------------------------
const Welcome: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-6 sm:p-10 xl:p-16 relative transition-colors duration-700">
      <div className="max-w-7xl w-full flex flex-col gap-10 sm:gap-14 pb-24 sm:pb-0">

        {/* --- Top Section: Student Profile & Motivation --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col lg:flex-row gap-6 lg:items-stretch"
        >
          {/* Hero Greeting */}
          <div className="flex-1 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-900/40 dark:to-purple-900/40 backdrop-blur-xl border border-indigo-200 dark:border-indigo-500/30 rounded-[2rem] p-8 sm:p-10 shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors">
             
             {/* Decorative Elements */}
             <div className="absolute top-[-50%] left-[-10%] w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-300/30 dark:from-purple-500/10 via-transparent to-transparent pointer-events-none" />
             <Sparkles className="absolute top-8 right-8 w-6 h-6 text-indigo-500 dark:text-indigo-400 opacity-60" />

             <div className="relative z-10">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 dark:bg-white/10 border border-white/80 dark:border-white/20 text-indigo-700 dark:text-indigo-300 w-fit text-sm font-bold mb-6 shadow-sm">
                 <Rocket className="w-4 h-4" />
                 Maceraya Hoş Geldin
               </div>
               
               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-600 to-fuchsia-600 dark:from-indigo-400 dark:via-purple-300 dark:to-fuchsia-300 mb-4 leading-tight">
                 Geleceğini <br className="hidden sm:block" /> Şekillendir.
               </h1>
               
               <p className="text-slate-700 dark:text-slate-300 text-lg max-w-xl font-medium">
                 Senin için özel olarak hazırlanmış eğitim koçunla tanış. Rotanı seç, görevleri tamamla ve hedeflerine doğru fırlatmaya hazırlan!
               </p>

               {/* Mock Level / XP Bar for gamification */}
               <div className="mt-8 bg-white/60 dark:bg-black/30 border border-white/60 dark:border-white/10 p-4 rounded-2xl flex items-center gap-4 max-w-md shadow-sm">
                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-500 flex items-center justify-center font-bold text-white shadow-md flex-shrink-0">
                   Lv. 1
                 </div>
                 <div className="flex-1 flex flex-col gap-1">
                   <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                     <span>Haftalık Hedefler</span>
                     <span className="text-fuchsia-600 dark:text-fuchsia-400">0 / 100 XP</span>
                   </div>
                   <div className="h-2 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden border border-white/40 dark:border-white/5">
                     <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: "0%" }}
                       transition={{ duration: 1.5, ease: "easeOut" }}
                       className="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full"
                     />
                   </div>
                 </div>
               </div>
             </div>
          </div>

          {/* Quick Stats / Quote */}
          <div className="lg:w-1/3 bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-[2rem] p-8 shadow-xl dark:shadow-2xl flex flex-col justify-between relative overflow-hidden group transition-colors">
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-yellow-400/20 dark:bg-yellow-500/10 rounded-full blur-[40px] group-hover:bg-yellow-400/40 dark:group-hover:bg-yellow-500/20 transition-all duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4 text-yellow-600 dark:text-yellow-400">
                <Star className="w-5 h-5 fill-yellow-500 dark:fill-yellow-400" />
                <h3 className="font-bold tracking-wide uppercase text-sm">Günün Sözü</h3>
              </div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white leading-relaxed italic">
                "Ulaşılacak hedefler değil, yürünecek yollar önemlidir."
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-slate-300 dark:border-white/10 pt-6 relative z-10">
              <div>
                <p className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1 font-bold">Günlük Seri</p>
                <p className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2">
                  0 <span className="text-orange-500 dark:text-orange-400 text-base">🔥</span>
                </p>
              </div>
              <Link to="/progress" className="w-10 h-10 rounded-xl bg-white/80 hover:bg-white dark:bg-white/5 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 flex items-center justify-center transition-colors shadow-sm">
                <Target className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* --- Modules Grid --- */}
        <div>
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <h2 className="text-2xl font-black text-slate-800 dark:text-white">Modüller</h2>
            <div className="h-px bg-slate-300 dark:bg-white/10 flex-1" />
          </div>

          <div className="flex justify-center min-h-[400px]">
            <div className="max-w-sm w-full">
              <FloatingPortalCard
                title="Lise Modülü"
                description="Karakterini analiz et, netlerini yükselt ve alternatif kariyer yollarını incele. Geleceğine yön ver!"
                icon={<GraduationCap />}
                to="/dashboard/lise"
                colorScheme="purple"
                delay={0.1}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Welcome;

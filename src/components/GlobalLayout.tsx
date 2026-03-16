import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, TrendingUp, Settings, LogIn, Moon, Sun, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../context/AuthContext';

// Helper for Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlobalLayoutProps {
  children: React.ReactNode;
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);
  const { isAuthenticated, logout } = useAuth();

  // Apply theme to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const navItems = isAuthenticated ? [
    { icon: Home, label: 'Panel', path: '/welcome' },
    { icon: TrendingUp, label: 'Gelişim Sayfası', path: '/progress' },
    { icon: Settings, label: 'Ayarlar', path: '/settings' },
  ] : [
    { icon: Home, label: 'Giriş Sayfası', path: '/' },
    { icon: LogIn, label: 'Giriş Yap', path: '/login' },
  ];

  return (
    <div className="relative min-h-screen w-full bg-slate-50 dark:bg-[#0a0f1c] text-slate-800 dark:text-slate-100 overflow-x-hidden selection:bg-indigo-500/30 transition-colors duration-700">
      
      {/* 1. Deep Space & Airy Sky Animated Background (Persistent) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Animated Gradient */}
        <div className={cn(
          "absolute inset-0 opacity-90 animate-gradient-x transition-colors duration-700",
          "bg-gradient-to-br from-blue-50 via-purple-50 to-teal-100", // Light Mode: Airy Sky
          "dark:from-[#0a0f1c] dark:via-[#111827] dark:to-[#0f172a]"    // Dark Mode: Deep Space
        )} />
        
        {/* Floating Orbs for depth */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            opacity: isDark ? [0.3, 0.5, 0.3] : [0.4, 0.7, 0.4],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-indigo-300/40 dark:bg-indigo-600/20 rounded-full blur-[100px] transition-colors duration-700"
        />
        <motion.div 
          animate={{ 
            y: [0, 30, 0],
            opacity: isDark ? [0.2, 0.4, 0.2] : [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-purple-300/40 dark:bg-purple-600/20 rounded-full blur-[100px] transition-colors duration-700"
        />
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-20 mix-blend-overlay" />
      </div>

      {/* 2. Floating Navigation Bar (Bottom on Mobile, Sidebar on Desktop) */}
      <nav className="fixed bottom-0 left-0 w-full sm:w-24 sm:h-screen sm:bottom-auto sm:top-0 z-50 p-4 pb-6 sm:p-6 flex sm:flex-col justify-center items-center pointer-events-none">
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex sm:flex-col items-center gap-2 sm:gap-6 p-2 sm:p-4 bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-full sm:rounded-3xl shadow-xl dark:shadow-2xl pointer-events-auto w-full sm:w-auto overflow-x-auto sm:overflow-visible overflow-y-hidden transition-colors"
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
                             (item.path !== '/' && location.pathname.startsWith(item.path));
            const Icon = item.icon;

            return (
              <Link 
                key={item.path} 
                to={item.path}
                className="relative group p-3 sm:p-4 rounded-2xl sm:rounded-2xl transition-all"
              >
                {/* Active Indicator Background */}
                {isActive && (
                  <motion.div 
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-white/50 dark:bg-white/10 rounded-2xl sm:rounded-2xl border border-white/60 dark:border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.4)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-colors"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                
                <div className="relative z-10 flex flex-col items-center gap-1 sm:gap-2">
                  <Icon 
                    className={cn(
                      "w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-300",
                      isActive ? "text-indigo-600 dark:text-white" : "text-slate-500 dark:text-slate-400 group-hover:text-indigo-500 dark:group-hover:text-slate-200"
                    )} 
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {/* Tooltip for desktop / Label for mobile */}
                  <span className="hidden sm:block absolute left-full ml-4 px-3 py-1 bg-white/80 dark:bg-slate-800 text-slate-800 dark:text-white text-xs rounded-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all whitespace-nowrap shadow-xl border border-white/50 dark:border-transparent">
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
          
          <div className="hidden sm:block w-8 h-px bg-slate-300 dark:bg-white/10 my-2" />
          
          <button 
            onClick={() => setIsDark(!isDark)}
            className="relative group p-3 sm:p-4 rounded-2xl transition-all"
          >
            <div className="relative z-10 flex flex-col items-center gap-1 sm:gap-2">
              {isDark ? (
                <Sun className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400 dark:text-yellow-300 group-hover:text-yellow-200 transition-colors duration-300" strokeWidth={2} />
              ) : (
                <Moon className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-600 group-hover:text-indigo-800 transition-colors duration-300" strokeWidth={2} />
              )}
              <span className="hidden sm:block absolute left-full ml-4 px-3 py-1 bg-white/80 dark:bg-slate-800 text-slate-800 dark:text-white text-xs rounded-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all whitespace-nowrap shadow-xl border border-white/50 dark:border-transparent">
                {isDark ? "Açık Tema" : "Koyu Tema"}
              </span>
            </div>
          </button>

          {isAuthenticated && (
            <button 
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="relative group p-3 sm:p-4 rounded-2xl transition-all sm:mt-auto"
            >
              <div className="relative z-10 flex flex-col items-center gap-1 sm:gap-2">
                <LogOut className="w-6 h-6 sm:w-7 sm:h-7 text-rose-500 group-hover:text-rose-400 transition-colors duration-300" strokeWidth={2} />
                <span className="hidden sm:block absolute left-full ml-4 px-3 py-1 bg-white/80 dark:bg-slate-800 text-slate-800 dark:text-white text-xs rounded-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all whitespace-nowrap shadow-xl border border-white/50 dark:border-transparent">
                  Çıkış Yap
                </span>
              </div>
            </button>
          )}

        </motion.div>
      </nav>

      {/* 3. Main Content Container */}
      <main className="relative z-10 flex flex-col sm:pl-28 w-full min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

    </div>
  );
};

export default GlobalLayout;

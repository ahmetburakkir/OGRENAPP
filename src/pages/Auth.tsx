import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, User, ArrowRight, Github, Chrome, Zap } from 'lucide-react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // If already logged in, redirect away
  if (isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }

  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(); // Setup local context auth
    navigate('/welcome');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative z-10 transition-colors duration-700">
      
      {/* Decorative background glow specific to auth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full blur-[100px] dark:blur-[120px] pointer-events-none transition-colors" />

      <div className="w-full max-w-md relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? 'login' : 'register'}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
            className="bg-white/60 dark:bg-white/10 backdrop-blur-3xl border border-white/60 dark:border-white/20 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] relative overflow-hidden transition-colors"
          >
            {/* Inner subtle glow */}
            <div className={`absolute -top-20 ${isLogin ? '-right-20 bg-blue-400/30 dark:bg-blue-500/20' : '-left-20 bg-purple-400/30 dark:bg-purple-500/20'} w-64 h-64 rounded-full blur-[60px] pointer-events-none transition-colors duration-500`} />

            {/* Header */}
            <div className="text-center mb-8 relative z-10">
              <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight mb-2">
                {isLogin ? 'Tekrar Hoş Geldin' : 'Aramıza Katıl'}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 font-medium text-sm">
                {isLogin 
                  ? 'Geleceğini şekillendirmeye kaldığın yerden devam et.' 
                  : 'Kariyer yolculuğuna ilk adımı at.'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
              
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-5"
                >
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400 transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Ad Soyad"
                      required
                      className="w-full bg-white/60 dark:bg-black/20 border border-slate-300 dark:border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-slate-800 dark:text-white placeholder:text-slate-500 font-medium focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500/50 focus:bg-white dark:focus:bg-white/5 transition-all shadow-sm"
                    />
                  </div>
                </motion.div>
              )}

              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="email" 
                  placeholder="E-posta adresi"
                  required
                  className="w-full bg-white/60 dark:bg-black/20 border border-slate-300 dark:border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-slate-800 dark:text-white placeholder:text-slate-500 font-medium focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500/50 focus:bg-white dark:focus:bg-white/5 transition-all shadow-sm"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="password" 
                  placeholder="Şifre"
                  required
                  className="w-full bg-white/60 dark:bg-black/20 border border-slate-300 dark:border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-slate-800 dark:text-white placeholder:text-slate-500 font-medium focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500/50 focus:bg-white dark:focus:bg-white/5 transition-all shadow-sm"
                />
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <a href="#" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors">Şifremi unuttum</a>
                </div>
              )}

              <button 
                type="submit"
                className="w-full py-4 mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 hover:from-indigo-500 hover:to-purple-500 dark:hover:from-indigo-400 dark:hover:to-purple-400 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 group"
              >
                {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="my-8 flex items-center gap-4 relative z-10">
              <div className="flex-1 h-px bg-slate-300 dark:bg-white/10" />
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Veya</span>
              <div className="flex-1 h-px bg-slate-300 dark:bg-white/10" />
            </div>

            {/* Social Logins */}
            <div className="flex gap-4 relative z-10">
              <button className="flex-1 py-3 bg-white/60 dark:bg-white/5 hover:bg-white border border-slate-300 dark:border-white/10 dark:hover:bg-white/10 rounded-2xl flex items-center justify-center transition-colors shadow-sm">
                <Chrome className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </button>
              <button className="flex-1 py-3 bg-white/60 dark:bg-white/5 hover:bg-white border border-slate-300 dark:border-white/10 dark:hover:bg-white/10 rounded-2xl flex items-center justify-center transition-colors shadow-sm">
                <Github className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </button>
            </div>

            {/* Quick Login - Temporary for Test/Demo */}
            <div className="mt-6 flex flex-col gap-2 relative z-10">
              <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-widest mb-1">Hızlı Giriş (Demo)</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => { login(); navigate('/dashboard/ortaokul'); }}
                  className="flex-1 py-2 px-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-xl text-[10px] font-black text-emerald-600 dark:text-emerald-400 transition-all flex items-center justify-center gap-1"
                >
                  <Zap className="w-3 h-3" /> Ortaokul
                </button>
                <button 
                  onClick={() => { login(); navigate('/dashboard/lise'); }}
                  className="flex-1 py-2 px-1 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-xl text-[10px] font-black text-indigo-600 dark:text-indigo-400 transition-all flex items-center justify-center gap-1"
                >
                  <Zap className="w-3 h-3" /> Lise
                </button>
                <button 
                  onClick={() => { login(); navigate('/dashboard/universite'); }}
                  className="flex-1 py-2 px-1 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-xl text-[10px] font-black text-blue-600 dark:text-blue-400 transition-all flex items-center justify-center gap-1"
                >
                  <Zap className="w-3 h-3" /> Üniversite
                </button>
              </div>
            </div>

            {/* Toggle Mode */}
            <div className="mt-8 text-center relative z-10">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {isLogin ? "Hesabın yok mu? " : "Zaten bir hesabın var mı? "}
                <button 
                  onClick={toggleAuthMode}
                  className="text-indigo-600 dark:text-indigo-400 font-black hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors ml-1"
                >
                  {isLogin ? 'Hemen Kayıt Ol' : 'Giriş Yap'}
                </button>
              </p>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};

export default Auth;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings as SettingsIcon, User, Bell, Shield, Moon, Monitor, Camera, LogOut } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type TabType = 'profile' | 'preferences' | 'account';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  // Mock states for toggles
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);

  return (
    <div className="min-h-screen p-6 sm:p-10 w-full max-w-5xl mx-auto flex flex-col gap-8 pb-32 sm:pb-10 relative z-10 transition-colors duration-700">
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col gap-2 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 w-fit text-sm font-bold shadow-sm">
          <SettingsIcon className="w-4 h-4" />
          Kişiselleştirme
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-200 dark:to-slate-400">
          Ayarlar
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">Hesabını ve uygulama deneyimini özelleştir.</p>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
        
        {/* Sidebar Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-4 lg:col-span-3 flex flex-col gap-2"
        >
          <button 
            onClick={() => setActiveTab('profile')}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all duration-300 text-left shadow-sm",
              activeTab === 'profile' 
                ? "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-500/30" 
                : "bg-white/60 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-transparent hover:bg-white/80 dark:hover:bg-white/10 hover:text-slate-800 dark:hover:text-slate-200"
            )}
          >
            <User className="w-5 h-5" /> Profil Bilgileri
          </button>
          
          <button 
            onClick={() => setActiveTab('preferences')}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all duration-300 text-left shadow-sm",
              activeTab === 'preferences' 
                ? "bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-500/30" 
                : "bg-white/60 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-transparent hover:bg-white/80 dark:hover:bg-white/10 hover:text-slate-800 dark:hover:text-slate-200"
            )}
          >
            <Monitor className="w-5 h-5" /> Uygulama Tercihleri
          </button>
          
          <button 
            onClick={() => setActiveTab('account')}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all duration-300 text-left shadow-sm",
              activeTab === 'account' 
                ? "bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-500/30" 
                : "bg-white/60 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-transparent hover:bg-white/80 dark:hover:bg-white/10 hover:text-slate-800 dark:hover:text-slate-200"
            )}
          >
            <Shield className="w-5 h-5" /> Hesap Yönetimi
          </button>
        </motion.div>

        {/* Content Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-8 lg:col-span-9 bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-2xl relative overflow-hidden min-h-[500px] transition-colors"
        >
          <AnimatePresence mode="wait">
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div 
                key="profile"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-6">
                  <div className="relative group cursor-pointer w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 p-1 shadow-md">
                    <div className="w-full h-full bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center overflow-hidden relative">
                       {/* Placeholder avatar */}
                       <User className="w-10 h-10 text-slate-400 dark:text-slate-500" />
                       <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                         <Camera className="w-6 h-6 text-white" />
                       </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 dark:text-white mb-1">Avatarı Değiştir</h3>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Önerilen boyut 256x256px. Üst limit 2MB.</p>
                  </div>
                </div>

                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-400 mb-2 block">Ad Soyad</label>
                    <input 
                      type="text" 
                      defaultValue="Öğrenci Adı"
                      className="w-full bg-white/60 dark:bg-black/20 border border-slate-300 dark:border-white/10 rounded-xl py-3 px-4 text-slate-800 dark:text-white font-medium focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-500/50 transition-colors shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-400 mb-2 block">Kullanıcı Adı</label>
                    <input 
                      type="text" 
                      defaultValue="@ogrenapp"
                      className="w-full bg-slate-200 dark:bg-black/20 border border-slate-300 dark:border-white/10 rounded-xl py-3 px-4 text-slate-500 dark:text-slate-400 font-medium cursor-not-allowed focus:outline-none shadow-sm"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-400 mb-2 block">Biyografi</label>
                    <textarea 
                      rows={4}
                      placeholder="Kendinden bahset..."
                      className="w-full bg-white/60 dark:bg-black/20 border border-slate-300 dark:border-white/10 rounded-xl py-3 px-4 text-slate-800 dark:text-white font-medium resize-none focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-500/50 transition-colors shadow-sm"
                    />
                  </div>
                  <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-indigo-500/20">
                    Değişiklikleri Kaydet
                  </button>
                </div>
              </motion.div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <motion.div 
                key="preferences"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-lg font-black text-slate-800 dark:text-white mb-4 border-b border-slate-300 dark:border-white/10 pb-2">Görünüm</h3>
                  <div className="flex items-center justify-between p-4 bg-white/60 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-lg"><Moon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /></div>
                      <div>
                        <p className="font-bold text-slate-800 dark:text-white">Tema Seçimi (Ana Menüden Ayarlanır)</p>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Üst kısımdaki Gece/Gündüz ikonuyla temayı değiştirin.</p>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-slate-300 dark:bg-indigo-500 rounded-full relative cursor-not-allowed opacity-80 border border-slate-400 dark:border-transparent">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-800 dark:text-white mb-4 border-b border-slate-300 dark:border-white/10 pb-2">Bildirimler</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-white/60 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 cursor-pointer hover:bg-white/80 dark:hover:bg-white/10 transition-colors shadow-sm" onClick={() => setNotifications(!notifications)}>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 dark:bg-purple-500/20 rounded-lg"><Bell className="w-5 h-5 text-purple-600 dark:text-purple-400" /></div>
                        <div>
                          <p className="font-bold text-slate-800 dark:text-white">Uygulama İçi Bildirimler</p>
                          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Görev hatırlatıcıları ve yeni modül uyarıları.</p>
                        </div>
                      </div>
                      <div className={cn("w-12 h-6 rounded-full relative transition-colors duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]", notifications ? "bg-purple-500" : "bg-slate-300 dark:bg-slate-700")}>
                        <motion.div 
                          layout
                          className={cn("absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm", notifications ? "right-1" : "left-1")} 
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/60 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 cursor-pointer hover:bg-white/80 dark:hover:bg-white/10 transition-colors shadow-sm" onClick={() => setSoundEffects(!soundEffects)}>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg"><Monitor className="w-5 h-5 text-blue-600 dark:text-blue-400" /></div>
                        <div>
                          <p className="font-bold text-slate-800 dark:text-white">Ses Efektleri</p>
                          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">XP kazanma ve seviye atlama sesleri.</p>
                        </div>
                      </div>
                      <div className={cn("w-12 h-6 rounded-full relative transition-colors duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]", soundEffects ? "bg-blue-500" : "bg-slate-300 dark:bg-slate-700")}>
                        <motion.div 
                          layout
                          className={cn("absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm", soundEffects ? "right-1" : "left-1")} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Account Tab */}
            {activeTab === 'account' && (
              <motion.div 
                key="account"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-lg font-black text-rose-600 dark:text-rose-400 mb-4 border-b border-rose-300 dark:border-rose-500/20 pb-2">Güvenlik ve Oturum</h3>
                  
                  <div className="space-y-4 max-w-md">
                    <button className="w-full text-left p-4 bg-white/60 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-800 dark:text-white font-bold transition-colors shadow-sm focus:outline-none">
                      Şifreyi Değiştir
                    </button>
                    <button className="w-full text-left p-4 bg-white/60 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-800 dark:text-white font-bold transition-colors shadow-sm focus:outline-none">
                      İki Faktörlü Doğrulamayı (2FA) Aç
                    </button>
                  </div>
                </div>

                <div className="pt-8">
                   <button className="flex items-center gap-2 px-6 py-3 bg-rose-100 dark:bg-rose-500/10 hover:bg-rose-200 dark:hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-black rounded-xl border border-rose-300 dark:border-rose-500/30 transition-all shadow-sm">
                     <LogOut className="w-5 h-5" /> Çıkış Yap
                   </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>
      </div>

    </div>
  );
};

export default Settings;

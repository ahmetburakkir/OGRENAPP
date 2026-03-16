import React from 'react';
import { Rocket, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg border-t border-slate-200 dark:border-white/10 pt-16 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                <Rocket className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 tracking-tight">
                OGRENAPP
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-medium">
              Eğitimi Gelecekle Birleştiriyoruz. <br /> Öğrenciler için yeni nesil kariyer mentoru.
            </p>
            <div className="flex items-center gap-4">
              {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400 transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links 1 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Platform</h4>
            {['Özellikler', 'Nasıl Çalışır?', 'Fiyatlandırma', 'Sıkça Sorulan Sorular'].map((item) => (
              <a key={item} href="#" className="text-slate-600 dark:text-slate-400 font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors w-fit">
                {item}
              </a>
            ))}
          </div>

          {/* Links 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Kurumsal</h4>
            {['Hakkımızda', 'Kariyer', 'Blog', 'İletişim'].map((item) => (
              <a key={item} href="#" className="text-slate-600 dark:text-slate-400 font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors w-fit">
                {item}
              </a>
            ))}
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Yasal</h4>
            {['Gizlilik Politikası', 'Kullanım Koşulları', 'Çerez Politikası', 'KVKK'].map((item) => (
              <Link key={item} to="#" className="text-slate-600 dark:text-slate-400 font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors w-fit">
                {item}
              </Link>
            ))}
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm text-center md:text-left">
            © {new Date().getFullYear()} OGRENAPP. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
            Made with <span className="text-rose-500">❤️</span> for Students
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

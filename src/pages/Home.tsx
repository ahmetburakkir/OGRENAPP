import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Rocket, Target, Users, BookOpen, ChevronRight, ChevronLeft, Mail, MapPin, Phone } from 'lucide-react';

const carouselSlides = [
  {
    id: 1,
    title: "Geleceğini OGRENAPP ile Şekillendir",
    subtitle: "Ortaokuldan Üniversiteye Kariyer Koçun",
    description: "Sadece ders çalışmak değil, potansiyelini keşfetmek için buradayız. Hedeflerini belirle, görevleri tamamla ve XP kazanarak seviye atla.",
    icon: Rocket,
    color: "from-indigo-500 to-purple-500"
  },
  {
    id: 2,
    title: "Sana Özel Gerçek Dünya Simülasyonları",
    subtitle: "Lise ve Üniversite Hedeflerin İçin",
    description: "YKS Net simülatörü, Mülakat provaları, Soft Skill takibi ve sektör trendleri ile sadece sınava değil, hayata hazırlan.",
    icon: Target,
    color: "from-fuchsia-500 to-rose-500"
  },
  {
    id: 3,
    title: "Oyunlaştırılmış Eğitim Deneyimi",
    subtitle: "Eğlenerek Öğren, Serini Koru",
    description: "Günlük genel kültür testleri, karakter analizleri ve başarı rozetleriyle motivasyonunu her zaman en üstte tut.",
    icon: BookOpen,
    color: "from-emerald-500 to-teal-500"
  }
];

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);

  return (
    <div className="w-full flex flex-col items-center p-6 sm:p-10 xl:p-16 relative transition-colors duration-700">
      <div className="max-w-7xl w-full flex flex-col gap-20 pb-24 sm:pb-0">

        {/* --- Hero / Carousel Section --- */}
        <section className="relative w-full h-[500px] sm:h-[600px] rounded-[3rem] overflow-hidden bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-2xl transition-colors">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 sm:p-16 text-center"
            >
              <div className={`absolute inset-0 opacity-20 dark:opacity-10 bg-gradient-to-br ${carouselSlides[currentSlide].color}`} />
              
              <div className="relative z-10 flex flex-col items-center max-w-3xl">
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-8 flex items-center justify-center shadow-2xl bg-gradient-to-br ${carouselSlides[currentSlide].color}`}>
                  {React.createElement(carouselSlides[currentSlide].icon, { className: "w-10 h-10 sm:w-12 sm:h-12 text-white" })}
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                  {carouselSlides[currentSlide].title}
                </h1>
                <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">
                  {carouselSlides[currentSlide].subtitle}
                </h2>
                <p className="text-base sm:text-xl text-slate-700 dark:text-slate-300 font-medium max-w-2xl leading-relaxed">
                  {carouselSlides[currentSlide].description}
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => navigate('/login')}
                    className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 group"
                  >
                    Hemen Başla 
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => navigate('/welcome')}
                    className="px-8 py-4 bg-white/60 dark:bg-white/10 text-slate-800 dark:text-white border border-slate-300 dark:border-white/20 rounded-2xl font-bold text-lg hover:bg-white dark:hover:bg-white/20 transition-all"
                  >
                    Kayıt Olmadan İncele
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-md border border-white/20 text-slate-800 dark:text-white hover:bg-white dark:hover:bg-black/80 transition-all z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-md border border-white/20 text-slate-800 dark:text-white hover:bg-white dark:hover:bg-black/80 transition-all z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {carouselSlides.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-indigo-600 dark:bg-indigo-400 scale-125' : 'bg-slate-300 dark:bg-white/30 hover:bg-slate-400 dark:hover:bg-white/50'}`}
              />
            ))}
          </div>
        </section>

        {/* --- About Us Section --- */}
        <section className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-[3rem] blur-[80px]" />
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" 
              alt="Students collaborating" 
              className="relative z-10 rounded-[3rem] object-cover h-[400px] w-full shadow-2xl border border-white/20"
            />
          </div>
          <div className="flex-1 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 text-blue-700 dark:text-blue-400 w-fit text-sm font-bold shadow-sm">
              <Users className="w-4 h-4" />
              Hakkımızda
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white leading-tight">
              Eğitimi Gelecekle <br/> Birleştiriyoruz.
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Eğitim sadece kitaplardaki teorik bilgilerden ibaret değildir. OGRENAPP olarak amacımız, öğrencileri gerçek dünyanın gereksinimleriyle erken yaşta tanıştırmaktır. Yumuşak beceriler (soft skills), meslek simülasyonları ve interaktif mülakat platformlarımızla sıradan bir öğrenme sürecini, kariyer inşasına dönüştürüyoruz.
            </p>
            <ul className="space-y-4 mt-4">
              {[
                "Modern ve Oyunlaştırılmış UX",
                "Gerçek Verilerle Sektör Analizleri",
                "Kişiselleştirilmiş Gelişim Haritası"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-bold text-slate-800 dark:text-slate-200">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <CheckIcon />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --- Contact / CTA Section --- */}
        <section className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-[3rem] p-10 sm:p-16 relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fuchsia-500/30 rounded-full blur-[120px] pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/30 rounded-full blur-[100px] pointer-events-none" />
           
           <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center justify-between">
              <div className="text-center lg:text-left max-w-2xl">
                <h2 className="text-3xl sm:text-5xl font-black text-white mb-6">
                  Bir Sorun Mu Var? <br/> Ya da Sadece Merhaba De!
                </h2>
                <p className="text-indigo-200 text-lg font-medium mb-8">
                  Ekibimiz sana yardımcı olmak için burada. Her türlü görüş, öneri veya destek talebi için bize ulaşabilirsin.
                </p>
                <button 
                  onClick={() => navigate('/login')}
                  className="px-8 py-4 bg-white text-indigo-900 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-transform"
                >
                  Platforma Katıl
                </button>
              </div>

              <div className="flex flex-col gap-6 w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex items-center gap-4 text-white">
                  <div className="p-3 bg-white/20 rounded-xl"><Mail className="w-6 h-6" /></div>
                  <div>
                    <h4 className="font-bold">E-posta Adresimiz</h4>
                    <p className="text-indigo-200 text-sm">iletisim@ogrenapp.com</p>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex items-center gap-4 text-white">
                  <div className="p-3 bg-white/20 rounded-xl"><Phone className="w-6 h-6" /></div>
                  <div>
                    <h4 className="font-bold">Telefon (Destek)</h4>
                    <p className="text-indigo-200 text-sm">+90 (850) 123 45 67</p>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex items-center gap-4 text-white">
                  <div className="p-3 bg-white/20 rounded-xl"><MapPin className="w-6 h-6" /></div>
                  <div>
                    <h4 className="font-bold">Merkez Ofis</h4>
                    <p className="text-indigo-200 text-sm">Teknopark İstanbul, Pendik</p>
                  </div>
                </div>
              </div>
           </div>
        </section>

      </div>
    </div>
  );
};

const CheckIcon = () => (
  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default Home;

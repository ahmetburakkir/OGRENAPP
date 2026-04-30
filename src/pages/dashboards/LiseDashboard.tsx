import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Map, BrainCircuit, Compass, Check, X, Fingerprint, MessageCircle, Route, GraduationCap, Award, Building2, DollarSign, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { getRecommendationsByUser } from '../../shared/api/client';

const mockDepartments = [
  { id: 1, name: 'Yapay Zeka Mühendisliği', uni: 'Teknik Üniversiteler', match: 94, desc: 'Matematik ve algoritmaya yatkınlığın bu bölüm için mükemmel.', tags: ['Matematik', 'Yazılım', 'Analitik'] },
  { id: 2, name: 'Endüstriyel Tasarım', uni: 'Güzel Sanatlar/Mimarlık', match: 88, desc: 'Yaratıcılığın ve problem çözme yeteneğin ön planda.', tags: ['Tasarım', 'İnovasyon', 'Çizim'] },
  { id: 3, name: 'Moleküler Biyoloji', uni: 'Fen Fakülteleri', match: 82, desc: 'Araştırmacı ruhun ve bilime olan merakın seni destekliyor.', tags: ['Bilim', 'Araştırma', 'Laboratuvar'] },
];

const mockTraits = [
  { name: 'Analitik Düşünme', value: 0, color: 'bg-indigo-500' },
  { name: 'Yaratıcılık', value: 0, color: 'bg-fuchsia-400' },
  { name: 'Sosyal Zeka', value: 0, color: 'bg-purple-500' },
];

const mockExamHistory = [
  { name: '1. Deneme', net: 60 },
  { name: '2. Deneme', net: 70 },
  { name: '3. Deneme', net: 75 },
  { name: '4. Deneme', net: 82 },
];

const mockVoices = [
  { name: 'Ahmet Y.', uni: 'ODTÜ Bilgisayar', quote: "İlk sene zorlandım ama pes etmeyince kodlamanın mantığını anlıyorsunuz. Algoritma temelinizi lisede atın." },
  { name: 'Zeynep K.', uni: 'Boğaziçi İşletme', quote: "Sadece sınav odaklı olmayın. Kulüplere katılıp network kurmak en az not ortalaması kadar önemli." },
];

const mockComparisonData = {
  uni1: { name: 'İTÜ Bilgisayar', color: 'bg-blue-500', barColor: 'from-blue-400 to-blue-600', text: 'text-blue-600 dark:text-blue-400' },
  uni2: { name: 'ODTÜ Bilgisayar', color: 'bg-emerald-500', barColor: 'from-emerald-400 to-emerald-600', text: 'text-emerald-600 dark:text-emerald-400' },
  criteria: [
    { label: 'Eğitim Kalitesi', val1: 92, val2: 95, icon: GraduationCap },
    { label: 'Staj İmkanı', val1: 96, val2: 88, icon: Building2 },
    { label: 'Uluslararası Fırsatlar', val1: 85, val2: 92, icon: Compass },
    { label: 'Mezun Maaşları', val1: 94, val2: 90, icon: DollarSign },
  ]
};

const LiseDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { token, userId } = useAuth();
  const [cards, setCards] = useState(mockDepartments);
  const [latestRecommendation, setLatestRecommendation] = useState<string | null>(null);

  const handleSwipe = (id: number, _action: 'like' | 'pass') => {
    setCards(prev => prev.filter(c => c.id !== id));
  };

  useEffect(() => {
    const loadLatestRecommendation = async () => {
      if (!token || !userId) return;
      try {
        const recommendations = await getRecommendationsByUser(userId, token);
        if (recommendations.length > 0) {
          setLatestRecommendation(recommendations[0].recommendation);
        }
      } catch {
        setLatestRecommendation(null);
      }
    };

    void loadLatestRecommendation();
  }, [token, userId]);

  return (
    <div className="min-h-screen p-6 sm:p-10 w-full max-w-7xl mx-auto flex flex-col gap-8 pb-32 sm:pb-10 transition-colors duration-700">
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col gap-2 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-600 dark:text-fuchsia-400 w-fit text-sm font-bold shadow-sm">
          <Compass className="w-4 h-4" />
          Kariyer & Gelecek Planlama
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500 dark:from-purple-400 dark:to-fuchsia-300">
          Lise Modülü
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">Geleceğine yön ver. Simülasyonlarla rotanı çiz.</p>
      </motion.header>

      {/* Row 1: Profile, Matcher, Career Paths */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        
        {/* Left Column: Character Analysis */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1 bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-2xl relative overflow-hidden flex flex-col group hover:border-fuchsia-500/50 transition-colors"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-fuchsia-500/20 transition-colors" />
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Fingerprint className="text-fuchsia-500 dark:text-fuchsia-400" /> Profilin
            </h2>
            <button 
              onClick={() => navigate('/dashboard/lise/karakter-testi')}
              className="text-xs font-bold text-fuchsia-700 dark:text-fuchsia-100 hover:text-white transition-colors bg-fuchsia-500/20 hover:bg-fuchsia-500 border border-fuchsia-500/30 px-3 py-1.5 rounded-lg shadow-sm"
            >
              Testi Çöz
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-6 relative z-10 mb-8">
             {mockTraits.map((trait, idx) => (
                <div key={idx} className="relative">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-700 dark:text-slate-200 font-bold">{trait.name}</span>
                    <span className="text-fuchsia-600 dark:text-fuchsia-300 font-bold">% {trait.value}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 dark:bg-slate-800/50 rounded-full overflow-hidden border border-white/20 dark:border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${trait.value}%` }}
                      transition={{ duration: 1, delay: 0.3 + (idx * 0.1), ease: "easeOut" }}
                      className={`h-full rounded-full ${trait.color} shadow-sm`}
                    />
                  </div>
                </div>
             ))}
          </div>
          
          <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl relative z-10 shadow-sm">
            <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-1">
              {latestRecommendation ? 'Son AI Önerin' : 'Henüz Veri Yok'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-purple-200 leading-relaxed">
              {latestRecommendation
                ? latestRecommendation
                : 'Kişilik testini çözerek baskın yönlerini ve sana uygun meslekleri keşfet.'}
            </p>
          </div>
        </motion.div>

        {/* Middle Column: Department Matching (Swipe mock) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1 flex flex-col gap-4"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <BrainCircuit className="text-fuchsia-500 dark:text-fuchsia-400" /> Eşleştirici
            </h2>
            <span className="text-xs text-purple-700 dark:text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30 font-bold">
              {cards.length} Öneri
            </span>
          </div>

          <div className="relative h-[450px] w-full flex items-center justify-center">
            <AnimatePresence>
              {cards.length > 0 ? (
                <motion.div
                  key={cards[0].id}
                  initial={{ scale: 0.95, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: -50 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="absolute w-full max-w-sm bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-white/60 dark:border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col gap-6"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-1 leading-tight">{cards[0].name}</h3>
                      <p className="text-purple-700 dark:text-purple-300 font-bold text-sm">{cards[0].uni}</p>
                    </div>
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 p-[2px] flex-shrink-0 shadow-lg shadow-purple-500/30">
                      <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex flex-col items-center justify-center">
                        <span className="text-md font-black text-slate-800 dark:text-white">{cards[0].match}</span>
                        <span className="text-[8px] text-slate-500 dark:text-slate-300 -mt-1 uppercase font-bold">Uyum</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-700 dark:text-slate-200 text-base font-medium leading-relaxed">
                    "{cards[0].desc}"
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {cards[0].tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-bold px-2 py-1 bg-white/50 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-lg text-slate-700 dark:text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between mt-auto gap-4 pt-4">
                    <button 
                      onClick={() => handleSwipe(cards[0].id, 'pass')}
                      className="flex-1 py-4 bg-white/50 dark:bg-transparent border-2 border-slate-300 dark:border-slate-600 hover:border-red-400 hover:bg-red-400/10 text-slate-500 dark:text-slate-400 hover:text-red-500 rounded-2xl flex items-center justify-center transition-all group"
                    >
                      <X className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </button>
                    <button 
                      onClick={() => handleSwipe(cards[0].id, 'like')}
                      className="flex-1 py-4 border-2 border-purple-500 bg-purple-500/10 hover:bg-purple-500 hover:text-white text-purple-700 dark:text-purple-300 rounded-2xl flex items-center justify-center transition-all group shadow-md hover:shadow-purple-500/40"
                    >
                      <Check className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                 <motion.div 
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                   className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 gap-4"
                 >
                   <Map className="w-16 h-16 text-purple-500/50" />
                   <p className="text-lg text-center font-bold">Tüm önerileri inceledin!</p>
                   <button 
                    onClick={() => setCards(mockDepartments)}
                    className="mt-2 px-6 py-2 bg-white/50 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20 rounded-full border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white font-bold transition-colors shadow-sm"
                   >
                     Başa Dön
                   </button>
                 </motion.div>
              )}
            </AnimatePresence>
            
            {/* Stack background cards */}
            {cards.length > 1 && (
              <div className="absolute w-full max-w-sm bg-white/30 dark:bg-white/5 border border-white/40 dark:border-white/5 rounded-3xl h-[450px] scale-[0.95] translate-y-4 -z-10 blur-[1px]" />
            )}
            {cards.length > 2 && (
              <div className="absolute w-full max-w-sm bg-white/20 dark:bg-white/5 border border-white/20 dark:border-white/5 rounded-3xl h-[450px] scale-[0.90] translate-y-8 -z-20 blur-[2px]" />
            )}
          </div>
        </motion.div>

        {/* Right Column: Alternative Career Paths */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-1 bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors"
        >
          <div className="flex items-center gap-3 mb-8 relative z-10">
             <Route className="w-6 h-6 text-fuchsia-600 dark:text-fuchsia-400" />
             <h2 className="text-xl font-bold text-slate-800 dark:text-white">Alternatif Rotalar</h2>
          </div>

          <div className="relative border-l-2 border-fuchsia-500/30 ml-3 space-y-8 pb-4 z-10">
            
            <div className="relative pl-6 group">
              <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-fuchsia-500 border-4 border-white dark:border-slate-900 shadow-sm" />
              <p className="text-[10px] font-black text-fuchsia-600 dark:text-fuchsia-400 tracking-wider uppercase mb-1">Klasik Rota</p>
              <h3 className="text-base font-bold text-slate-800 dark:text-white mb-1 leading-tight flex items-center gap-2">
                4 Yıllık Üniversite <GraduationCap className="w-4 h-4 text-fuchsia-500" />
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Genel akademik eğitim, kampüs hayatı ve staj imkanları ile uzun vadeli ağ kurma.
              </p>
            </div>

            <div className="relative pl-6 group">
              <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-blue-500 border-4 border-white dark:border-slate-900 shadow-sm" />
              <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-1">Hızlı Başlangıç</p>
              <h3 className="text-base font-bold text-slate-800 dark:text-white mb-1 leading-tight flex items-center gap-2">
                2 Yıllık Önlisans <GraduationCap className="w-4 h-4 text-blue-500" />
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Pratik mesleki eğitim, erken iş hayatına atılım ve dikey geçiş imkanı.
              </p>
            </div>

            <div className="relative pl-6 group">
              <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-amber-500 border-4 border-white dark:border-slate-900 shadow-sm" />
              <p className="text-[10px] font-black text-amber-600 dark:text-amber-400 tracking-wider uppercase mb-1">Modern Kariyer</p>
              <h3 className="text-base font-bold text-slate-800 dark:text-white mb-1 leading-tight flex items-center gap-2">
                Sektör Sertifikaları <Award className="w-4 h-4 text-amber-500" />
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Google, AWS veya Meta sertifikaları ile doğrudan globale hitap eden spesifik beceriler edinme.
              </p>
            </div>

          </div>
        </motion.div>

      </div>

      {/* Row 2: Exam Simulator & Campus Voices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        
        {/* Exam Net Chart (Replaces YKS Net Simülatörü) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-2xl transition-colors flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <TrendingUp className="text-fuchsia-600 dark:text-fuchsia-400" /> Deneme Net Grafiği
            </h2>
            <div className="px-3 py-1 bg-white/50 dark:bg-white/10 rounded-lg border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-600 dark:text-slate-300">
              Son 4 Deneme
            </div>
          </div>

          <div className="flex-1 w-full min-h-[200px]">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={mockExamHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d946ef" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={[50, 'dataMax + 10']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '12px', border: 'none', color: '#fff' }}
                  itemStyle={{ color: '#e2e8f0', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="net" stroke="#d946ef" strokeWidth={3} fillOpacity={1} fill="url(#colorNet)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-fuchsia-500/10 to-purple-500/10 border border-fuchsia-500/20 rounded-2xl flex items-start gap-3">
             <div className="p-2 bg-fuchsia-500/20 rounded-xl text-fuchsia-600 dark:text-fuchsia-400 shadow-sm mt-1">
               <TrendingUp className="w-5 h-5" />
             </div>
             <div>
               <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-1">Mükemmel Gidiyorsun! 🚀</h4>
               <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                 Son 4 denemede netlerini <strong>60'tan 82'ye</strong> çıkararak toplamda <strong className="text-fuchsia-600 dark:text-fuchsia-400">22 netlik</strong> bir artış sağladın. Bu istikrarla hedeflerine ulaşman an meselesi! Aynen böyle devam!
               </p>
             </div>
          </div>
        </motion.div>

        {/* Campus Voices (Mentoring) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-2xl transition-colors"
        >
          <div className="flex items-center gap-2 mb-6">
            <MessageCircle className="text-purple-600 dark:text-purple-400" />
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Kampüs Sesleri (Mentörlük)</h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {mockVoices.map((voice, idx) => (
              <div key={idx} className="bg-white/50 dark:bg-black/20 p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm relative group">
                 <div className="absolute top-4 right-4 text-5xl text-purple-500/20 dark:text-purple-500/10 font-serif leading-none opacity-50">"</div>
                 <p className="inline-block text-sm text-slate-700 dark:text-slate-300 italic mb-4 relative z-10 leading-relaxed font-medium">
                   {voice.quote}
                 </p>
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center font-bold text-purple-700 dark:text-purple-300">
                     {voice.name.charAt(0)}
                   </div>
                   <div>
                     <h4 className="text-sm font-bold text-slate-800 dark:text-white">{voice.name}</h4>
                     <p className="text-xs text-purple-600 dark:text-purple-400 font-bold">{voice.uni}</p>
                   </div>
                 </div>
              </div>
            ))}
          </div>

        </motion.div>

      </div>

      {/* Row 3: University Comparison */}
      <div className="grid grid-cols-1 relative z-10 w-full mt-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-xl dark:shadow-2xl transition-colors relative overflow-hidden"
        >
          {/* Background glows for the comparison section */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white flex items-center gap-3">
                <Building2 className="w-8 h-8 text-indigo-500 dark:text-indigo-400" /> Hedef Üniversite Karşılaştırması
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium">Bölümlerin güçlü ve zayıf yönlerini analiz et.</p>
            </div>
            
            {/* Legend */}
            <div className="flex items-center gap-6 bg-white/50 dark:bg-black/20 px-4 py-2 rounded-2xl border border-white/40 dark:border-white/5 shadow-sm">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${mockComparisonData.uni1.color} shadow-sm`} />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{mockComparisonData.uni1.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${mockComparisonData.uni2.color} shadow-sm`} />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{mockComparisonData.uni2.name}</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {mockComparisonData.criteria.map((item, idx) => {
               const Icon = item.icon;
               // Calculate which one is higher for bolding text
               const isUni1Higher = item.val1 >= item.val2;
               const isUni2Higher = item.val2 >= item.val1;

               return (
                 <div key={idx} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5 shadow-sm">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-200">{item.label}</span>
                    </div>

                    {/* Uni 1 Bar */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center px-1">
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{mockComparisonData.uni1.name}</span>
                        <span className={`text-sm font-black ${isUni1Higher ? mockComparisonData.uni1.text : 'text-slate-400 dark:text-slate-500'}`}>{item.val1}/100</span>
                      </div>
                      <div className="w-full h-3 sm:h-4 bg-slate-200 dark:bg-black/40 rounded-full overflow-hidden border border-white/20 dark:border-white/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.val1}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 * idx }}
                          className={`h-full rounded-full bg-gradient-to-r ${mockComparisonData.uni1.barColor} relative`}
                        />
                      </div>
                    </div>

                    {/* Uni 2 Bar */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center px-1">
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{mockComparisonData.uni2.name}</span>
                        <span className={`text-sm font-black ${isUni2Higher ? mockComparisonData.uni2.text : 'text-slate-400 dark:text-slate-500'}`}>{item.val2}/100</span>
                      </div>
                      <div className="w-full h-3 sm:h-4 bg-slate-200 dark:bg-black/40 rounded-full overflow-hidden border border-white/20 dark:border-white/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.val2}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 * idx }}
                          className={`h-full rounded-full bg-gradient-to-r ${mockComparisonData.uni2.barColor} relative`}
                        />
                      </div>
                    </div>
                 </div>
               )
            })}
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default LiseDashboard;

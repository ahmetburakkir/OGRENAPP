import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullPageLayout from '../components/FullPageLayout';

type SupportOption = 'subcontractor' | 'local-agent' | 'technical-expert' | 'partnership' | 'none';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<SupportOption>('none');

  const options = [
    {
      id: 'subcontractor' as SupportOption,
      icon: 'groups',
      title: 'Taşeron arıyorum.',
      description: 'Liman hizmetleri, operasyonel destek ve iş gücü gereksinimleriniz için profesyonel ekiplerle eşleşin.'
    },
    {
      id: 'local-agent' as SupportOption,
      icon: 'anchor',
      title: 'Yerel acente arıyorum.',
      description: 'Belirli bölge veya limanlarda gemi acenteliği ve resmi prosedür yönetimi için uzman desteği alın.'
    },
    {
      id: 'technical-expert' as SupportOption,
      icon: 'engineering',
      title: 'Teknik uzman arıyorum.',
      description: 'Bakım, onarım, sörvey ve teknik denetim hizmetleri için kalifiye uzmanlara ulaşın.'
    },
    {
      id: 'partnership' as SupportOption,
      icon: 'handshake',
      title: 'İş ortaklığı arıyorum.',
      description: 'Uzun vadeli stratejik iş birlikleri ve geniş çaplı denizcilik projeleri için partnerler bulun.'
    }
  ];

  const handleOptionClick = (optionId: SupportOption) => {
    setSelectedOption(optionId);
  };

  const handleContinue = () => {
    if (selectedOption && selectedOption !== 'none') {
      const routes: Record<Exclude<SupportOption, 'none'>, string> = {
        'local-agent': '/local-agent',
        'subcontractor': '/subcontractor',
        'technical-expert': '/technical-expert',
        'partnership': '/partnership'
      };
      navigate(routes[selectedOption] || '/');
    }
  };

  return (
    <FullPageLayout>
      {/* Header / Navigation */}
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
            <span className="material-icons-round text-white text-2xl">directions_boat</span>
          </div>
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Portlink
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 hover:text-primary transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
            <span className="material-icons-round">help_outline</span>
          </button>
          <div className="h-6 w-px bg-slate-300 dark:bg-slate-700"></div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">TR</span>
            <span className="material-icons-round text-sm text-slate-400">keyboard_arrow_down</span>
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
          >
            Çıkış
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 overflow-y-auto">
        <div className="max-w-5xl w-full">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full text-primary font-semibold text-sm mb-6">
              <span className="material-icons-round text-base">info</span>
              İhtiyacınızı seçin, size en uygun çözümü bulalım.
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
              Nasıl bir destek
              <span className="block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                arıyorsunuz?
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              İhtiyaçlarınıza en uygun çözüm ortağını bulmanıza yardımcı olalım. Lütfen size uygun olan seçeneği işaretleyin.
            </p>
          </div>

          {/* Job Type Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                className={`group relative flex flex-col p-8 bg-white dark:bg-slate-800 border-2 rounded-2xl text-left transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 focus:ring-4 focus:ring-primary/20 ${
                  selectedOption === option.id
                    ? 'border-primary shadow-2xl shadow-primary/10 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10'
                    : 'border-slate-200 dark:border-slate-700 hover:border-primary/50 bg-white dark:bg-slate-800'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 ${
                  selectedOption === option.id
                    ? 'bg-primary/20 dark:bg-primary/30 shadow-lg shadow-primary/20'
                    : 'bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/15'
                }`}>
                  <span className="material-icons-round text-4xl text-primary">
                    {option.icon}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{option.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {option.description}
                </p>
                <div className={`absolute top-6 right-6 transition-all duration-300 ${
                  selectedOption === option.id 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-75 group-hover:opacity-50'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    selectedOption === option.id 
                      ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                  }`}>
                    <span className="material-icons-round text-lg">
                      {selectedOption === option.id ? 'check' : 'radio_button_unchecked'}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={handleContinue}
              disabled={!selectedOption}
              className="group bg-primary hover:bg-primary/90 text-white font-bold py-5 px-16 rounded-xl text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
            >
              Devam Et
              <span className="material-icons-round group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
            <button className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors flex items-center gap-1">
              <span className="material-icons-round text-base">help_outline</span>
              Farklı bir şey mi arıyorsun? Bizimle iletişime geç
            </button>
          </div>
        </div>
      </main>

      {/* Visual Background Element */}
      <div className="fixed bottom-0 left-0 w-full h-1/3 pointer-events-none opacity-10 -z-10 bg-gradient-to-t from-primary/20 via-primary/10 to-transparent"></div>
      <div className="fixed top-0 right-0 w-96 h-96 pointer-events-none opacity-5 -z-10 bg-primary rounded-full blur-3xl"></div>

      {/* Simple Page Footer */}
      <footer className="w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-8 text-center text-slate-400 dark:text-slate-500 text-sm border-t border-slate-200/50 dark:border-slate-800/50 mt-auto flex-shrink-0">
        <p>© 2024 Portlink Maritime Marketplace. Tüm hakları saklıdır.</p>
      </footer>
    </FullPageLayout>
  );
};

export default Home;

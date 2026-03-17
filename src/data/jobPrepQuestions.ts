export interface JobPrepQuestion {
  id: string;
  competency: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export const jobPrepQuestions: JobPrepQuestion[] = [
  {
    id: 'culture_fit',
    competency: 'Kültürel Uyum (Culture Fit)',
    question: 'Yeni çalışmaya başladığın şirkette herkes öğle yemeklerini beraber yerken, sen genellikle masanda tek başına yemeyi tercih ediyorsundur. Birkaç hafta sonra müdürün "Ekiple daha fazla kaynaşman iyi olabilir" diyerek sana hafifçe dokundurur. Ne yaparsın?',
    options: {
      A: "Masamda yememin işime engel olmadığını ve özel alanıma saygı duyulması gerektiğini söylerim.",
      B: "Sadece haftada bir veya iki gün ekiple yemeğe çıkarak onlara uyum sağlamaya çalışır, diğer günler rutinimi korurum.",
      C: "Kendi başıma kalmamın şirketin kültürüne uygun olmadığını fark edip her gün onlarla yemeğe çıkmaya zorlarım.",
      D: "Ekiple hiç yemeğe çıkmasam bile onlarla sadece iş toplantılarında ekstra sosyalleşmeye çalışırım."
    },
    correctAnswer: 'B',
    explanation: 'Kendi sınırlarını tamamen ortadan kaldırmak (C) tükenmişlik yaratabilir, tamamen reddetmek (A) kültür dışı kalmana sebep olur. Orta yolu bularak efora açık olduğunu göstermek (B) en sağlıklı uyum sürecidir.'
  },
  {
    id: 'communication',
    competency: 'İletişim Becerileri',
    question: 'Ekipçe çalıştığınız bir projede, iş arkadaşın tasarım konusunda senin hiç katılmadığın, ancak kendisinin harika olduğunu düşündüğü bir fikir ortaya atar. Fikir açıkça projenin hedef kitlesine uymamaktadır. Nasıl tepki verirsin?',
    options: {
      A: "Fikrinin hedef kitle için yetersiz olduğunu tüm detaylarıyla, güçlü bir ses tonuyla masaya koyarım.",
      B: "Morali bozulmasın diye fikri biraz törpüleyerek kullanmayı kabul ederim.",
      C: "Fikrin yaratıcı kısımlarını takdir edip, ardından ortak hedef kitlemiz üzerinden yapıcı bir dille endişelerimi sorarak tartışmaya açarım.",
      D: "Tasarımın son karar vericisi kimse konuyu direkt ona taşırım ki zaman kaybetmeyelim."
    },
    correctAnswer: 'C',
    explanation: 'Çatışma çözümü ve etkin iletişimde "sandviç metodu" (olumlu başla, geliştirilebilir yönü hedef üzerinden ver) kullanmak hem fikri öldürmez hem de veri/hedef odaklı tartışma yaratır.'
  },
  {
    id: 'problem_solving',
    competency: 'Problem Çözme Yeteneği',
    question: 'Cuma akşamı saat 17:00. Müşteriye teslim edilecek dosyada kritik bir hata fark ettin. Proje yöneticisi çıkmış ve ona ulaşılamıyor. Müşteri 17:30\'da dosyayı bekliyor. Yaklaşımın ne olur?',
    options: {
      A: "Hatayı düzeltip, proje yöneticisinden onay almadan sorumluluğu üstlenir ve dosyayı müşteriye zamanında iletirim.",
      B: "Sorumluluk bende olmadığı için proje yöneticisine e-posta atar ve pazartesi sabahına kadar beklerim.",
      C: "Hatayı düzeltirim, ancak müşteriye gecikmeli göndereceğimi söyleyerek proje yöneticisine ulaşana kadar bekletirim.",
      D: "Hatayı düzeltip müşteriye iletirim ve hemen ardından proje yöneticisine yapılan değişikliği ve sebebini detaylıca raporlarım."
    },
    correctAnswer: 'D',
    explanation: 'Kritik kriz anında inisiyatif alıp sorunu çözmek ve eşzamanlı olarak doğru kanallara bilgilendirme yapmak (D), sadece inisiyatif alıp raporlamamaktan (A) veya eylemsiz kalmaktan (B) daha profesyoneldir.'
  },
  {
    id: 'learning_agility',
    competency: 'Öğrenme Çevikliği (Learning Agility)',
    question: 'Şirketiniz tüm altyapısını senin daha önce hiç kullanmadığın, yeni çıkan bir yazılıma taşımaya karar verdiğini duyuruyor. Geçiş için 1 ay süre var. Nasıl bir yol izlersin?',
    options: {
      A: "Yazılımın temel eğitim videolarını bulur, kurcalamaya başlar ve ekip içinde küçük bir deneme projesi öneririm.",
      B: "Şirketin resmi eğitimler vermesini ve detaylı dokümantasyon sağlamasını beklerim.",
      C: "Eski yazılımı kullanmaya devam ederken yeni yazılıma sadece mecbur kaldığımda geçiş yaparım.",
      D: "Daha deneyimli iş arkadaşlarımdan programı benim yerime kurmalarını ve bana temel işlevleri ezberletmelerini rica ederim."
    },
    correctAnswer: 'A',
    explanation: 'Öğrenme çevikliği, resmi eğitimi beklemeden proaktif olarak araştırmak, denemek ve başarısızlıktan korkmamakla (deneme projesi) ilgilidir.'
  },
  {
    id: 'emotional_intelligence',
    competency: 'Duygusal Zeka (EQ)',
    question: 'Gergin geçen bir toplantı sırasında, bir çalışma arkadaşın projedeki gecikmenin direkt senin hatan olduğunu yüksek sesle dile getiriyor. Gerçekte hata ortak bir yanlış anlaşılmadan kaynaklanmış. İlk tepkin ne olur?',
    options: {
      A: "Derhal belgeleri açıp hatanın aslında onun eksik e-postasından kaynaklandığını toplantıdaki herkese kanıtlarım.",
      B: "Tepkisiz kalır, toplantı sonrasında konuyu sessizce yöneticime iletirim.",
      C: "Derin bir nefes alıp suçlamayı kişiselleştirmeden, 'Görünüşe göre bir iletişim kopukluğu olmuş, hadi bunu nasıl toparlayacağımıza odaklanalım' derim.",
      D: "O an tartışmayı büyümemek için hatayı üstlenir ve toplantı bitince onunla bir daha konuşmam."
    },
    correctAnswer: 'C',
    explanation: 'Duygusal zeka (EQ), baskı altında tepkiselliği (reaktivite) kontrol edebilmek ve durumu şahsileştirmeden çözüm odaklı (proaktif) yaklaşıma taşıyabilmektir.'
  },
  {
    id: 'teamwork',
    competency: 'Ekip Çalışması ve İş Birliği',
    question: 'Üç kişilik bir ekipsiniz. Kendi bölümünü erken bitirdin ancak diğer iki ekip arkadaşın teknik bir soruna takılıp geride kaldı. Teslim tarihine daha 3 gün var. Senin tutumun hangisi olur?',
    options: {
      A: "İşimi bitirmenin rahatlığıyla 3 gün boyunca kendime boş zaman yaratırım.",
      B: "Takıldıkları yeri incelemeyi teklif edip, kendi uzmanlığım varsa onlara mentorluk yaparım.",
      C: "İşleri benim üzerime yıkmalarından korktuğum için yardım teklif etmem ama uzaktan izlerim.",
      D: "Onların bölümü yetişmezse projenin iptal olmaması için işlerini ellerinden alıp kendim tamamlarım."
    },
    correctAnswer: 'B',
    explanation: 'İyi bir takım oyuncusu kendi sorumluluğu bitse dahi projenin bütününü düşünür. Görevi devralmak (D) öğrenmelerini engeller, destek sunmak (B) takımın kapasitesini geliştirir.'
  },
  {
    id: 'ownership',
    competency: 'Sorumluluk ve Sahiplenme (Ownership)',
    question: 'Aylardır üzerinde çalıştığınız bir ürün lansmanında, senin kontrol ettiğin modül yüzünden küçük bir çökme yaşanıyor. Ancak sistem otomatik kurtarma ile olayı 5 dakikada atlatıyor ve kimse fark etmiyor. Ne yaparsın?',
    options: {
      A: "Kimse fark etmediği için bir daha olmaması adına kendi kendime düzeltir, konuyu kapatırım.",
      B: "Hemen sorunun kök nedenini analiz eder, bulduğum hatayı ve çözümü şeffaf bir şekilde ekibe/yönetime raporlarım.",
      C: "Eğer sorarlarsa açıklarım, sormazlarsa durumu geçiştiririm.",
      D: "Sistemin tasarımı zaten çökmeye müsait olduğu için sorunu altyapı ekibinin eksikliğine bağlarım."
    },
    correctAnswer: 'B',
    explanation: 'Sahiplenme duygusu (Ownership), görünmeyen hataları bile organizasyonun öğrenme hanesine yazabilmek için gizlememek, analiz edip dürüstçe paylaşmak demektir.'
  },
  {
    id: 'adaptability',
    competency: 'Esneklik ve Uyumluluk',
    question: 'Büyük ve detaylı bir raporun tam taslağını bitirdiğin anda, yöneticin gelip müşteri talebinin o sabah tamamen değiştiğini, raporun yeni baştan yazılması gerektiğini söylüyor. Nasıl karşılarsın?',
    options: {
      A: "Bütün emeğimin çöpe gittiğini belirterek yöneticime neden beni daha erken uyarmadığını sorarım.",
      B: "Eski rapordaki bazı verilerin yeni talebe uymasa bile zaman kazanmak için yeni raporda da kullanılmasında ısrar ederim.",
      C: "Kısa bir hayal kırıklığı yaşasam da, eski raporda hangi kısımların geri dönüştürülebileceğini analiz edip hızlıca yeni yapıya odaklanırım.",
      D: "Müşterilerin ne istediğini bilmediğini düşünerek yeni raporu sadece zorunluluktan ve asgari çabayla yaparım."
    },
    correctAnswer: 'C',
    explanation: 'Esneklik, değişkenlik ve emek kaybı karşısında duygusal olarak yıkılmadan mevcut kaynakları (geri dönüştürülebilir kısımlar) analiz ederek hızla yeni duruma adapte olmaktır.'
  },
  {
    id: 'time_management',
    competency: 'Zaman Yönetimi ve Planlama',
    question: 'Mesai başlangıcında önüne 3 farklı iş geldi: 1. Acil ama etkisi düşük bir operasyon problemi, 2. Gelecek haftaya yetişmesi gereken çok önemli bir strateji sunumu, 3. Bir saat içinde cevaplanması istenen rutin e-postalar. Nasıl önceliklendirirsin?',
    options: {
      A: "Önce e-postaları yanıtlar, sonra acil operasyon problemini çözer, strateji sunumunu yarına bırakırım.",
      B: "Sadece strateji sunumuna odaklanıp diğer her şeyi sunum bitene kadar görmezden gelirim.",
      C: "E-postaları hızlıca bitirir, strateji sunumuna günün en verimli saatlerini ayırır, operasyon problemi için destek ister veya gün sonuna bırakırım.",
      D: "Acil operasyon problemiyle uğraşırken e-postaları da bir yandan yanıtlar (multi-tasking), kalan kısa vakitlerde sunuma bakarım."
    },
    correctAnswer: 'C',
    explanation: 'Eisenhower matrisi prensiplerine göre "Önemli ama acil olmayan" (strateji) işlere en çok efor ayrılmalıdır. "Acil ama önemsiz" (operasyon/rutin) işler delege edilmeli veya hızlıca aradan çıkarılmalıdır.'
  },
  {
    id: 'leadership',
    competency: 'Liderlik Potansiyeli',
    question: 'Proje yöneticiniz ani bir sağlık sorunu nedeniyle 1 haftalığına izne ayrıldı ve takımda herkes panik halinde "Şimdi kim ne yapacak?" diye birbirine bakıyor. Yeni giren (junior) çalışan olmana rağmen ne yaparsın?',
    options: {
      A: "Daha kıdemli birinin inisiyatif almasını sessizce beklerim.",
      B: "\"Ben artık projeyi yönetiyorum\" diyerek herkese kendimce görevler dağıtırım.",
      C: "Yöneticinin bıraktığı notları toparlayıp, 'Arkadaşlar gelin nerede kaldığımızı masaya yatıralım' diyerek organik bir organizasyon sürecine ön ayak olurum.",
      D: "Yönetici gelene kadar sadece daha önce bana verilmiş kendi spesifik kod/tasarım işime odaklanırım."
    },
    correctAnswer: 'C',
    explanation: 'Gerçek liderlik unvanla değil inisiyatifle ortaya çıkar. Ancak junior iken otorite taslamak (B) yerine fasilitatör (kolaylaştırıcı) rolü üstlenmek (C) en doğru liderlik potansiyeli göstergesidir.'
  },
  {
    id: 'feedback_receptivity',
    competency: 'Eleştiriye ve Geri Bildirime Açıklık',
    question: 'Altı aydır çalıştığın kod modülü üzerinde yapılan "Code Review (Kod İncelemesi)" toplantısında tecrübeli bir mühendis, kodunun çalışmasına rağmen mimarisinin çok hantal olduğunu ve baştan yazılması gerektiğini söylüyor. Performansın nasıl olur?',
    options: {
      A: "Geri bildirimini teşekkürle alır, ancak çalışan bir sistemi bozup fazladan efor harcamayı reddederim.",
      B: "Kodu neden böyle yazdığımı defalarca kanıtlamaya çalışır, savunmaya geçerim.",
      C: "Hangi kısımların hantal olduğunu daha somut açıklaması için sorular sorar, daha iyi bir mimariyi kavramak için notlar alırım.",
      D: "Bunca emeğimi hiçe saydığını düşünüp doğrudan motivasyon düşüklüğü yaşar ve onunla iletişimi keserim."
    },
    correctAnswer: 'C',
    explanation: 'Geri bildirim bir saldırı değil gelişim fırsatıdır. Savunmaya geçmek veya sadece dinleyip uygulamamak yerine, konuyu daha derin anlamak için soru sorarak (C) gelişimi tetiklemek gerekir.'
  },
  {
    id: 'integrity',
    competency: 'Etik Değerler ve Güvenilirlik',
    question: 'Bir sistem zafiyeti keşfettin. Bu zafiyet sayesinde şirketin performans ölçüm modülünde hedeflerine ulaşmış gibi görünmen ve prim alman mümkün. Ve sistem kesinlikle yakalanamayacak şekilde tasarlanmış. Yaklaşımın nedir?',
    options: {
      A: "Haksızlık olduğu için kendim kullanmam ama yöneticime söylemekten de çekinirim.",
      B: "Kısa bir kereliğine kendi performansımı artırmak için dener, sonra kimse fark etmeden bırakırım.",
      C: "Sistemi test edip doğruluğunu onayladıktan sonra hemen BT (IT) güvenlik departmanına rapor ederim.",
      D: "Sadece çok sevdiğim güvendiğim çalışma arkadaşlarıma bundan bahsedip ortak bir karar alırım."
    },
    correctAnswer: 'C',
    explanation: 'Gerçek etik (Integrity), "kimse bakmadığında da doğru olanı yapmaktır." Zafiyeti bildirerek (C) kurumun güvenliğini ve kendi profesyonel bütünlüğünü korumuş olursun.'
  }
];

// Fallback sample news data — always available even when RSS feeds fail

const sampleNews = [
  // ═══════════════ NATIONAL NEWS ═══════════════
  {
    id: 'sample_nat_1',
    title: 'प्रधानमंत्री ने नई शिक्षा नीति के तहत 500 नए केंद्रीय विद्यालयों की घोषणा की',
    summary: 'केंद्र सरकार ने ग्रामीण क्षेत्रों में शिक्षा को बढ़ावा देने के लिए 500 नए केंद्रीय विद्यालय खोलने की योजना की घोषणा की है। इस पहल से लगभग 5 लाख छात्रों को गुणवत्तापूर्ण शिक्षा मिलेगी।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    category: 'national',
    source: 'Dainik Jagran',
    lang: 'hi',
    isRss: false,
    breaking: true,
  },
  {
    id: 'sample_nat_2',
    title: 'संसद में नया डिजिटल इंडिया विधेयक पेश — साइबर सुरक्षा पर जोर',
    summary: 'सरकार ने डिजिटल इंडिया विधेयक 2026 संसद में पेश किया। इसमें डेटा प्राइवेसी, AI रेगुलेशन और साइबर अपराध रोकथाम के लिए नए प्रावधान शामिल हैं।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    category: 'national',
    source: 'The Hindu',
    lang: 'hi',
    isRss: false,
    breaking: true,
  },
  {
    id: 'sample_nat_3',
    title: 'भारत ने चंद्रयान-4 मिशन की तारीख की घोषणा की — 2027 में होगा लॉन्च',
    summary: 'ISRO ने चंद्रयान-4 मिशन के लिए 2027 की पहली तिमाही का लक्ष्य रखा है। इस मिशन में चंद्रमा से मिट्टी के नमूने पृथ्वी पर लाए जाएंगे।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    category: 'national',
    source: 'Hindustan Times',
    lang: 'hi',
    isRss: false,
    featured: true,
  },
  {
    id: 'sample_nat_4',
    title: 'RBI ने रेपो रेट में 0.25% की कटौती की — EMI में राहत की उम्मीद',
    summary: 'भारतीय रिजर्व बैंक ने मौद्रिक नीति समीक्षा में रेपो रेट को 6.25% से घटाकर 6% कर दिया है। इससे होम लोन और कार लोन की EMI कम होने की संभावना है।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    category: 'national',
    source: 'Amar Ujala',
    lang: 'hi',
    isRss: false,
  },
  {
    id: 'sample_nat_5',
    title: 'Indian Railways launches 10 new Vande Bharat Express routes connecting tier-2 cities',
    summary: 'The Ministry of Railways announced 10 new Vande Bharat routes connecting smaller cities. The trains will feature upgraded interiors and enhanced connectivity for passengers.',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    category: 'national',
    source: 'Times of India',
    lang: 'en',
    isRss: false,
  },
  {
    id: 'sample_nat_6',
    title: 'देश भर में मानसून की तैयारी — IMD ने जारी की पहली भविष्यवाणी',
    summary: 'मौसम विभाग ने इस साल सामान्य से अधिक बारिश का अनुमान लगाया है। किसानों के लिए यह अच्छी खबर है लेकिन बाढ़ प्रभावित इलाकों में सतर्कता जरूरी।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    category: 'national',
    source: 'Dainik Bhaskar',
    lang: 'hi',
    isRss: false,
  },
  {
    id: 'sample_nat_7',
    title: 'Supreme Court issues landmark ruling on right to digital privacy',
    summary: 'The Supreme Court expanded the scope of fundamental rights to include digital privacy, calling it essential in the modern information age.',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    category: 'national',
    source: 'The Hindu',
    lang: 'en',
    isRss: false,
  },
  {
    id: 'sample_nat_8',
    title: 'किसान सम्मान निधि की 17वीं किस्त जारी — 9 करोड़ किसानों के खाते में भेजे गए ₹2000',
    summary: 'प्रधानमंत्री ने पीएम किसान योजना की 17वीं किस्त जारी की। इस बार 9 करोड़ से अधिक पात्र किसानों के बैंक खातों में सीधे ₹2000 ट्रांसफर किए गए।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    category: 'national',
    source: 'Dainik Jagran',
    lang: 'hi',
    isRss: false,
  },

  // ═══════════════ WORLD NEWS ═══════════════
  {
    id: 'sample_world_1',
    title: 'UN Climate Summit 2026: Nations agree on ambitious carbon reduction targets',
    summary: 'Over 190 countries signed a historic agreement at the UN Climate Summit to achieve net-zero emissions by 2045, with new financial commitments for developing nations.',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    category: 'world',
    source: 'The Hindu',
    lang: 'en',
    isRss: false,
  },
  {
    id: 'sample_world_2',
    title: 'अमेरिका-चीन व्यापार समझौता — टैरिफ में कमी पर सहमति',
    summary: 'अमेरिका और चीन ने द्विपक्षीय व्यापार तनाव कम करने के लिए एक नई संधि पर हस्ताक्षर किए हैं जिसमें दोनों देश टैरिफ में चरणबद्ध कटौती करेंगे।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    category: 'world',
    source: 'Hindustan Times',
    lang: 'hi',
    isRss: false,
  },
  {
    id: 'sample_world_3',
    title: 'NASA discovers water-rich exoplanet in habitable zone of nearby star',
    summary: 'NASA\'s James Webb Space Telescope has identified a rocky exoplanet with evidence of liquid water just 40 light-years from Earth, marking a major milestone in astrobiology.',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    category: 'world',
    source: 'Times of India',
    lang: 'en',
    isRss: false,
  },
  {
    id: 'sample_world_4',
    title: 'जापान में भूकंप — 6.8 तीव्रता, सुनामी की चेतावनी जारी',
    summary: 'जापान के तटीय क्षेत्र में 6.8 तीव्रता का भूकंप आया है। अधिकारियों ने प्रशांत महासागर तटीय क्षेत्रों के लिए सुनामी चेतावनी जारी की है।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    category: 'world',
    source: 'Amar Ujala',
    lang: 'hi',
    isRss: false,
    breaking: true,
  },
  {
    id: 'sample_world_5',
    title: 'European Union approves comprehensive AI regulation framework',
    summary: 'The EU Parliament voted to implement strict AI governance rules, requiring transparency in AI decision-making and banning facial recognition in public spaces.',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    category: 'world',
    source: 'The Hindu',
    lang: 'en',
    isRss: false,
  },
  {
    id: 'sample_world_6',
    title: 'ब्रिटेन में भारतीय छात्रों के लिए नए वीजा नियम — पोस्ट-स्टडी वर्क वीजा 4 साल',
    summary: 'ब्रिटेन सरकार ने भारतीय छात्रों के लिए पोस्ट-स्टडी वर्क वीजा को 2 साल से बढ़ाकर 4 साल कर दिया है, जिससे ग्रेजुएशन के बाद काम के अवसर बढ़ेंगे।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    category: 'world',
    source: 'Dainik Bhaskar',
    lang: 'hi',
    isRss: false,
  },
  {
    id: 'sample_world_7',
    title: 'WHO declares end of global health emergency, urges continued vigilance',
    summary: 'The World Health Organization officially declared an end to the ongoing global health emergency, while stressing the importance of continued surveillance and preparedness.',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
    category: 'world',
    source: 'Times of India',
    lang: 'en',
    isRss: false,
  },
  {
    id: 'sample_world_8',
    title: 'पाकिस्तान में राजनीतिक संकट गहराया — प्रधानमंत्री के खिलाफ अविश्वास प्रस्ताव',
    summary: 'पाकिस्तान की नेशनल असेंबली में विपक्ष ने प्रधानमंत्री के खिलाफ अविश्वास प्रस्ताव पेश किया। देश में राजनीतिक अस्थिरता के बीच सेना की भूमिका पर सवाल उठ रहे हैं।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    category: 'world',
    source: 'Dainik Jagran',
    lang: 'hi',
    isRss: false,
  },
  {
    id: 'sample_world_9',
    title: 'रूस-यूक्रेन युद्धविराम वार्ता — संयुक्त राष्ट्र की मध्यस्थता में नई उम्मीद',
    summary: 'संयुक्त राष्ट्र की मध्यस्थता में रूस और यूक्रेन के बीच शांति वार्ता फिर से शुरू हुई। दोनों देशों के प्रतिनिधि जेनेवा में मिले और युद्धविराम पर सहमति की संभावना बताई जा रही है।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(),
    category: 'world',
    source: 'Amar Ujala',
    lang: 'hi',
    isRss: false,
  },
  {
    id: 'sample_world_10',
    title: 'चीन की अर्थव्यवस्था में मंदी — GDP वृद्धि दर 4% से नीचे आई',
    summary: 'चीन की जीडीपी वृद्धि दर 2026 की पहली तिमाही में 3.8% रही, जो पिछले एक दशक का सबसे निचला स्तर है। रियल एस्टेट संकट और कम होती मांग इसकी मुख्य वजह बताई जा रही है।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 13 * 60 * 60 * 1000).toISOString(),
    category: 'world',
    source: 'Navbharat Times',
    lang: 'hi',
    isRss: false,
  },
  {
    id: 'sample_world_11',
    title: 'इजरायल-हमास संघर्ष — गाजा में नई शांति योजना पर चर्चा',
    summary: 'मिस्र और कतर की मध्यस्थता से इजरायल और हमास के बीच एक नई युद्धविराम योजना पर बातचीत हो रही है। अमेरिका ने इस योजना का समर्थन किया है।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    category: 'world',
    source: 'Dainik Bhaskar',
    lang: 'hi',
    isRss: false,
  },
  {
    id: 'sample_world_12',
    title: 'नेपाल में भूस्खलन — 50 से अधिक मृत, राहत एवं बचाव कार्य जारी',
    summary: 'नेपाल के कर्णाली प्रदेश में भारी बारिश के कारण हुए भूस्खलन में 50 से अधिक लोगों की मौत हो गई है। भारत ने राहत सामग्री और बचाव दल भेजे हैं।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
    category: 'world',
    source: 'Live Hindustan',
    lang: 'hi',
    isRss: false,
    breaking: true,
  },

  // ═══════════════ EDUCATION ═══════════════
  {
    id: 'sample_edu_1',
    title: 'CBSE Board Exam 2026: Results expected by May end — check details',
    summary: 'CBSE Class 10 and 12 board exam results are expected to be declared by the last week of May. Students can check results on the official CBSE website.',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    category: 'education',
    source: 'Times of India',
    lang: 'en',
    isRss: false,
  },
  {
    id: 'sample_edu_2',
    title: 'JEE Main 2026 — सत्र 2 की तारीखें घोषित, 15 अप्रैल से शुरू होंगी परीक्षाएं',
    summary: 'NTA ने JEE Main 2026 सत्र 2 की परीक्षा तारीखों की घोषणा कर दी है। परीक्षा 15 अप्रैल से 30 अप्रैल के बीच आयोजित की जाएगी।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    category: 'education',
    source: 'Amar Ujala',
    lang: 'hi',
    isRss: false,
  },
  {
    id: 'sample_edu_3',
    title: 'IIT Delhi launches new undergraduate program in AI and Data Science',
    summary: 'IIT Delhi has introduced a B.Tech program in Artificial Intelligence and Data Science starting from the 2026-27 academic session with 60 seats.',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    category: 'education',
    source: 'The Hindu',
    lang: 'en',
    isRss: false,
  },
  {
    id: 'sample_edu_4',
    title: 'NEET UG 2026 — पंजीकरण की अंतिम तिथि 31 मार्च, जल्दी करें आवेदन',
    summary: 'मेडिकल प्रवेश परीक्षा NEET UG 2026 के लिए रजिस्ट्रेशन की आखिरी तारीख 31 मार्च है। NTA ने छात्रों से समय रहते आवेदन करने की अपील की है।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    category: 'education',
    source: 'Dainik Jagran',
    lang: 'hi',
    isRss: false,
  },
  {
    id: 'sample_edu_5',
    title: 'UGC NET June 2026 notification released — apply before April 15',
    summary: 'The University Grants Commission has released the notification for NET June 2026 examination. Candidates can apply through the official portal before April 15.',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    category: 'education',
    source: 'Hindustan Times',
    lang: 'en',
    isRss: false,
  },

  // ═══════════════ JOBS ═══════════════
  {
    id: 'sample_job_1',
    title: 'SSC CGL 2026 — 15,000 से अधिक पदों पर भर्ती, नोटिफिकेशन जारी',
    summary: 'स्टाफ सिलेक्शन कमीशन ने CGL 2026 के लिए 15,000+ पदों पर भर्ती का नोटिफिकेशन जारी किया है। ऑनलाइन आवेदन की प्रक्रिया शुरू हो चुकी है।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    category: 'jobs',
    source: 'Dainik Jagran',
    lang: 'hi',
    isRss: false,
  },
  {
    id: 'sample_job_2',
    title: 'Indian Army recruitment rally 2026: Walk-in dates for 5 states announced',
    summary: 'The Indian Army has announced recruitment rally dates for Bihar, UP, MP, Rajasthan and Maharashtra. Candidates meeting eligibility criteria can directly walk in.',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    category: 'jobs',
    source: 'Hindustan Times',
    lang: 'en',
    isRss: false,
  },
  {
    id: 'sample_job_3',
    title: 'UPSC Civil Services 2026 प्रारंभिक परीक्षा — 25 मई को होगी परीक्षा',
    summary: 'UPSC ने सिविल सेवा प्रारंभिक परीक्षा 2026 की तारीख 25 मई निर्धारित की है। इस बार कुल 1,000 पदों पर भर्ती होगी।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    category: 'jobs',
    source: 'Amar Ujala',
    lang: 'hi',
    isRss: false,
  },
  {
    id: 'sample_job_4',
    title: 'TCS, Infosys, Wipro announce 80,000 new IT hiring for freshers in 2026',
    summary: 'Top Indian IT companies have collectively announced plans to hire over 80,000 freshers in 2026, signaling a strong recovery in the technology sector.',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
    category: 'jobs',
    source: 'Times of India',
    lang: 'en',
    isRss: false,
  },

  // ═══════════════ TECHNOLOGY ═══════════════
  {
    id: 'sample_tech_1',
    title: 'India\'s first homegrown AI chip "Shakti-2" unveiled by IIT Madras',
    summary: 'IIT Madras has unveiled Shakti-2, India\'s first domestically designed AI accelerator chip capable of running large language models efficiently.',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    category: 'technology',
    source: 'The Hindu',
    lang: 'en',
    isRss: false,
    featured: true,
  },
  {
    id: 'sample_tech_2',
    title: '5G कवरेज अब 90% जिलों में — Jio और Airtel ने ग्रामीण विस्तार तेज किया',
    summary: 'भारत में 5G नेटवर्क अब देश के 90% जिलों में उपलब्ध है। Jio और Airtel ने ग्रामीण क्षेत्रों में अपने 5G नेटवर्क का तेजी से विस्तार किया है।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    category: 'technology',
    source: 'Dainik Bhaskar',
    lang: 'hi',
    isRss: false,
  },
  {
    id: 'sample_tech_3',
    title: 'WhatsApp launches AI-powered translation for 12 Indian languages',
    summary: 'WhatsApp has rolled out real-time message translation for 12 Indian languages including Hindi, Tamil, Telugu, Bengali, and Marathi using on-device AI.',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    category: 'technology',
    source: 'Times of India',
    lang: 'en',
    isRss: false,
  },
  {
    id: 'sample_tech_4',
    title: 'UPI ने मार्च में 20 अरब ट्रांजैक्शन का रिकॉर्ड बनाया',
    summary: 'भारत के UPI ने मार्च 2026 में 20 अरब ट्रांजैक्शन पूरे करके नया कीर्तिमान स्थापित किया है। इससे डिजिटल भुगतान में भारत की अगुआई और मजबूत हुई।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    category: 'technology',
    source: 'Amar Ujala',
    lang: 'hi',
    isRss: false,
  },

  // ═══════════════ HEALTH ═══════════════
  {
    id: 'sample_health_1',
    title: 'AIIMS Delhi develops breakthrough treatment for drug-resistant tuberculosis',
    summary: 'Researchers at AIIMS Delhi have developed a new drug combination that shows 95% effectiveness against multi-drug resistant tuberculosis in clinical trials.',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    category: 'health',
    source: 'The Hindu',
    lang: 'en',
    isRss: false,
  },
  {
    id: 'sample_health_2',
    title: 'आयुष्मान भारत योजना में अब कैंसर उपचार भी शामिल — 50 लाख तक का इलाज मुफ्त',
    summary: 'सरकार ने आयुष्मान भारत योजना के तहत कैंसर के इलाज को भी शामिल कर दिया है। अब पात्र लाभार्थी 50 लाख रुपये तक का कैंसर उपचार निःशुल्क करवा सकेंगे।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    category: 'health',
    source: 'Dainik Jagran',
    lang: 'hi',
    isRss: false,
  },
  {
    id: 'sample_health_3',
    title: 'Yoga Day 2026: WHO recognizes yoga as complementary therapy for mental health',
    summary: 'The World Health Organization has officially recognized yoga as a complementary therapy for anxiety, depression and stress management in its updated guidelines.',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    category: 'health',
    source: 'Hindustan Times',
    lang: 'en',
    isRss: false,
  },

  // ─── HEALTH — Diseases & Treatment ───
  { id: 'health_dis_1', title: 'Cancer treatment breakthrough: IIT Bombay develops targeted drug that destroys tumour cells in 48 hours', summary: 'IIT Bombay researchers have developed a nano-particle drug delivery system that targets and destroys tumour cells within 48 hours in lab trials, with minimal side effects on healthy tissue.', image: null, link: '#', pubDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), category: 'health', source: 'The Hindu', lang: 'en', isRss: false, featured: true },
  { id: 'health_dis_2', title: 'डेंगू और मलेरिया अलर्ट — मानसून से पहले स्वास्थ्य मंत्रालय ने जारी की एडवाइजरी', summary: 'केंद्रीय स्वास्थ्य मंत्रालय ने मानसून सीजन से पहले डेंगू और मलेरिया से बचाव के लिए एडवाइजरी जारी की है। राज्यों को फॉगिंग और जागरूकता अभियान तेज करने के निर्देश दिए गए हैं।', image: null, link: '#', pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), category: 'health', source: 'Dainik Jagran', lang: 'hi', isRss: false, breaking: true },
  { id: 'health_dis_3', title: 'Tuberculosis (TB) cases in India fall by 17% — new drug regimen credited for success', summary: 'India recorded a 17% decline in tuberculosis cases in 2025 as per WHO report. The shorter 4-month BPaL drug regimen and improved diagnostics under the Nikshay program are key factors.', image: null, link: '#', pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), category: 'health', source: 'Hindustan Times', lang: 'en', isRss: false },
  { id: 'health_dis_4', title: 'मधुमेह (Diabetes) पर बड़ी खोज — भारतीय वैज्ञानिकों ने खोजा नया इंसुलिन विकल्प', summary: 'CSIR-IGIB के वैज्ञानिकों ने टाइप-2 डायबिटीज के लिए एक नया इंसुलिन विकल्प विकसित किया है जो मुंह से लिया जा सकता है। इंजेक्शन की जरूरत नहीं होगी।', image: null, link: '#', pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), category: 'health', source: 'Amar Ujala', lang: 'hi', isRss: false },
  { id: 'health_dis_5', title: 'Heart disease now biggest killer in India — experts urge early screening after 30', summary: 'A new ICMR study shows cardiovascular disease accounts for 28% of all deaths in India. Doctors urge all adults above 30 to undergo annual heart screening and adopt low-sodium diets.', image: null, link: '#', pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), category: 'health', source: 'Times of India', lang: 'en', isRss: false },

  // ─── HEALTH — Government Schemes ───
  { id: 'health_govt_1', title: 'Ayushman Bharat — अब 70+ उम्र के सभी वरिष्ठ नागरिकों को मिलेगा ₹5 लाख का मुफ्त इलाज', summary: 'प्रधानमंत्री ने आयुष्मान भारत योजना का विस्तार किया। अब देश के सभी 70 वर्ष से अधिक आयु के वरिष्ठ नागरिकों को ₹5 लाख तक का वार्षिक स्वास्थ्य बीमा मिलेगा।', image: null, link: '#', pubDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), category: 'health', source: 'Dainik Bhaskar', lang: 'hi', isRss: false, breaking: true },
  { id: 'health_govt_2', title: 'PM Jan Arogya Yojana: 7 crore families treated free of cost since 2018 — health ministry data', summary: 'The Health Ministry reported that 7 crore families have availed free treatment under PM-JAY since its launch. Over 30,000 empanelled hospitals now serve beneficiaries across India.', image: null, link: '#', pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), category: 'health', source: 'The Hindu', lang: 'en', isRss: false },
  { id: 'health_govt_3', title: 'राष्ट्रीय स्वास्थ्य मिशन — 1 लाख नए आशा कार्यकर्ताओं की नियुक्ति, ग्रामीण स्वास्थ्य होगा मजबूत', summary: 'केंद्र सरकार ने राष्ट्रीय स्वास्थ्य मिशन के तहत 1 लाख नई आशा (ASHA) कार्यकर्ताओं की भर्ती की घोषणा की। इससे ग्रामीण क्षेत्रों में प्राथमिक स्वास्थ्य सेवाएं बेहतर होंगी।', image: null, link: '#', pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), category: 'health', source: 'Live Hindustan', lang: 'hi', isRss: false },
  { id: 'health_govt_4', title: 'Free medicines: Jan Aushadhi Kendras cross 15,000 outlets — ₹3,000 crore saved by patients', summary: 'The Pradhan Mantri Bhartiya Janaushadhi Pariyojana now has over 15,000 outlets offering generic medicines at 50-90% lower prices. Over ₹3,000 crore saved by patients in 2025.', image: null, link: '#', pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), category: 'health', source: 'Hindustan Times', lang: 'en', isRss: false },

  // ─── HEALTH — Mental Health & Wellness ───
  { id: 'health_mental_1', title: 'मानसिक स्वास्थ्य संकट — भारत में 20 करोड़ लोग डिप्रेशन और एंग्जाइटी से पीड़ित', summary: 'WHO की रिपोर्ट के अनुसार भारत में 20 करोड़ से अधिक लोग अवसाद (डिप्रेशन) और चिंता (एंग्जाइटी) से पीड़ित हैं। सरकार ने मानसिक स्वास्थ्य हेल्पलाइन iCall और Vandrevala को मजबूत किया।', image: null, link: '#', pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), category: 'health', source: 'Navbharat Times', lang: 'hi', isRss: false },
  { id: 'health_mental_2', title: 'NIMHANS study: Smartphone overuse linked to 40% rise in teen anxiety in India', summary: 'A landmark study by NIMHANS Bengaluru found smartphone use beyond 4 hours daily linked to a 40% rise in anxiety and depression among teenagers. Experts recommend digital detox breaks.', image: null, link: '#', pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), category: 'health', source: 'Times of India', lang: 'en', isRss: false },
  { id: 'health_mental_3', title: 'तनाव और नींद की कमी — हर तीसरा भारतीय नींद विकार से पीड़ित, जानिए उपाय', summary: 'एक नई स्टडी के अनुसार भारत में हर तीसरा व्यक्ति अनिद्रा (इनसोम्निया) से पीड़ित है। विशेषज्ञ मोबाइल से दूरी, मेडिटेशन और नियमित दिनचर्या अपनाने की सलाह देते हैं।', image: null, link: '#', pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), category: 'health', source: 'Amar Ujala', lang: 'hi', isRss: false },

  // ─── HEALTH — Yoga & Fitness ───
  { id: 'health_yoga_1', title: 'International Yoga Day 2026 — PM leads 1 crore people yoga session at Red Fort', summary: "Prime Minister led a massive yoga session at Red Fort with over 1 crore participants across India. This year's theme 'Yoga for One Earth, One Health' highlights global wellness.", image: null, link: '#', pubDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), category: 'health', source: 'Times of India', lang: 'en', isRss: false, featured: true },
  { id: 'health_yoga_2', title: 'आयुर्वेद को WHO मान्यता — 80 देशों में होगी भारतीय चिकित्सा पद्धति की पढ़ाई', summary: 'विश्व स्वास्थ्य संगठन ने आयुर्वेद को वैकल्पिक चिकित्सा पद्धति के रूप में आधिकारिक मान्यता दे दी है। अब 80 से अधिक देशों में आयुर्वेद पाठ्यक्रम शुरू होंगे।', image: null, link: '#', pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), category: 'health', source: 'Dainik Jagran', lang: 'hi', isRss: false },
  { id: 'health_yoga_3', title: 'Daily 30-minute walk reduces heart disease risk by 35%, ICMR study confirms', summary: 'ICMR researchers confirm that a brisk 30-minute daily walk significantly lowers the risk of cardiovascular disease by 35%, and reduces blood sugar levels in pre-diabetic patients.', image: null, link: '#', pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), category: 'health', source: 'Hindustan Times', lang: 'en', isRss: false },

  // ─── HEALTH — Hospitals & AIIMS ───
  { id: 'health_hosp_1', title: 'नए AIIMS — देश के 22 AIIMS में अब 1 लाख से अधिक बेड, मरीजों को मिलेगी राहत', summary: 'प्रधानमंत्री ने घोषणा की कि देश के 22 AIIMS अस्पतालों में अब कुल 1 लाख से अधिक बेड उपलब्ध हैं। इससे दूरदराज के इलाकों के मरीजों को विश्वस्तरीय इलाज मिलेगा।', image: null, link: '#', pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), category: 'health', source: 'Dainik Bhaskar', lang: 'hi', isRss: false, breaking: true },
  { id: 'health_hosp_2', title: "AIIMS Delhi performs India's first successful robotic heart transplant surgery", summary: "AIIMS New Delhi performed India's first fully robotic-assisted heart transplant on a 45-year-old patient. The procedure took 6 hours and the patient is recovering well.", image: null, link: '#', pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), category: 'health', source: 'The Hindu', lang: 'en', isRss: false },
  { id: 'health_hosp_3', title: 'टेलीमेडिसिन क्रांति — eSanjeevani पर 25 करोड़ मरीज कर चुके हैं ऑनलाइन परामर्श', summary: 'सरकार के eSanjeevani टेलीमेडिसिन प्लेटफॉर्म पर 25 करोड़ से अधिक ऑनलाइन परामर्श हो चुके हैं। ग्रामीण भारत में यह सुविधा स्वास्थ्य सेवाओं की पहुंच बढ़ा रही है।', image: null, link: '#', pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), category: 'health', source: 'Live Hindustan', lang: 'hi', isRss: false },

  // ─── HEALTH — Global Health (WHO) ───
  { id: 'health_global_1', title: 'WHO launches global initiative to eliminate cervical cancer — India among 11 priority nations', summary: "WHO's global strategy aims to vaccinate 90% of girls against HPV, screen 70% of women by age 35, and treat 90% of those with detected cervical disease. India is among priority nations.", image: null, link: '#', pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), category: 'health', source: 'Times of India', lang: 'en', isRss: false },
  { id: 'health_global_2', title: 'एंटीबायोटिक प्रतिरोध — WHO ने चेताया, 2050 तक 1 करोड़ मौतें हो सकती हैं सालाना', summary: 'विश्व स्वास्थ्य संगठन ने चेतावनी दी है कि अगर एंटीबायोटिक दवाओं का दुरुपयोग जारी रहा तो 2050 तक हर साल 1 करोड़ लोगों की मौत हो सकती है।', image: null, link: '#', pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), category: 'health', source: 'Navbharat Times', lang: 'hi', isRss: false },
  { id: 'health_global_3', title: 'New mRNA vaccine for HIV shows 97% antibody response in early trials — WHO hails breakthrough', summary: 'An mRNA-based HIV vaccine developed by IAVI and Moderna has shown a 97% antibody response rate in Phase 1 trials. WHO calls it the most promising HIV vaccine candidate in decades.', image: null, link: '#', pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), category: 'health', source: 'Hindustan Times', lang: 'en', isRss: false },

  // ═══════════════ ASTRO ═══════════════
  {
    id: 'sample_astro_1',
    title: 'आज का राशिफल — 20 मार्च 2026: जानिए क्या कहते हैं आपके सितारे',
    summary: 'मेष राशि के लिए आज का दिन शुभ रहेगा। वृष राशि वालों को व्यापार में लाभ होगा। मिथुन राशि के जातकों को स्वास्थ्य का ध्यान रखना चाहिए।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    category: 'astro',
    source: 'Dainik Bhaskar',
    lang: 'hi',
    isRss: false,
  },
  {
    id: 'sample_astro_2',
    title: 'साप्ताहिक राशिफल: 20-26 मार्च 2026 — सभी 12 राशियों की भविष्यवाणी',
    summary: 'इस सप्ताह सिंह राशि के जातकों को करियर में बड़ी सफलता मिलेगी। तुला राशि वालों के लिए प्रेम जीवन में नए अवसर आएंगे।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    category: 'astro',
    source: 'Amar Ujala',
    lang: 'hi',
    isRss: false,
  },

  // ═══════════════ DELHI ═══════════════
  {
    id: 'sample_delhi_1',
    title: 'Delhi Metro Phase-5 का DPR तैयार — 8 नई लाइनें प्रस्तावित',
    summary: 'दिल्ली मेट्रो फेज-5 की विस्तृत परियोजना रिपोर्ट तैयार हो गई है। इसमें 8 नई मेट्रो लाइनों का प्रस्ताव है जो NCR को और बेहतर कनेक्टिविटी देंगी।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    category: 'national',
    source: 'Hindustan Times',
    lang: 'hi',
    isRss: false,
  },
  {
    id: 'sample_delhi_2',
    title: 'Delhi government launches free electric bus service on 5 routes',
    summary: 'The Delhi government has launched free electric bus services on 5 major routes connecting residential areas to metro stations as part of its green transport initiative.',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    category: 'national',
    source: 'Times of India',
    lang: 'en',
    isRss: false,
  },
  {
    id: 'sample_delhi_3',
    title: 'दिल्ली के स्कूलों में AI लैब — 200 सरकारी स्कूलों में शुरुआत',
    summary: 'दिल्ली सरकार ने 200 सरकारी स्कूलों में आर्टिफिशियल इंटेलिजेंस लैब स्थापित करने की घोषणा की है। इससे छात्रों को AI और कोडिंग सीखने का मौका मिलेगा।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    category: 'education',
    source: 'Dainik Jagran',
    lang: 'hi',
    isRss: false,
  },

  // ═══════════════ UTTARAKHAND ═══════════════
  {
    id: 'sample_uk_1',
    title: 'उत्तराखंड — चारधाम यात्रा 2026 की तिथियां घोषित, 1 मई से शुरू',
    summary: 'उत्तराखंड सरकार ने चारधाम यात्रा 2026 के लिए कपाट खुलने की तिथियों की घोषणा कर दी है। यमुनोत्री और गंगोत्री के कपाट 1 मई को खुलेंगे।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    category: 'uttarakhand',
    source: 'Amar Ujala',
    lang: 'hi',
    isRss: false,
  },
  {
    id: 'sample_uk_2',
    title: 'देहरादून में स्मार्ट सिटी परियोजना को मंजूरी — ₹5,000 करोड़ का निवेश',
    summary: 'उत्तराखंड कैबिनेट ने देहरादून के लिए ₹5,000 करोड़ की स्मार्ट सिटी परियोजना को मंजूरी दी। इसमें स्मार्ट ट्रैफिक, डिजिटल गवर्नेंस और हरित बुनियादी ढांचा शामिल होगा।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    category: 'uttarakhand',
    source: 'Dainik Jagran',
    lang: 'hi',
    isRss: false,
  },
  {
    id: 'sample_uk_3',
    title: 'हरिद्वार में महाकुंभ की तैयारियां शुरू — 2028 के लिए बड़ा बजट स्वीकृत',
    summary: 'उत्तराखंड सरकार ने हरिद्वार महाकुंभ 2028 की तैयारियों के लिए ₹1,200 करोड़ का बजट स्वीकृत किया है। घाटों का नवीनीकरण और नई सड़कों का निर्माण होगा।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
    category: 'uttarakhand',
    source: 'Amar Ujala',
    lang: 'hi',
    isRss: false,
  },
  {
    id: 'sample_uk_4',
    title: 'नैनीताल झील को बचाने के लिए उत्तराखंड सरकार ने बनाई विशेष टास्क फोर्स',
    summary: 'नैनीताल झील में लगातार घट रहे जलस्तर को देखते हुए सरकार ने विशेषज्ञों की एक टास्क फोर्स का गठन किया है। झील की सफाई और जल प्रबंधन पर विशेष ध्यान दिया जाएगा।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    category: 'uttarakhand',
    source: 'Dainik Bhaskar',
    lang: 'hi',
    isRss: false,
  },
  {
    id: 'sample_uk_5',
    title: 'केदारनाथ धाम में नई सुविधाएं — ऑनलाइन रजिस्ट्रेशन अनिवार्य किया गया',
    summary: 'उत्तराखंड सरकार ने केदारनाथ यात्रा के लिए ऑनलाइन रजिस्ट्रेशन अनिवार्य कर दिया है। श्रद्धालुओं की भीड़ को नियंत्रित करने के लिए दैनिक सीमा भी तय की गई है।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(),
    category: 'uttarakhand',
    source: 'Navbharat Times',
    lang: 'hi',
    isRss: false,
  },
  {
    id: 'sample_uk_6',
    title: 'ऋषिकेश-कर्णप्रयाग रेल परियोजना 2027 तक होगी पूरी — CM ने की समीक्षा',
    summary: 'मुख्यमंत्री ने ऋषिकेश-कर्णप्रयाग रेल परियोजना की समीक्षा बैठक की। अधिकारियों ने बताया कि 125 किमी लंबी इस रेल लाइन का 70% काम पूरा हो चुका है।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    category: 'uttarakhand',
    source: 'Live Hindustan',
    lang: 'hi',
    isRss: false,
  },

  // ═══════════════ UTTAR PRADESH ═══════════════
  {
    id: 'sample_up_1',
    title: 'Uttar Pradesh — अयोध्या एयरपोर्ट से 5 नई अंतरराष्ट्रीय उड़ानें शुरू',
    summary: 'अयोध्या के महर्षि वाल्मीकि अंतरराष्ट्रीय हवाई अड्डे से बैंकॉक, सिंगापुर, कोलंबो, काठमांडू और दुबई के लिए नई उड़ानें शुरू होंगी।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    category: 'national',
    source: 'Dainik Bhaskar',
    lang: 'hi',
    isRss: false,
  },
  {
    id: 'sample_up_2',
    title: 'UP Board Result 2026: Class 10, 12 results expected in April first week',
    summary: 'The UP Board is expected to declare Class 10 and 12 results in the first week of April. Over 55 lakh students appeared for the examinations this year.',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    category: 'education',
    source: 'Times of India',
    lang: 'en',
    isRss: false,
  },
  {
    id: 'sample_up_3',
    title: 'लखनऊ मेट्रो का विस्तार — फेज 2 का शिलान्यास, 2028 तक पूरा होगा',
    summary: 'लखनऊ मेट्रो फेज 2 का शिलान्यास हो गया है। यह 30 किमी लंबा होगा और चारबाग से अमौसी एयरपोर्ट तक जोड़ेगा।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    category: 'national',
    source: 'Lucknow Kesari',
    lang: 'hi',
    isRss: false,
  },

  // ═══════════════ RENTAL ═══════════════
  {
    id: 'sample_rental_1',
    title: 'दिल्ली-NCR में किराये के मकानों की मांग 30% बढ़ी — गुरुग्राम सबसे महंगा',
    summary: 'रियल एस्टेट रिपोर्ट के अनुसार दिल्ली-NCR में रेंटल मार्केट में 30% की वृद्धि हुई है। गुरुग्राम में 2BHK का औसत किराया ₹25,000 प्रति माह हो गया।',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    category: 'rental',
    source: 'Hindustan Times',
    lang: 'hi',
    isRss: false,
  },
  {
    id: 'sample_rental_2',
    title: 'Government launches affordable PG accommodation scheme for working women',
    summary: 'The central government launched a new scheme to provide safe and affordable PG accommodation for working women in 10 major cities with subsidized rent.',
    image: null,
    link: '#',
    pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    category: 'rental',
    source: 'Times of India',
    lang: 'en',
    isRss: false,
  },

  // ═══════════════ STATE NEWS ═══════════════

  // Andhra Pradesh
  { id: 's_ap_1', title: 'आंध्र प्रदेश — विशाखापत्तनम में नया स्टील प्लांट, 10,000 रोजगार मिलेंगे', summary: 'राज्य सरकार ने विशाखापत्तनम में एक नए स्टील प्लांट की स्थापना को मंजूरी दी है। इससे क्षेत्र में 10,000 से अधिक प्रत्यक्ष रोजगार के अवसर पैदा होंगे।', image: null, link: '#', pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Dainik Jagran', lang: 'hi', isRss: false },
  { id: 's_ap_2', title: 'अमरावती को नई राजधानी बनाने का काम तेज — विजयवाड़ा से जुड़ेगा मेट्रो', summary: 'आंध्र प्रदेश सरकार ने अमरावती राजधानी निर्माण की गति बढ़ाई। विजयवाड़ा-अमरावती मेट्रो परियोजना का शिलान्यास जल्द होगा।', image: null, link: '#', pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Amar Ujala', lang: 'hi', isRss: false },

  // Arunachal Pradesh
  { id: 's_aru_1', title: 'अरुणाचल प्रदेश — ईटानगर में नया एयरपोर्ट बनकर तैयार, उड़ानें शुरू', summary: 'अरुणाचल प्रदेश की राजधानी ईटानगर में डोनी पोलो एयरपोर्ट से नियमित उड़ानें शुरू हो गई हैं। इससे राज्य की कनेक्टिविटी में बड़ा सुधार आएगा।', image: null, link: '#', pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Dainik Bhaskar', lang: 'hi', isRss: false },
  { id: 's_aru_2', title: 'अरुणाचल में चीन सीमा के पास नई सड़क — सेना की तैनाती मजबूत होगी', summary: 'केंद्र सरकार ने अरुणाचल प्रदेश में चीन सीमा से लगे क्षेत्रों में 200 किमी नई सड़क का निर्माण पूरा किया। इससे सीमावर्ती गांवों को कनेक्टिविटी मिलेगी।', image: null, link: '#', pubDate: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Navbharat Times', lang: 'hi', isRss: false },

  // Assam
  { id: 's_as_1', title: 'असम — गुवाहाटी में नई मेट्रो लाइन का शुभारंभ, यातायात होगा सुगम', summary: 'असम के मुख्यमंत्री ने गुवाहाटी मेट्रो की पहली लाइन का उद्घाटन किया। यह 22 किमी लंबी लाइन शहर के प्रमुख क्षेत्रों को जोड़ेगी।', image: null, link: '#', pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Amar Ujala', lang: 'hi', isRss: false },
  { id: 's_as_2', title: 'असम में बाढ़ — ब्रह्मपुत्र खतरे के निशान से ऊपर, लाखों प्रभावित', summary: 'असम के 14 जिलों में बाढ़ की स्थिति गंभीर है। ब्रह्मपुत्र नदी खतरे के निशान से ऊपर बह रही है और 20 लाख से अधिक लोग प्रभावित हैं।', image: null, link: '#', pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Dainik Jagran', lang: 'hi', isRss: false },

  // Bihar
  { id: 's_bih_1', title: 'बिहार — पटना में नई AIIMS बिल्डिंग का उद्घाटन, 1000 बेड की सुविधा', summary: 'पटना AIIMS का नया भवन बनकर तैयार हो गया है। इसमें 1000 बेड, अत्याधुनिक ऑपरेशन थिएटर और रिसर्च लैब की सुविधा है।', image: null, link: '#', pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), category: 'health', source: 'Live Hindustan', lang: 'hi', isRss: false },
  { id: 's_bih_2', title: 'बिहार चुनाव 2025 — JDU-BJP गठबंधन को बहुमत, नीतीश कुमार फिर CM', summary: 'बिहार विधानसभा चुनाव में JDU-BJP के नेतृत्व वाले गठबंधन ने 243 में से 140 सीटें जीतकर बहुमत हासिल किया।', image: null, link: '#', pubDate: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Dainik Bhaskar', lang: 'hi', isRss: false },

  // Chhattisgarh
  { id: 's_cg_1', title: 'छत्तीसगढ़ — रायपुर में IT पार्क का उद्घाटन, युवाओं को मिलेंगे रोजगार', summary: 'छत्तीसगढ़ के मुख्यमंत्री ने रायपुर में नए IT पार्क का उद्घाटन किया। यहां 50 से अधिक IT कंपनियां आएंगी और 15,000 युवाओं को रोजगार मिलेगा।', image: null, link: '#', pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), category: 'jobs', source: 'Dainik Jagran', lang: 'hi', isRss: false },
  { id: 's_cg_2', title: 'छत्तीसगढ़ में नक्सल मुक्त गांव — भिलाई के 50 गांवों में शांति की वापसी', summary: 'छत्तीसगढ़ पुलिस और सुरक्षा बलों के अभियान के बाद भिलाई क्षेत्र के 50 गांव नक्सल मुक्त हुए। ग्रामीणों ने खुशी मनाई।', image: null, link: '#', pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Navbharat Times', lang: 'hi', isRss: false },

  // Goa
  { id: 's_goa_1', title: 'गोवा — पर्यटन में रिकॉर्ड: पणजी में 1 करोड़ पर्यटक आए इस साल', summary: 'गोवा में 2025-26 के पर्यटन सीजन में एक करोड़ से अधिक पर्यटक आए, जो अब तक का रिकॉर्ड है। राज्य सरकार ने बुनियादी ढांचे के विस्तार की योजना बनाई है।', image: null, link: '#', pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Times of India', lang: 'hi', isRss: false },
  { id: 's_goa_2', title: 'गोवा में नई बंदरगाह परियोजना — मोपा एयरपोर्ट के पास बनेगा मेगा पोर्ट', summary: 'केंद्र सरकार ने गोवा के मोपा क्षेत्र में एक मेगा पोर्ट बनाने की मंजूरी दी है। इससे राज्य की समुद्री व्यापार क्षमता बढ़ेगी।', image: null, link: '#', pubDate: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Dainik Bhaskar', lang: 'hi', isRss: false },

  // Gujarat
  { id: 's_guj_1', title: 'गुजरात — अहमदाबाद मेट्रो फेज-2 का काम शुरू, 2027 तक होगा पूरा', summary: 'अहमदाबाद मेट्रो फेज-2 के निर्माण कार्य की आधिकारिक शुरुआत हो गई। 40 किमी के इस विस्तार से शहर के 30 नए क्षेत्र मेट्रो से जुड़ेंगे।', image: null, link: '#', pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Dainik Jagran', lang: 'hi', isRss: false },
  { id: 's_guj_2', title: 'सूरत डायमंड बोर्स — दुनिया के सबसे बड़े व्यापार केंद्र में रिकॉर्ड कारोबार', summary: 'सूरत में स्थापित दुनिया के सबसे बड़े ऑफिस बिल्डिंग — सूरत डायमंड बोर्स में इस साल ₹2 लाख करोड़ का हीरा व्यापार हुआ।', image: null, link: '#', pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Amar Ujala', lang: 'hi', isRss: false },

  // Haryana
  { id: 's_har_1', title: 'हरियाणा — गुरुग्राम में 5 नए मेट्रो स्टेशन, रेजिडेंट्स को मिलेगी राहत', summary: 'हरियाणा सरकार ने गुरुग्राम मेट्रो के विस्तार को मंजूरी दी। नए 5 स्टेशन साइबर सिटी और सोहना रोड को जोड़ेंगे।', image: null, link: '#', pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Dainik Bhaskar', lang: 'hi', isRss: false },
  { id: 's_har_2', title: 'हरियाणा में किसान आंदोलन — MSP गारंटी की मांग पर किसानों का मार्च', summary: 'हरियाणा के किसान एमएसपी गारंटी की मांग को लेकर फिर से सड़क पर उतरे। फरीदाबाद और करनाल में बड़ी रैलियां हुईं।', image: null, link: '#', pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Live Hindustan', lang: 'hi', isRss: false },

  // Himachal Pradesh
  { id: 's_hp_1', title: 'हिमाचल प्रदेश — शिमला में बर्फबारी से पर्यटकों की भीड़, होटल फुल', summary: 'हिमाचल प्रदेश में इस सीजन की पहली भारी बर्फबारी के बाद शिमला और मनाली में पर्यटकों की भारी भीड़ उमड़ी। होटल पूरी तरह बुक हो गए।', image: null, link: '#', pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Navbharat Times', lang: 'hi', isRss: false },
  { id: 's_hp_2', title: 'धर्मशाला में दलाई लामा ने दिया शांति संदेश — विश्व के नेताओं ने सुनी बात', summary: 'धर्मशाला में दलाई लामा ने विश्व शांति पर अपना संदेश दिया। कई देशों के राजनयिक और शांतिदूत इस कार्यक्रम में शामिल हुए।', image: null, link: '#', pubDate: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Dainik Jagran', lang: 'hi', isRss: false },

  // Jharkhand
  { id: 's_jh_1', title: 'झारखंड — रांची में नई औद्योगिक नीति, निवेशकों को मिलेगी 50% सब्सिडी', summary: 'झारखंड सरकार ने नई औद्योगिक नीति 2026 की घोषणा की। रांची और जमशेदपुर में नए उद्योग लगाने पर 50% तक की सब्सिडी मिलेगी।', image: null, link: '#', pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), category: 'jobs', source: 'Amar Ujala', lang: 'hi', isRss: false },
  { id: 's_jh_2', title: 'जमशेदपुर में टाटा स्टील का नया प्लांट — 5,000 नए रोजगार का अवसर', summary: 'टाटा स्टील ने जमशेदपुर में ₹8,000 करोड़ का नया ग्रीन स्टील प्लांट लगाने का ऐलान किया। इससे 5,000 से अधिक लोगों को रोजगार मिलेगा।', image: null, link: '#', pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Dainik Bhaskar', lang: 'hi', isRss: false },

  // Karnataka
  { id: 's_kar_1', title: 'कर्नाटक — बेंगलुरु टेक समिट 2026 में 2 लाख करोड़ का निवेश', summary: 'बेंगलुरु टेक समिट में Apple, Google, Microsoft सहित 500 कंपनियों ने कर्नाटक में 2 लाख करोड़ रुपये के निवेश की घोषणा की।', image: null, link: '#', pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), category: 'technology', source: 'Times of India', lang: 'hi', isRss: false },
  { id: 's_kar_2', title: 'मैसूर दशहरा उत्सव — 10 लाख पर्यटकों की भीड़, सोने की अंबारी निकली', summary: 'कर्नाटक के मैसूर में दशहरा उत्सव में इस बार 10 लाख से अधिक पर्यटक आए। सोने की अंबारी पर सवार हाथी का जुलूस देखने लायक था।', image: null, link: '#', pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Navbharat Times', lang: 'hi', isRss: false },

  // Kerala
  { id: 's_ker_1', title: 'केरल — कोच्चि मेट्रो का फेज-3 शुरू, त्रिशूर तक जुड़ेगा शहर', summary: 'केरल सरकार ने कोच्चि मेट्रो के फेज-3 की शुरुआत की। यह लाइन कोच्चि से त्रिशूर तक 45 किमी लंबी होगी।', image: null, link: '#', pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Dainik Jagran', lang: 'hi', isRss: false },
  { id: 's_ker_2', title: 'केरल में निपाह वायरस का अलर्ट — स्वास्थ्य विभाग ने जारी की एडवाइजरी', summary: 'केरल के कोझिकोड जिले में निपाह वायरस के संदिग्ध मामले मिले हैं। स्वास्थ्य विभाग ने अलर्ट जारी कर लोगों से सावधानी बरतने को कहा है।', image: null, link: '#', pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), category: 'health', source: 'Amar Ujala', lang: 'hi', isRss: false },

  // Madhya Pradesh
  { id: 's_mp_1', title: 'मध्य प्रदेश — इंदौर लगातार 7वीं बार देश का सबसे स्वच्छ शहर घोषित', summary: 'स्वच्छ भारत सर्वेक्षण में इंदौर ने लगातार सातवीं बार देश के सबसे स्वच्छ शहर का खिताब जीता। मुख्यमंत्री ने नागरिकों को बधाई दी।', image: null, link: '#', pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Dainik Bhaskar', lang: 'hi', isRss: false },
  { id: 's_mp_2', title: 'उज्जैन महाकाल मंदिर — महाकाल लोक परिसर में 1 करोड़ श्रद्धालु पहुंचे', summary: 'मध्य प्रदेश के उज्जैन में महाकाल लोक परिसर ने 1 करोड़ श्रद्धालुओं का आंकड़ा पार किया। PM मोदी ने इसे शानदार उपलब्धि बताया।', image: null, link: '#', pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Navbharat Times', lang: 'hi', isRss: false },

  // Maharashtra
  { id: 's_mah_1', title: 'महाराष्ट्र — मुंबई में नई मेट्रो लाइन-3 शुरू, BKC से SEEPZ तक सफर आसान', summary: 'मुंबई मेट्रो लाइन-3 का संचालन शुरू हो गया है। BKC से SEEPZ तक के 12 किमी रूट पर 10 स्टेशन हैं।', image: null, link: '#', pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Times of India', lang: 'hi', isRss: false },
  { id: 's_mah_2', title: 'पुणे में IT सेक्टर में बूम — 50,000 नए तकनीकी रोजगार के अवसर', summary: 'पुणे में टेक इंडस्ट्री तेजी से बढ़ रही है। TCS, Infosys और Wipro ने पुणे में 50,000 से अधिक नए कर्मचारियों की भर्ती का ऐलान किया।', image: null, link: '#', pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), category: 'jobs', source: 'Dainik Jagran', lang: 'hi', isRss: false },

  // Manipur
  { id: 's_man_1', title: 'मणिपुर — इंफाल में शांति वार्ता, सरकार और जनजातीय संगठन एक मेज पर', summary: 'मणिपुर में जातीय हिंसा के बाद केंद्र सरकार की पहल पर इंफाल में शांति वार्ता शुरू हुई। दोनों पक्षों ने संयम बरतने पर सहमति जताई।', image: null, link: '#', pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Amar Ujala', lang: 'hi', isRss: false },
  { id: 's_man_2', title: 'मणिपुर में खेल — मैरी कॉम एकेडमी से 20 युवा बॉक्सर ओलंपिक की तैयारी में', summary: 'मणिपुर की राजधानी इंफाल में मैरी कॉम बॉक्सिंग एकेडमी के 20 युवा खिलाड़ी 2028 ओलंपिक की तैयारी में जुटे हैं।', image: null, link: '#', pubDate: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Dainik Bhaskar', lang: 'hi', isRss: false },

  // Meghalaya
  { id: 's_meg_1', title: 'मेघालय — शिलांग में नया हाईकोर्ट भवन, देश का सबसे हरित न्यायालय', summary: 'मेघालय के शिलांग में देश का सबसे पर्यावरण अनुकूल हाईकोर्ट भवन बनकर तैयार हुआ। इसमें 100% सोलर ऊर्जा का उपयोग होगा।', image: null, link: '#', pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Navbharat Times', lang: 'hi', isRss: false },
  { id: 's_meg_2', title: 'चेरापूंजी में पर्यटन उफान — बादलों की वादियों में सैलानियों की भीड़', summary: 'दुनिया के सबसे अधिक वर्षा वाले स्थान चेरापूंजी में इस साल रिकॉर्ड 5 लाख पर्यटक आए। मेघालय सरकार ने इको-टूरिज्म को बढ़ावा दे रही है।', image: null, link: '#', pubDate: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Dainik Jagran', lang: 'hi', isRss: false },

  // Mizoram
  { id: 's_miz_1', title: 'मिजोरम — आइजोल में नई जलापूर्ति योजना, 2 लाख लोगों को मिलेगा शुद्ध पानी', summary: 'मिजोरम सरकार ने आइजोल शहर के लिए नई जलापूर्ति परियोजना शुरू की। इससे 2 लाख से अधिक नागरिकों को 24 घंटे शुद्ध पेयजल मिलेगा।', image: null, link: '#', pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Dainik Bhaskar', lang: 'hi', isRss: false },
  { id: 's_miz_2', title: 'मिजोरम — म्यांमार सीमा पर निगरानी बढ़ी, घुसपैठ रोकने को नई चौकियां', summary: 'केंद्र सरकार ने मिजोरम-म्यांमार सीमा पर 15 नई सुरक्षा चौकियां स्थापित की हैं। इससे अवैध घुसपैठ और तस्करी पर लगाम लगेगी।', image: null, link: '#', pubDate: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Amar Ujala', lang: 'hi', isRss: false },

  // Nagaland
  { id: 's_nag_1', title: 'नागालैंड — कोहिमा में हॉर्नबिल फेस्टिवल में 3 लाख पर्यटक, रिकॉर्ड टूरिज्म', summary: 'नागालैंड के कोहिमा में आयोजित हॉर्नबिल फेस्टिवल में इस साल 3 लाख से अधिक देशी-विदेशी पर्यटक आए।', image: null, link: '#', pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Navbharat Times', lang: 'hi', isRss: false },
  { id: 's_nag_2', title: 'नागालैंड में शांति समझौते की उम्मीद — NSCN के साथ बातचीत के नए दौर शुरू', summary: 'केंद्र सरकार और NSCN (IM) के बीच शांति वार्ता का नया दौर दिल्ली में शुरू हुआ। दशकों पुरानी इस समस्या का समाधान जल्द निकल सकता है।', image: null, link: '#', pubDate: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Dainik Jagran', lang: 'hi', isRss: false },

  // Odisha
  { id: 's_od_1', title: 'ओडिशा — पुरी जगन्नाथ मंदिर का रत्न भंडार खुला, दुर्लभ आभूषणों की सूची बनी', summary: 'ओडिशा सरकार ने जगन्नाथ मंदिर के रत्न भंडार की सूची तैयार की। सदियों से बंद इस खजाने में दुर्लभ हीरे, माणिक्य और स्वर्ण आभूषण मिले।', image: null, link: '#', pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Dainik Bhaskar', lang: 'hi', isRss: false },
  { id: 's_od_2', title: 'भुवनेश्वर — IT सिटी बनने की राह पर, इन्फोसिस और विप्रो के नए कैंपस', summary: 'ओडिशा की राजधानी भुवनेश्वर में Infosys और Wipro के नए कैंपस बन रहे हैं। शहर देश का नया IT हब बनता जा रहा है।', image: null, link: '#', pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), category: 'technology', source: 'Navbharat Times', lang: 'hi', isRss: false },

  // Punjab
  { id: 's_pun_1', title: 'पंजाब — अमृतसर में स्वर्ण मंदिर परिसर का विस्तार, लंगर में रोजाना 2 लाख लोग', summary: 'अमृतसर के स्वर्ण मंदिर में लंगर सेवा का विस्तार हुआ। अब प्रतिदिन 2 लाख से अधिक श्रद्धालुओं को मुफ्त भोजन मिलता है।', image: null, link: '#', pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Dainik Jagran', lang: 'hi', isRss: false },
  { id: 's_pun_2', title: 'लुधियाना — कपड़ा उद्योग में संकट, चीन के सस्ते आयात से मुश्किल', summary: 'पंजाब के लुधियाना में कपड़ा उद्योग चीन के सस्ते आयात से दबाव में है। उद्योगपतियों ने सरकार से संरक्षण शुल्क बढ़ाने की मांग की।', image: null, link: '#', pubDate: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Amar Ujala', lang: 'hi', isRss: false },

  // Rajasthan
  { id: 's_raj_1', title: 'राजस्थान — जयपुर मेट्रो फेज-2 को मंजूरी, सीतापुरा से आमेर तक चलेगी', summary: 'राजस्थान सरकार ने जयपुर मेट्रो के फेज-2 विस्तार को मंजूरी दी। यह लाइन सीतापुरा औद्योगिक क्षेत्र से आमेर किले तक जाएगी।', image: null, link: '#', pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Dainik Bhaskar', lang: 'hi', isRss: false },
  { id: 's_raj_2', title: 'उदयपुर में G20 पर्यटन बैठक — दुनिया के 20 देश राजस्थान की खूबसूरती देखकर चकित', summary: 'G20 की पर्यटन कार्यसमिति की बैठक उदयपुर में हुई। दुनिया के 20 देशों के प्रतिनिधियों ने राजस्थान के इतिहास और विरासत की प्रशंसा की।', image: null, link: '#', pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Navbharat Times', lang: 'hi', isRss: false },

  // Sikkim
  { id: 's_sik_1', title: 'सिक्किम — गंगटोक में नई हेलीकॉप्टर सेवा, लाचुंग और युमथांग तक पहुंच आसान', summary: 'सिक्किम सरकार ने गंगटोक से लाचुंग और युमथांग के लिए नई हेलीकॉप्टर सेवा शुरू की। इससे पर्यटकों को दुर्गम इलाकों तक पहुंचना आसान होगा।', image: null, link: '#', pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Dainik Jagran', lang: 'hi', isRss: false },
  { id: 's_sik_2', title: 'सिक्किम में बाढ़ — तीस्ता नदी उफान पर, कई पुल बहे', summary: 'सिक्किम में भारी बारिश से तीस्ता नदी खतरनाक स्तर पर पहुंच गई है। गंगटोक और मंगन जिलों में बाढ़ से कई पुल और सड़कें क्षतिग्रस्त हुई हैं।', image: null, link: '#', pubDate: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Amar Ujala', lang: 'hi', isRss: false },

  // Tamil Nadu
  { id: 's_tn_1', title: 'तमिलनाडु — चेन्नई मेट्रो फेज-2 का उद्घाटन, 118 किमी नेटवर्क तैयार', summary: 'तमिलनाडु के मुख्यमंत्री ने चेन्नई मेट्रो फेज-2 का उद्घाटन किया। 118 किमी के नेटवर्क से शहर के हर कोने में मेट्रो पहुंच गई।', image: null, link: '#', pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Times of India', lang: 'hi', isRss: false },
  { id: 's_tn_2', title: 'कोयम्बटूर में EV क्लस्टर — तमिलनाडु बनेगा देश का इलेक्ट्रिक वाहन हब', summary: 'तमिलनाडु के कोयम्बटूर में देश का पहला समर्पित EV मैन्युफैक्चरिंग क्लस्टर बन रहा है। TVS, Ola Electric समेत 30 कंपनियां यहां निवेश करेंगी।', image: null, link: '#', pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), category: 'technology', source: 'Dainik Bhaskar', lang: 'hi', isRss: false },

  // Telangana
  { id: 's_tel_1', title: 'तेलंगाना — हैदराबाद में AI सिटी का निर्माण, Amazon और Microsoft का बड़ा निवेश', summary: 'हैदराबाद में दुनिया का सबसे बड़ा AI रिसर्च हब बन रहा है। Amazon और Microsoft ने तेलंगाना में ₹50,000 करोड़ के निवेश की घोषणा की।', image: null, link: '#', pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), category: 'technology', source: 'Navbharat Times', lang: 'hi', isRss: false },
  { id: 's_tel_2', title: 'हैदराबाद — मेट्रो फेज-2 को केंद्र की मंजूरी, 80 किमी नेटवर्क बढ़ेगा', summary: 'केंद्र सरकार ने हैदराबाद मेट्रो फेज-2 को मंजूरी दी। 80 किमी के नए नेटवर्क से आउटर रिंग रोड और नए आवासीय क्षेत्र जुड़ेंगे।', image: null, link: '#', pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Dainik Jagran', lang: 'hi', isRss: false },

  // Tripura
  { id: 's_tri_1', title: 'त्रिपुरा — अगरतला से ढाका सीधी ट्रेन, बांग्लादेश से रिश्ते मजबूत होंगे', summary: 'त्रिपुरा के अगरतला से बांग्लादेश की राजधानी ढाका के लिए सीधी ट्रेन सेवा शुरू होगी। यह उत्तर-पूर्व भारत के लिए बड़ा विकास है।', image: null, link: '#', pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Amar Ujala', lang: 'hi', isRss: false },
  { id: 's_tri_2', title: 'त्रिपुरा में रबड़ की खेती बूम — किसानों की आय में 40% की वृद्धि', summary: 'त्रिपुरा में रबड़ की खेती तेजी से बढ़ रही है। राज्य के किसानों की आय में पिछले तीन वर्षों में 40% की वृद्धि दर्ज की गई है।', image: null, link: '#', pubDate: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Dainik Bhaskar', lang: 'hi', isRss: false },

  // Uttar Pradesh
  { id: 's_up_4', title: 'अयोध्या राम मंदिर — प्रतिदिन 5 लाख श्रद्धालु, नई व्यवस्था लागू', summary: 'अयोध्या के राम मंदिर में प्रतिदिन 5 लाख से अधिक दर्शनार्थी आ रहे हैं। ट्रैफिक और भीड़ प्रबंधन के लिए नई व्यवस्था लागू की गई है।', image: null, link: '#', pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Dainik Jagran', lang: 'hi', isRss: false },
  { id: 's_up_5', title: 'वाराणसी में काशी विश्वनाथ कॉरिडोर — 2 करोड़ श्रद्धालुओं ने किए दर्शन', summary: 'काशी विश्वनाथ कॉरिडोर बनने के बाद से 2 करोड़ से अधिक श्रद्धालु दर्शन कर चुके हैं। वाराणसी का विकास नई ऊंचाइयों पर है।', image: null, link: '#', pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Amar Ujala', lang: 'hi', isRss: false },

  // West Bengal
  { id: 's_wb_1', title: 'पश्चिम बंगाल — कोलकाता मेट्रो का नया रूट, हावड़ा से न्यू टाउन तक सफर', summary: 'कोलकाता मेट्रो का नया ईस्ट-वेस्ट कॉरिडोर पूरी तरह चालू हो गया। हावड़ा से न्यू टाउन तक का सफर अब सिर्फ 40 मिनट में होगा।', image: null, link: '#', pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Navbharat Times', lang: 'hi', isRss: false },
  { id: 's_wb_2', title: 'दार्जिलिंग — चाय बागान में रोजगार संकट, मजदूरों की हड़ताल', summary: 'पश्चिम बंगाल के दार्जिलिंग में चाय बागान मजदूर न्यूनतम मजदूरी बढ़ाने की मांग को लेकर हड़ताल पर हैं। इससे चाय उत्पादन प्रभावित हो रहा है।', image: null, link: '#', pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Dainik Bhaskar', lang: 'hi', isRss: false },

  // Jammu & Kashmir
  { id: 's_jk_1', title: 'जम्मू-कश्मीर — श्रीनगर में G20 बैठक, दुनिया को दिखा कश्मीर का नया चेहरा', summary: 'जम्मू-कश्मीर के श्रीनगर में G20 की पर्यटन समिति की बैठक सफलतापूर्वक संपन्न हुई। विदेशी मेहमानों ने कश्मीर की प्राकृतिक सुंदरता की तारीफ की।', image: null, link: '#', pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Dainik Jagran', lang: 'hi', isRss: false },
  { id: 's_jk_2', title: 'जम्मू — नई रेलवे लाइन पर ट्रायल रन, कश्मीर घाटी देश के रेल नेटवर्क से जुड़ेगी', summary: 'उधमपुर-श्रीनगर-बारामुला रेल लिंक पर पहला ट्रायल रन सफल रहा। इस ऐतिहासिक परियोजना के पूरा होने से कश्मीर घाटी रेल से जुड़ जाएगी।', image: null, link: '#', pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Amar Ujala', lang: 'hi', isRss: false },

  // Union Territories
  // Delhi
  { id: 's_del_1', title: 'दिल्ली — एनसीआर में वायु प्रदूषण गंभीर, AQI 400 पार, स्कूल बंद', summary: 'दिल्ली-एनसीआर में वायु प्रदूषण खतरनाक स्तर पर पहुंच गया है। AQI 400 से ऊपर जाने पर सरकार ने स्कूल बंद और GRAP-4 लागू किया।', image: null, link: '#', pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), category: 'health', source: 'Navbharat Times', lang: 'hi', isRss: false },
  { id: 's_del_2', title: 'दिल्ली मेट्रो फेज-4 — RK Ashram से जनकपुरी तक नई लाइन का ट्रायल', summary: 'दिल्ली मेट्रो फेज-4 की RK Ashram से जनकपुरी तक की लाइन पर सफल ट्रायल रन हुआ। यह लाइन जल्द ही आम जनता के लिए खोली जाएगी।', image: null, link: '#', pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Dainik Bhaskar', lang: 'hi', isRss: false },

  // Chandigarh
  { id: 's_chd_1', title: 'चंडीगढ़ — स्मार्ट सिटी प्रोजेक्ट में टॉप, देश का सबसे अच्छी तरह से प्लान्ड शहर', summary: 'चंडीगढ़ ने स्मार्ट सिटी मिशन में पहली रैंक हासिल की। केंद्र शासित प्रदेश की शहरी नियोजन और स्वच्छता को देशभर में सराहा जा रहा है।', image: null, link: '#', pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Dainik Jagran', lang: 'hi', isRss: false },

  // Puducherry
  { id: 's_pud_1', title: 'पुडुचेरी — फ्रांसीसी विरासत का संरक्षण, UNESCO ने दी मान्यता', summary: 'पुडुचेरी की फ्रांसीसी विरासत को UNESCO ने विश्व धरोहर सूची में शामिल करने की प्रक्रिया शुरू की। इससे यहां पर्यटन को बड़ा बढ़ावा मिलेगा।', image: null, link: '#', pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Amar Ujala', lang: 'hi', isRss: false },

  // Andaman & Nicobar
  { id: 's_and_1', title: 'अंडमान-निकोबार — पोर्ट ब्लेयर में नया नौसेना बेस, सुरक्षा होगी मजबूत', summary: 'केंद्र सरकार ने अंडमान-निकोबार द्वीप समूह के पोर्ट ब्लेयर में एक नए नौसेना बेस की स्थापना को मंजूरी दी। इससे हिंद महासागर में भारत की उपस्थिति मजबूत होगी।', image: null, link: '#', pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Dainik Bhaskar', lang: 'hi', isRss: false },

  // Ladakh
  { id: 's_lad_1', title: 'लद्दाख — लेह में सोलर पावर प्लांट, 2027 तक हरित ऊर्जा से चलेगा पूरा क्षेत्र', summary: 'लद्दाख में 500 मेगावाट का सोलर पावर प्लांट स्थापित हो रहा है। 2027 तक लद्दाख 100% हरित ऊर्जा से चलने वाला देश का पहला केंद्र शासित प्रदेश बनेगा।', image: null, link: '#', pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Navbharat Times', lang: 'hi', isRss: false },
  { id: 's_lad_2', title: 'कारगिल विजय दिवस — लद्दाख में शहीदों को श्रद्धांजलि, देशभक्ति का जज्बा', summary: 'कारगिल विजय दिवस पर लद्दाख के कारगिल में भव्य समारोह हुआ। रक्षामंत्री ने शहीदों को श्रद्धांजलि देते हुए सेना के शौर्य को याद किया।', image: null, link: '#', pubDate: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Dainik Jagran', lang: 'hi', isRss: false },

  // Lakshadweep
  { id: 's_lak_1', title: 'लक्षद्वीप — PM मोदी की यात्रा के बाद पर्यटन में उछाल, नए रिसॉर्ट बनेंगे', summary: 'प्रधानमंत्री मोदी की लक्षद्वीप यात्रा के बाद से यहां पर्यटन में 300% की वृद्धि हुई है। सरकार ने नए इको-रिसॉर्ट बनाने की योजना बनाई है।', image: null, link: '#', pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Amar Ujala', lang: 'hi', isRss: false },

  // Dadra, Daman & Diu
  { id: 's_ddd_1', title: 'दमन और दीव — औद्योगिक क्षेत्र में नई निवेश नीति, ₹2000 करोड़ के प्रस्ताव मिले', summary: 'केंद्र शासित प्रदेश दमन और दीव ने नई औद्योगिक नीति लागू की। पहले ही महीने में 2000 करोड़ रुपये के निवेश प्रस्ताव प्राप्त हुए।', image: null, link: '#', pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Dainik Bhaskar', lang: 'hi', isRss: false },

  // ═══════════════ INTERNATIONAL — AMERICA ═══════════════
  { id: 'w_usa_1', title: 'America: ट्रंप ने नई टैरिफ नीति का ऐलान किया, दुनिया भर में हलचल', summary: 'अमेरिकी राष्ट्रपति डोनाल्ड ट्रंप ने चीन समेत कई देशों पर नए आयात शुल्क लगाने की घोषणा की। White House ने कहा यह अमेरिकी अर्थव्यवस्था को मजबूत करने का कदम है।', image: null, link: '#', pubDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'BBC World', lang: 'hi', isRss: false },
  { id: 'w_usa_2', title: 'USA: कांग्रेस में नया विधेयक पास, AI कंपनियों पर सख्त नियंत्रण लागू होगा', summary: 'अमेरिकी congress ने आर्टिफिशियल इंटेलिजेंस को रेगुलेट करने के लिए नया कानून पास किया। Washington में बड़ी टेक कंपनियों में हड़कंप मचा है।', image: null, link: '#', pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Reuters World', lang: 'hi', isRss: false },
  { id: 'w_usa_3', title: 'अमेरिका: यूक्रेन को 60 अरब डॉलर की नई सहायता, Pentagon का बड़ा फैसला', summary: 'अमेरिकी रक्षा मंत्रालय Pentagon ने यूक्रेन के लिए 60 अरब डॉलर के नए हथियार और आर्थिक सहायता पैकेज को मंजूरी दी।', image: null, link: '#', pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Al Jazeera', lang: 'hi', isRss: false },
  { id: 'w_usa_4', title: 'USA में बेरोजगारी दर घटी — अर्थव्यवस्था में 2.5 लाख नई नौकरियां आईं', summary: 'अमेरिकी श्रम विभाग के आंकड़ों के अनुसार पिछले महीने अमेरिकी अर्थव्यवस्था में 2.5 लाख नई नौकरियां जुड़ीं और बेरोजगारी दर 3.7% पर आ गई।', image: null, link: '#', pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'DW World English', lang: 'hi', isRss: false },
  { id: 'w_usa_5', title: 'अमेरिका-चीन व्यापार युद्ध तेज — बाइडन प्रशासन ने नए प्रतिबंध लगाए', summary: 'Washington ने चीन की टेक्नोलॉजी कंपनियों पर नए प्रतिबंध लगाए हैं। अमेरिका का कहना है कि चीन अमेरिकी तकनीक का दुरुपयोग कर रहा है।', image: null, link: '#', pubDate: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'France 24 English', lang: 'hi', isRss: false },

  // ═══════════════ INTERNATIONAL — CHINA ═══════════════
  { id: 'w_chn_1', title: 'China: ताइवान के पास बड़ा सैन्य अभ्यास, Beijing ने भेजे 90 युद्धपोत', summary: 'चीन की पीपुल्स लिबरेशन आर्मी (PLA) ने ताइवान के इर्द-गिर्द बड़े पैमाने पर सैन्य अभ्यास किया। Beijing ने इसे नियमित अभ्यास बताया।', image: null, link: '#', pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'BBC World', lang: 'hi', isRss: false },
  { id: 'w_chn_2', title: 'चीन की अर्थव्यवस्था में सुस्ती — GDP ग्रोथ 4.6% पर आई, विशेषज्ञ चिंतित', summary: 'Xi Jinping सरकार के लिए चिंता की खबर — चीन की जीडीपी ग्रोथ 4.6% पर आ गई जो पिछले 30 सालों में सबसे कम है। रियल एस्टेट संकट गहरा रहा है।', image: null, link: '#', pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Reuters World', lang: 'hi', isRss: false },
  { id: 'w_chn_3', title: 'Beijing ने Hong Kong में नया सुरक्षा कानून लागू किया, विरोध प्रदर्शन', summary: 'चीन की केंद्र सरकार ने हांगकांग में राष्ट्रीय सुरक्षा कानून का विस्तार किया। हांगकांग में विपक्षी नेताओं और लोकतंत्र समर्थकों में आक्रोश है।', image: null, link: '#', pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Al Jazeera', lang: 'hi', isRss: false },
  { id: 'w_chn_4', title: 'चीन ने चंद्रमा से मिट्टी के नमूने धरती पर लाए — Chang\'e मिशन सफल', summary: 'China का Chang\'e-6 मिशन चंद्रमा के दक्षिणी ध्रुव से 1.9 किलोग्राम मिट्टी के नमूने लेकर पृथ्वी पर वापस आ गया। यह ऐतिहासिक उपलब्धि है।', image: null, link: '#', pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'DW World English', lang: 'hi', isRss: false },
  { id: 'w_chn_5', title: 'Xi Jinping की रूस यात्रा — पुतिन से मुलाकात, पश्चिमी देश चिंतित', summary: 'चीनी राष्ट्रपति शी जिनपिंग ने मास्को में राष्ट्रपति पुतिन से मुलाकात की। दोनों देशों ने रणनीतिक साझेदारी और व्यापार समझौतों पर हस्ताक्षर किए।', image: null, link: '#', pubDate: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'South China Morning Post', lang: 'hi', isRss: false },

  // ═══════════════ INTERNATIONAL — PAKISTAN ═══════════════
  { id: 'w_pak_1', title: 'Pakistan में राजनीतिक संकट — इमरान खान की पार्टी पर प्रतिबंध की मांग', summary: 'पाकिस्तान की शहबाज शरीफ सरकार ने इमरान खान की पार्टी PTI को प्रतिबंधित करने के लिए सुप्रीम कोर्ट में याचिका दायर की है। इस्लामाबाद में तनाव बढ़ा।', image: null, link: '#', pubDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Dawn Pakistan', lang: 'hi', isRss: false },
  { id: 'w_pak_2', title: 'पाकिस्तान की अर्थव्यवस्था डूबी — IMF से 7 अरब डॉलर का नया बेलआउट', summary: 'IMF ने पाकिस्तान को 7 अरब डॉलर का नया ऋण देने पर सहमति जताई है। कराची में महंगाई 30% से ऊपर है और पाकिस्तानी रुपया रिकॉर्ड निचले स्तर पर है।', image: null, link: '#', pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Geo News', lang: 'hi', isRss: false },
  { id: 'w_pak_3', title: 'Pakistan-भारत सीमा पर तनाव — ISI ने नई साजिश रची, भारत अलर्ट पर', summary: 'पाकिस्तानी खुफिया एजेंसी ISI की भारत विरोधी गतिविधियों की नई रिपोर्ट सामने आई। लाहौर से आतंकवादियों को घुसपैठ की कोशिश की गई।', image: null, link: '#', pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'The News International', lang: 'hi', isRss: false },
  { id: 'w_pak_4', title: 'पाकिस्तान में बाढ़ का कहर — 500 से ज्यादा लोगों की मौत, लाखों बेघर', summary: 'पाकिस्तान के सिंध और बलूचिस्तान प्रांत में भारी बाढ़ से 500 से अधिक लोगों की जान गई है। इस्लामाबाद ने अंतरराष्ट्रीय सहायता की अपील की है।', image: null, link: '#', pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Al Jazeera', lang: 'hi', isRss: false },
  { id: 'w_pak_5', title: 'Nawaz Sharif लंदन से वापस पाकिस्तान लौटे, बड़ा राजनीतिक उलटफेर', summary: 'पाकिस्तान के पूर्व प्रधानमंत्री नवाज शरीफ लंबे स्वयंनिर्वासन के बाद लाहौर वापस लौटे। इस्लामाबाद में उनके समर्थकों ने भव्य स्वागत किया।', image: null, link: '#', pubDate: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Dawn Pakistan', lang: 'hi', isRss: false },

  // ═══════════════ INTERNATIONAL — RUSSIA-UKRAINE ═══════════════
  { id: 'w_rus_1', title: 'Russia-Ukraine युद्ध: पुतिन ने नई परमाणु चेतावनी दी, NATO सतर्क', summary: 'रूसी राष्ट्रपति पुतिन ने पश्चिमी देशों को परमाणु हथियारों के इस्तेमाल की चेतावनी दी। NATO ने आपातकालीन बैठक बुलाई और अपनी फौज अलर्ट पर रखी।', image: null, link: '#', pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'BBC World', lang: 'hi', isRss: false },
  { id: 'w_rus_2', title: 'Ukraine के राष्ट्रपति जेलेंस्की ने संयुक्त राष्ट्र में रूस की निंदा की', summary: 'यूक्रेनी राष्ट्रपति वोलोदिमिर जेलेंस्की ने UN महासभा में भाषण देते हुए रूस पर युद्ध अपराधों का आरोप लगाया और दुनिया से और मदद की अपील की।', image: null, link: '#', pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Kyiv Independent', lang: 'hi', isRss: false },
  { id: 'w_rus_3', title: 'रूस ने Kyiv पर सबसे बड़ा ड्रोन हमला किया, 40 से ज्यादा घायल', summary: 'रूस ने यूक्रेन की राजधानी कीव पर 150 से ज्यादा ड्रोन का बड़ा हमला किया। कई आवासीय इमारतें क्षतिग्रस्त हुईं, 40 से अधिक नागरिक घायल हुए।', image: null, link: '#', pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Reuters World', lang: 'hi', isRss: false },
  { id: 'w_rus_4', title: 'Russia पर नए पश्चिमी प्रतिबंध — तेल निर्यात पर सख्त पाबंदी', summary: 'यूरोपीय संघ और अमेरिका ने रूस पर तेल निर्यात को लेकर नए कड़े प्रतिबंध लगाए हैं। मास्को ने इसे आर्थिक युद्ध करार दिया।', image: null, link: '#', pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'DW World English', lang: 'hi', isRss: false },
  { id: 'w_rus_5', title: 'Ukraine युद्ध में संघर्ष विराम की उम्मीद — तुर्किये ने मध्यस्थता की पेशकश', summary: 'तुर्किये के राष्ट्रपति एर्दोगान ने रूस और यूक्रेन के बीच शांति वार्ता के लिए मध्यस्थता की पेशकश की। दोनों पक्षों ने सकारात्मक संकेत दिए हैं।', image: null, link: '#', pubDate: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Al Jazeera', lang: 'hi', isRss: false },

  // ═══════════════ INTERNATIONAL — MIDDLE EAST ═══════════════
  { id: 'w_mid_1', title: 'Israel-Gaza युद्ध: Gaza में 40,000 से ज्यादा मौतें, UN ने युद्धविराम की मांग की', summary: 'गाज़ा में इजरायली हमलों में अब तक 40,000 से अधिक फिलिस्तीनियों की मौत हो चुकी है। संयुक्त राष्ट्र ने तत्काल युद्धविराम की मांग की है।', image: null, link: '#', pubDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Al Jazeera', lang: 'hi', isRss: false },
  { id: 'w_mid_2', title: 'Iran ने Israel पर 300 से ज्यादा मिसाइल और ड्रोन दागे — मध्य पूर्व में युद्ध का खतरा', summary: 'ईरान ने इजरायल पर 300 से अधिक बैलिस्टिक मिसाइलें और ड्रोन दागे। इजरायल ने दावा किया कि 99% हमले विफल किए गए। मध्य पूर्व में तनाव चरम पर है।', image: null, link: '#', pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'BBC Middle East', lang: 'hi', isRss: false },
  { id: 'w_mid_3', title: 'Hamas ने बंधकों की रिहाई पर नई शर्तें रखीं, Gaza संघर्षविराम वार्ता अटकी', summary: 'हमास ने इजरायल के साथ बंधक समझौते पर नई शर्तें रखी हैं जिसे इजरायल ने अस्वीकार कर दिया। कतर और मिस्र की मध्यस्थता में वार्ता जारी है।', image: null, link: '#', pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Arab News', lang: 'hi', isRss: false },
  { id: 'w_mid_4', title: 'Saudi Arabia और Israel के बीच सामान्यीकरण वार्ता — अमेरिका की मध्यस्थता', summary: 'सऊदी अरब और इजरायल के बीच राजनयिक संबंध स्थापित करने की बातचीत चल रही है। अमेरिका इस ऐतिहासिक प्रक्रिया में मध्यस्थ की भूमिका निभा रहा है।', image: null, link: '#', pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Jerusalem Post', lang: 'hi', isRss: false },
  { id: 'w_mid_5', title: 'Hezbollah और Israel में संघर्ष — Lebanon सीमा पर भारी गोलाबारी', summary: 'लेबनान स्थित हिजबुल्लाह और इजरायल के बीच उत्तरी इजरायल और दक्षिणी लेबनान में भारी गोलाबारी जारी है। लाखों लोग विस्थापित हुए हैं।', image: null, link: '#', pubDate: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Al Jazeera', lang: 'hi', isRss: false },

  // ═══════════════ INTERNATIONAL — EUROPE ═══════════════
  { id: 'w_eur_1', title: 'Europe में दक्षिणपंथी दलों का उभार — France और Germany में बड़ी जीत', summary: 'यूरोप में दक्षिणपंथी दलों का प्रभाव बढ़ रहा है। फ्रांस और जर्मनी में हुए चुनावों में दक्षिणपंथी पार्टियों को बड़ी सफलता मिली है जिससे EU नीतियां प्रभावित होंगी।', image: null, link: '#', pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'BBC Europe', lang: 'hi', isRss: false },
  { id: 'w_eur_2', title: 'Britain में आम चुनाव — लेबर पार्टी की जीत, Keir Starmer नए PM', summary: 'ब्रिटेन में ऐतिहासिक आम चुनाव में लेबर पार्टी ने 400 से ज्यादा सीटें जीतीं। Keir Starmer ने प्रधानमंत्री पद संभाला, 14 साल बाद सत्ता परिवर्तन हुआ।', image: null, link: '#', pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'BBC World', lang: 'hi', isRss: false },
  { id: 'w_eur_3', title: 'EU ने China के इलेक्ट्रिक वाहनों पर 45% टैरिफ लगाया — व्यापार युद्ध का खतरा', summary: 'यूरोपीय संघ ने चीनी इलेक्ट्रिक कारों पर 45% आयात शुल्क लगाने का फैसला किया। Beijing ने जवाबी कार्रवाई की चेतावनी दी है।', image: null, link: '#', pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Euronews', lang: 'hi', isRss: false },
  { id: 'w_eur_4', title: 'Germany की अर्थव्यवस्था में मंदी — GDP लगातार दूसरी तिमाही में गिरी', summary: 'जर्मनी तकनीकी मंदी में प्रवेश कर गया है। जीडीपी लगातार दो तिमाहियों में गिरी है। ऊर्जा संकट और चीनी प्रतिस्पर्धा को इसकी मुख्य वजह बताया जा रहा है।', image: null, link: '#', pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'DW Europe', lang: 'hi', isRss: false },
  { id: 'w_eur_5', title: 'NATO शिखर सम्मेलन — सदस्य देशों ने रक्षा खर्च 3% तक बढ़ाने का संकल्प लिया', summary: 'वाशिंगटन में हुए NATO शिखर सम्मेलन में सदस्य देशों ने GDP का 3% रक्षा पर खर्च करने का संकल्प लिया। रूस के खिलाफ एकजुटता का संदेश दिया।', image: null, link: '#', pubDate: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Reuters World', lang: 'hi', isRss: false },

  // ═══════════════ INTERNATIONAL — SOUTH ASIA ═══════════════
  { id: 'w_sa_1', title: 'Nepal में राजनीतिक संकट — सरकार गिरी, नए प्रधानमंत्री की तलाश', summary: 'नेपाल में केपी शर्मा ओली सरकार विश्वास मत हार गई। काठमांडू में नए प्रधानमंत्री के चुनाव की प्रक्रिया शुरू हो गई है।', image: null, link: '#', pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Kathmandu Post', lang: 'hi', isRss: false },
  { id: 'w_sa_2', title: 'Bangladesh में शेख हसीना की सरकार गिरी — छात्र आंदोलन से सत्ता परिवर्तन', summary: 'बांग्लादेश में छात्रों के ऐतिहासिक विद्रोह के बाद शेख हसीना को इस्तीफा देना पड़ा और वे देश छोड़कर चली गईं। ढाका में अंतरिम सरकार बनी।', image: null, link: '#', pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Daily Star Bangladesh', lang: 'hi', isRss: false },
  { id: 'w_sa_3', title: 'Sri Lanka में आर्थिक संकट के बाद पहला चुनाव — नई सरकार को बड़ी चुनौती', summary: 'श्रीलंका में ऐतिहासिक आर्थिक संकट के बाद हुए आम चुनाव में नई सरकार चुनी गई। कोलंबो को IMF ऋण चुकाने और अर्थव्यवस्था पटरी पर लाने की चुनौती है।', image: null, link: '#', pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Colombo Gazette', lang: 'hi', isRss: false },
  { id: 'w_sa_4', title: 'Maldives ने भारत से चाहा किनारा — China के साथ नई संधि पर हस्ताक्षर', summary: 'मालदीव के राष्ट्रपति मोइज्जू ने चीन के साथ नई रक्षा और व्यापार संधि की। भारत ने इस पर कड़ी आपत्ति जताई है।', image: null, link: '#', pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Al Jazeera', lang: 'hi', isRss: false },
  { id: 'w_sa_5', title: 'Afghanistan में Taliban का दमन जारी — महिलाओं की शिक्षा पर पाबंदी बरकरार', summary: 'अफगानिस्तान में तालिबान सरकार ने महिलाओं की उच्च शिक्षा और नौकरी पर प्रतिबंध जारी रखा है। UN ने इसे मानवाधिकारों का गंभीर उल्लंघन बताया।', image: null, link: '#', pubDate: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'DW World English', lang: 'hi', isRss: false },

  // ═══════════════ INTERNATIONAL — UN & GLOBAL ═══════════════
  { id: 'w_un_1', title: 'United Nations में नए स्थायी सदस्यों पर चर्चा — भारत की दावेदारी मजबूत', summary: 'संयुक्त राष्ट्र सुरक्षा परिषद में सुधार पर बड़ी बहस छिड़ी है। भारत, ब्राजील और जापान को स्थायी सदस्य बनाने की मांग जोर पकड़ रही है।', image: null, link: '#', pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Reuters World', lang: 'hi', isRss: false },
  { id: 'w_un_2', title: 'WHO ने नई महामारी संधि पर सहमति जताई — 194 देशों ने किए हस्ताक्षर', summary: 'विश्व स्वास्थ्य संगठन की नई महामारी संधि पर 194 देशों ने हस्ताक्षर किए। इससे भविष्य में COVID जैसी महामारियों से बेहतर लड़ा जा सकेगा।', image: null, link: '#', pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'BBC World', lang: 'hi', isRss: false },
  { id: 'w_un_3', title: 'G20 शिखर सम्मेलन — वैश्विक कर सुधार और जलवायु वित्त पर सहमति', summary: 'G20 देशों के शिखर सम्मेलन में बहुराष्ट्रीय कंपनियों पर न्यूनतम 15% कर और जलवायु परिवर्तन के लिए 100 अरब डॉलर के फंड पर सहमति बनी।', image: null, link: '#', pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Al Jazeera', lang: 'hi', isRss: false },
  { id: 'w_un_4', title: 'IMF ने वैश्विक विकास दर का अनुमान घटाया — 2026 में 2.8% रहने की संभावना', summary: 'अंतरराष्ट्रीय मुद्रा कोष IMF ने 2026 के लिए वैश्विक विकास दर का अनुमान घटाकर 2.8% कर दिया। व्यापार युद्ध और भू-राजनीतिक तनाव इसकी वजह बताई गई।', image: null, link: '#', pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'DW World English', lang: 'hi', isRss: false },
  { id: 'w_un_5', title: 'NATO ने नए सदस्यों को जोड़ा — Finland और Sweden की सदस्यता पक्की', summary: 'NATO ने फिनलैंड और स्वीडन को आधिकारिक तौर पर अपना सदस्य बना लिया। रूस ने इस फैसले की कड़ी निंदा की और जवाबी कार्रवाई की चेतावनी दी।', image: null, link: '#', pubDate: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Reuters World', lang: 'hi', isRss: false },

  // ═══════════════ INTERNATIONAL — CLIMATE ═══════════════
  { id: 'w_clm_1', title: 'Global Warming: 2025 रहा इतिहास का सबसे गर्म साल — UN की चेतावनी', summary: 'संयुक्त राष्ट्र की नई रिपोर्ट के अनुसार 2025 अब तक का सबसे गर्म साल रहा। वैश्विक तापमान 1.5°C की सीमा को पार कर गया है।', image: null, link: '#', pubDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'BBC Science & Environment', lang: 'hi', isRss: false },
  { id: 'w_clm_2', title: 'COP30 सम्मेलन: दुनिया के देशों ने 2035 तक कोयला बंद करने का संकल्प लिया', summary: 'ब्राजील में हुए COP30 जलवायु सम्मेलन में 100 से ज्यादा देशों ने 2035 तक कोयले से बिजली उत्पादन पूरी तरह बंद करने का संकल्प लिया।', image: null, link: '#', pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'DW Science', lang: 'hi', isRss: false },
  { id: 'w_clm_3', title: 'Arctic में बर्फ पिघलने की रफ्तार दोगुनी — समुद्र स्तर बढ़ने का खतरा', summary: 'नए शोध से पता चला है कि आर्कटिक में बर्फ पिघलने की दर पिछले दशक के मुकाबले दोगुनी हो गई है। इससे 2100 तक समुद्र स्तर 2 मीटर तक बढ़ सकता है।', image: null, link: '#', pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'BBC Science & Environment', lang: 'hi', isRss: false },
  { id: 'w_clm_4', title: 'Flood से तबाही: यूरोप में ऐतिहासिक बाढ़ — 100 से अधिक मौतें', summary: 'मध्य यूरोप में भारी वर्षा से ऐतिहासिक बाढ़ आई है। ऑस्ट्रिया, चेक गणराज्य और पोलैंड में 100 से ज्यादा लोगों की जान गई और हजारों बेघर हुए।', image: null, link: '#', pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Euronews', lang: 'hi', isRss: false },
  { id: 'w_clm_5', title: 'Earthquake: Japan में 7.6 तीव्रता का भूकंप — Tsunami की चेतावनी जारी', summary: 'जापान के नोटो प्रायद्वीप में 7.6 तीव्रता के भारी भूकंप के बाद सुनामी की चेतावनी जारी की गई। तटीय इलाकों को खाली कराया जा रहा है।', image: null, link: '#', pubDate: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'BBC Asia', lang: 'hi', isRss: false },

  // ═══════════════ INTERNATIONAL — GLOBAL ECONOMY ═══════════════
  { id: 'w_eco_1', title: 'Global Economy: Oil की कीमतें 100 डॉलर प्रति बैरल के पार — महंगाई का डर', summary: 'मध्य पूर्व में तनाव और OPEC+ की उत्पादन कटौती से तेल की कीमतें 100 डॉलर प्रति बैरल से ऊपर चली गईं। दुनियाभर में महंगाई बढ़ने का खतरा है।', image: null, link: '#', pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Reuters Business', lang: 'hi', isRss: false },
  { id: 'w_eco_2', title: 'World Bank ने गरीब देशों के लिए 50 अरब डॉलर की नई सहायता योजना की घोषणा की', summary: 'विश्व बैंक ने अफ्रीका और दक्षिण एशिया के गरीब देशों के लिए 50 अरब डॉलर के नए विकास पैकेज की घोषणा की। जलवायु परिवर्तन और खाद्य सुरक्षा पर फोकस रहेगा।', image: null, link: '#', pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'DW Business', lang: 'hi', isRss: false },
  { id: 'w_eco_3', title: 'Dollar के मुकाबले रुपया, यूरो और येन — वैश्विक मुद्रा बाजार में उथल-पुथल', summary: 'अमेरिकी फेडरल रिजर्व के ब्याज दर फैसले के बाद वैश्विक मुद्रा बाजार में हलचल मची। डॉलर के मुकाबले भारतीय रुपया, जापानी येन और यूरो में बड़ी गिरावट आई।', image: null, link: '#', pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Reuters Business', lang: 'hi', isRss: false },
  { id: 'w_eco_4', title: 'Recession की आशंका: अमेरिका और यूरोप में मंदी के संकेत — शेयर बाजार गिरे', summary: 'अमेरिका और यूरोप में मंदी के बढ़ते संकेतों से वैश्विक शेयर बाजारों में भारी गिरावट आई। Nasdaq 5% और DAX 4% गिरा।', image: null, link: '#', pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'DW Business', lang: 'hi', isRss: false },
  { id: 'w_eco_5', title: 'IMF का अनुमान — भारत 2026 में दुनिया की सबसे तेज बढ़ती अर्थव्यवस्था बनेगा', summary: 'अंतरराष्ट्रीय मुद्रा कोष ने कहा कि भारत 2026 में 7.2% की विकास दर के साथ दुनिया की सबसे तेज बढ़ती प्रमुख अर्थव्यवस्था बना रहेगा।', image: null, link: '#', pubDate: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Reuters Business', lang: 'hi', isRss: false },

  // ═══════════════ INTERNATIONAL — SCIENCE & TECH ═══════════════
  { id: 'w_sci_1', title: 'NASA का Artemis मिशन: इंसान फिर चांद पर जाएगा — 2026 में लॉन्च', summary: 'NASA के Artemis-3 मिशन के तहत 2026 में पहली बार महिला अंतरिक्ष यात्री चंद्रमा पर कदम रखेगी। SpaceX का Starship रॉकेट इस मिशन में इस्तेमाल होगा।', image: null, link: '#', pubDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'NASA Breaking News', lang: 'hi', isRss: false },
  { id: 'w_sci_2', title: 'Elon Musk की SpaceX ने मंगल ग्रह पर रॉकेट भेजने का नया रोडमैप जारी किया', summary: 'SpaceX के CEO Elon Musk ने घोषणा की कि 2028 तक मंगल पर पहला मानव मिशन भेजा जाएगा। Starship रॉकेट का अब तक का सबसे सफल परीक्षण हुआ।', image: null, link: '#', pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'BBC Science & Environment', lang: 'hi', isRss: false },
  { id: 'w_sci_3', title: 'Artificial Intelligence: ChatGPT के नए संस्करण ने IQ टेस्ट में 99.9% स्कोर किया', summary: 'OpenAI के नए AI मॉडल GPT-5 ने मानव स्तर की बुद्धिमत्ता के सभी परीक्षणों में 99.9% से अधिक स्कोर किया। AI की दुनिया में क्रांति आ गई है।', image: null, link: '#', pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'DW Science', lang: 'hi', isRss: false },
  { id: 'w_sci_4', title: 'Quantum Computer: Google ने Willow चिप से असंभव गणना संभव की', summary: 'Google के Willow Quantum Computer ने ऐसी गणना 5 मिनट में कर दी जिसे दुनिया के सबसे तेज सुपर कंप्यूटर को 10 सेप्टिलियन साल लगते। विज्ञान में नया युग आया।', image: null, link: '#', pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'BBC Science & Environment', lang: 'hi', isRss: false },
  { id: 'w_sci_5', title: 'Mars पर पानी के सबूत — NASA के Perseverance रोवर की बड़ी खोज', summary: 'NASA के मंगल रोवर Perseverance ने मंगल ग्रह पर तरल पानी के प्राचीन निशान खोजे हैं। वैज्ञानिकों का मानना है कि मंगल पर जीवन की संभावना पहले से ज्यादा है।', image: null, link: '#', pubDate: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'NASA Breaking News', lang: 'hi', isRss: false },

  // ═══════════════ ENGLISH — NATIONAL ═══════════════
  { id: 'en_nat_1', title: 'PM Modi announces 500 new Kendriya Vidyalayas under NEP 2026', summary: 'The central government has announced the opening of 500 new Kendriya Vidyalayas in rural areas to improve quality education access for nearly 5 lakh students.', image: null, link: '#', pubDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Times of India', lang: 'en', isRss: false, breaking: true },
  { id: 'en_nat_2', title: 'India\'s GDP grows at 7.2% in Q3 — fastest among major economies', summary: 'India\'s economy expanded 7.2% in the third quarter, outpacing all other major economies. Strong manufacturing output and domestic consumption drove the growth.', image: null, link: '#', pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Economic Times', lang: 'en', isRss: false },
  { id: 'en_nat_3', title: 'RBI cuts repo rate by 25 basis points — home loan EMIs set to fall', summary: 'The Reserve Bank of India reduced the repo rate from 6.25% to 6%, signalling easing monetary policy. Home and auto loan borrowers can expect lower EMIs soon.', image: null, link: '#', pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'Hindustan Times', lang: 'en', isRss: false },
  { id: 'en_nat_4', title: 'ISRO sets 2027 target for Chandrayaan-4 Moon sample return mission', summary: 'India\'s space agency ISRO has confirmed a 2027 launch window for Chandrayaan-4, which will collect and return lunar soil samples to Earth for the first time.', image: null, link: '#', pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'The Hindu', lang: 'en', isRss: false, featured: true },
  { id: 'en_nat_5', title: 'Parliament passes Digital India Bill 2026 with new AI and cybersecurity provisions', summary: 'The government introduced the Digital India Bill 2026 in Parliament, featuring new rules on data privacy, AI regulation and cybercrime prevention.', image: null, link: '#', pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'NDTV', lang: 'en', isRss: false },
  { id: 'en_nat_6', title: 'India-Pakistan tension rises after fresh infiltration bid foiled along LoC', summary: 'Indian Army foiled a major infiltration attempt along the Line of Control in Jammu region. Five militants were neutralised in an overnight encounter.', image: null, link: '#', pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), category: 'national', source: 'India Today', lang: 'en', isRss: false },

  // ═══════════════ ENGLISH — UTTARAKHAND ═══════════════
  { id: 'en_uk_1', title: 'Chardham Yatra 2026 opens — record 50 lakh pilgrims expected this season', summary: 'The Chardham Yatra season has begun with Kedarnath, Badrinath, Gangotri and Yamunotri shrines opening their doors. Uttarakhand government expects a record 50 lakh visitors.', image: null, link: '#', pubDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), category: 'uttarakhand', source: 'Times of India', lang: 'en', isRss: false },
  { id: 'en_uk_2', title: 'Rishikesh-Karnaprayag rail project 70% complete, to finish by 2027', summary: 'The 125-km Rishikesh-Karnaprayag rail link project in Uttarakhand is 70% complete. The Chief Minister reviewed progress and confirmed the 2027 deadline.', image: null, link: '#', pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), category: 'uttarakhand', source: 'Hindustan Times', lang: 'en', isRss: false },
  { id: 'en_uk_3', title: 'Dehradun named among top 10 smart cities in India — infrastructure boost', summary: 'Uttarakhand\'s capital Dehradun has been ranked among the top 10 smart cities in India. The city\'s improved roads, drainage and digital infrastructure earned it the recognition.', image: null, link: '#', pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), category: 'uttarakhand', source: 'The Hindu', lang: 'en', isRss: false },
  { id: 'en_uk_4', title: 'Nainital lake task force formed to tackle declining water levels', summary: 'The Uttarakhand government has constituted a special task force of experts to address the falling water levels in Nainital lake and improve water management.', image: null, link: '#', pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), category: 'uttarakhand', source: 'India Today', lang: 'en', isRss: false },
  { id: 'en_uk_5', title: 'Haridwar Kumbh Mela preparations begin — massive infrastructure upgrade planned', summary: 'Uttarakhand has started large-scale preparations for the upcoming Haridwar Kumbh Mela. Over ₹2,000 crore will be spent on ghats, roads and crowd management systems.', image: null, link: '#', pubDate: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), category: 'uttarakhand', source: 'Economic Times', lang: 'en', isRss: false },

  // ═══════════════ ENGLISH — EDUCATION ═══════════════
  { id: 'en_edu_1', title: 'CBSE Board Results 2026 declared — 93.6% students pass Class 12', summary: 'CBSE has declared Class 12 board exam results with an overall pass percentage of 93.6%. Girls outperformed boys with a 95.1% pass rate across all regions.', image: null, link: '#', pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), category: 'education', source: 'Times of India', lang: 'en', isRss: false },
  { id: 'en_edu_2', title: 'JEE Main 2026: Over 14 lakh students appear, results in April', summary: 'More than 14 lakh students appeared for JEE Main Session 1 this year. NTA will announce results by the end of April. Cut-off for JEE Advanced is expected to rise.', image: null, link: '#', pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), category: 'education', source: 'Hindustan Times', lang: 'en', isRss: false },
  { id: 'en_edu_3', title: 'UGC introduces 4-year undergraduate programme across all central universities', summary: 'The University Grants Commission has made the 4-year undergraduate programme mandatory across all central universities from the 2026-27 academic session under NEP.', image: null, link: '#', pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), category: 'education', source: 'The Hindu', lang: 'en', isRss: false },
  { id: 'en_edu_4', title: 'NEET UG 2026: Exam date confirmed, 24 lakh students to appear', summary: 'National Testing Agency has confirmed the NEET UG 2026 exam date. Over 24 lakh medical aspirants are registered, making it the largest-ever NEET examination.', image: null, link: '#', pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), category: 'education', source: 'India Today', lang: 'en', isRss: false },
  { id: 'en_edu_5', title: 'Government launches PM Scholarship 2026 — ₹36,000 per year for meritorious students', summary: 'The central government has expanded the PM Scholarship scheme offering ₹36,000 annually to meritorious students from economically weaker sections pursuing professional courses.', image: null, link: '#', pubDate: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), category: 'education', source: 'Economic Times', lang: 'en', isRss: false },

  // ═══════════════ ENGLISH — JOBS ═══════════════
  { id: 'en_job_1', title: 'SSC CGL 2026 recruitment — 17,000 vacancies announced, apply by May', summary: 'Staff Selection Commission has announced 17,000 vacancies for Combined Graduate Level posts. Eligible candidates can apply online till May 15, 2026.', image: null, link: '#', pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), category: 'jobs', source: 'Times of India', lang: 'en', isRss: false },
  { id: 'en_job_2', title: 'Railway Recruitment 2026: RRB announces 35,000 vacancies for Group D posts', summary: 'Railway Recruitment Boards have released 35,000 vacancies for Group D posts. This is the largest railway recruitment drive in five years. Online applications open from April 1.', image: null, link: '#', pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), category: 'jobs', source: 'Hindustan Times', lang: 'en', isRss: false },
  { id: 'en_job_3', title: 'UPSC Civil Services 2026 notification out — 1,105 vacancies for IAS, IPS, IFS', summary: 'UPSC has released the Civil Services Exam 2026 notification with 1,105 vacancies. Preliminary exam scheduled for June 2026. Eligibility age is 21-32 years.', image: null, link: '#', pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), category: 'jobs', source: 'The Hindu', lang: 'en', isRss: false },
  { id: 'en_job_4', title: 'India adds 1.2 crore jobs in FY2026 — services sector leads hiring', summary: 'India generated 1.2 crore new jobs in the fiscal year 2026, with IT services, retail and manufacturing leading hiring. Youth unemployment rate fell to 7.8%.', image: null, link: '#', pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), category: 'jobs', source: 'Economic Times', lang: 'en', isRss: false },
  { id: 'en_job_5', title: 'IBPS Bank PO 2026 recruitment — 4,455 vacancies in public sector banks', summary: 'Institute of Banking Personnel Selection has released 4,455 Probationary Officer vacancies across public sector banks. Online registration begins April 10, 2026.', image: null, link: '#', pubDate: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), category: 'jobs', source: 'India Today', lang: 'en', isRss: false },

  // ═══════════════ ENGLISH — HEALTH ═══════════════
  { id: 'en_hlt_1', title: 'Ayushman Bharat expands coverage to 70+ age group — 6 crore seniors to benefit', summary: 'The Ayushman Bharat PM-JAY scheme has been extended to all citizens above 70 years of age, providing ₹5 lakh annual health coverage to an additional 6 crore seniors.', image: null, link: '#', pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), category: 'health', source: 'Times of India', lang: 'en', isRss: false },
  { id: 'en_hlt_2', title: 'New cancer drug approved in India — 80% effective against lung cancer in trials', summary: 'India\'s CDSCO has approved a new targeted therapy for lung cancer that showed 80% effectiveness in clinical trials. The drug will be available at government hospitals.', image: null, link: '#', pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), category: 'health', source: 'The Hindu', lang: 'en', isRss: false },
  { id: 'en_hlt_3', title: 'WHO warns of rising antibiotic resistance — India among worst affected nations', summary: 'The World Health Organization has issued a global warning on antimicrobial resistance. India is listed among the most affected countries with 3 lakh deaths attributed to AMR annually.', image: null, link: '#', pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), category: 'health', source: 'Hindustan Times', lang: 'en', isRss: false },
  { id: 'en_hlt_4', title: 'Yoga Day 2026: India sets world record with 5 crore participants globally', summary: 'On the 12th International Day of Yoga, India set a new world record with over 5 crore participants joining simultaneously across 190 countries.', image: null, link: '#', pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), category: 'health', source: 'India Today', lang: 'en', isRss: false },

  // ═══════════════ ENGLISH — TECHNOLOGY ═══════════════
  { id: 'en_tec_1', title: 'India launches AI Mission with ₹10,300 crore outlay — 10,000 GPUs for startups', summary: 'The government has approved the India AI Mission with a ₹10,300 crore budget. It will provide 10,000 GPUs to startups and researchers and establish AI excellence centres.', image: null, link: '#', pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), category: 'technology', source: 'Economic Times', lang: 'en', isRss: false },
  { id: 'en_tec_2', title: '5G users in India cross 20 crore — Jio and Airtel expand to rural areas', summary: 'India\'s 5G subscriber base has crossed the 20 crore mark. Reliance Jio and Bharti Airtel are now expanding their 5G networks to semi-urban and rural areas.', image: null, link: '#', pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), category: 'technology', source: 'Times of India', lang: 'en', isRss: false },
  { id: 'en_tec_3', title: 'UPI crosses 20 billion monthly transactions — India leads global digital payments', summary: 'India\'s Unified Payments Interface recorded over 20 billion transactions in a single month for the first time. UPI is now accepted in 8 countries including France and UAE.', image: null, link: '#', pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), category: 'technology', source: 'The Hindu', lang: 'en', isRss: false },
  { id: 'en_tec_4', title: 'Tata Electronics wins Apple contract — iPhones to be manufactured in Hosur', summary: 'Tata Electronics has secured a major contract to manufacture iPhones at its Hosur plant in Tamil Nadu. India\'s share of global iPhone production will rise to 25%.', image: null, link: '#', pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), category: 'technology', source: 'Hindustan Times', lang: 'en', isRss: false },
  { id: 'en_tec_5', title: 'India\'s first quantum computer operational at IIT Delhi — major scientific leap', summary: 'India\'s first indigenous quantum computer with 100 qubits is now operational at IIT Delhi. Scientists say it can solve complex problems 100 times faster than classical computers.', image: null, link: '#', pubDate: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), category: 'technology', source: 'India Today', lang: 'en', isRss: false },

  // ═══════════════ ENGLISH — WORLD (all subsections) ═══════════════
  // America
  { id: 'en_usa_1', title: 'Trump signs sweeping tariff order — 25% duties on imports from 60 countries', summary: 'President Donald Trump signed an executive order imposing 25% tariffs on goods from 60 countries. Markets fell sharply as economists warned of a global trade war.', image: null, link: '#', pubDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'BBC World', lang: 'en', isRss: false },
  { id: 'en_usa_2', title: 'US Senate passes $95 billion Ukraine and Israel aid package', summary: 'The US Senate approved a $95 billion foreign aid bill for Ukraine, Israel and Taiwan after months of political deadlock. President Biden signed it into law immediately.', image: null, link: '#', pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Reuters World', lang: 'en', isRss: false },
  { id: 'en_usa_3', title: 'US Federal Reserve holds rates steady — hints at cuts later in 2026', summary: 'The Federal Reserve kept interest rates unchanged at 5.25–5.5% but signalled possible cuts later in 2026 if inflation continues to ease toward the 2% target.', image: null, link: '#', pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'NPR News', lang: 'en', isRss: false },
  { id: 'en_usa_4', title: 'SpaceX Starship completes first successful orbital test flight', summary: 'Elon Musk\'s SpaceX successfully launched and returned the Starship rocket in a fully orbital test. This marks a historic milestone for deep space travel.', image: null, link: '#', pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'VOA News', lang: 'en', isRss: false },
  { id: 'en_usa_5', title: 'California wildfire emergency — 50,000 acres burned, thousands evacuated', summary: 'A massive wildfire in Southern California has burned over 50,000 acres, forcing thousands of residents to evacuate. State of emergency declared by the governor.', image: null, link: '#', pubDate: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'BBC US & Canada', lang: 'en', isRss: false },

  // China
  { id: 'en_chn_1', title: 'China holds largest-ever military drills around Taiwan — US warns Beijing', summary: 'China\'s PLA conducted its largest military exercises around Taiwan with 90 warships and 300 aircraft. Washington called it "destabilising" and urged restraint.', image: null, link: '#', pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'BBC Asia', lang: 'en', isRss: false },
  { id: 'en_chn_2', title: 'China GDP growth slows to 4.6% — lowest in three decades amid property crisis', summary: 'China\'s economy grew just 4.6% last year, its slowest pace in 30 years. The real estate crisis, falling exports and weak domestic consumption are weighing on growth.', image: null, link: '#', pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'South China Morning Post', lang: 'en', isRss: false },
  { id: 'en_chn_3', title: 'Xi Jinping meets Putin in Moscow — strategic partnership deepened', summary: 'Chinese President Xi Jinping visited Moscow for high-level talks with Vladimir Putin. Both countries signed new energy and defence cooperation agreements.', image: null, link: '#', pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Reuters World', lang: 'en', isRss: false },
  { id: 'en_chn_4', title: 'China\'s Chang\'e-6 returns first samples from Moon\'s far side', summary: 'China\'s Chang\'e-6 mission successfully returned 1.9 kg of lunar soil from the Moon\'s far side. This is a world first and a major triumph for China\'s space programme.', image: null, link: '#', pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'DW World English', lang: 'en', isRss: false },

  // Pakistan
  { id: 'en_pak_1', title: 'Pakistan government seeks to ban Imran Khan\'s PTI party — Supreme Court hearing', summary: 'Pakistan\'s Shahbaz Sharif government has filed a petition in the Supreme Court seeking a ban on Imran Khan\'s PTI. Political tensions in Islamabad are at a peak.', image: null, link: '#', pubDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Dawn Pakistan', lang: 'en', isRss: false },
  { id: 'en_pak_2', title: 'Pakistan secures $7 billion IMF bailout as economy teeters on edge', summary: 'The IMF has agreed to a $7 billion bailout for Pakistan as inflation tops 30% and foreign exchange reserves remain critically low. Harsh conditions attached.', image: null, link: '#', pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Geo News', lang: 'en', isRss: false },
  { id: 'en_pak_3', title: 'Massive floods devastate Pakistan\'s Sindh — 500 killed, millions displaced', summary: 'Catastrophic monsoon flooding has killed over 500 people across Pakistan\'s Sindh and Balochistan provinces. Islamabad has declared a national emergency and appealed for aid.', image: null, link: '#', pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'The News International', lang: 'en', isRss: false },
  { id: 'en_pak_4', title: 'Nawaz Sharif returns to Pakistan after years in London exile', summary: 'Former Pakistan PM Nawaz Sharif has returned to Lahore after years of self-imposed exile in London. Thousands of PML-N supporters lined the streets to welcome him back.', image: null, link: '#', pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Dawn Pakistan', lang: 'en', isRss: false },
  { id: 'en_pak_5', title: 'Pakistan Army launches major anti-terror operation in Khyber Pakhtunkhwa', summary: 'The Pakistan Army launched Operation Azm-e-Istehkam against militant groups in KPK and tribal areas. Dozens of militants were killed in the initial phase.', image: null, link: '#', pubDate: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Geo News', lang: 'en', isRss: false },

  // Russia-Ukraine
  { id: 'en_rus_1', title: 'Putin issues nuclear warning as Ukraine strikes deep inside Russian territory', summary: 'President Putin raised the nuclear alert level after Ukraine launched long-range drone attacks on Russian oil facilities. NATO convened an emergency session.', image: null, link: '#', pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'BBC World', lang: 'en', isRss: false },
  { id: 'en_rus_2', title: 'Russia launches largest drone attack on Kyiv — 40 injured in residential areas', summary: 'Russia fired over 150 drones at Kyiv in its largest attack since the war began. Ukraine\'s air defences intercepted most, but 40 civilians were wounded.', image: null, link: '#', pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Kyiv Independent', lang: 'en', isRss: false },
  { id: 'en_rus_3', title: 'Zelensky addresses UN General Assembly, demands more Western weapons', summary: 'Ukrainian President Volodymyr Zelensky told the UN General Assembly that Ukraine needs more air defence systems and long-range missiles to stop Russian aggression.', image: null, link: '#', pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Reuters World', lang: 'en', isRss: false },
  { id: 'en_rus_4', title: 'EU imposes 14th round of sanctions on Russia targeting oil and defence sectors', summary: 'The European Union adopted its 14th package of sanctions against Russia, targeting oil revenues and defence procurement networks to starve the war machine.', image: null, link: '#', pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Euronews', lang: 'en', isRss: false },
  { id: 'en_rus_5', title: 'Ceasefire talks gain momentum as Turkey offers mediation between Russia and Ukraine', summary: 'Turkish President Erdogan has offered to host peace talks between Russia and Ukraine in Istanbul. Both sides have given cautiously positive responses to the initiative.', image: null, link: '#', pubDate: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Al Jazeera', lang: 'en', isRss: false },

  // Middle East
  { id: 'en_mid_1', title: 'Gaza death toll crosses 40,000 — UN Security Council demands immediate ceasefire', summary: 'The death toll in Gaza has surpassed 40,000 according to health authorities. The UN Security Council passed a resolution demanding an immediate ceasefire.', image: null, link: '#', pubDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Al Jazeera', lang: 'en', isRss: false },
  { id: 'en_mid_2', title: 'Iran launches 300 missiles and drones at Israel — most intercepted', summary: 'Iran carried out its most extensive direct attack on Israel, launching over 300 ballistic missiles and drones. Israel said 99% were shot down with US, UK and Jordanian help.', image: null, link: '#', pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'BBC Middle East', lang: 'en', isRss: false },
  { id: 'en_mid_3', title: 'Saudi Arabia-Israel normalisation talks resume with US mediation', summary: 'Diplomatic talks between Saudi Arabia and Israel on normalising relations have resumed in Washington. A deal could reshape the Middle East\'s political landscape.', image: null, link: '#', pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Arab News', lang: 'en', isRss: false },
  { id: 'en_mid_4', title: 'Hamas hostage deal negotiations stall as Israel rules out key demands', summary: 'Ceasefire and hostage negotiations have broken down again after Israel rejected Hamas\'s demand for a permanent end to the war. Qatar and Egypt continue mediating.', image: null, link: '#', pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Jerusalem Post', lang: 'en', isRss: false },
  { id: 'en_mid_5', title: 'Hezbollah and Israel exchange heavy fire across Lebanon border', summary: 'Cross-border fighting between Hezbollah and Israeli forces has intensified along the Lebanon frontier. Hundreds of thousands on both sides remain displaced.', image: null, link: '#', pubDate: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Reuters World', lang: 'en', isRss: false },

  // Europe
  { id: 'en_eur_1', title: 'Labour Party wins UK election by a landslide — Keir Starmer becomes PM', summary: 'Britain\'s Labour Party won a historic landslide election victory ending 14 years of Conservative rule. Keir Starmer became Prime Minister with a majority of over 400 seats.', image: null, link: '#', pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'BBC Europe', lang: 'en', isRss: false },
  { id: 'en_eur_2', title: 'EU slaps 45% tariffs on Chinese electric vehicles — trade war looms', summary: 'The European Union approved steep tariffs of up to 45% on Chinese-made electric cars after finding they benefit from unfair state subsidies. Beijing vowed retaliation.', image: null, link: '#', pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'DW Europe', lang: 'en', isRss: false },
  { id: 'en_eur_3', title: 'Germany enters recession as GDP shrinks for second consecutive quarter', summary: 'Germany\'s economy contracted for the second quarter in a row, meeting the technical definition of a recession. Energy costs and weak Chinese demand are major factors.', image: null, link: '#', pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Euronews', lang: 'en', isRss: false },
  { id: 'en_eur_4', title: 'NATO summit: members agree to spend 3% of GDP on defence', summary: 'At the Washington NATO summit, member nations committed to raising defence spending to 3% of GDP. The move comes as Russia\'s war in Ukraine shows no sign of ending.', image: null, link: '#', pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Reuters World', lang: 'en', isRss: false },
  { id: 'en_eur_5', title: 'France snap election — far-right National Rally wins most seats but falls short of majority', summary: 'France\'s snap elections saw Marine Le Pen\'s far-right National Rally win the most seats but fail to secure a parliamentary majority. France faces a hung parliament.', image: null, link: '#', pubDate: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'France 24 English', lang: 'en', isRss: false },

  // South Asia
  { id: 'en_sa_1', title: 'Nepal PM loses confidence vote — new government formation begins', summary: 'Nepal\'s PM KP Sharma Oli lost a parliamentary confidence vote. The country faces its fourth government change in three years amid political instability in Kathmandu.', image: null, link: '#', pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Kathmandu Post', lang: 'en', isRss: false },
  { id: 'en_sa_2', title: 'Bangladesh PM Sheikh Hasina resigns after student uprising — flees to India', summary: 'Bangladesh PM Sheikh Hasina resigned and fled to India after a massive student-led uprising. An interim government led by Nobel laureate Muhammad Yunus has been formed.', image: null, link: '#', pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Daily Star Bangladesh', lang: 'en', isRss: false },
  { id: 'en_sa_3', title: 'Sri Lanka elects new president after historic economic crisis', summary: 'Sri Lanka has elected a new president in its first election since the 2022 economic collapse. The new government inherits a country still struggling to repay $46 billion in debt.', image: null, link: '#', pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Colombo Gazette', lang: 'en', isRss: false },
  { id: 'en_sa_4', title: 'Maldives president signs defence pact with China, snubs India', summary: 'Maldivian President Mohamed Muizzu signed a defence and free trade agreement with China. India expressed concern over the shifting strategic alignment of its island neighbour.', image: null, link: '#', pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Al Jazeera', lang: 'en', isRss: false },
  { id: 'en_sa_5', title: 'Taliban bans women from education and jobs — UN condemns "gender apartheid"', summary: 'Afghanistan\'s Taliban rulers have extended their ban on women\'s education and employment. The UN has called it "gender apartheid" and demanded immediate reversal.', image: null, link: '#', pubDate: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'BBC World', lang: 'en', isRss: false },

  // UN & Global
  { id: 'en_un_1', title: 'India pushes for permanent UNSC seat at UN General Assembly', summary: 'India made its strongest pitch yet for a permanent United Nations Security Council seat at the UNGA, with support from over 100 member nations including France and Russia.', image: null, link: '#', pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Reuters World', lang: 'en', isRss: false },
  { id: 'en_un_2', title: 'WHO pandemic treaty signed by 194 nations — global health preparedness boosted', summary: 'A landmark WHO pandemic treaty was signed by all 194 member nations, establishing binding rules for vaccine sharing, surveillance and early warning systems.', image: null, link: '#', pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'DW World English', lang: 'en', isRss: false },
  { id: 'en_un_3', title: 'G20 summit agrees on 15% global minimum corporate tax', summary: 'G20 leaders agreed to implement a 15% global minimum tax on large corporations to prevent profit shifting to tax havens. The deal covers 90% of global GDP.', image: null, link: '#', pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'BBC World', lang: 'en', isRss: false },
  { id: 'en_un_4', title: 'IMF cuts global growth forecast to 2.8% amid trade tensions and geopolitical risks', summary: 'The International Monetary Fund lowered its 2026 global growth forecast to 2.8%, citing escalating trade wars, high interest rates and ongoing geopolitical conflicts.', image: null, link: '#', pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Reuters World', lang: 'en', isRss: false },
  { id: 'en_un_5', title: 'Finland and Sweden join NATO — alliance expands to 32 members', summary: 'Finland and Sweden officially became NATO members, bringing the alliance to 32 nations. Russia warned of consequences and moved additional troops to the Finnish border.', image: null, link: '#', pubDate: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Al Jazeera', lang: 'en', isRss: false },

  // Climate
  { id: 'en_clm_1', title: '2025 confirmed as hottest year on record — global temperature 1.5°C above baseline', summary: 'Scientists confirmed 2025 as the hottest year since records began. The global average temperature exceeded 1.5°C above pre-industrial levels for the first time in a full year.', image: null, link: '#', pubDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'BBC Science & Environment', lang: 'en', isRss: false },
  { id: 'en_clm_2', title: 'COP30 in Brazil: 100+ nations pledge to phase out coal by 2035', summary: 'Over 100 countries at COP30 in Belem, Brazil committed to phasing out coal power by 2035. Developing nations secured a $300 billion annual climate finance package.', image: null, link: '#', pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'DW Science', lang: 'en', isRss: false },
  { id: 'en_clm_3', title: 'Arctic ice melting twice as fast as a decade ago — sea level rise threat grows', summary: 'A new study shows Arctic sea ice is melting at double the rate recorded a decade ago. Scientists warn sea levels could rise by up to 2 metres by 2100 if the trend continues.', image: null, link: '#', pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'BBC Science & Environment', lang: 'en', isRss: false },
  { id: 'en_clm_4', title: 'Central Europe floods kill 100+, thousands left homeless in Austria and Poland', summary: 'Historic floods caused by record rainfall killed over 100 people across Austria, Czech Republic and Poland. Thousands were evacuated as rivers burst their banks.', image: null, link: '#', pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Euronews', lang: 'en', isRss: false },
  { id: 'en_clm_5', title: 'Japan hit by 7.6 magnitude earthquake — tsunami warning issued for Pacific coast', summary: 'A powerful 7.6 magnitude earthquake struck Japan\'s Noto Peninsula, triggering tsunami warnings along the Pacific coast. Coastal towns began mass evacuations.', image: null, link: '#', pubDate: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'BBC Asia', lang: 'en', isRss: false },

  // Global Economy
  { id: 'en_eco_1', title: 'Oil prices surge past $100 a barrel as Middle East conflict deepens', summary: 'Crude oil prices crossed $100 per barrel for the first time since 2023 as the Middle East conflict raised fears of supply disruptions. Fuel prices are set to rise globally.', image: null, link: '#', pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Reuters Business', lang: 'en', isRss: false },
  { id: 'en_eco_2', title: 'World Bank announces $50 billion development fund for Africa and South Asia', summary: 'The World Bank unveiled a new $50 billion development fund targeting Africa and South Asia, focused on climate resilience, food security and women\'s economic empowerment.', image: null, link: '#', pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'DW Business', lang: 'en', isRss: false },
  { id: 'en_eco_3', title: 'Dollar surges as Fed signals rates to stay higher for longer', summary: 'The US dollar hit a six-month high against major currencies after the Federal Reserve signalled interest rates would remain elevated well into 2026. Emerging market currencies weakened.', image: null, link: '#', pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Reuters Business', lang: 'en', isRss: false },
  { id: 'en_eco_4', title: 'Global stock markets tumble on recession fears — Nasdaq falls 5%', summary: 'Wall Street and European markets fell sharply as weak manufacturing data raised fears of a global recession. Nasdaq dropped 5% in its worst single-day loss this year.', image: null, link: '#', pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'DW Business', lang: 'en', isRss: false },
  { id: 'en_eco_5', title: 'India projected to be world\'s fastest-growing major economy in 2026 — IMF', summary: 'The IMF projects India will grow at 7.2% in 2026, making it the fastest-growing major economy. Strong domestic demand, digital infrastructure and manufacturing are key drivers.', image: null, link: '#', pubDate: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'Reuters Business', lang: 'en', isRss: false },

  // Science & Tech
  { id: 'en_sci_1', title: 'NASA Artemis III mission confirmed for 2026 — first woman to walk on Moon', summary: 'NASA confirmed the Artemis III crewed Moon landing for 2026. For the first time in history, a woman astronaut will walk on the lunar surface, landing near the south pole.', image: null, link: '#', pubDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'NASA Breaking News', lang: 'en', isRss: false },
  { id: 'en_sci_2', title: 'SpaceX Starship reaches orbit in fully successful test — Mars mission on track', summary: 'SpaceX\'s Starship completed a fully successful orbital test flight and landed both the rocket and booster. Elon Musk confirmed the timeline for a 2028 Mars mission.', image: null, link: '#', pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'BBC Science & Environment', lang: 'en', isRss: false },
  { id: 'en_sci_3', title: 'OpenAI launches GPT-5 — scores 99.9% on human intelligence benchmarks', summary: 'OpenAI released GPT-5, its most powerful AI model yet. It scored above 99.9% on all standard human intelligence tests, sparking a global debate about AI safety.', image: null, link: '#', pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'DW Science', lang: 'en', isRss: false },
  { id: 'en_sci_4', title: 'Google Willow quantum chip solves in minutes what would take universe\'s age classically', summary: 'Google\'s Willow quantum computing chip performed a calculation in under 5 minutes that would take classical computers longer than the age of the universe.', image: null, link: '#', pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'BBC Science & Environment', lang: 'en', isRss: false },
  { id: 'en_sci_5', title: 'NASA Perseverance rover finds ancient water traces on Mars — life possibility grows', summary: 'NASA\'s Perseverance rover has discovered ancient traces of liquid water on Mars in rock formations. Scientists say the finding significantly raises the likelihood of past Martian life.', image: null, link: '#', pubDate: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), category: 'world', source: 'NASA Breaking News', lang: 'en', isRss: false },

  // ═══════════════ JOBS — GOVERNMENT (NATIONAL) ═══════════════
  {
    id: 'job_govt_1',
    title: 'Railway Recruitment 2026 — 35,000 Group D पदों पर भर्ती, नोटिफिकेशन जारी',
    summary: 'रेलवे भर्ती बोर्ड ने Group D के 35,000 से अधिक पदों के लिए नोटिफिकेशन जारी किया है। 10वीं पास उम्मीदवार आवेदन कर सकते हैं। ऑनलाइन आवेदन 15 अप्रैल तक करें।',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Dainik Jagran', lang: 'hi', isRss: false, breaking: true,
  },
  {
    id: 'job_govt_2',
    title: 'UPSC Civil Services 2026 — 1105 IAS/IPS/IFS पदों पर भर्ती, आवेदन शुरू',
    summary: 'UPSC ने सिविल सेवा परीक्षा 2026 के लिए अधिसूचना जारी की। प्रारंभिक परीक्षा 25 मई को होगी। IAS, IPS, IFS और अन्य केंद्रीय सेवाओं के लिए 1105 पद उपलब्ध हैं।',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Amar Ujala', lang: 'hi', isRss: false, featured: true,
  },
  {
    id: 'job_govt_3',
    title: 'IBPS PO 2026 Recruitment: 4500 posts — Online applications open now',
    summary: 'IBPS has announced recruitment for Probationary Officers across 11 public sector banks. 4500 vacancies available. Graduates can apply till April 20. Exam in July 2026.',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Hindustan Times', lang: 'en', isRss: false,
  },
  {
    id: 'job_govt_4',
    title: 'SSC MTS 2026 — 11,000 मल्टी-टास्किंग स्टाफ पदों पर भर्ती, 10वीं पास करें आवेदन',
    summary: 'कर्मचारी चयन आयोग ने MTS और हवलदार 2026 की भर्ती का नोटिफिकेशन जारी किया। 11,000 से अधिक पदों पर भर्ती होगी। 18-25 आयु वर्ग के उम्मीदवार पात्र हैं।',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Live Hindustan', lang: 'hi', isRss: false,
  },
  {
    id: 'job_govt_5',
    title: 'NDA 2026 (I) Recruitment: 400 vacancies for Army, Navy and Air Force',
    summary: 'UPSC has released NDA & NA Examination (I) 2026 notification with 400 seats for Army, Navy and Air Force. Applications open for 12th pass students. Exam on April 13.',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Times of India', lang: 'en', isRss: false,
  },
  {
    id: 'job_govt_6',
    title: 'SBI PO 2026 — 2000 प्रोबेशनरी ऑफिसर पदों पर भर्ती, जल्द करें आवेदन',
    summary: 'भारतीय स्टेट बैंक ने 2000 प्रोबेशनरी ऑफिसर पदों के लिए भर्ती अधिसूचना जारी की है। स्नातक उम्मीदवार 30 अप्रैल तक ऑनलाइन आवेदन कर सकते हैं।',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Navbharat Times', lang: 'hi', isRss: false,
  },
  {
    id: 'job_govt_7',
    title: 'CISF, BSF, CRPF Recruitment 2026 — Constable posts notification released for 8000 vacancies',
    summary: 'Central Armed Police Forces have jointly announced recruitment for 8000 Constable (GD) posts. Applications invited from 10th pass candidates aged 18-23 years.',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Hindustan Times', lang: 'en', isRss: false,
  },
  {
    id: 'job_govt_8',
    title: 'Employment News 2026 — सरकारी नौकरियों में 1.5 लाख नए पद सृजित करने की योजना',
    summary: 'केंद्र सरकार ने 2026-27 में 1.5 लाख नए सरकारी पद सृजित करने की योजना बनाई है। इसमें शिक्षक, स्वास्थ्य कर्मचारी और तकनीकी पदों पर जोर दिया जाएगा।',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Dainik Bhaskar', lang: 'hi', isRss: false,
  },

  // ═══════════════ JOBS — NATIONAL BIG COMPANIES ═══════════════
  {
    id: 'job_natco_1',
    title: 'TCS Hiring 2026: Plans to recruit 40,000 freshers — campus drive across India',
    summary: 'Tata Consultancy Services announced plans to hire 40,000 freshers in FY2026-27, signaling recovery in IT hiring. Campus recruitment drives to begin at 200+ engineering colleges.',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Times of India', lang: 'en', isRss: false, featured: true,
  },
  {
    id: 'job_natco_2',
    title: 'Infosys Recruitment 2026 — 25,000 fresher hiring शुरू, जानिए कैसे करें apply',
    summary: 'इंफोसिस ने 2026 में 25,000 फ्रेशर्स को हायर करने का ऐलान किया है। InfyTQ प्लेटफॉर्म पर रजिस्ट्रेशन शुरू हो चुकी है। इंजीनियरिंग ग्रेजुएट कर सकते हैं आवेदन।',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Dainik Bhaskar', lang: 'hi', isRss: false,
  },
  {
    id: 'job_natco_3',
    title: 'Wipro Hiring 2026: 15,000 entry-level engineers to be recruited this fiscal',
    summary: 'Wipro announced recruitment of 15,000 entry-level employees across India in FY2026-27. The company is focusing on AI, cloud and cybersecurity skill profiles.',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Hindustan Times', lang: 'en', isRss: false,
  },
  {
    id: 'job_natco_4',
    title: 'Reliance Industries — Jio Platforms में 10,000 टेक जॉब्स, AI और 5G एक्सपर्ट्स की मांग',
    summary: 'रिलायंस इंडस्ट्रीज की Jio Platforms ने 2026 में 10,000 तकनीकी कर्मचारियों की भर्ती की योजना बनाई है। AI, ML और 5G विशेषज्ञों को प्राथमिकता दी जाएगी।',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Navbharat Times', lang: 'hi', isRss: false,
  },
  {
    id: 'job_natco_5',
    title: 'HCL Technologies Recruitment 2026 — 20,000 freshers to be hired, salary up to ₹4.5 LPA',
    summary: 'HCL Technologies will hire 20,000 freshers from engineering and MCA backgrounds in 2026. Starting package up to Rs 4.5 LPA with performance bonuses and upskilling programs.',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'The Hindu', lang: 'en', isRss: false,
  },
  {
    id: 'job_natco_6',
    title: 'Flipkart, Swiggy, Zomato — Startup ecosystem में 50,000 नई नौकरियां, e-commerce boom',
    summary: 'भारतीय स्टार्टअप्स ने 2026 की पहली तिमाही में ई-कॉमर्स, डिलीवरी और टेक में 50,000 से अधिक नए रोजगार पैदा किए। Flipkart और Meesho सबसे बड़े नियोक्ता बने।',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Amar Ujala', lang: 'hi', isRss: false,
  },
  {
    id: 'job_natco_7',
    title: 'HDFC Bank, ICICI Bank, Axis Bank — Banking sector to hire 1 lakh employees in 2026',
    summary: 'Private sector banks in India plan to hire over 1 lakh employees across branches and digital divisions in 2026. Freshers with finance degrees and digital skills preferred.',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Economic Times', lang: 'en', isRss: false,
  },

  // ═══════════════ JOBS — INTERNATIONAL BIG COMPANIES ═══════════════
  {
    id: 'job_intl_1',
    title: 'Google Hiring 2026: 12,000 engineers to be recruited globally — India gets major share',
    summary: 'Google announced plans to hire 12,000 software engineers globally in 2026. India offices in Bengaluru and Hyderabad are set to receive 3,000+ new positions in AI, cloud and search.',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Times of India', lang: 'en', isRss: false, featured: true,
  },
  {
    id: 'job_intl_2',
    title: 'Microsoft India में 5,000 नई नौकरियां — Azure AI और Cloud इंजीनियर्स की भारी मांग',
    summary: 'माइक्रोसॉफ्ट इंडिया ने हैदराबाद और बेंगलुरु में 5,000 नई नौकरियों की घोषणा की है। Azure क्लाउड, AI और साइबरसिक्योरिटी में विशेषज्ञों को प्राथमिकता दी जाएगी।',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Dainik Jagran', lang: 'hi', isRss: false, breaking: true,
  },
  {
    id: 'job_intl_3',
    title: 'Amazon AWS expands India operations — 8,000 jobs created in tech, logistics and cloud',
    summary: 'Amazon Web Services is expanding its India presence with 8,000 new jobs across Bengaluru, Hyderabad and Pune. Roles span cloud architecture, ML engineering and data science.',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Hindustan Times', lang: 'en', isRss: false,
  },
  {
    id: 'job_intl_4',
    title: 'Meta (Facebook) — 2026 में 6,000 AI और VR इंजीनियर्स की भर्ती, भारत भी शामिल',
    summary: 'मेटा प्लेटफॉर्म्स ने 2026 में AI, AR/VR और WhatsApp टेक में 6,000 पदों पर भर्ती की घोषणा की। भारत के मुंबई और बेंगलुरु ऑफिस में 1,500 पद होंगे।',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Navbharat Times', lang: 'hi', isRss: false,
  },
  {
    id: 'job_intl_5',
    title: 'Apple India hiring surge 2026 — 2,500 roles in engineering, retail and supply chain',
    summary: 'Apple is ramping up hiring in India with 2,500 new positions. The expansion follows Foxconn and Tata Electronics scaling up iPhone production in Tamil Nadu and Karnataka.',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'The Hindu', lang: 'en', isRss: false,
  },
  {
    id: 'job_intl_6',
    title: 'Tesla Gigafactory India — 10,000 नौकरियां, EV इंजीनियरिंग और मैन्युफैक्चरिंग में भर्ती',
    summary: 'टेस्ला ने भारत में गीगाफैक्टरी स्थापित करने की योजना की पुष्टि की है। EV मैन्युफैक्चरिंग, बैटरी टेक्नोलॉजी और सॉफ्टवेयर में 10,000 रोजगार मिलेंगे।',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Dainik Bhaskar', lang: 'hi', isRss: false,
  },
  {
    id: 'job_intl_7',
    title: 'Netflix, Samsung, Sony — Global MNCs adding 15,000 tech jobs in India in 2026',
    summary: 'International companies including Netflix, Samsung R&D and Sony are collectively adding over 15,000 technology and content roles in India, making it the fastest-growing tech hub globally.',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Economic Times', lang: 'en', isRss: false,
  },
  {
    id: 'job_intl_8',
    title: 'IBM India में 7,000 AI Consultant और Data Engineer की वैकेंसी — ₹12-25 LPA सैलरी',
    summary: 'आईबीएम इंडिया ने AI कंसल्टेंट, डेटा इंजीनियर और क्लाउड आर्किटेक्ट के 7,000 पदों पर भर्ती की घोषणा की है। पुणे, बेंगलुरु और हैदराबाद में मुख्य ऑफिस हैं।',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Live Hindustan', lang: 'hi', isRss: false,
  },

  // ═══════════════ JOBS — REMOTE & FREELANCE (UPWORK, LINKEDIN) ═══════════════
  {
    id: 'job_remote_1',
    title: 'Upwork Report 2026: Indian freelancers earn $2 billion — highest in Asia Pacific',
    summary: 'Upwork\'s annual report reveals Indian freelancers earned over $2 billion in 2025, ranking highest in Asia Pacific. Top skills: web development, AI/ML, content writing and graphic design.',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Times of India', lang: 'en', isRss: false, featured: true,
  },
  {
    id: 'job_remote_2',
    title: 'LinkedIn Jobs India 2026 — AI, Cloud और Data Science रोल्स में 300% की वृद्धि',
    summary: 'LinkedIn इंडिया की रिपोर्ट के अनुसार AI, क्लाउड कंप्यूटिंग और डेटा साइंस में जॉब पोस्टिंग में 300% की बढ़ोतरी हुई है। रिमोट जॉब ऑफर्स भी दोगुने हुए हैं।',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Dainik Jagran', lang: 'hi', isRss: false, breaking: true,
  },
  {
    id: 'job_remote_3',
    title: 'Work From Home jobs surge 2026: 40% of Indian IT professionals now working remotely',
    summary: 'A new survey by TeamLease finds 40% of Indian IT professionals work fully remote. WFH roles paying 20% premium over on-site positions, especially in software development and digital marketing.',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Hindustan Times', lang: 'en', isRss: false,
  },
  {
    id: 'job_remote_4',
    title: 'Fiverr पर भारतीय Freelancers का दबदबा — Video Editing और AI Prompt में सबसे ज्यादा गिग्स',
    summary: 'Fiverr की 2026 रिपोर्ट के अनुसार भारतीय फ्रीलांसर्स वीडियो एडिटिंग, AI प्रॉम्प्ट इंजीनियरिंग और वेब डिजाइन में सबसे ज्यादा सक्रिय हैं। औसत मासिक आय ₹50,000 से ऊपर।',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Navbharat Times', lang: 'hi', isRss: false,
  },
  {
    id: 'job_remote_5',
    title: 'Glassdoor India Salary Report 2026: Average tech salary crosses ₹12 LPA for first time',
    summary: 'Glassdoor\'s India compensation report shows average technology sector salary has crossed ₹12 LPA for the first time. AI engineers and cloud architects command ₹25-40 LPA.',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'The Hindu', lang: 'en', isRss: false,
  },
  {
    id: 'job_remote_6',
    title: 'Indeed India Report — Naukri.com पर 50 लाख जॉब लिस्टिंग — IT और Banking में सबसे ज्यादा',
    summary: 'Naukri.com पर 2026 में 50 लाख से अधिक जॉब लिस्टिंग हैं। IT सेक्टर में सबसे ज्यादा वैकेंसी है, इसके बाद BFSI और हेल्थकेयर का नंबर आता है।',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Dainik Bhaskar', lang: 'hi', isRss: false,
  },

  // ═══════════════ JOBS — STATE RECRUITMENT ═══════════════
  {
    id: 'job_state_1',
    title: 'UKPSC 2026 — उत्तराखंड में 800 PCS अधिकारी पदों पर भर्ती, परीक्षा जून में',
    summary: 'उत्तराखंड लोक सेवा आयोग ने PCS 2026 के लिए 800 पदों पर भर्ती की अधिसूचना जारी की। प्रारंभिक परीक्षा जून 2026 में होगी।',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Amar Ujala', lang: 'hi', isRss: false,
  },
  {
    id: 'job_state_2',
    title: 'UP Police Recruitment 2026 — 60,244 constable vacancies: India\'s biggest state police drive',
    summary: 'Uttar Pradesh Police has announced recruitment for 60,244 constable posts — the largest state police recruitment drive in India\'s history. Applications open till May 15, 2026.',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Times of India', lang: 'en', isRss: false, breaking: true,
  },
  {
    id: 'job_state_3',
    title: 'UKSSSC 2026 — उत्तराखंड में 1,500 ग्राम विकास अधिकारी और लेखपाल पदों पर भर्ती',
    summary: 'उत्तराखंड अधीनस्थ सेवा चयन आयोग ने ग्राम विकास अधिकारी और लेखपाल के 1,500 पदों पर भर्ती का नोटिफिकेशन जारी किया।',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Live Hindustan', lang: 'hi', isRss: false,
  },
  {
    id: 'job_state_4',
    title: 'Rajasthan RPSC 2026: 2,500 RAS officers to be recruited — application begins April 1',
    summary: 'Rajasthan Public Service Commission has announced recruitment for 2,500 RAS and allied service posts. Written examination scheduled for August 2026.',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Hindustan Times', lang: 'en', isRss: false,
  },
  {
    id: 'job_state_5',
    title: 'Maharashtra — MPSC ने 5,000 राज्य सेवा पदों पर भर्ती की घोषणा की',
    summary: 'महाराष्ट्र लोक सेवा आयोग ने 2026 में 5,000 से अधिक राज्य सेवा, पुलिस और तकनीकी पदों पर भर्ती की योजना बनाई है। ऑनलाइन आवेदन 1 मई से शुरू होंगे।',
    image: null, link: '#',
    pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    category: 'jobs', source: 'Navbharat Times', lang: 'hi', isRss: false,
  },
];

export default sampleNews;

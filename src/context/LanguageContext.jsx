import React, { createContext, useContext, useState, useCallback } from 'react';

const LanguageContext = createContext();

export const useLang = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLang must be used within LanguageProvider');
  return context;
};

// All translatable UI strings
const translations = {
  HI: {
    // Header
    subscribeCTA: 'सदस्यता लें',
    searchPlaceholder: 'खोजें...',
    breakingNews: 'ब्रेकिंग न्यूज़',

    // Navigation
    home: 'होम',
    stateNews: 'राज्य समाचार',

    // Categories
    education: 'शिक्षा',
    jobs: 'नौकरी',
    rental: 'किराया',
    astro: 'ज्योतिषशास्त्र',
    health: 'स्वास्थ्य',
    technology: 'तकनीक',
    podcast: 'पॉडकास्ट',
    quiz: 'प्रश्नोत्तरी',
    national: 'देश',
    world: 'विदेश',

    // Sections
    indiaNews: 'देश की खबरें',
    worldNews: '🌍 विदेश की खबरें',
    latestNews: 'ताज़ी खबरें',
    relatedNews: 'इसी श्रेणी में',
    trendingNow: 'ट्रेंडिंग',
    topStories: 'मुख्य खबरें',

    // States
    delhi: 'दिल्ली',
    uttarakhand: 'उत्तराखंड',
    uttarPradesh: 'उत्तर प्रदेश',
    otherStates: 'अन्य राज्य',

    // Subscription
    subscriptionTitle: '📧 साप्ताहिक न्यूज़लेटर — निःशुल्क सदस्यता लें',
    subscriptionSubtitle: 'हर हफ्ते PDF में ताज़ी खबरें — WhatsApp और Email पर',
    emailPlaceholder: 'ईमेल दर्ज करें',
    mobilePlaceholder: 'मोबाइल नंबर',
    subscribeBtn: 'सदस्यता लें',
    subscribeSuccess: 'सदस्यता सफल! धन्यवाद!',
    subscribeDuplicate: 'आप पहले से सदस्य हैं!',
    invalidEmail: 'कृपया सही ईमेल दर्ज करें',
    invalidMobile: 'कृपया 10 अंकों का मोबाइल नंबर दर्ज करें',

    // Footer
    quickLinks: 'त्वरित लिंक',
    stateNewsFooter: 'राज्य समाचार',
    contactUs: 'संपर्क करें',
    allRightsReserved: 'सर्वाधिकार सुरक्षित',
    poweredBy: 'Powered by',
    portalDesc: 'खबर का सफर — तेज नज़र तेज़ खबर। आपका अपना हिंदी समाचार पोर्टल। ताज़ा खबरें, शिक्षा, नौकरी, राशिफल, स्वास्थ्य और तकनीक से जुड़ी हर अपडेट सबसे पहले।',

    // Search
    searchResults: 'के लिए परिणाम',
    noResults: 'कोई परिणाम नहीं मिला',
    typeToSearch: 'कृपया खोजने के लिए कुछ टाइप करें',

    // Category page
    noCategoryArticles: 'इस श्रेणी में अभी कोई खबर उपलब्ध नहीं है',
    loadMore: 'और खबरें देखें',
    sortLatest: 'नवीनतम',
    sortOldest: 'पुराने',
    allSources: 'सभी स्रोत',
    comingSoon: 'जल्द आ रहा है',

    // Admin
    adminPanel: 'एडमिन पैनल',
    dashboard: 'डैशबोर्ड',
    addArticle: 'लेख जोड़ें',
    manageArticles: 'लेख प्रबंधन',
    subscribers: 'सदस्य',
    logout: 'लॉग आउट',
    backToSite: 'वेबसाइट पर जाएं',

    // Article
    readMore: 'पूरा पढ़ें',
    shareArticle: 'शेयर करें',
    minuteRead: 'मिनट पढ़ें',

    // 404
    pageNotFound: 'पेज नहीं मिला',
    goHome: 'होम पर जाएं',

    // Loading
    loadingNews: 'समाचार लोड हो रहे हैं...',

    // Mobile nav
    search: 'खोजें',
    categories: 'श्रेणियाँ',

    // Article page
    articleNotFound: 'खबर नहीं मिली',
    articleNotFoundDesc: 'यह लेख मौजूद नहीं है या हटा दिया गया है।',
    goToHomepage: 'होमपेज पर जाएँ',
    relatedNewsTitle: 'संबंधित खबरें',
    newsletterSidebarTitle: 'खबरें सीधे अपने इनबॉक्स में पाएँ',
    newsletterSidebarDesc: 'हमारे न्यूज़लेटर की सदस्यता लें और ताज़ा खबरें पाएँ।',
    yourEmail: 'आपका ईमेल',

    // Misc
    breaking: 'ब्रेकिंग',
    copied: 'कॉपी!',
    copyLink: 'लिंक कॉपी करें',

    // Sidebar widgets
    newsletter: '📧 न्यूज़लेटर',
    newsletterWidgetDesc: 'हर हफ्ते ताज़ा खबरें सीधे अपने इनबॉक्स में पाएं — बिल्कुल मुफ्त!',
    followUs: 'हमें फॉलो करें',

    // Uttarakhand section
    uttarakhandNews: 'उत्तराखंड समाचार',
    uttarakhandSubtitle: 'देवभूमि की ताज़ी खबरें',
    uttarakhandBadge: 'उत्तराखंड',

    // Ads
    advertisement: 'विज्ञापन',

    // Category page
    articlesFound: 'खबरें मिलीं',

    // Auth
    loginTitle: 'लॉग इन करें',
    signupTitle: 'साइन अप करें',
    namePlaceholder: 'आपका नाम',
    passwordPlaceholder: 'पासवर्ड',
    loginBtn: 'लॉग इन',
    signupBtn: 'साइन अप',
    loggingIn: 'लॉग इन हो रहा है…',
    signingUp: 'साइन अप हो रहा है…',
    noAccount: 'खाता नहीं है?',
    haveAccount: 'पहले से खाता है?',
    loginSuccess: 'लॉग इन सफल!',
    signupSuccess: 'साइन अप सफल! स्वागत है!',
    pdfSubscribePrompt: 'PDF डाउनलोड के लिए साइन अप करें',
    myAccount: 'मेरा खाता',
  },

  EN: {
    subscribeCTA: 'Subscribe',
    searchPlaceholder: 'Search...',
    breakingNews: 'BREAKING NEWS',

    home: 'Home',
    stateNews: 'State News',

    education: 'Education',
    jobs: 'Jobs',
    rental: 'Rental',
    astro: 'Astro',
    health: 'Health',
    technology: 'Technology',
    podcast: 'Podcast',
    quiz: 'Quiz',
    national: 'National',
    world: 'World',

    indiaNews: 'India News',
    worldNews: '🌍 World News',
    latestNews: 'Latest News',
    relatedNews: 'Related News',
    trendingNow: 'Trending Now',
    topStories: 'Top Stories',

    delhi: 'Delhi',
    uttarakhand: 'Uttarakhand',
    uttarPradesh: 'Uttar Pradesh',
    otherStates: 'Other States',

    subscriptionTitle: '📧 Weekly Newsletter — Free Subscription',
    subscriptionSubtitle: 'Fresh news in PDF every week — on WhatsApp and Email',
    emailPlaceholder: 'Enter email',
    mobilePlaceholder: 'Mobile number',
    subscribeBtn: 'Subscribe',
    subscribeSuccess: 'Subscribed successfully! Thank you!',
    subscribeDuplicate: 'You are already subscribed!',
    invalidEmail: 'Please enter a valid email',
    invalidMobile: 'Please enter a 10-digit mobile number',

    quickLinks: 'Quick Links',
    stateNewsFooter: 'State News',
    contactUs: 'Contact Us',
    allRightsReserved: 'All Rights Reserved',
    poweredBy: 'Powered by',
    portalDesc: 'Khabar Ka Safar — Tez Nazar Tez Khabar. Your Hindi news portal. Latest updates on education, jobs, astrology, health, and technology.',

    searchResults: 'results for',
    noResults: 'No results found',
    typeToSearch: 'Type something to search',

    noCategoryArticles: 'No articles available in this category',
    loadMore: 'Load More',
    sortLatest: 'Latest',
    sortOldest: 'Oldest',
    allSources: 'All Sources',
    comingSoon: 'Coming Soon',

    adminPanel: 'Admin Panel',
    dashboard: 'Dashboard',
    addArticle: 'Add Article',
    manageArticles: 'Manage Articles',
    subscribers: 'Subscribers',
    logout: 'Logout',
    backToSite: 'Back to Site',

    readMore: 'Read More',
    shareArticle: 'Share',
    minuteRead: 'min read',

    pageNotFound: 'Page Not Found',
    goHome: 'Go Home',

    loadingNews: 'Loading news...',

    // Mobile nav
    search: 'Search',
    categories: 'Categories',

    // Article page
    articleNotFound: 'Article Not Found',
    articleNotFoundDesc: 'This article does not exist or has been removed.',
    goToHomepage: 'Go to Homepage',
    relatedNewsTitle: 'Related News',
    newsletterSidebarTitle: 'Get news directly in your inbox',
    newsletterSidebarDesc: 'Subscribe to our newsletter and get the latest news.',
    yourEmail: 'Your email',

    // Misc
    breaking: 'BREAKING',
    copied: 'Copied!',
    copyLink: 'Copy Link',

    // Sidebar widgets
    newsletter: '📧 Newsletter',
    newsletterWidgetDesc: 'Get fresh news every week directly in your inbox — completely free!',
    followUs: 'Follow Us',

    // Uttarakhand section
    uttarakhandNews: 'Uttarakhand News',
    uttarakhandSubtitle: 'Latest News from Devbhoomi',
    uttarakhandBadge: 'Uttarakhand',

    // Ads
    advertisement: 'Ad',

    // Category page
    articlesFound: 'articles found',

    // Auth
    loginTitle: 'Log In',
    signupTitle: 'Sign Up',
    namePlaceholder: 'Your name',
    passwordPlaceholder: 'Password',
    loginBtn: 'Log In',
    signupBtn: 'Sign Up',
    loggingIn: 'Logging in…',
    signingUp: 'Signing up…',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    loginSuccess: 'Logged in successfully!',
    signupSuccess: 'Signed up successfully! Welcome!',
    pdfSubscribePrompt: 'Sign up to download PDF',
    myAccount: 'My Account',
  },
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('appLang') || 'HI');

  const setLangPersist = useCallback((newLang) => {
    setLang(newLang);
    localStorage.setItem('appLang', newLang);
  }, []);

  const t = useCallback((key) => {
    return translations[lang]?.[key] || key;
  }, [lang]);

  const getCatLabel = useCallback((slug) => {
    return translations[lang]?.[slug] || slug;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang: setLangPersist, t, getCatLabel }}>
      {children}
    </LanguageContext.Provider>
  );
};

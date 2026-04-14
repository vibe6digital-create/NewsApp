export const PORTAL_NAME = "कौशल प्राइम नेशन";
export const PORTAL_NAME_EN = "Kaushal Prime Nation";
export const PORTAL_TAGLINE = "उत्तराखंड की आवाज़";
export const PORTAL_TAGLINE_EN = "Voice of Uttarakhand";
export const PORTAL_SLOGAN = "तेज नज़र तेज़ खबर";
export const PORTAL_SLOGAN_EN = "Tez Nazar Tez Khabar";
export const ADMIN_USER = "admin";
export const ADMIN_PASS = "news@2026";
export const SUBSCRIPTION_KEY = "portal_subscribers";
export const ARTICLES_KEY = "portal_articles";
export const CACHE_KEY = "rss_cache_v29";
export const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Backend API URL — change this to your Render URL after deploying
// e.g. 'https://kpn-server.onrender.com'
export const API_BASE = process.env.REACT_APP_API_URL || '';
export const AUTO_REFRESH_INTERVAL = 10 * 60 * 1000; // auto-refresh every 10 minutes

export const CATEGORIES = [
  { slug: "national", label: "देश", labelEn: "National", emoji: "🇮🇳", color: "#CC0000" },
  { slug: "world", label: "विदेश", labelEn: "World", emoji: "🌍", color: "#6366F1" },
  { slug: "education", label: "शिक्षा", labelEn: "Education", emoji: "📚", color: "#3B82F6" },
  { slug: "jobs", label: "नौकरी", labelEn: "Jobs", emoji: "🧑‍💼", color: "#22C55E" },
  { slug: "health", label: "स्वास्थ्य", labelEn: "Health", emoji: "💊", color: "#EF4444" },
  { slug: "technology", label: "तकनीक", labelEn: "Technology", emoji: "💻", color: "#06B6D4" },
  { slug: "astro", label: "ज्योतिषशास्त्र", labelEn: "Astrology", emoji: "⭐", color: "#FFD700" },
];

export const STATES = [
  "Delhi", "Uttarakhand", "Uttar Pradesh",
  "Madhya Pradesh", "Maharashtra", "Bihar",
  "Rajasthan", "Gujarat", "Kerala", "West Bengal"
];

export const CATEGORY_KEYWORDS = {
  education: ["education", "school", "admission", "college", "university", "scholarship", "शिक्षा", "विद्यालय", "प्रवेश"],
  jobs: [
    "job", "recruitment", "vacancy", "sarkari naukri", "hiring", "भर्ती", "नौकरी", "रोजगार",
    "UPSC", "SSC CGL", "SSC MTS", "railway recruitment", "IBPS PO", "SBI PO", "NDA",
    "CISF", "CRPF", "BSF", "defence recruitment", "PSU recruitment",
    "TCS hiring", "Infosys hiring", "Wipro hiring", "HCL Technologies",
    "Google hiring", "Microsoft hiring", "Amazon hiring", "Meta hiring", "Apple India hiring",
    "Tesla India", "IBM India", "freshers hiring", "campus placement",
    "Upwork", "Fiverr", "freelance", "remote job", "work from home", "WFH",
    "LinkedIn Jobs", "Glassdoor", "Naukri", "salary report", "LPA",
    "UKPSC", "UKSSSC", "UP Police recruitment", "RPSC", "MPSC",
    "employment notification", "पद", "वैकेंसी", "नियुक्ति", "आवेदन",
  ],
  astro: ["astrology", "rashifal", "horoscope", "kundali", "jyotish", "राशिफल", "ज्योतिष"],
  health: ["health", "medical", "hospital", "disease", "medicine", "yoga", "स्वास्थ्य", "चिकित्सा"],
  technology: [
    "technology", "tech", "AI", "artificial intelligence", "machine learning", "ChatGPT", "OpenAI",
    "smartphone", "mobile phone", "gadget", "laptop", "computer", "software", "hardware",
    "internet", "digital", "cybersecurity", "hacking", "data breach", "cyber attack",
    "startup", "unicorn", "funding", "app", "social media", "Meta", "Google", "Apple", "Microsoft",
    "ISRO", "NASA", "space", "satellite", "5G", "electric vehicle", "EV",
    "तकनीक", "प्रौद्योगिकी", "स्मार्टफोन", "साइबर", "इंटरनेट", "डिजिटल इंडिया",
  ],
  national: ["india", "national", "भारत", "देश", "राष्ट्रीय"],
  world: ["world", "international", "global", "विदेश", "अंतरराष्ट्रीय"],
  uttarakhand: [
    "uttarakhand", "उत्तराखंड", "dehradun", "देहरादून", "haridwar", "हरिद्वार",
    "rishikesh", "ऋषिकेश", "nainital", "नैनीताल", "mussoorie", "मसूरी",
    "roorkee", "रुड़की", "haldwani", "हल्द्वानी", "almora", "अल्मोड़ा",
    "pithoragarh", "पिथौरागढ़", "chamoli", "चमोली", "uttarkashi", "उत्तरकाशी",
    "chardham", "चारधाम", "kedarnath", "केदारनाथ", "badrinath", "बद्रीनाथ",
    "gangotri", "गंगोत्री", "yamunotri", "यमुनोत्री", "corbett", "कॉर्बेट",
    "ukpsc", "uksssc", "उत्तराखंड सरकार",
    "rudrapur", "रुद्रपुर", "kashipur", "काशीपुर", "kotdwar", "कोटद्वार",
    "pauri", "पौड़ी", "tehri", "टिहरी", "rudraprayag", "रुद्रप्रयाग",
    "bageshwar", "बागेश्वर", "champawat", "चंपावत", "haridwar news", "dehradun news",
    "devbhoomi", "देवभूमि", "garhwal", "गढ़वाल", "kumaon", "कुमाऊं",
  ],
};

export const RSS_FEEDS = [
  // ── Astrology / Jyotish feeds ──
  {
    name: "Dainik Bhaskar Rashifal",
    url: "https://www.bhaskar.com/rss-feed/1427/",
    lang: "hi", priority: true,
    categories: ["astro"]
  },
  {
    name: "Amar Ujala Jyotish",
    url: "https://www.amarujala.com/rss/astrology.xml",
    lang: "hi", priority: true,
    categories: ["astro"]
  },
  {
    name: "Jagran Jyotish",
    url: "https://www.jagran.com/rss/astrology.xml",
    lang: "hi", priority: true,
    categories: ["astro"]
  },
  {
    name: "Navbharat Times Astrology",
    url: "https://navbharattimes.indiatimes.com/rssfeeds/astrology.cms",
    lang: "hi",
    categories: ["astro"]
  },
  {
    name: "Live Hindustan Rashifal",
    url: "https://www.livehindustan.com/rss/jyotish.xml",
    lang: "hi",
    categories: ["astro"]
  },
  {
    name: "Patrika Rashifal",
    url: "https://www.patrika.com/rss/horoscope-news.xml",
    lang: "hi",
    categories: ["astro"]
  },

  // ── State-wise Regional News Feeds ──
  // Each feed carries a `state` slug — articles from these feeds are pinned
  // exclusively to that state page (no keyword bleed to other states).

  // Delhi / NCR
  { name: "Amar Ujala Delhi", url: "https://www.amarujala.com/rss/delhi-ncr.xml", lang: "hi", priority: true, categories: ["national"], state: "delhi" },
  { name: "Jagran Delhi", url: "https://www.jagran.com/rss/delhi.xml", lang: "hi", priority: true, categories: ["national"], state: "delhi" },
  { name: "Live Hindustan Delhi", url: "https://www.livehindustan.com/rss/delhi.xml", lang: "hi", categories: ["national"], state: "delhi" },
  { name: "Times of India Delhi", url: "https://timesofindia.indiatimes.com/rssfeeds/2646163.cms", lang: "en", categories: ["national"], state: "delhi" },
  { name: "Navbharat Times Delhi", url: "https://navbharattimes.indiatimes.com/rssfeeds/4705557.cms", lang: "hi", categories: ["national"], state: "delhi" },

  // Uttar Pradesh
  { name: "Amar Ujala UP", url: "https://www.amarujala.com/rss/uttar-pradesh.xml", lang: "hi", priority: true, categories: ["national"], state: "uttar-pradesh" },
  { name: "Jagran UP", url: "https://www.jagran.com/rss/uttar-pradesh.xml", lang: "hi", priority: true, categories: ["national"], state: "uttar-pradesh" },
  { name: "Live Hindustan UP", url: "https://www.livehindustan.com/rss/uttar-pradesh.xml", lang: "hi", categories: ["national"], state: "uttar-pradesh" },
  { name: "Navbharat Times UP", url: "https://navbharattimes.indiatimes.com/rssfeeds/uttar-pradesh.cms", lang: "hi", categories: ["national"], state: "uttar-pradesh" },
  { name: "Jagran Lucknow", url: "https://www.jagran.com/rss/lucknow-news.xml", lang: "hi", categories: ["national"], state: "uttar-pradesh" },

  // Bihar
  { name: "Amar Ujala Bihar", url: "https://www.amarujala.com/rss/bihar.xml", lang: "hi", priority: true, categories: ["national"], state: "bihar" },
  { name: "Jagran Bihar", url: "https://www.jagran.com/rss/bihar.xml", lang: "hi", categories: ["national"], state: "bihar" },
  { name: "Prabhat Khabar Bihar", url: "https://www.prabhatkhabar.com/rss/state/bihar", lang: "hi", categories: ["national"], state: "bihar" },
  { name: "Live Hindustan Bihar", url: "https://www.livehindustan.com/rss/bihar.xml", lang: "hi", categories: ["national"], state: "bihar" },
  { name: "Live Hindustan Patna", url: "https://www.livehindustan.com/rss/patna.xml", lang: "hi", categories: ["national"], state: "bihar" },

  // Jharkhand
  { name: "Jagran Jharkhand", url: "https://www.jagran.com/rss/jharkhand.xml", lang: "hi", categories: ["national"], state: "jharkhand" },
  { name: "Prabhat Khabar Jharkhand", url: "https://www.prabhatkhabar.com/rss/state/jharkhand", lang: "hi", categories: ["national"], state: "jharkhand" },
  { name: "Live Hindustan Jharkhand", url: "https://www.livehindustan.com/rss/jharkhand.xml", lang: "hi", categories: ["national"], state: "jharkhand" },
  { name: "Amar Ujala Jharkhand", url: "https://www.amarujala.com/rss/jharkhand.xml", lang: "hi", categories: ["national"], state: "jharkhand" },

  // Madhya Pradesh
  { name: "Dainik Bhaskar MP", url: "https://www.bhaskar.com/rss-feed/1064/", lang: "hi", priority: true, categories: ["national"], state: "madhya-pradesh" },
  { name: "Nai Dunia MP", url: "https://www.naidunia.com/rss/mp", lang: "hi", categories: ["national"], state: "madhya-pradesh" },
  { name: "Patrika Bhopal", url: "https://www.patrika.com/rss/bhopal-news.xml", lang: "hi", categories: ["national"], state: "madhya-pradesh" },
  { name: "Haribhoomi MP", url: "https://www.haribhoomi.com/rss/madhya-pradesh.xml", lang: "hi", categories: ["national"], state: "madhya-pradesh" },

  // Chhattisgarh
  { name: "Dainik Bhaskar CG", url: "https://www.bhaskar.com/rss-feed/1067/", lang: "hi", categories: ["national"], state: "chhattisgarh" },
  { name: "Patrika Raipur", url: "https://www.patrika.com/rss/raipur-news.xml", lang: "hi", categories: ["national"], state: "chhattisgarh" },
  { name: "Haribhoomi CG", url: "https://www.haribhoomi.com/rss/chhattisgarh.xml", lang: "hi", categories: ["national"], state: "chhattisgarh" },
  { name: "Nai Dunia CG", url: "https://www.naidunia.com/rss/chhattisgarh", lang: "hi", categories: ["national"], state: "chhattisgarh" },

  // Rajasthan
  { name: "Dainik Bhaskar Rajasthan", url: "https://www.bhaskar.com/rss-feed/1065/", lang: "hi", priority: true, categories: ["national"], state: "rajasthan" },
  { name: "Patrika Jaipur", url: "https://www.patrika.com/rss/jaipur-news.xml", lang: "hi", categories: ["national"], state: "rajasthan" },
  { name: "Amar Ujala Rajasthan", url: "https://www.amarujala.com/rss/rajasthan.xml", lang: "hi", categories: ["national"], state: "rajasthan" },
  { name: "Jagran Rajasthan", url: "https://www.jagran.com/rss/rajasthan.xml", lang: "hi", categories: ["national"], state: "rajasthan" },

  // Gujarat
  { name: "Dainik Bhaskar Gujarat", url: "https://www.bhaskar.com/rss-feed/1066/", lang: "hi", priority: true, categories: ["national"], state: "gujarat" },
  { name: "Divya Bhaskar Gujarat", url: "https://www.divyabhaskar.co.in/rss-feed/1062/", lang: "gu", categories: ["national"], state: "gujarat" },
  { name: "Sandesh Gujarat", url: "https://www.sandesh.com/rss/gujarat-news", lang: "gu", categories: ["national"], state: "gujarat" },

  // Maharashtra
  { name: "Navbharat Times Mumbai", url: "https://navbharattimes.indiatimes.com/rssfeeds/maharashtra.cms", lang: "hi", priority: true, categories: ["national"], state: "maharashtra" },
  { name: "Maharashtra Times", url: "https://maharashtratimes.com/rssfeeds/4719148.cms", lang: "mr", categories: ["national"], state: "maharashtra" },
  { name: "Times of India Mumbai", url: "https://timesofindia.indiatimes.com/rssfeeds/1221656.cms", lang: "en", categories: ["national"], state: "maharashtra" },
  { name: "Lokmat Maharashtra", url: "https://www.lokmat.com/rss/maharashtra.xml", lang: "mr", categories: ["national"], state: "maharashtra" },

  // Punjab
  { name: "Amar Ujala Punjab", url: "https://www.amarujala.com/rss/punjab.xml", lang: "hi", priority: true, categories: ["national"], state: "punjab" },
  { name: "Jagran Punjab", url: "https://www.jagran.com/rss/punjab.xml", lang: "hi", categories: ["national"], state: "punjab" },
  { name: "Live Hindustan Punjab", url: "https://www.livehindustan.com/rss/punjab.xml", lang: "hi", categories: ["national"], state: "punjab" },
  { name: "Punjab Kesari Punjab", url: "https://www.punjabkesari.in/rss/punjab-news.xml", lang: "hi", categories: ["national"], state: "punjab" },

  // Haryana
  { name: "Amar Ujala Haryana", url: "https://www.amarujala.com/rss/haryana.xml", lang: "hi", priority: true, categories: ["national"], state: "haryana" },
  { name: "Jagran Haryana", url: "https://www.jagran.com/rss/haryana.xml", lang: "hi", categories: ["national"], state: "haryana" },
  { name: "Live Hindustan Haryana", url: "https://www.livehindustan.com/rss/haryana.xml", lang: "hi", categories: ["national"], state: "haryana" },
  { name: "Dainik Bhaskar Haryana", url: "https://www.bhaskar.com/rss-feed/1070/", lang: "hi", categories: ["national"], state: "haryana" },
  { name: "Punjab Kesari Haryana", url: "https://www.punjabkesari.in/rss/haryana-news.xml", lang: "hi", categories: ["national"], state: "haryana" },

  // Himachal Pradesh
  { name: "Amar Ujala HP", url: "https://www.amarujala.com/rss/himachal-pradesh.xml", lang: "hi", priority: true, categories: ["national"], state: "himachal-pradesh" },
  { name: "Jagran HP", url: "https://www.jagran.com/rss/himachal-pradesh.xml", lang: "hi", categories: ["national"], state: "himachal-pradesh" },
  { name: "Live Hindustan HP", url: "https://www.livehindustan.com/rss/himachal-pradesh.xml", lang: "hi", categories: ["national"], state: "himachal-pradesh" },
  { name: "Divya Himachal", url: "https://www.divyahimachal.com/feed/", lang: "hi", categories: ["national"], state: "himachal-pradesh" },

  // Jammu & Kashmir / Ladakh
  { name: "Amar Ujala JK", url: "https://www.amarujala.com/rss/jammu-kashmir.xml", lang: "hi", priority: true, categories: ["national"], state: "jammu-kashmir" },
  { name: "Jagran JK", url: "https://www.jagran.com/rss/jammu-kashmir.xml", lang: "hi", categories: ["national"], state: "jammu-kashmir" },
  { name: "Greater Kashmir", url: "https://www.greaterkashmir.com/feed/", lang: "en", categories: ["national"], state: "jammu-kashmir" },
  { name: "Kashmir Observer", url: "https://kashmirobserver.net/feed/", lang: "en", categories: ["national"], state: "jammu-kashmir" },
  { name: "Daily Excelsior JK", url: "https://www.dailyexcelsior.com/feed/", lang: "en", categories: ["national"], state: "jammu-kashmir" },

  // West Bengal
  { name: "Times of India Kolkata", url: "https://timesofindia.indiatimes.com/rssfeeds/4718869.cms", lang: "en", priority: true, categories: ["national"], state: "west-bengal" },
  { name: "Telegraph Kolkata", url: "https://www.telegraphindia.com/feeds/top-stories", lang: "en", categories: ["national"], state: "west-bengal" },
  { name: "Amar Ujala WB", url: "https://www.amarujala.com/rss/west-bengal.xml", lang: "hi", categories: ["national"], state: "west-bengal" },
  { name: "Millennium Post WB", url: "https://www.millenniumpost.in/rss", lang: "en", categories: ["national"], state: "west-bengal" },

  // Karnataka
  { name: "Times of India Bengaluru", url: "https://timesofindia.indiatimes.com/rssfeeds/4719148.cms", lang: "en", priority: true, categories: ["national"], state: "karnataka" },
  { name: "Deccan Herald Karnataka", url: "https://www.deccanherald.com/rss-feed/state", lang: "en", categories: ["national"], state: "karnataka" },
  { name: "The Hindu Karnataka", url: "https://www.thehindu.com/news/national/karnataka/feeder/default.rss", lang: "en", categories: ["national"], state: "karnataka" },
  { name: "Udayavani Karnataka", url: "https://www.udayavani.com/feed/", lang: "kn", categories: ["national"], state: "karnataka" },

  // Kerala
  { name: "Times of India Kerala", url: "https://timesofindia.indiatimes.com/rssfeeds/kerala.cms", lang: "en", priority: true, categories: ["national"], state: "kerala" },
  { name: "The Hindu Kerala", url: "https://www.thehindu.com/news/national/kerala/feeder/default.rss", lang: "en", categories: ["national"], state: "kerala" },
  { name: "Mathrubhumi English", url: "https://english.mathrubhumi.com/rss", lang: "en", categories: ["national"], state: "kerala" },
  { name: "Manorama Online", url: "https://www.onmanorama.com/rss/kerala-news.xml", lang: "en", categories: ["national"], state: "kerala" },

  // Tamil Nadu
  { name: "Times of India Chennai", url: "https://timesofindia.indiatimes.com/rssfeeds/8682.cms", lang: "en", priority: true, categories: ["national"], state: "tamil-nadu" },
  { name: "The Hindu Tamil Nadu", url: "https://www.thehindu.com/news/national/tamil-nadu/feeder/default.rss", lang: "en", categories: ["national"], state: "tamil-nadu" },
  { name: "New Indian Express TN", url: "https://www.newindianexpress.com/states/tamil-nadu/rss", lang: "en", categories: ["national"], state: "tamil-nadu" },

  // Andhra Pradesh
  { name: "The Hindu AP", url: "https://www.thehindu.com/news/national/andhra-pradesh/feeder/default.rss", lang: "en", priority: true, categories: ["national"], state: "andhra-pradesh" },
  { name: "New Indian Express AP", url: "https://www.newindianexpress.com/states/andhra-pradesh/rss", lang: "en", categories: ["national"], state: "andhra-pradesh" },
  { name: "Hans India AP", url: "https://www.thehansindia.com/feed/", lang: "en", categories: ["national"], state: "andhra-pradesh" },

  // Telangana
  { name: "The Hindu Telangana", url: "https://www.thehindu.com/news/national/telangana/feeder/default.rss", lang: "en", priority: true, categories: ["national"], state: "telangana" },
  { name: "Telangana Today", url: "https://telanganatoday.com/feed/", lang: "en", categories: ["national"], state: "telangana" },
  { name: "New Indian Express Telangana", url: "https://www.newindianexpress.com/states/telangana/rss", lang: "en", categories: ["national"], state: "telangana" },

  // Odisha
  { name: "Odisha TV", url: "https://odishatv.in/feed", lang: "en", priority: true, categories: ["national"], state: "odisha" },
  { name: "Sambad Odisha", url: "https://sambad.in/feed/", lang: "or", categories: ["national"], state: "odisha" },
  { name: "Dharitri Odisha", url: "https://www.dharitri.com/feed/", lang: "or", categories: ["national"], state: "odisha" },
  { name: "New Indian Express Odisha", url: "https://www.newindianexpress.com/states/odisha/rss", lang: "en", categories: ["national"], state: "odisha" },

  // Assam
  { name: "Assam Tribune", url: "https://www.assamtribune.com/rss/todays-news.xml", lang: "en", priority: true, categories: ["national"], state: "assam" },
  { name: "Sentinel Assam", url: "https://www.sentinelassam.com/rss.xml", lang: "en", categories: ["national"], state: "assam" },

  // Northeast multi-state (no single state tag — keyword-matched)
  { name: "Northeast Now", url: "https://nenow.in/feed", lang: "en", categories: ["national"] },

  // Nagaland
  { name: "Eastern Mirror Nagaland", url: "https://easternmirrornagaland.com/feed/", lang: "en", categories: ["national"], state: "nagaland" },
  { name: "Morung Express", url: "https://morungexpress.com/feed/", lang: "en", categories: ["national"], state: "nagaland" },

  // Meghalaya
  { name: "Shillong Times", url: "https://www.theshillongtimes.com/feed/", lang: "en", categories: ["national"], state: "meghalaya" },

  // Mizoram
  { name: "Mizoram Chronicle", url: "https://mizoramchronicle.com/feed/", lang: "en", categories: ["national"], state: "mizoram" },

  // Tripura
  { name: "Tripura Chronicle", url: "https://tripurachronicle.in/feed/", lang: "en", categories: ["national"], state: "tripura" },

  // Goa
  { name: "Navhind Times Goa", url: "https://www.navhindtimes.in/feed/", lang: "en", categories: ["national"], state: "goa" },
  { name: "Herald Goa", url: "https://www.heraldgoa.in/feed", lang: "en", categories: ["national"], state: "goa" },
  { name: "Gomantak Times", url: "https://www.gomantak.com/rss", lang: "kok", categories: ["national"], state: "goa" },

  // Technology feeds ──
  {
    name: "Gadgets360",
    url: "https://feeds.feedburner.com/gadgets360-latest",
    lang: "en", priority: true,
    categories: ["technology"]
  },
  {
    name: "NDTV Gadgets",
    url: "https://feeds.feedburner.com/NdtvGadgets-Latest",
    lang: "en", priority: true,
    categories: ["technology"]
  },
  {
    name: "Economic Times Tech",
    url: "https://economictimes.indiatimes.com/tech/rssfeeds/13357270.cms",
    lang: "en", priority: true,
    categories: ["technology"]
  },
  {
    name: "TechCrunch",
    url: "https://techcrunch.com/feed/",
    lang: "en", priority: true,
    categories: ["technology"]
  },
  {
    name: "The Verge",
    url: "https://www.theverge.com/rss/index.xml",
    lang: "en",
    categories: ["technology"]
  },
  {
    name: "Wired",
    url: "https://www.wired.com/feed/rss",
    lang: "en",
    categories: ["technology"]
  },
  {
    name: "Ars Technica",
    url: "https://feeds.arstechnica.com/arstechnica/index",
    lang: "en",
    categories: ["technology"]
  },
  {
    name: "MIT Technology Review",
    url: "https://www.technologyreview.com/feed/",
    lang: "en",
    categories: ["technology"]
  },
  {
    name: "Navbharat Times Tech",
    url: "https://navbharattimes.indiatimes.com/rssfeeds/2239587.cms",
    lang: "hi",
    categories: ["technology"]
  },
  {
    name: "Amar Ujala Tech",
    url: "https://www.amarujala.com/rss/technology.xml",
    lang: "hi", priority: true,
    categories: ["technology"]
  },
  {
    name: "Jagran Tech",
    url: "https://www.jagran.com/rss/technology.xml",
    lang: "hi", priority: true,
    categories: ["technology"]
  },
  {
    name: "Live Hindustan Tech",
    url: "https://www.livehindustan.com/rss/technology.xml",
    lang: "hi",
    categories: ["technology"]
  },

  // ── Health feeds ──
  {
    name: "WHO News",
    url: "https://www.who.int/rss-feeds/news-english.xml",
    lang: "en", priority: true,
    categories: ["health"]
  },
  {
    name: "ICMR News",
    url: "https://main.icmr.nic.in/sites/default/files/icmr_news.xml",
    lang: "en",
    categories: ["health"]
  },
  {
    name: "Health Ministry India",
    url: "https://mohfw.gov.in/rss.xml",
    lang: "en",
    categories: ["health"]
  },
  {
    name: "Dainik Jagran Health",
    url: "https://www.jagran.com/rss/health.xml",
    lang: "hi", priority: true,
    categories: ["health"]
  },
  {
    name: "Amar Ujala Health",
    url: "https://www.amarujala.com/rss/health.xml",
    lang: "hi", priority: true,
    categories: ["health"]
  },
  {
    name: "NDTV Health",
    url: "https://feeds.feedburner.com/ndtv/health",
    lang: "en",
    categories: ["health"]
  },
  {
    name: "Times of India Health",
    url: "https://timesofindia.indiatimes.com/rss/feeds/health-news.cms",
    lang: "en",
    categories: ["health"]
  },

  // ── Jobs / Employment feeds (Priority) ──
  {
    name: "Employment News",
    url: "https://www.employmentnews.gov.in/rss/en/notification.xml",
    lang: "en", priority: true,
    categories: ["jobs"]
  },
  {
    name: "Sarkari Result",
    url: "https://www.sarkariresult.com/news/feed/",
    lang: "hi", priority: true,
    categories: ["jobs"]
  },
  {
    name: "Freshers World",
    url: "https://www.fresherslive.com/rss/jobs",
    lang: "en",
    categories: ["jobs"]
  },
  {
    name: "TimesJobs Blog",
    url: "https://content.timesjobs.com/category/jobs-careers/feed/",
    lang: "en",
    categories: ["jobs"]
  },
  {
    name: "Economic Times Jobs",
    url: "https://economictimes.indiatimes.com/jobs/rssfeeds/1098593.cms",
    lang: "en",
    categories: ["jobs"]
  },
  {
    name: "Naukri Blog",
    url: "https://www.naukriblog.com/feed/",
    lang: "en",
    categories: ["jobs"]
  },
  {
    name: "LinkedIn India Blog",
    url: "https://blog.linkedin.com/feed",
    lang: "en",
    categories: ["jobs"]
  },

  // ── Priority feeds (loaded first) ──
  {
    name: "Amar Ujala",
    url: "https://www.amarujala.com/rss/breaking-news.xml",
    lang: "hi", priority: true,
    categories: ["national", "education"]
  },
  {
    name: "Dainik Jagran",
    url: "https://www.jagran.com/rss/news.xml",
    lang: "hi", priority: true,
    categories: ["national", "jobs"]
  },
  {
    name: "Dainik Bhaskar",
    url: "https://www.bhaskar.com/rss-feed/1061/",
    lang: "hi", priority: true,
    categories: ["national", "world"]
  },
  {
    name: "Times of India",
    url: "https://timesofindia.indiatimes.com/rssfeedstopstories.cms",
    lang: "en", priority: true,
    categories: ["national", "world", "technology"]
  },
  {
    name: "NDTV India",
    url: "https://feeds.feedburner.com/ndtvkhabar-latest",
    lang: "hi", priority: true,
    categories: ["national", "world"]
  },
  {
    name: "BBC Hindi",
    url: "https://feeds.bbci.co.uk/hindi/rss.xml",
    lang: "hi", priority: true,
    categories: ["world", "national"]
  },

  // ── Uttarakhand feeds (priority) ──
  {
    name: "Amar Ujala Uttarakhand",
    url: "https://www.amarujala.com/rss/uttarakhand-news.xml",
    lang: "hi", priority: true,
    categories: ["uttarakhand", "national"], state: "uttarakhand"
  },
  {
    name: "Dainik Jagran Uttarakhand",
    url: "https://www.jagran.com/rss/uttarakhand-news.xml",
    lang: "hi", priority: true,
    categories: ["uttarakhand", "national"], state: "uttarakhand"
  },

  // ── Uttarakhand feeds (secondary) ──
  {
    name: "Live Hindustan Uttarakhand",
    url: "https://www.livehindustan.com/rss/uttarakhand.xml",
    lang: "hi",
    categories: ["uttarakhand", "national"], state: "uttarakhand"
  },
  {
    name: "Navbharat Times Uttarakhand",
    url: "https://navbharattimes.indiatimes.com/rssfeeds/4705562.cms",
    lang: "hi",
    categories: ["uttarakhand", "national"], state: "uttarakhand"
  },
  {
    name: "Amar Ujala Dehradun",
    url: "https://www.amarujala.com/rss/dehradun-news.xml",
    lang: "hi",
    categories: ["uttarakhand"], state: "uttarakhand"
  },
  {
    name: "Jagran Dehradun",
    url: "https://www.jagran.com/rss/dehradun-news.xml",
    lang: "hi",
    categories: ["uttarakhand"], state: "uttarakhand"
  },
  {
    name: "Jagran Haridwar",
    url: "https://www.jagran.com/rss/haridwar-news.xml",
    lang: "hi",
    categories: ["uttarakhand"], state: "uttarakhand"
  },
  {
    name: "Amar Ujala Haridwar",
    url: "https://www.amarujala.com/rss/haridwar-news.xml",
    lang: "hi",
    categories: ["uttarakhand"], state: "uttarakhand"
  },
  {
    name: "Bhaskar Uttarakhand",
    url: "https://www.bhaskar.com/rss-feed/1063/",
    lang: "hi",
    categories: ["uttarakhand", "national"], state: "uttarakhand"
  },

  // ── National Hindi ──
  {
    name: "Navbharat Times",
    url: "https://navbharattimes.indiatimes.com/rssfeeds/1081479906.cms",
    lang: "hi",
    categories: ["national", "world"]
  },
  {
    name: "Aaj Tak",
    url: "https://aajtak.intoday.in/rssfeeds/2127546909.cms",
    lang: "hi",
    categories: ["national", "world"]
  },
  {
    name: "Zee News Hindi",
    url: "https://zeenews.india.com/hindi/india/feed",
    lang: "hi",
    categories: ["national", "world"]
  },
  {
    name: "ABP Live",
    url: "https://news.abplive.com/news/india/feed",
    lang: "hi",
    categories: ["national", "world"]
  },
  {
    name: "Jagran National",
    url: "https://www.jagran.com/rss/national.xml",
    lang: "hi",
    categories: ["national"]
  },
  {
    name: "Live Hindustan",
    url: "https://www.livehindustan.com/rss/national.xml",
    lang: "hi",
    categories: ["national", "education", "jobs"]
  },
  {
    name: "DW Hindi",
    url: "https://rss.dw.com/rdf/rss-hindi-all",
    lang: "hi",
    categories: ["world", "national"]
  },
  {
    name: "Punjab Kesari",
    url: "https://www.punjabkesari.in/rss/top-news.xml",
    lang: "hi",
    categories: ["national"]
  },
  {
    name: "Patrika",
    url: "https://www.patrika.com/rss/national-news.xml",
    lang: "hi",
    categories: ["national"]
  },
  {
    name: "Jansatta",
    url: "https://www.jansatta.com/feed/",
    lang: "hi",
    categories: ["national"]
  },
  {
    name: "Nai Dunia",
    url: "https://www.naidunia.com/rss/national",
    lang: "hi",
    categories: ["national"]
  },
  {
    name: "Prabhat Khabar",
    url: "https://www.prabhatkhabar.com/rss/national",
    lang: "hi",
    categories: ["national"]
  },
  {
    name: "Haribhoomi",
    url: "https://www.haribhoomi.com/rss/national.xml",
    lang: "hi",
    categories: ["national"]
  },
  {
    name: "India TV Hindi",
    url: "https://www.indiatvnews.com/rssnews/india_news.xml",
    lang: "hi",
    categories: ["national"]
  },
  {
    name: "News18 Hindi",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/network/get-news.json?rss=true",
    lang: "hi",
    categories: ["national"]
  },
  {
    name: "Divya Bhaskar",
    url: "https://www.divyabhaskar.co.in/rss-feed/1061/",
    lang: "hi",
    categories: ["national"]
  },

  // ── National English ──
  {
    name: "The Hindu",
    url: "https://www.thehindu.com/feeder/default.rss",
    lang: "en",
    categories: ["national", "world", "technology", "education"]
  },
  {
    name: "Hindustan Times",
    url: "https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml",
    lang: "en",
    categories: ["national", "world"]
  },
  {
    name: "NDTV Top Stories",
    url: "https://feeds.feedburner.com/ndtvnews-top-stories",
    lang: "en",
    categories: ["national", "world"]
  },
  {
    name: "India Today",
    url: "https://www.indiatoday.in/rss/1206550",
    lang: "en",
    categories: ["national", "world", "technology"]
  },
  {
    name: "Economic Times",
    url: "https://economictimes.indiatimes.com/rssfeedstopstories.cms",
    lang: "en",
    categories: ["national", "technology", "education"]
  },
  {
    name: "The Print",
    url: "https://theprint.in/feed/",
    lang: "en",
    categories: ["national"]
  },
  {
    name: "Scroll",
    url: "https://scroll.in/rss",
    lang: "en",
    categories: ["national", "world"]
  },
  {
    name: "Firstpost",
    url: "https://www.firstpost.com/rss/home.xml",
    lang: "en",
    categories: ["national", "world"]
  },
  {
    name: "The Wire",
    url: "https://thewire.in/feed",
    lang: "en",
    categories: ["national"]
  },
  {
    name: "News18 English",
    url: "https://www.news18.com/rss/india.xml",
    lang: "en",
    categories: ["national"]
  },
  {
    name: "Deccan Herald",
    url: "https://www.deccanherald.com/rss-feed/national",
    lang: "en",
    categories: ["national"]
  },
  {
    name: "Tribune India",
    url: "https://www.tribuneindia.com/rss/feed",
    lang: "en",
    categories: ["national"]
  },

  // ── International — Global ──
  {
    name: "BBC World",
    url: "https://feeds.bbci.co.uk/news/world/rss.xml",
    lang: "en", priority: true,
    categories: ["world"]
  },
  {
    name: "Al Jazeera",
    url: "https://www.aljazeera.com/xml/rss/all.xml",
    lang: "en", priority: true,
    categories: ["world"]
  },
  {
    name: "Reuters World",
    url: "https://feeds.reuters.com/reuters/worldNews",
    lang: "en", priority: true,
    categories: ["world"]
  },
  {
    name: "DW World English",
    url: "https://rss.dw.com/rdf/rss-en-world",
    lang: "en", priority: true,
    categories: ["world"]
  },
  {
    name: "BBC Hindi World",
    url: "https://feeds.bbci.co.uk/hindi/world/rss.xml",
    lang: "hi", priority: true,
    categories: ["world"]
  },
  {
    name: "France 24 English",
    url: "https://www.france24.com/en/rss",
    lang: "en",
    categories: ["world"]
  },
  {
    name: "Euronews",
    url: "https://feeds.feedburner.com/euronews/en/home/",
    lang: "en",
    categories: ["world"]
  },

  // ── International — America ──
  {
    name: "BBC US & Canada",
    url: "https://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml",
    lang: "en",
    categories: ["world"]
  },
  {
    name: "NPR News",
    url: "https://feeds.npr.org/1001/rss.xml",
    lang: "en",
    categories: ["world"]
  },
  {
    name: "VOA News",
    url: "https://www.voanews.com/api/zqiovmitmv",
    lang: "en",
    categories: ["world"]
  },

  // ── International — Asia & Pacific ──
  {
    name: "BBC Asia",
    url: "https://feeds.bbci.co.uk/news/world/asia/rss.xml",
    lang: "en",
    categories: ["world"]
  },
  {
    name: "South China Morning Post",
    url: "https://www.scmp.com/rss/5/feed",
    lang: "en",
    categories: ["world"]
  },
  {
    name: "Straits Times Asia",
    url: "https://www.straitstimes.com/news/asia/rss.xml",
    lang: "en",
    categories: ["world"]
  },

  // ── International — Pakistan ──
  {
    name: "Dawn Pakistan",
    url: "https://www.dawn.com/feeds/home",
    lang: "en",
    categories: ["world"]
  },
  {
    name: "Geo News",
    url: "https://www.geo.tv/rss/home",
    lang: "en",
    categories: ["world"]
  },
  {
    name: "The News International",
    url: "https://www.thenews.com.pk/rss/1/1",
    lang: "en",
    categories: ["world"]
  },

  // ── International — Middle East ──
  {
    name: "BBC Middle East",
    url: "https://feeds.bbci.co.uk/news/world/middle_east/rss.xml",
    lang: "en",
    categories: ["world"]
  },
  {
    name: "Arab News",
    url: "https://www.arabnews.com/rss.xml",
    lang: "en",
    categories: ["world"]
  },
  {
    name: "Jerusalem Post",
    url: "https://www.jpost.com/Rss/RssFeedsHeadlines.aspx",
    lang: "en",
    categories: ["world"]
  },

  // ── International — Europe & Russia ──
  {
    name: "BBC Europe",
    url: "https://feeds.bbci.co.uk/news/world/europe/rss.xml",
    lang: "en",
    categories: ["world"]
  },
  {
    name: "Kyiv Independent",
    url: "https://kyivindependent.com/feed/",
    lang: "en",
    categories: ["world"]
  },
  {
    name: "DW Europe",
    url: "https://rss.dw.com/rdf/rss-en-eu",
    lang: "en",
    categories: ["world"]
  },

  // ── International — South Asia ──
  {
    name: "Kathmandu Post",
    url: "https://kathmandupost.com/feed",
    lang: "en",
    categories: ["world"]
  },
  {
    name: "Daily Star Bangladesh",
    url: "https://www.thedailystar.net/frontpage/rss.xml",
    lang: "en",
    categories: ["world"]
  },
  {
    name: "Colombo Gazette",
    url: "https://colombogazette.com/feed/",
    lang: "en",
    categories: ["world"]
  },

  // ── International — Economy ──
  {
    name: "Reuters Business",
    url: "https://feeds.reuters.com/reuters/businessNews",
    lang: "en",
    categories: ["world"]
  },
  {
    name: "DW Business",
    url: "https://rss.dw.com/rdf/rss-en-business",
    lang: "en",
    categories: ["world"]
  },

  // ── International — Science & Climate ──
  {
    name: "BBC Science & Environment",
    url: "https://feeds.bbci.co.uk/news/science_and_environment/rss.xml",
    lang: "en",
    categories: ["world"]
  },
  {
    name: "NASA Breaking News",
    url: "https://www.nasa.gov/rss/dyn/breaking_news.rss",
    lang: "en",
    categories: ["world"]
  },
  {
    name: "DW Science",
    url: "https://rss.dw.com/rdf/rss-en-science",
    lang: "en",
    categories: ["world"]
  },
];

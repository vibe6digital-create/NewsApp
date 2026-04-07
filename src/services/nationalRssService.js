const NATIONAL_FEEDS = [
  { name:'Dainik Jagran',   url:'https://www.jagran.com/rss/news.xml',                                          lang:'hi' },
  { name:'Dainik Bhaskar',  url:'https://www.bhaskar.com/rss-feed/1061/',                                       lang:'hi' },
  { name:'Amar Ujala',      url:'https://www.amarujala.com/rss/breaking-news.xml',                              lang:'hi' },
  { name:'The Hindu',       url:'https://www.thehindu.com/feeder/default.rss',                                  lang:'en' },
  { name:'Hindustan Times', url:'https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml',              lang:'en' },
  { name:'Times of India',  url:'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',                   lang:'en' },
];

const CACHE_KEY = 'national_rss_cache';
const CACHE_DURATION = 30 * 60 * 1000;

function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return (tmp.textContent || tmp.innerText || '').trim().slice(0, 140);
}

function extractImage(item, descHtml) {
  const enclosure = item.querySelector('enclosure');
  if (enclosure && enclosure.getAttribute('url')) return enclosure.getAttribute('url');
  const media = item.querySelector('content');
  if (media && media.getAttribute('url')) return media.getAttribute('url');
  const tmp = document.createElement('div');
  tmp.innerHTML = descHtml;
  const img = tmp.querySelector('img');
  if (img && img.src) return img.src;
  return '/placeholder.jpg';
}

async function fetchFeed(feed) {
  try {
    const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(feed.url)}`);
    const json = await res.json();
    const parser = new DOMParser();
    const xml = parser.parseFromString(json.contents, 'text/xml');
    const items = Array.from(xml.querySelectorAll('item'));
    return items.map(item => {
      const title   = item.querySelector('title')?.textContent?.trim() || '';
      const descRaw = item.querySelector('description')?.textContent || '';
      const summary = stripHtml(descRaw);
      const link    = item.querySelector('link')?.textContent?.trim() || '';
      const pubDate = item.querySelector('pubDate')?.textContent?.trim() || new Date().toISOString();
      const image   = extractImage(item, descRaw);
      const id      = btoa(encodeURIComponent(link)).slice(0, 16);
      return { id, title, summary, image, link, pubDate, source: feed.name, lang: feed.lang, category: 'national' };
    });
  } catch (err) {
    console.warn(`Feed failed: ${feed.name}`, err);
    return [];
  }
}

export async function fetchNationalFeeds() {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { timestamp, data } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) return data;
    }
  } catch {}

  const results = await Promise.allSettled(NATIONAL_FEEDS.map(fetchFeed));
  const articles = results.flatMap(r => r.status === 'fulfilled' ? r.value : []);

  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: articles }));
  } catch {}

  return articles;
}

export const SUBSECTION_KEYWORDS = {
  politics:       [
    'politics','political','party','minister','government','BJP','Congress','AAP','Modi','opposition',
    'नेता','राजनीति','सरकार','राजनीतिक','मंत्री','प्रधानमंत्री','मुख्यमंत्री','विपक्ष','पार्टी','नीति',
    'राज्यपाल','कैबिनेट','सत्ता','शासन','नेतृत्व',
  ],
  parliament:     [
    'parliament','lok sabha','rajya sabha','session','bill','amendment','legislation','speaker',
    'संसद','विधेयक','लोकसभा','राज्यसभा','सांसद','अधिवेशन','संसदीय','विधानसभा','विधायक',
  ],
  economy:        [
    'economy','GDP','budget','RBI','inflation','market','rupee','finance','trade','investment','tax',
    'अर्थव्यवस्था','बजट','रुपया','बाजार','निवेश','महंगाई','टैक्स','जीडीपी','वित्त','कर','मुद्रास्फीति',
    'शेयर','बैंक','ब्याज','लोन','ऋण',
  ],
  defence:        [
    'defence','army','military','ISRO','air force','navy','border','soldier','security','weapon',
    'सेना','रक्षा','सैनिक','सीमा','वायुसेना','नौसेना','हथियार','सुरक्षा','जवान','युद्ध','इसरो',
  ],
  education:      [
    'education','school','college','university','NEET','JEE','UGC','admission','scholarship','exam',
    'शिक्षा','विद्यालय','विश्वविद्यालय','परीक्षा','छात्र','पाठ्यक्रम','प्रवेश','छात्रवृत्ति','शिक्षक',
  ],
  health:         [
    'health','hospital','disease','medicine','WHO','COVID','vaccine','doctor','treatment','patient',
    'स्वास्थ्य','अस्पताल','बीमारी','दवा','डॉक्टर','वैक्सीन','इलाज','मरीज','चिकित्सा','योग',
  ],
  infrastructure: [
    'infrastructure','highway','railway','metro','airport','smart city','road','bridge','construction',
    'सड़क','रेलवे','मेट्रो','हाईवे','एयरपोर्ट','निर्माण','पुल','बुनियादी','परियोजना','विकास कार्य',
  ],
  laworder:       [
    'court','crime','police','FIR','arrest','verdict','law','CBI','ED','supreme court','high court',
    'अदालत','पुलिस','अपराध','गिरफ्तार','फैसला','कानून','सीबीआई','जांच','न्याय','न्यायालय','मुकदमा',
  ],
  schemes:        [
    'yojana','scheme','welfare','subsidy','ration','PM','launch','announce',
    'योजना','लाभ','सरकारी','सब्सिडी','घोषणा','राशन','पेंशन','भत्ता','मुफ्त','लाभार्थी',
  ],
  agriculture:    [
    'farmer','agriculture','MSP','crop','kisan','irrigation','drought','food','harvest',
    'किसान','खेती','फसल','कृषि','सिंचाई','खाद','बाढ़','अनाज','दाल','गेहूं','धान',
  ],
  environment:    [
    'environment','climate','pollution','air quality','AQI','forest','flood','earthquake','disaster',
    'पर्यावरण','प्रदूषण','जलवायु','बाढ़','भूकंप','आपदा','जंगल','तूफान','बादल','वायु',
  ],
  sports:         [
    'cricket','IPL','hockey','Olympics','athlete','medal','tournament','match','team',
    'क्रिकेट','खेल','मैच','टूर्नामेंट','मेडल','खिलाड़ी','आईपीएल','विजय','हार','जीत',
  ],
  factcheck:      [
    'fake','fact check','misleading','false claim','viral','rumour','hoax',
    'झूठ','सच','फेक','वायरल','भ्रामक','अफवाह','फैक्ट चेक',
  ],
  photo:          [
    'photo','gallery','images','pictures','visual',
    'तस्वीर','फोटो','गैलरी','तस्वीरें',
  ],
  opinion:        [
    'opinion','editorial','analysis','column','perspective','commentary','expert',
    'विश्लेषण','राय','संपादकीय','नजरिया','टिप्पणी','समीक्षा',
  ],
  election:       [
    'election','poll','vote','candidate','EVM','constituency','ballot','campaign',
    'चुनाव','मतदान','प्रत्याशी','उम्मीदवार','वोट','मतगणना','चुनावी','जीत','हार',
  ],
};

export function filterBySubsection(articles, subsection) {
  const keywords = SUBSECTION_KEYWORDS[subsection] || [];
  return articles.filter(a =>
    keywords.some(kw =>
      (a.title + ' ' + a.summary).toLowerCase().includes(kw.toLowerCase())
    )
  ).slice(0, 10);
}

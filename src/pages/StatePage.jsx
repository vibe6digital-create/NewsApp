import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useNews } from '../context/NewsContext';
import { useLang } from '../context/LanguageContext';
import NewsCard from '../components/news/NewsCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { PORTAL_NAME } from '../utils/constants';

export const STATES_CONFIG = [
  // ── States ──────────────────────────────────────────────────────────────
  { slug: 'andhra-pradesh',      labelHi: 'आंध्र प्रदेश',      labelEn: 'Andhra Pradesh',      emoji: '🌾', type: 'state',
    keywords: ['andhra pradesh','visakhapatnam','vijayawada','amaravati','tirupati','आंध्र प्रदेश','विशाखापत्तनम','विजयवाड़ा'] },
  { slug: 'arunachal-pradesh',   labelHi: 'अरुणाचल प्रदेश',    labelEn: 'Arunachal Pradesh',   emoji: '🏔️', type: 'state',
    keywords: ['arunachal','itanagar','अरुणाचल','ईटानगर'] },
  { slug: 'assam',               labelHi: 'असम',                labelEn: 'Assam',               emoji: '🍵', type: 'state',
    keywords: ['assam','guwahati','dispur','silchar','असम','गुवाहाटी','डिसपुर'] },
  { slug: 'bihar',               labelHi: 'बिहार',              labelEn: 'Bihar',               emoji: '🏺', type: 'state',
    keywords: ['bihar','patna','gaya','muzaffarpur','bhagalpur','बिहार','पटना','गया','मुजफ्फरपुर'] },
  { slug: 'chhattisgarh',        labelHi: 'छत्तीसगढ़',           labelEn: 'Chhattisgarh',        emoji: '🌿', type: 'state',
    keywords: ['chhattisgarh','raipur','bhilai','bilaspur','छत्तीसगढ़','रायपुर','भिलाई'] },
  { slug: 'goa',                 labelHi: 'गोवा',               labelEn: 'Goa',                 emoji: '🏖️', type: 'state',
    keywords: ['goa','panaji','vasco','margao','गोवा','पणजी'] },
  { slug: 'gujarat',             labelHi: 'गुजरात',             labelEn: 'Gujarat',             emoji: '🦁', type: 'state',
    keywords: ['gujarat','ahmedabad','surat','vadodara','rajkot','gandhinagar','गुजरात','अहमदाबाद','सूरत','वडोदरा'] },
  { slug: 'haryana',             labelHi: 'हरियाणा',            labelEn: 'Haryana',             emoji: '🌾', type: 'state',
    keywords: ['haryana','gurugram','faridabad','chandigarh','hisar','karnal','हरियाणा','गुरुग्राम','फरीदाबाद','चंडीगढ़'] },
  { slug: 'himachal-pradesh',    labelHi: 'हिमाचल प्रदेश',      labelEn: 'Himachal Pradesh',    emoji: '⛰️', type: 'state',
    keywords: ['himachal','shimla','manali','dharamshala','kullu','हिमाचल','शिमला','मनाली','धर्मशाला'] },
  { slug: 'jharkhand',           labelHi: 'झारखंड',             labelEn: 'Jharkhand',           emoji: '⛏️', type: 'state',
    keywords: ['jharkhand','ranchi','jamshedpur','dhanbad','बोकारो','झारखंड','रांची','जमशेदपुर','धनबाद'] },
  { slug: 'karnataka',           labelHi: 'कर्नाटक',            labelEn: 'Karnataka',           emoji: '🏛️', type: 'state',
    keywords: ['karnataka','bengaluru','bangalore','mysuru','mysore','hubli','mangalore','कर्नाटक','बेंगलुरु','मैसूर'] },
  { slug: 'kerala',              labelHi: 'केरल',               labelEn: 'Kerala',              emoji: '🌴', type: 'state',
    keywords: ['kerala','kochi','thiruvananthapuram','kozhikode','thrissur','केरल','कोच्चि','तिरुवनंतपुरम'] },
  { slug: 'madhya-pradesh',      labelHi: 'मध्य प्रदेश',        labelEn: 'Madhya Pradesh',      emoji: '🐯', type: 'state',
    keywords: ['madhya pradesh','bhopal','indore','gwalior','jabalpur','ujjain','मध्य प्रदेश','भोपाल','इंदौर','ग्वालियर'] },
  { slug: 'maharashtra',         labelHi: 'महाराष्ट्र',          labelEn: 'Maharashtra',         emoji: '🌊', type: 'state',
    keywords: ['maharashtra','mumbai','pune','nagpur','nashik','thane','aurangabad','महाराष्ट्र','मुंबई','पुणे','नागपुर'] },
  { slug: 'manipur',             labelHi: 'मणिपुर',             labelEn: 'Manipur',             emoji: '🌺', type: 'state',
    keywords: ['manipur','imphal','मणिपुर','इंफाल'] },
  { slug: 'meghalaya',           labelHi: 'मेघालय',             labelEn: 'Meghalaya',           emoji: '☁️', type: 'state',
    keywords: ['meghalaya','shillong','cherrapunji','मेघालय','शिलांग'] },
  { slug: 'mizoram',             labelHi: 'मिजोरम',             labelEn: 'Mizoram',             emoji: '🌿', type: 'state',
    keywords: ['mizoram','aizawl','मिजोरम','आइजोल'] },
  { slug: 'nagaland',            labelHi: 'नागालैंड',           labelEn: 'Nagaland',            emoji: '🦅', type: 'state',
    keywords: ['nagaland','kohima','dimapur','नागालैंड','कोहिमा'] },
  { slug: 'odisha',              labelHi: 'ओडिशा',              labelEn: 'Odisha',              emoji: '🏛️', type: 'state',
    keywords: ['odisha','bhubaneswar','puri','cuttack','rourkela','ओडिशा','भुवनेश्वर','पुरी','कटक'] },
  { slug: 'punjab',              labelHi: 'पंजाब',              labelEn: 'Punjab',              emoji: '🌾', type: 'state',
    keywords: ['punjab','amritsar','ludhiana','chandigarh','jalandhar','पंजाब','अमृतसर','लुधियाना','जालंधर'] },
  { slug: 'rajasthan',           labelHi: 'राजस्थान',           labelEn: 'Rajasthan',           emoji: '🏜️', type: 'state',
    keywords: ['rajasthan','jaipur','jodhpur','udaipur','kota','ajmer','राजस्थान','जयपुर','जोधपुर','उदयपुर'] },
  { slug: 'sikkim',              labelHi: 'सिक्किम',            labelEn: 'Sikkim',              emoji: '🏔️', type: 'state',
    keywords: ['sikkim','gangtok','सिक्किम','गंगटोक'] },
  { slug: 'tamil-nadu',          labelHi: 'तमिलनाडु',           labelEn: 'Tamil Nadu',          emoji: '🏛️', type: 'state',
    keywords: ['tamil nadu','tamilnadu','chennai','coimbatore','madurai','salem','तमिलनाडु','चेन्नई','कोयम्बटूर'] },
  { slug: 'telangana',           labelHi: 'तेलंगाना',           labelEn: 'Telangana',           emoji: '💎', type: 'state',
    keywords: ['telangana','hyderabad','warangal','nizamabad','तेलंगाना','हैदराबाद','वारंगल'] },
  { slug: 'tripura',             labelHi: 'त्रिपुरा',            labelEn: 'Tripura',             emoji: '🌺', type: 'state',
    keywords: ['tripura','agartala','त्रिपुरा','अगरतला'] },
  { slug: 'uttar-pradesh',       labelHi: 'उत्तर प्रदेश',       labelEn: 'Uttar Pradesh',       emoji: '🕌', type: 'state',
    keywords: ['uttar pradesh','lucknow','agra','varanasi','kanpur','allahabad','prayagraj','ayodhya','up board','उत्तर प्रदेश','लखनऊ','आगरा','वाराणसी','अयोध्या','कानपुर'] },
  { slug: 'uttarakhand',         labelHi: 'उत्तराखंड',          labelEn: 'Uttarakhand',         emoji: '', type: 'state',
    keywords: ['uttarakhand','dehradun','haridwar','rishikesh','nainital','mussoorie','kedarnath','badrinath','उत्तराखंड','देहरादून','हरिद्वार','ऋषिकेश','नैनीताल'] },
  { slug: 'west-bengal',         labelHi: 'पश्चिम बंगाल',       labelEn: 'West Bengal',         emoji: '🐯', type: 'state',
    keywords: ['west bengal','kolkata','howrah','darjeeling','siliguri','पश्चिम बंगाल','कोलकाता','हावड़ा','दार्जिलिंग'] },
  { slug: 'jammu-kashmir',       labelHi: 'जम्मू और कश्मीर',    labelEn: 'Jammu & Kashmir',     emoji: '❄️', type: 'state',
    keywords: ['jammu','kashmir','srinagar','श्रीनगर','जम्मू','कश्मीर','अनंतनाग','पुलवामा'] },

  // ── Union Territories ────────────────────────────────────────────────────
  { slug: 'delhi',               labelHi: 'दिल्ली',             labelEn: 'Delhi',               emoji: '🏛️', type: 'ut',
    keywords: ['delhi','new delhi','दिल्ली','एनसीआर','ncr','noida','gurgaon','gurugram'] },
  { slug: 'chandigarh',          labelHi: 'चंडीगढ़',            labelEn: 'Chandigarh',          emoji: '🌹', type: 'ut',
    keywords: ['chandigarh','चंडीगढ़'] },
  { slug: 'puducherry',          labelHi: 'पुडुचेरी',           labelEn: 'Puducherry',          emoji: '🌊', type: 'ut',
    keywords: ['puducherry','pondicherry','पुडुचेरी','पांडिचेरी'] },
  { slug: 'andaman-nicobar',     labelHi: 'अंडमान और निकोबार',  labelEn: 'Andaman & Nicobar',   emoji: '🏝️', type: 'ut',
    keywords: ['andaman','nicobar','port blair','अंडमान','निकोबार'] },
  { slug: 'ladakh',              labelHi: 'लद्दाख',             labelEn: 'Ladakh',              emoji: '🏔️', type: 'ut',
    keywords: ['ladakh','leh','kargil','लद्दाख','लेह','कारगिल'] },
  { slug: 'lakshadweep',         labelHi: 'लक्षद्वीप',          labelEn: 'Lakshadweep',         emoji: '🏝️', type: 'ut',
    keywords: ['lakshadweep','kavaratti','लक्षद्वीप','कवरत्ती'] },
  { slug: 'dadra-daman-diu',     labelHi: 'दादरा, दमन और दीव',  labelEn: 'Dadra, Daman & Diu',  emoji: '⚓', type: 'ut',
    keywords: ['dadra','daman','diu','silvassa','दादरा','दमन','दीव'] },
];

const matchesState = (a, stateConfig, slug) => {
  // Tier 1: article from a state-dedicated RSS feed
  if (a.stateSlug === slug) return true;
  if (a.stateSlug) return false; // belongs to a different state
  // Tier 2: keyword in title, summary, OR source name
  // (source like "Jagran Delhi", "Amar Ujala Bihar" often contains state name)
  const text = `${a.title || ''} ${a.summary || ''} ${a.source || ''}`.toLowerCase();
  return stateConfig.keywords.some(kw => text.includes(kw.toLowerCase()));
};

const StatePage = () => {
  const { slug } = useParams();
  const { allArticles, rawArticles, loading } = useNews();
  const { lang } = useLang();

  const stateConfig = STATES_CONFIG.find(s => s.slug === slug);

  const articles = useMemo(() => {
    if (!stateConfig) return [];
    const langCode = lang === 'EN' ? 'en' : 'hi';
    // Try language-filtered allArticles first (already language-filtered in context)
    const primary = allArticles.filter(a => matchesState(a, stateConfig, slug));
    if (primary.length > 0) return primary;
    // Fallback: older cached articles, same language
    const cached = rawArticles.filter(a => a.lang === langCode && matchesState(a, stateConfig, slug));
    if (cached.length > 0) return cached;
    // Last resort: ignore language filter (show any language)
    return rawArticles.filter(a => matchesState(a, stateConfig, slug));
  }, [allArticles, rawArticles, stateConfig, slug, lang]);

  if (loading && articles.length === 0) {
    return <div className="container py-4"><LoadingSpinner count={6} /></div>;
  }

  if (!stateConfig) {
    return (
      <div className="container py-5 text-center">
        <h2 style={{ color: '#fff' }}>{lang === 'EN' ? 'State not found' : 'राज्य नहीं मिला'}</h2>
        <Link to="/" className="btn btn-danger mt-3">{lang === 'EN' ? 'Go to Home' : 'होम पर जाएं'}</Link>
      </div>
    );
  }

  const title = lang === 'EN' ? stateConfig.labelEn : stateConfig.labelHi;

  return (
    <>
      <Helmet>
        <title>{title} {lang === 'EN' ? 'News' : 'समाचार'} | {PORTAL_NAME}</title>
      </Helmet>

      <div className="container py-4">
        <div style={{ borderLeft: '4px solid #CC0000', paddingLeft: '16px', marginBottom: '28px' }}>
          <h1 style={{
            fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
            fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0,
          }}>
            {title} {lang === 'EN' ? 'News' : 'समाचार'}
          </h1>
          <p style={{ color: '#888', fontSize: '13px', margin: '4px 0 0' }}>
            {articles.length} {lang === 'EN' ? 'articles found' : 'खबरें मिलीं'}
          </p>
        </div>

        {articles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📰</div>
            <p style={{ fontSize: '16px' }}>
              {lang === 'EN' ? 'No news available for today in this state.' : 'आज इस राज्य की कोई खबर उपलब्ध नहीं है।'}
            </p>
            <Link to="/" className="btn btn-danger mt-3" style={{ borderRadius: '30px' }}>
              {lang === 'EN' ? 'Back to Home' : 'होम पर जाएं'}
            </Link>
          </div>
        ) : (
          <div className="row g-3">
            {articles.map(article => (
              <div className="col-lg-4 col-md-6" key={article.id}>
                <NewsCard article={article} size="md" />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default StatePage;

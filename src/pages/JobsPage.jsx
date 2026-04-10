import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'bootstrap';
import { useNews } from '../context/NewsContext';
import { useLang } from '../context/LanguageContext';
import SubSection from '../components/national/SubSection';
import AdBanner from '../components/layout/AdBanner';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Sidebar from '../components/layout/Sidebar';
import { PORTAL_NAME } from '../utils/constants';
import { getCategoryFallbackImage, SAFE_FALLBACK } from '../utils/categoryImages';
import { timeAgo } from '../utils/formatDate';
import '../styles/hero.css';
import '../styles/national.css';

// ── Job subsection definitions ───────────────────────────────
const JOBS_SUBSECTIONS = [
  {
    key: 'govtjobs',
    label: 'सरकारी नौकरियां',
    labelEn: 'Government Jobs',
    emoji: '🏛️',
    color: '#CC0000',
  },
  {
    key: 'nationalco',
    label: 'राष्ट्रीय बड़ी कंपनियां',
    labelEn: 'National Big Companies',
    emoji: '🏢',
    color: '#2563EB',
  },
  {
    key: 'intljobs',
    label: 'अंतरराष्ट्रीय बड़ी कंपनियां',
    labelEn: 'International Big Companies',
    emoji: '🌐',
    color: '#7C3AED',
  },
  {
    key: 'remote',
    label: 'फ्रीलांस और रिमोट जॉब्स',
    labelEn: 'Freelance & Remote Jobs',
    emoji: '💻',
    color: '#059669',
  },
  {
    key: 'statejobs',
    label: 'राज्य सरकार भर्ती',
    labelEn: 'State Government Recruitment',
    emoji: '🗺️',
    color: '#D97706',
  },
];

// ── Subsection keywords (applied only on already-filtered job articles) ──
const JOBS_KEYWORDS = {
  govtjobs: [
    'SSC CGL', 'SSC MTS', 'SSC CHSL', 'railway recruitment', 'railway bharti',
    'IBPS PO', 'IBPS clerk', 'SBI PO', 'SBI clerk', 'NDA recruitment',
    'CISF recruitment', 'BSF recruitment', 'CRPF recruitment',
    'defence recruitment', 'PSU recruitment', 'government job', 'sarkari naukri',
    'UPSC civil services', 'employment notification',
    'सरकारी नौकरी', 'रेलवे भर्ती', 'बैंक भर्ती', 'सेना भर्ती', 'पुलिस भर्ती',
    'पदों पर भर्ती', 'भर्ती नोटिफिकेशन',
  ],
  nationalco: [
    'TCS hiring', 'TCS recruit', 'Infosys hiring', 'Infosys recruit',
    'Wipro hiring', 'Wipro recruit', 'HCL hiring', 'HCL recruit',
    'Reliance hiring', 'Jio Platforms hiring', 'HDFC Bank hiring',
    'ICICI Bank hiring', 'Flipkart hiring', 'Swiggy hiring', 'Zomato hiring',
    'freshers hiring', 'campus placement', 'campus recruitment', 'IT hiring',
    'फ्रेशर्स हायरिंग', 'कैंपस प्लेसमेंट', 'आईटी हायरिंग',
  ],
  intljobs: [
    'Google hiring', 'Microsoft hiring', 'Amazon hiring', 'Meta hiring',
    'Apple hiring', 'Netflix hiring', 'Tesla hiring', 'IBM hiring',
    'global hiring', 'H-1B visa', 'overseas job', 'international job',
    'गूगल हायरिंग', 'माइक्रोसॉफ्ट हायरिंग', 'अमेज़न हायरिंग',
    'मेटा हायरिंग', 'टेस्ला हायरिंग', 'गीगाफैक्टरी',
  ],
  remote: [
    'Upwork', 'Fiverr', 'freelance job', 'remote job', 'work from home job',
    'LinkedIn Jobs', 'Glassdoor salary', 'Naukri.com',
    'घर से काम', 'फ्रीलांस', 'रिमोट जॉब', 'वर्क फ्रॉम होम',
  ],
  statejobs: [
    'UKPSC', 'UKSSSC', 'UP Police recruitment', 'RPSC', 'MPSC', 'BPSC',
    'state recruitment', 'police recruitment', 'gram vikas', 'lekhpal',
    'उत्तराखंड भर्ती', 'यूपी पुलिस भर्ती', 'ग्राम विकास अधिकारी', 'लेखपाल',
    'राज्य भर्ती', 'पुलिस कांस्टेबल भर्ती',
  ],
};

// Strict top-level job keywords — compound phrases that ONLY appear in job news
const JOB_STRICT_KEYWORDS = [
  // Government recruitment
  'sarkari naukri', 'government job', 'सरकारी नौकरी',
  'recruitment notification', 'recruitment rally', 'recruitment drive',
  'vacancy notification', 'vacancy announced', 'vacancies announced',
  'भर्ती नोटिफिकेशन', 'भर्ती अधिसूचना', 'पदों पर भर्ती', 'पदों की भर्ती',
  'रेलवे भर्ती', 'बैंक भर्ती', 'सेना भर्ती', 'पुलिस भर्ती',
  'SSC CGL', 'SSC MTS', 'SSC CHSL',
  'IBPS PO', 'IBPS clerk', 'SBI PO', 'SBI clerk',
  'railway recruitment', 'UPSC civil services', 'NDA recruitment',
  'CISF recruitment', 'CRPF recruitment', 'BSF recruitment',
  'PSU recruitment', 'defence recruitment', 'employment notification',
  'UKPSC', 'UKSSSC', 'UP Police recruitment', 'RPSC', 'MPSC', 'BPSC',
  // Private company hiring (compound — company + hiring action)
  'TCS hiring', 'TCS recruit', 'Infosys hiring', 'Infosys recruit',
  'Wipro hiring', 'Wipro recruit', 'HCL hiring', 'HCL recruit',
  'freshers hiring', 'campus placement', 'campus recruitment', 'IT hiring',
  // International company hiring (compound)
  'Google hiring', 'Microsoft hiring', 'Amazon hiring', 'Meta hiring',
  'Apple hiring', 'Netflix hiring', 'Tesla hiring', 'IBM hiring',
  'global hiring', 'H-1B visa', 'overseas job', 'international job',
  // Freelance / remote (platform names are distinct enough)
  'Upwork', 'Fiverr', 'freelance job', 'remote job', 'work from home job',
  'LinkedIn Jobs', 'Glassdoor salary', 'Naukri.com',
  // Hindi job terms
  'नौकरी', 'रोजगार समाचार', 'वैकेंसी', 'नियुक्ति',
  'फ्रीलांस', 'रिमोट जॉब', 'घर से काम',
];

function isJobArticle(article) {
  return article.category === 'jobs';
}

// Subsection filter: runs only on already-filtered job articles
function filterByJobSubsection(jobArticles, key) {
  const keywords = JOBS_KEYWORDS[key] || [];
  return jobArticles
    .filter(a =>
      keywords.some(kw =>
        (a.title + ' ' + a.summary).toLowerCase().includes(kw.toLowerCase())
      )
    )
    .slice(0, 12);
}

// ── Hero Slider ───────────────────────────────────────────────
const JobsHeroSlider = ({ slides, lang }) => {
  const navigate = useNavigate();
  const touchStartX = useRef(0);
  const swiping = useRef(false);
  const carouselRef = useRef(null);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; swiping.current = false; };
  const handleTouchMove = (e) => { if (Math.abs(e.touches[0].clientX - touchStartX.current) > 30) swiping.current = true; };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el || Carousel.getInstance(el)) return;
    new Carousel(el);
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <div className="hero-slider" data-aos="fade" style={{ margin: 0, padding: 0 }}>
      <div ref={carouselRef} id="jobsCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="4500">
        <div className="carousel-indicators">
          {slides.map((_, i) => (
            <button key={i} type="button" data-bs-target="#jobsCarousel"
              data-bs-slide-to={i} className={i === 0 ? 'active' : ''}
              aria-current={i === 0 ? 'true' : undefined} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
        <div className="carousel-inner">
          {slides.map((article, i) => {
            const img = article.image || getCategoryFallbackImage('jobs', article.id, article.title, article.summary);
            return (
              <div key={article.id} className={`carousel-item ${i === 0 ? 'active' : ''}`}
                onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}
                onClick={() => { if (!swiping.current) navigate(`/article/${article.id}`); }} style={{ cursor: 'pointer' }}>
                <img src={img} alt={article.title} className="d-block w-100"
                  onError={e => {
                    const fb = getCategoryFallbackImage('jobs', article.id, article.title, article.summary);
                    e.target.src = e.target.src === fb ? SAFE_FALLBACK : fb;
                  }} />
                <div className="hero-overlay" />
                <div className="hero-content">
                  <span className="hero-category" style={{ backgroundColor: '#22C55E' }}>
                    {lang === 'EN' ? 'Jobs' : 'नौकरी'}
                  </span>
                  <h2 className="hero-title">{article.title}</h2>
                  <div className="hero-meta">
                    <span>{timeAgo(article.pubDate, lang.toLowerCase())}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#jobsCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#jobsCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};


// ── Career Portals Data ───────────────────────────────────────
const CAREER_PORTALS = [
  // Indian IT
  { name: 'TCS', url: 'https://ibegin.tcs.com/iBegin/jobs/search', icon: 'fa-solid fa-building', color: '#0046BE', category: 'Indian IT' },
  { name: 'Infosys', url: 'https://career.infosys.com/', icon: 'fa-solid fa-laptop-code', color: '#007CC3', category: 'Indian IT' },
  { name: 'Wipro', url: 'https://careers.wipro.com/', icon: 'fa-solid fa-microchip', color: '#3C1E78', category: 'Indian IT' },
  { name: 'HCL', url: 'https://www.hcltech.com/careers', icon: 'fa-solid fa-server', color: '#0067B1', category: 'Indian IT' },
  { name: 'Tech Mahindra', url: 'https://careers.techmahindra.com/', icon: 'fa-solid fa-network-wired', color: '#E42527', category: 'Indian IT' },
  // Global Tech
  { name: 'Google', url: 'https://careers.google.com/', icon: 'fa-brands fa-google', color: '#4285F4', category: 'Global Tech' },
  { name: 'Microsoft', url: 'https://careers.microsoft.com/', icon: 'fa-brands fa-microsoft', color: '#00A4EF', category: 'Global Tech' },
  { name: 'Amazon', url: 'https://www.amazon.jobs/', icon: 'fa-brands fa-amazon', color: '#FF9900', category: 'Global Tech' },
  { name: 'Meta', url: 'https://www.metacareers.com/', icon: 'fa-brands fa-meta', color: '#0668E1', category: 'Global Tech' },
  { name: 'Apple', url: 'https://jobs.apple.com/', icon: 'fa-brands fa-apple', color: '#555555', category: 'Global Tech' },
  { name: 'Netflix', url: 'https://jobs.netflix.com/', icon: 'fa-solid fa-film', color: '#E50914', category: 'Global Tech' },
  { name: 'Tesla', url: 'https://www.tesla.com/careers', icon: 'fa-solid fa-car', color: '#CC0000', category: 'Global Tech' },
  { name: 'IBM', url: 'https://www.ibm.com/careers', icon: 'fa-solid fa-cube', color: '#0530AD', category: 'Global Tech' },
  // Consulting
  { name: 'EY', url: 'https://www.ey.com/en_in/careers', icon: 'fa-solid fa-chart-line', color: '#FFE600', category: 'Consulting' },
  { name: 'Deloitte', url: 'https://www2.deloitte.com/us/en/careers.html', icon: 'fa-solid fa-briefcase', color: '#86BC25', category: 'Consulting' },
  { name: 'PwC', url: 'https://www.pwc.in/careers.html', icon: 'fa-solid fa-chart-pie', color: '#D04A02', category: 'Consulting' },
  { name: 'KPMG', url: 'https://kpmg.com/in/en/home/careers.html', icon: 'fa-solid fa-scale-balanced', color: '#00338D', category: 'Consulting' },
  { name: 'Accenture', url: 'https://www.accenture.com/in-en/careers', icon: 'fa-solid fa-arrow-trend-up', color: '#A100FF', category: 'Consulting' },
  { name: 'McKinsey', url: 'https://www.mckinsey.com/careers', icon: 'fa-solid fa-lightbulb', color: '#004B87', category: 'Consulting' },
  // Banks & Finance
  { name: 'SBI', url: 'https://sbi.co.in/web/careers', icon: 'fa-solid fa-university', color: '#1A4B8C', category: 'Banks & Finance' },
  { name: 'HDFC Bank', url: 'https://www.hdfcbank.com/personal/useful-links/careers', icon: 'fa-solid fa-landmark', color: '#004C8F', category: 'Banks & Finance' },
  { name: 'ICICI Bank', url: 'https://www.icicicareers.com/', icon: 'fa-solid fa-coins', color: '#F37B20', category: 'Banks & Finance' },
  { name: 'Axis Bank', url: 'https://www.axisbank.com/careers', icon: 'fa-solid fa-piggy-bank', color: '#800020', category: 'Banks & Finance' },
  { name: 'RBI', url: 'https://rbi.org.in/Scripts/Aborecruit.aspx', icon: 'fa-solid fa-building-columns', color: '#003580', category: 'Banks & Finance' },
  // Government
  { name: 'NCS', url: 'https://www.ncs.gov.in/', icon: 'fa-solid fa-flag', color: '#FF6B00', category: 'Government' },
  { name: 'SSC', url: 'https://ssc.gov.in/', icon: 'fa-solid fa-clipboard-list', color: '#1B5E20', category: 'Government' },
  { name: 'UPSC', url: 'https://upsc.gov.in/', icon: 'fa-solid fa-scroll', color: '#0D47A1', category: 'Government' },
  { name: 'Railway Jobs', url: 'https://www.rrbcdg.gov.in/', icon: 'fa-solid fa-train', color: '#D32F2F', category: 'Government' },
  { name: 'Defence Jobs', url: 'https://www.joinindianarmy.nic.in/', icon: 'fa-solid fa-shield-halved', color: '#2E7D32', category: 'Government' },
];

const CAREER_CATEGORIES = ['All', 'Indian IT', 'Global Tech', 'Consulting', 'Banks & Finance', 'Government'];
const INITIAL_SHOW_COUNT = 10;

const CareerPortals = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const filtered = activeCategory === 'All'
    ? CAREER_PORTALS
    : CAREER_PORTALS.filter(p => p.category === activeCategory);

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_SHOW_COUNT);

  return (
    <div className="career-portals" data-aos="fade-up">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 style={{ borderLeft: '4px solid #F59E0B', paddingLeft: 12, margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          <i className="fa-solid fa-briefcase me-2" style={{ color: '#F59E0B' }} />
          {lang === 'EN' ? 'Career Portals' : 'करियर पोर्टल'}
        </h3>
        {filtered.length > INITIAL_SHOW_COUNT && (
          <button
            className="btn btn-sm btn-outline-warning"
            onClick={() => setShowAll(prev => !prev)}
            style={{ fontSize: 13, borderRadius: 20 }}
          >
            {showAll
              ? (lang === 'EN' ? 'Show Less' : 'कम दिखाएं')
              : (lang === 'EN' ? 'See All →' : 'सभी देखें →')}
          </button>
        )}
      </div>

      {/* Category Tabs */}
      <div className="career-category-tabs mb-3">
        {CAREER_CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`career-cat-pill${activeCategory === cat ? ' active' : ''}`}
            onClick={() => { setActiveCategory(cat); setShowAll(false); }}
          >
            {cat === 'All' ? (lang === 'EN' ? 'All' : 'सभी') : cat}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="career-grid">
        {visible.map(portal => (
          <a
            key={portal.name}
            href={portal.url}
            target="_blank"
            rel="noopener noreferrer"
            className="career-card"
            style={{ '--portal-color': portal.color }}
          >
            <div className="career-card-icon" style={{ background: portal.color }}>
              <i className={portal.icon} />
            </div>
            <div className="career-card-info">
              <span className="career-card-name">{portal.name}</span>
              <span className="career-card-action">
                {lang === 'EN' ? 'Careers' : 'करियर'} <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: 10 }} />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────
const JobsPage = () => {
  const { allArticles, loading } = useNews();
  const { lang, t } = useLang();
  const [sortOrder, setSortOrder] = useState('latest');

  // Filter to strictly job-related articles only
  const jobArticles = useMemo(() => {
    let result = allArticles.filter(isJobArticle);
    if (sortOrder === 'oldest') {
      return [...result].sort((a, b) => new Date(a.pubDate) - new Date(b.pubDate));
    }
    return result;
  }, [allArticles, sortOrder]);

  // Build subsection maps — search only within already-filtered job articles
  const subsectionMap = useMemo(() => {
    const map = {};
    JOBS_SUBSECTIONS.forEach(s => {
      map[s.key] = filterByJobSubsection(jobArticles, s.key);
    });
    return map;
  }, [jobArticles]);

  // Latest jobs not captured by subsections
  const latestJobs = useMemo(() => {
    const claimedIds = new Set(Object.values(subsectionMap).flat().map(a => a.id));
    const unclaimed = jobArticles.filter(a => !claimedIds.has(a.id));
    const totalSub = Object.values(subsectionMap).reduce((s, arr) => s + arr.length, 0);
    if (totalSub < 8) return jobArticles.slice(0, 12);
    return unclaimed.slice(0, 12);
  }, [jobArticles, subsectionMap]);

  const heroSlides = jobArticles.filter(a => a.image).slice(0, 5);

  return (
    <>
      <Helmet>
        <title>{lang === 'EN' ? 'Jobs & Recruitment News' : 'नौकरी समाचार'} | {PORTAL_NAME}</title>
        <meta name="description" content="सरकारी नौकरी, UPSC, SSC, Railway, Bank PO, IT कंपनियों की भर्ती, अंतरराष्ट्रीय कंपनियों की वैकेंसी और Upwork, LinkedIn फ्रीलांस जॉब्स की पूरी जानकारी।" />
        <link rel="canonical" href="/category/jobs" />
      </Helmet>

      <div className="container-fluid px-0">

        {/* Hero Slider */}
        <JobsHeroSlider slides={heroSlides} lang={lang} />


        <div className="container my-2">
          <AdBanner size="728x90" index={0} />
        </div>

        {loading ? (
          <div className="container py-2">
            <LoadingSpinner count={6} />
          </div>
        ) : (
          <div className="container py-2">

            {/* Filter row */}
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>
                  {jobArticles.length} {t('articlesFound')}
                </span>
              </div>
              <select
                className="form-select form-select-sm"
                style={{ background: 'var(--input-bg)', color: 'var(--text-primary)', border: '1px solid var(--input-border)', width: 'auto' }}
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value)}
              >
                <option value="latest">{t('sortLatest')}</option>
                <option value="oldest">{t('sortOldest')}</option>
              </select>
            </div>

            <div className="row g-4">
              {/* ── Main Content ── */}
              <div className="col-lg-8">

                {/* Latest Jobs */}
                {latestJobs.length > 0 && (
                  <SubSection
                    subsection={{
                      key: 'latest',
                      label: 'ताज़ा नौकरी खबरें',
                      labelEn: 'Latest Job News',
                      emoji: '🔔',
                      color: '#22C55E',
                    }}
                    articles={latestJobs}
                    lang={lang === 'EN' ? 'en' : 'hi'}
                    aosDelay={0}
                  />
                )}
                {latestJobs.length > 0 && <hr className="section-divider" />}

                {/* Government Jobs */}
                <SubSection
                  subsection={JOBS_SUBSECTIONS[0]}
                  articles={subsectionMap['govtjobs']}
                  lang={lang === 'EN' ? 'en' : 'hi'}
                  aosDelay={80}
                />
                <hr className="section-divider" />

                {/* National Big Companies */}
                <SubSection
                  subsection={JOBS_SUBSECTIONS[1]}
                  articles={subsectionMap['nationalco']}
                  lang={lang === 'EN' ? 'en' : 'hi'}
                  aosDelay={160}
                />
                <hr className="section-divider" />

                <div className="my-3">
                  <AdBanner size="728x90" index={1} />
                </div>

                {/* International Big Companies */}
                <SubSection
                  subsection={JOBS_SUBSECTIONS[2]}
                  articles={subsectionMap['intljobs']}
                  lang={lang === 'EN' ? 'en' : 'hi'}
                  aosDelay={240}
                />
                <hr className="section-divider" />

                {/* Career Portals */}
                <CareerPortals lang={lang} />
                <hr className="section-divider" />

                {/* Freelance & Remote Jobs */}
                <SubSection
                  subsection={JOBS_SUBSECTIONS[3]}
                  articles={subsectionMap['remote']}
                  lang={lang === 'EN' ? 'en' : 'hi'}
                  aosDelay={320}
                />
                <hr className="section-divider" />

                {/* State Government Recruitment */}
                <SubSection
                  subsection={JOBS_SUBSECTIONS[4]}
                  articles={subsectionMap['statejobs']}
                  lang={lang === 'EN' ? 'en' : 'hi'}
                  aosDelay={400}
                />

              </div>

              {/* ── Sidebar ── */}
              <div className="col-lg-4 d-none d-lg-block">
                <Sidebar />
              </div>
            </div>
          </div>
        )}

        <div className="container my-2">
          <AdBanner size="970x90" index={5} />
        </div>
      </div>
    </>
  );
};

export default JobsPage;

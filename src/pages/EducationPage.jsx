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

const EDUCATION_SUBSECTIONS = [
  { key: 'board',       label: 'बोर्ड परीक्षा',        labelEn: 'Board Exams',       emoji: '📝', color: '#3B82F6' },
  { key: 'competitive', label: 'प्रतियोगी परीक्षाएं',   labelEn: 'Competitive Exams', emoji: '🏆', color: '#7C3AED' },
  { key: 'results',     label: 'परिणाम',               labelEn: 'Results',           emoji: '📊', color: '#059669' },
  { key: 'admission',   label: 'प्रवेश / दाखिला',       labelEn: 'Admissions',        emoji: '🎓', color: '#B45309' },
  { key: 'scholarship', label: 'छात्रवृत्ति',            labelEn: 'Scholarships',      emoji: '💰', color: '#D97706' },
  { key: 'university',  label: 'विश्वविद्यालय',          labelEn: 'Universities',      emoji: '🏛️', color: '#DC2626' },
  { key: 'school',      label: 'विद्यालय',              labelEn: 'Schools',           emoji: '🏫', color: '#0891B2' },
  { key: 'edujobs',     label: 'भर्ती / नौकरी',          labelEn: 'Recruitment',       emoji: '💼', color: '#6D28D9' },
];

const EDUCATION_KEYWORDS = {
  board:       [
    'board exam', 'CBSE exam', 'ICSE exam', 'UP board exam', 'board result', 'board परीक्षा',
    'class 10 exam', 'class 12 exam', 'madhyamik exam', 'higher secondary exam',
    'बोर्ड परीक्षा', 'सीबीएसई परीक्षा', 'यूपी बोर्ड परीक्षा', 'बोर्ड परिणाम',
    'हाईस्कूल परीक्षा', 'इंटरमीडिएट परीक्षा', 'दसवीं परीक्षा', 'बारहवीं परीक्षा',
  ],
  competitive: [
    'NEET', 'JEE Main', 'JEE Advanced', 'UPSC', 'SSC CGL', 'SSC CHSL', 'IBPS',
    'NDA exam', 'CDS exam', 'CUET', 'CAT exam', 'GATE exam', 'CLAT exam',
    'civil services exam', 'competitive exam', 'entrance exam',
    'नीट', 'जेईई', 'यूपीएससी', 'एसएससी', 'प्रतियोगी परीक्षा', 'सिविल सेवा परीक्षा', 'प्रवेश परीक्षा',
  ],
  results:     [
    'exam result', 'board result', 'NEET result', 'JEE result', 'UPSC result',
    'merit list', 'scorecard', 'marksheet', 'answer key', 'cut off marks', 'exam toppers',
    'परीक्षा परिणाम', 'बोर्ड परिणाम', 'मेरिट लिस्ट', 'परीक्षा के नतीजे', 'उत्तर कुंजी',
  ],
  admission:   [
    'college admission', 'university admission', 'school admission', 'college counselling',
    'seat allotment', 'college cutoff', 'NEET counselling', 'JEE counselling',
    'application form education', 'college registration',
    'कॉलेज प्रवेश', 'विश्वविद्यालय प्रवेश', 'काउंसलिंग', 'सीट आवंटन', 'कॉलेज कट ऑफ',
    'शिक्षा आवेदन', 'दाखिला प्रक्रिया',
  ],
  scholarship: [
    'scholarship', 'education scholarship', 'student scholarship', 'merit scholarship',
    'PM scholarship', 'national scholarship', 'minority scholarship', 'fellowship', 'stipend',
    'छात्रवृत्ति', 'शिक्षा छात्रवृत्ति', 'पीएम छात्रवृत्ति', 'राष्ट्रीय छात्रवृत्ति', 'फेलोशिप',
  ],
  university:  [
    'IIT ', 'IIM ', 'NIT ', 'BHU ', 'JNU ', 'AMU ', 'Delhi University', 'DU admission',
    'UGC ', 'AICTE', 'university exam', 'university result', 'deemed university',
    'आईआईटी', 'आईआईएम', 'बीएचयू', 'जेएनयू', 'यूजीसी', 'विश्वविद्यालय परीक्षा',
    'विश्वविद्यालय परिणाम', 'दिल्ली विश्वविद्यालय',
  ],
  school:      [
    'kendriya vidyalaya', 'navodaya vidyalaya', 'new school', 'school syllabus',
    'school curriculum', 'school textbook', 'mid day meal', 'school dropout',
    'government school', 'primary school education',
    'केंद्रीय विद्यालय', 'नवोदय विद्यालय', 'स्कूल पाठ्यक्रम', 'पाठ्यपुस्तक', 'मध्याह्न भोजन',
    'सरकारी स्कूल', 'प्राथमिक शिक्षा',
  ],
  edujobs:     [
    'teacher recruitment', 'teacher vacancy', 'CTET', 'TET exam', 'teacher eligibility',
    'lecturer vacancy', 'professor vacancy', 'education department recruitment',
    'शिक्षक भर्ती', 'शिक्षक पद', 'सीटीईटी', 'टीईटी परीक्षा', 'शिक्षक पात्रता',
    'व्याख्याता भर्ती', 'शिक्षा विभाग भर्ती',
  ],
};

function filterByEduSubsection(articles, key) {
  const keywords = EDUCATION_KEYWORDS[key] || [];
  return articles.filter(a =>
    keywords.some(kw => (a.title + ' ' + a.summary).toLowerCase().includes(kw.toLowerCase()))
  ).slice(0, 10);
}

const EducationHeroSlider = ({ slides, lang }) => {
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
      <div ref={carouselRef} id="eduCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
        <div className="carousel-indicators">
          {slides.map((_, i) => (
            <button key={i} type="button" data-bs-target="#eduCarousel"
              data-bs-slide-to={i} className={i === 0 ? 'active' : ''}
              aria-current={i === 0 ? 'true' : undefined} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
        <div className="carousel-inner">
          {slides.map((article, i) => {
            const img = article.image || getCategoryFallbackImage(article.category, article.id, article.title, article.summary);
            return (
              <div key={article.id} className={`carousel-item ${i === 0 ? 'active' : ''}`}
                onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}
                onClick={() => { if (!swiping.current) navigate(`/article/${article.id}`); }} style={{ cursor: 'pointer' }}>
                <img src={img} alt={article.title} className="d-block w-100"
                  onError={e => {
                    const fb = getCategoryFallbackImage(article.category, article.id, article.title, article.summary);
                    e.target.src = e.target.src === fb ? SAFE_FALLBACK : fb;
                  }} />
                <div className="hero-overlay" />
                <div className="hero-content">
                  <span className="hero-category" style={{ backgroundColor: '#3B82F6' }}>
                    {lang === 'EN' ? 'Education' : 'शिक्षा'}
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
        <button className="carousel-control-prev" type="button" data-bs-target="#eduCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#eduCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

const EducationPage = () => {
  const { allArticles, rawArticles, loading } = useNews();
  const { lang, t } = useLang();
  const [sortOrder, setSortOrder] = useState('latest');

  const eduArticles = useMemo(() => {
    let result = allArticles.filter(a => a.category === 'education');
    // Fallback: older education articles (same language) from cache if current fetch has none
    if (result.length === 0) {
      const preferredLang = lang === 'EN' ? 'en' : 'hi';
      result = rawArticles.filter(a => a.category === 'education' && a.lang === preferredLang);
    }
    // Last resort: any language (never show empty)
    if (result.length === 0) result = rawArticles.filter(a => a.category === 'education');
    // Emergency: keyword search across ALL loaded articles when dedicated feeds failed
    if (result.length === 0 && rawArticles.length > 0) {
      const eduKws = ['cbse', 'neet', 'jee', 'board exam', 'scholarship', 'admission',
        'university', 'school result', 'exam result', 'बोर्ड परीक्षा', 'नीट', 'जेईई',
        'परीक्षा परिणाम', 'शिक्षा', 'विद्यालय', 'छात्रवृत्ति', 'upsc result', 'ssc result'];
      result = rawArticles.filter(a =>
        eduKws.some(kw => (a.title + ' ' + (a.summary || '')).toLowerCase().includes(kw))
      ).slice(0, 20);
    }
    if (sortOrder === 'oldest') {
      return [...result].sort((a, b) => new Date(a.pubDate) - new Date(b.pubDate));
    }
    return result;
  }, [allArticles, rawArticles, sortOrder]);

  const filteredMap = useMemo(() => {
    const map = {};
    EDUCATION_SUBSECTIONS.forEach(s => {
      map[s.key] = filterByEduSubsection(eduArticles, s.key);
    });
    return map;
  }, [eduArticles]);

  const latestArticles = useMemo(() => {
    const claimedIds = new Set(Object.values(filteredMap).flat().map(a => a.id));
    const unclaimed = eduArticles.filter(a => !claimedIds.has(a.id));
    const totalSubCount = Object.values(filteredMap).reduce((s, arr) => s + arr.length, 0);
    if (totalSubCount < 10) return eduArticles.slice(0, 12);
    return unclaimed.slice(0, 12);
  }, [eduArticles, filteredMap]);

  return (
    <>
      <Helmet>
        <title>{lang === 'EN' ? 'Education News' : 'शिक्षा समाचार'} | {PORTAL_NAME}</title>
        <meta name="description" content="बोर्ड परीक्षा, NEET, JEE, UPSC, छात्रवृत्ति, विश्वविद्यालय और शिक्षा से जुड़ी सभी ताज़ी खबरें।" />
        <link rel="canonical" href="/category/education" />
      </Helmet>

      <div className="container-fluid px-0">
        <EducationHeroSlider slides={eduArticles.filter(a => a.image).slice(0, 5)} lang={lang} />

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
              <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                {eduArticles.length} {t('articlesFound')}
              </span>
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
              {/* Main content */}
              <div className="col-lg-8">
                {latestArticles.length > 0 && (
                  <SubSection
                    subsection={{ key: 'latest', label: 'ताज़ा शिक्षा खबरें', labelEn: 'Latest Education News', emoji: '📚', color: '#3B82F6' }}
                    articles={latestArticles}
                    lang={lang === 'EN' ? 'en' : 'hi'}
                    aosDelay={0}
                  />
                )}
                {latestArticles.length > 0 && <hr className="section-divider" />}

                {EDUCATION_SUBSECTIONS.map((s, idx) => (
                  <React.Fragment key={s.key}>
                    <SubSection
                      subsection={s}
                      articles={filteredMap[s.key]}
                      lang={lang === 'EN' ? 'en' : 'hi'}
                      aosDelay={idx * 80}
                    />
                    {idx < EDUCATION_SUBSECTIONS.length - 1 && <hr className="section-divider" />}
                    {(idx + 1) % 2 === 0 && (
                      <div className="my-3">
                        <AdBanner size="728x90" index={idx} />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Sidebar */}
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

export default EducationPage;

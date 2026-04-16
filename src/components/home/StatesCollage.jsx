import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNews } from '../../context/NewsContext';
import { useLang } from '../../context/LanguageContext';
import { timeAgo } from '../../utils/formatDate';
import { getCategoryFallbackImage } from '../../utils/categoryImages';
import SectionTitle from '../common/SectionTitle';

const INDIA_STATES = [
  { name: 'दिल्ली',        nameEn: 'Delhi',         emoji: '🏛️', color: '#CC0000',  keywords: ['delhi', 'दिल्ली', 'new delhi', 'नई दिल्ली'] },
  { name: 'उत्तर प्रदेश',  nameEn: 'Uttar Pradesh', emoji: '🕌', color: '#FF6B00',  keywords: ['uttar pradesh', 'lucknow', 'up board', 'उत्तर प्रदेश', 'यूपी'] },
  { name: 'उत्तराखंड',     nameEn: 'Uttarakhand',   emoji: '', color: '#22C55E',  keywords: ['uttarakhand', 'dehradun', 'haridwar', 'उत्तराखंड'] },
  { name: 'मध्य प्रदेश',   nameEn: 'Madhya Pradesh',emoji: '🌿', color: '#16A34A',  keywords: ['madhya pradesh', 'bhopal', 'indore', 'gwalior', 'मध्य प्रदेश', 'म.प्र.'] },
  { name: 'महाराष्ट्र',    nameEn: 'Maharashtra',   emoji: '🏙️', color: '#9333EA',  keywords: ['maharashtra', 'mumbai', 'pune', 'nagpur', 'महाराष्ट्र'] },
  { name: 'राजस्थान',      nameEn: 'Rajasthan',     emoji: '🏰', color: '#F59E0B',  keywords: ['rajasthan', 'jaipur', 'udaipur', 'jodhpur', 'राजस्थान'] },
  { name: 'बिहार',         nameEn: 'Bihar',          emoji: '🏺', color: '#EF4444',  keywords: ['bihar', 'patna', 'बिहार'] },
  { name: 'गुजरात',        nameEn: 'Gujarat',        emoji: '🦁', color: '#06B6D4',  keywords: ['gujarat', 'ahmedabad', 'surat', 'vadodara', 'गुजरात'] },
  { name: 'केरल',          nameEn: 'Kerala',         emoji: '🌴', color: '#10B981',  keywords: ['kerala', 'thiruvananthapuram', 'kochi', 'kozhikode', 'केरल'] },
  { name: 'पश्चिम बंगाल', nameEn: 'West Bengal',   emoji: '🎨', color: '#3B82F6',  keywords: ['west bengal', 'kolkata', 'bengal', 'पश्चिम बंगाल'] },
  { name: 'पंजाब',         nameEn: 'Punjab',         emoji: '🌾', color: '#F97316',  keywords: ['punjab', 'chandigarh', 'amritsar', 'ludhiana', 'पंजाब'] },
  { name: 'छत्तीसगढ़',     nameEn: 'Chhattisgarh',  emoji: '⛏️', color: '#8B5CF6',  keywords: ['chhattisgarh', 'raipur', 'bilaspur', 'छत्तीसगढ़'] },
];

const StateTile = ({ state, article, lang }) => {
  const navigate = useNavigate();
  const imageSrc = article
    ? (article.image || getCategoryFallbackImage(article.category, article.id, article.title, article.summary))
    : null;

  const handleClick = () => {
    if (!article) return;
    navigate(`/article/${article.id}`);
  };

  const stateName = lang === 'EN' ? state.nameEn : state.name;

  return (
    <div
      onClick={handleClick}
      className="state-collage-tile"
      style={{
        position: 'relative',
        height: '180px',
        borderRadius: '10px',
        overflow: 'hidden',
        cursor: article ? 'pointer' : 'default',
        background: imageSrc ? '#111' : `linear-gradient(135deg, ${state.color}33 0%, #111 100%)`,
        border: `1px solid ${state.color}44`,
      }}
    >
      {/* Background image */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={stateName}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
        />
      )}

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: imageSrc
          ? 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)'
          : 'none',
      }} />

      {/* State label top */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        <span style={{
          background: state.color,
          color: '#fff',
          padding: '3px 10px',
          borderRadius: '20px',
          fontSize: '11px',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}>
          <span>{state.emoji}</span>
          <span>{stateName}</span>
        </span>
      </div>

      {/* Headline bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '10px 12px',
      }}>
        {article ? (
          <>
            <p style={{
              fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
              fontSize: '14px',
              fontWeight: 600,
              color: '#fff',
              margin: 0,
              marginBottom: '4px',
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {article.title}
            </p>
            <span style={{ fontSize: '10px', color: '#aaa' }}>
              {timeAgo(article.pubDate, lang.toLowerCase())}
            </span>
          </>
        ) : (
          <p style={{
            fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
            fontSize: '13px',
            color: '#666',
            margin: 0,
          }}>
            {lang === 'EN' ? 'No recent news' : 'कोई खबर नहीं'}
          </p>
        )}
      </div>
    </div>
  );
};

const findStateArticle = (articles, state) =>
  articles.find((a) => {
    const text = `${a.title || ''} ${(a.summary || '').substring(0, 120)}`.toLowerCase();
    return state.keywords.some((kw) => text.includes(kw.toLowerCase()));
  }) || null;

const StatesCollage = () => {
  const { allArticles, rawArticles, loading } = useNews();
  const { lang, t } = useLang();

  const stateArticles = useMemo(() => {
    const preferredLang = lang === 'EN' ? 'en' : 'hi';
    const langFilteredRaw = rawArticles.filter(a => a.lang === preferredLang);
    return INDIA_STATES.map((state) => {
      // Try current articles first, fall back to older cached articles (same language)
      const article = findStateArticle(allArticles, state) || findStateArticle(langFilteredRaw, state);
      return { state, article };
    });
  }, [allArticles, rawArticles, lang]);

  if (loading) return null;

  const visibleStates = stateArticles.filter(({ article }) => article !== null);

  if (visibleStates.length === 0) return null;

  return (
    <section className="py-4" data-aos="fade-up">
      <SectionTitle title={t('otherStates')} />

      <div className="row g-2">
        {visibleStates.map(({ state, article }) => (
          <div className="col-lg-3 col-md-4 col-6" key={state.nameEn} data-aos="zoom-in" data-aos-delay="50">
            <StateTile state={state} article={article} lang={lang} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatesCollage;

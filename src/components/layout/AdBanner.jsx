import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';
import GoogleAd from '../common/GoogleAd';

const AD_VARIANTS = [
  {
    id: 'edu',
    icon: '📚',
    label: 'शिक्षा', labelEn: 'Education',
    title: 'NEET / JEE 2026 की तैयारी', titleEn: 'NEET / JEE 2026 Preparation',
    subtitle: 'Expert Faculty • Live Classes • Mock Tests',
    cta: 'फ्री टेस्ट दें', ctaEn: 'Take Free Test',
    href: '/category/education',
    bg: 'linear-gradient(135deg, #0f3460 0%, #16213e 60%, #1a1a2e 100%)',
    accent: '#4FC3F7',
    badge: 'FREE',
  },
  {
    id: 'job',
    icon: '🧑‍💼',
    label: 'रोजगार', labelEn: 'Jobs',
    title: '15,000+ सरकारी नौकरियां', titleEn: '15,000+ Government Jobs',
    subtitle: 'SSC • Railway • Bank • Defence • Police',
    cta: 'अभी Apply करें', ctaEn: 'Apply Now',
    href: '/category/jobs',
    bg: 'linear-gradient(135deg, #134e02 0%, #1b5e20 60%, #2e7d32 100%)',
    accent: '#A5D6A7',
    badge: 'NEW',
  },
  {
    id: 'health',
    icon: '🏥',
    label: 'स्वास्थ्य', labelEn: 'Health',
    title: 'Online Doctor Consultation',
    subtitle: '24×7 Available • 50,000+ Doctors • From Home',
    cta: 'Book for ₹199', ctaEn: 'Book for ₹199',
    href: '/category/health',
    bg: 'linear-gradient(135deg, #4a0000 0%, #7b0000 60%, #b71c1c 100%)',
    accent: '#FFCDD2',
    badge: 'OFFER',
  },
  {
    id: 'astro',
    icon: '⭐',
    label: 'ज्योतिष', labelEn: 'Astrology',
    title: 'आज का राशिफल', titleEn: "Today's Horoscope",
    subtitle: 'विश्वसनीय ज्योतिष • व्यक्तिगत भविष्यवाणी', subtitleEn: 'Trusted Astrology • Personal Predictions',
    cta: 'राशिफल देखें', ctaEn: 'View Horoscope',
    href: '/category/astro',
    bg: 'linear-gradient(135deg, #1a0a3a 0%, #2d0a5a 60%, #4a148c 100%)',
    accent: '#CE93D8',
    badge: 'TODAY',
  },
  {
    id: 'rental',
    icon: '🏠',
    label: 'प्रॉपर्टी', labelEn: 'Property',
    title: 'किराये का मकान ढूंढें', titleEn: 'Find Rental Home',
    subtitle: 'No Brokerage • Verified Listings • 5000+ Homes',
    cta: 'Search करें', ctaEn: 'Search Now',
    href: '/category/rental',
    bg: 'linear-gradient(135deg, #0a1a2a 0%, #1a2a3a 60%, #1565C0 100%)',
    accent: '#90CAF9',
    badge: 'FREE',
  },
  {
    id: 'tech',
    icon: '💻',
    label: 'तकनीक', labelEn: 'Technology',
    title: 'Learn Coding Online',
    subtitle: 'Python • Web Dev • AI/ML • Data Science',
    cta: 'Join Course', ctaEn: 'Join Course',
    href: '/category/technology',
    bg: 'linear-gradient(135deg, #002020 0%, #004d40 60%, #00695c 100%)',
    accent: '#80CBC4',
    badge: '50% OFF',
  },
];

// Pick a variant stably by hashing the size+index
const pickVariant = (size, index = 0) => {
  const key = size.charCodeAt(0) + size.charCodeAt(size.length - 1) + index;
  return AD_VARIANTS[key % AD_VARIANTS.length];
};

const AdBanner = ({ size = '728x90', variant: variantId, index = 0, googleSlot }) => {
  const { lang, t } = useLang();

  // If a real Google ad slot is provided, render that instead of the mock
  if (googleSlot) {
    const isLeaderboard = size === '728x90' || size === '970x90';
    return (
      <GoogleAd
        slot={googleSlot}
        format={isLeaderboard ? 'horizontal' : 'rectangle'}
        style={{ minHeight: isLeaderboard ? '90px' : '250px', margin: '12px 0' }}
      />
    );
  }
  const ad = variantId
    ? AD_VARIANTS.find(a => a.id === variantId) || pickVariant(size, index)
    : pickVariant(size, index);

  const isEn = lang === 'EN';
  const title = isEn ? (ad.titleEn || ad.title) : ad.title;
  const subtitle = isEn ? (ad.subtitleEn || ad.subtitle) : ad.subtitle;
  const cta = isEn ? (ad.ctaEn || ad.cta) : ad.cta;

  const isLeaderboard = size === '728x90' || size === '970x90';
  const isRect = size === '300x250';

  if (isLeaderboard) {
    return (
      <Link
        to={ad.href}
        data-aos="fade"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          maxWidth: '100%',
          height: '90px',
          background: ad.bg,
          border: `1px solid ${ad.accent}33`,
          borderRadius: '10px',
          padding: '0 24px',
          textDecoration: 'none',
          overflow: 'hidden',
          position: 'relative',
          margin: '12px auto',
        }}
      >
        <span style={{ fontSize: '10px', color: '#666', position: 'absolute', top: '6px', right: '10px', letterSpacing: '1px' }}>
          {t('advertisement')}
        </span>
        <span style={{ fontSize: '2.5rem', flexShrink: 0 }}>{ad.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif", fontSize: '1.4rem', color: '#fff', lineHeight: 1, marginBottom: '3px' }}>
            {title}
          </div>
          <div style={{ fontSize: '11px', color: ad.accent, opacity: 0.85 }}>{subtitle}</div>
        </div>
        <div style={{
          flexShrink: 0,
          background: ad.accent,
          color: '#000',
          padding: '8px 18px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}>
          {cta} →
        </div>
      </Link>
    );
  }

  // Rectangle (300x250) and tall (300x600)
  return (
    <Link
      to={ad.href}
      data-aos="fade-up"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        width: '100%',
        minHeight: isRect ? '250px' : '300px',
        background: ad.bg,
        border: `1px solid ${ad.accent}33`,
        borderRadius: '12px',
        padding: '24px 20px',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        margin: '12px 0',
      }}
    >
      <span style={{ fontSize: '10px', color: '#555', position: 'absolute', top: '8px', right: '12px', letterSpacing: '1px' }}>
        {t('advertisement')}
      </span>
      <span style={{
        position: 'absolute', top: '10px', left: '10px',
        background: ad.accent, color: '#000',
        fontSize: '9px', fontWeight: 800, padding: '2px 8px', borderRadius: '3px', letterSpacing: '1px',
      }}>
        {ad.badge}
      </span>

      <span style={{ fontSize: '3rem' }}>{ad.icon}</span>
      <div style={{
        fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
        fontSize: '1.5rem',
        color: '#fff',
        lineHeight: 1.2,
        fontWeight: 700,
      }}>
        {title}
      </div>
      <div style={{ fontSize: '12px', color: ad.accent, opacity: 0.85, lineHeight: 1.4 }}>
        {subtitle}
      </div>
      <div style={{
        marginTop: '8px',
        background: ad.accent,
        color: '#000',
        padding: '10px 24px',
        borderRadius: '25px',
        fontSize: '13px',
        fontWeight: 700,
      }}>
        {cta} →
      </div>

      {/* Decorative circle */}
      <div style={{
        position: 'absolute', bottom: '-40px', right: '-40px',
        width: '120px', height: '120px',
        borderRadius: '50%',
        background: `${ad.accent}15`,
        pointerEvents: 'none',
      }} />
    </Link>
  );
};

export default AdBanner;

import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PORTAL_NAME, PORTAL_NAME_EN } from '../utils/constants';
import { useLang } from '../context/LanguageContext';

const legalContent = {
  'privacy-policy': {
    titleHI: 'गोपनीयता नीति',
    titleEN: 'Privacy Policy',
    contentHI: [
      'यह गोपनीयता नीति बताती है कि हम आपकी व्यक्तिगत जानकारी कैसे एकत्र, उपयोग और सुरक्षित करते हैं।',
      'हम आपका ईमेल पता केवल न्यूज़लेटर सदस्यता के लिए एकत्र करते हैं। हम आपकी जानकारी किसी तीसरे पक्ष को नहीं बेचते या साझा नहीं करते।',
      'हमारी वेबसाइट बेहतर अनुभव प्रदान करने के लिए कुकीज़ का उपयोग कर सकती है।',
      'आप किसी भी समय हमसे संपर्क करके अपना डेटा हटाने का अनुरोध कर सकते हैं।',
    ],
    contentEN: [
      'This Privacy Policy explains how we collect, use, and protect your personal information.',
      'We collect your email address solely for newsletter subscription purposes. We do not sell or share your information with third parties.',
      'Our website may use cookies to provide a better experience.',
      'You can request deletion of your data by contacting us at any time.',
    ],
  },
  terms: {
    titleHI: 'नियम और शर्तें',
    titleEN: 'Terms & Conditions',
    contentHI: [
      'इस वेबसाइट का उपयोग करके, आप इन नियमों और शर्तों से सहमत होते हैं।',
      'इस पोर्टल पर प्रकाशित सभी समाचार सामग्री विभिन्न RSS स्रोतों से एकत्रित की जाती है। मूल सामग्री का स्वामित्व उनके संबंधित प्रकाशकों के पास है।',
      'हम सामग्री की सटीकता की गारंटी नहीं देते। पाठकों को सलाह दी जाती है कि वे महत्वपूर्ण जानकारी को आधिकारिक स्रोतों से सत्यापित करें।',
      'इस वेबसाइट की सामग्री को बिना अनुमति के कॉपी या पुनः प्रकाशित करना वर्जित है।',
    ],
    contentEN: [
      'By using this website, you agree to these terms and conditions.',
      'All news content published on this portal is aggregated from various RSS sources. Original content ownership belongs to their respective publishers.',
      'We do not guarantee the accuracy of the content. Readers are advised to verify important information from official sources.',
      'Copying or republishing content from this website without permission is prohibited.',
    ],
  },
  disclaimer: {
    titleHI: 'अस्वीकरण',
    titleEN: 'Disclaimer',
    contentHI: [
      'इस वेबसाइट पर प्रकाशित समाचार और जानकारी केवल सामान्य सूचना के उद्देश्य से है।',
      'हम किसी भी समाचार सामग्री की पूर्णता, विश्वसनीयता या सटीकता की गारंटी नहीं देते।',
      'इस वेबसाइट पर दी गई जानकारी के आधार पर की गई किसी भी कार्रवाई के लिए आप स्वयं जिम्मेदार हैं।',
      'बाहरी वेबसाइटों के लिंक केवल सुविधा के लिए प्रदान किए गए हैं। हम उनकी सामग्री के लिए जिम्मेदार नहीं हैं।',
    ],
    contentEN: [
      'The news and information published on this website is for general informational purposes only.',
      'We do not guarantee the completeness, reliability, or accuracy of any news content.',
      'Any action you take based on the information on this website is at your own risk.',
      'Links to external websites are provided for convenience only. We are not responsible for their content.',
    ],
  },
  sitemap: {
    titleHI: 'साइटमैप',
    titleEN: 'Sitemap',
    isSitemap: true,
  },
};

const sitemapSections = {
  HI: [
    { heading: 'मुख्य पेज', links: [{ label: 'होम', to: '/' }] },
    {
      heading: 'श्रेणियाँ',
      links: [
        { label: 'देश', to: '/category/national' },
        { label: 'विदेश', to: '/category/world' },
        { label: 'शिक्षा', to: '/category/education' },
        { label: 'नौकरी', to: '/category/jobs' },
        { label: 'स्वास्थ्य', to: '/category/health' },
        { label: 'तकनीक', to: '/category/technology' },
        { label: 'ज्योतिषशास्त्र', to: '/category/astro' },
      ],
    },
    {
      heading: 'राज्य समाचार',
      links: [
        { label: 'दिल्ली', to: '/state/delhi' },
        { label: 'उत्तराखंड', to: '/state/uttarakhand' },
        { label: 'उत्तर प्रदेश', to: '/state/uttar-pradesh' },
        { label: 'मध्य प्रदेश', to: '/state/madhya-pradesh' },
        { label: 'महाराष्ट्र', to: '/state/maharashtra' },
        { label: 'बिहार', to: '/state/bihar' },
      ],
    },
    {
      heading: 'कानूनी',
      links: [
        { label: 'गोपनीयता नीति', to: '/privacy-policy' },
        { label: 'नियम और शर्तें', to: '/terms' },
        { label: 'अस्वीकरण', to: '/disclaimer' },
      ],
    },
  ],
  EN: [
    { heading: 'Main Pages', links: [{ label: 'Home', to: '/' }] },
    {
      heading: 'Categories',
      links: [
        { label: 'National', to: '/category/national' },
        { label: 'World', to: '/category/world' },
        { label: 'Education', to: '/category/education' },
        { label: 'Jobs', to: '/category/jobs' },
        { label: 'Health', to: '/category/health' },
        { label: 'Technology', to: '/category/technology' },
        { label: 'Astrology', to: '/category/astro' },
      ],
    },
    {
      heading: 'State News',
      links: [
        { label: 'Delhi', to: '/state/delhi' },
        { label: 'Uttarakhand', to: '/state/uttarakhand' },
        { label: 'Uttar Pradesh', to: '/state/uttar-pradesh' },
        { label: 'Madhya Pradesh', to: '/state/madhya-pradesh' },
        { label: 'Maharashtra', to: '/state/maharashtra' },
        { label: 'Bihar', to: '/state/bihar' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Privacy Policy', to: '/privacy-policy' },
        { label: 'Terms & Conditions', to: '/terms' },
        { label: 'Disclaimer', to: '/disclaimer' },
      ],
    },
  ],
};

const LegalPage = () => {
  const { slug } = useParams();
  const { lang } = useLang();
  const page = legalContent[slug];

  if (!page) return null;

  const title = lang === 'EN' ? page.titleEN : page.titleHI;
  const portalName = lang === 'EN' ? PORTAL_NAME_EN : PORTAL_NAME;

  return (
    <>
      <Helmet>
        <title>{title} | {portalName}</title>
      </Helmet>
      <div className="container" style={{ padding: '40px 20px', maxWidth: '800px' }}>
        <h1
          style={{
            fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
            fontSize: '2rem',
            fontWeight: 700,
            color: 'var(--primary, #CC0000)',
            marginBottom: '24px',
            borderBottom: '2px solid var(--primary, #CC0000)',
            paddingBottom: '12px',
          }}
        >
          {title}
        </h1>

        {page.isSitemap ? (
          <div>
            {(sitemapSections[lang] || sitemapSections.HI).map((section) => (
              <div key={section.heading} style={{ marginBottom: '24px' }}>
                <h3
                  style={{
                    fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: 'var(--text-primary, #1a1a1a)',
                    marginBottom: '12px',
                  }}
                >
                  {section.heading}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {section.links.map((link) => (
                    <li key={link.to} style={{ marginBottom: '8px' }}>
                      <a
                        href={link.to}
                        style={{
                          color: 'var(--accent, #2563EB)',
                          textDecoration: 'none',
                          fontSize: '15px',
                        }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {(lang === 'EN' ? page.contentEN : page.contentHI).map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
                  fontSize: '16px',
                  lineHeight: 1.8,
                  color: 'var(--text-secondary, #444)',
                  marginBottom: '16px',
                }}
              >
                {para}
              </p>
            ))}
          </div>
        )}

        <p
          style={{
            marginTop: '32px',
            fontSize: '13px',
            color: 'var(--text-muted, #888)',
          }}
        >
          {lang === 'EN'
            ? `Last updated: April 2026 | ${PORTAL_NAME_EN}`
            : `अंतिम अपडेट: अप्रैल 2026 | ${PORTAL_NAME}`}
        </p>
      </div>
    </>
  );
};

export default LegalPage;

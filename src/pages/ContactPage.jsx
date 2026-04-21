import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PORTAL_NAME, PORTAL_NAME_EN } from '../utils/constants';
import { useLang } from '../context/LanguageContext';

const ContactPage = () => {
  const { lang } = useLang();
  const portalName = lang === 'EN' ? PORTAL_NAME_EN : PORTAL_NAME;
  const isEN = lang === 'EN';

  return (
    <>
      <Helmet>
        <title>{isEN ? 'Contact Us' : 'संपर्क करें'} | {portalName}</title>
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
          {isEN ? 'Contact Us' : 'संपर्क करें'}
        </h1>

        <p style={{ fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif", fontSize: '16px', lineHeight: 1.8, color: 'var(--text-secondary, #444)', marginBottom: '32px' }}>
          {isEN
            ? 'We are happy to hear from you. Reach us through any of the channels below.'
            : 'हम आपसे सुनकर प्रसन्न हैं। नीचे दिए गए किसी भी माध्यम से हमसे संपर्क करें।'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Email */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '20px', background: 'var(--card-bg, #fff)', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
            <div style={{ fontSize: '28px', minWidth: '36px' }}>✉️</div>
            <div>
              <h5 style={{ fontFamily: "'Mukta', sans-serif", fontWeight: 600, marginBottom: '4px', color: 'var(--text-primary, #1a1a1a)' }}>
                {isEN ? 'Email' : 'ईमेल'}
              </h5>
              <a href="mailto:inf_11@yahoo.com" style={{ color: 'var(--accent, #2563EB)', fontSize: '15px', textDecoration: 'none' }}>
                inf_11@yahoo.com
              </a>
            </div>
          </div>

          {/* Phone */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '20px', background: 'var(--card-bg, #fff)', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
            <div style={{ fontSize: '28px', minWidth: '36px' }}>📞</div>
            <div>
              <h5 style={{ fontFamily: "'Mukta', sans-serif", fontWeight: 600, marginBottom: '4px', color: 'var(--text-primary, #1a1a1a)' }}>
                {isEN ? 'Phone' : 'फ़ोन'}
              </h5>
              <a href="tel:+919773818679" style={{ color: 'var(--accent, #2563EB)', fontSize: '15px', textDecoration: 'none' }}>
                +91 97738 18679
              </a>
            </div>
          </div>

          {/* WhatsApp Channel */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '20px', background: 'var(--card-bg, #fff)', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
            <div style={{ fontSize: '28px', minWidth: '36px' }}>💬</div>
            <div>
              <h5 style={{ fontFamily: "'Mukta', sans-serif", fontWeight: 600, marginBottom: '4px', color: 'var(--text-primary, #1a1a1a)' }}>
                {isEN ? 'WhatsApp Channel' : 'व्हाट्सऐप चैनल'}
              </h5>
              <a href="https://whatsapp.com/channel/0029VbCw6MP5K3zYIlGbwg24" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontSize: '15px', textDecoration: 'none', fontWeight: 600 }}>
                {isEN ? 'Join our WhatsApp Channel' : 'हमारे व्हाट्सऐप चैनल से जुड़ें'}
              </a>
            </div>
          </div>

          {/* Office Address */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '20px', background: 'var(--card-bg, #fff)', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
            <div style={{ fontSize: '28px', minWidth: '36px' }}>📍</div>
            <div>
              <h5 style={{ fontFamily: "'Mukta', sans-serif", fontWeight: 600, marginBottom: '4px', color: 'var(--text-primary, #1a1a1a)' }}>
                {isEN ? 'Office Address' : 'कार्यालय पता'}
              </h5>
              <p style={{ fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif", fontSize: '15px', color: 'var(--text-secondary, #444)', margin: 0, lineHeight: 1.7 }}>
                {isEN
                  ? <>Link Road, Thapaliya,<br />Almora, Uttarakhand — 263601</>
                  : <>लिंक रोड, थापलिया,<br />अल्मोड़ा, उत्तराखंड — 263601</>}
              </p>
            </div>
          </div>

        </div>

        <p style={{ marginTop: '32px', fontSize: '13px', color: 'var(--text-muted, #888)', fontFamily: "'Mukta', sans-serif" }}>
          {isEN
            ? `Last updated: April 2026 | ${PORTAL_NAME_EN}`
            : `अंतिम अपडेट: अप्रैल 2026 | ${PORTAL_NAME}`}
        </p>
      </div>
    </>
  );
};

export default ContactPage;

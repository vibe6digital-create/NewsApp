import { memo } from 'react';
import { Link } from 'react-router-dom';
import { PORTAL_NAME, PORTAL_NAME_EN, PORTAL_SLOGAN, PORTAL_SLOGAN_EN, CATEGORIES } from '../../utils/constants';
import { useLang } from '../../context/LanguageContext';
import '../../styles/footer.css';

const stateLinks = [
  { name: 'दिल्ली', nameEn: 'Delhi', slug: 'delhi' },
  { name: 'उत्तराखंड', nameEn: 'Uttarakhand', slug: 'uttarakhand' },
  { name: 'उत्तर प्रदेश', nameEn: 'Uttar Pradesh', slug: 'uttar-pradesh' },
  { name: 'मध्य प्रदेश', nameEn: 'Madhya Pradesh', slug: 'madhya-pradesh' },
  { name: 'महाराष्ट्र', nameEn: 'Maharashtra', slug: 'maharashtra' },
  { name: 'बिहार', nameEn: 'Bihar', slug: 'bihar' },
];

const Footer = memo(() => {
  const { lang, t } = useLang();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          {/* Column 1: Logo & About */}
          <div className="col-lg-4 col-md-12 mb-4" data-aos="fade-up" data-aos-delay="0">
            <div className="footer-logo">
              {lang === 'EN' ? PORTAL_NAME_EN : PORTAL_NAME}
              <div className="footer-slogan">{lang === 'EN' ? PORTAL_SLOGAN_EN : PORTAL_SLOGAN}</div>
            </div>
            <p className="footer-desc">
              {t('portalDesc')}
            </p>
            <div className="footer-social">
              <a href="https://whatsapp.com/channel/0029VbCw6MP5K3zYIlGbwg24" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="https://www.facebook.com/KaushalPrimeNation/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com/kaushalprimenation/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://youtube.com/@kaushalprimenation" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-lg-3 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="100">
            <h5 className="footer-title">{t('quickLinks')}</h5>
            <ul className="footer-links">
              <li>
                <Link to="/">{t('home')}</Link>
              </li>
              {CATEGORIES.filter(cat =>
                ['national', 'world', 'education', 'jobs', 'health', 'technology', 'astro'].includes(cat.slug)
              ).map((cat) => (
                <li key={cat.slug}>
                  <Link to={`/category/${cat.slug}`}>
                    {lang === 'EN' ? cat.labelEn : cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: State News */}
          <div className="col-lg-3 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="200">
            <h5 className="footer-title">{t('stateNewsFooter')}</h5>
            <ul className="footer-links">
              {stateLinks.map((state) => (
                <li key={state.slug}>
                  <Link to={`/state/${state.slug}`}>
                    {lang === 'EN' ? state.nameEn : state.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="col-lg-2 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="300">
            <h5 className="footer-title">{t('contactUs')}</h5>
            <ul className="footer-links" style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '10px' }}>
                <a href="mailto:inf_11@yahoo.com" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <i className="fas fa-envelope" style={{ fontSize: '13px', minWidth: '14px' }}></i>
                  inf_11@yahoo.com
                </a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="tel:+919773818679" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <i className="fas fa-phone" style={{ fontSize: '13px', minWidth: '14px' }}></i>
                  +91 97738 18679
                </a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="https://whatsapp.com/channel/0029VbCw6MP5K3zYIlGbwg24" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#25D366' }}>
                  <i className="fab fa-whatsapp" style={{ fontSize: '13px', minWidth: '14px' }}></i>
                  {lang === 'EN' ? 'WhatsApp Channel' : 'व्हाट्सऐप चैनल'}
                </a>
              </li>
              <li>
                <span style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '13px', color: 'var(--footer-link, #ccc)' }}>
                  <i className="fas fa-map-marker-alt" style={{ fontSize: '13px', minWidth: '14px', marginTop: '3px' }}></i>
                  <span>
                    {lang === 'EN'
                      ? 'Link Road, Thapaliya, Almora, Uttarakhand — 263601'
                      : 'लिंक रोड, थापलिया, अल्मोड़ा, उत्तराखंड — 263601'}
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container d-flex flex-wrap justify-content-between align-items-center">
          <div>
            &copy; 2026 {PORTAL_NAME}. {t('allRightsReserved')} |
            <Link to="/privacy-policy"> Privacy Policy</Link> |
            <Link to="/terms"> Terms</Link> |
            <Link to="/disclaimer"> Disclaimer</Link> |
            <Link to="/sitemap"> Sitemap</Link> |
            <Link to="/contact"> {t('contactUs')}</Link>
          </div>
          <div className="powered-by">
            <span className="live-dot"></span>
            {t('poweredBy')} <span>Vibe6 Digital</span>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;

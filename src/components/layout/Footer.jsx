import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PORTAL_NAME, PORTAL_NAME_EN, CATEGORIES } from '../../utils/constants';
import { useLang } from '../../context/LanguageContext';
import { addSubscriber } from '../../services/subscriptionService';
import '../../styles/footer.css';

const stateLinks = [
  { name: 'दिल्ली', nameEn: 'Delhi', slug: 'delhi' },
  { name: 'उत्तराखंड', nameEn: 'Uttarakhand', slug: 'uttarakhand' },
  { name: 'उत्तर प्रदेश', nameEn: 'Uttar Pradesh', slug: 'uttar-pradesh' },
  { name: 'मध्य प्रदेश', nameEn: 'Madhya Pradesh', slug: 'madhya-pradesh' },
  { name: 'महाराष्ट्र', nameEn: 'Maharashtra', slug: 'maharashtra' },
  { name: 'बिहार', nameEn: 'Bihar', slug: 'bihar' },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const { lang, t } = useLang();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    const result = addSubscriber(email, '');
    if (result.success) {
      toast.success(t('subscribeSuccess'));
      setEmail('');
    } else {
      toast.info(t('subscribeDuplicate'));
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          {/* Column 1: Logo & About */}
          <div className="col-lg-3 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="0">
            <div className="footer-logo">{lang === 'EN' ? PORTAL_NAME_EN : PORTAL_NAME}</div>
            <p className="footer-desc">
              {t('portalDesc')}
            </p>
            <div className="footer-social">
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
            <div className="rni-line">RNI No. XXXXXXX</div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-lg-3 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="100">
            <h5 className="footer-title">{t('quickLinks')}</h5>
            <ul className="footer-links">
              <li>
                <Link to="/">{t('home')}</Link>
              </li>
              {CATEGORIES.map((cat) => (
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
                  <Link to={`/category/${state.slug}`}>
                    {lang === 'EN' ? state.nameEn : state.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Subscribe */}
          <div className="col-lg-3 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="300">
            <h5 className="footer-title">{t('contactUs')}</h5>
            <ul className="contact-info">
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>Office Address Placeholder, City, State - XXXXXX</span>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <span>news@example.com</span>
              </li>
              <li>
                <i className="fas fa-phone-alt"></i>
                <span>+91 XXXXX XXXXX</span>
              </li>
            </ul>
            <form className="footer-subscribe" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder={t('emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">{t('subscribeBtn')}</button>
            </form>
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
            <Link to="/sitemap"> Sitemap</Link>
          </div>
          <div className="powered-by">
            <span className="live-dot"></span>
            {t('poweredBy')} <span>Vibe6 Digital</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

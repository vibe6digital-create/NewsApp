import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { addSubscriber } from '../../services/subscriptionService';
import { useLang } from '../../context/LanguageContext';

const SubscriptionBanner = () => {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const { t } = useLang();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error(t('invalidEmail'));
      return;
    }

    // Validate mobile
    const mobileClean = mobile.replace(/\D/g, '');
    if (mobileClean.length !== 10) {
      toast.error(t('invalidMobile'));
      return;
    }

    const result = addSubscriber(email, '+91' + mobileClean);
    if (result.success) {
      toast.success(t('subscribeSuccess'));
      setEmail('');
      setMobile('');
    } else {
      toast.info(t('subscribeDuplicate'));
    }
  };

  return (
    <section
      id="subscription-section"
      className="py-5"
      style={{
        background: 'linear-gradient(135deg, #990000 0%, #660000 50%, #440000 100%)',
      }}
      data-aos="zoom-in"
    >
      <div className="container text-center">
        <h2
          style={{
            fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
            fontSize: '2rem',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '8px',
          }}
        >
          {t('subscriptionTitle')}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '30px' }}>
          {t('subscriptionSubtitle')}
        </p>

        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-3"
          style={{ maxWidth: '600px', margin: '0 auto' }}
        >
          <input
            type="email"
            className="form-control"
            placeholder={t('emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff',
              borderRadius: '8px',
              padding: '12px 16px',
            }}
          />
          <div className="d-flex align-items-center" style={{ position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                left: '12px',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '14px',
                zIndex: 2,
              }}
            >
              +91
            </span>
            <input
              type="tel"
              className="form-control"
              placeholder={t('mobilePlaceholder')}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              maxLength={10}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff',
                borderRadius: '8px',
                padding: '12px 16px 12px 48px',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              background: '#FFD700',
              color: '#000',
              border: 'none',
              padding: '12px 32px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '15px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.3s',
            }}
          >
            {t('subscribeBtn')}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SubscriptionBanner;

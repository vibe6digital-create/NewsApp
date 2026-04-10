import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LanguageContext';

const AuthModal = () => {
  const { checkUser, subscribe, closeAuthModal } = useAuth();
  const { t, lang } = useLang();
  const isEN = lang === 'EN';

  const [step, setStep] = useState('identify');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!email && !mobile) {
      setError(isEN ? 'Please enter email or mobile number' : 'कृपया ईमेल या मोबाइल नंबर दर्ज करें');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const result = await checkUser(email.trim(), mobile.trim());
      if (result.exists) {
        toast.success(isEN ? 'Welcome back!' : 'वापसी पर स्वागत है!');
      } else {
        setStep('register');
      }
    } catch {
      setError(isEN ? 'Something went wrong' : 'कुछ गलत हो गया');
    }
    setSubmitting(false);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(isEN ? 'Please enter your name' : 'कृपया अपना नाम दर्ज करें');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await subscribe(name.trim(), email.trim(), mobile.trim());
      toast.success(t('subscribeSuccess') || (isEN ? 'Subscribed successfully!' : 'सदस्यता सफल!'));
    } catch {
      setError(isEN ? 'Something went wrong' : 'कुछ गलत हो गया');
    }
    setSubmitting(false);
  };

  return (
    <>
      <style>{`
        .auth-overlay {
          position: fixed; inset: 0; z-index: 1070;
          background: rgba(0,0,0,0.75);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .auth-card {
          background: #0f0f1a; border-radius: 12px; padding: 28px 24px;
          width: 100%; max-width: 400px; position: relative;
          border: 1px solid #222; color: #fff;
          font-family: 'Noto Sans Devanagari', sans-serif;
          margin: auto;
        }
        .auth-close {
          position: absolute; top: 10px; right: 12px;
          background: none; border: none; color: #888;
          font-size: 24px; cursor: pointer; padding: 4px 8px;
          line-height: 1;
        }
        .auth-close:hover { color: #fff; }
        .auth-title {
          margin-bottom: 4px; font-weight: 700; color: #CC0000;
          font-size: 20px; text-align: center;
        }
        .auth-subtitle {
          text-align: center; color: #888; font-size: 13px; margin-bottom: 20px;
        }
        .auth-input {
          width: 100%; padding: 12px 14px; font-size: 15px;
          background: #1a1a2e; border: 1px solid #333; border-radius: 8px;
          color: #fff; outline: none;
          font-family: 'Noto Sans Devanagari', sans-serif;
          box-sizing: border-box;
          -webkit-appearance: none;
        }
        .auth-input:focus { border-color: #CC0000; }
        .auth-input::placeholder { color: #555; }
        .auth-divider {
          text-align: center; color: #555; font-size: 12px;
          margin: 10px 0; position: relative;
        }
        .auth-divider::before, .auth-divider::after {
          content: ''; position: absolute; top: 50%;
          width: 35%; height: 1px; background: #333;
        }
        .auth-divider::before { left: 0; }
        .auth-divider::after { right: 0; }
        .auth-btn {
          width: 100%; padding: 13px; font-size: 15px;
          font-weight: 700; background: #CC0000; color: #fff;
          border: none; border-radius: 8px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .auth-btn:active { background: #aa0000; }
        .auth-btn:disabled { opacity: 0.6; cursor: wait; }
        .auth-back-btn {
          padding: 13px 16px; font-size: 14px;
          font-weight: 600; background: #222; color: #aaa;
          border: 1px solid #333; border-radius: 8px; cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }
        .auth-back-btn:active { background: #333; }
        .auth-error { color: #f44; font-size: 13px; margin-bottom: 10px; }
        .auth-info-box {
          background: #1a1a2e; border-radius: 8px; padding: 10px 14px;
          margin-bottom: 14px; font-size: 13px; color: #aaa;
          word-break: break-all;
        }
        @media (max-width: 480px) {
          .auth-card { padding: 24px 18px; border-radius: 10px; }
          .auth-title { font-size: 18px; }
          .auth-input { font-size: 16px; padding: 14px 12px; }
          .auth-btn { font-size: 16px; padding: 14px; }
        }
      `}</style>
      <div className="auth-overlay" onClick={closeAuthModal}>
        <div className="auth-card" onClick={e => e.stopPropagation()}>
          <button className="auth-close" onClick={closeAuthModal}>&times;</button>

          <h3 className="auth-title">
            {isEN ? 'Subscribe' : 'सदस्यता लें'}
          </h3>
          <p className="auth-subtitle">
            {step === 'identify'
              ? (isEN ? 'Enter your email or mobile to continue' : 'ईमेल या मोबाइल दर्ज करें')
              : (isEN ? 'Complete your subscription' : 'सदस्यता पूरी करें')}
          </p>

          {step === 'identify' ? (
            <form onSubmit={handleCheck}>
              <input
                className="auth-input"
                type="email" value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                placeholder={isEN ? 'Email address' : 'ईमेल'}
                autoComplete="email"
                inputMode="email"
                style={{ marginBottom: 0 }}
              />
              <div className="auth-divider">{isEN ? 'or' : 'या'}</div>
              <input
                className="auth-input"
                type="tel" value={mobile}
                onChange={e => { setMobile(e.target.value); setError(''); }}
                placeholder={isEN ? 'Mobile number (10 digits)' : 'मोबाइल नंबर (10 अंक)'}
                maxLength={10}
                autoComplete="tel"
                inputMode="numeric"
                style={{ marginBottom: 16 }}
              />

              {error && <p className="auth-error">{error}</p>}

              <button className="auth-btn" type="submit" disabled={submitting}>
                <i className="fas fa-arrow-right"></i>
                {submitting
                  ? (isEN ? 'Checking...' : 'जाँच हो रही है...')
                  : (isEN ? 'Continue' : 'आगे बढ़ें')}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubscribe}>
              <div className="auth-info-box">
                {email && <div><i className="fas fa-envelope" style={{ width: 18, marginRight: 6, fontSize: 12 }}></i>{email}</div>}
                {mobile && <div style={{ marginTop: email ? 4 : 0 }}><i className="fas fa-phone" style={{ width: 18, marginRight: 6, fontSize: 12 }}></i>{mobile}</div>}
              </div>

              <input
                className="auth-input"
                value={name}
                onChange={e => { setName(e.target.value); setError(''); }}
                placeholder={isEN ? 'Your name' : 'आपका नाम'}
                required autoFocus
                autoComplete="name"
                style={{ marginBottom: 16 }}
              />

              {error && <p className="auth-error">{error}</p>}

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button" className="auth-back-btn"
                  onClick={() => { setStep('identify'); setError(''); }}
                >
                  <i className="fas fa-arrow-left"></i>
                </button>
                <button className="auth-btn" type="submit" disabled={submitting} style={{ flex: 1 }}>
                  <i className="fas fa-bell"></i>
                  {submitting
                    ? (isEN ? 'Subscribing...' : 'सदस्यता हो रही है...')
                    : (isEN ? 'Subscribe Now' : 'अभी सदस्यता लें')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthModal;

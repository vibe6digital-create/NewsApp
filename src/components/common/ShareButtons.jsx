import React, { useState } from 'react';

const ShareButtons = ({ url, title }) => {
  const [copied, setCopied] = useState(false);

  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleNativeShare = () => {
    if (navigator.share) navigator.share({ title, url });
  };

  const btnStyle = (bg) => ({
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    padding: '7px 14px', borderRadius: '20px',
    background: bg, color: '#fff', border: 'none',
    fontSize: '12px', fontWeight: 600, cursor: 'pointer',
    textDecoration: 'none', transition: 'opacity 0.2s',
  });

  return (
    <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--card-border)' }}>
      <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
        शेयर करें / Share
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        <a href={`https://wa.me/?text=${encodedTitle}%20${encoded}`} target="_blank" rel="noopener noreferrer" style={btnStyle('#25D366')}>
          <i className="fab fa-whatsapp" /> WhatsApp
        </a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`} target="_blank" rel="noopener noreferrer" style={btnStyle('#1877F2')}>
          <i className="fab fa-facebook-f" /> Facebook
        </a>
        <a href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`} target="_blank" rel="noopener noreferrer" style={btnStyle('#1DA1F2')}>
          <i className="fab fa-twitter" /> Twitter
        </a>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`} target="_blank" rel="noopener noreferrer" style={btnStyle('#0A66C2')}>
          <i className="fab fa-linkedin-in" /> LinkedIn
        </a>
        <button onClick={handleCopy} style={btnStyle(copied ? '#22C55E' : '#555')}>
          <i className={copied ? 'fas fa-check' : 'fas fa-link'} /> {copied ? 'Copied!' : 'Copy Link'}
        </button>
        {typeof navigator !== 'undefined' && navigator.share && (
          <button onClick={handleNativeShare} style={btnStyle('#CC0000')}>
            <i className="fas fa-share-alt" /> Share
          </button>
        )}
      </div>
    </div>
  );
};

export default ShareButtons;

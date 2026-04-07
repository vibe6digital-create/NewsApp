import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';
import { useNews } from '../../context/NewsContext';

const SearchBar = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useLang();
  const { allArticles } = useNews();

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
    if (!isOpen) { setQuery(''); setSuggestions([]); }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) { setSuggestions([]); return; }
    const matches = allArticles.filter(a => a.title.toLowerCase().includes(q)).slice(0, 5);
    setSuggestions(matches);
  }, [query, allArticles]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchTerm = query.trim();
    if (searchTerm) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      onClose();
    }
  };

  const handleSuggestionClick = (article) => {
    navigate(`/article/${article.id}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.9)',
        zIndex: 9999,
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: '15vh',
      }}
      onClick={onClose}
    >
      <style>{`
        .search-input-glow { outline: none; }
        .search-input-glow:focus {
          box-shadow: 0 0 0 3px rgba(204,0,0,0.4) !important;
          border-color: #ff2222 !important;
        }
        .search-suggestion:hover { background: rgba(204,0,0,0.12) !important; }
      `}</style>

      <div
        style={{ width: '90%', maxWidth: '600px', position: 'relative' }}
        onClick={e => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="search-input-glow"
            style={{
              width: '100%',
              padding: '15px 50px 15px 20px',
              fontSize: '1.2rem',
              backgroundColor: '#1a1a1a',
              border: '2px solid var(--primary)',
              borderRadius: suggestions.length > 0 ? '8px 8px 0 0' : '8px',
              color: '#fff',
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              transition: 'box-shadow 0.2s, border-color 0.2s',
            }}
          />
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '50%', right: '15px',
              transform: 'translateY(-50%)',
              background: 'none', border: 'none',
              color: '#888', fontSize: '1.5rem', cursor: 'pointer', lineHeight: 1,
            }}
          >✕</button>
        </form>

        {/* Suggestions dropdown */}
        {suggestions.length > 0 && (
          <div style={{
            background: '#1a1a1a',
            border: '2px solid var(--primary)', borderTop: 'none',
            borderRadius: '0 0 8px 8px', overflow: 'hidden',
          }}>
            {suggestions.map((article, i) => (
              <div
                key={article.id}
                className="search-suggestion"
                onClick={() => handleSuggestionClick(article)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '9px 15px',
                  borderTop: i > 0 ? '1px solid #2a2a2a' : 'none',
                  cursor: 'pointer', transition: 'background 0.15s',
                }}
              >
                {article.image && (
                  <img src={article.image} alt="" style={{ width: '42px', height: '32px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }}
                    onError={e => { e.target.style.display = 'none'; }} />
                )}
                <span style={{ fontSize: '13px', color: '#ddd', lineHeight: 1.4,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {article.title}
                </span>
              </div>
            ))}
            <div onClick={handleSubmit} style={{
              padding: '9px 15px', textAlign: 'center', cursor: 'pointer',
              fontSize: '12px', color: 'var(--primary)', fontWeight: 700,
              borderTop: '1px solid #2a2a2a',
            }}>
              सभी परिणाम देखें →
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

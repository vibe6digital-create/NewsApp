import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { formatNewsDate } from '../../utils/formatDate';
import { getCategoryLabel, getCategoryLabelEn } from '../../utils/categoryColors';
import { useLang } from '../../context/LanguageContext';
import ShareButtons from '../common/ShareButtons';

// Jina AI Reader — renders JS pages server-side, returns clean article text
const fetchFullArticle = async (articleUrl) => {
  try {
    const res = await fetch(`https://r.jina.ai/${articleUrl}`, {
      headers: { 'Accept': 'text/plain' },
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return null;
    const text = await res.text();
    if (!text || text.length < 200) return null;
    return text;
  } catch (_) {
    return null;
  }
};

// Convert plain text / markdown from Jina into readable paragraphs
const markdownToHtml = (text) => {
  return text
    // Remove Jina metadata lines at the top (Title:, URL:, etc.)
    .replace(/^(Title|URL|Published Time|Description|Keywords|Author)[^\n]*\n/gim, '')
    // Remove markdown image syntax
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    // Remove markdown links with text: [text](url) or [text](url "title")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    // Remove markdown links with empty text: [](url) or [ ](url)
    .replace(/\[\s*\]\([^)]*\)/g, '')
    // Remove leftover parenthesized URLs including optional title: (https://... "title")
    .replace(/\(https?:\/\/[^\s)]*(?:\s+"[^"]*")?\)/g, '')
    // Remove any remaining bare URLs
    .replace(/https?:\/\/\S+/g, '')
    // Remove nav-menu lines: short lines made up of * separated items (e.g. * देश * दुनिया)
    .replace(/^(\s*\*\s*[^\n*]{1,40}){2,}\s*$/gm, '')
    // Remove markdown headers — convert to bold paragraphs
    .replace(/^#{1,6}\s+(.+)$/gm, '<strong>$1</strong>')
    // Remove horizontal rules
    .replace(/^[-*_]{3,}$/gm, '')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Remove leftover empty brackets and stray punctuation from link removal
    .replace(/\[\s*\]/g, '')
    .replace(/\(\s*\)/g, '')
    // Convert double newlines to paragraph breaks
    .split(/\n{2,}/)
    .map(p => p.trim())
    .filter(p => p.length > 30)
    .map(p => `<p>${p.replace(/\n/g, ' ')}</p>`)
    .join('');
};

const ArticleDetail = ({ article }) => {
  const { lang, t } = useLang();
  const [fullContent, setFullContent] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    if (!article || article.body || !article.isRss || !article.link) return;

    let cancelled = false;
    setFetching(true);
    setFullContent(null);
    setFetchFailed(false);

    fetchFullArticle(article.link).then(text => {
      if (cancelled) return;
      if (text && text.length > 200) {
        setFullContent(markdownToHtml(text));
      } else {
        setFetchFailed(true);
      }
      setFetching(false);
    }).catch(() => {
      if (!cancelled) { setFetchFailed(true); setFetching(false); }
    });

    return () => { cancelled = true; };
  }, [article]);

  if (!article) return null;

  const articleUrl = window.location.href;
  const bodyText = article.body || fullContent || '';
  const wordCount = bodyText.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="article-detail">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb" style={{ fontSize: '14px' }}>
          <li className="breadcrumb-item">
            <Link to="/">{t('home')}</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/category/${article.category}`}>
              {lang === 'EN' ? getCategoryLabelEn(article.category) : getCategoryLabel(article.category)}
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {article.title}
          </li>
        </ol>
      </nav>

      {/* Headline */}
      <h1
        className="article-headline mb-3"
        style={{ fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif", fontSize: '2.4rem', lineHeight: 1.2 }}
      >
        {article.title}
      </h1>

      {/* Meta Row */}
      <div
        className="article-meta d-flex align-items-center flex-wrap gap-3 mb-3"
        style={{ fontSize: '14px', color: '#999' }}
      >
        <span>{formatNewsDate(article.pubDate)}</span>
        {wordCount > 0 && <span>{readingTime} {t('minuteRead')}</span>}
      </div>

      {/* Featured Image */}
      {article.image && (
        <div className="mb-3">
          <img
            src={article.image}
            alt={article.title}
            className="img-fluid rounded"
            style={{ width: '100%' }}
          />
        </div>
      )}

      {/* Ad Banner 728x90 */}
      <div className="ad-banner text-center mb-4">
        <div
          style={{
            width: '728px',
            maxWidth: '100%',
            height: '90px',
            backgroundColor: '#1a1a2e',
            border: '1px solid #333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            color: '#666',
            fontSize: '12px',
          }}
        >
          Ad 728x90
        </div>
      </div>

      {/* Article Summary / Lead */}
      {article.summary && (
        <p
          className="article-lead"
          style={{
            fontSize: '19px',
            lineHeight: 1.9,
            color: '#e0e0e0',
            borderLeft: '4px solid #e53935',
            paddingLeft: '16px',
            marginBottom: '24px',
            fontStyle: 'italic',
          }}
        >
          {article.summary}
        </p>
      )}

      {/* Article Body */}
      <div className="article-body" style={{ fontSize: '16px', lineHeight: 1.8 }}>
        {fetching && (
          <div className="text-center py-4">
            <div className="spinner-border text-danger" role="status" style={{ width: '2rem', height: '2rem' }} />
            <p style={{ color: '#999', marginTop: '12px', fontSize: '14px' }}>
              पूरा समाचार लोड हो रहा है…
            </p>
          </div>
        )}

        {!fetching && article.body && parse(article.body)}

        {!fetching && !article.body && fullContent && (
          <div dangerouslySetInnerHTML={{ __html: fullContent }} />
        )}

        {/* Fallback: Jina failed or no body — show source link */}
        {!fetching && !article.body && !fullContent && fetchFailed && article.link && article.link !== '#' && (
          <div
            style={{
              backgroundColor: '#1a1a2e',
              border: '1px solid #333',
              borderRadius: '12px',
              padding: '24px',
              textAlign: 'center',
              marginTop: '8px',
            }}
          >
            <p style={{ color: '#aaa', marginBottom: '16px', fontSize: '15px' }}>
              यह समाचार मूल स्रोत पर उपलब्ध है। पूरी खबर पढ़ने के लिए नीचे क्लिक करें।
            </p>
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-danger"
              style={{ borderRadius: '30px', padding: '10px 28px', fontWeight: 600, fontSize: '16px' }}
            >
              पूरी खबर पढ़ें &rarr;
            </a>
            {article.source && (
              <p style={{ color: '#666', fontSize: '12px', marginTop: '12px', marginBottom: 0 }}>
                स्रोत: {article.source}
              </p>
            )}
          </div>
        )}

        {/* No link available at all */}
        {!fetching && !article.body && !fullContent && !fetchFailed && !article.isRss && (
          <p style={{ color: '#888', fontSize: '15px', fontStyle: 'italic' }}>
            इस समाचार का विस्तृत विवरण उपलब्ध नहीं है।
          </p>
        )}
      </div>


      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="article-tags mt-4 mb-3 d-flex flex-wrap gap-2">
          {article.tags.map((tag, idx) => (
            <span
              key={idx}
              className="badge"
              style={{
                backgroundColor: '#f5c518',
                color: '#000',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Bottom Share */}
      <div className="mt-4 pt-3" style={{ borderTop: '1px solid #333' }}>
        <ShareButtons url={articleUrl} title={article.title} />
      </div>
    </article>
  );
};

export default ArticleDetail;

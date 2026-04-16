import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { formatNewsDate } from '../../utils/formatDate';
import { getCategoryLabel, getCategoryLabelEn } from '../../utils/categoryColors';
import { useLang } from '../../context/LanguageContext';
import ShareButtons from '../common/ShareButtons';
import { useAuth } from '../../context/AuthContext';
import { PORTAL_NAME } from '../../utils/constants';

// Multiple reader services — tried in order until one returns good content
const READER_SERVICES = [
  // Our own Vercel serverless function — most reliable, no CORS or rate limits
  (url) => fetch(`/api/fetch-article?url=${encodeURIComponent(url)}`, {
    signal: AbortSignal.timeout(12000),
  }).then(r => r.ok ? r.text() : null),
  // AllOrigins proxy — fetches raw HTML for extraction
  (url) => fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`, {
    signal: AbortSignal.timeout(10000),
  }).then(r => r.ok ? r.json() : null).then(d => d?.contents || null),
  // Jina AI Reader — fallback
  (url) => fetch(`https://r.jina.ai/${url}`, {
    headers: { 'Accept': 'text/plain' },
    signal: AbortSignal.timeout(10000),
  }).then(r => r.ok ? r.text() : null),
];

// Extract main article text from raw HTML
const extractArticleFromHtml = (html) => {
  if (!html || html.length < 200) return null;
  const doc = new DOMParser().parseFromString(html, 'text/html');
  // Remove non-content elements
  doc.querySelectorAll(
    'script,style,nav,header,footer,aside,iframe,noscript,button,form,' +
    '.ad,.ads,.sidebar,.menu,.nav,.comment,.social,.share,.related,' +
    '.subscription,.paywall,.newsletter,.popup,.modal,.cookie,.banner,' +
    '.breadcrumb,.tags,.author-bio,.more-stories,.also-read'
  ).forEach(el => el.remove());

  // Site-specific selectors (Indian news sites first, then generic)
  const selectors = [
    // Indian news sites
    '.jagran-story-full-text', '.story-details', '.story__content',   // Jagran
    '.details-body', '.article__body',                                  // Amar Ujala
    '.art_content', '.bhaskar-article',                                 // Dainik Bhaskar
    '.readmore_span', '.article_text',                                  // NBT/TOI
    '.sp-cn', '.ndtv__storycontent',                                    // NDTV
    '.artText', '.fullstory',                                           // ABP/Zee
    '.article-body__content', '.article-body',                          // BBC Hindi
    '.Normal', '.article-txt',                                          // Times of India
    '.story-body', '.story-content',                                    // LiveHindustan
    '.content-area', '.post-body',                                      // Generic blogs
    // Standard selectors
    '[itemprop="articleBody"]', 'article', '.entry-content',
    '.post-content', '.article-content', '.story-body',
    'main article', 'main .content', 'main',
  ];

  // Strip inline color/background styles so our theme CSS takes control
  const stripInlineColors = (el) => {
    el.querySelectorAll('*').forEach(node => {
      node.style.removeProperty('color');
      node.style.removeProperty('background');
      node.style.removeProperty('background-color');
    });
  };

  for (const sel of selectors) {
    const el = doc.querySelector(sel);
    if (el) {
      stripInlineColors(el);
      const text = el.innerHTML.trim();
      if (text.replace(/<[^>]*>/g, '').trim().length > 150) return text;
    }
  }

  // Fallback: grab all <p> tags with real content
  const paragraphs = Array.from(doc.querySelectorAll('p'))
    .map(p => p.textContent.trim())
    .filter(t => t.length > 20);
  if (paragraphs.length >= 2) {
    return paragraphs.map(p => `<p>${p}</p>`).join('');
  }
  return null;
};

const fetchFullArticle = async (articleUrl) => {
  for (const service of READER_SERVICES) {
    try {
      const text = await service(articleUrl);
      if (!text || text.length < 200) continue;
      // If it looks like HTML from AllOrigins, extract article content
      if (text.includes('<!DOCTYPE') || text.includes('<html')) {
        const extracted = extractArticleFromHtml(text);
        if (extracted) return extracted;
        continue;
      }
      return text;
    } catch (_) {
      // Try next service
    }
  }
  return null;
};

// Convert plain text / markdown from Jina into readable paragraphs
const markdownToHtml = (text) => {
  return text
    // Remove Jina metadata lines at the top (Title:, URL:, etc.)
    .replace(/^(Title|URL|Published Time|Description|Keywords|Author|Source|Publisher|Website|Site)[^\n]*\n/gim, '')
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
    .filter(p => p.length > 15)
    .map(p => `<p>${p.replace(/\n/g, ' ')}</p>`)
    .join('');
};

const ArticleDetail = ({ article }) => {
  const { lang, t } = useLang();
  const { isSubscribed, openAuthModal } = useAuth();
  const [fullContent, setFullContent] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  const handleDownloadPdf = useCallback(async () => {
    if (!article || pdfLoading) return;
    setPdfLoading(true);
    try {
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import('jspdf'),
        import('html2canvas'),
      ]);

      // Build an off-screen styled container for clean PDF output
      const container = document.createElement('div');
      container.style.cssText = 'position:absolute;left:-9999px;top:0;width:800px;padding:40px;background:#fff;color:#111;font-family:Noto Sans Devanagari,Mukta,sans-serif;';

      // Header with branding
      container.innerHTML = `
        <div style="border-bottom:3px solid #CC0000;padding-bottom:12px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <div style="font-size:22px;font-weight:800;color:#CC0000;">${PORTAL_NAME}</div>
            <div style="font-size:11px;color:#888;">तेज नज़र तेज़ खबर | Tez Nazar Tez Khabar</div>
          </div>
          <div style="font-size:11px;color:#888;text-align:right;">
            ${formatNewsDate(article.pubDate)}<br/>
            ${lang === 'EN' ? getCategoryLabelEn(article.category) : getCategoryLabel(article.category)}
          </div>
        </div>
        <h1 style="font-size:26px;font-weight:800;color:#111;line-height:1.4;margin:0 0 16px;">${article.title}</h1>
        ${article.image ? `<img src="${article.image}" style="width:100%;max-height:400px;object-fit:cover;border-radius:8px;margin-bottom:16px;" crossorigin="anonymous" />` : ''}
        ${article.summary ? `<p style="font-size:15px;line-height:1.8;color:#444;border-left:4px solid #CC0000;padding-left:14px;font-style:italic;margin-bottom:20px;">${article.summary}</p>` : ''}
        <div style="font-size:15px;line-height:2;color:#222;">
          ${article.body || fullContent || (article.summary ? `<p>${article.summary}</p>` : '')}
        </div>
        <div style="border-top:2px solid #eee;margin-top:30px;padding-top:12px;font-size:10px;color:#aaa;text-align:center;">
          ${PORTAL_NAME} &mdash; ${window.location.origin}/article/${article.id}
        </div>
      `;

      document.body.appendChild(container);

      // Wait for images to load
      const imgs = container.querySelectorAll('img');
      await Promise.all(Array.from(imgs).map(img =>
        img.complete ? Promise.resolve() : new Promise(r => { img.onload = r; img.onerror = r; })
      ));

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      document.body.removeChild(container);

      const imgData = canvas.toDataURL('image/jpeg', 0.92);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();
      const margin = 8;
      const contentW = pdfW - margin * 2;
      const imgH = (canvas.height * contentW) / canvas.width;

      // Multi-page support
      let yOffset = 0;
      while (yOffset < imgH) {
        if (yOffset > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', margin, margin - yOffset, contentW, imgH);
        yOffset += pdfH - margin * 2;
      }

      // Filename from title
      const safeName = article.title
        .replace(/[^\w\s\u0900-\u097F]/g, '')
        .trim()
        .replace(/\s+/g, '_')
        .substring(0, 60);
      pdf.save(`${safeName}_KPN.pdf`);
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setPdfLoading(false);
    }
  }, [article, fullContent, pdfLoading, lang]);

  useEffect(() => {
    if (!article || !article.isRss || !article.link || article.link === '#') return;

    let cancelled = false;
    setFetching(true);
    setFullContent(null);

    fetchFullArticle(article.link).then(text => {
      if (cancelled) return;
      if (text && text.length > 200) {
        const isHtml = /<\/?[a-z][\s\S]*>/i.test(text);
        setFullContent(isHtml ? text : markdownToHtml(text));
      }
      setFetching(false);
    }).catch(() => {
      if (!cancelled) { setFetching(false); }
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
        className="article-meta d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3"
        style={{ fontSize: '14px', color: 'var(--text-muted)' }}
      >
        <div className="d-flex align-items-center gap-3">
          <span>{formatNewsDate(article.pubDate)}</span>
          {wordCount > 0 && <span>{readingTime} {t('minuteRead')}</span>}
        </div>
        {isSubscribed ? (
          <button
            onClick={handleDownloadPdf}
            disabled={pdfLoading || fetching}
            style={{
              background: pdfLoading ? '#555' : '#CC0000',
              color: '#fff',
              border: 'none',
              borderRadius: 20,
              padding: '5px 16px',
              fontSize: 13,
              fontWeight: 600,
              cursor: pdfLoading ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'background 0.2s',
            }}
          >
            {pdfLoading
              ? <><span className="spinner-border spinner-border-sm" role="status" style={{ width: 14, height: 14 }} /> {lang === 'EN' ? 'Generating…' : 'बन रहा है…'}</>
              : <><i className="fa-solid fa-file-pdf" /> {lang === 'EN' ? 'Download PDF' : 'PDF डाउनलोड'}</>
            }
          </button>
        ) : (
          <button
            onClick={openAuthModal}
            style={{
              background: '#555',
              color: '#fff',
              border: 'none',
              borderRadius: 20,
              padding: '5px 16px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <i className="fa-solid fa-lock" /> {t('pdfSubscribePrompt')}
          </button>
        )}
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
            color: 'var(--text-secondary)',
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
      <div className="article-body" style={{ fontSize: '17px', lineHeight: 2, color: 'var(--text-primary)' }}>

        {/* Show fetched full content if available */}
        {fullContent && (
          <div dangerouslySetInnerHTML={{ __html: fullContent }} />
        )}

        {/* Show RSS body / admin body when no fetched content */}
        {!fullContent && article.body && (
          <div>{parse(article.body)}</div>
        )}

        {/* Loading indicator */}
        {fetching && (
          <div className="d-flex align-items-center gap-2 mt-3" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            <div className="spinner-border spinner-border-sm text-danger" role="status" style={{ width: '1rem', height: '1rem' }} />
            {lang === 'EN' ? 'Loading full article…' : 'पूरी खबर लोड हो रही है…'}
          </div>
        )}

        {/* Read full article on source when content couldn't be fetched */}
        {!fetching && !fullContent && !article.body && article.link && article.link !== '#' && (
          <div
            style={{
              marginTop: '24px',
              padding: '20px 24px',
              background: 'var(--dark-2)',
              border: '1px solid var(--card-border)',
              borderRadius: '10px',
              textAlign: 'center',
            }}
          >
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '16px' }}>
              {lang === 'EN'
                ? 'Full article is available on the original source.'
                : 'पूरी खबर मूल स्रोत पर उपलब्ध है।'}
            </p>
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#CC0000',
                color: '#fff',
                padding: '10px 24px',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '15px',
                textDecoration: 'none',
              }}
            >
              <i className="fas fa-external-link-alt" />
              {lang === 'EN' ? `Read on ${article.source}` : `${article.source} पर पढ़ें`}
            </a>
          </div>
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

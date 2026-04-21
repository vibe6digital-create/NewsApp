import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import parse, { domToReact } from 'html-react-parser';
import { formatNewsDateLocale } from '../../utils/formatDate';
import { getCategoryLabel, getCategoryLabelEn } from '../../utils/categoryColors';
import { useLang } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { PORTAL_NAME } from '../../utils/constants';
import { stripSourceAttribution } from '../../utils/stripSource';
import { isBrandedImage } from '../../utils/isBrandedImage';
import { buildLocalSummary } from '../../utils/buildLocalSummary';

// Strip junk markup from admin article body HTML before rendering
const cleanBodyHtml = (html) => {
  if (!html) return '';
  return html
    .replace(/\s*style\s*=\s*"[^"]*"/gi, '')
    .replace(/\s*style\s*=\s*'[^']*'/gi, '')
    .replace(/<[^>]+>\s*(?:Markdown Content:|Posted in\s[^<]*|Share this[^<]*|Our Land Our News[^<]*|Search for:[^<]*|Click to share[^<]*)\s*<\/[^>]+>/gi, '')
    .replace(/<p[^>]*>\s*(?:Facebook|Twitter|WhatsApp|Telegram|Instagram|LinkedIn|Pinterest|Reddit|Email|Print)\s*<\/p>/gi, '')
    .replace(/<p[^>]*>\s*The post\s[\s\S]*?appeared first on[\s\S]*?<\/p>/gi, '')
    .replace(/<[^>]+>\s*https?:\/\/[^\s<]+\s*<\/[^>]+>/gi, '')
    // NDTV / network taglines
    .replace(/<[^>]+>[^<]*ndtv\.in[^<]*<\/[^>]+>/gi, '')
    .replace(/<[^>]+>[^<]*ताज़ातरीन\s+खबरों[^<]*<\/[^>]+>/gi, '')
    // "Read full story" links
    .replace(/<[^>]+>[^<]*(?:पूरी\s+स्टोरी\s+पढ़ें|read\s+full\s+story|read\s+more)[^<]*<\/[^>]+>/gi, '')
    // Trending / navigation headings
    .replace(/<[^>]+>[^<]*(?:ट्रेंडिंग\s+न्यूज़|trending\s+news)[^<]*<\/[^>]+>/gi, '')
    // Markdown headers that leaked as text
    .replace(/^#{1,6}\s+/gm, '');
};

// Replace external <a> links with plain <span> to prevent external navigation
const parseOptions = {
  replace(domNode) {
    if (domNode.type === 'tag' && domNode.name === 'a') {
      const href = domNode.attribs?.href || '';
      if (href.startsWith('http') || href.startsWith('//')) {
        return <span>{domToReact(domNode.children, parseOptions)}</span>;
      }
    }
  },
};

const ArticleDetail = ({ article }) => {
  const { lang, t } = useLang();
  const { isSubscribed, openAuthModal } = useAuth();
  const [pdfLoading, setPdfLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState(null);
  const [summarizing, setSummarizing] = useState(false);

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
            ${formatNewsDateLocale(article.pubDate, lang)}<br/>
            ${lang === 'EN' ? getCategoryLabelEn(article.category) : getCategoryLabel(article.category)}
          </div>
        </div>
        <h1 style="font-size:26px;font-weight:800;color:#111;line-height:1.4;margin:0 0 16px;">${article.title}</h1>
        ${article.image ? `<img src="${article.image}" style="width:100%;max-height:400px;object-fit:cover;border-radius:8px;margin-bottom:16px;" crossorigin="anonymous" />` : ''}
        ${article.summary ? `<p style="font-size:15px;line-height:1.8;color:#444;border-left:4px solid #CC0000;padding-left:14px;font-style:italic;margin-bottom:20px;">${article.summary}</p>` : ''}
        <div style="font-size:15px;line-height:2;color:#222;">
          ${article.body || (article.summary ? `<p>${article.summary}</p>` : '')}
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
  }, [article, pdfLoading, lang]);

  useEffect(() => {
    if (!article || !article.isRss || (!article.summary && !article.title)) return;

    let cancelled = false;
    setAiSummary(null);
    setSummarizing(true);

    // Include truncated body as extra context so the AI can generate a richer summary
    const bodySnippet = (article.body || '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 800);

    const params = new URLSearchParams({
      title: article.title || '',
      summary: article.summary || '',
      body: bodySnippet,
    });
    fetch(`/api/summarize-article?${params}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (cancelled) return;
        if (data?.summary) setAiSummary(data.summary);
        setSummarizing(false);
      })
      .catch(() => { if (!cancelled) setSummarizing(false); });

    return () => { cancelled = true; };
  }, [article]);

  if (!article) return null;

  const bodyText = article.body || '';
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
          <span>{formatNewsDateLocale(article.pubDate, lang)}</span>
          {wordCount > 0 && <span>{readingTime} {t('minuteRead')}</span>}
        </div>
        {isSubscribed ? (
          <button
            onClick={handleDownloadPdf}
            disabled={pdfLoading}
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

      {/* Featured Image — skip branded RSS thumbnails */}
      {article.image && !(article.isRss && isBrandedImage(article.image)) && (
        <div className="mb-3">
          <img
            src={article.image}
            alt={article.title}
            className="img-fluid rounded"
            style={{ width: '100%' }}
            loading="lazy"
          />
        </div>
      )}


      {/* Article Summary / Lead — only for admin articles, never for RSS */}
      {article.summary && !article.isRss && (
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
          {stripSourceAttribution(article.summary, article.source)}
        </p>
      )}

      {/* Article Body */}
      <div className="article-body" style={{ fontSize: '17px', lineHeight: 2, color: 'var(--text-primary)' }}>

        {/* Admin-written articles: render body, stripping junk + external links */}
        {!article.isRss && article.body && (
          <div>{parse(cleanBodyHtml(article.body), parseOptions)}</div>
        )}

        {/* Admin articles with no body and no summary */}
        {!article.isRss && !article.body && !article.summary && (
          <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
            {lang === 'EN' ? 'Full article content not available.' : 'पूर्ण लेख उपलब्ध नहीं है।'}
          </p>
        )}

        {/* RSS articles: show AI summary only */}
        {article.isRss && summarizing && (
          <div className="d-flex align-items-center gap-2 mt-3" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            <div className="spinner-border spinner-border-sm text-danger" role="status" style={{ width: '1rem', height: '1rem' }} />
            {lang === 'EN' ? 'Preparing article summary…' : 'खबर का सारांश तैयार हो रहा है…'}
          </div>
        )}

        {article.isRss && !summarizing && aiSummary && (
          <div>
            {aiSummary
              .replace(/^#{1,6}\s+/gm, '')      // strip any markdown headers Groq slips in
              .replace(/\*\*?([^*]+)\*\*?/g, '$1') // strip bold/italic
              .split(/\n{2,}/)
              .map(p => p.trim())
              .filter(p => p.length > 0 && !/ndtv\.in|ndtv\s+group|dnpa\s+code|all\s+rights\s+reserved|©|copyright|get\s+app|jiosaavn|listen\s+to\s+the\s+latest|only\s+on\s+jio|अन्य\s+समाचार|ताज़ातरीन\s+खबर|पूरी\s+स्टोरी\s+पढ़ें|ट्रेंडिंग\s+न्यूज़|facebook.*twitter|youtube.*instagram/i.test(p))
              // Strip residual source-attribution sentences that the AI may have included
              .map(p => p
                .replace(/\(\s*source\s*:\s*[^)]{1,60}\)/gi, '')
                .replace(/[-–—]\s*[A-Z][a-zA-Z\s]{2,40}$/gm, '')
                .replace(/\|\s*[A-Z][a-zA-Z\s]{2,40}$/gm, '')
                .replace(/\b(साभार|सौजन्य)\s*:\s*\S[^\n.]{0,50}/gi, '')
                .replace(/\bvia\s+[A-Z][a-zA-Z\s]{2,30}\b/g, '')
                .replace(/\s{2,}/g, ' ')
                .trim()
              )
              .filter(p => p.length > 0)
              .map((para, i) => (
                <p key={i}>{para}</p>
              ))}
          </div>
        )}

        {/* RSS fallback: AI summary unavailable — build structured local summary from body + summary */}
        {article.isRss && !summarizing && !aiSummary && (() => {
          const paragraphs = buildLocalSummary(article, lang);
          if (paragraphs && paragraphs.length > 0) {
            return (
              <div>
                {paragraphs.map((para, i) => <p key={i}>{para}</p>)}
              </div>
            );
          }
          // Hard fallback: show stripped raw summary so something always appears
          const raw = stripSourceAttribution(article.summary || '', article.source)
            .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
          return raw ? <p>{raw}</p> : null;
        })()}
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

    </article>
  );
};

export default ArticleDetail;

import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAdmin } from '../../context/AdminContext';
import AdminSidebar from './AdminSidebar';
import { CATEGORIES, STATES } from '../../utils/constants';
import '../../styles/admin.css';

const AddEditArticle = () => {
  const { isLoggedIn, addArticle, updateArticle, getArticle } = useAdmin();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [step, setStep] = useState(1);
  const [imageTab, setImageTab] = useState('upload');
  const [lang, setLang] = useState('hi');

  const [formData, setFormData] = useState({
    titleHindi: '',
    titleEnglish: '',
    summary: '',
    body: '',
    category: '',
    state: '',
    tags: '',
    featuredImage: '',
    videoUrl: '',
    galleryImages: ['', '', ''],
    status: 'published',
    featured: false,
    breaking: false,
  });

  useEffect(() => {
    if (isEdit) {
      const article = getArticle(id);
      if (article) {
        setFormData({
          titleHindi: article.titleHindi || article.title || '',
          titleEnglish: article.titleEnglish || '',
          summary: article.summary || article.excerpt || '',
          body: article.body || article.content || '',
          category: article.category || '',
          state: article.state || '',
          tags: Array.isArray(article.tags) ? article.tags.join(', ') : article.tags || '',
          featuredImage: article.featuredImage || article.image || '',
          videoUrl: article.videoUrl || '',
          galleryImages: article.galleryImages || ['', '', ''],
          status: article.status || 'published',
          featured: article.featured || false,
          breaking: article.breaking || false,
        });
      }
    }
  }, [id, isEdit, getArticle]);

  if (!isLoggedIn) {
    return <Navigate to="/admin" />;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleGalleryChange = (index, value) => {
    setFormData((prev) => {
      const updated = [...prev.galleryImages];
      updated[index] = value;
      return { ...prev, galleryImages: updated };
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, featuredImage: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    if (!formData.titleHindi.trim() && !formData.titleEnglish.trim()) {
      toast.error(lang === 'hi' ? 'कम से कम एक शीर्षक आवश्यक है!' : 'At least one title is required!');
      setStep(1);
      return false;
    }
    if (!formData.category) {
      toast.error(lang === 'hi' ? 'श्रेणी चुनें!' : 'Please select a category!');
      setStep(1);
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const articleData = {
      ...formData,
      tags: formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      galleryImages: formData.galleryImages.filter(Boolean),
    };

    try {
      if (isEdit) {
        updateArticle(id, articleData);
        toast.success(lang === 'hi' ? 'लेख अपडेट हो गया!' : 'Article updated successfully!');
      } else {
        addArticle(articleData);
        toast.success(lang === 'hi' ? 'लेख प्रकाशित हो गया!' : 'Article published successfully!');
      }
      navigate('/admin/manage');
    } catch (err) {
      toast.error(lang === 'hi' ? 'लेख सेव नहीं हो पाया।' : 'Failed to save article.');
    }
  };

  const renderStepIndicator = () => (
    <div className="step-indicator">
      <div className={`step ${step >= 1 ? 'active' : ''}`}>
        <span className="step-num">1</span>
        <span className="step-label">Content</span>
      </div>
      <div className={`step ${step >= 2 ? 'active' : ''}`}>
        <span className="step-num">2</span>
        <span className="step-label">Media</span>
      </div>
      <div className={`step ${step >= 3 ? 'active' : ''}`}>
        <span className="step-num">3</span>
        <span className="step-label">Publish</span>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="form-step">
      <h2>{lang === 'hi' ? 'चरण 1: सामग्री' : 'Step 1: Content'}</h2>

      <div className="lang-toggle">
        <button
          type="button"
          className={`lang-btn ${lang === 'hi' ? 'active' : ''}`}
          onClick={() => setLang('hi')}
        >
          हिंदी
        </button>
        <button
          type="button"
          className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
          onClick={() => setLang('en')}
        >
          English
        </button>
      </div>

      <div className="form-group">
        <label>{lang === 'hi' ? 'शीर्षक (हिंदी) *' : 'Title (Hindi) *'}</label>
        <textarea
          name="titleHindi"
          className="form-control"
          value={formData.titleHindi}
          onChange={handleChange}
          placeholder={lang === 'hi' ? 'हिंदी शीर्षक लिखें...' : 'Enter Hindi title...'}
          required
          rows={2}
        />
      </div>

      <div className="form-group">
        <label>{lang === 'hi' ? 'शीर्षक (अंग्रेज़ी)' : 'Title (English)'}</label>
        <input
          type="text"
          name="titleEnglish"
          className="form-control"
          value={formData.titleEnglish}
          onChange={handleChange}
          placeholder={lang === 'hi' ? 'अंग्रेज़ी शीर्षक लिखें...' : 'Enter English title...'}
        />
      </div>

      <div className="form-group">
        <label>
          {lang === 'hi' ? `सारांश (${formData.summary.length}/150)` : `Summary / Excerpt (${formData.summary.length}/150)`}
        </label>
        <textarea
          name="summary"
          className="form-control"
          value={formData.summary}
          onChange={(e) => {
            if (e.target.value.length <= 150) handleChange(e);
          }}
          placeholder={lang === 'hi' ? 'संक्षिप्त सारांश लिखें (अधिकतम 150 अक्षर)' : 'Short summary (max 150 characters)'}
          rows={3}
          maxLength={150}
        />
        <small className="char-counter">
          {lang === 'hi'
            ? `${150 - formData.summary.length} अक्षर शेष`
            : `${150 - formData.summary.length} characters remaining`}
        </small>
      </div>

      <div className="form-group">
        <label>{lang === 'hi' ? 'पूरा लेख' : 'Full Article Body'}</label>
        <textarea
          name="body"
          className="form-control article-body"
          value={formData.body}
          onChange={handleChange}
          placeholder={lang === 'hi' ? 'यहाँ पूरा लेख लिखें...' : 'Write full article content here...'}
          rows={10}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>{lang === 'hi' ? 'श्रेणी' : 'Category'}</label>
          <select
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">{lang === 'hi' ? '-- श्रेणी चुनें --' : '-- Select Category --'}</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.emoji} {lang === 'hi' ? cat.label : cat.labelEn}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>{lang === 'hi' ? 'राज्य (वैकल्पिक)' : 'State (Optional)'}</label>
          <select
            name="state"
            className="form-control"
            value={formData.state}
            onChange={handleChange}
          >
            <option value="">{lang === 'hi' ? '-- राज्य चुनें --' : '-- Select State --'}</option>
            {STATES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>{lang === 'hi' ? 'टैग (अल्पविराम से अलग करें)' : 'Tags (comma-separated)'}</label>
        <input
          type="text"
          name="tags"
          className="form-control"
          value={formData.tags}
          onChange={handleChange}
          placeholder={lang === 'hi' ? 'जैसे: राजनीति, ब्रेकिंग, चुनाव' : 'e.g. politics, breaking, election'}
        />
      </div>

      <div className="form-buttons">
        <button className="btn-primary-red" onClick={() => setStep(2)}>
          {lang === 'hi' ? 'अगला' : 'Next'} <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="form-step">
      <h2>{lang === 'hi' ? 'चरण 2: मीडिया' : 'Step 2: Media'}</h2>

      <div className="form-group">
        <label>{lang === 'hi' ? 'मुख्य चित्र' : 'Featured Image'}</label>
        <div className="image-tabs">
          <button
            className={`tab-btn ${imageTab === 'upload' ? 'active' : ''}`}
            onClick={() => setImageTab('upload')}
            type="button"
          >
            {lang === 'hi' ? 'फाइल अपलोड करें' : 'Upload File'}
          </button>
          <button
            className={`tab-btn ${imageTab === 'url' ? 'active' : ''}`}
            onClick={() => setImageTab('url')}
            type="button"
          >
            {lang === 'hi' ? 'URL पेस्ट करें' : 'Paste URL'}
          </button>
        </div>

        {imageTab === 'upload' ? (
          <div className="upload-area">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="form-control"
            />
          </div>
        ) : (
          <input
            type="text"
            name="featuredImage"
            className="form-control"
            value={formData.featuredImage}
            onChange={handleChange}
            placeholder={lang === 'hi' ? 'चित्र का URL यहाँ पेस्ट करें' : 'Paste image URL here'}
          />
        )}

        {formData.featuredImage && (
          <div className="image-preview">
            <img src={formData.featuredImage} alt="Preview" />
          </div>
        )}
      </div>

      <div className="form-group">
        <label>{lang === 'hi' ? 'वीडियो URL (YouTube Embed)' : 'Video URL (YouTube Embed)'}</label>
        <input
          type="text"
          name="videoUrl"
          className="form-control"
          value={formData.videoUrl}
          onChange={handleChange}
          placeholder="https://www.youtube.com/embed/..."
        />
      </div>

      <div className="form-group">
        <label>{lang === 'hi' ? 'गैलरी चित्र (अधिकतम 3 URL)' : 'Gallery Images (up to 3 URLs)'}</label>
        {formData.galleryImages.map((url, index) => (
          <input
            key={index}
            type="text"
            className="form-control gallery-input"
            value={url}
            onChange={(e) => handleGalleryChange(index, e.target.value)}
            placeholder={lang === 'hi' ? `गैलरी चित्र ${index + 1} URL` : `Gallery image ${index + 1} URL`}
          />
        ))}
      </div>

      <div className="form-buttons">
        <button className="btn-secondary" onClick={() => setStep(1)}>
          <i className="fas fa-arrow-left"></i> {lang === 'hi' ? 'पीछे' : 'Back'}
        </button>
        <button className="btn-primary-red" onClick={() => setStep(3)}>
          {lang === 'hi' ? 'अगला' : 'Next'} <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="form-step">
      <h2>{lang === 'hi' ? 'चरण 3: प्रकाशन सेटिंग्स' : 'Step 3: Publish Settings'}</h2>

      <div className="form-group">
        <label>{lang === 'hi' ? 'स्थिति' : 'Status'}</label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="status"
              value="published"
              checked={formData.status === 'published'}
              onChange={handleChange}
            />
            {lang === 'hi' ? 'प्रकाशित' : 'Published'}
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="status"
              value="draft"
              checked={formData.status === 'draft'}
              onChange={handleChange}
            />
            {lang === 'hi' ? 'ड्राफ्ट' : 'Draft'}
          </label>
        </div>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          {lang === 'hi' ? 'फीचर्ड (हीरो स्लाइडर में दिखेगा)' : 'Featured (appears in hero slider)'}
        </label>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="breaking"
            checked={formData.breaking}
            onChange={handleChange}
          />
          {lang === 'hi' ? 'ब्रेकिंग न्यूज़ (टिकर में दिखेगा)' : 'Breaking News (appears in ticker)'}
        </label>
      </div>

      <div className="preview-card">
        <h3>{lang === 'hi' ? 'पूर्वावलोकन' : 'Preview'}</h3>
        <div className="article-preview">
          {formData.featuredImage && (
            <img src={formData.featuredImage} alt="Preview" className="preview-image" />
          )}
          <div className="preview-content">
            <span className="preview-category">{formData.category || (lang === 'hi' ? 'श्रेणी' : 'Category')}</span>
            <h4>{formData.titleHindi || (lang === 'hi' ? 'लेख का शीर्षक' : 'Article Title')}</h4>
            <p>{formData.summary || (lang === 'hi' ? 'लेख का सारांश यहाँ दिखेगा...' : 'Article summary will appear here...')}</p>
            <div className="preview-meta">
              <span className={`badge badge-${formData.status}`}>{formData.status}</span>
              {formData.featured && <span className="badge badge-featured">{lang === 'hi' ? 'फीचर्ड' : 'Featured'}</span>}
              {formData.breaking && <span className="badge badge-breaking">{lang === 'hi' ? 'ब्रेकिंग' : 'Breaking'}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="form-buttons">
        <button className="btn-secondary" onClick={() => setStep(2)}>
          <i className="fas fa-arrow-left"></i> {lang === 'hi' ? 'पीछे' : 'Back'}
        </button>
        <button className="btn-primary-red" onClick={handleSubmit}>
          <i className="fas fa-paper-plane"></i> {isEdit
            ? (lang === 'hi' ? 'लेख अपडेट करें' : 'Update Article')
            : (lang === 'hi' ? 'लेख प्रकाशित करें' : 'Publish Article')}
        </button>
      </div>
    </div>
  );

  return (
    <div className="admin-layout">
      <AdminSidebar activePage={isEdit ? 'manage' : 'add'} />
      <div className="admin-content">
        <h1 className="admin-page-title">
          {isEdit ? 'Edit Article' : 'Add New Article'}
        </h1>

        {renderStepIndicator()}

        <div className="article-form">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>
      </div>
    </div>
  );
};

export default AddEditArticle;

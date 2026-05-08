import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase, DocsPage, DocsSatellite, DocsStatus } from '../../lib/supabase';
import {
  Plus, CreditCard as Edit2, Trash2, Eye, EyeOff, ChevronDown, ChevronRight,
  Save, ArrowLeft, Bold, Italic, Underline, Link2, List, ListOrdered,
  Image as ImageIcon, Video, AlignLeft, Minus, Code, Quote, Type
} from 'lucide-react';

// ─── Rich Text Editor ─────────────────────────────────────────────────────────

function DocsRichEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalUpdate = useRef(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoCaption, setVideoCaption] = useState('');
  const savedRange = useRef<Range | null>(null);

  useEffect(() => {
    const el = editorRef.current;
    if (!el || isInternalUpdate.current) return;
    if (el.innerHTML !== value) {
      el.innerHTML = value || '';
    }
  }, [value]);

  const handleInput = useCallback(() => {
    const el = editorRef.current;
    if (!el) return;
    isInternalUpdate.current = true;
    onChange(el.innerHTML);
    setTimeout(() => { isInternalUpdate.current = false; }, 0);
  }, [onChange]);

  const exec = (cmd: string, val?: string) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val);
    handleInput();
  };

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedRange.current = sel.getRangeAt(0).cloneRange();
    }
  };

  const restoreSelection = () => {
    const sel = window.getSelection();
    if (sel && savedRange.current) {
      sel.removeAllRanges();
      sel.addRange(savedRange.current);
    }
  };

  const isActive = (cmd: string) => {
    try { return document.queryCommandState(cmd); } catch { return false; }
  };

  const insertHtml = (html: string) => {
    editorRef.current?.focus();
    restoreSelection();
    document.execCommand('insertHTML', false, html);
    handleInput();
  };

  // Convert YouTube/Vimeo URLs to embed
  const toEmbedUrl = (url: string): string => {
    const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
    const vm = url.match(/vimeo\.com\/(\d+)/);
    if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
    return url;
  };

  const handleInsertLink = () => {
    if (!linkUrl.trim()) return;
    editorRef.current?.focus();
    restoreSelection();
    document.execCommand('createLink', false, linkUrl.trim());
    // Make links open in new tab
    editorRef.current?.querySelectorAll('a').forEach((a) => {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    });
    handleInput();
    setLinkUrl('');
    setShowLinkDialog(false);
  };

  const handleInsertImage = () => {
    if (!imageUrl.trim()) return;
    const caption = imageCaption.trim();
    const html = `<figure class="docs-figure my-6">
  <img src="${imageUrl.trim()}" alt="${caption}" class="w-full rounded-lg border border-gray-200 object-cover" />
  ${caption ? `<figcaption class="text-sm text-gray-500 text-center mt-2 font-jost italic">${caption}</figcaption>` : ''}
</figure><p><br/></p>`;
    insertHtml(html);
    setImageUrl('');
    setImageCaption('');
    setShowImageDialog(false);
  };

  const handleInsertVideo = () => {
    if (!videoUrl.trim()) return;
    const embed = toEmbedUrl(videoUrl.trim());
    const caption = videoCaption.trim();
    const html = `<figure class="docs-figure my-6">
  <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:0.5rem;border:1px solid #e5e7eb">
    <iframe src="${embed}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none" allowfullscreen loading="lazy"></iframe>
  </div>
  ${caption ? `<figcaption class="text-sm text-gray-500 text-center mt-2 font-jost italic">${caption}</figcaption>` : ''}
</figure><p><br/></p>`;
    insertHtml(html);
    setVideoUrl('');
    setVideoCaption('');
    setShowVideoDialog(false);
  };

  const handleInsertDivider = () => {
    insertHtml('<hr style="border:none;border-top:1px solid #e5e7eb;margin:2rem 0" /><p><br/></p>');
  };

  const handleInsertCode = () => {
    const sel = window.getSelection();
    const selected = sel && sel.rangeCount > 0 ? sel.getRangeAt(0).toString() : '';
    if (selected) {
      exec('insertHTML', `<code style="background:#f3f4f6;padding:2px 6px;border-radius:4px;font-family:monospace;font-size:0.85em;color:#065f46">${selected}</code>`);
    } else {
      insertHtml('<pre style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:1rem;overflow-x:auto;font-family:monospace;font-size:0.85em;line-height:1.6"><code>code here</code></pre><p><br/></p>');
    }
  };

  const handleInsertCallout = (type: 'info' | 'warning' | 'tip') => {
    const styles: Record<string, { bg: string; border: string; text: string; icon: string; label: string }> = {
      info:    { bg: '#eff6ff', border: '#3b82f6', text: '#1e40af', icon: 'ℹ️', label: 'Info' },
      warning: { bg: '#fffbeb', border: '#f59e0b', text: '#92400e', icon: '⚠️', label: 'Warning' },
      tip:     { bg: '#f0fdf4', border: '#22c55e', text: '#166534', icon: '💡', label: 'Tip' },
    };
    const s = styles[type];
    const html = `<div style="background:${s.bg};border-left:4px solid ${s.border};padding:12px 16px;border-radius:0 8px 8px 0;margin:1.5rem 0">
  <p style="font-weight:700;color:${s.text};margin-bottom:4px;font-size:0.85em;text-transform:uppercase;letter-spacing:0.05em">${s.icon} ${s.label}</p>
  <p style="color:${s.text};margin:0">Write your ${s.label.toLowerCase()} here.</p>
</div><p><br/></p>`;
    insertHtml(html);
  };

  const ToolBtn = ({
    cmd, icon, title, val, active
  }: { cmd?: string; icon: React.ReactNode; title: string; val?: string; active?: boolean }) => (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        if (cmd) exec(cmd, val);
      }}
      title={title}
      className={`p-1.5 rounded transition-colors ${
        active ?? (cmd ? isActive(cmd) : false)
          ? 'bg-asciende-purple text-white'
          : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
      }`}
    >
      {icon}
    </button>
  );

  const Sep = () => <div className="w-px h-5 bg-gray-300 mx-0.5 self-center" />;

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-asciende-purple focus-within:border-transparent transition">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-2 bg-gray-50 border-b border-gray-200 flex-wrap">
        {/* Text formatting */}
        <ToolBtn cmd="bold" icon={<Bold size={14} />} title="Bold (Ctrl+B)" />
        <ToolBtn cmd="italic" icon={<Italic size={14} />} title="Italic (Ctrl+I)" />
        <ToolBtn cmd="underline" icon={<Underline size={14} />} title="Underline (Ctrl+U)" />
        <Sep />

        {/* Headings */}
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); exec('formatBlock', 'h1'); }}
          title="Heading 1"
          className="px-2 py-1 rounded text-xs font-krona font-bold text-gray-600 hover:bg-gray-200 transition"
        >H1</button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); exec('formatBlock', 'h2'); }}
          title="Heading 2"
          className="px-2 py-1 rounded text-xs font-krona font-bold text-gray-600 hover:bg-gray-200 transition"
        >H2</button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); exec('formatBlock', 'h3'); }}
          title="Heading 3"
          className="px-2 py-1 rounded text-xs font-krona font-bold text-gray-600 hover:bg-gray-200 transition"
        >H3</button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); exec('formatBlock', 'p'); }}
          title="Paragraph"
          className="p-1.5 rounded text-gray-600 hover:bg-gray-200 transition"
        ><AlignLeft size={14} /></button>
        <Sep />

        {/* Font size */}
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); exec('fontSize', '5'); }}
          title="Large text"
          className="px-2 py-1 rounded text-sm font-bold text-gray-700 hover:bg-gray-200 transition leading-none"
        >A<span className="text-[9px] align-super">+</span></button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); exec('fontSize', '3'); }}
          title="Normal text"
          className="px-2 py-1 rounded text-xs font-bold text-gray-600 hover:bg-gray-200 transition leading-none"
        >A</button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); exec('fontSize', '1'); }}
          title="Small text"
          className="px-2 py-1 rounded text-[10px] font-bold text-gray-500 hover:bg-gray-200 transition leading-none"
        >A<span className="text-[9px] align-sub">-</span></button>
        <Sep />

        {/* Lists */}
        <ToolBtn cmd="insertUnorderedList" icon={<List size={14} />} title="Bullet list" />
        <ToolBtn cmd="insertOrderedList" icon={<ListOrdered size={14} />} title="Numbered list" />
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); exec('formatBlock', 'blockquote'); }}
          title="Blockquote"
          className="p-1.5 rounded text-gray-600 hover:bg-gray-200 transition"
        ><Quote size={14} /></button>
        <Sep />

        {/* Code */}
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); handleInsertCode(); }}
          title="Inline code / code block"
          className="p-1.5 rounded text-gray-600 hover:bg-gray-200 transition"
        ><Code size={14} /></button>
        <Sep />

        {/* Link */}
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); saveSelection(); setShowLinkDialog(true); }}
          title="Insert link"
          className="p-1.5 rounded text-gray-600 hover:bg-gray-200 transition"
        ><Link2 size={14} /></button>
        <Sep />

        {/* Media */}
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); saveSelection(); setShowImageDialog(true); }}
          title="Insert image"
          className="p-1.5 rounded text-gray-600 hover:bg-gray-200 transition"
        ><ImageIcon size={14} /></button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); saveSelection(); setShowVideoDialog(true); }}
          title="Insert video"
          className="p-1.5 rounded text-gray-600 hover:bg-gray-200 transition"
        ><Video size={14} /></button>
        <Sep />

        {/* Callouts */}
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); handleInsertCallout('info'); }}
          title="Info callout"
          className="px-2 py-1 rounded text-[10px] font-bold text-blue-600 hover:bg-blue-50 transition"
        >INFO</button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); handleInsertCallout('warning'); }}
          title="Warning callout"
          className="px-2 py-1 rounded text-[10px] font-bold text-yellow-600 hover:bg-yellow-50 transition"
        >WARN</button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); handleInsertCallout('tip'); }}
          title="Tip callout"
          className="px-2 py-1 rounded text-[10px] font-bold text-green-600 hover:bg-green-50 transition"
        >TIP</button>
        <Sep />

        {/* Divider */}
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); handleInsertDivider(); }}
          title="Insert horizontal rule"
          className="p-1.5 rounded text-gray-600 hover:bg-gray-200 transition"
        ><Minus size={14} /></button>
      </div>

      {/* Editable area — uses the same docs-content CSS as the frontend for true WYSIWYG */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        className="docs-content docs-editor-body px-6 py-5 outline-none"
        style={{ whiteSpace: 'pre-wrap' }}
        data-placeholder="Start writing your documentation content here..."
      />

      {/* Link dialog */}
      {showLinkDialog && (
        <Dialog title="Insert Link" onClose={() => setShowLinkDialog(false)}>
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg font-jost text-sm focus:outline-none focus:border-asciende-purple"
            autoFocus
            onKeyDown={(e) => { if (e.key === 'Enter') handleInsertLink(); }}
          />
          <DialogActions onConfirm={handleInsertLink} onCancel={() => setShowLinkDialog(false)} confirmLabel="Insert" />
        </Dialog>
      )}

      {/* Image dialog */}
      {showImageDialog && (
        <Dialog title="Insert Image" onClose={() => setShowImageDialog(false)}>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL (https://...)"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg font-jost text-sm focus:outline-none focus:border-asciende-purple mb-3"
            autoFocus
          />
          <input
            type="text"
            value={imageCaption}
            onChange={(e) => setImageCaption(e.target.value)}
            placeholder="Caption (optional)"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg font-jost text-sm focus:outline-none focus:border-asciende-purple"
          />
          {imageUrl && (
            <img src={imageUrl} alt="preview" className="mt-3 max-h-36 rounded-lg object-cover border border-gray-200 w-full" />
          )}
          <DialogActions onConfirm={handleInsertImage} onCancel={() => setShowImageDialog(false)} confirmLabel="Insert Image" />
        </Dialog>
      )}

      {/* Video dialog */}
      {showVideoDialog && (
        <Dialog title="Insert Video" onClose={() => setShowVideoDialog(false)}>
          <p className="text-xs text-gray-500 font-jost mb-2">Supports YouTube, Vimeo, or any embed URL.</p>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg font-jost text-sm focus:outline-none focus:border-asciende-purple mb-3"
            autoFocus
          />
          <input
            type="text"
            value={videoCaption}
            onChange={(e) => setVideoCaption(e.target.value)}
            placeholder="Caption (optional)"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg font-jost text-sm focus:outline-none focus:border-asciende-purple"
          />
          <DialogActions onConfirm={handleInsertVideo} onCancel={() => setShowVideoDialog(false)} confirmLabel="Insert Video" />
        </Dialog>
      )}
    </div>
  );
}

function Dialog({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-krona font-bold text-gray-900 mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
}

function DialogActions({ onConfirm, onCancel, confirmLabel }: { onConfirm: () => void; onCancel: () => void; confirmLabel: string }) {
  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={onConfirm}
        className="flex-1 px-4 py-2 bg-asciende-purple text-white rounded-lg font-jost text-sm font-semibold hover:bg-asciende-purple/90 transition"
      >{confirmLabel}</button>
      <button
        onClick={onCancel}
        className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-jost text-sm hover:bg-gray-200 transition"
      >Cancel</button>
    </div>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SATELLITES: { value: DocsSatellite; label: string }[] = [
  { value: 'general', label: 'General' },
  { value: 'hub', label: 'HUB' },
  { value: 'lab', label: 'Lab' },
  { value: 'endurance-planner', label: 'Endurance Planner' },
  { value: 'nutrition-planner', label: 'Nutrition Planner' },
  { value: 'academy', label: 'Academy' },
  { value: 'performance-vector', label: 'Performance Vector' },
  { value: 'motion', label: 'Motion' },
];

const STATUSES: DocsStatus[] = ['alpha', 'beta', 'experimental', 'stable'];

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function estimateReadingTime(html: string): number {
  const words = html.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// ─── Docs Editor ──────────────────────────────────────────────────────────────

interface DocsEditorProps {
  page: DocsPage | null;
  allPages: DocsPage[];
  onSaved: () => void;
  onCancel: () => void;
}

function DocsEditor({ page, allPages, onSaved, onCancel }: DocsEditorProps) {
  const [title, setTitle] = useState(page?.title || '');
  const [slug, setSlug] = useState(page?.slug || '');
  const [slugManual, setSlugManual] = useState(!!page?.slug);
  const [parentSlug, setParentSlug] = useState(page?.parent_slug || '');
  const [satellite, setSatellite] = useState<DocsSatellite>(page?.satellite || 'general');
  const [category, setCategory] = useState(page?.category || '');
  const [excerpt, setExcerpt] = useState(page?.excerpt || '');
  const [contentHtml, setContentHtml] = useState(page?.content_html || '');
  const [contentMarkdown, setContentMarkdown] = useState(page?.content_markdown || '');
  const [seoTitle, setSeoTitle] = useState(page?.seo_title || '');
  const [seoDescription, setSeoDescription] = useState(page?.seo_description || '');
  const [coverImage, setCoverImage] = useState(page?.cover_image || '');
  const [orderIndex, setOrderIndex] = useState(page?.order_index ?? 0);
  const [tags, setTags] = useState(page?.tags.join(', ') || '');
  const [relatedSlugs, setRelatedSlugs] = useState(page?.related_slugs.join(', ') || '');
  const [published, setPublished] = useState(page?.published || false);
  const [versionLabel, setVersionLabel] = useState(page?.version_label || '');
  const [status, setStatus] = useState<DocsStatus>(page?.status || 'alpha');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'content' | 'meta' | 'seo'>('content');

  useEffect(() => {
    if (!slugManual && title) {
      setSlug(slugify(title));
    }
  }, [title, slugManual]);

  async function handleSave() {
    if (!title.trim()) { setError('Title is required'); return; }
    if (!slug.trim()) { setError('Slug is required'); return; }
    setSaving(true);
    setError('');

    const tagsArr = tags.split(',').map((t) => t.trim()).filter(Boolean);
    const relatedArr = relatedSlugs.split(',').map((t) => t.trim()).filter(Boolean);
    const reading = estimateReadingTime(contentHtml);

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      parent_slug: parentSlug.trim() || null,
      satellite,
      category: category.trim() || null,
      content_markdown: contentMarkdown,
      content_html: contentHtml,
      excerpt: excerpt.trim() || null,
      seo_title: seoTitle.trim() || null,
      seo_description: seoDescription.trim() || null,
      cover_image: coverImage.trim() || null,
      order_index: orderIndex,
      tags: tagsArr,
      related_slugs: relatedArr,
      published,
      version_label: versionLabel.trim() || null,
      status,
      estimated_reading_minutes: reading,
      updated_at: new Date().toISOString(),
    };

    const { error: err } = page
      ? await supabase.from('docs_pages').update(payload).eq('id', page.id)
      : await supabase.from('docs_pages').insert([payload]);

    if (err) { setError(err.message); setSaving(false); return; }
    onSaved();
  }

  const tabClass = (t: string) =>
    `px-4 py-2 text-sm font-krona font-bold transition border-b-2 ${activeTab === t ? 'border-asciende-purple text-asciende-purple' : 'border-transparent text-gray-400 hover:text-gray-700'}`;

  const inputClass = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-jost focus:outline-none focus:border-asciende-purple transition';
  const labelClass = 'block text-xs font-krona font-bold text-gray-700 mb-1';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 px-6 py-4 flex items-center gap-4">
        <button onClick={onCancel} className="p-2 rounded-lg hover:bg-gray-100 transition">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex-1">
          <p className="text-xs font-krona text-gray-400">Docs Editor</p>
          <p className="text-sm font-krona font-bold text-gray-900 truncate">{title || 'New Page'}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-jost text-gray-600">{published ? 'Published' : 'Draft'}</span>
            <div
              onClick={() => setPublished(!published)}
              className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${published ? 'bg-green-500' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${published ? 'left-5' : 'left-0.5'}`} />
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-asciende-purple text-white rounded-lg text-sm font-krona font-bold hover:bg-asciende-purple/90 transition disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm font-jost text-red-600">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 flex gap-0">
        <button className={tabClass('content')} onClick={() => setActiveTab('content')}>Content</button>
        <button className={tabClass('meta')} onClick={() => setActiveTab('meta')}>Metadata</button>
        <button className={tabClass('seo')} onClick={() => setActiveTab('seo')}>SEO</button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Title *</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Page title"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Slug *</label>
                <div className="flex gap-2">
                  <input
                    value={slug}
                    onChange={(e) => { setSlug(e.target.value); setSlugManual(true); }}
                    placeholder="page-slug"
                    className={`${inputClass} flex-1`}
                  />
                  {slugManual && (
                    <button
                      onClick={() => { setSlugManual(false); setSlug(slugify(title)); }}
                      className="px-2 py-1 text-xs bg-gray-100 rounded text-gray-500 hover:bg-gray-200"
                    >auto</button>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1 font-jost">/docs/{slug}</p>
              </div>
            </div>

            <div>
              <label className={labelClass}>Excerpt</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                placeholder="Short description shown in sidebar and SEO..."
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Content</label>
              <DocsRichEditor value={contentHtml} onChange={setContentHtml} />
            </div>

            <div>
              <label className={labelClass}>
                Markdown Source
                <span className="font-jost font-normal text-gray-400 ml-2">(optional — for search & AI indexing)</span>
              </label>
              <textarea
                value={contentMarkdown}
                onChange={(e) => setContentMarkdown(e.target.value)}
                rows={6}
                placeholder="# Title&#10;&#10;Content in markdown format..."
                className={`${inputClass} font-mono text-xs leading-relaxed`}
              />
            </div>
          </div>
        )}

        {activeTab === 'meta' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Satellite / Module</label>
                <select value={satellite} onChange={(e) => setSatellite(e.target.value as DocsSatellite)} className={inputClass}>
                  {SATELLITES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Parent Slug</label>
                <select value={parentSlug} onChange={(e) => setParentSlug(e.target.value)} className={inputClass}>
                  <option value="">— None (top-level) —</option>
                  {allPages.filter((p) => !p.parent_slug && p.satellite === satellite && p.id !== page?.id).map((p) => (
                    <option key={p.id} value={p.slug}>{p.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value as DocsStatus)} className={inputClass}>
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Version Label</label>
                <input
                  value={versionLabel}
                  onChange={(e) => setVersionLabel(e.target.value)}
                  placeholder="v1.0, v2 beta..."
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Order Index</label>
                <input
                  type="number"
                  value={orderIndex}
                  onChange={(e) => setOrderIndex(parseInt(e.target.value) || 0)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Category</label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="testing, formulas, onboarding..."
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Tags <span className="font-normal text-gray-400 ml-1">(comma-separated)</span></label>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="vo2, lactate, endurance..."
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Related Docs <span className="font-normal text-gray-400 ml-1">(slugs, comma-separated)</span></label>
              <input
                value={relatedSlugs}
                onChange={(e) => setRelatedSlugs(e.target.value)}
                placeholder="hub/dashboard, lab/testing..."
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Cover Image URL</label>
              <input
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://..."
                className={inputClass}
              />
              {coverImage && (
                <img src={coverImage} alt="cover preview" className="mt-2 h-32 rounded-lg object-cover border border-gray-200" />
              )}
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="space-y-6">
            <div>
              <label className={labelClass}>SEO Title</label>
              <input
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Override page title for search engines..."
                className={inputClass}
              />
              <p className="text-xs text-gray-400 mt-1 font-jost">{seoTitle.length}/60 chars recommended</p>
            </div>
            <div>
              <label className={labelClass}>SEO Description</label>
              <textarea
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                rows={3}
                placeholder="Meta description for search engines..."
                className={inputClass}
              />
              <p className="text-xs text-gray-400 mt-1 font-jost">{seoDescription.length}/160 chars recommended</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <p className="text-xs font-krona font-bold text-gray-500 mb-3">Search Preview</p>
              <p className="text-blue-700 text-base font-medium truncate">{seoTitle || title || 'Page Title'}</p>
              <p className="text-green-700 text-xs">asciende.pro/docs/{slug}</p>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">{seoDescription || excerpt || 'No description set.'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Docs Manager (list view) ─────────────────────────────────────────────────

export function DocsManager() {
  const [pages, setPages] = useState<DocsPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<DocsPage | null | 'new'>(null);
  const [filterSatellite, setFilterSatellite] = useState<DocsSatellite | 'all'>('all');
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  useEffect(() => { fetchPages(); }, []);

  async function fetchPages() {
    setLoading(true);
    const { data } = await supabase.from('docs_pages').select('*').order('order_index', { ascending: true });
    setPages(data || []);
    setLoading(false);
  }

  async function deletePage(id: string) {
    if (!confirm('Delete this docs page?')) return;
    await supabase.from('docs_pages').delete().eq('id', id);
    fetchPages();
  }

  async function togglePublished(page: DocsPage) {
    await supabase.from('docs_pages').update({ published: !page.published, updated_at: new Date().toISOString() }).eq('id', page.id);
    fetchPages();
  }

  if (editing !== null) {
    return (
      <DocsEditor
        page={editing === 'new' ? null : editing}
        allPages={pages}
        onSaved={() => { setEditing(null); fetchPages(); }}
        onCancel={() => setEditing(null)}
      />
    );
  }

  const filtered = filterSatellite === 'all' ? pages : pages.filter((p) => p.satellite === filterSatellite);
  const topLevel = filtered.filter((p) => !p.parent_slug);

  const statusColors: Record<string, string> = {
    alpha: 'bg-red-100 text-red-600',
    beta: 'bg-yellow-100 text-yellow-700',
    experimental: 'bg-orange-100 text-orange-600',
    stable: 'bg-green-100 text-green-700',
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-krona font-bold text-gray-900">Docs Manager</h2>
          <p className="text-sm font-jost text-gray-500 mt-1">{pages.length} pages across {SATELLITES.length} satellites</p>
        </div>
        <button
          onClick={() => setEditing('new')}
          className="flex items-center gap-2 px-4 py-2 bg-asciende-purple text-white rounded-lg text-sm font-krona font-bold hover:bg-asciende-purple/90 transition"
        >
          <Plus className="w-4 h-4" />
          New Page
        </button>
      </div>

      {/* Satellite filter */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setFilterSatellite('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-krona font-bold transition ${filterSatellite === 'all' ? 'bg-asciende-purple text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          All
        </button>
        {SATELLITES.map((s) => (
          <button
            key={s.value}
            onClick={() => setFilterSatellite(s.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-krona font-bold transition ${filterSatellite === s.value ? 'bg-asciende-purple text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="w-8 h-8 border-2 border-asciende-purple border-t-transparent rounded-full animate-spin" />
        </div>
      ) : topLevel.length === 0 ? (
        <div className="text-center py-16 text-gray-400 font-jost">
          <p className="text-lg mb-2">No docs pages yet.</p>
          <p className="text-sm">Click "New Page" to create your first documentation page.</p>
        </div>
      ) : (
        <div className="space-y-1">
          {topLevel.map((p) => {
            const children = filtered.filter((c) => c.parent_slug === p.slug);
            const isCollapsed = collapsed.has(p.id);

            return (
              <div key={p.id} className="rounded-xl border border-gray-200 overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 transition">
                  <button
                    onClick={() => setCollapsed((prev) => { const n = new Set(prev); n.has(p.id) ? n.delete(p.id) : n.add(p.id); return n; })}
                    className="p-0.5 text-gray-400"
                  >
                    {children.length > 0
                      ? (isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)
                      : <span className="w-4 h-4 block" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-krona font-bold text-sm text-gray-900 truncate">{p.title}</span>
                      <span className={`text-[10px] font-krona px-1.5 py-0.5 rounded ${statusColors[p.status]}`}>{p.status}</span>
                      {p.version_label && <span className="text-[10px] font-jost px-1.5 py-0.5 rounded border border-gray-200 text-gray-400">{p.version_label}</span>}
                    </div>
                    <p className="text-xs font-jost text-gray-400 mt-0.5">/docs/{p.slug}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => togglePublished(p)} title={p.published ? 'Unpublish' : 'Publish'} className="p-2 rounded-lg hover:bg-gray-100 transition">
                      {p.published ? <Eye className="w-4 h-4 text-green-600" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
                    </button>
                    <button onClick={() => setEditing(p)} className="p-2 rounded-lg hover:bg-gray-100 transition">
                      <Edit2 className="w-4 h-4 text-gray-500" />
                    </button>
                    <button onClick={() => deletePage(p.id)} className="p-2 rounded-lg hover:bg-red-50 transition">
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>

                {!isCollapsed && children.length > 0 && (
                  <div className="border-t border-gray-100 bg-gray-50">
                    {children.map((child) => (
                      <div key={child.id} className="flex items-center gap-3 px-4 py-2.5 pl-12 hover:bg-gray-100 transition border-b border-gray-100 last:border-0">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-jost text-sm text-gray-700 truncate">{child.title}</span>
                            <span className={`text-[10px] font-krona px-1.5 py-0.5 rounded ${statusColors[child.status]}`}>{child.status}</span>
                          </div>
                          <p className="text-xs font-jost text-gray-400">/docs/{child.slug}</p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button onClick={() => togglePublished(child)} className="p-1.5 rounded hover:bg-gray-200 transition">
                            {child.published ? <Eye className="w-3.5 h-3.5 text-green-600" /> : <EyeOff className="w-3.5 h-3.5 text-gray-400" />}
                          </button>
                          <button onClick={() => setEditing(child)} className="p-1.5 rounded hover:bg-gray-200 transition">
                            <Edit2 className="w-3.5 h-3.5 text-gray-500" />
                          </button>
                          <button onClick={() => deletePage(child.id)} className="p-1.5 rounded hover:bg-red-50 transition">
                            <Trash2 className="w-3.5 h-3.5 text-red-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

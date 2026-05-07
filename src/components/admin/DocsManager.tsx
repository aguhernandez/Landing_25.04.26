import { useState, useEffect } from 'react';
import { supabase, DocsPage, DocsSatellite, DocsStatus } from '../../lib/supabase';
import { Plus, CreditCard as Edit2, Trash2, Eye, EyeOff, ChevronDown, ChevronRight, GripVertical, X, Save, ArrowLeft } from 'lucide-react';

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
  const [contentMarkdown, setContentMarkdown] = useState(page?.content_markdown || '');
  const [contentHtml, setContentHtml] = useState(page?.content_html || '');
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
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm font-jost text-gray-600">{published ? 'Published' : 'Draft'}</span>
            <div
              onClick={() => setPublished(!published)}
              className={`w-10 h-5 rounded-full relative transition-colors ${published ? 'bg-green-500' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${published ? 'left-5' : 'left-0.5'}`} />
            </div>
          </label>
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
              <label className={labelClass}>Content (HTML)</label>
              <textarea
                value={contentHtml}
                onChange={(e) => setContentHtml(e.target.value)}
                rows={18}
                placeholder="<h1>Title</h1><p>Content...</p>"
                className={`${inputClass} font-mono text-xs leading-relaxed`}
              />
            </div>

            <div>
              <label className={labelClass}>Content (Markdown — for search & AI)</label>
              <textarea
                value={contentMarkdown}
                onChange={(e) => setContentMarkdown(e.target.value)}
                rows={8}
                placeholder="# Title&#10;&#10;Content in markdown..."
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
              <label className={labelClass}>Tags (comma-separated)</label>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="vo2, lactate, endurance..."
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Related Docs Slugs (comma-separated)</label>
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
            <div className={`p-4 rounded-xl bg-gray-50 border border-gray-200`}>
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
                    {children.length > 0 ? (isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />) : <span className="w-4 h-4 block" />}
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

import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase, BlogPost, BlogBlock, BlogCategory, BlogAuthor } from '../../lib/supabase';
import {
  Plus, Trash2, GripVertical, ChevronUp, ChevronDown,
  Type, Image, Video, X, ArrowLeft, Save, Eye, EyeOff,
  Bold, Italic, Underline, List, Heading2, AlignLeft, Link2
} from 'lucide-react';

// ─── Rich Text Editor ─────────────────────────────────────────────────────────

function RichTextEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalUpdate = useRef(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  // Sync value → DOM only when it changes externally (not from user typing)
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

  const isActive = (cmd: string) => {
    try { return document.queryCommandState(cmd); } catch { return false; }
  };

  const handleAddLink = () => {
    if (!linkUrl.trim()) return;
    exec('createLink', linkUrl);
    setLinkUrl('');
    setShowLinkDialog(false);
  };

  const toolbarBtn = (
    cmd: string,
    icon: React.ReactNode,
    title: string,
    val?: string
  ) => (
    <button
      type="button"
      onMouseDown={e => { e.preventDefault(); exec(cmd, val); }}
      title={title}
      className={`p-1.5 rounded transition-colors ${
        isActive(cmd)
          ? 'bg-asciende-purple text-white'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      {icon}
    </button>
  );

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-asciende-purple focus-within:border-transparent">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 bg-gray-50 border-b border-gray-200 flex-wrap">
        {toolbarBtn('bold', <Bold size={14} />, 'Negrita')}
        {toolbarBtn('italic', <Italic size={14} />, 'Cursiva')}
        {toolbarBtn('underline', <Underline size={14} />, 'Subrayado')}
        <div className="w-px h-5 bg-gray-300 mx-1" />
        {toolbarBtn('formatBlock', <Heading2 size={14} />, 'Título H2', 'h2')}
        {toolbarBtn('formatBlock', <AlignLeft size={14} />, 'Párrafo', 'p')}
        <div className="w-px h-5 bg-gray-300 mx-1" />
        {toolbarBtn('insertUnorderedList', <List size={14} />, 'Lista con viñetas')}
        <div className="w-px h-5 bg-gray-300 mx-1" />
        <button
          type="button"
          onMouseDown={e => { e.preventDefault(); setShowLinkDialog(true); }}
          title="Agregar enlace"
          className="p-1.5 rounded text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <Link2 size={14} />
        </button>
        <div className="w-px h-5 bg-gray-300 mx-1" />
        <button
          type="button"
          onMouseDown={e => { e.preventDefault(); exec('fontSize', '4'); }}
          title="Texto grande"
          className="px-2 py-1 rounded text-xs font-semibold text-gray-600 hover:bg-gray-100 transition"
        >
          A+
        </button>
        <button
          type="button"
          onMouseDown={e => { e.preventDefault(); exec('fontSize', '2'); }}
          title="Texto pequeño"
          className="px-2 py-1 rounded text-xs text-gray-500 hover:bg-gray-100 transition"
        >
          A-
        </button>
      </div>
      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        className="min-h-[140px] px-3 py-2.5 text-sm font-jost text-gray-800 outline-none leading-relaxed
          [&_h2]:font-krona [&_h2]:font-bold [&_h2]:text-asciende-purple [&_h2]:text-base [&_h2]:mt-2 [&_h2]:mb-1
          [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-0.5
          [&_li]:font-jost [&_b]:font-semibold [&_strong]:font-semibold
          [&_a]:text-asciende-purple [&_a]:underline [&_a]:font-medium [&_a]:cursor-pointer"
        style={{ whiteSpace: 'pre-wrap' }}
      />

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowLinkDialog(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-krona font-bold text-asciende-purple mb-4">Agregar enlace</h3>
            <p className="text-sm text-gray-600 font-jost mb-4">Selecciona el texto que quieres que sea un enlace, luego ingresa la URL.</p>
            <div className="space-y-3">
              <input
                type="url"
                value={linkUrl}
                onChange={e => setLinkUrl(e.target.value)}
                placeholder="https://ejemplo.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none font-jost text-sm"
                onKeyDown={e => { if (e.key === 'Enter') handleAddLink(); }}
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddLink}
                  className="flex-1 px-3 py-2 bg-asciende-purple text-white rounded-lg hover:opacity-90 transition font-jost text-sm font-medium"
                >
                  Agregar
                </button>
                <button
                  onClick={() => { setShowLinkDialog(false); setLinkUrl(''); }}
                  className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-jost text-sm font-medium"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type BlockType = 'text' | 'image' | 'video';

interface LocalBlock {
  localId: string;
  id?: string;
  type: BlockType;
  subtitle?: string;
  content?: string;
  url?: string;
  caption?: string;
  block_order: number;
}

interface BlogPostEditorProps {
  post: BlogPost | null;
  onSaved: () => void;
  onCancel: () => void;
}

let localCounter = 0;
function makeLocalId() {
  return `local-${++localCounter}`;
}

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function BlogPostEditor({ post, onSaved, onCancel }: BlogPostEditorProps) {
  const [title, setTitle] = useState(post?.title || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [featuredText, setFeaturedText] = useState(post?.featured_text || '');
  const [featuredImage, setFeaturedImage] = useState(post?.featured_image || '');
  const [featuredVideo, setFeaturedVideo] = useState(post?.featured_video || '');
  const [categoryId, setCategoryId] = useState(post?.category_id || '');
  const [authorId, setAuthorId] = useState(post?.author_id || '');
  const [language, setLanguage] = useState<'en' | 'es'>(post?.language || 'en');
  const [published, setPublished] = useState(post?.published || false);
  const [blocks, setBlocks] = useState<LocalBlock[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [authors, setAuthors] = useState<BlogAuthor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragRef = useRef<number | null>(null);

  const categorySlug = categories.find(c => c.id === categoryId)?.slug || 'uncategorized';
  const postSlug = generateSlug(title) || 'sin-titulo';
  const slugPreview = `/stories/${categorySlug}/${postSlug}`;

  useEffect(() => {
    fetchMeta();
    if (post?.id) fetchBlocks(post.id);
  }, []);

  const fetchMeta = async () => {
    const [catRes, authRes] = await Promise.all([
      supabase.from('blog_categories').select('*').order('name'),
      supabase.from('blog_authors').select('*').order('name'),
    ]);
    if (!catRes.error) setCategories(catRes.data || []);
    if (!authRes.error) setAuthors(authRes.data || []);
  };

  const fetchBlocks = async (postId: string) => {
    const { data, error } = await supabase
      .from('blog_blocks')
      .select('*')
      .eq('post_id', postId)
      .order('block_order');
    if (!error && data) {
      setBlocks(data.map(b => ({ ...b, localId: makeLocalId() })));
    }
  };

  const addBlock = (type: BlockType) => {
    setBlocks(prev => [
      ...prev,
      { localId: makeLocalId(), type, block_order: prev.length, subtitle: '', content: '', url: '', caption: '' }
    ]);
  };

  const updateBlock = (localId: string, field: string, value: string) => {
    setBlocks(prev => prev.map(b => b.localId === localId ? { ...b, [field]: value } : b));
  };

  const removeBlock = (localId: string) => {
    setBlocks(prev => prev.filter(b => b.localId !== localId).map((b, i) => ({ ...b, block_order: i })));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    setBlocks(prev => {
      const next = [...prev];
      const swapWith = direction === 'up' ? index - 1 : index + 1;
      if (swapWith < 0 || swapWith >= next.length) return prev;
      [next[index], next[swapWith]] = [next[swapWith], next[index]];
      return next.map((b, i) => ({ ...b, block_order: i }));
    });
  };

  // Drag and drop handlers
  const handleDragStart = (index: number) => {
    setDragIndex(index);
    dragRef.current = index;
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const from = dragRef.current;
    if (from === null || from === dropIndex) return;
    setBlocks(prev => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(dropIndex, 0, moved);
      return next.map((b, i) => ({ ...b, block_order: i }));
    });
    setDragIndex(null);
    setDragOverIndex(null);
    dragRef.current = null;
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
    dragRef.current = null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const slug = generateSlug(title);
      let postId = post?.id;

      if (postId) {
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update({
            title,
            excerpt,
            featured_text: featuredText,
            featured_image: featuredImage || null,
            featured_video: featuredVideo || null,
            category_id: categoryId || null,
            author_id: authorId || null,
            language,
            published,
            slug,
            updated_at: new Date().toISOString(),
          })
          .eq('id', postId);
        if (updateError) throw updateError;
      } else {
        const { data: newPost, error: insertError } = await supabase
          .from('blog_posts')
          .insert({
            title,
            excerpt,
            featured_text: featuredText,
            featured_image: featuredImage || null,
            featured_video: featuredVideo || null,
            category_id: categoryId || null,
            author_id: authorId || null,
            language,
            published,
            slug,
            content: '',
          })
          .select()
          .single();
        if (insertError) throw insertError;
        postId = newPost.id;
      }

      // Replace all blocks
      await supabase.from('blog_blocks').delete().eq('post_id', postId);
      if (blocks.length > 0) {
        const { error: blocksError } = await supabase.from('blog_blocks').insert(
          blocks.map((b, i) => ({
            post_id: postId,
            type: b.type,
            subtitle: b.subtitle || null,
            content: b.content || null,
            url: b.url || null,
            caption: b.caption || null,
            block_order: i,
          }))
        );
        if (blocksError) throw blocksError;
      }

      onSaved();
    } catch (err: any) {
      setError(err.message || 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button onClick={onCancel} className="flex items-center gap-2 text-gray-500 hover:text-asciende-purple transition font-jost text-sm">
          <ArrowLeft size={16} />
          Volver
        </button>
        <h3 className="text-2xl font-krona font-bold text-asciende-purple">
          {post ? 'Editar Post' : 'Nuevo Post'}
        </h3>
        <div className="w-20" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
          <h4 className="font-krona font-bold text-asciende-purple text-sm uppercase tracking-wide">Información Básica</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-jost font-semibold text-gray-700 mb-1">Título *</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none transition font-jost"
              />
            </div>

            <div>
              <label className="block text-sm font-jost font-semibold text-gray-700 mb-1">Categoría *</label>
              <select
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none transition font-jost"
              >
                <option value="">Seleccionar categoría</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Slug preview */}
          {(title || categoryId) && (
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
              <span className="text-xs font-jost text-gray-400 uppercase tracking-wide">URL de la historia:</span>
              <p className="font-jost text-sm text-asciende-purple font-medium mt-0.5">{slugPreview}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-jost font-semibold text-gray-700 mb-1">Extracto</label>
            <textarea
              value={excerpt}
              onChange={e => setExcerpt(e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none transition font-jost"
            />
          </div>

          <div>
            <label className="block text-sm font-jost font-semibold text-gray-700 mb-1">Texto Destacado (teaser modal)</label>
            <textarea
              value={featuredText}
              onChange={e => setFeaturedText(e.target.value)}
              rows={2}
              placeholder="Párrafo de apertura que aparece en el teaser antes de abrir el artículo completo"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none transition font-jost"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-jost font-semibold text-gray-700 mb-1">Imagen Destacada (URL)</label>
              <input
                type="text"
                value={featuredImage}
                onChange={e => setFeaturedImage(e.target.value)}
                placeholder="/imagen.jpg o https://..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none transition font-jost"
              />
            </div>
            <div>
              <label className="block text-sm font-jost font-semibold text-gray-700 mb-1">Video Destacado (URL, opcional)</label>
              <input
                type="text"
                value={featuredVideo}
                onChange={e => setFeaturedVideo(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none transition font-jost"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-jost font-semibold text-gray-700 mb-1">Autor</label>
              <select
                value={authorId}
                onChange={e => setAuthorId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none transition font-jost"
              >
                <option value="">Sin autor</option>
                {authors.map(a => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-jost font-semibold text-gray-700 mb-1">Idioma del post</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setLanguage('es')}
                  className={`flex-1 py-2 rounded-lg font-jost font-semibold text-sm border-2 transition ${language === 'es' ? 'bg-asciende-purple text-white border-asciende-purple' : 'bg-white text-gray-600 border-gray-300 hover:border-asciende-purple/50'}`}
                >
                  Español
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`flex-1 py-2 rounded-lg font-jost font-semibold text-sm border-2 transition ${language === 'en' ? 'bg-asciende-purple text-white border-asciende-purple' : 'bg-white text-gray-600 border-gray-300 hover:border-asciende-purple/50'}`}
                >
                  English
                </button>
              </div>
            </div>

            <div className="flex items-end pb-1">
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setPublished(!published)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${published ? 'bg-emerald-500' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${published ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
                <span className="font-jost text-sm text-gray-700">
                  {published ? 'Publicado' : 'Borrador'}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Block Builder */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-krona font-bold text-asciende-purple text-sm uppercase tracking-wide">Contenido del Artículo</h4>
            <p className="text-xs text-gray-400 font-jost">Arrastrá para reordenar</p>
          </div>

          {/* Blocks list */}
          <div className="space-y-3 mb-4">
            {blocks.length === 0 && (
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center">
                <p className="text-gray-400 font-jost text-sm">Agregá bloques de contenido usando los botones de abajo</p>
              </div>
            )}
            {blocks.map((block, index) => (
              <div
                key={block.localId}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={e => handleDragOver(e, index)}
                onDrop={e => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className={`border rounded-xl transition-all ${
                  dragOverIndex === index && dragIndex !== index
                    ? 'border-asciende-purple bg-asciende-purple/5 scale-[1.01]'
                    : dragIndex === index
                    ? 'border-gray-300 opacity-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {/* Block header */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                  <div className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 transition">
                    <GripVertical size={18} />
                  </div>
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-jost font-semibold ${
                    block.type === 'text' ? 'bg-blue-100 text-blue-700' :
                    block.type === 'image' ? 'bg-green-100 text-green-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {block.type === 'text' && <Type size={12} />}
                    {block.type === 'image' && <Image size={12} />}
                    {block.type === 'video' && <Video size={12} />}
                    {block.type === 'text' ? 'Texto (2 columnas)' : block.type === 'image' ? 'Imagen' : 'Video'}
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <button type="button" onClick={() => moveBlock(index, 'up')} disabled={index === 0} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-20 transition">
                      <ChevronUp size={16} />
                    </button>
                    <button type="button" onClick={() => moveBlock(index, 'down')} disabled={index === blocks.length - 1} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-20 transition">
                      <ChevronDown size={16} />
                    </button>
                    <button type="button" onClick={() => removeBlock(block.localId)} className="p-1 text-red-400 hover:text-red-600 transition ml-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Block content inputs */}
                <div className="p-4">
                  {block.type === 'text' && (
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-4">
                        <label className="block text-xs font-jost font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Subtítulo (col. izquierda)</label>
                        <input
                          type="text"
                          value={block.subtitle || ''}
                          onChange={e => updateBlock(block.localId, 'subtitle', e.target.value)}
                          placeholder="Subtítulo en Krona One"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none transition font-jost"
                        />
                        <p className="text-xs text-gray-400 mt-1 font-jost">35% — Krona One</p>
                      </div>
                      <div className="col-span-8">
                        <label className="block text-xs font-jost font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Contenido (col. derecha)</label>
                        <RichTextEditor
                          value={block.content || ''}
                          onChange={html => updateBlock(block.localId, 'content', html)}
                        />
                        <p className="text-xs text-gray-400 mt-1 font-jost">65% — Jost · Texto enriquecido</p>
                      </div>
                    </div>
                  )}

                  {block.type === 'image' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-jost font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">URL de la Imagen</label>
                        <input
                          type="text"
                          value={block.url || ''}
                          onChange={e => updateBlock(block.localId, 'url', e.target.value)}
                          placeholder="/imagen.jpg o https://..."
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none transition font-jost"
                        />
                      </div>
                      {block.url && (
                        <div className="rounded-lg overflow-hidden h-32 bg-gray-100">
                          <img src={block.url} alt="preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <label className="block text-xs font-jost font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Epígrafe (opcional)</label>
                        <input
                          type="text"
                          value={block.caption || ''}
                          onChange={e => updateBlock(block.localId, 'caption', e.target.value)}
                          placeholder="Descripción de la imagen"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none transition font-jost"
                        />
                      </div>
                    </div>
                  )}

                  {block.type === 'video' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-jost font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">URL del Video (YouTube / Vimeo)</label>
                        <input
                          type="text"
                          value={block.url || ''}
                          onChange={e => updateBlock(block.localId, 'url', e.target.value)}
                          placeholder="https://www.youtube.com/watch?v=..."
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none transition font-jost"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-jost font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Epígrafe (opcional)</label>
                        <input
                          type="text"
                          value={block.caption || ''}
                          onChange={e => updateBlock(block.localId, 'caption', e.target.value)}
                          placeholder="Descripción del video"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none transition font-jost"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add block buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => addBlock('text')}
              className="flex items-center gap-2 px-4 py-2.5 border-2 border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 transition font-jost text-sm font-medium"
            >
              <Type size={16} />
              Agregar Texto (2 columnas)
            </button>
            <button
              type="button"
              onClick={() => addBlock('image')}
              className="flex items-center gap-2 px-4 py-2.5 border-2 border-green-200 text-green-700 rounded-lg hover:bg-green-50 transition font-jost text-sm font-medium"
            >
              <Image size={16} />
              Agregar Imagen
            </button>
            <button
              type="button"
              onClick={() => addBlock('video')}
              className="flex items-center gap-2 px-4 py-2.5 border-2 border-orange-200 text-orange-700 rounded-lg hover:bg-orange-50 transition font-jost text-sm font-medium"
            >
              <Video size={16} />
              Agregar Video
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-jost">
            {error}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-asciende-purple text-white px-8 py-3 rounded-lg font-krona font-bold hover:opacity-90 transition disabled:opacity-50"
          >
            <Save size={18} />
            {loading ? 'Guardando...' : 'Guardar Post'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-krona font-bold hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

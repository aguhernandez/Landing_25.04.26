import { useState, useEffect, useRef } from 'react';
import { supabase, BlogAuthor } from '../../lib/supabase';
import { Plus, Save, Upload, User, Image as ImageIcon, X, Check, AlertCircle, ArrowLeft, Trash2, Instagram, Link, CreditCard as Edit2 } from 'lucide-react';

type View = 'list' | 'edit';

interface AuthorFormState {
  name: string;
  bio: string;
  bioEn: string;
  bioEs: string;
  photoUrl: string;
  url: string;
  instagramUrl: string;
}

const emptyForm = (): AuthorFormState => ({
  name: '',
  bio: '',
  bioEn: '',
  bioEs: '',
  photoUrl: '',
  url: '',
  instagramUrl: '',
});

export function AuthorProfile() {
  const [authors, setAuthors] = useState<BlogAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<AuthorFormState>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [mediaFiles, setMediaFiles] = useState<{ name: string; url: string }[]>([]);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('blog_authors')
      .select('*')
      .order('name');
    if (data) setAuthors(data);
    setLoading(false);
  };

  const fetchMedia = async () => {
    const { data } = await supabase.storage
      .from('media')
      .list('', { sortBy: { column: 'created_at', order: 'desc' } });
    if (data) {
      setMediaFiles(
        data
          .filter(f => f.name !== '.emptyFolderPlaceholder')
          .map(f => {
            const { data: urlData } = supabase.storage.from('media').getPublicUrl(f.name);
            return { name: f.name, url: urlData.publicUrl };
          })
      );
    }
  };

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm());
    setError('');
    setSaved(false);
    setView('edit');
  };

  const openEdit = (author: BlogAuthor) => {
    setEditingId(author.id);
    setForm({
      name: author.name,
      bio: author.bio || '',
      bioEn: author.bio_en || '',
      bioEs: author.bio_es || '',
      photoUrl: author.photo_url || '',
      url: author.url || '',
      instagramUrl: author.instagram_url || '',
    });
    setError('');
    setSaved(false);
    setView('edit');
  };

  const uploadPhoto = async (file: File) => {
    if (!file.type.startsWith('image/')) { setError('Solo se permiten imágenes'); return; }
    setUploading(true);
    setError('');
    const fileName = `author-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    try {
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(fileName, file, { upsert: false });
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage.from('media').getPublicUrl(fileName);
      setForm(f => ({ ...f, photoUrl: urlData.publicUrl }));
      await fetchMedia();
    } catch (err: any) {
      setError(err.message || 'Error al subir la foto');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.name.trim()) { setError('El nombre es requerido'); return; }
    setSaving(true);
    setError('');
    try {
      const payload = {
        name: form.name.trim(),
        bio: form.bio.trim() || null,
        bio_en: form.bioEn.trim() || null,
        bio_es: form.bioEs.trim() || null,
        photo_url: form.photoUrl || null,
        url: form.url.trim() || null,
        instagram_url: form.instagramUrl.trim() || null,
        updated_at: new Date().toISOString(),
      };
      if (editingId) {
        const { error } = await supabase.from('blog_authors').update(payload).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('blog_authors').insert(payload);
        if (error) throw error;
      }
      setSaved(true);
      await fetchAuthors();
      setTimeout(() => { setSaved(false); setView('list'); }, 1200);
    } catch (err: any) {
      setError(err.message || 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('blog_authors').delete().eq('id', id);
    if (!error) {
      setAuthors(prev => prev.filter(a => a.id !== id));
      setDeleteConfirm(null);
    }
  };

  const set = (field: keyof AuthorFormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  // ─── List view ──────────────────────────────────────────────────────────────
  if (view === 'list') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-krona font-bold text-asciende-purple">Autores</h2>
          <button
            onClick={openNew}
            className="flex items-center gap-2 bg-asciende-purple text-white px-5 py-2 rounded-lg hover:opacity-90 transition font-krona text-sm"
          >
            <Plus size={16} />
            Nuevo Autor
          </button>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-400 font-jost">Cargando...</div>
        ) : authors.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-16 text-center text-gray-400 font-jost">
            <User size={40} className="mx-auto mb-3 opacity-30" />
            <p>No hay autores. Crea el primero.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {authors.map(author => (
              <div
                key={author.id}
                className="bg-white rounded-xl border border-gray-100 px-6 py-5 flex items-center gap-5 hover:shadow-sm transition-shadow"
              >
                {/* Avatar */}
                {author.photo_url ? (
                  <img
                    src={author.photo_url}
                    alt={author.name}
                    className="w-14 h-14 rounded-full object-cover shrink-0 shadow-sm"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-asciende-purple/10 flex items-center justify-center shrink-0">
                    <span className="font-krona font-bold text-asciende-purple text-lg">{author.name.charAt(0)}</span>
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-krona font-bold text-asciende-purple text-base">{author.name}</h3>
                  {author.bio && (
                    <p className="font-jost text-gray-500 text-sm mt-0.5 line-clamp-1">{author.bio}</p>
                  )}
                  <div className="flex items-center gap-4 mt-1.5">
                    {author.url && (
                      <span className="flex items-center gap-1 text-xs font-jost text-gray-400">
                        <Link size={11} /><span className="truncate max-w-[160px]">{author.url}</span>
                      </span>
                    )}
                    {author.instagram_url && (
                      <span className="flex items-center gap-1 text-xs font-jost text-gray-400">
                        <Instagram size={11} />{author.instagram_url.replace(/^https?:\/\/(www\.)?instagram\.com\/?/, '@').replace(/\/$/, '')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openEdit(author)}
                    className="p-2 hover:bg-asciende-purple/10 text-asciende-purple rounded-lg transition"
                    title="Editar"
                  >
                    <Edit2 size={16} />
                  </button>
                  {deleteConfirm === author.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(author.id)}
                        className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-jost hover:bg-red-600 transition flex items-center gap-1"
                      >
                        <Check size={12} /> Confirmar
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-3 py-1.5 bg-gray-200 text-gray-600 rounded-lg text-xs font-jost hover:bg-gray-300 transition"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(author.id)}
                      className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition"
                      title="Eliminar"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ─── Edit / New view ────────────────────────────────────────────────────────
  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView('list')}
            className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-500"
          >
            <ArrowLeft size={18} />
          </button>
          <h2 className="text-2xl font-krona font-bold text-asciende-purple">
            {editingId ? 'Editar Autor' : 'Nuevo Autor'}
          </h2>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg font-krona text-sm transition ${
            saved ? 'bg-emerald-500 text-white' : 'bg-asciende-purple text-white hover:opacity-90'
          } disabled:opacity-50`}
        >
          {saved ? <><Check size={16} /> Guardado</> : <><Save size={16} />{saving ? 'Guardando...' : 'Guardar'}</>}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg font-jost text-sm">
          <AlertCircle size={16} className="shrink-0" />
          <span className="flex-1">{error}</span>
          <button onClick={() => setError('')}><X size={14} /></button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">

        {/* Photo */}
        <div>
          <h3 className="font-krona font-bold text-asciende-purple text-sm uppercase tracking-wide mb-4">Foto de Perfil</h3>
          <div className="flex items-start gap-6">
            <div className="shrink-0">
              {form.photoUrl ? (
                <div className="relative group">
                  <img
                    src={form.photoUrl}
                    alt="Foto"
                    className="w-28 h-28 rounded-full object-cover shadow-md border-4 border-white ring-2 ring-asciende-purple/20"
                  />
                  <button
                    onClick={() => setForm(f => ({ ...f, photoUrl: '' }))}
                    className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <div className="w-28 h-28 rounded-full bg-asciende-purple/10 flex items-center justify-center border-2 border-dashed border-asciende-purple/30">
                  <User size={32} className="text-asciende-purple/40" />
                </div>
              )}
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-asciende-purple/30 text-asciende-purple rounded-lg hover:bg-asciende-purple/5 transition font-jost text-sm font-medium disabled:opacity-50"
                >
                  <Upload size={15} />
                  {uploading ? 'Subiendo...' : 'Subir foto'}
                </button>
                <button
                  type="button"
                  onClick={() => { fetchMedia(); setShowMediaPicker(true); }}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition font-jost text-sm font-medium"
                >
                  <ImageIcon size={15} />
                  Elegir de Media
                </button>
              </div>
              {form.photoUrl && (
                <p className="text-xs text-gray-400 font-mono truncate bg-gray-50 px-3 py-2 rounded-lg">{form.photoUrl}</p>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={e => { const f = e.target.files?.[0]; if (f) uploadPhoto(f); e.target.value = ''; }}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-xs font-jost font-semibold text-gray-500 mb-2 uppercase tracking-wide">Nombre y Apellido *</label>
          <input
            type="text"
            value={form.name}
            onChange={set('name')}
            placeholder="Ej: Juan García"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none transition font-jost"
          />
        </div>

        {/* Bio EN/ES */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-jost font-semibold text-gray-500 mb-2 uppercase tracking-wide">Bibliografía / Bio en Inglés</label>
            <textarea
              value={form.bioEn}
              onChange={set('bioEn')}
              rows={4}
              placeholder="Breve presentación del autor en inglés. Aparece al final de artículos en inglés."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none transition font-jost resize-none text-sm leading-relaxed"
            />
          </div>
          <div>
            <label className="block text-xs font-jost font-semibold text-gray-500 mb-2 uppercase tracking-wide">Bibliografía / Bio en Español</label>
            <textarea
              value={form.bioEs}
              onChange={set('bioEs')}
              rows={4}
              placeholder="Breve presentación del autor en español. Aparece al final de artículos en español."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none transition font-jost resize-none text-sm leading-relaxed"
            />
          </div>
        </div>

        {/* URL + Instagram */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-jost font-semibold text-gray-500 mb-2 uppercase tracking-wide">URL del Autor</label>
            <div className="relative">
              <Link size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                value={form.url}
                onChange={set('url')}
                placeholder="https://asciende.com/athlete/juan"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none transition font-jost text-sm"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1 font-jost">Puede ser una página de Asciende u otro sitio</p>
          </div>
          <div>
            <label className="block text-xs font-jost font-semibold text-gray-500 mb-2 uppercase tracking-wide">Instagram</label>
            <div className="relative">
              <Instagram size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={form.instagramUrl}
                onChange={set('instagramUrl')}
                placeholder="usuario o @usuario"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none transition font-jost text-sm"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1 font-jost">Podés poner el @usuario, el handle sin @ o la URL completa</p>
          </div>
        </div>

        {/* Preview */}
        <div>
          <h4 className="text-xs font-jost font-semibold text-gray-500 mb-3 uppercase tracking-wide">Vista previa (al final del artículo)</h4>
          <AuthorPreview form={form} />
        </div>
      </div>

      {/* Media picker */}
      {showMediaPicker && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setShowMediaPicker(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-krona font-bold text-asciende-purple">Elegir de Media</h3>
              <button onClick={() => setShowMediaPicker(false)} className="p-2 hover:bg-gray-100 rounded-lg transition">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {mediaFiles.length === 0 ? (
                <div className="text-center py-12 text-gray-400 font-jost">
                  <ImageIcon size={32} className="mx-auto mb-3 opacity-30" />
                  <p>No hay imágenes en Media todavía.</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {mediaFiles.map(f => (
                    <button
                      key={f.name}
                      onClick={() => { setForm(prev => ({ ...prev, photoUrl: f.url })); setShowMediaPicker(false); }}
                      className="group aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-asciende-purple transition"
                    >
                      <img src={f.url} alt={f.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function normalizeInstagramDisplay(raw: string): string {
  if (!raw) return '';
  const clean = raw.trim();
  if (/^https?:\/\//i.test(clean))
    return clean.replace(/^https?:\/\/(www\.)?instagram\.com\/?/, '@').replace(/\/$/, '');
  return clean.startsWith('@') ? clean : `@${clean}`;
}

function AuthorPreview({ form }: { form: AuthorFormState }) {
  const instagramHandle = normalizeInstagramDisplay(form.instagramUrl);

  return (
    <div className="space-y-4">
      {/* EN Preview */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
        <p className="text-xs font-jost font-semibold text-gray-400 uppercase tracking-widest mb-3">English Version</p>
        <div className="flex items-start gap-5 mb-4">
          {form.photoUrl ? (
            <img src={form.photoUrl} alt={form.name} className="w-16 h-16 rounded-full object-cover shrink-0 shadow-md" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-asciende-purple/10 flex items-center justify-center shrink-0">
              <span className="text-asciende-purple font-krona font-bold text-xl">{form.name.charAt(0) || 'A'}</span>
            </div>
          )}
          <div className="flex-1">
            <p className="text-xs font-jost font-semibold text-gray-400 uppercase tracking-widest mb-1">Written by</p>
            <h4 className="font-krona font-bold text-asciende-purple text-lg mb-1.5">{form.name || 'Author name'}</h4>
            {form.bioEn && (
              <p className="font-jost text-gray-600 text-sm leading-relaxed line-clamp-2">{form.bioEn}</p>
            )}
          </div>
        </div>
        {(form.url || form.instagramUrl) && (
          <div className="border-t border-gray-200 pt-4 flex flex-wrap gap-4">
            {form.url && (
              <div className="flex items-center gap-2 text-sm font-jost text-gray-500">
                <span className="text-xs text-gray-400">More information:</span>
                <span className="text-asciende-purple font-medium truncate max-w-[200px]">{form.url}</span>
              </div>
            )}
            {instagramHandle && (
              <div className="flex items-center gap-2 text-sm">
                <Instagram size={15} className="text-pink-500" />
                <span className="font-jost font-medium text-pink-600">{instagramHandle}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ES Preview */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
        <p className="text-xs font-jost font-semibold text-gray-400 uppercase tracking-widest mb-3">Spanish Version</p>
        <div className="flex items-start gap-5 mb-4">
          {form.photoUrl ? (
            <img src={form.photoUrl} alt={form.name} className="w-16 h-16 rounded-full object-cover shrink-0 shadow-md" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-asciende-purple/10 flex items-center justify-center shrink-0">
              <span className="text-asciende-purple font-krona font-bold text-xl">{form.name.charAt(0) || 'A'}</span>
            </div>
          )}
          <div className="flex-1">
            <p className="text-xs font-jost font-semibold text-gray-400 uppercase tracking-widest mb-1">Escrito por</p>
            <h4 className="font-krona font-bold text-asciende-purple text-lg mb-1.5">{form.name || 'Nombre del autor'}</h4>
            {form.bioEs && (
              <p className="font-jost text-gray-600 text-sm leading-relaxed line-clamp-2">{form.bioEs}</p>
            )}
          </div>
        </div>
        {(form.url || form.instagramUrl) && (
          <div className="border-t border-gray-200 pt-4 flex flex-wrap gap-4">
            {form.url && (
              <div className="flex items-center gap-2 text-sm font-jost text-gray-500">
                <span className="text-xs text-gray-400">Más información:</span>
                <span className="text-asciende-purple font-medium truncate max-w-[200px]">{form.url}</span>
              </div>
            )}
            {instagramHandle && (
              <div className="flex items-center gap-2 text-sm">
                <Instagram size={15} className="text-pink-500" />
                <span className="font-jost font-medium text-pink-600">{instagramHandle}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

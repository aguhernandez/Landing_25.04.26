import { useState, useEffect } from 'react';
import { supabase, BlogCategory } from '../../lib/supabase';
import { Plus, Trash2, CreditCard as Edit2, Check, X, Tag } from 'lucide-react';

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

export function CategoryManager() {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editLang, setEditLang] = useState<'en' | 'es'>('en');
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newLang, setNewLang] = useState<'en' | 'es'>('en');
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name');
    if (!error) setCategories(data || []);
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!newName.trim()) return;
    setSaving(true);
    setError('');
    const slug = generateSlug(newName);
    const { error } = await supabase.from('blog_categories').insert({
      name: newName.trim(),
      slug,
      description: newDesc.trim() || null,
      language: newLang,
    });
    if (error) {
      setError(error.message);
    } else {
      setNewName('');
      setNewDesc('');
      setNewLang('en');
      setAdding(false);
      fetchCategories();
    }
    setSaving(false);
  };

  const startEdit = (cat: BlogCategory) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditDesc(cat.description || '');
    setEditLang(cat.language || 'en');
    setError('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditDesc('');
    setEditLang('en');
    setError('');
  };

  const handleSaveEdit = async (id: string) => {
    if (!editName.trim()) return;
    setSaving(true);
    setError('');
    const slug = generateSlug(editName);
    const { error } = await supabase
      .from('blog_categories')
      .update({ name: editName.trim(), slug, description: editDesc.trim() || null, language: editLang, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (error) {
      setError(error.message);
    } else {
      cancelEdit();
      fetchCategories();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Eliminar la categoría "${name}"? Los posts con esta categoría quedarán sin categoría.`)) return;
    const { error } = await supabase.from('blog_categories').delete().eq('id', id);
    if (!error) fetchCategories();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-krona font-bold text-asciende-purple">Categorías</h2>
        <button
          onClick={() => { setAdding(true); setError(''); }}
          className="flex items-center gap-2 bg-asciende-purple text-white px-5 py-2 rounded-lg hover:opacity-90 transition font-krona text-sm"
        >
          <Plus size={18} />
          Nueva Categoría
        </button>
      </div>

      {/* Add form */}
      {adding && (
        <div className="bg-white rounded-xl shadow-sm border border-asciende-purple/30 p-6 space-y-4">
          <h4 className="font-krona font-bold text-asciende-purple">Nueva Categoría</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-jost font-semibold text-gray-500 mb-1 uppercase tracking-wide">Nombre *</label>
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="Ej: Guías de Entrenamiento"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none transition font-jost"
                autoFocus
              />
              {newName && (
                <p className="text-xs text-gray-400 mt-1 font-jost">Slug: /{generateSlug(newName)}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-jost font-semibold text-gray-500 mb-1 uppercase tracking-wide">Descripción (opcional)</label>
              <input
                type="text"
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
                placeholder="Breve descripción"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none transition font-jost"
              />
            </div>
            <div>
              <label className="block text-xs font-jost font-semibold text-gray-500 mb-1 uppercase tracking-wide">Idioma *</label>
              <select
                value={newLang}
                onChange={e => setNewLang(e.target.value as 'en' | 'es')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none transition font-jost"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
          {error && <p className="text-red-600 text-sm font-jost">{error}</p>}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleAdd}
              disabled={!newName.trim() || saving}
              className="flex items-center gap-2 bg-asciende-purple text-white px-5 py-2 rounded-lg font-krona text-sm hover:opacity-90 transition disabled:opacity-50"
            >
              <Check size={16} />
              Guardar
            </button>
            <button
              type="button"
              onClick={() => { setAdding(false); setNewName(''); setNewDesc(''); setError(''); }}
              className="flex items-center gap-2 bg-gray-100 text-gray-600 px-5 py-2 rounded-lg font-krona text-sm hover:bg-gray-200 transition"
            >
              <X size={16} />
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Categories list */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500 font-jost">Cargando...</div>
        ) : categories.length === 0 ? (
          <div className="p-12 text-center text-gray-400 font-jost">
            <Tag size={32} className="mx-auto mb-3 opacity-40" />
            <p>No hay categorías. Crea la primera.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {categories.map(cat => (
              <div key={cat.id} className="px-6 py-4 hover:bg-gray-50 transition">
                {editingId === cat.id ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <input
                          type="text"
                          value={editName}
                          onChange={e => setEditName(e.target.value)}
                          className="w-full px-3 py-2 border border-asciende-purple/50 rounded-lg text-sm focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none font-jost"
                          autoFocus
                        />
                        {editName && (
                          <p className="text-xs text-gray-400 mt-1 font-jost">Slug: /{generateSlug(editName)}</p>
                        )}
                      </div>
                      <input
                        type="text"
                        value={editDesc}
                        onChange={e => setEditDesc(e.target.value)}
                        placeholder="Descripción"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none font-jost"
                      />
                      <select
                        value={editLang}
                        onChange={e => setEditLang(e.target.value as 'en' | 'es')}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none font-jost"
                      >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                      </select>
                    </div>
                    {error && <p className="text-red-600 text-xs font-jost">{error}</p>}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(cat.id)}
                        disabled={!editName.trim() || saving}
                        className="flex items-center gap-1.5 bg-asciende-purple text-white px-4 py-1.5 rounded-lg font-jost text-sm hover:opacity-90 transition disabled:opacity-50"
                      >
                        <Check size={14} />
                        Guardar
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="flex items-center gap-1.5 bg-gray-100 text-gray-600 px-4 py-1.5 rounded-lg font-jost text-sm hover:bg-gray-200 transition"
                      >
                        <X size={14} />
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-jost font-semibold text-gray-800">{cat.name}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-gray-400 font-jost font-mono">/{cat.slug}</span>
                        {cat.description && (
                          <span className="text-xs text-gray-500 font-jost">{cat.description}</span>
                        )}
                        <span className={`px-2 py-0.5 rounded-full text-xs font-jost font-semibold ${
                          cat.language === 'es' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {cat.language === 'es' ? 'ES' : 'EN'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(cat)}
                        className="p-2 hover:bg-blue-50 text-blue-500 rounded-lg transition"
                        title="Editar"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id, cat.name)}
                        className="p-2 hover:bg-red-50 text-red-400 rounded-lg transition"
                        title="Eliminar"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

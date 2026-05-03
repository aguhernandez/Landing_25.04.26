import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { Upload, Trash2, Copy, Check, Image as ImageIcon, X, AlertCircle, CreditCard as Edit2, Save } from 'lucide-react';

interface MediaMetadata {
  storage_path: string;
  file_name: string;
  alt_text: string;
  caption: string;
}

interface MediaFile {
  name: string;
  id: string;
  created_at: string;
  metadata: { size: number; mimetype: string };
  url: string;
  meta: MediaMetadata;
}

export function MediaManager() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [editingMeta, setEditingMeta] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ file_name: string; alt_text: string; caption: string }>({ file_name: '', alt_text: '', caption: '' });
  const [savingMeta, setSavingMeta] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    setLoading(true);
    setError('');
    try {
      const { data: storageData, error: storageError } = await supabase.storage
        .from('media')
        .list('', { sortBy: { column: 'created_at', order: 'desc' } });
      if (storageError) throw storageError;

      const names = (storageData || [])
        .filter(f => f.name !== '.emptyFolderPlaceholder')
        .map(f => f.name);

      const { data: metaRows } = await supabase
        .from('media_metadata')
        .select('*')
        .in('storage_path', names.length ? names : ['__none__']);

      const metaMap = new Map<string, MediaMetadata>(
        (metaRows || []).map(m => [m.storage_path, m])
      );

      const filesWithUrls: MediaFile[] = (storageData || [])
        .filter(f => f.name !== '.emptyFolderPlaceholder')
        .map(f => {
          const { data: urlData } = supabase.storage.from('media').getPublicUrl(f.name);
          const existing = metaMap.get(f.name);
          return {
            ...f,
            url: urlData.publicUrl,
            metadata: f.metadata || { size: 0, mimetype: '' },
            meta: existing ?? {
              storage_path: f.name,
              file_name: f.name.replace(/^\d+-/, ''),
              alt_text: '',
              caption: '',
            },
          } as MediaFile;
        });

      setFiles(filesWithUrls);
    } catch (err: any) {
      setError(err.message || 'Error loading files');
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Solo se permiten imágenes (JPG, PNG, WebP, GIF, SVG)');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('El archivo no puede superar los 10 MB');
      return;
    }
    setUploading(true);
    setError('');
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    setUploadProgress(`Subiendo ${file.name}...`);
    try {
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(fileName, file, { upsert: false });
      if (uploadError) throw uploadError;

      await supabase.from('media_metadata').insert({
        storage_path: fileName,
        file_name: file.name,
        alt_text: '',
        caption: '',
      });

      await fetchFiles();
    } catch (err: any) {
      setError(err.message || 'Error al subir el archivo');
    } finally {
      setUploading(false);
      setUploadProgress(null);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await uploadFile(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) await uploadFile(file);
  };

  const handleDelete = async (name: string) => {
    try {
      const { error } = await supabase.storage.from('media').remove([name]);
      if (error) throw error;
      await supabase.from('media_metadata').delete().eq('storage_path', name);
      setFiles(prev => prev.filter(f => f.name !== name));
      setDeleteConfirm(null);
    } catch (err: any) {
      setError(err.message || 'Error al eliminar');
    }
  };

  const startEditMeta = (file: MediaFile) => {
    setEditingMeta(file.name);
    setEditForm({
      file_name: file.meta.file_name,
      alt_text: file.meta.alt_text,
      caption: file.meta.caption,
    });
  };

  const saveMeta = async (storagePath: string) => {
    setSavingMeta(true);
    try {
      const { error } = await supabase
        .from('media_metadata')
        .upsert({
          storage_path: storagePath,
          file_name: editForm.file_name.trim(),
          alt_text: editForm.alt_text.trim(),
          caption: editForm.caption.trim(),
          updated_at: new Date().toISOString(),
        }, { onConflict: 'storage_path' });
      if (error) throw error;

      setFiles(prev => prev.map(f =>
        f.name === storagePath
          ? { ...f, meta: { ...f.meta, ...editForm } }
          : f
      ));
      setEditingMeta(null);
    } catch (err: any) {
      setError(err.message || 'Error al guardar metadatos');
    } finally {
      setSavingMeta(false);
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const formatSize = (bytes: number) => {
    if (!bytes) return '—';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-krona font-bold text-asciende-purple">Media</h2>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 bg-asciende-purple text-white px-5 py-2 rounded-lg hover:opacity-90 transition font-krona text-sm disabled:opacity-50"
        >
          <Upload size={16} />
          Subir imagen
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg font-jost text-sm">
          <AlertCircle size={16} className="shrink-0" />
          <span className="flex-1">{error}</span>
          <button onClick={() => setError('')}><X size={14} /></button>
        </div>
      )}

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
          dragOver
            ? 'border-asciende-purple bg-asciende-purple/5 scale-[1.01]'
            : 'border-gray-200 hover:border-asciende-purple/40 hover:bg-gray-50'
        }`}
      >
        {uploading ? (
          <div className="space-y-2">
            <div className="w-10 h-10 border-4 border-asciende-purple border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-jost text-gray-500">{uploadProgress}</p>
          </div>
        ) : (
          <>
            <Upload size={28} className="mx-auto text-gray-400 mb-3" />
            <p className="font-jost text-gray-500 text-sm">
              Arrastrá una imagen aquí o <span className="text-asciende-purple font-semibold">hacé click para elegir</span>
            </p>
            <p className="font-jost text-gray-400 text-xs mt-1">JPG, PNG, WebP, GIF, SVG · máx. 10 MB</p>
          </>
        )}
      </div>

      {/* Files list */}
      {loading ? (
        <div className="text-center py-12 text-gray-400 font-jost">Cargando archivos...</div>
      ) : files.length === 0 ? (
        <div className="text-center py-12 text-gray-400 font-jost">
          <ImageIcon size={40} className="mx-auto mb-3 opacity-30" />
          <p>No hay imágenes subidas todavía.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {files.map(file => (
            <div key={file.name} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="flex gap-4 p-4">
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-lg bg-gray-50 overflow-hidden shrink-0">
                  <img
                    src={file.url}
                    alt={file.meta.alt_text || file.meta.file_name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {editingMeta === file.name ? (
                    /* Edit mode */
                    <div className="space-y-2">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div>
                          <label className="block text-xs font-jost font-semibold text-gray-400 mb-1 uppercase tracking-wide">Nombre del archivo</label>
                          <input
                            type="text"
                            value={editForm.file_name}
                            onChange={e => setEditForm(f => ({ ...f, file_name: e.target.value }))}
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none font-jost"
                            placeholder="nombre-imagen.jpg"
                            autoFocus
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-jost font-semibold text-gray-400 mb-1 uppercase tracking-wide">Alt Text</label>
                          <input
                            type="text"
                            value={editForm.alt_text}
                            onChange={e => setEditForm(f => ({ ...f, alt_text: e.target.value }))}
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none font-jost"
                            placeholder="Descripción para accesibilidad"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-jost font-semibold text-gray-400 mb-1 uppercase tracking-wide">Caption</label>
                          <input
                            type="text"
                            value={editForm.caption}
                            onChange={e => setEditForm(f => ({ ...f, caption: e.target.value }))}
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none font-jost"
                            placeholder="Leyenda de la imagen"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveMeta(file.name)}
                          disabled={savingMeta}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-asciende-purple text-white rounded-lg text-xs font-jost font-medium hover:opacity-90 transition disabled:opacity-50"
                        >
                          <Save size={12} />
                          {savingMeta ? 'Guardando...' : 'Guardar'}
                        </button>
                        <button
                          onClick={() => setEditingMeta(null)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-jost font-medium hover:bg-gray-200 transition"
                        >
                          <X size={12} />
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* View mode */
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="min-w-0">
                          <p className="font-jost font-semibold text-gray-800 text-sm truncate">{file.meta.file_name || file.name.replace(/^\d+-/, '')}</p>
                          <p className="font-jost text-xs text-gray-400">{formatSize(file.metadata?.size)}</p>
                        </div>
                        <button
                          onClick={() => startEditMeta(file)}
                          className="p-1.5 hover:bg-asciende-purple/10 text-gray-400 hover:text-asciende-purple rounded-lg transition shrink-0"
                          title="Editar metadatos"
                        >
                          <Edit2 size={14} />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-jost font-semibold text-gray-400 uppercase tracking-wide">Alt:</span>
                          <span className="text-xs font-jost text-gray-600 truncate max-w-[200px]">
                            {file.meta.alt_text || <em className="text-gray-300">sin definir</em>}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-jost font-semibold text-gray-400 uppercase tracking-wide">Caption:</span>
                          <span className="text-xs font-jost text-gray-600 truncate max-w-[200px]">
                            {file.meta.caption || <em className="text-gray-300">sin definir</em>}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <code className="text-xs font-mono text-gray-400 truncate flex-1 bg-gray-50 px-2 py-1 rounded">
                          {file.url}
                        </code>
                        <button
                          onClick={() => copyUrl(file.url)}
                          title="Copiar URL"
                          className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-jost font-medium transition ${
                            copiedUrl === file.url
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-asciende-purple/10 text-asciende-purple hover:bg-asciende-purple/20'
                          }`}
                        >
                          {copiedUrl === file.url ? <><Check size={12} /> Copiado</> : <><Copy size={12} /> Copiar URL</>}
                        </button>
                        {deleteConfirm === file.name ? (
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => handleDelete(file.name)}
                              className="px-2 py-1.5 bg-red-500 text-white rounded-lg text-xs font-jost hover:bg-red-600 transition flex items-center gap-1"
                            >
                              <Check size={11} /> Confirmar
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="px-2 py-1.5 bg-gray-200 text-gray-600 rounded-lg text-xs font-jost hover:bg-gray-300 transition"
                            >
                              <X size={11} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(file.name)}
                            title="Eliminar"
                            className="shrink-0 p-1.5 bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

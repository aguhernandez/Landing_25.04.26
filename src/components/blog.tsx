import { useState, useEffect } from 'react';
import { supabase, BlogPost, BlogCategory } from '../lib/supabase';
import { ArrowRight, Plus, CreditCard as Edit2, Trash2, LogOut, ChevronLeft, ChevronRight, FileText, BarChart2, Eye, EyeOff, Tag, Image as ImageIcon, CircleUser as UserCircle } from 'lucide-react';
import { CookieAnalytics } from './admin/CookieAnalytics';
import { BlogPostEditor } from './admin/BlogPostEditor';
import { CategoryManager } from './admin/CategoryManager';
import { MediaManager } from './admin/MediaManager';
import { AuthorProfile } from './admin/AuthorProfile';
import { DocsManager } from './admin/DocsManager';
import { BlogTeaserModal } from './blog/BlogTeaserModal';

export function Blog({ t, language, onOpenStory, onViewAll }: { t: any; language: 'en' | 'es'; onOpenStory: (postId: string, catSlug: string, postSlug: string) => void; onViewAll: () => void }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [language]);

  useEffect(() => {
    setCurrentIndex(0);
    setSelectedCategory(null);
  }, [language]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [postsRes, catsRes] = await Promise.all([
        supabase.from('blog_posts').select('*').eq('published', true).eq('language', language).order('created_at', { ascending: false }),
        supabase.from('blog_categories').select('*').eq('language', language).order('name'),
      ]);
      if (!postsRes.error) setPosts(postsRes.data || []);
      if (!catsRes.error) {
        const allCats = catsRes.data || [];
        // Solo mostrar categorías que tengan posts
        const usedCatIds = (postsRes.data || []).map(p => p.category_id).filter(Boolean);
        const filteredCats = allCats.filter(c => usedCatIds.includes(c.id));
        setCategories(filteredCats);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const MAX_SLIDER_POSTS = 8;

  const filteredPosts = selectedCategory
    ? posts.filter(p => p.category_id === selectedCategory)
    : posts;

  const sourcePosts = filteredPosts.length > 0 ? filteredPosts : posts;
  const displayPosts = sourcePosts.slice(0, MAX_SLIDER_POSTS);
  const hasMore = sourcePosts.length > MAX_SLIDER_POSTS;

  if (loading) return null;

  const goToPrevious = () => {
    const total = displayPosts.length || 1;
    setCurrentIndex(prev => (prev === 0 ? total - 1 : prev - 1));
  };

  const goToNext = () => {
    const total = displayPosts.length || 1;
    setCurrentIndex(prev => (prev === total - 1 ? 0 : prev + 1));
  };

  const handleContinueReading = (post: BlogPost) => {
    const cat = categories.find(c => c.id === post.category_id);
    const catSlug = cat?.slug || 'stories';
    const postSlug = post.slug || post.id;
    setSelectedPost(null);
    onOpenStory(post.id, catSlug, postSlug);
  };

  const safeIndex = currentIndex % (displayPosts.length || 1);
  const currentPost = displayPosts[safeIndex];
  const previousPost = displayPosts[(safeIndex - 1 + displayPosts.length) % (displayPosts.length || 1)];
  const nextPost = displayPosts[(safeIndex + 1) % (displayPosts.length || 1)];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-krona font-bold text-asciende-purple mb-4">
            {t.blog.title}
          </h2>
          <p className="text-xl text-gray-700 font-jost max-w-2xl mx-auto">
            {t.blog.subtitle}
          </p>
        </div>

        {/* Category Filters */}
        {categories.length > 0 && (
          <div className="mb-12 flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => { setSelectedCategory(null); setCurrentIndex(0); }}
              className={`px-6 py-2 rounded-full font-jost font-medium transition-all duration-200 ${
                selectedCategory === null
                  ? 'bg-asciende-purple text-white shadow-md'
                  : 'bg-white border-2 border-asciende-purple text-asciende-purple hover:bg-asciende-purple/10'
              }`}
            >
              {language === 'es' ? 'Todos los Insights' : 'All Insights'}
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.id); setCurrentIndex(0); }}
                className={`px-6 py-2 rounded-full font-jost font-medium transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-asciende-purple text-white shadow-md'
                    : 'bg-white border-2 border-asciende-purple text-asciende-purple hover:bg-asciende-purple/10'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {displayPosts.length === 0 ? (
          <div className="text-center py-20 text-gray-400 font-jost">
            No hay historias publicadas aún.
          </div>
        ) : (
          <>
            <div className="grid lg:grid-cols-12 gap-0 items-center">
              {/* Previous Teaser */}
              {displayPosts.length > 1 && (
                <div className="lg:col-span-2 hidden lg:block relative h-[525px] overflow-hidden">
                  <div className="group cursor-pointer absolute inset-0" onClick={() => setSelectedPost(previousPost)}>
                    {previousPost.featured_image && (
                      <div className="relative h-full w-full">
                        <img
                          src={previousPost.featured_image}
                          alt={previousPost.title}
                          className="h-full w-[500%] object-cover object-left group-hover:scale-110 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-white" />
                        <div className="absolute inset-0 bg-gradient-to-r from-asciende-purple/95 via-asciende-purple/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-start p-6">
                          <h4 className="text-sm font-krona font-bold text-asciende-yellow line-clamp-4">{previousPost.title}</h4>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Main Post */}
              <div className={`${displayPosts.length > 1 ? 'lg:col-span-8' : 'lg:col-span-12'} px-0 lg:px-6`}>
                <div className="group relative">
                  <div
                    className="relative h-[525px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                    onClick={() => setSelectedPost(currentPost)}
                  >
                    {currentPost.featured_image && (
                      <>
                        <img
                          src={currentPost.featured_image}
                          alt={currentPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      </>
                    )}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white pointer-events-none">
                      {/* Category badge */}
                      {currentPost.category_id && (
                        <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-jost font-semibold bg-asciende-yellow text-asciende-purple w-fit">
                          {categories.find(c => c.id === currentPost.category_id)?.name}
                        </span>
                      )}
                      <h3 className="text-3xl md:text-4xl font-krona font-bold text-asciende-yellow mb-4 line-clamp-3">
                        {currentPost.title}
                      </h3>
                      <p className="text-white font-jost mb-6 line-clamp-2">
                        {currentPost.featured_text || currentPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <time className="text-sm text-white/80 font-jost">
                          {new Date(currentPost.created_at).toLocaleDateString()}
                        </time>
                        <button
                          onClick={e => { e.stopPropagation(); setSelectedPost(currentPost); }}
                          className="flex items-center gap-2 bg-asciende-yellow text-asciende-purple px-6 py-2 rounded-full font-krona font-bold hover:shadow-lg transition pointer-events-auto"
                        >
                          {t.blog.readMore}
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Nav arrows */}
                  {displayPosts.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                      <button
                        onClick={e => { e.stopPropagation(); goToPrevious(); }}
                        className="w-14 h-14 rounded-full border-2 border-white text-white hover:bg-white/20 flex items-center justify-center transition backdrop-blur-sm pointer-events-auto"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={e => { e.stopPropagation(); goToNext(); }}
                        className="w-14 h-14 rounded-full border-2 border-white text-white hover:bg-white/20 flex items-center justify-center transition backdrop-blur-sm pointer-events-auto"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Dot counter + View All */}
                <div className="mt-6 flex items-center justify-center gap-4">
                  {displayPosts.length > 1 && (
                    <div className="flex items-center gap-2">
                      {displayPosts.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentIndex(i)}
                          className={`h-1 rounded-full transition-all ${i === safeIndex ? 'w-8 bg-asciende-purple' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
                        />
                      ))}
                    </div>
                  )}
                  {hasMore && (
                    <button
                      onClick={onViewAll}
                      className="flex items-center gap-2 px-5 py-2 rounded-full border-2 border-asciende-purple text-asciende-purple font-jost font-semibold text-sm hover:bg-asciende-purple hover:text-white transition-all duration-200"
                    >
                      {language === 'es' ? 'Ver todos' : 'View all'}
                      <ArrowRight size={15} />
                    </button>
                  )}
                </div>
              </div>

              {/* Next Teaser */}
              {displayPosts.length > 1 && (
                <div className="lg:col-span-2 hidden lg:block relative h-[525px] overflow-hidden">
                  <div className="group cursor-pointer absolute inset-0" onClick={() => setSelectedPost(nextPost)}>
                    {nextPost.featured_image && (
                      <div className="relative h-full w-full">
                        <img
                          src={nextPost.featured_image}
                          alt={nextPost.title}
                          className="h-full w-[500%] object-cover object-right group-hover:scale-110 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/60 to-white" />
                        <div className="absolute inset-0 bg-gradient-to-l from-asciende-purple/95 via-asciende-purple/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-end p-6">
                          <h4 className="text-sm font-krona font-bold text-asciende-yellow line-clamp-4 text-right">{nextPost.title}</h4>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile navigation */}
            {displayPosts.length > 1 && (
              <div className="lg:hidden mt-8 flex gap-4">
                <button
                  onClick={goToPrevious}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-asciende-purple px-6 py-3 rounded-lg font-krona font-bold transition"
                >
                  <ChevronLeft size={20} />
                  {t.blog.previous}
                </button>
                <button
                  onClick={goToNext}
                  className="flex-1 flex items-center justify-center gap-2 bg-asciende-yellow text-asciende-purple px-6 py-3 rounded-lg font-krona font-bold hover:shadow-lg transition"
                >
                  {t.blog.next}
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
            {hasMore && (
              <div className="lg:hidden mt-4 flex justify-center">
                <button
                  onClick={onViewAll}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-asciende-purple text-asciende-purple font-jost font-semibold text-sm hover:bg-asciende-purple hover:text-white transition-all duration-200"
                >
                  {language === 'es' ? 'Ver todos' : 'View all'}
                  <ArrowRight size={15} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Teaser Modal */}
      {selectedPost && (
        <BlogTeaserModal
          post={selectedPost}
          categories={categories}
          language={language}
          onClose={() => setSelectedPost(null)}
          onContinueReading={() => handleContinueReading(selectedPost)}
        />
      )}
    </div>
  );
}

// ─── Admin Login ──────────────────────────────────────────────────────────────

export function AdminLogin({ onLoginSuccess, t }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;
      if (!data.user) throw new Error('Login failed');
      if (email === 'admin@asciende.pro') {
        onLoginSuccess(data.user);
      } else {
        setError('Unauthorized access');
        await supabase.auth.signOut();
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-asciende-purple to-asciende-purple/80 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/logo_transp.png" alt="Asciende" className="h-12 w-auto mx-auto mb-4" />
          <h1 className="text-2xl font-krona font-bold text-asciende-purple">Admin Panel</h1>
          <p className="text-sm text-gray-600 mt-2 font-jost">Iniciar sesión</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-jost font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none transition"
              placeholder="admin@asciende.pro"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-jost font-semibold text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asciende-purple focus:border-transparent outline-none transition pr-10"
                placeholder="••••••••"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm font-jost">{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-asciende-purple text-white py-2 rounded-lg font-krona font-bold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────

type AdminSection = 'posts' | 'categories' | 'media' | 'author' | 'cookie-analytics' | 'docs';

export function AdminDashboard({ user, onLogout, t }) {
  const [activeSection, setActiveSection] = useState<AdminSection>('posts');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [postsRes, catsRes] = await Promise.all([
      supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
      supabase.from('blog_categories').select('*').order('name'),
    ]);
    if (!postsRes.error) setPosts(postsRes.data || []);
    if (!catsRes.error) setCategories(catsRes.data || []);
    setLoading(false);
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('¿Eliminar este post?')) return;
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (!error) setPosts(posts.filter(p => p.id !== id));
  };

  const handlePostSaved = () => {
    fetchData();
    setShowEditor(false);
    setEditingPost(null);
  };

  const navItems: { id: AdminSection; label: string; icon: React.ReactNode }[] = [
    { id: 'posts', label: 'Blog Posts', icon: <FileText size={18} /> },
    { id: 'categories', label: 'Categorías', icon: <Tag size={18} /> },
    { id: 'media', label: 'Media', icon: <ImageIcon size={18} /> },
    { id: 'author', label: 'Autores', icon: <UserCircle size={18} /> },
    { id: 'cookie-analytics', label: 'Cookie Analytics', icon: <BarChart2 size={18} /> },
    { id: 'docs', label: 'Docs', icon: <FileText size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <nav className="bg-asciende-purple text-white px-6 py-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <img src="/logo_transp.png" alt="Asciende" className="h-8 w-auto brightness-0 invert" />
          <h1 className="text-xl font-krona font-bold">Admin Panel</h1>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition font-jost text-sm"
        >
          <LogOut size={16} />
          Log Out
        </button>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-56 bg-white border-r border-gray-200 flex flex-col shrink-0">
          <nav className="flex-1 py-4 px-3 space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  if (item.id !== 'posts') { setShowEditor(false); setEditingPost(null); }
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-jost font-medium transition-colors ${
                  activeSection === item.id ? 'bg-asciende-purple text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
          <div className="px-3 pb-4 border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-400 font-jost truncate">{user.email}</p>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-6">
          {activeSection === 'posts' && (
            <>
              {showEditor ? (
                <BlogPostEditor
                  post={editingPost}
                  onSaved={handlePostSaved}
                  onCancel={() => { setShowEditor(false); setEditingPost(null); }}
                />
              ) : (
                <>
                  <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-2xl font-krona font-bold text-asciende-purple">Blog Posts</h2>
                    <button
                      onClick={() => { setEditingPost(null); setShowEditor(true); }}
                      className="flex items-center gap-2 bg-asciende-purple text-white px-5 py-2 rounded-lg hover:opacity-90 transition font-krona text-sm"
                    >
                      <Plus size={18} />
                      Nuevo Post
                    </button>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {loading ? (
                      <div className="p-6 text-center text-gray-600 font-jost">Cargando...</div>
                    ) : posts.length === 0 ? (
                      <div className="p-12 text-center text-gray-500 font-jost">No hay posts. ¡Crea el primero!</div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50 border-b">
                            <tr>
                              <th className="px-6 py-3 text-left font-krona font-bold text-asciende-purple text-sm">Título</th>
                              <th className="px-6 py-3 text-left font-krona font-bold text-asciende-purple text-sm">Categoría</th>
                              <th className="px-6 py-3 text-left font-krona font-bold text-asciende-purple text-sm">Slug / URL</th>
                              <th className="px-6 py-3 text-left font-krona font-bold text-asciende-purple text-sm">Idioma</th>
                              <th className="px-6 py-3 text-left font-krona font-bold text-asciende-purple text-sm">Estado</th>
                              <th className="px-6 py-3 text-left font-krona font-bold text-asciende-purple text-sm">Fecha</th>
                              <th className="px-6 py-3 text-right font-krona font-bold text-asciende-purple text-sm">Acciones</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                            {posts.map(post => {
                              const cat = categories.find(c => c.id === post.category_id);
                              const urlSlug = `/stories/${cat?.slug || 'sin-categoria'}/${post.slug || ''}`;
                              return (
                                <tr key={post.id} className="hover:bg-gray-50 transition">
                                  <td className="px-6 py-4 font-jost text-sm font-medium text-gray-800 max-w-[200px] truncate">{post.title}</td>
                                  <td className="px-6 py-4">
                                    {cat ? (
                                      <span className="px-2 py-1 bg-asciende-purple/10 text-asciende-purple text-xs font-jost rounded-full">{cat.name}</span>
                                    ) : (
                                      <span className="text-gray-300 text-xs font-jost">—</span>
                                    )}
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">{urlSlug}</span>
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-jost font-semibold uppercase ${
                                      post.language === 'es' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                                    }`}>
                                      {post.language || 'en'}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-jost font-medium ${
                                      post.published ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                      {post.published ? 'Publicado' : 'Borrador'}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 font-jost text-sm text-gray-500">
                                    {new Date(post.created_at).toLocaleDateString()}
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                      <button
                                        onClick={() => { setEditingPost(post); setShowEditor(true); }}
                                        className="p-2 hover:bg-blue-100 text-blue-600 rounded transition"
                                      >
                                        <Edit2 size={16} />
                                      </button>
                                      <button
                                        onClick={() => handleDeletePost(post.id)}
                                        className="p-2 hover:bg-red-100 text-red-600 rounded transition"
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          )}

          {activeSection === 'categories' && <CategoryManager />}
          {activeSection === 'media' && <MediaManager />}
          {activeSection === 'author' && <AuthorProfile />}
          {activeSection === 'cookie-analytics' && <CookieAnalytics />}
          {activeSection === 'docs' && <DocsManager />}
        </main>
      </div>
    </div>
  );
}

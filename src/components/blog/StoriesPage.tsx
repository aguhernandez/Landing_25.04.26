import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import { supabase, BlogPost, BlogCategory } from '../../lib/supabase';

interface StoriesPageProps {
  language: 'en' | 'es';
  onOpenStory: (postId: string, catSlug: string, postSlug: string) => void;
  onBack: () => void;
}

const storiesT = {
  en: {
    heroTitle: 'Asciende Insights',
    heroSubtitle: 'Insights, science, and experiences from the world of endurance sport.',
    allCategories: 'All Insights',
    noStories: 'No stories published yet.',
    readMore: 'Read Story',
    back: 'Back',
  },
  es: {
    heroTitle: 'Asciende Insights',
    heroSubtitle: 'Conocimiento, ciencia y experiencias del mundo del deporte de resistencia.',
    allCategories: 'Todos los Insights',
    noStories: 'No hay historias publicadas aún.',
    readMore: 'Leer',
    back: 'Volver',
  },
};

export function StoriesPage({ language, onOpenStory, onBack }: StoriesPageProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const st = storiesT[language];

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, [language]);

  const fetchData = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  const filteredPosts = selectedCategory
    ? posts.filter(p => p.category_id === selectedCategory)
    : posts;

  const featuredPost = filteredPosts[0] || null;
  const gridPosts = filteredPosts.slice(1);

  const handleOpen = (post: BlogPost) => {
    const cat = categories.find(c => c.id === post.category_id);
    onOpenStory(post.id, cat?.slug || 'stories', post.slug || post.id);
  };

  const dateLocale = language === 'es' ? 'es-ES' : 'en-US';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-[55vh] min-h-[380px] overflow-hidden bg-asciende-purple">
        {featuredPost?.featured_image && (
          <>
            <img
              src={featuredPost.featured_image}
              alt={featuredPost.title}
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-asciende-purple/90 via-asciende-purple/60 to-asciende-purple/40" />
          </>
        )}

        {/* Back button */}
        <button
          onClick={() => {
            onBack();
          }}
          className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/25 transition font-jost text-sm font-medium border border-white/20"
        >
          <ChevronLeft size={16} />
          {st.back}
        </button>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10">
          <h1 className="text-5xl md:text-7xl font-krona font-bold text-white mb-5 leading-tight">
            {st.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-jost max-w-2xl leading-relaxed">
            {st.heroSubtitle}
          </p>
        </div>
      </div>

      {/* Category filter bar */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto scrollbar-hide">
          <FilterChip
            label={language === 'es' ? 'Todas' : 'All'}
            active={selectedCategory === null}
            onClick={() => setSelectedCategory(null)}
          />
          {categories.map(cat => (
            <FilterChip
              key={cat.id}
              label={cat.name}
              active={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
            />
          ))}
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        {loading ? (
          <div className="text-center py-24 text-gray-400 font-jost">
            <div className="w-8 h-8 border-4 border-asciende-purple/30 border-t-asciende-purple rounded-full animate-spin mx-auto mb-4" />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-24 text-gray-400 font-jost">{st.noStories}</div>
        ) : (
          <>
            {/* Featured post — full width */}
            {featuredPost && (
              <div
                className="group relative rounded-2xl overflow-hidden cursor-pointer mb-12 h-[480px] shadow-xl"
                onClick={() => handleOpen(featuredPost)}
              >
                {featuredPost.featured_image ? (
                  <>
                    <img
                      src={featuredPost.featured_image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  </>
                ) : (
                  <div className="w-full h-full bg-asciende-purple/10" />
                )}

                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                  {featuredPost.category_id && (
                    <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-jost font-semibold bg-asciende-yellow text-asciende-purple w-fit">
                      {categories.find(c => c.id === featuredPost.category_id)?.name}
                    </span>
                  )}
                  <h2 className="text-3xl md:text-5xl font-krona font-bold text-white mb-3 leading-tight max-w-3xl">
                    {featuredPost.title}
                  </h2>
                  {featuredPost.featured_text && (
                    <p className="text-white/80 font-jost text-base md:text-lg mb-5 line-clamp-2 max-w-2xl">
                      {featuredPost.featured_text}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <time className="text-white/60 text-sm font-jost">
                      {new Date(featuredPost.created_at).toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>
                    <span className="flex items-center gap-2 bg-asciende-yellow text-asciende-purple px-5 py-2 rounded-full font-krona font-bold text-sm">
                      {st.readMore} <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Grid of remaining posts */}
            {gridPosts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {gridPosts.map(post => (
                  <PostCard
                    key={post.id}
                    post={post}
                    categories={categories}
                    dateLocale={dateLocale}
                    readMoreLabel={st.readMore}
                    onClick={() => handleOpen(post)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-5 py-2 rounded-full font-jost font-medium text-sm transition-all duration-200 ${
        active
          ? 'bg-asciende-purple text-white shadow-md'
          : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-asciende-purple hover:text-asciende-purple'
      }`}
    >
      {label}
    </button>
  );
}

function PostCard({
  post,
  categories,
  dateLocale,
  readMoreLabel,
  onClick,
}: {
  post: BlogPost;
  categories: BlogCategory[];
  dateLocale: string;
  readMoreLabel: string;
  onClick: () => void;
}) {
  const cat = categories.find(c => c.id === post.category_id);

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow cursor-pointer flex flex-col"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gray-100 shrink-0">
        {post.featured_image ? (
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-asciende-purple/10 to-asciende-purple/5" />
        )}
        {cat && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-jost font-semibold bg-asciende-yellow text-asciende-purple">
            {cat.name}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <time className="text-xs text-gray-400 font-jost mb-2">
          {new Date(post.created_at).toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' })}
        </time>
        <h3 className="font-krona font-bold text-asciende-purple text-base leading-snug mb-2 line-clamp-2 group-hover:text-asciende-purple/80 transition">
          {post.title}
        </h3>
        {(post.featured_text || post.excerpt) && (
          <p className="font-jost text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
            {post.featured_text || post.excerpt}
          </p>
        )}
        <span className="flex items-center gap-1.5 text-asciende-purple font-jost font-semibold text-sm mt-auto group-hover:gap-2.5 transition-all">
          {readMoreLabel} <ArrowRight size={14} />
        </span>
      </div>
    </div>
  );
}

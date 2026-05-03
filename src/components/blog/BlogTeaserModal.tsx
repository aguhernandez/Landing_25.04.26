import { X, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase, BlogPost, BlogCategory, BlogAuthor } from '../../lib/supabase';

interface BlogTeaserModalProps {
  post: BlogPost;
  categories: BlogCategory[];
  language: 'en' | 'es';
  onClose: () => void;
  onContinueReading: () => void;
}

function getVideoEmbedUrl(url: string) {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.includes('youtu.be')
      ? url.split('youtu.be/')[1]?.split('?')[0]
      : url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes('vimeo.com')) {
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
    return `https://player.vimeo.com/video/${videoId}`;
  }
  return url;
}

export function BlogTeaserModal({ post, categories, language, onClose, onContinueReading }: BlogTeaserModalProps) {
  const [author, setAuthor] = useState<BlogAuthor | null>(null);
  const category = categories.find(c => c.id === post.category_id);

  useEffect(() => {
    if (!post.author_id) return;
    supabase
      .from('blog_authors')
      .select('*')
      .eq('id', post.author_id)
      .maybeSingle()
      .then(({ data }) => { if (data) setAuthor(data); });
  }, [post.author_id]);

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="sticky top-4 float-right mr-4 mt-4 z-10 w-10 h-10 bg-asciende-purple text-white rounded-full flex items-center justify-center hover:bg-asciende-purple/90 transition shadow-lg"
        >
          <X size={20} />
        </button>

        {post.featured_image && (
          <div className="w-full h-64 md:h-72 overflow-hidden rounded-t-2xl">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-8 md:p-10">
          {/* Category badge */}
          {category && (
            <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-jost font-semibold bg-asciende-purple/10 text-asciende-purple">
              {category.name}
            </span>
          )}

          <h2 className="text-2xl md:text-3xl font-krona font-bold text-asciende-purple mb-3">
            {post.title}
          </h2>

          {/* Author + date row */}
          <div className="flex items-center gap-3 mb-6">
            {author && (
              <>
                {author.photo_url ? (
                  <img src={author.photo_url} alt={author.name} className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-asciende-purple/10 flex items-center justify-center">
                    <span className="text-asciende-purple font-krona text-xs font-bold">{author.name.charAt(0)}</span>
                  </div>
                )}
                <span className="font-jost font-semibold text-sm text-gray-700">
                  {language === 'es' ? 'Por' : 'By'} {author.name}
                </span>
                <span className="text-gray-300">·</span>
              </>
            )}
            <time className="text-sm text-gray-400 font-jost">
              {new Date(post.created_at).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </time>
          </div>

          {/* Featured video */}
          {post.featured_video && (
            <div className="aspect-video mb-6 rounded-xl overflow-hidden shadow-lg">
              <iframe
                src={getVideoEmbedUrl(post.featured_video)}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Featured text */}
          <p className="font-jost text-gray-700 text-base leading-relaxed mb-8 border-l-4 border-asciende-yellow pl-4">
            {post.featured_text || post.excerpt}
          </p>

          <button
            onClick={onContinueReading}
            className="flex items-center gap-2 bg-asciende-purple text-white px-6 py-3 rounded-lg font-krona font-bold hover:opacity-90 transition"
          >
            {language === 'es' ? 'Leer historia completa' : 'Continue Reading'}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

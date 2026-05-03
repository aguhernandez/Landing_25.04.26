import { ArrowLeft, Link2, Mail, Instagram, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase, BlogPost, BlogBlock, BlogAuthor } from '../../lib/supabase';

interface BlogStoryPageProps {
  postId: string;
  language: 'en' | 'es';
  onClose: () => void;
}

const storyT = {
  en: {
    back: 'Back',
    writtenBy: 'Written by',
    moreInfo: 'More information about this athlete in:',
    share: 'Share',
    loading: 'Loading story...',
  },
  es: {
    back: 'Volver',
    writtenBy: 'Escrito por',
    moreInfo: 'Más información sobre este atleta en:',
    share: 'Compartir',
    loading: 'Cargando historia...',
  },
};

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

function ShareButtons({ title, shareLabel }: { title: string; shareLabel: string }) {
  const currentUrl = window.location.href;

  const copyLink = () => navigator.clipboard.writeText(currentUrl);
  const shareTwitter = () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`, '_blank');
  const shareLinkedIn = () => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}`, '_blank');
  const shareMail = () => { window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(currentUrl)}`; };
  const shareWhatsApp = () => window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + currentUrl)}`, '_blank');

  return (
    <div className="flex flex-col items-center gap-6">
      <h4 className="font-krona font-bold text-asciende-purple text-sm uppercase tracking-widest">{shareLabel}</h4>
      <div className="flex items-center gap-4">
        <button onClick={shareTwitter} className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-black hover:text-black transition" title="X">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </button>
        <button onClick={shareLinkedIn} className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#0077B5] hover:text-[#0077B5] transition" title="LinkedIn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </button>
        <button onClick={shareWhatsApp} className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#25D366] hover:text-[#25D366] transition" title="WhatsApp">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </button>
        <button onClick={shareMail} className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-asciende-purple hover:text-asciende-purple transition" title="Email">
          <Mail size={16} />
        </button>
        <button onClick={copyLink} className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-asciende-purple hover:text-asciende-purple transition" title="Copy link">
          <Link2 size={16} />
        </button>
      </div>
    </div>
  );
}

export function BlogStoryPage({ postId, language, onClose }: BlogStoryPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [blocks, setBlocks] = useState<BlogBlock[]>([]);
  const [author, setAuthor] = useState<BlogAuthor | null>(null);
  const [loading, setLoading] = useState(true);
  const st = storyT[language];

  useEffect(() => {
    fetchStoryData();
    window.scrollTo(0, 0);
  }, [postId]);

  const fetchStoryData = async () => {
    setLoading(true);
    try {
      const [postRes, blocksRes] = await Promise.all([
        supabase.from('blog_posts').select('*').eq('id', postId).maybeSingle(),
        supabase.from('blog_blocks').select('*').eq('post_id', postId).order('block_order'),
      ]);

      if (postRes.data) {
        setPost(postRes.data);
        if (postRes.data.author_id) {
          const { data: authorData } = await supabase
            .from('blog_authors')
            .select('*')
            .eq('id', postRes.data.author_id)
            .maybeSingle();
          if (authorData) setAuthor(authorData);
        }
      }
      setBlocks(blocksRes.data || []);
    } catch (error) {
      console.error('Error fetching story:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="text-gray-400 font-jost">{st.loading}</div>
      </div>
    );
  }

  if (!post) return null;

  const dateLocale = language === 'es' ? 'es-ES' : 'en-US';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        {post.featured_image ? (
          <>
            <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-asciende-purple/10" />
        )}

        <button
          onClick={onClose}
          className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-asciende-purple px-4 py-2 rounded-full hover:bg-white transition shadow-lg font-jost text-sm font-medium"
        >
          <ArrowLeft size={16} />
          {st.back}
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-krona font-bold text-white leading-tight max-w-4xl">
            {post.title}
          </h1>
          <time className="block mt-4 text-sm text-gray-300 font-jost">
            {new Date(post.created_at).toLocaleDateString(dateLocale, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
      </div>

      {/* Featured text intro */}
      {(post.featured_text || post.excerpt) && (
        <div className="max-w-3xl mx-auto px-6 md:px-8 pt-16 pb-8">
          <p className="text-xl md:text-2xl font-jost text-gray-700 leading-relaxed border-l-4 border-asciende-yellow pl-6">
            {post.featured_text || post.excerpt}
          </p>
        </div>
      )}

      {/* Blocks */}
      <div className="pb-16">
        {blocks.map(block => {
          if (block.type === 'text') {
            return (
              <div key={block.id} className="max-w-6xl mx-auto px-6 md:px-8 py-10">
                <div className="grid grid-cols-12 gap-8 md:gap-16">
                  <div className="col-span-12 md:col-span-4">
                    {block.subtitle && (
                      <h2 className="font-krona font-bold text-asciende-purple text-2xl md:text-4xl leading-snug sticky top-8">
                        {block.subtitle}
                      </h2>
                    )}
                  </div>
                  <div className="col-span-12 md:col-span-8">
                    <div
                      className="font-jost text-gray-700 text-base md:text-lg leading-relaxed
                        [&_h2]:font-krona [&_h2]:font-bold [&_h2]:text-asciende-purple [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:mt-6 [&_h2]:mb-3
                        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_ul]:my-3
                        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1 [&_ol]:my-3
                        [&_li]:font-jost [&_li]:text-gray-700
                        [&_strong]:font-semibold [&_b]:font-semibold
                        [&_em]:italic [&_i]:italic
                        [&_u]:underline
                        [&_a]:text-asciende-purple [&_a]:underline [&_a]:font-medium [&_a]:hover:text-asciende-purple/80 [&_a]:transition
                        [&_p]:mb-4 [&_p:last-child]:mb-0"
                      style={{ fontSize: '18px', lineHeight: '1.7' }}
                      dangerouslySetInnerHTML={{ __html: block.content || '' }}
                    />
                  </div>
                </div>
              </div>
            );
          }

          if (block.type === 'image') {
            return (
              <div key={block.id} className="my-10">
                <div className="w-full overflow-hidden">
                  <img src={block.url} alt={block.caption || ''} className="w-full object-cover max-h-[80vh]" style={{ display: 'block' }} />
                </div>
                {block.caption && (
                  <p className="text-center text-sm font-jost text-gray-400 mt-3 px-6">{block.caption}</p>
                )}
              </div>
            );
          }

          if (block.type === 'video') {
            return (
              <div key={block.id} className="max-w-5xl mx-auto px-6 md:px-8 my-10">
                <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
                  <iframe
                    src={getVideoEmbedUrl(block.url || '')}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                {block.caption && (
                  <p className="text-center text-sm font-jost text-gray-400 mt-3">{block.caption}</p>
                )}
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="border-t border-gray-200" />
      </div>

      {/* Author */}
      {author && (
        <div className="max-w-3xl mx-auto px-6 md:px-8 py-16">
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <div className="flex items-start gap-6">
              {author.photo_url ? (
                <img
                  src={author.photo_url}
                  alt={author.name}
                  className="w-20 h-20 rounded-full object-cover flex-shrink-0 shadow-md ring-4 ring-white"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-asciende-purple/10 flex items-center justify-center flex-shrink-0 ring-4 ring-white shadow-md">
                  <span className="text-asciende-purple font-krona font-bold text-2xl">
                    {author.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="flex-1">
                <p className="text-xs font-jost font-semibold text-gray-400 uppercase tracking-widest mb-1">{st.writtenBy}</p>
                <h4 className="font-krona font-bold text-asciende-purple text-xl mb-2">{author.name}</h4>
                {(language === 'en' ? author.bio_en : author.bio_es) && (
                  <p className="font-jost text-gray-600 leading-relaxed">{language === 'en' ? author.bio_en : author.bio_es}</p>
                )}
              </div>
            </div>

            {(author.url || author.instagram_url) && (
              <div className="mt-6 pt-6 border-t border-gray-200 flex flex-wrap gap-5">
                {author.url && (() => {
                  const href = /^https?:\/\//i.test(author.url) ? author.url : `https://${author.url}`;
                  return (
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-jost font-semibold text-gray-400 uppercase tracking-wide">
                        {st.moreInfo}
                      </span>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-asciende-purple font-jost font-medium text-sm hover:underline"
                      >
                        <ExternalLink size={14} />
                        {author.url}
                      </a>
                    </div>
                  );
                })()}
                {author.instagram_url && (() => {
                  const raw = author.instagram_url.trim();
                  const handle = raw.replace(/^@/, '');
                  const href = /^https?:\/\//i.test(handle)
                    ? handle
                    : `https://instagram.com/${handle}`;
                  const display = /^https?:\/\//i.test(raw)
                    ? raw.replace(/^https?:\/\/(www\.)?instagram\.com\/?/, '@').replace(/\/$/, '')
                    : raw.startsWith('@') ? raw : `@${raw}`;
                  return (
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-jost font-semibold text-gray-400 uppercase tracking-wide">Instagram</span>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-pink-600 font-jost font-medium text-sm hover:underline"
                      >
                        <Instagram size={14} />
                        {display}
                      </a>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Share */}
      <div className="bg-gray-50 py-16">
        <ShareButtons title={post.title} shareLabel={st.share} />
      </div>
    </div>
  );
}

import { useEffect, useState, useRef } from 'react';
import { DocsPage, DocsSatellite } from '../../lib/supabase';
import { ChevronLeft, ChevronRight, Clock, Calendar, Tag, ExternalLink } from 'lucide-react';

interface DocsArticleProps {
  page: DocsPage;
  prevPage: DocsPage | null;
  nextPage: DocsPage | null;
  onNavigate: (slug: string) => void;
  satelliteMeta: Record<DocsSatellite, { label: string; color: string }>;
  darkMode: boolean;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function DocsArticle({ page, prevPage, nextPage, onNavigate, satelliteMeta, darkMode }: DocsArticleProps) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState('');
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!articleRef.current) return;
    const headings = articleRef.current.querySelectorAll('h1, h2, h3');
    const items: TocItem[] = [];
    headings.forEach((h, i) => {
      const id = `heading-${i}`;
      h.id = id;
      items.push({ id, text: h.textContent || '', level: parseInt(h.tagName[1]) });
    });
    setToc(items);
  }, [page.content_html]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    const headings = articleRef.current?.querySelectorAll('h1, h2, h3') || [];
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [toc]);

  const meta = satelliteMeta[page.satellite];
  const formattedDate = new Date(page.updated_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const border = darkMode ? 'border-gray-800' : 'border-gray-200';
  const muted = darkMode ? 'text-gray-500' : 'text-gray-400';
  const cardBg = darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200';
  const navCardBg = darkMode ? 'bg-gray-900 hover:bg-gray-800 border-gray-800' : 'bg-white hover:bg-gray-50 border-gray-200';

  return (
    <div className="flex gap-0 max-w-none">
      {/* Article body */}
      <article className="flex-1 min-w-0 px-6 sm:px-10 xl:px-16 py-10 max-w-3xl mx-auto w-full">
        {/* Breadcrumb */}
        <nav className={`flex items-center gap-1.5 text-xs font-jost ${muted} mb-8`}>
          <span>Docs</span>
          <ChevronRight className="w-3 h-3" />
          <span className={`${meta.color} px-2 py-0.5 rounded text-xs font-krona`}>{meta.label}</span>
          {page.parent_slug && (
            <>
              <ChevronRight className="w-3 h-3" />
              <span>{page.parent_slug}</span>
            </>
          )}
          <ChevronRight className="w-3 h-3" />
          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{page.title}</span>
        </nav>

        {/* Page header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className={`text-xs font-krona px-2.5 py-1 rounded-full ${meta.color}`}>
              {meta.label}
            </span>
            <StatusBadge status={page.status} />
            {page.version_label && (
              <span className={`text-xs font-jost px-2 py-0.5 rounded border ${darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                {page.version_label}
              </span>
            )}
          </div>

          <h1 className={`text-3xl sm:text-4xl font-krona font-bold leading-tight mb-4 ${darkMode ? 'text-gray-50' : 'text-gray-900'}`}>
            {page.title}
          </h1>

          {page.excerpt && (
            <p className={`text-lg font-jost leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {page.excerpt}
            </p>
          )}

          <div className={`flex items-center gap-5 mt-6 text-xs font-jost ${muted} flex-wrap`}>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Updated {formattedDate}
            </span>
            {page.estimated_reading_minutes && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {page.estimated_reading_minutes} min read
              </span>
            )}
            {page.tags.length > 0 && (
              <span className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                {page.tags.join(', ')}
              </span>
            )}
          </div>
        </header>

        {/* Cover image */}
        {page.cover_image && (
          <div className="mb-10 rounded-xl overflow-hidden border border-gray-200">
            <img src={page.cover_image} alt={page.title} className="w-full object-cover" />
          </div>
        )}

        {/* Divider */}
        <hr className={`border-t ${border} mb-10`} />

        {/* Content */}
        <div
          ref={articleRef}
          className={`docs-content${darkMode ? ' dark' : ''}`}
          dangerouslySetInnerHTML={{ __html: page.content_html || '<p>No content yet.</p>' }}
        />

        {/* Tags */}
        {page.tags.length > 0 && (
          <div className={`mt-12 pt-8 border-t ${border}`}>
            <div className="flex items-center gap-2 flex-wrap">
              {page.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs font-jost px-2.5 py-1 rounded-full border ${darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Prev / Next navigation */}
        <div className={`mt-12 pt-8 border-t ${border} grid grid-cols-1 sm:grid-cols-2 gap-4`}>
          {prevPage ? (
            <button
              onClick={() => onNavigate(prevPage.slug)}
              className={`group flex flex-col items-start gap-1 p-4 rounded-xl border transition ${navCardBg}`}
            >
              <span className={`text-xs font-jost flex items-center gap-1 ${muted}`}>
                <ChevronLeft className="w-3.5 h-3.5" /> Previous
              </span>
              <span className={`font-krona text-sm font-bold group-hover:text-asciende-purple transition ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                {prevPage.title}
              </span>
            </button>
          ) : <div />}

          {nextPage && (
            <button
              onClick={() => onNavigate(nextPage.slug)}
              className={`group flex flex-col items-end gap-1 p-4 rounded-xl border transition ${navCardBg}`}
            >
              <span className={`text-xs font-jost flex items-center gap-1 ${muted}`}>
                Next <ChevronRight className="w-3.5 h-3.5" />
              </span>
              <span className={`font-krona text-sm font-bold group-hover:text-asciende-purple transition ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                {nextPage.title}
              </span>
            </button>
          )}
        </div>
      </article>

      {/* Table of Contents (desktop) */}
      {toc.length > 2 && (
        <aside className="hidden xl:block w-56 flex-shrink-0 py-10 pr-6">
          <div className="sticky top-10">
            <p className={`text-xs font-krona font-bold uppercase tracking-wider mb-4 ${muted}`}>
              On this page
            </p>
            <nav className="space-y-1">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block text-sm font-jost leading-snug py-1 transition ${
                    item.level === 2 ? 'pl-0' : item.level === 3 ? 'pl-3' : 'pl-0'
                  } ${
                    activeId === item.id
                      ? 'text-asciende-purple font-semibold'
                      : darkMode ? 'text-gray-500 hover:text-gray-200' : 'text-gray-500 hover:text-gray-800'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {item.text}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    alpha: 'bg-red-100 text-red-600',
    beta: 'bg-yellow-100 text-yellow-700',
    experimental: 'bg-orange-100 text-orange-600',
    stable: 'bg-green-100 text-green-700',
  };
  return (
    <span className={`text-xs font-krona px-2 py-0.5 rounded ${colors[status] || 'bg-gray-100 text-gray-500'}`}>
      {status}
    </span>
  );
}

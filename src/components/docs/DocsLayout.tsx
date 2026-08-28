import { useState, useEffect, useRef } from 'react';
import { supabase, DocsPage, DocsSatellite } from '../../lib/supabase';
import { DocsSidebar } from './DocsSidebar';
import { DocsArticle } from './DocsArticle';
import { DocsSearch } from './DocsSearch';
import { Menu, X, Search, Globe, ChevronDown } from 'lucide-react';

const SATELLITE_META: Record<DocsSatellite, { label: string; color: string }> = {
  general: { label: 'General', color: 'bg-gray-100 text-gray-700' },
  hub: { label: 'HUB', color: 'bg-blue-100 text-blue-700' },
  lab: { label: 'Lab', color: 'bg-emerald-100 text-emerald-700' },
  'endurance-planner': { label: 'Endurance Planner', color: 'bg-orange-100 text-orange-700' },
  'nutrition-planner': { label: 'Nutrition Planner', color: 'bg-lime-100 text-lime-700' },
  academy: { label: 'Academy', color: 'bg-sky-100 text-sky-700' },
  'performance-vector': { label: 'Performance Vector', color: 'bg-rose-100 text-rose-700' },
  motion: { label: 'Motion', color: 'bg-amber-100 text-amber-700' },
};

interface DocsLayoutProps {
  initialSlug?: string;
}

export function DocsLayout({ initialSlug }: DocsLayoutProps) {
  const [pages, setPages] = useState<DocsPage[]>([]);
  const [currentPage, setCurrentPage] = useState<DocsPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [langOpen, setLangOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPages();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredPages = pages.filter((p) => p.language === language);

  useEffect(() => {
    if (filteredPages.length === 0) return;
    const slug = initialSlug || 'getting-started';
    const found = filteredPages.find((p) => p.slug === slug);
    setCurrentPage(found || filteredPages[0] || null);
  }, [filteredPages, initialSlug]);

  async function fetchPages() {
    setLoading(true);
    const { data } = await supabase
      .from('docs_pages')
      .select('*')
      .eq('published', true)
      .order('order_index', { ascending: true });
    setPages(data || []);
    setLoading(false);
  }

  function navigate(slug: string) {
    const found = pages.find((p) => p.slug === slug);
    if (found) {
      setCurrentPage(found);
      setSidebarOpen(false);
      mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.replaceState(null, '', `/docs/${slug}`);
    }
  }

  const flatPages = filteredPages;
  const currentIndex = flatPages.findIndex((p) => p.id === currentPage?.id);
  const prevPage = currentIndex > 0 ? flatPages[currentIndex - 1] : null;
  const nextPage = currentIndex < flatPages.length - 1 ? flatPages[currentIndex + 1] : null;

  const bg = darkMode ? 'bg-gray-950 text-gray-100' : 'bg-white text-gray-900';
  const headerBg = darkMode ? 'bg-gray-950 border-gray-800' : 'bg-white border-gray-200';

  return (
    <div className={`min-h-screen flex flex-col ${bg} transition-colors duration-200`}>
      {/* Top header bar */}
      <header className={`sticky top-0 z-40 border-b ${headerBg} h-14 flex items-center px-4 gap-4`}>
        <button
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <img src="/logo_transp.png" alt="Asciende" className="h-7 w-auto" />
          <span className={`font-krona text-sm font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Docs
          </span>
        </div>

        <div className="flex-1" />

        <button
          onClick={() => setSearchOpen(true)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition ${darkMode ? 'border-gray-700 text-gray-400 hover:border-gray-500' : 'border-gray-200 text-gray-500 hover:border-gray-400'}`}
        >
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">Search docs...</span>
          <kbd className={`hidden sm:inline text-xs px-1.5 py-0.5 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>⌘K</kbd>
        </button>

        <div ref={langRef} className="relative">
          <button
            onClick={() => setLangOpen((v) => !v)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-sm font-jost font-medium transition ${darkMode ? 'border-gray-700 text-gray-300 hover:border-gray-500' : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}
            title="Select language"
          >
            <Globe className="w-4 h-4" />
            <span>{language.toUpperCase()}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
          </button>
          {langOpen && (
            <div className={`absolute right-0 mt-2 w-36 rounded-lg shadow-lg border z-50 overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
              <button
                onClick={() => { setLanguage('en'); setLangOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm font-jost transition ${language === 'en' ? 'text-asciende-purple font-semibold' : darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                English
              </button>
              <button
                onClick={() => { setLanguage('es'); setLangOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm font-jost transition border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'} ${language === 'es' ? 'text-asciende-purple font-semibold' : darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                Español
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-md text-sm transition ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          title="Toggle dark mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <div className={`absolute left-0 top-0 bottom-0 w-72 ${darkMode ? 'bg-gray-950' : 'bg-white'} overflow-y-auto`}>
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <span className="font-krona text-sm font-bold">Navigation</span>
                <button onClick={() => setSidebarOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <DocsSidebar
                pages={filteredPages}
                currentSlug={currentPage?.slug}
                onNavigate={navigate}
                satelliteMeta={SATELLITE_META}
                darkMode={darkMode}
              />
            </div>
          </div>
        )}

        {/* Desktop sidebar */}
        <aside className={`hidden lg:block w-64 xl:w-72 flex-shrink-0 border-r overflow-y-auto ${darkMode ? 'border-gray-800 bg-gray-950' : 'border-gray-200 bg-gray-50'}`} style={{ height: 'calc(100vh - 3.5rem)', position: 'sticky', top: '3.5rem' }}>
          <DocsSidebar
            pages={filteredPages}
            currentSlug={currentPage?.slug}
            onNavigate={navigate}
            satelliteMeta={SATELLITE_META}
            darkMode={darkMode}
          />
        </aside>

        {/* Main content */}
        <main ref={mainRef} className="flex-1 overflow-y-auto" style={{ height: 'calc(100vh - 3.5rem)' }}>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-2 border-asciende-purple border-t-transparent rounded-full animate-spin" />
            </div>
          ) : currentPage ? (
            <DocsArticle
              page={currentPage}
              prevPage={prevPage}
              nextPage={nextPage}
              onNavigate={navigate}
              satelliteMeta={SATELLITE_META}
              darkMode={darkMode}
            />
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400 font-jost">
              No documentation found.
            </div>
          )}
        </main>
      </div>

      {/* Search modal */}
      {searchOpen && (
        <DocsSearch
          pages={filteredPages}
          onNavigate={(slug) => { navigate(slug); setSearchOpen(false); }}
          onClose={() => setSearchOpen(false)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}

export { SATELLITE_META };

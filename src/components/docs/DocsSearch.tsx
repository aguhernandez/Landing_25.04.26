import { useState, useEffect, useRef } from 'react';
import { DocsPage, DocsSatellite } from '../../lib/supabase';
import { Search, X, FileText } from 'lucide-react';

interface DocsSearchProps {
  pages: DocsPage[];
  onNavigate: (slug: string) => void;
  onClose: () => void;
  darkMode: boolean;
}

export function DocsSearch({ pages, onNavigate, onClose, darkMode }: DocsSearchProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const results = query.trim().length < 2 ? [] : pages.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      (p.excerpt || '').toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      (p.content_markdown || '').toLowerCase().includes(q)
    );
  }).slice(0, 8);

  const overlay = darkMode ? 'bg-black/70' : 'bg-black/40';
  const modal = darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200';
  const input = darkMode ? 'bg-gray-800 text-gray-100 placeholder-gray-500' : 'bg-gray-50 text-gray-900 placeholder-gray-400';
  const resultHover = darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50';
  const resultText = darkMode ? 'text-gray-200' : 'text-gray-800';
  const muted = darkMode ? 'text-gray-500' : 'text-gray-400';

  return (
    <div className={`fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 ${overlay}`} onClick={onClose}>
      <div
        className={`w-full max-w-xl rounded-xl border shadow-2xl overflow-hidden ${modal}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className={`flex items-center gap-3 px-4 py-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <Search className={`w-5 h-5 flex-shrink-0 ${muted}`} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation..."
            className={`flex-1 outline-none bg-transparent text-sm font-jost ${darkMode ? 'text-gray-100 placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`}
          />
          <button onClick={onClose} className={`p-1 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <ul className="max-h-80 overflow-y-auto py-2">
            {results.map((page) => (
              <li key={page.id}>
                <button
                  onClick={() => onNavigate(page.slug)}
                  className={`w-full flex items-start gap-3 px-4 py-3 text-left transition ${resultHover}`}
                >
                  <FileText className={`w-4 h-4 mt-0.5 flex-shrink-0 ${muted}`} />
                  <div className="min-w-0">
                    <p className={`text-sm font-jost font-semibold truncate ${resultText}`}>{page.title}</p>
                    {page.excerpt && (
                      <p className={`text-xs font-jost mt-0.5 truncate ${muted}`}>{page.excerpt}</p>
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : query.trim().length >= 2 ? (
          <div className={`px-4 py-8 text-center text-sm font-jost ${muted}`}>
            No results for "{query}"
          </div>
        ) : (
          <div className={`px-4 py-6 text-center text-sm font-jost ${muted}`}>
            Type to search all documentation...
          </div>
        )}

        {/* Footer hint */}
        <div className={`flex items-center gap-4 px-4 py-2 text-xs font-jost border-t ${darkMode ? 'border-gray-800 text-gray-600' : 'border-gray-100 text-gray-400'}`}>
          <span><kbd className={`px-1.5 py-0.5 rounded text-[10px] ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>↵</kbd> to select</span>
          <span><kbd className={`px-1.5 py-0.5 rounded text-[10px] ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>Esc</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}

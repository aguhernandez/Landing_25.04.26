import { DocsPage, DocsSatellite } from '../../lib/supabase';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface DocsSidebarProps {
  pages: DocsPage[];
  currentSlug?: string;
  onNavigate: (slug: string) => void;
  satelliteMeta: Record<DocsSatellite, { label: string; color: string }>;
  darkMode: boolean;
}

const SATELLITE_ORDER: DocsSatellite[] = [
  'general',
  'hub',
  'lab',
  'endurance-planner',
  'nutrition-planner',
  'academy',
  'performance-vector',
  'motion',
];

export function DocsSidebar({ pages, currentSlug, onNavigate, satelliteMeta, darkMode }: DocsSidebarProps) {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const grouped = SATELLITE_ORDER.reduce((acc, sat) => {
    const satPages = pages.filter((p) => p.satellite === sat);
    if (satPages.length > 0) acc[sat] = satPages;
    return acc;
  }, {} as Record<string, DocsPage[]>);

  function toggleSatellite(sat: string) {
    setCollapsed((prev) => {
      const next = new Set(prev);
      next.has(sat) ? next.delete(sat) : next.add(sat);
      return next;
    });
  }

  const base = darkMode ? 'text-gray-300' : 'text-gray-700';
  const activeClass = darkMode
    ? 'bg-asciende-purple/20 text-white border-l-2 border-asciende-purple'
    : 'bg-asciende-purple/10 text-asciende-purple border-l-2 border-asciende-purple';
  const hoverClass = darkMode ? 'hover:bg-gray-800 hover:text-white' : 'hover:bg-gray-100 hover:text-gray-900';

  return (
    <nav className="py-4 px-2">
      {Object.entries(grouped).map(([sat, satPages]) => {
        const meta = satelliteMeta[sat as DocsSatellite];
        const isCollapsed = collapsed.has(sat);
        const topLevel = satPages.filter((p) => !p.parent_slug);
        const hasActive = satPages.some((p) => p.slug === currentSlug);

        return (
          <div key={sat} className="mb-2">
            <button
              onClick={() => toggleSatellite(sat)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-krona font-bold uppercase tracking-wider transition ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-800'}`}
            >
              <span>{meta.label}</span>
              {isCollapsed ? (
                <ChevronRight className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            {!isCollapsed && (
              <div className="ml-1">
                {topLevel.map((page) => {
                  const children = satPages.filter((p) => p.parent_slug === page.slug);
                  const isActive = page.slug === currentSlug;
                  const hasActiveChild = children.some((c) => c.slug === currentSlug);

                  return (
                    <div key={page.id}>
                      <button
                        onClick={() => onNavigate(page.slug)}
                        className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-jost transition text-left ${
                          isActive ? activeClass : `${base} ${hoverClass}`
                        }`}
                      >
                        <span className="flex-1">{page.title}</span>
                        {page.status !== 'stable' && (
                          <StatusBadge status={page.status} />
                        )}
                      </button>

                      {children.length > 0 && (
                        <div className="ml-3 border-l border-gray-200 dark:border-gray-700 pl-2 mt-0.5 mb-0.5">
                          {children.map((child) => (
                            <button
                              key={child.id}
                              onClick={() => onNavigate(child.slug)}
                              className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-jost transition text-left ${
                                child.slug === currentSlug ? activeClass : `${base} ${hoverClass}`
                              }`}
                            >
                              <span className="flex-1">{child.title}</span>
                              {child.status !== 'stable' && (
                                <StatusBadge status={child.status} />
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
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
    <span className={`text-[10px] font-krona px-1.5 py-0.5 rounded ${colors[status] || 'bg-gray-100 text-gray-500'}`}>
      {status}
    </span>
  );
}

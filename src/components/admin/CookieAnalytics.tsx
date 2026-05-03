import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Shield, TrendingUp, Users, BarChart2, Globe, RefreshCw } from 'lucide-react';

interface ConsentRow {
  id: string;
  session_id: string;
  language: string;
  action: string;
  necessary: boolean;
  statistics: boolean;
  preferences: boolean;
  marketing: boolean;
  unclassified: boolean;
  created_at: string;
}

interface Stats {
  total: number;
  acceptAll: number;
  denyAll: number;
  customize: number;
  withdraw: number;
  byLanguage: Record<string, number>;
  categoryRates: {
    statistics: number;
    preferences: number;
    marketing: number;
    unclassified: number;
  };
  last30Days: number;
}

export function CookieAnalytics() {
  const [records, setRecords] = useState<ConsentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cookie_consents')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(500);

      if (error) throw error;
      const rows: ConsentRow[] = data || [];
      setRecords(rows);
      computeStats(rows);
    } catch (err) {
      console.error('Error fetching cookie analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  const computeStats = (rows: ConsentRow[]) => {
    const total = rows.length;
    if (total === 0) {
      setStats({ total: 0, acceptAll: 0, denyAll: 0, customize: 0, withdraw: 0, byLanguage: {}, categoryRates: { statistics: 0, preferences: 0, marketing: 0, unclassified: 0 }, last30Days: 0 });
      return;
    }

    const acceptAll = rows.filter(r => r.action === 'accept_all').length;
    const denyAll = rows.filter(r => r.action === 'deny_all').length;
    const customize = rows.filter(r => r.action === 'customize').length;
    const withdraw = rows.filter(r => r.action === 'withdraw').length;

    const byLanguage: Record<string, number> = {};
    rows.forEach(r => {
      const lang = r.language || 'unknown';
      byLanguage[lang] = (byLanguage[lang] || 0) + 1;
    });

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 30);
    const last30Days = rows.filter(r => new Date(r.created_at) >= cutoff).length;

    const categoryRates = {
      statistics: Math.round((rows.filter(r => r.statistics).length / total) * 100),
      preferences: Math.round((rows.filter(r => r.preferences).length / total) * 100),
      marketing: Math.round((rows.filter(r => r.marketing).length / total) * 100),
      unclassified: Math.round((rows.filter(r => r.unclassified).length / total) * 100),
    };

    setStats({ total, acceptAll, denyAll, customize, withdraw, byLanguage, categoryRates, last30Days });
  };

  const pct = (n: number) => stats && stats.total > 0 ? Math.round((n / stats.total) * 100) : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 font-jost">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-krona font-bold text-asciende-purple">Cookie Analytics</h2>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-asciende-purple transition font-jost"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {!stats || stats.total === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Shield size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 font-jost">No consent records yet.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={<Users size={20} />} label="Total Records" value={stats.total} sub={`${stats.last30Days} last 30 days`} color="purple" />
            <StatCard icon={<TrendingUp size={20} />} label="Accept All" value={stats.acceptAll} sub={`${pct(stats.acceptAll)}% of total`} color="green" />
            <StatCard icon={<Shield size={20} />} label="Deny All" value={stats.denyAll} sub={`${pct(stats.denyAll)}% of total`} color="red" />
            <StatCard icon={<BarChart2 size={20} />} label="Customized" value={stats.customize} sub={`${pct(stats.customize)}% of total`} color="yellow" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-krona font-bold text-asciende-purple mb-5 text-sm">Consent Actions</h3>
              <div className="space-y-3">
                {[
                  { label: 'Accept All', value: stats.acceptAll, color: 'bg-emerald-400' },
                  { label: 'Deny All', value: stats.denyAll, color: 'bg-red-400' },
                  { label: 'Customized', value: stats.customize, color: 'bg-[#E8FF4D]' },
                  { label: 'Withdrawn', value: stats.withdraw, color: 'bg-gray-400' },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm font-jost mb-1">
                      <span className="text-gray-700">{item.label}</span>
                      <span className="font-semibold text-gray-900">{item.value} <span className="text-gray-400 font-normal">({pct(item.value)}%)</span></span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${item.color}`}
                        style={{ width: `${pct(item.value)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-krona font-bold text-asciende-purple mb-5 text-sm">Category Acceptance Rate</h3>
              <div className="space-y-3">
                {[
                  { label: 'Statistics', value: stats.categoryRates.statistics },
                  { label: 'Preferences', value: stats.categoryRates.preferences },
                  { label: 'Marketing', value: stats.categoryRates.marketing },
                  { label: 'Unclassified', value: stats.categoryRates.unclassified },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm font-jost mb-1">
                      <span className="text-gray-700">{item.label}</span>
                      <span className="font-semibold text-gray-900">{item.value}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-asciende-purple transition-all"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-krona font-bold text-asciende-purple mb-5 text-sm flex items-center gap-2">
                <Globe size={16} /> By Language
              </h3>
              <div className="space-y-3">
                {Object.entries(stats.byLanguage)
                  .sort((a, b) => b[1] - a[1])
                  .map(([lang, count]) => (
                    <div key={lang} className="flex items-center gap-3">
                      <span className="text-sm font-jost text-gray-500 w-12 uppercase">{lang}</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-asciende-purple/60"
                          style={{ width: `${pct(count)}%` }}
                        />
                      </div>
                      <span className="text-sm font-jost font-semibold text-gray-700 w-10 text-right">{count}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-krona font-bold text-asciende-purple mb-4 text-sm">Recent Records</h3>
              <div className="space-y-2 max-h-52 overflow-y-auto">
                {records.slice(0, 20).map(r => (
                  <div key={r.id} className="flex items-center justify-between text-xs font-jost border-b border-gray-50 pb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full font-medium ${
                        r.action === 'accept_all' ? 'bg-emerald-100 text-emerald-700' :
                        r.action === 'deny_all' ? 'bg-red-100 text-red-700' :
                        r.action === 'customize' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {r.action.replace('_', ' ')}
                      </span>
                      <span className="text-gray-400 uppercase">{r.language}</span>
                    </div>
                    <span className="text-gray-400">{new Date(r.created_at).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, sub, color }: { icon: React.ReactNode; label: string; value: number; sub: string; color: 'purple' | 'green' | 'red' | 'yellow' }) {
  const colors = {
    purple: 'bg-asciende-purple/10 text-asciende-purple',
    green: 'bg-emerald-100 text-emerald-600',
    red: 'bg-red-100 text-red-600',
    yellow: 'bg-[#E8FF4D]/50 text-yellow-700',
  };
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${colors[color]}`}>
        {icon}
      </div>
      <div className="text-2xl font-krona font-bold text-gray-900">{value.toLocaleString()}</div>
      <div className="text-sm font-jost font-semibold text-gray-700 mt-1">{label}</div>
      <div className="text-xs font-jost text-gray-400 mt-0.5">{sub}</div>
    </div>
  );
}

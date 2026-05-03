import { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronUp, Globe, Shield } from 'lucide-react';
import { cookieTranslations, Language } from './translations';
import {
  ConsentPreferences,
  ConsentRecord,
  getStoredConsent,
  saveConsent,
  defaultPreferences,
  allAccepted,
} from './consentService';

interface CookieBannerProps {
  onConsentSaved?: (record: ConsentRecord) => void;
}

type CategoryKey = 'statistics' | 'preferences' | 'marketing' | 'unclassified';

export function CookieBanner({ onConsentSaved }: CookieBannerProps) {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [expanded, setExpanded] = useState<CategoryKey | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [prefs, setPrefs] = useState<ConsentPreferences>(defaultPreferences);
  const [existingConsent, setExistingConsent] = useState<ConsentRecord | null>(null);
  const [saving, setSaving] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const t = cookieTranslations[language];

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      setExistingConsent(stored);
      setPrefs(stored.preferences);
      setLanguage(stored.language);
    } else {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = async () => {
    setSaving(true);
    const record = await saveConsent('accept_all', allAccepted, language);
    setExistingConsent(record);
    setPrefs(allAccepted);
    setSaving(false);
    setVisible(false);
    setShowSettings(false);
    onConsentSaved?.(record);
  };

  const handleDenyAll = async () => {
    setSaving(true);
    const record = await saveConsent('deny_all', defaultPreferences, language);
    setExistingConsent(record);
    setPrefs(defaultPreferences);
    setSaving(false);
    setVisible(false);
    setShowSettings(false);
    onConsentSaved?.(record);
  };

  const handleCustomize = async () => {
    if (!showDetails) {
      setShowDetails(true);
      return;
    }
    setSaving(true);
    const record = await saveConsent('customize', prefs, language);
    setExistingConsent(record);
    setSaving(false);
    setVisible(false);
    setShowSettings(false);
    onConsentSaved?.(record);
  };

  const handleWithdraw = async () => {
    setSaving(true);
    const record = await saveConsent('withdraw', defaultPreferences, language);
    setExistingConsent(record);
    setPrefs(defaultPreferences);
    setSaving(false);
    setShowSettings(false);
    onConsentSaved?.(record);
  };

  const toggleCategory = (key: CategoryKey) => {
    setExpanded(expanded === key ? null : key);
  };

  const togglePref = (key: CategoryKey) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString(
      language === 'de' ? 'de-DE' : language === 'es' ? 'es-ES' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    );
  };

  const categories: { key: CategoryKey; label: string; description: string }[] = [
    { key: 'statistics', label: t.categories.statistics.title, description: t.categories.statistics.description },
    { key: 'preferences', label: t.categories.preferences.title, description: t.categories.preferences.description },
    { key: 'marketing', label: t.categories.marketing.title, description: t.categories.marketing.description },
    { key: 'unclassified', label: t.categories.unclassified.title, description: t.categories.unclassified.description },
  ];

  const LanguageSelector = () => (
    <div className="flex items-center gap-1">
      <Globe className="w-3.5 h-3.5 text-gray-400" />
      <div className="flex gap-0.5">
        {(['en', 'es', 'de'] as Language[]).map(lang => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`px-1.5 py-0.5 text-xs font-medium rounded transition-colors uppercase ${
              language === lang
                ? 'bg-asciende-yellow text-black'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>
    </div>
  );

  const Toggle = ({ checked, onChange, disabled }: { checked: boolean; onChange: () => void; disabled?: boolean }) => (
    <button
      onClick={disabled ? undefined : onChange}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
      } ${checked ? 'bg-asciende-yellow' : 'bg-gray-300'}`}
      disabled={disabled}
      type="button"
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-1'
        }`}
      />
    </button>
  );

  if (showSettings && existingConsent) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-end justify-center sm:items-center p-4">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowSettings(false)} />
        <div className="relative w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <img src="/logo_transp.png" alt="Asciende" className="h-7 w-auto" />
              <span className="text-gray-900 font-semibold text-sm">{t.privacyTrigger.cookieSettings}</span>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSelector />
              <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-gray-700 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">{t.privacyTrigger.yourState}</span>
                <span className="capitalize font-medium text-gray-900">{existingConsent.action.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{t.privacyTrigger.consentDate}</span>
                <span className="text-gray-700">{formatDate(existingConsent.createdAt)}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500">{t.privacyTrigger.consentId}</span>
                <span className="text-xs font-mono text-gray-600 break-all">{existingConsent.id}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => { setShowSettings(false); setVisible(true); setShowDetails(true); }}
                className="w-full py-2.5 px-4 rounded-lg border border-gray-200 text-gray-700 text-sm hover:bg-gray-50 transition-colors text-left"
              >
                {t.privacyTrigger.changeConsent}
              </button>
              <button
                onClick={handleWithdraw}
                disabled={saving}
                className="w-full py-2.5 px-4 rounded-lg border border-red-200 text-red-500 text-sm hover:bg-red-50 transition-colors text-left disabled:opacity-60"
              >
                {t.privacyTrigger.withdrawConsent}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {existingConsent && !visible && (
        <button
          onClick={() => setShowSettings(true)}
          className="fixed bottom-5 left-5 z-[9998] flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-2 text-xs text-gray-600 hover:text-gray-900 hover:border-gray-400 shadow-md transition-all hover:scale-105"
        >
          <Shield className="w-3.5 h-3.5 text-gray-500" />
          <span>{t.privacyTrigger.cookieSettings}</span>
        </button>
      )}

      <div
        className={`fixed bottom-0 left-0 right-0 z-[9999] transition-transform duration-500 ease-out ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="bg-white border-t border-gray-200 shadow-2xl">
          <div className="max-w-5xl mx-auto p-5 sm:p-6">

            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <img src="/logo_transp.png" alt="Asciende" className="h-8 w-auto flex-shrink-0" />
                <h2 className="text-gray-900 font-semibold text-base leading-tight">{t.heading}</h2>
              </div>
              <LanguageSelector />
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-3">
              {t.body}
            </p>

            <div className="flex flex-wrap gap-2 mb-4 text-xs">
              <a
                href="https://asciende.pro/cookies"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 underline hover:text-gray-900 transition-colors"
              >
                {t.cookiesPrivacy}
              </a>
              <span className="text-gray-400">/</span>
              <a
                href="https://asciende.pro/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 underline hover:text-gray-900 transition-colors"
              >
                {t.privacyPolicy}
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <button
                onClick={handleDenyAll}
                disabled={saving}
                className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-60"
              >
                {t.deny}
              </button>
              <button
                onClick={handleCustomize}
                disabled={saving}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-60 ${
                  showDetails
                    ? 'text-black bg-asciende-yellow hover:bg-[#e8c820] font-semibold'
                    : 'text-gray-600 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {saving ? '...' : showDetails ? t.saveCustomize : t.customize}
              </button>
              <button
                onClick={handleAcceptAll}
                disabled={saving}
                className="px-5 py-2 text-sm font-semibold text-black bg-asciende-yellow rounded-lg hover:bg-[#e8c820] transition-colors disabled:opacity-60"
              >
                {saving ? '...' : t.accept}
              </button>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="ml-auto flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors"
              >
                {showDetails ? t.hideDetails : t.showDetails}
                {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {showDetails && (
              <div className="border-t border-gray-100 pt-4 space-y-4 max-h-72 overflow-y-auto pr-1 text-sm">
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <h3 className="text-gray-900 font-semibold text-sm">{t.generalIntro.title}</h3>
                  {[t.generalIntro.p1, t.generalIntro.p2, t.generalIntro.p3, t.generalIntro.p4, t.generalIntro.p5, t.generalIntro.p6].map((p, i) => (
                    <p key={i} className="text-gray-500 text-xs leading-relaxed">{p}</p>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-gray-900 font-medium text-sm">{t.categories.necessary.title}</span>
                        <p className="text-gray-500 text-xs mt-1 leading-relaxed">{t.categories.necessary.description}</p>
                      </div>
                      <span className="ml-4 flex-shrink-0 text-xs text-gray-500 font-medium">{t.categories.necessary.alwaysActive}</span>
                    </div>
                  </div>

                  {categories.map(cat => (
                    <div key={cat.key} className="bg-gray-50 rounded-xl overflow-hidden">
                      <div
                        className="flex items-center justify-between p-4 cursor-pointer"
                        onClick={() => toggleCategory(cat.key)}
                      >
                        <div className="flex items-center gap-3">
                          <Toggle
                            checked={prefs[cat.key]}
                            onChange={() => togglePref(cat.key)}
                          />
                          <span className="text-gray-900 font-medium text-sm">{cat.label}</span>
                        </div>
                        {expanded === cat.key ? (
                          <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      {expanded === cat.key && (
                        <div className="px-4 pb-4 pt-0">
                          <p className="text-gray-500 text-xs leading-relaxed">{cat.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

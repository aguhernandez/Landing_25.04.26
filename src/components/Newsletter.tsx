import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const BREVO_FORM_URL =
  'https://b7a4e46e.sibforms.com/serve/MUIFACL7Yna_eaf3t2uESdNqzDv9Jg26fCrgGp_9bm_UayIEQhCok7eK37LGB_VLTmVk-jYZZ6BonuvIzzD-mkZG36dnW0kXFShL40eUv8afdaUihQNZWevfBbiCxyH1PjKX1Q6YkqRi0iPYdu1j176musbAgLG9he9f2vtuTxnTzxk4hAZecIZaYXU77xWKGlYV1Cs07o9HjvjR';

interface NewsletterProps {
  title: string;
  subtitle: string;
  placeholder: string;
  namePlaceholder: string;
  buttonText: string;
  successMessage: string;
  errorMessage: string;
  consentLabel: string;
}

export function Newsletter({
  title,
  subtitle,
  placeholder,
  namePlaceholder,
  buttonText,
  successMessage,
  errorMessage,
  consentLabel,
}: NewsletterProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setIsLoading(true);
    setStatus('idle');

    try {
      const formData = new FormData();
      formData.append('EMAIL', email);
      formData.append('OPT_IN', '1');
      formData.append('email_address_check', '');
      formData.append('locale', 'es');

      // Split name into FIRSTNAME / LASTNAME for Brevo attributes
      const parts = name.trim().split(/\s+/);
      formData.append('FIRSTNAME', parts[0] ?? '');
      if (parts.length > 1) formData.append('LASTNAME', parts.slice(1).join(' '));

      const response = await fetch(BREVO_FORM_URL, {
        method: 'POST',
        body: formData,
        // No Content-Type header — browser sets it with boundary automatically
      });

      // Brevo returns a redirect (302) or an HTML page on success.
      // We treat any non-network-error response as success since
      // Brevo's endpoint always redirects/responds, even on success.
      if (response.ok || response.status === 0 || response.redirected) {
        setStatus('success');
        setName('');
        setEmail('');
        setConsent(false);
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        throw new Error('Subscription failed');
      }
    } catch {
      // fetch throws on network errors (CORS preflight failures, etc.)
      // Brevo's sibforms endpoint allows cross-origin POST with FormData,
      // but the response may be opaque. If fetch itself didn't throw, treat
      // it as success; only a real network failure reaches here.
      setStatus('error');
      setTimeout(() => setStatus('idle'), 6000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative bg-gray-950 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.06)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-krona font-bold tracking-widest text-asciende-yellow uppercase mb-4 border border-asciende-yellow/30 px-4 py-1.5 rounded-full bg-asciende-yellow/5">
            Newsletter
          </span>
          <h2 className="text-4xl md:text-5xl font-krona font-bold mb-4 text-white leading-tight">
            {title}
          </h2>
          <p className="text-gray-400 font-jost text-base leading-relaxed">
            {subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-0 bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-4">
            {/* Name + Email row */}
            <div className="flex flex-col sm:flex-row">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={namePlaceholder}
                required
                disabled={isLoading}
                className="flex-1 px-5 py-4 bg-transparent text-white placeholder-gray-500 focus:outline-none font-jost text-base disabled:cursor-not-allowed border-b sm:border-b-0 sm:border-r border-white/10"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                required
                disabled={isLoading}
                className="flex-1 px-5 py-4 bg-transparent text-white placeholder-gray-500 focus:outline-none font-jost text-base disabled:cursor-not-allowed"
              />
            </div>

            {/* Consent checkbox */}
            <div className="px-5 py-4 border-t border-white/10">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    disabled={isLoading}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center
                      ${consent
                        ? 'bg-asciende-yellow border-asciende-yellow'
                        : 'border-gray-500 group-hover:border-gray-300 bg-transparent'
                      }`}
                  >
                    {consent && (
                      <svg className="w-3 h-3 text-gray-900" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="font-jost text-sm text-gray-400 leading-snug group-hover:text-gray-300 transition-colors">
                  {consentLabel}
                </span>
              </label>
            </div>

            {/* Submit button */}
            <div className="px-2 pb-2">
              <button
                type="submit"
                disabled={isLoading || !email || !name || !consent}
                className="w-full px-6 py-3 rounded-xl bg-asciende-yellow text-asciende-purple font-krona font-bold text-sm hover:shadow-lg hover:shadow-asciende-yellow/20 transition-all duration-300 hover:scale-[1.01] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 inline-flex items-center gap-2 justify-center"
              >
                {isLoading ? '...' : buttonText}
                {!isLoading && <ArrowRight size={16} />}
              </button>
            </div>
          </div>

          {status === 'success' && (
            <div className="mt-2 p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/50 flex items-start gap-3">
              <CheckCircle className="text-emerald-400 flex-shrink-0 mt-0.5" size={18} />
              <p className="text-emerald-300 font-jost text-sm">{successMessage}</p>
            </div>
          )}

          {status === 'error' && (
            <div className="mt-2 p-4 rounded-xl bg-red-950/50 border border-red-800/50">
              <p className="text-red-300 font-jost text-sm">{errorMessage}</p>
            </div>
          )}
        </form>

        <p className="text-center text-gray-600 font-jost text-xs mt-5">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

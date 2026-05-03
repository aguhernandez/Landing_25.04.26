import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface NewsletterProps {
  title: string;
  subtitle: string;
  placeholder: string;
  buttonText: string;
  successMessage: string;
  errorMessage: string;
}

export function Newsletter({
  title,
  subtitle,
  placeholder,
  buttonText,
  successMessage,
  errorMessage,
}: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(
        `${supabaseUrl}/functions/v1/newsletter-subscribe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${supabaseAnonKey}`,
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(successMessage);
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error(data.error || 'Subscription failed');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : errorMessage);
      setTimeout(() => setStatus('idle'), 5000);
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

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white/5 border border-white/10 rounded-2xl">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              disabled={isLoading}
              className="flex-1 px-5 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none font-jost text-base disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={isLoading || !email}
              className="px-6 py-3 rounded-xl bg-asciende-yellow text-asciende-purple font-krona font-bold text-sm hover:shadow-lg hover:shadow-asciende-yellow/20 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 inline-flex items-center gap-2 justify-center whitespace-nowrap"
            >
              {isLoading ? 'Subscribing...' : buttonText}
              {!isLoading && <ArrowRight size={16} />}
            </button>
          </div>

          {status === 'success' && (
            <div className="mt-4 p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/50 flex items-start gap-3">
              <CheckCircle className="text-emerald-400 flex-shrink-0 mt-0.5" size={18} />
              <p className="text-emerald-300 font-jost text-sm">{message}</p>
            </div>
          )}

          {status === 'error' && (
            <div className="mt-4 p-4 rounded-xl bg-red-950/50 border border-red-800/50">
              <p className="text-red-300 font-jost text-sm">{message}</p>
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

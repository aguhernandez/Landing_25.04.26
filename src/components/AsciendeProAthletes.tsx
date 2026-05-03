import { useState } from 'react';

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    color: '#fdda36',
    darkColor: '#e6c420',
    title: 'Sponsorship Matchmaking',
    desc: 'Priority placement for sponsorship opportunities with aligned brands, organizations, and donors who believe in supporting emerging talent.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    color: '#60a5fa',
    darkColor: '#3b82f6',
    title: 'Education & Development',
    desc: 'Workshops, courses, and mentoring focused on sport science, injury prevention, and mental resilience, so we all speak the same language.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    color: '#34d399',
    darkColor: '#10b981',
    title: 'Personalized Performance Coaching',
    desc: 'Periodized training plans tailored to the athlete\'s needs, sport, and competitive calendar. Delivered and monitored through professional platforms.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    color: '#f97316',
    darkColor: '#ea580c',
    title: 'International Networking',
    desc: 'Connection with a global community of athletes, coaches, and experts to encourage peer support and cultural exchange.',
  },
];

const stats = [
  { num: '15+', label: 'Pro Athletes' },
  { num: '12+', label: 'Countries' },
  { num: '8+', label: 'Disciplines' },
  { num: '100%', label: 'Commitment' },
];

const steps = [
  { num: '01', title: 'Apply', desc: 'Submit your athlete profile and background. We review every application personally.' },
  { num: '02', title: 'Interview', desc: 'A brief conversation to understand your goals, context, and potential.' },
  { num: '03', title: 'Onboard', desc: 'Get matched with coaches, resources, and a personalized performance roadmap.' },
  { num: '04', title: 'Ascend', desc: 'Train, connect, and grow within a global ecosystem built for your success.' },
];

export function AsciendeProAthletes({ t }) {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  return (
    <div className="relative overflow-hidden">

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #2a2035 0%, #514163 45%, #3a2f48 100%)' }} />
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, #fdda3622 0%, transparent 65%)', transform: 'translate(-50%, -40%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, #60a5fa18 0%, transparent 65%)', transform: 'translate(30%, 35%)' }} />
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, #34d39910 0%, transparent 65%)', transform: 'translate(-50%, -50%)' }} />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none opacity-[0.04]">
          <img src="/asciendefavicon.png" alt="" className="w-full h-full object-contain animate-orbit" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-20">

          <div className="inline-flex items-center gap-3 mb-8 px-5 py-2 rounded-full border border-asciende-yellow/30 bg-asciende-yellow/5">
            <span className="w-2 h-2 rounded-full bg-asciende-yellow animate-pulse" />
            <span className="text-asciende-yellow font-krona text-xs tracking-widest uppercase">Founding Member — 50% OFF · Code: Asciende50</span>
            <span className="w-2 h-2 rounded-full bg-asciende-yellow animate-pulse" />
          </div>

          <h1 className="text-5xl md:text-7xl font-krona font-bold text-white mb-8 leading-tight">
            Asciende
            <span className="block" style={{ WebkitTextStroke: '1px #fdda36', color: 'transparent' }}>
              Pro Athletes
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/65 font-jost leading-relaxed max-w-3xl mx-auto mb-12">
            A membership program that breaks barriers for dedicated athletes from the Global South — giving you the tools, connections, and coaching to make sport your career.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:info@asciende.pro?subject=Asciende Pro Athletes Application"
              className="inline-flex items-center gap-3 bg-asciende-yellow text-asciende-purple px-8 py-4 rounded-full font-krona font-bold text-sm hover:shadow-[0_0_40px_rgba(253,218,54,0.4)] hover:scale-105 transition-all duration-300"
            >
              Apply Now
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <p className="text-white/40 font-jost text-sm">Only 100 founding spots available</p>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <p className="font-krona font-bold text-3xl md:text-4xl text-white mb-1">{s.num}</p>
                <p className="font-jost text-white/50 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #fff)' }} />
      </section>

      <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none" style={{ background: 'radial-gradient(circle, #fdda3610 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-6 h-px bg-asciende-purple/30" />
                <p className="text-xs font-krona tracking-widest text-asciende-purple/50 uppercase">Who We Are For</p>
              </div>
              <h2 className="text-3xl md:text-5xl font-krona font-bold text-gray-900 mb-8 leading-tight">
                Empowering Pro Athletes Worldwide
              </h2>
              <p className="text-gray-600 font-jost leading-relaxed text-lg mb-6">
                Atletas Pro Asciende is built for athletes who are fully dedicated to their sport, but whose context makes it difficult to make a living from it — whether because they were born in the Global South, practice a lesser-known discipline, or operate in a culture that doesn't support professional development.
              </p>
              <p className="text-gray-400 font-jost italic text-sm border-l-2 border-asciende-yellow pl-4">
                Memberships are granted after a successful application and can be canceled at any time.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl opacity-15 blur-2xl pointer-events-none" style={{ background: 'linear-gradient(135deg, #fdda36, #514163)' }} />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/fer_ush_montanas_atras.jpeg"
                  alt="Pro Athlete"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-gray-950/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                    <p className="font-jost text-white text-sm">
                      <span className="font-semibold">15+ athletes</span> currently in the program
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ background: 'linear-gradient(160deg, #f8f7fa 0%, #ffffff 50%, #f3f1f6 100%)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, #514163 0%, transparent 65%)', opacity: 0.035 }} />

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-10 h-px bg-asciende-purple/30" />
              <span className="text-asciende-purple font-krona text-xs tracking-widest uppercase opacity-60">The Program</span>
              <span className="w-10 h-px bg-asciende-purple/30" />
            </div>
            <h2 className="text-3xl md:text-5xl font-krona font-bold text-asciende-purple mb-5 leading-tight">
              What You Get
            </h2>
            <p className="text-gray-500 font-jost text-lg max-w-2xl mx-auto">
              Selected talents gain access to a structured performance pathway designed to elevate their potential.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="relative rounded-3xl p-8 cursor-pointer transition-all duration-500 overflow-hidden group"
                style={{
                  background: activeFeature === i
                    ? `linear-gradient(135deg, ${f.color}18, ${f.darkColor}10)`
                    : 'white',
                  border: activeFeature === i ? `1px solid ${f.color}50` : '1px solid #f0eeee',
                  boxShadow: activeFeature === i ? `0 20px 60px ${f.color}20` : '0 2px 12px rgba(0,0,0,0.04)',
                  transform: activeFeature === i ? 'translateY(-4px)' : 'none',
                }}
                onMouseEnter={() => setActiveFeature(i)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div
                  className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle, ${f.color}20 0%, transparent 70%)`,
                    transform: 'translate(30%, -30%)',
                    opacity: activeFeature === i ? 1 : 0,
                  }}
                />
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300"
                  style={{
                    background: activeFeature === i ? `linear-gradient(135deg, ${f.color}, ${f.darkColor})` : `${f.color}20`,
                    color: activeFeature === i ? 'white' : f.darkColor,
                    border: `1px solid ${f.color}40`,
                  }}
                >
                  {f.icon}
                </div>
                <h3 className="text-xl font-krona font-bold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-500 font-jost leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none" style={{ background: 'radial-gradient(circle, #fdda3610 0%, transparent 70%)', transform: 'translate(30%, 30%)' }} />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-10 h-px bg-asciende-purple/30" />
              <span className="text-asciende-purple font-krona text-xs tracking-widest uppercase opacity-60">The Process</span>
              <span className="w-10 h-px bg-asciende-purple/30" />
            </div>
            <h2 className="text-3xl md:text-4xl font-krona font-bold text-asciende-purple leading-tight">
              How It Works
            </h2>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-9 left-0 right-0 h-px bg-gradient-to-r from-transparent via-asciende-purple/20 to-transparent" />
            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <div key={step.num} className="relative text-center group">
                  <div className="relative inline-flex w-18 h-18 items-center justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-white border-2 border-asciende-purple/20 flex items-center justify-center mx-auto group-hover:border-asciende-yellow group-hover:shadow-[0_0_30px_rgba(253,218,54,0.3)] transition-all duration-400" style={{ width: '64px', height: '64px' }}>
                      <span className="font-krona font-bold text-asciende-purple text-lg">{step.num}</span>
                    </div>
                  </div>
                  <h3 className="font-krona font-bold text-gray-900 text-base mb-3">{step.title}</h3>
                  <p className="font-jost text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #2a2035 0%, #514163 50%, #3a2f48 100%)' }} />
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none opacity-25" style={{ background: 'radial-gradient(circle, #fdda36 0%, transparent 70%)', transform: 'translate(-50%, -50%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none opacity-20" style={{ background: 'radial-gradient(circle, #34d399 0%, transparent 70%)', transform: 'translate(30%, 40%)' }} />
        <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] rounded-full pointer-events-none opacity-15" style={{ background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-8 px-5 py-2 rounded-full border border-white/10 bg-white/5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/70 font-jost text-xs">Applications open — 100 spots total</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-krona font-bold text-white mb-6 leading-tight">
            Are you a natural talent
            <span className="block text-asciende-yellow">from the Global South?</span>
          </h2>

          <p className="text-xl text-white/65 font-jost leading-relaxed max-w-2xl mx-auto mb-12">
            We're looking for dedicated athletes ready to elevate their game. Apply now to join our growing community of pro athletes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:info@asciende.pro?subject=Asciende Pro Athletes Application"
              className="inline-flex items-center gap-3 bg-asciende-yellow text-asciende-purple px-10 py-4 rounded-full font-krona font-bold hover:shadow-[0_0_50px_rgba(253,218,54,0.5)] hover:scale-105 transition-all duration-300"
            >
              Apply Now
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a
              href="mailto:info@asciende.pro"
              className="inline-flex items-center gap-2 text-white/60 font-jost text-sm hover:text-white transition-colors duration-300"
            >
              or contact us
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

import { useEffect, useRef, useState } from 'react';

export function HowItWorks({ t }: { t: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    document.querySelectorAll('[data-step-card]').forEach((el, idx) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSteps(prev => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        },
        { threshold: 0.2 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  const steps = [
    {
      number: '01',
      title: t.howItWorks.step1,
      desc: t.howItWorks.step1Desc,
      accent: 'from-asciende-yellow/20 to-asciende-yellow/5',
      border: 'border-asciende-yellow/40',
      dot: 'bg-asciende-yellow',
    },
    {
      number: '02',
      title: t.howItWorks.step2,
      desc: t.howItWorks.step2Desc,
      accent: 'from-asciende-purple/10 to-asciende-purple/5',
      border: 'border-asciende-purple/30',
      dot: 'bg-asciende-purple',
    },
    {
      number: '03',
      title: t.howItWorks.step3,
      desc: t.howItWorks.step3Desc,
      accent: 'from-emerald-50 to-emerald-50/30',
      border: 'border-emerald-200',
      dot: 'bg-emerald-500',
    },
  ];

  return (
    <section ref={containerRef} className="relative w-full bg-white py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-asciende-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-asciende-purple/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-20">
          <span className="inline-block text-xs font-krona font-bold tracking-widest text-asciende-yellow uppercase mb-4 border border-asciende-yellow/30 px-4 py-1.5 rounded-full bg-asciende-yellow/5">
            Process
          </span>
          <h2 className="text-5xl md:text-6xl font-krona font-bold mb-5 text-asciende-purple leading-tight">
            {t.howItWorks.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-500 font-jost max-w-2xl mx-auto">
            {t.howItWorks.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              data-step-card
              className={`relative rounded-3xl p-8 border bg-gradient-to-br ${step.accent} ${step.border} transition-all duration-700 ease-out ${
                visibleSteps[idx]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-6xl font-krona font-bold text-gray-100 leading-none select-none">
                  {step.number}
                </span>
                <div className={`w-3 h-3 rounded-full ${step.dot} mt-2`} />
              </div>

              <h3 className="text-xl md:text-2xl font-krona font-bold text-asciende-purple mb-4 leading-tight">
                {step.title}
              </h3>
              <p className="text-gray-600 font-jost leading-relaxed text-sm md:text-base">
                {step.desc}
              </p>

              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-6 h-6 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center shadow-sm">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

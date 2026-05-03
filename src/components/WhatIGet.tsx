import { useEffect, useRef, useState } from 'react';
import {
  Activity, Apple, FlaskConical, Bike,
  Users, Target, Sparkles,
  ChevronRight, GraduationCap, TrendingUp,
} from 'lucide-react';

// side: 'left' | 'right', slot: vertical position index within that side (0 = top, 1 = mid, 2 = bot)
const satellites = [
  { icon: Bike,          label: 'Endurance Planner', color: '#2563eb', side: 'left',  slot: 0, delay: 0    },
  { icon: Apple,         label: 'Nutrition Planner', color: '#16a34a', side: 'left',  slot: 1, delay: 0.07 },
  { icon: GraduationCap, label: 'Academy',           color: '#7c3aed', side: 'left',  slot: 2, delay: 0.14 },
  { icon: Activity,      label: 'Biomechanics',      color: '#d97706', side: 'right', slot: 0, delay: 0.07 },
  { icon: FlaskConical,  label: 'Physiology Lab',    color: '#dc2626', side: 'right', slot: 1, delay: 0.14 },
  { icon: TrendingUp,    label: 'Performance',       color: '#0891b2', side: 'right', slot: 2, delay: 0.21 },
];

const planners = [
  {
    icon: Apple,
    title: 'Nutrition & Race Planner',
    desc: 'Periodized nutrition tailored to your race calendar and daily energy demands.',
    color: '#16a34a',
    bg: 'from-green-50 to-emerald-50/60',
    tag: 'Core',
  },
  {
    icon: FlaskConical,
    title: 'Physiology Lab',
    desc: 'VO2, lactate threshold, sweat tests and metabolic profiling — decoded for you.',
    color: '#dc2626',
    bg: 'from-red-50 to-rose-50/60',
    tag: 'Lab',
  },
  {
    icon: Bike,
    title: 'Endurance Trainer',
    desc: 'Structured blocks for cycling, running and triathlon grounded in science.',
    color: '#2563eb',
    bg: 'from-blue-50 to-sky-50/60',
    tag: 'Core',
  },
  {
    icon: Activity,
    title: 'Biomechanics',
    desc: 'Movement analysis and correction to prevent injury and unlock efficiency.',
    color: '#d97706',
    bg: 'from-amber-50 to-yellow-50/60',
    tag: 'Specialist',
  },
  {
    icon: GraduationCap,
    title: 'Academy',
    desc: 'Science-backed courses and resources to understand training, nutrition and recovery.',
    color: '#7c3aed',
    bg: 'from-violet-50/40 to-purple-50/30',
    tag: 'Core',
  },
  {
    icon: TrendingUp,
    title: 'Performance',
    desc: 'Track, analyze and benchmark your performance data across training cycles.',
    color: '#0891b2',
    bg: 'from-cyan-50 to-teal-50/60',
    tag: 'Core',
  },
  {
    icon: Target,
    title: 'Beach Volley Scouting',
    desc: 'Video scouting, opponent analysis and tactical game planning for beach volleyball.',
    color: '#d97706',
    bg: 'from-amber-50 to-yellow-50/60',
    tag: 'Specialist',
  },
  {
    icon: Sparkles,
    title: 'More to come…',
    desc: 'New satellites are always in development. The platform grows with your sport.',
    color: '#64748b',
    bg: 'from-slate-50/40 to-gray-50/30',
    tag: 'Soon',
    soon: true,
  },
];

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }
function easeInOutQuart(t: number) { return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2; }
function clamp(v: number, min = 0, max = 1) { return Math.min(Math.max(v, min), max); }
function mapRange(v: number, inMin: number, inMax: number) { return (v - inMin) / (inMax - inMin); }

export function WhatIGet() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const el = containerRef.current;
      const top = el.getBoundingClientRect().top;
      const h = el.clientHeight;
      const wh = window.innerHeight;
      if (top < 0 && top + h > wh) {
        setProgress(clamp(Math.abs(top) / (h - wh)));
      } else if (top >= 0) {
        setProgress(0);
      } else {
        setProgress(1);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Phase 1: phone tip → full reveal  [0 – 0.18]
  const phoneReveal = easeOutCubic(clamp(mapRange(progress, 0, 0.18)));
  // Phase 2: satellites orbit out     [0.16 – 0.34]
  const satelliteP = easeOutCubic(clamp(mapRange(progress, 0.16, 0.34)));
  // Phase 3: membership panel         [0.36 – 0.62]
  const membershipP = easeOutCubic(clamp(mapRange(progress, 0.36, 0.62)));
  // Phase 4: planners cards           [0.66 – 1.0]
  const plannersP = easeInOutQuart(clamp(mapRange(progress, 0.66, 1.0)));

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '700vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        <Scene
          phoneReveal={phoneReveal}
          satelliteP={satelliteP}
          membershipP={membershipP}
          plannersP={plannersP}
        />
      </div>
    </div>
  );
}

function Scene({
  phoneReveal,
  satelliteP,
  membershipP,
  plannersP,
}: {
  phoneReveal: number;
  satelliteP: number;
  membershipP: number;
  plannersP: number;
}) {
  const clipTop = (1 - phoneReveal) * 92;

  // phone fades out as membership takes over
  const phoneOpacity = clamp(1 - mapRange(membershipP, 0.1, 0.55));

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* bg glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 80%, rgba(88,28,135,0.07) 0%, transparent 65%)`,
          opacity: phoneReveal,
        }}
      />

      {/* scroll hint */}
      {phoneReveal < 0.18 && (
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: clamp(1 - phoneReveal * 6) }}
        >
          <span className="text-xs font-jost tracking-[0.25em] uppercase text-gray-400">Scroll to explore</span>
          <div className="w-px h-7 bg-gradient-to-b from-gray-300 to-transparent" />
        </div>
      )}

      {/* hub label above phone */}
      {phoneReveal > 0.06 && membershipP < 0.05 && (
        <div
          className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none"
          style={{
            top: '8%',
            opacity: clamp(phoneReveal * 3) * clamp(1 - satelliteP * 2),
          }}
        >
          <p className="text-xs font-jost font-bold tracking-[0.3em] uppercase text-gray-400 mb-1">Asciende Hub</p>
          <h2 className="text-3xl md:text-4xl font-krona font-bold text-asciende-purple">All in one platform</h2>
        </div>
      )}

      {/* phone */}
      <div
        className="absolute"
        style={{
          left: '50%',
          bottom: `${-88 + phoneReveal * 88}%`,
          transform: `translateX(-50%) scale(${0.52 + phoneReveal * 0.48})`,
          zIndex: 10,
          opacity: phoneOpacity,
        }}
      >
        <PhoneMockup clipTop={clipTop} />
      </div>

      {/* satellites */}
      {phoneReveal > 0.45 && satelliteP > 0 && plannersP < 0.1 && (
        <Satellites
          satelliteP={satelliteP}
          fadeOut={clamp(mapRange(membershipP, 0.05, 0.5))}
        />
      )}

      {/* membership panel — visible from phase 3 through end of phase 3 */}
      {membershipP > 0.01 && plannersP < 0.08 && (
        <MembershipPanel progress={membershipP} fadeOut={plannersP} />
      )}

      {/* planners section */}
      {plannersP > 0.01 && (
        <PlannersSection progress={plannersP} />
      )}
    </div>
  );
}

function PhoneMockup({ clipTop }: { clipTop: number }) {
  const W = 290, H = 590, R = 42;
  return (
    <div
      style={{
        width: W, height: H,
        clipPath: `inset(${clipTop}% 0 0 0 round ${R}px)`,
        filter: 'drop-shadow(0 28px 70px rgba(88,28,135,0.24)) drop-shadow(0 6px 20px rgba(0,0,0,0.12))',
      }}
    >
      <div
        style={{
          width: W, height: H, borderRadius: R,
          background: '#160a28', border: '7px solid #2a1540',
          overflow: 'hidden', position: 'relative', boxSizing: 'border-box',
        }}
      >
        <div style={{
          position: 'absolute', top: 0, left: '50%',
          transform: 'translateX(-50%)', width: 90, height: 24,
          background: '#160a28', borderRadius: '0 0 16px 16px', zIndex: 20,
        }} />
        <img
          src="/Screen_phone_nutrition.png" alt="Asciende Hub"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg, rgba(22,10,40,0.35) 0%, transparent 28%)`,
        }} />
      </div>
    </div>
  );
}

function Satellites({
  satelliteP, fadeOut,
}: { satelliteP: number; fadeOut: number }) {
  // Phone mockup is ~290px wide centered. We place satellites on left/right columns.
  // phoneHalfW = half the phone width + gap so bubbles clear the phone edge.
  const phoneHalfW = 185;
  // 3 slots per side, evenly spread vertically around the phone centre.
  const slotOffsets = [-165, 0, 165];

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 20, opacity: 1 - fadeOut }}>
      {satellites.map((sat, i) => {
        const dp = clamp(mapRange(satelliteP, sat.delay, sat.delay + 0.55));
        const eased = easeOutCubic(dp);
        const lineP = clamp(mapRange(satelliteP, sat.delay + 0.3, sat.delay + 0.65));

        const targetX = sat.side === 'left' ? -phoneHalfW : phoneHalfW;
        const targetY = slotOffsets[sat.slot] ?? 0;

        // Animate from phone centre outward
        const x = targetX * eased;
        const y = targetY + (0 - targetY) * (1 - eased);

        // Line endpoint: midpoint toward phone centre
        const lineEndX = -x * 0.55;
        const lineEndY = -y * 0.55;

        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              opacity: eased,
            }}
          >
            <svg
              className="absolute"
              style={{ left: '50%', top: '50%', overflow: 'visible', transform: 'translate(-50%,-50%)', opacity: lineP * 0.55 }}
              width="1" height="1"
            >
              <line x1={0} y1={0} x2={lineEndX} y2={lineEndY} stroke={sat.color} strokeWidth="1.5" strokeDasharray="5 4" />
            </svg>
            <div className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg ${sat.side === 'right' ? 'flex-row' : 'flex-row-reverse'}`}
              style={{
                background: 'rgba(255,255,255,0.97)',
                border: `1.5px solid ${sat.color}40`,
                boxShadow: `0 4px 24px ${sat.color}20, 0 1px 6px rgba(0,0,0,0.08)`,
                minWidth: 160,
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${sat.color}18`, border: `1.5px solid ${sat.color}35` }}
              >
                <sat.icon size={22} style={{ color: sat.color }} />
              </div>
              <span
                className="text-sm font-jost font-bold whitespace-nowrap"
                style={{ color: sat.color }}
              >
                {sat.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MembershipPanel({ progress, fadeOut }: { progress: number; fadeOut: number }) {
  const imgIn  = easeOutCubic(clamp(mapRange(progress, 0, 0.30)));
  const textIn = easeOutCubic(clamp(mapRange(progress, 0.18, 0.60)));
  const subIn  = easeOutCubic(clamp(mapRange(progress, 0.36, 0.80)));
  const globalOpacity = clamp(1 - fadeOut * 10);

  return (
    <div
      className="absolute inset-0"
      style={{ zIndex: 30, opacity: globalOpacity, pointerEvents: 'none' }}
    >
      {/* full-bleed image */}
      <div
        className="absolute inset-0"
        style={{
          opacity: imgIn,
          transform: `scale(${1.04 - imgIn * 0.04})`,
        }}
      >
        <img
          src="/women_cycling.jpg"
          alt="Community"
          className="w-full h-full object-cover object-center"
        />
        {/* gradient overlay so text is always readable */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(8,4,20,0.92) 0%, rgba(8,4,20,0.65) 45%, rgba(8,4,20,0.30) 100%)',
          }}
        />
      </div>

      {/* content — bottom-aligned like a cinematic title card */}
      <div
        className="absolute inset-0 flex flex-col justify-end items-center pb-20 px-6 md:px-16"
      >
        {/* badge */}
        <div
          className="mb-5"
          style={{ opacity: textIn, transform: `translateY(${(1 - textIn) * 18}px)` }}
        >
          <span
            className="inline-block text-[11px] font-jost font-bold tracking-[0.34em] uppercase px-4 py-1.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.14)' }}
          >
            Membership
          </span>
        </div>

        {/* main headline */}
        <div
          className="text-center mb-6"
          style={{ opacity: textIn, transform: `translateY(${(1 - textIn) * 22}px)` }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-krona font-bold text-white leading-[1.05]">
            Your training and<br />nutrition planned.
          </h2>
          <p className="mt-3 text-xl md:text-2xl font-jost font-semibold text-white/60">
            + community and brand support.
          </p>
        </div>

        {/* supporting copy */}
        <div
          className="text-center max-w-2xl"
          style={{ opacity: subIn, transform: `translateY(${(1 - subIn) * 14}px)` }}
        >
          <p className="text-base md:text-lg font-jost text-white/55 leading-relaxed">
            With your membership, training and nutrition planning grounded in science —{' '}
            <span className="text-white/85 font-semibold">plus the ability to receive and give support</span>{' '}
            through the community and brands.
          </p>
        </div>
      </div>
    </div>
  );
}

function PlannersSection({ progress }: { progress: number }) {
  const headerIn = easeOutCubic(clamp(mapRange(progress, 0, 0.25)));

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
      style={{ zIndex: 40 }}
    >
      {/* dark overlay bg that slides in */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(160deg, #0d0520 0%, #1a0a38 60%, #0f1629 100%)',
          opacity: easeOutCubic(clamp(mapRange(progress, 0, 0.2))),
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10">
        {/* header */}
        <div
          className="text-center mb-10"
          style={{
            opacity: headerIn,
            transform: `translateY(${(1 - headerIn) * 28}px)`,
          }}
        >
          <p className="text-xs font-jost font-bold tracking-[0.3em] uppercase text-asciende-yellow mb-2">
            Satellites
          </p>
          <h2 className="text-3xl md:text-5xl font-krona font-bold text-white leading-tight">
            Go deeper when performance<br className="hidden md:block" /> demands it.
          </h2>
          <p className="text-sm md:text-base text-white/50 font-jost mt-3 max-w-xl mx-auto leading-relaxed">
            Sport-specific tools fully connected to your Hub — each one built around real athletic needs.
          </p>
        </div>

        {/* cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {planners.map((p, i) => {
            const cardDelay = 0.18 + i * 0.09;
            const cardP = easeOutCubic(clamp(mapRange(progress, cardDelay, cardDelay + 0.35)));
            return (
              <div
                key={i}
                style={{
                  opacity: cardP,
                  transform: `translateY(${(1 - cardP) * 32}px)`,
                }}
              >
                <PlannerCard planner={p} />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className="flex justify-center mt-8"
          style={{
            opacity: easeOutCubic(clamp(mapRange(progress, 0.75, 1))),
            transform: `translateY(${(1 - easeOutCubic(clamp(mapRange(progress, 0.75, 1)))) * 16}px)`,
          }}
        >
          <a
            href="https://hub.asciende.pro"
            className="pointer-events-auto inline-flex items-center gap-2 bg-asciende-yellow text-asciende-purple px-8 py-3.5 rounded-full font-krona font-bold text-sm hover:shadow-2xl hover:scale-105 transition-all duration-200"
          >
            Explore all satellites
            <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

function PlannerCard({ planner }: { planner: typeof planners[number] }) {
  const tagColors: Record<string, string> = {
    Core:       'bg-white/10 text-white/70',
    Lab:        'bg-red-500/20 text-red-300',
    Specialist: 'bg-amber-500/20 text-amber-300',
    Soon:       'bg-violet-500/20 text-violet-300',
  };

  return (
    <div
      className="relative flex flex-col gap-3 p-5 rounded-2xl border group overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.04)',
        borderColor: planner.soon ? 'rgba(255,255,255,0.08)' : `${planner.color}30`,
      }}
    >
      {/* glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(ellipse at 30% 40%, ${planner.color}18 0%, transparent 65%)` }}
      />

      <div className="flex items-start justify-between gap-2">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${planner.color}20`, border: `1px solid ${planner.color}35` }}
        >
          <planner.icon size={19} style={{ color: planner.color }} />
        </div>
        <span className={`text-[10px] font-jost font-bold px-2 py-0.5 rounded-full tracking-wide ${tagColors[planner.tag] || 'bg-white/10 text-white/60'}`}>
          {planner.tag}
        </span>
      </div>

      <div>
        <h3 className={`text-sm font-krona font-bold mb-1 leading-tight ${planner.soon ? 'text-white/40' : 'text-white'}`}>
          {planner.title}
        </h3>
        <p className="text-xs font-jost text-white/45 leading-relaxed">{planner.desc}</p>
      </div>

      {!planner.soon && (
        <div className="mt-auto pt-1">
          <span
            className="text-xs font-jost font-semibold flex items-center gap-1"
            style={{ color: planner.color }}
          >
            Learn more <ChevronRight size={12} />
          </span>
        </div>
      )}
    </div>
  );
}

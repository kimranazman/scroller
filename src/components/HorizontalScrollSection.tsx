'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    title: 'Inspection',
    description: 'High-definition visual and ultrasonic inspection of subsea assets, pipelines, and structures with real-time data transmission.',
    color: 'from-cyan-500 to-blue-500',
    icon: '📡',
    features: ['4K Video', 'UT Thickness', 'CP Survey'],
  },
  {
    title: 'Intervention',
    description: 'Precise manipulation and tooling operations for valve operation, hot stabs, and equipment installation.',
    color: 'from-amber-500 to-orange-500',
    icon: '🔧',
    features: ['7-Function Arms', 'Torque Tools', 'Hot Stab'],
  },
  {
    title: 'Construction',
    description: 'Supporting complex subsea construction with heavy lift, survey, and positioning capabilities.',
    color: 'from-emerald-500 to-teal-500',
    icon: '🏗️',
    features: ['Heavy Lift', 'Metrology', 'Tie-in Support'],
  },
  {
    title: 'Maintenance',
    description: 'Routine and emergency maintenance operations including cleaning, cutting, and repair work.',
    color: 'from-purple-500 to-indigo-500',
    icon: '⚙️',
    features: ['Jetting', 'Cutting', 'Debris Removal'],
  },
];

export default function HorizontalScrollSection() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const progress = progressRef.current;

      if (track) {
        const totalWidth = track.scrollWidth - window.innerWidth;

        const scrollTween = gsap.to(track, {
          x: -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: () => `+=${totalWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progress) {
                gsap.to(progress, {
                  width: `${self.progress * 100}%`,
                  duration: 0.1,
                });
              }
            },
          },
        });

        // Card entrance animations
        const cards = track.querySelectorAll('.capability-card');
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0.5, scale: 0.95 },
            {
              opacity: 1,
              scale: 1,
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: 'left 80%',
                end: 'left 30%',
                scrub: 1,
              },
            }
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-[#0a1628]"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-cyan-950/10 to-[#0a1628]" />

      {/* Sonar rings decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {[1, 2, 3].map((ring) => (
          <div
            key={ring}
            className="absolute rounded-full border border-cyan-500/10"
            style={{
              width: `${ring * 300}px`,
              height: `${ring * 300}px`,
              left: `${-ring * 150}px`,
              top: `${-ring * 150}px`,
              animation: `pulse-glow ${4 + ring}s ease-in-out infinite`,
              animationDelay: `${ring * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Section title */}
      <div className="absolute top-20 left-0 right-0 text-center z-10">
        <div className="inline-block px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 mb-4">
          <span className="text-cyan-400 text-sm font-mono uppercase tracking-wider">
            ROV Operations
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white/20">
          CAPABILITIES
        </h2>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="absolute top-0 left-0 h-full flex items-center gap-8 px-[10vw] horizontal-scroll-section"
        style={{ width: 'fit-content' }}
      >
        {/* Initial spacer */}
        <div className="w-[20vw] flex-shrink-0" />

        {capabilities.map((capability, i) => (
          <div
            key={i}
            className="capability-card w-[75vw] md:w-[45vw] lg:w-[35vw] h-[65vh] rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group flex-shrink-0"
            style={{ perspective: '1000px' }}
          >
            {/* Card background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${capability.color} opacity-5 group-hover:opacity-15 transition-opacity duration-500`} />
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" />
            <div className="absolute inset-[1px] rounded-3xl border border-white/10 group-hover:border-cyan-500/30 transition-colors duration-500" />

            {/* Glow effect */}
            <div className={`absolute -inset-40 bg-gradient-to-r ${capability.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700`} />

            {/* Top section */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm uppercase tracking-widest text-slate-500 font-mono">
                  0{i + 1}
                </span>
                <div className="text-4xl opacity-50 group-hover:opacity-80 transition-opacity duration-500">
                  {capability.icon}
                </div>
              </div>

              <h3 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r ${capability.color} bg-clip-text text-transparent`}>
                {capability.title}
              </h3>
              <p className="text-lg text-slate-400 leading-relaxed">
                {capability.description}
              </p>
            </div>

            {/* Bottom section - Features */}
            <div className="relative z-10">
              <div className="flex flex-wrap gap-3">
                {capability.features.map((feature, j) => (
                  <span
                    key={j}
                    className="px-4 py-2 text-sm font-mono text-slate-300 bg-slate-800/50 rounded-lg border border-slate-700/50 group-hover:border-cyan-500/30 transition-colors duration-300"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* End spacer */}
        <div className="w-[30vw] flex-shrink-0" />
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48">
        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-cyan-500 to-amber-500 rounded-full"
            style={{ width: '0%' }}
          />
        </div>
        <p className="text-center text-slate-500 text-sm mt-3 font-mono uppercase tracking-wider">
          Scroll to explore
        </p>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 3000, suffix: 'm', label: 'Maximum Depth Rating', icon: '📏' },
  { value: 150, suffix: '+', label: 'ROV Fleet Size', icon: '🤖' },
  { value: 99.9, suffix: '%', label: 'Operational Uptime', icon: '⚡' },
  { value: 2.5, suffix: 'M', label: 'Hours Subsea', icon: '⏱️' },
];

const achievements = [
  { value: '40+', label: 'Countries Served' },
  { value: '24/7', label: 'Global Support' },
  { value: 'ISO 9001', label: 'Certified' },
  { value: 'IMCA', label: 'Compliant' },
];

export default function NumbersSection() {
  const containerRef = useRef<HTMLElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = numbersRef.current?.querySelectorAll('.stat-item');

      items?.forEach((item, i) => {
        const valueEl = item.querySelector('.stat-value');
        const targetValue = parseFloat(valueEl?.getAttribute('data-value') || '0');

        // Animate numbers counting up
        gsap.fromTo(
          { val: 0 },
          { val: targetValue },
          {
            val: targetValue,
            duration: 2.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            onUpdate: function () {
              if (valueEl) {
                const current = this.targets()[0].val;
                if (targetValue % 1 !== 0) {
                  valueEl.textContent = current.toFixed(1);
                } else {
                  valueEl.textContent = Math.round(current).toString();
                }
              }
            },
          }
        );

        // Stagger entrance
        gsap.fromTo(
          item,
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            delay: i * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Achievements animation
      const achievementItems = achievementsRef.current?.querySelectorAll('.achievement-item');
      achievementItems?.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: i * 0.1 + 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: achievementsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-48 px-6 overflow-hidden bg-gradient-to-b from-[#0a1628] to-[#071520]"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full">
          <defs>
            <pattern id="stats-grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1" fill="#0ea5e9" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stats-grid)" />
        </svg>
      </div>

      {/* Depth line decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-px bg-gradient-to-b from-cyan-500/30 via-cyan-500/10 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 mb-6">
            <span className="text-cyan-400 text-sm font-mono uppercase tracking-wider">
              Performance Metrics
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Industry-Leading <span className="gradient-text-cyan">Results</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Decades of experience delivering reliable subsea solutions across the globe
          </p>
        </div>

        {/* Main Stats Grid */}
        <div
          ref={numbersRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-20"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-item text-center group p-6 rounded-2xl bg-slate-900/30 border border-slate-800/50 hover:border-cyan-500/30 transition-all duration-500"
            >
              {/* Icon */}
              <div className="text-4xl mb-4 opacity-60 group-hover:opacity-100 transition-opacity">
                {stat.icon}
              </div>

              {/* Number */}
              <div className="relative inline-block mb-4">
                <span
                  className="stat-value text-5xl md:text-6xl lg:text-7xl font-bold gradient-text-cyan"
                  data-value={stat.value}
                >
                  0
                </span>
                <span className="text-2xl md:text-3xl font-bold text-cyan-400/50 ml-1">
                  {stat.suffix}
                </span>

                {/* Glow on hover */}
                <div className="absolute inset-0 bg-cyan-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Label */}
              <p className="text-slate-400 text-sm uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Achievements Bar */}
        <div
          ref={achievementsRef}
          className="flex flex-wrap justify-center gap-8 md:gap-16 pt-12 border-t border-slate-800/50"
        >
          {achievements.map((item, i) => (
            <div key={i} className="achievement-item text-center">
              <div className="text-2xl font-bold text-amber-400 mb-1">{item.value}</div>
              <div className="text-sm text-slate-500 uppercase tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

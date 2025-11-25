'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 99.9, suffix: '%', label: 'Uptime Guaranteed' },
  { value: 60, suffix: 'fps', label: 'Smooth Animations' },
  { value: 100, suffix: 'K+', label: 'Lines of Code' },
  { value: 24, suffix: '/7', label: 'Support Available' },
];

export default function NumbersSection() {
  const containerRef = useRef<HTMLElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);

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
            duration: 2,
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
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
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
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent" />

      {/* Decorative line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white/10 uppercase tracking-wider">
            By The Numbers
          </h2>
        </div>

        <div
          ref={numbersRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((stat, i) => (
            <div key={i} className="stat-item text-center group">
              <div className="relative inline-block mb-4">
                <span
                  className="stat-value text-6xl md:text-7xl lg:text-8xl font-bold gradient-text"
                  data-value={stat.value}
                >
                  0
                </span>
                <span className="text-3xl md:text-4xl font-bold text-white/40 ml-1">
                  {stat.suffix}
                </span>

                {/* Glow on hover */}
                <div className="absolute inset-0 bg-indigo-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <p className="text-white/40 text-sm uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

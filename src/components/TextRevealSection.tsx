'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TextRevealSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll('.word');

      if (words) {
        gsap.fromTo(
          words,
          { opacity: 0.1 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const text = "Operating at depths where sunlight never reaches, our ROV fleet performs critical subsea interventions with surgical precision. From wellhead maintenance to pipeline inspection, we bring human expertise to the most extreme environments on Earth.";
  const words = text.split(' ');

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center py-32 px-6 relative bg-[#071520]"
    >
      {/* Depth markers decoration */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
      <div className="absolute right-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />

      {/* Depth indicators */}
      <div className="absolute left-4 top-1/4 text-cyan-500/20 font-mono text-xs">1000m</div>
      <div className="absolute left-4 top-1/2 text-cyan-500/30 font-mono text-xs">2000m</div>
      <div className="absolute left-4 top-3/4 text-cyan-500/40 font-mono text-xs">3000m</div>

      {/* Underwater particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent" />

      <div
        ref={textRef}
        className="max-w-5xl mx-auto text-3xl md:text-4xl lg:text-5xl font-semibold leading-relaxed text-center"
      >
        {words.map((word, i) => (
          <span key={i} className="word inline-block text-white/90 mr-[0.3em]">
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}

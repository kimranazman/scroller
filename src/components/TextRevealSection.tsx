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

  const text = "From deep-sea exploration to refined delivery, we engineer complete energy solutions. Our expertise spans upstream drilling, midstream transportation, and downstream processing with uncompromising safety standards.";
  const words = text.split(' ');

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center py-32 px-6 relative"
    >
      {/* Pipeline decoration */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-96 bg-gradient-to-b from-transparent via-orange-500/20 to-transparent" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-96 bg-gradient-to-b from-transparent via-sky-500/20 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-950/10 to-transparent" />

      <div
        ref={textRef}
        className="max-w-5xl mx-auto text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-center"
      >
        {words.map((word, i) => (
          <span key={i} className="word inline-block mr-4 text-white/90">
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScaleRevealSection() {
  const containerRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scale up the box
      gsap.fromTo(
        boxRef.current,
        { scale: 0.3, borderRadius: '50%' },
        {
          scale: 1,
          borderRadius: '24px',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'top 10%',
            scrub: 1,
          },
        }
      );

      // Fade in content
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 30%',
            end: 'top 0%',
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-32 px-6"
    >
      <div
        ref={boxRef}
        className="relative w-full max-w-5xl aspect-video overflow-hidden"
      >
        {/* Gradient background - oil & gas industrial */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-amber-600 to-sky-700 opacity-90" />

        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-white/20 to-transparent" />
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-black/30 to-transparent" />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-30" />

        {/* Content */}
        <div
          ref={contentRef}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8"
        >
          <span className="text-white/60 text-sm uppercase tracking-widest mb-6">
            Offshore Excellence
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Deep Water
            <br />
            <span className="text-white/80">Innovation</span>
          </h2>
          <p className="text-lg text-white/70 max-w-lg">
            Pioneering ultra-deepwater drilling at depths exceeding 10,000 feet.
            Where others see limits, we see opportunities.
          </p>

          <button className="mt-10 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300 group">
            <span className="flex items-center gap-2">
              View Projects
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/30" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/30" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/30" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/30" />
      </div>
    </section>
  );
}

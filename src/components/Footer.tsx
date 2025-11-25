'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={containerRef}
      className="relative py-32 px-6 overflow-hidden bg-black"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-950/30 via-orange-950/10 to-transparent" />

      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div
        ref={contentRef}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <h2 className="text-5xl md:text-7xl font-bold mb-8">
          <span className="gradient-text">Partner With</span>
          <br />
          <span className="text-white/90">Industry Leaders</span>
        </h2>

        <p className="text-xl text-white/50 mb-12 max-w-xl mx-auto">
          Join the world&apos;s most innovative energy companies.
          Together, we power progress.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full text-white font-medium hover:opacity-90 transition-opacity glow">
            Contact Us
          </button>
          <button className="px-8 py-4 bg-white/5 border border-orange-500/20 rounded-full text-white/70 font-medium hover:bg-white/10 transition-colors">
            View Capabilities
          </button>
        </div>

        <div className="mt-24 pt-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-2xl font-bold gradient-text">
              PETROFLOW
            </div>

            <div className="flex items-center gap-8 text-white/30 text-sm">
              <span>Global Energy Solutions</span>
              <span>&copy; 2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 opacity-50" />
    </footer>
  );
}

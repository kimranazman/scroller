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
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/30 to-transparent" />

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div
        ref={contentRef}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <h2 className="text-5xl md:text-7xl font-bold mb-8">
          <span className="gradient-text">Ready to</span>
          <br />
          <span className="text-white/90">Get Started?</span>
        </h2>

        <p className="text-xl text-white/50 mb-12 max-w-xl mx-auto">
          Create stunning scroll experiences that captivate your users
          and leave lasting impressions.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white font-medium hover:opacity-90 transition-opacity glow">
            Start Building
          </button>
          <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white/70 font-medium hover:bg-white/10 transition-colors">
            View Documentation
          </button>
        </div>

        <div className="mt-24 pt-12 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-2xl font-bold gradient-text">
              SCROLLER
            </div>

            <div className="flex items-center gap-8 text-white/30 text-sm">
              <span>Built with GSAP & Next.js</span>
              <span>&copy; 2024</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

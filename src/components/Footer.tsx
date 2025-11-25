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
      className="relative py-32 px-6 overflow-hidden bg-[#030810]"
    >
      {/* Background - Deep ocean floor */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/20 via-slate-950/50 to-transparent" />

      {/* Underwater particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 100}%`,
              animation: `bubble-rise ${15 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div
        ref={contentRef}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        {/* ROV Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-amber-500/20 border border-cyan-500/30 flex items-center justify-center">
            <span className="text-4xl">🤖</span>
          </div>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold mb-8">
          <span className="text-white">Ready to</span>
          <br />
          <span className="gradient-text-cyan">Go Deeper?</span>
        </h2>

        <p className="text-xl text-slate-400 mb-12 max-w-xl mx-auto">
          Partner with the industry&apos;s leading subsea solutions provider.
          From concept to completion, we deliver results at any depth.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-105">
            Request a Quote
          </button>
          <button className="px-8 py-4 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-cyan-400 font-semibold hover:bg-cyan-500/10 transition-all duration-300">
            View Fleet Specs
          </button>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-sm">
          {[
            { title: 'Services', items: ['Inspection', 'Intervention', 'Construction'] },
            { title: 'Fleet', items: ['Work-Class ROV', 'Observation ROV', 'AUV Systems'] },
            { title: 'Industries', items: ['Oil & Gas', 'Renewables', 'Telecommunications'] },
            { title: 'Support', items: ['24/7 Operations', 'Training', 'Documentation'] },
          ].map((section, i) => (
            <div key={i} className="text-left">
              <h4 className="text-cyan-400 font-semibold mb-3 uppercase tracking-wider text-xs">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.items.map((item, j) => (
                  <li key={j}>
                    <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-12 border-t border-slate-800/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-2xl font-bold">
              <span className="gradient-text-cyan">DEEP</span>
              <span className="text-amber-400">ROV</span>
            </div>

            <div className="flex items-center gap-8 text-slate-500 text-sm">
              <span>Subsea Excellence</span>
              <span>•</span>
              <span>&copy; 2024 DeepROV Solutions</span>
            </div>

            {/* Certifications */}
            <div className="flex items-center gap-4">
              {['ISO 9001', 'IMCA', 'API'].map((cert, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-mono text-slate-500 bg-slate-900/50 rounded border border-slate-800/50"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative line - ROV navigation lights */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-600 via-amber-500 to-cyan-600 opacity-50" />
    </footer>
  );
}

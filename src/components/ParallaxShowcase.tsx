'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Different parallax speeds for each layer
      gsap.to(layer1Ref.current, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(layer2Ref.current, {
        yPercent: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(layer3Ref.current, {
        yPercent: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Text scale animation
      gsap.fromTo(
        textRef.current,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'top 20%',
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
      className="relative min-h-[150vh] overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-sky-950/20 to-black" />

      {/* Parallax layers - pipeline/industrial shapes */}
      <div ref={layer1Ref} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-40 h-40 border border-orange-500/20 rounded-full" />
        <div className="absolute top-[60%] right-[15%] w-60 h-60 border border-sky-500/20 rounded-full" />
        {/* Pipeline horizontal */}
        <div className="absolute top-[40%] left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent" />
      </div>

      <div ref={layer2Ref} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[30%] right-[20%] w-4 h-4 bg-orange-500/40 rounded-full blur-sm" />
        <div className="absolute top-[50%] left-[20%] w-6 h-6 bg-sky-500/40 rounded-full blur-sm" />
        <div className="absolute top-[70%] right-[40%] w-3 h-3 bg-amber-500/40 rounded-full blur-sm" />
        <div className="absolute top-[40%] left-[60%] w-5 h-5 bg-blue-500/40 rounded-full blur-sm" />
        {/* Valve symbols */}
        <div className="absolute top-[25%] left-[30%] w-8 h-8 border-2 border-orange-500/20 rotate-45" />
        <div className="absolute top-[65%] right-[25%] w-8 h-8 border-2 border-sky-500/20 rotate-45" />
      </div>

      <div ref={layer3Ref} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[25%] left-[40%] w-2 h-2 bg-orange-400/60 rounded-full" />
        <div className="absolute top-[45%] right-[30%] w-2 h-2 bg-sky-400/60 rounded-full" />
        <div className="absolute top-[65%] left-[25%] w-1.5 h-1.5 bg-amber-400/60 rounded-full" />
        <div className="absolute top-[35%] right-[10%] w-1.5 h-1.5 bg-white/60 rounded-full" />
        <div className="absolute top-[75%] right-[50%] w-2 h-2 bg-orange-400/60 rounded-full" />
      </div>

      {/* Central content */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div ref={textRef} className="text-center px-6 max-w-4xl">
          <span className="inline-block px-4 py-2 rounded-full border border-orange-500/20 text-orange-400/60 text-sm uppercase tracking-widest mb-8">
            Global Operations
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="gradient-text">Depth</span> of
            <br />
            <span className="text-white/90">Experience</span>
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            Operating across 40+ countries with over 10,000 wells drilled.
            Our global network delivers energy solutions at any scale.
          </p>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 100, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: 'power4.out',
        }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          ease: 'power3.out',
        }
      );

      // Scroll indicator
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 1.2,
          ease: 'power2.out',
        }
      );

      // Parallax on scroll
      gsap.to(titleRef.current, {
        yPercent: -50,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Orbs parallax
      gsap.to(orbsRef.current, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient orbs - oil & gas colors */}
      <div ref={orbsRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[120px] pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-sky-600/20 rounded-full blur-[100px] pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[150px]" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Oil rig silhouette decoration */}
      <div className="absolute bottom-0 left-10 w-32 h-64 opacity-10">
        <svg viewBox="0 0 100 200" fill="currentColor" className="w-full h-full text-orange-500">
          <path d="M45 200 L45 100 L30 100 L50 20 L70 100 L55 100 L55 200 Z" />
          <path d="M20 120 L80 120 L80 130 L20 130 Z" />
          <path d="M25 140 L75 140 L75 150 L25 150 Z" />
          <path d="M30 160 L70 160 L70 170 L30 170 Z" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 rounded-full border border-orange-500/30 text-orange-400/80 text-sm uppercase tracking-widest">
            Engineering Excellence
          </span>
        </div>

        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8"
        >
          <span className="gradient-text text-glow">Powering</span>
          <br />
          <span className="text-white/90">Tomorrow</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed"
        >
          Leading the future of energy with innovative oil & gas solutions.
          Precision engineering meets sustainable practices.
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-sm text-white/40 uppercase tracking-widest">Explore our capabilities</span>
        <div className="w-6 h-10 border-2 border-orange-500/30 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-orange-500/60 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

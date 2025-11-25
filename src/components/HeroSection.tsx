'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

// Dynamic import for Three.js scene to avoid SSR issues
const ROVScene = dynamic(() => import('./ROVScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#0c1929] flex items-center justify-center">
      <div className="text-cyan-400 font-mono animate-pulse">Initializing ROV Systems...</div>
    </div>
  ),
});

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out',
        delay: 0.3,
      });

      // Subtitle animation
      gsap.from(subtitleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.6,
      });

      // Tagline animation
      gsap.from(taglineRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.9,
      });

      // Scroll indicator animation
      gsap.from(scrollIndicatorRef.current, {
        opacity: 0,
        y: -20,
        duration: 1,
        delay: 1.5,
        ease: 'power2.out',
      });

      // Parallax scroll effect for title
      gsap.to(titleRef.current, {
        yPercent: -50,
        opacity: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Track scroll progress for 3D scene
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200vh] overflow-hidden"
    >
      {/* 3D ROV Scene - Fixed background */}
      <div className="fixed inset-0 z-0">
        <ROVScene scrollProgress={scrollProgress} className="w-full h-full" />
      </div>

      {/* Gradient overlays for depth */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0c1929]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c1929]/60 via-transparent to-[#0c1929]/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 pt-20">
        {/* Top Badge */}
        <div
          ref={taglineRef}
          className="mb-8 px-6 py-2 rounded-full border border-cyan-500/30 bg-cyan-950/30 backdrop-blur-sm"
        >
          <span className="text-cyan-400 text-sm font-mono tracking-wider uppercase">
            Subsea Excellence Since 1985
          </span>
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-6 leading-tight"
        >
          <span className="text-white">Deep Water</span>
          <br />
          <span className="gradient-text-cyan">ROV Solutions</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-slate-300 text-center max-w-2xl mb-12 leading-relaxed"
        >
          Advanced remotely operated vehicles for subsea inspection,
          maintenance, and intervention operations across the world&apos;s deepest waters.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-105">
            Explore Our Fleet
          </button>
          <button className="px-8 py-4 border border-amber-500/50 text-amber-400 font-semibold rounded-lg hover:bg-amber-500/10 transition-all duration-300 hover:border-amber-400">
            Watch Demo
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mt-8">
          {[
            { value: '3000m', label: 'Max Depth' },
            { value: '150+', label: 'ROV Fleet' },
            { value: '99.9%', label: 'Uptime' },
            { value: '40+', label: 'Countries' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-amber-400 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-slate-400"
        >
          <span className="text-sm font-mono tracking-wider uppercase">Dive Deeper</span>
          <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-cyan-400 rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* Second Screen - Introduction */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
            Engineering the{' '}
            <span className="gradient-text-cyan">Impossible</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
            Our work-class ROVs operate in the most challenging environments on Earth,
            performing critical maintenance on offshore infrastructure that powers
            global energy needs. From pipeline inspection to subsea construction,
            we deliver precision where it matters most.
          </p>
        </div>
      </div>
    </section>
  );
}

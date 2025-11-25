'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const equipment = [
  {
    id: 1,
    name: 'Manipulator Arms',
    category: 'Intervention',
    description: 'Precision 7-function hydraulic manipulators with 200kg lift capacity and force feedback control.',
    specs: ['7-Function', '200kg Lift', 'Force Feedback'],
    icon: '🦾',
  },
  {
    id: 2,
    name: 'HD Cameras',
    category: 'Inspection',
    description: '4K resolution cameras with low-light capability and digital zoom for detailed structural inspection.',
    specs: ['4K Ultra HD', 'Low-Light', '20x Zoom'],
    icon: '📸',
  },
  {
    id: 3,
    name: 'Sonar Systems',
    category: 'Navigation',
    description: 'Multi-beam sonar for 3D mapping and obstacle detection in zero-visibility conditions.',
    specs: ['Multi-beam', '3D Mapping', '200m Range'],
    icon: '📡',
  },
  {
    id: 4,
    name: 'Cutting Tools',
    category: 'Maintenance',
    description: 'Diamond wire saws and hydraulic shears for controlled cutting of subsea structures.',
    specs: ['Diamond Wire', 'Hydraulic', 'Precision Cut'],
    icon: '🔧',
  },
  {
    id: 5,
    name: 'Torque Tools',
    category: 'Installation',
    description: 'Calibrated torque tools for valve operation and bolt tensioning on subsea equipment.',
    specs: ['5000 Nm', 'Calibrated', 'Depth-Rated'],
    icon: '⚙️',
  },
  {
    id: 6,
    name: 'Cleaning Systems',
    category: 'Maintenance',
    description: 'High-pressure water jetting and brush tools for marine growth removal and surface preparation.',
    specs: ['500 Bar', 'Rotary Brush', 'Eco-Safe'],
    icon: '🌊',
  },
];

export default function SubseaEquipmentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        y: 60,
        opacity: 0,
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          end: 'top 60%',
          scrub: 1,
        },
      });

      // Staggered card animations
      const cards = cardsRef.current?.querySelectorAll('.equipment-card');
      cards?.forEach((card, index) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          scale: 0.9,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-[#0a1628] overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full">
          <defs>
            <pattern
              id="equipment-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#equipment-grid)" />
        </svg>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${6 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <div className="inline-block px-4 py-2 rounded-full border border-amber-500/30 bg-amber-950/20 mb-6">
            <span className="text-amber-400 text-sm font-mono uppercase tracking-wider">
              Tooling Systems
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Subsea <span className="gradient-text-amber">Equipment</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Industry-leading tooling packages designed for precision intervention,
            inspection, and maintenance operations in extreme environments.
          </p>
        </div>

        {/* Equipment Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {equipment.map((item) => (
            <div
              key={item.id}
              className="equipment-card group relative bg-gradient-to-br from-slate-900/80 to-slate-800/50 rounded-2xl border border-slate-700/50 p-8 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/10"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 to-amber-500/0 group-hover:from-cyan-500/5 group-hover:to-amber-500/5 transition-all duration-500" />

              {/* Category Badge */}
              <div className="relative z-10 flex items-center justify-between mb-6">
                <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/50 rounded-full border border-cyan-500/30">
                  {item.category}
                </span>
                <span className="text-3xl">{item.icon}</span>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {item.name}
                </h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  {item.description}
                </p>

                {/* Specs */}
                <div className="flex flex-wrap gap-2">
                  {item.specs.map((spec, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-mono text-slate-300 bg-slate-800/50 rounded-lg border border-slate-700/50"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Border Animation */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-animate overflow-hidden" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-transparent border border-cyan-500/50 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/10 transition-all duration-300 group">
            View Full Equipment Catalog
            <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const depthMilestones = [
  {
    depth: '0m',
    title: 'Surface Operations',
    description: 'Launch and recovery, system checks, umbilical management',
    color: '#0ea5e9',
  },
  {
    depth: '500m',
    title: 'Shallow Water Zone',
    description: 'Platform inspection, riser maintenance, shallow pipeline work',
    color: '#06b6d4',
  },
  {
    depth: '1500m',
    title: 'Deep Water Zone',
    description: 'Subsea tree intervention, manifold maintenance, flowline inspection',
    color: '#0891b2',
  },
  {
    depth: '2500m',
    title: 'Ultra-Deep Zone',
    description: 'BOP operations, well intervention, complex subsea construction',
    color: '#0e7490',
  },
  {
    depth: '3000m',
    title: 'Maximum Depth',
    description: 'Extreme depth operations, specialized tooling deployment',
    color: '#164e63',
  },
];

export default function DeepDiveSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const depthIndicatorRef = useRef<HTMLDivElement>(null);
  const depthContainerRef = useRef<HTMLDivElement>(null);
  const milestonesRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Show/hide depth indicator based on section visibility
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => setIsInView(true),
        onLeave: () => setIsInView(false),
        onEnterBack: () => setIsInView(true),
        onLeaveBack: () => setIsInView(false),
      });

      // Depth indicator progress
      gsap.to(depthIndicatorRef.current, {
        scaleY: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      // Milestone animations
      const milestones = milestonesRef.current?.querySelectorAll('.milestone-item');
      milestones?.forEach((milestone, index) => {
        gsap.from(milestone, {
          x: index % 2 === 0 ? -100 : 100,
          opacity: 0,
          scrollTrigger: {
            trigger: milestone,
            start: 'top 80%',
            end: 'top 50%',
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
      className="relative min-h-[400vh] bg-gradient-to-b from-[#0c1929] via-[#071520] to-[#030810]"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to bottom, transparent 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%),
            repeating-linear-gradient(0deg, transparent, transparent 100px, rgba(6, 182, 212, 0.03) 100px, rgba(6, 182, 212, 0.03) 101px)
          `,
        }} />
      </div>

      {/* Fixed Header */}
      <div className="sticky top-0 z-20 pt-20 pb-10 bg-gradient-to-b from-[#0c1929] to-transparent">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            The <span className="gradient-text-cyan">Deep Dive</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Journey through operational depths where our ROVs perform critical subsea tasks
          </p>
        </div>
      </div>

      {/* Depth Progress Indicator */}
      <div
        ref={depthContainerRef}
        className={`fixed left-8 top-1/2 -translate-y-1/2 z-30 hidden lg:block transition-opacity duration-500 ${
          isInView ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="relative h-64 w-2 bg-slate-800/50 rounded-full overflow-hidden">
          <div
            ref={depthIndicatorRef}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-full origin-bottom"
            style={{ transform: 'scaleY(0)' }}
          />
        </div>
        <div className="mt-4 text-center">
          <span className="text-cyan-400 font-mono text-sm">DEPTH</span>
        </div>
      </div>

      {/* Milestones */}
      <div ref={milestonesRef} className="relative z-10 container mx-auto px-6 py-20">
        {depthMilestones.map((milestone, index) => (
          <div
            key={index}
            className={`milestone-item flex items-center gap-8 md:gap-16 py-32 ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            {/* Content */}
            <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
              <div
                className="text-6xl md:text-8xl font-bold mb-4"
                style={{ color: milestone.color }}
              >
                {milestone.depth}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {milestone.title}
              </h3>
              <p className="text-slate-400 text-lg max-w-md inline-block">
                {milestone.description}
              </p>
            </div>

            {/* Center Line */}
            <div className="relative">
              <div
                className="w-6 h-6 rounded-full border-4"
                style={{ borderColor: milestone.color, backgroundColor: '#0c1929' }}
              />
              <div
                className="absolute top-6 left-1/2 -translate-x-1/2 w-0.5 h-32 md:h-48"
                style={{
                  background: `linear-gradient(to bottom, ${milestone.color}, transparent)`,
                }}
              />
            </div>

            {/* Spacer */}
            <div className="flex-1" />
          </div>
        ))}
      </div>

      {/* Underwater Particles Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
}

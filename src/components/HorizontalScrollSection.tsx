'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: 'Performance',
    description: 'Optimized to perfection with 60fps animations',
    color: 'from-indigo-500 to-purple-500',
    icon: '⚡',
  },
  {
    title: 'Design',
    description: 'Pixel-perfect craftsmanship in every detail',
    color: 'from-purple-500 to-pink-500',
    icon: '✨',
  },
  {
    title: 'Innovation',
    description: 'Pushing the boundaries of whats possible',
    color: 'from-pink-500 to-rose-500',
    icon: '🚀',
  },
  {
    title: 'Experience',
    description: 'Creating memorable digital journeys',
    color: 'from-rose-500 to-orange-500',
    icon: '💎',
  },
];

export default function HorizontalScrollSection() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const cards = track?.querySelectorAll('.card');

      if (track && cards) {
        const totalWidth = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: () => `+=${totalWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        // Card animations
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { scale: 0.8, opacity: 0, rotateY: -15 },
            {
              scale: 1,
              opacity: 1,
              rotateY: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                containerAnimation: gsap.getById('horizontal-scroll') as gsap.core.Animation,
                start: 'left 80%',
                end: 'left 30%',
                scrub: 1,
              },
            }
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-indigo-950/20 to-black" />

      {/* Section title */}
      <div className="absolute top-20 left-0 right-0 text-center z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white/10">
          WHAT WE DO
        </h2>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="absolute top-0 left-0 h-full flex items-center gap-8 px-[10vw] horizontal-scroll-section"
        style={{ width: 'fit-content' }}
      >
        {/* Initial spacer */}
        <div className="w-[20vw] flex-shrink-0" />

        {cards.map((card, i) => (
          <div
            key={i}
            className="card w-[70vw] md:w-[40vw] lg:w-[30vw] h-[60vh] rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden group flex-shrink-0"
            style={{ perspective: '1000px' }}
          >
            {/* Card background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
            <div className="absolute inset-[1px] rounded-3xl border border-white/10" />

            {/* Glow effect */}
            <div className={`absolute -inset-40 bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-700`} />

            {/* Icon */}
            <div className="absolute top-8 right-8 text-6xl opacity-20 group-hover:opacity-40 transition-opacity duration-500">
              {card.icon}
            </div>

            {/* Content */}
            <div className="relative z-10">
              <span className="text-sm uppercase tracking-widest text-white/40 mb-4 block">
                0{i + 1}
              </span>
              <h3 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>
                {card.title}
              </h3>
              <p className="text-lg text-white/60 max-w-sm">
                {card.description}
              </p>
            </div>
          </div>
        ))}

        {/* End spacer */}
        <div className="w-[30vw] flex-shrink-0" />
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-2">
        {cards.map((_, i) => (
          <div
            key={i}
            className="w-12 h-1 bg-white/10 rounded-full overflow-hidden"
          >
            <div className="h-full bg-white/40 rounded-full" style={{ width: '0%' }} />
          </div>
        ))}
      </div>
    </section>
  );
}

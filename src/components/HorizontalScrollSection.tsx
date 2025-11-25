'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: 'Exploration',
    description: 'Advanced seismic imaging and reservoir analysis for optimal drilling locations',
    color: 'from-orange-500 to-amber-500',
    icon: '🔍',
  },
  {
    title: 'Drilling',
    description: 'State-of-the-art directional drilling and well completion technologies',
    color: 'from-amber-500 to-yellow-500',
    icon: '⚙️',
  },
  {
    title: 'Production',
    description: 'Maximizing recovery rates with intelligent extraction systems',
    color: 'from-sky-500 to-blue-500',
    icon: '🛢️',
  },
  {
    title: 'Refining',
    description: 'Converting crude into high-value products with minimal environmental impact',
    color: 'from-blue-500 to-indigo-500',
    icon: '🏭',
  },
];

export default function HorizontalScrollSection() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;

      if (track) {
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
      <div className="absolute inset-0 bg-gradient-to-r from-black via-orange-950/10 to-black" />

      {/* Section title */}
      <div className="absolute top-20 left-0 right-0 text-center z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white/10">
          OUR CAPABILITIES
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
            <div className="h-full bg-orange-500/40 rounded-full" style={{ width: '0%' }} />
          </div>
        ))}
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const words = ['DRILLING', 'REFINING', 'PIPELINE', 'OFFSHORE', 'UPSTREAM', 'LNG'];

export default function MarqueeSection() {
  const containerRef = useRef<HTMLElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-driven marquee - moves based on scroll direction
      gsap.to(track1Ref.current, {
        xPercent: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      gsap.to(track2Ref.current, {
        xPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-950/5 to-transparent" />

      {/* Track 1 - moves left */}
      <div className="mb-8 overflow-hidden">
        <div
          ref={track1Ref}
          className="flex gap-8 whitespace-nowrap"
          style={{ width: 'max-content' }}
        >
          {[...words, ...words, ...words, ...words].map((word, i) => (
            <span
              key={i}
              className="text-7xl md:text-9xl font-black text-transparent stroke-text select-none"
              style={{
                WebkitTextStroke: '1px rgba(249, 115, 22, 0.15)',
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Track 2 - moves right */}
      <div className="overflow-hidden">
        <div
          ref={track2Ref}
          className="flex gap-8 whitespace-nowrap"
          style={{ width: 'max-content', transform: 'translateX(-25%)' }}
        >
          {[...words, ...words, ...words, ...words].reverse().map((word, i) => (
            <span
              key={i}
              className="text-7xl md:text-9xl font-black gradient-text select-none opacity-20"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

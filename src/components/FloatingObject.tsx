'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FloatingObject() {
  const containerRef = useRef<HTMLDivElement>(null);
  const objectRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Mouse follow effect
      const handleMouseMove = (e: MouseEvent) => {
        if (!objectRef.current) return;

        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        // Calculate offset from center (subtle movement)
        const xOffset = ((clientX - innerWidth / 2) / innerWidth) * 30;
        const yOffset = ((clientY - innerHeight / 2) / innerHeight) * 30;

        gsap.to(objectRef.current, {
          x: xOffset,
          y: yOffset,
          rotateY: xOffset * 0.5,
          rotateX: -yOffset * 0.5,
          duration: 1,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Scroll-based transformations
      ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          if (!objectRef.current || !glowRef.current) return;

          const progress = self.progress;

          // Rotate based on scroll
          gsap.to(objectRef.current, {
            rotation: progress * 360,
            scale: 1 + Math.sin(progress * Math.PI) * 0.3,
            duration: 0.1,
          });

          // Glow intensity changes
          gsap.to(glowRef.current, {
            opacity: 0.5 + Math.sin(progress * Math.PI * 2) * 0.3,
            scale: 1 + Math.sin(progress * Math.PI * 2) * 0.2,
            duration: 0.1,
          });
        },
      });

      // Floating animation
      gsap.to(objectRef.current, {
        y: '+=15',
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Glow pulse
      gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.8,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-1/2 right-8 md:right-16 -translate-y-1/2 z-40 pointer-events-none"
      style={{ perspective: '1000px' }}
    >
      {/* Glow effect */}
      <div
        ref={glowRef}
        className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
      >
        <div className="w-full h-full bg-orange-500/30 rounded-full blur-2xl" />
      </div>

      {/* Main object - Oil Drop / Flame hybrid */}
      <div
        ref={objectRef}
        className="relative w-16 h-20 md:w-20 md:h-24"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Oil drop SVG with 3D-like shading */}
        <svg
          viewBox="0 0 100 120"
          className="w-full h-full drop-shadow-2xl"
          style={{ filter: 'drop-shadow(0 0 20px rgba(249, 115, 22, 0.5))' }}
        >
          <defs>
            {/* Main gradient */}
            <linearGradient id="dropGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="30%" stopColor="#f97316" />
              <stop offset="70%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#9a3412" />
            </linearGradient>

            {/* Highlight gradient */}
            <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
            </linearGradient>

            {/* Inner shadow */}
            <radialGradient id="innerShadow" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#7c2d12" stopOpacity="0.8" />
            </radialGradient>

            {/* Flame effect */}
            <linearGradient id="flameGradient" x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#fef3c7" />
            </linearGradient>
          </defs>

          {/* Drop shadow */}
          <ellipse cx="50" cy="115" rx="25" ry="5" fill="rgba(0,0,0,0.2)" />

          {/* Main drop body */}
          <path
            d="M50 10
               C50 10, 15 50, 15 75
               C15 95, 30 110, 50 110
               C70 110, 85 95, 85 75
               C85 50, 50 10, 50 10Z"
            fill="url(#dropGradient)"
          />

          {/* Inner depth */}
          <path
            d="M50 15
               C50 15, 20 50, 20 73
               C20 90, 33 105, 50 105
               C67 105, 80 90, 80 73
               C80 50, 50 15, 50 15Z"
            fill="url(#innerShadow)"
            opacity="0.5"
          />

          {/* Highlight reflection */}
          <path
            d="M40 25
               C40 25, 25 50, 25 70
               C25 80, 30 85, 35 85
               C42 85, 45 75, 45 65
               C45 50, 40 25, 40 25Z"
            fill="url(#highlightGradient)"
          />

          {/* Small highlight dot */}
          <circle cx="35" cy="45" r="5" fill="white" opacity="0.6" />
          <circle cx="38" cy="48" r="2" fill="white" opacity="0.8" />

          {/* Flame wisps at top */}
          <path
            d="M50 10 Q45 5, 48 0 Q50 5, 50 10"
            fill="url(#flameGradient)"
            opacity="0.7"
          >
            <animate
              attributeName="d"
              values="M50 10 Q45 5, 48 0 Q50 5, 50 10;
                      M50 10 Q55 5, 52 0 Q50 5, 50 10;
                      M50 10 Q45 5, 48 0 Q50 5, 50 10"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>

          <path
            d="M45 15 Q40 10, 43 5 Q45 10, 45 15"
            fill="url(#flameGradient)"
            opacity="0.5"
          >
            <animate
              attributeName="d"
              values="M45 15 Q40 10, 43 5 Q45 10, 45 15;
                      M45 15 Q42 8, 44 3 Q46 10, 45 15;
                      M45 15 Q40 10, 43 5 Q45 10, 45 15"
              dur="1.2s"
              repeatCount="indefinite"
            />
          </path>

          <path
            d="M55 15 Q60 10, 57 5 Q55 10, 55 15"
            fill="url(#flameGradient)"
            opacity="0.5"
          >
            <animate
              attributeName="d"
              values="M55 15 Q60 10, 57 5 Q55 10, 55 15;
                      M55 15 Q58 8, 56 3 Q54 10, 55 15;
                      M55 15 Q60 10, 57 5 Q55 10, 55 15"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </path>
        </svg>

        {/* Particle effects */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2">
          <div className="w-1 h-1 bg-orange-300 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
        </div>
        <div className="absolute -top-1 left-1/3">
          <div className="w-0.5 h-0.5 bg-amber-200 rounded-full animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
        </div>
        <div className="absolute -top-1 right-1/3">
          <div className="w-0.5 h-0.5 bg-yellow-200 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
        </div>
      </div>
    </div>
  );
}

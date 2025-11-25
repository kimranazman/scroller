'use client';

import SmoothScroll from '@/components/SmoothScroll';
import HeroSection from '@/components/HeroSection';
import TextRevealSection from '@/components/TextRevealSection';
import HorizontalScrollSection from '@/components/HorizontalScrollSection';
import ParallaxShowcase from '@/components/ParallaxShowcase';
import NumbersSection from '@/components/NumbersSection';
import ScaleRevealSection from '@/components/ScaleRevealSection';
import MarqueeSection from '@/components/MarqueeSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <SmoothScroll>
      <main className="noise">
        <HeroSection />
        <TextRevealSection />
        <HorizontalScrollSection />
        <ParallaxShowcase />
        <NumbersSection />
        <ScaleRevealSection />
        <MarqueeSection />
        <Footer />
      </main>
    </SmoothScroll>
  );
}

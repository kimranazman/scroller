'use client';

import SmoothScroll from '@/components/SmoothScroll';
import HeroSection from '@/components/HeroSection';
import TextRevealSection from '@/components/TextRevealSection';
import SubseaEquipmentSection from '@/components/SubseaEquipmentSection';
import HorizontalScrollSection from '@/components/HorizontalScrollSection';
import DeepDiveSection from '@/components/DeepDiveSection';
import NumbersSection from '@/components/NumbersSection';
import MarqueeSection from '@/components/MarqueeSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <SmoothScroll>
      <main className="noise">
        {/* Hero with 3D ROV Scene */}
        <HeroSection />

        {/* Text reveal about subsea operations */}
        <TextRevealSection />

        {/* Horizontal scroll - ROV Capabilities */}
        <HorizontalScrollSection />

        {/* Deep Dive - Depth milestones */}
        <DeepDiveSection />

        {/* Subsea Equipment showcase */}
        <SubseaEquipmentSection />

        {/* Performance numbers/stats */}
        <NumbersSection />

        {/* Marquee with industry keywords */}
        <MarqueeSection />

        {/* Footer CTA */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}

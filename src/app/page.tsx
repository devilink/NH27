import Hero from '@/components/home/Hero';
import Marquee from '@/components/home/Marquee';
import BentoGrid from '@/components/home/BentoGrid';
import ParallaxFeature from '@/components/home/ParallaxFeature';
import HorizontalCarousel from '@/components/home/HorizontalCarousel';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Marquee />
      <BentoGrid />
      <ParallaxFeature />
      <HorizontalCarousel />
    </div>
  );
}

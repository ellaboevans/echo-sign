import FeaturedMemory from "./_components/featured-memory";
import HeroSection from "./_components/hero-section";

export default function Page() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <FeaturedMemory />
    </div>
  );
}

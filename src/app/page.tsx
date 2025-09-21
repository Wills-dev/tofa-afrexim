import Header from "@/components/molecules/Header/Header";
import About from "@/components/organisms/About/About";
import HeroSection from "@/components/organisms/HeroSection/HeroSection";
import Partnership from "@/components/organisms/Partnership/Partnership";
import Shortcut from "@/components/organisms/ShortCut/Shortcut";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <About />
      <Partnership />
      <Shortcut />
    </div>
  );
}

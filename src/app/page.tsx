import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { DashboardPreview } from "@/components/sections/DashboardPreview";
import { Process } from "@/components/sections/Process";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <Services limit={6} />
      <Industries limit={6} />
      <DashboardPreview />
      <Process />
      <CTASection />
    </>
  );
}

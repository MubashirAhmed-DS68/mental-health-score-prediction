import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { PredictionForm } from "@/components/prediction-form";
import { SiteFooter } from "@/components/site-footer";
import { MotionProvider } from "@/components/motion-provider";

export default function Home() {
  return (
    <MotionProvider>
      <SiteHeader />
      <main id="main">
        <HeroSection />
        <section id="assessment" aria-labelledby="assessment-title" className="mx-auto max-w-3xl px-5 pb-24 pt-4 sm:px-8">
          <PredictionForm />
        </section>
      </main>
      <SiteFooter />
    </MotionProvider>
  );
}

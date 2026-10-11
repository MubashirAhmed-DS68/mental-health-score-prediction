"use client";

import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";

export function HeroSection() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-5 pb-14 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl"
      >
        <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
          Understand your digital wellbeing.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Answer twelve questions about your social media use, sleep, activity and stress. A machine-learning
          model returns an estimated mental health score. It is an informational estimate, not a diagnosis.
        </p>
        <div className="mt-9">
          <Button asChild size="lg">
            <a href="#assessment">
              Start the assessment <ArrowDown className="size-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

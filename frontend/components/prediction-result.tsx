"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { CheckCircle2, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import type { PredictionResponse } from "@/types/prediction";

interface Props {
  result: PredictionResponse;
  onReset: () => void;
}

export function PredictionResult({ result, onReset }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus(), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      role="status"
      aria-live="polite"
      className="rounded-card border border-line bg-white p-6 shadow-card sm:p-10"
    >
      <p className="flex items-center gap-2 text-sm font-medium text-success">
        <CheckCircle2 className="size-4" aria-hidden="true" /> Prediction complete
      </p>
      <h2 ref={headingRef} tabIndex={-1} className="mt-4 text-sm font-medium text-muted outline-none">
        Predicted mental health score
      </h2>
      <p className="mt-1 font-display text-7xl font-semibold tracking-tight text-brand sm:text-8xl">
        {result.predicted_mental_health_score.toFixed(2)}
      </p>
      <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted">
        This value is the output of a machine-learning model based on the information you entered. It is an
        estimate for informational purposes and is not a medical or psychological diagnosis.
      </p>
      <Button variant="outline" onClick={onReset} className="mt-8">
        <RotateCcw className="size-4" aria-hidden="true" /> New prediction
      </Button>
    </motion.div>
  );
}

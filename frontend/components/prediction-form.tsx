"use client";

import { useRef, useState } from "react";
import { useForm, type DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { FieldShell, Input, Select } from "./ui/field";
import { LoadingState } from "./loading-state";
import { PredictionResult } from "./prediction-result";
import { FRIENDLY_ERROR, predictMentalHealthScore } from "@/lib/api";
import { predictionSchema, type PredictionFormValues } from "@/lib/validations";
import {
  ACADEMIC_LEVELS, COUNTRY_SUGGESTIONS, GENDERS, PLATFORMS, PURPOSES, STRESS_LEVELS,
  type PredictionResponse,
} from "@/types/prediction";

const defaults = {
  country: "", gender: "", academic_level: "", most_used_platform: "", purpose_of_use: "", stress_level: "",
} as unknown as DefaultValues<PredictionFormValues>;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-line pt-6 first:border-t-0 first:pt-0">
      <legend className="mb-4 font-display text-xl font-semibold">{title}</legend>
      <div className="grid gap-x-5 gap-y-3 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

export function PredictionForm() {
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inFlight = useRef(false);

  const {
    register, handleSubmit, reset, formState: { errors, isSubmitting },
  } = useForm<PredictionFormValues>({ resolver: zodResolver(predictionSchema), defaultValues: defaults });

  const msg = (k: keyof PredictionFormValues) => errors[k]?.message;
  const num = (k: keyof PredictionFormValues) => register(k, { valueAsNumber: true });

  async function onSubmit(values: PredictionFormValues) {
    if (inFlight.current) return;
    inFlight.current = true;
    setError(null);
    try {
      setResult(await predictMentalHealthScore({ ...values, country: values.country.trim() }));
    } catch {
      setError(FRIENDLY_ERROR);
    } finally {
      inFlight.current = false;
    }
  }

  function startOver() {
    setResult(null);
    setError(null);
    reset(defaults);
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {result ? (
        <PredictionResult key="result" result={result} onReset={startOver} />
      ) : (
        <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <h2 id="assessment-title" className="font-display text-3xl font-semibold tracking-tight">Your assessment</h2>
          <p className="mt-2 text-sm text-muted">All fields are required.</p>

          <form noValidate onSubmit={handleSubmit(onSubmit)} aria-busy={isSubmitting}
            className="mt-8 space-y-8 rounded-card border border-line bg-white p-5 shadow-card sm:p-8">
            <Section title="About you">
              <FieldShell id="age" label="Age" hint="10 to 100" error={msg("age")}>
                <Input id="age" type="number" inputMode="numeric" step={1} invalid={!!errors.age} {...num("age")} />
              </FieldShell>
              <FieldShell id="gender" label="Gender" error={msg("gender")}>
                <Select id="gender" options={GENDERS} invalid={!!errors.gender} {...register("gender")} />
              </FieldShell>
              <FieldShell id="country" label="Country" hint="Type or choose a suggestion" error={msg("country")}>
                <Input id="country" list="country-options" autoComplete="country-name" invalid={!!errors.country} {...register("country")} />
                <datalist id="country-options">
                  {COUNTRY_SUGGESTIONS.map((c) => <option key={c} value={c} />)}
                </datalist>
              </FieldShell>
              <FieldShell id="academic_level" label="Academic level" error={msg("academic_level")}>
                <Select id="academic_level" options={ACADEMIC_LEVELS} invalid={!!errors.academic_level} {...register("academic_level")} />
              </FieldShell>
            </Section>

            <Section title="Social media use">
              <FieldShell id="most_used_platform" label="Most used platform" error={msg("most_used_platform")}>
                <Select id="most_used_platform" options={PLATFORMS} invalid={!!errors.most_used_platform} {...register("most_used_platform")} />
              </FieldShell>
              <FieldShell id="purpose_of_use" label="Main purpose of use" error={msg("purpose_of_use")}>
                <Select id="purpose_of_use" options={PURPOSES} invalid={!!errors.purpose_of_use} {...register("purpose_of_use")} />
              </FieldShell>
              <FieldShell id="avg_daily_usage_hours" label="Average daily usage (hours)" hint="0 to 24" error={msg("avg_daily_usage_hours")}>
                <Input id="avg_daily_usage_hours" type="number" inputMode="decimal" step="any" invalid={!!errors.avg_daily_usage_hours} {...num("avg_daily_usage_hours")} />
              </FieldShell>
              <FieldShell id="daily_unlocks" label="Daily phone unlocks" hint="Whole number, 0 or more" error={msg("daily_unlocks")}>
                <Input id="daily_unlocks" type="number" inputMode="numeric" step={1} invalid={!!errors.daily_unlocks} {...num("daily_unlocks")} />
              </FieldShell>
            </Section>

            <Section title="Daily routine">
              <FieldShell id="study_hours" label="Study hours per day" hint="0 to 24" error={msg("study_hours")}>
                <Input id="study_hours" type="number" inputMode="decimal" step="any" invalid={!!errors.study_hours} {...num("study_hours")} />
              </FieldShell>
              <FieldShell id="physical_activity_hours" label="Physical activity hours per day" hint="0 to 24" error={msg("physical_activity_hours")}>
                <Input id="physical_activity_hours" type="number" inputMode="decimal" step="any" invalid={!!errors.physical_activity_hours} {...num("physical_activity_hours")} />
              </FieldShell>
              <FieldShell id="sleep_hours_per_night" label="Sleep hours per night" hint="0 to 24" error={msg("sleep_hours_per_night")}>
                <Input id="sleep_hours_per_night" type="number" inputMode="decimal" step="any" invalid={!!errors.sleep_hours_per_night} {...num("sleep_hours_per_night")} />
              </FieldShell>
              <FieldShell id="stress_level" label="Stress level" error={msg("stress_level")}>
                <Select id="stress_level" options={STRESS_LEVELS} invalid={!!errors.stress_level} {...register("stress_level")} />
              </FieldShell>
            </Section>

            <div className="space-y-4 border-t border-line pt-6">
              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    role="alert" className="flex gap-3 rounded-control border border-danger/30 bg-danger-soft px-4 py-3 text-sm font-medium text-danger">
                    <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
              {isSubmitting && <LoadingState />}
              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                Generate Prediction
              </Button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

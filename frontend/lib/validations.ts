import { z } from "zod";
import {
  ACADEMIC_LEVELS, GENDERS, PLATFORMS, PURPOSES, STRESS_LEVELS,
} from "@/types/prediction";

const choice = <T extends readonly [string, ...string[]]>(values: T) =>
  z.enum(values, { errorMap: () => ({ message: "Select an option" }) });

const num = (label: string, min: number, max: number | undefined, integer = false) => {
  let s = z.number({ required_error: "Enter a number", invalid_type_error: "Enter a number" });
  if (integer) s = s.int("Enter a whole number");
  s = s.min(min, `${label} must be at least ${min}`);
  if (max !== undefined) s = s.max(max, `${label} must be ${max} or less`);
  return s;
};

// Constraints mirror the Pydantic StudentData model in backend/main.py.
export const predictionSchema = z.object({
  age: num("Age", 10, 100, true),
  gender: choice(GENDERS),
  country: z.string().trim().min(1, "Enter your country"),
  academic_level: choice(ACADEMIC_LEVELS),
  most_used_platform: choice(PLATFORMS),
  purpose_of_use: choice(PURPOSES),
  avg_daily_usage_hours: num("Daily usage", 0, 24),
  daily_unlocks: num("Unlocks", 0, undefined, true),
  study_hours: num("Study hours", 0, 24),
  physical_activity_hours: num("Activity hours", 0, 24),
  sleep_hours_per_night: num("Sleep hours", 0, 24),
  stress_level: choice(STRESS_LEVELS),
});

export type PredictionFormValues = z.infer<typeof predictionSchema>;

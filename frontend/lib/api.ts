import type { PredictionRequest, PredictionResponse } from "@/types/prediction";

const BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:2200").replace(/\/$/, "");

export class PredictionError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    this.name = "PredictionError";
  }
}

export const FRIENDLY_ERROR = "Unable to generate your prediction right now. Please try again in a moment.";

/** Sends the assessment to POST /predict and returns the validated backend response. */
export async function predictMentalHealthScore(
  payload: PredictionRequest,
  signal?: AbortSignal,
): Promise<PredictionResponse> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal,
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") throw err;
    throw new PredictionError(FRIENDLY_ERROR);
  }

  if (!res.ok) throw new PredictionError(FRIENDLY_ERROR, res.status);

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    throw new PredictionError(FRIENDLY_ERROR, res.status);
  }

  const score = (data as Partial<PredictionResponse> | null)?.predicted_mental_health_score;
  if (typeof score !== "number" || !Number.isFinite(score)) {
    throw new PredictionError(FRIENDLY_ERROR, res.status);
  }
  return { predicted_mental_health_score: score };
}

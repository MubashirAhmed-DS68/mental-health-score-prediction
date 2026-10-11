export const GENDERS = ["Male", "Female"] as const;
export const ACADEMIC_LEVELS = ["High School", "Undergraduate", "Graduate"] as const;
export const PLATFORMS = [
  "Facebook", "LinkedIn", "Instagram", "Snapchat", "Twitter", "YouTube",
  "TikTok", "LINE", "KakaoTalk", "VKontakte", "WhatsApp", "WeChat",
] as const;
export const PURPOSES = ["Networking", "Education", "Entertainment", "News"] as const;
export const STRESS_LEVELS = ["Low", "Medium", "High", "Very High"] as const;

/** Country names the backend groups explicitly; any other value is grouped as "Other" server-side. */
export const COUNTRY_SUGGESTIONS = [
  "India", "USA", "Canada", "Australia", "UK", "Germany", "Mexico", "Turkey", "France",
] as const;

/** Request body of POST /predict (field names match the FastAPI StudentData model). */
export interface PredictionRequest {
  age: number;
  gender: (typeof GENDERS)[number];
  country: string;
  academic_level: (typeof ACADEMIC_LEVELS)[number];
  most_used_platform: (typeof PLATFORMS)[number];
  purpose_of_use: (typeof PURPOSES)[number];
  avg_daily_usage_hours: number;
  daily_unlocks: number;
  study_hours: number;
  physical_activity_hours: number;
  sleep_hours_per_night: number;
  stress_level: (typeof STRESS_LEVELS)[number];
}

/** Response body of POST /predict. */
export interface PredictionResponse {
  predicted_mental_health_score: number;
}

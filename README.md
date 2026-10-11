# Mental Health Score Prediction

A Next.js front end for an existing FastAPI + scikit-learn model that estimates a mental health score from social media habits, sleep, activity and stress. Predictions are informational estimates, not diagnoses.

## Technology stack
- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS v4, shadcn/ui-style components (`components.json`, `components/ui`), Motion, Lucide, React Hook Form, Zod
- **Backend (unchanged):** FastAPI, Pydantic, pandas, joblib, scikit-learn 1.6.1

## Structure
```text
mental-health-score-prediction/
├── backend/            main.py, Mental_Health_Model.pkl (unchanged)
├── frontend/           Next.js app (app/, components/, lib/, types/)
├── requirements.txt    Python dependencies
└── README.md
```

## Backend setup
```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cd backend
uvicorn main:app --reload --port 2200
```
`scikit-learn` is pinned to 1.6.1 because the `.pkl` was saved with that version; other versions may fail to load it.

## Frontend setup
```bash
cd frontend
npm install                      # also generates package-lock.json
cp .env.example .env.local
npm run dev                      # http://localhost:3000
```

## Environment
`NEXT_PUBLIC_API_BASE_URL` (default `http://127.0.0.1:2200`). It is public by design: never put secrets in `NEXT_PUBLIC_*` variables.

## Testing a prediction
Start both servers, open http://localhost:3000, complete the form and select **Generate Prediction**. The backend contract is `POST /predict` with the 12 snake_case fields from `StudentData` and a response of `{"predicted_mental_health_score": <float>}`. Interactive docs: http://127.0.0.1:2200/docs.

## Troubleshooting
- **"Unable to generate your prediction"**: confirm uvicorn is running on port 2200 and the URL in `.env.local` matches; restart `npm run dev` after editing env files.
- **Model fails to load**: reinstall with `pip install -r requirements.txt` so scikit-learn is 1.6.1, and run uvicorn from `backend/` (the model path is relative).
- **HTTP 422 in the network tab**: the payload violated a backend constraint (age 10-100, hours 0-24, unlocks >= 0, allowed categories).
- **Possible mismatch in `backend/main.py`**: it computes `grouped_country` but sends the raw `country` as `Country`. Unseen countries may therefore fail depending on how the model's encoder was trained. Left untouched on purpose; check against your training notebook.

## Deployment
Deploy the backend to a publicly reachable host (with HTTPS), set `NEXT_PUBLIC_API_BASE_URL` to it at build time, and restrict CORS in `main.py` (currently `*`). `127.0.0.1` always refers to the machine making the request, so a hosted frontend cannot reach a backend running on your laptop; this only works locally.

## Limitations
Not clinically validated; the score has no documented scale or thresholds in the provided files, so none are shown.

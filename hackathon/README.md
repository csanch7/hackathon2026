# 7even MVP

Weekly match dating app for Chicago college students.

## Stack
- Frontend: Expo Router + React Native
- Backend: Express + TypeScript (`/server`)
- Database/Auth/Realtime: Supabase

## Project structure
- `app/`: Expo Router screens (`(auth)` and `(app)` flows)
- `src/`: frontend components, hooks, context, and services
- `server/`: API routes, services, cron scheduler, tests
- `supabase/`: SQL migration and seed data

## Setup
1. Install dependencies:
```bash
npm install
```
2. Copy env file and fill values:
```bash
cp .env.example .env
```
3. Apply SQL in Supabase:
- `supabase/migrations/20260301_init.sql`
- `supabase/seed.sql`

## Run
Frontend:
```bash
npm run start
```
Backend:
```bash
npm run server:dev
```

## Tests
```bash
npm run server:test
```

## API Endpoints
- `POST /api/auth/signup`
- `GET /api/quiz/questions`
- `POST /api/quiz/submit`
- `PATCH /api/profile/quiz-status`
- `GET /api/match/current`
- `POST /api/match/generate` (internal secret required)
- `GET /api/messages/:matchId`
- `POST /api/messages/:matchId/send`

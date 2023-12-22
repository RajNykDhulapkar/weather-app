# Weather App

Real-time weather application using OpenWeatherMap API.

## Tech Stack

- Next.js + TypeScript
- Express.js + TypeScript
- pnpm workspaces
- Tailwind CSS + shadcn/ui
- Jest + Supertest
- Zod

## Project Structure

```
weather-app/
├── apps/
│   ├── web/     # Next.js frontend
│   └── server/  # Express backend
├── packages/
│   └── types/   # Shared types
├── pnpm-workspace.yaml
└── package.json
```

## Running the Project

```bash
git clone https://github.com/RajNykDhulapkar/weather-app
cd weather-app
pnpm install
pnpm run build
pnpm run start
```

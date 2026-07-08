# Frontend — NFO Data Dashboard

NSE F&O (NFO) index options/futures data ka dashboard.
Backend (`/backend`) ke Express + SQLite API ko consume karta hai.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 8** (build tool)
- **Tailwind CSS 4** (styling)
- **react-router-dom 7** (routing)
- **axios** (API calls)
- **lightweight-charts** (candlestick charts)

## Prerequisites

Backend chalna chahiye (default `http://localhost:5000`):
```bash
cd ../backend && npm run dev
```

## Setup

```bash
npm install
npm run dev        # dev server (default http://localhost:5173)
```

Baaki scripts:
```bash
npm run build      # production build (tsc + vite)
npm run preview    # build ko locally serve
npm run lint       # eslint
npm run format     # prettier
```

## Environment (`.env`)

```
VITE_API_URL=http://localhost:5000/api
```
`.env` gitignored hai. Naye machine par ye file banani padegi (ya `.env.example` copy).

## Project Structure

```
src/
├── main.tsx                 # entry (BrowserRouter)
├── App.tsx                  # routes (Layout ke andar)
├── components/
│   ├── Layout.tsx           # navbar + <Outlet/>
│   └── Placeholder.tsx      # temp — Phase 2-5 me replace hoga
├── pages/
│   └── Home.tsx             # dashboard (/)
├── services/
│   ├── api.ts               # axios instance (baseURL + error interceptor)
│   └── nfoService.ts        # typed API calls (har endpoint)
├── types/
│   └── nfo.ts               # backend response types
├── hooks/
│   ├── useFetch.ts          # generic loading/error/data hook
│   ├── useNames.ts          # index names (dropdowns)
│   └── useExpiries.ts       # expiry dates (dropdowns)
├── utils/                   # (Phase 6)
└── styles/index.css         # tailwind
```

`@` alias `src/` par set hai (`vite.config.ts`) → `import x from '@/components/...'`.

## Routes

| Path | Page | Status |
|---|---|---|
| `/` | Dashboard — stat cards + name/type breakdown | ✅ Phase 2 |
| `/data` | Data Explorer — filter bar + table + pagination | ✅ Phase 3 |
| `/chart` | Candlestick Chart — candles + volume (lightweight-charts) | ✅ Phase 4 |
| `/option-chain` | Option Chain — CE/PE strike-wise + ATM highlight | ✅ Phase 5 |

## Backend API

Base: `http://localhost:5000/api` — details ke liye `../backend/README.md` dekho.

Frontend jo endpoints use karta hai:
`/nfo/stats`, `/nfo/names`, `/nfo/symbols`, `/nfo/expiries`,
`/nfo`, `/nfo/symbol/:symbol`, `/nfo/option-chain`.


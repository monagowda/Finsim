# FinSim – Gen Z Edition

A mobile-first personal finance simulator built with React, Vite and Tailwind CSS. Practice budgeting by moving money between "buckets," browse sample savings yields, and compete with friends in a gamified savings challenge.

## Features

- **Home:** greeting and savings highlight, upcoming events carousel, searchable Top Yield Accounts list (sample data)
- **Manage:** four budget buckets. Drag a "Move ₹100 / ₹500 / ₹1000" chip onto another bucket, or tap/press it to choose a destination. Includes a live daily spend limit, a financial health score, a warning before withdrawing from Savings or Emergency, and a celebration when depositing into Savings.
- **Compete:** Versus Mode (Savings Clash) and Co-op Mode (shared trip fund)
- Tabs are linked to the URL hash (`#/home`, `#/manage`, `#/compete`) so refresh and the back button work.

## Quick start

```bash
npm install
npm run dev        # local dev server
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

Requires Node.js 18+.

## Deploy

The build output (`dist/`) is a static site and uses relative asset paths (`base: './'`), so it works on any host or sub-path. Tab routing uses the URL hash, so no server rewrite rules are needed.

| Host | Settings |
|---|---|
| Vercel / Netlify / Cloudflare Pages | Build command `npm run build`, output directory `dist` |
| GitHub Pages / S3 / any static host | Upload the contents of `dist/` |

## Project structure

```
index.html            page shell, meta tags, viewport-fit=cover
src/main.jsx          entry point (wraps the app in an ErrorBoundary)
src/App.jsx           tabs, Manage drag/tap logic, modals, Compete screens
src/ErrorBoundary.jsx friendly fallback if something crashes
src/index.css         Tailwind layers, glass panel styles, reduced-motion support
public/favicon.svg    app icon
```

## Customizing demo data

Constants at the top of `src/App.jsx`: `DEFAULT_BUCKETS`, `CHIP_AMOUNTS`, `CAROUSEL_EVENTS`, `ALL_BANKS`, `DAYS_IN_MONTH`.

## Notes

- All data is mock and nothing is persisted; a refresh resets Manage balances.
- Bank rates are sample values for demonstration, not live rates or financial advice.
- Currency is Indian Rupees (₹). Keep files saved as UTF-8.

# SF 330 Builder

A web app for building SF 330 Part I (Contract-Specific Qualifications) submissions for US federal Architect-Engineer procurement.

## What It Does

- Multi-section wizard covering all SF 330 Part I sections (A through H)
- All data saved automatically to localStorage — reload without losing work
- HTML preview with print-ready formatting
- PDF export via `@react-pdf/renderer`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for Production

```bash
npm run build
npm start
```

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- shadcn/ui components
- react-hook-form + zod for form validation
- Zustand (with localStorage persistence)
- @react-pdf/renderer for PDF export

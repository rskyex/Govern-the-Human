# Govern the Human

> AI governance asks what systems do. This project asks what they do to the human subject.

A research communication platform examining second-order AI governance — how AI systems transform the human subjects who are meant to govern them. Created by **Risa Koyanagi**, Cambridge Future Scholar.

## Overview

"Govern the Human" explores how AI reshapes human agency, identity, and democratic participation. Rather than focusing on what AI systems do technically, this project investigates the structural transformations they produce in the people who live under and alongside them.

### Three-Layer Framework

The project is built around three conditions of transformation:

- **Epistemic** — How AI alters knowledge formation and justified belief
- **Ontological** — How AI modifies categories of agency and selfhood
- **Political** — How AI restructures conditions for democratic participation

### Research Instruments

The site presents three diagnostic instruments:

| Instrument | Path | Focus |
|---|---|---|
| **Observatory** | `/observatory` | Working tool: loads `gth-result/v1` files from SelfTrace and Narrative Drift and produces a Second-Order Assessment across the epistemic, ontological and political layers. Runs entirely in the browser. |
| **SelfTrace** | `/selftrace` | Reads a posting archive (demo profile or own export) and shows rewarded, kept and resisted topics and the range of subjects over time |
| **Narrative Drift** | `/narrative-drift` | Single-session simulation: five calibration questions, nine encounters, five axes; records which options were taken and how far the profile moved |

### Observatory and the shared result format

SelfTrace (`/results`) and Narrative Drift (diagnostic page) each export a `gth-result/v1` JSON file. The format is documented in [`SCHEMA.md`](SCHEMA.md). The Observatory reads one or more of these files (file picker or drag and drop), or the bundled reference runs, and builds a report with one question per layer, the indicators and their source instrument, a reading derived only from those indicators, and the provision each question is relevant to. The report exports as JSON (`gth-assessment/v1`) or prints. It is not a legal or clinical assessment.

## Tech Stack

| Technology | Version |
|---|---|
| [Next.js](https://nextjs.org/) | 16 |
| [React](https://react.dev/) | 19 |
| [TypeScript](https://www.typescriptlang.org/) | 5.9 |
| [Tailwind CSS](https://tailwindcss.com/) | 4 |
| [Framer Motion](https://www.framer.com/motion/) | 12 |

## Design System

**Typography**

- Display: Cormorant Garamond (serif) — headings and titles
- Body: Inter (sans-serif) — body text and UI elements
- Base size: 17px

**Color Tokens**

| Token | Value | Usage |
|---|---|---|
| `base` | `#ffffff` | Main background |
| `surface` | `#f5f6f8` | Alternate section background |
| `text-primary` | `#0e1117` | Primary text |
| `text-secondary` | `#363a45` | Secondary text |
| `text-tertiary` | `#555a68` | Tertiary text |
| `text-ghost` | `#7d8291` | Muted labels and captions |
| `text-subtitle` | `#1e3a5f` | Blue accent text |
| `panel` | `rgba(255,255,255,0.7)` | Card backgrounds |
| `rule` | `rgba(0,0,0,0.09)` | Borders and dividers |

## Getting Started

### Prerequisites

- Node.js >= 20 (the repo pins Node 22 via `.node-version`)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

The project is configured for static export.

```bash
npm run build
```

Pages are exported as `<route>/index.html` (`trailingSlash: true`), so `/observatory/` works on any static host without rewrites. Set `NEXT_PUBLIC_SITE_URL` to the public address if it is not the Vercel production URL; it is used for `og:image`.

### Test

```bash
npm test
```

Checks the Observatory's file validation and rebuilds the report for the reference runs, comparing it with `public/observatory/fixtures/expected-report.json` (ignoring `generated_at`). After an intended change, run `npm run test:update` and commit the new expected report.

## Project Structure

```
src/
├── app/
│   ├── page.tsx                      # Home — thesis, framework, suite overview
│   ├── layout.tsx                    # Root layout with metadata
│   ├── globals.css                   # Tailwind theme configuration
│   ├── observatory/
│   │   ├── page.tsx                  # Observatory route and framing sections
│   │   └── observatory-tool.tsx      # Loader and Second-Order Assessment report
│   ├── selftrace/
│   │   └── page.tsx                  # SelfTrace instrument page
│   └── narrative-drift/
│       └── page.tsx                  # Narrative Drift instrument page
├── components/
│   ├── header.tsx                    # Fixed navigation header
│   ├── hero.tsx                      # Hero section
│   ├── thesis.tsx                    # Central research question
│   ├── three-layer-model.tsx         # Epistemic / Ontological / Political framework
│   ├── suite.tsx                     # Three instruments overview
│   ├── governance-gap.tsx            # Current vs. proposed governance diagram
│   ├── closing.tsx                   # Closing statement
│   ├── footer.tsx                    # Footer with author bio
│   ├── section-divider.tsx           # Section transition divider
│   ├── suite-page-layout.tsx         # Shared layout for instrument pages
│   └── ui/
│       └── reveal.tsx                # Scroll-reveal animation primitive
└── lib/
    ├── images.ts                     # Centralized image asset map
    └── observatory/
        ├── types.ts                  # gth-result/v1 types
        ├── parse.ts                  # Validation and personal-content scan
        ├── assess.ts                 # Builds the Second-Order Assessment
        └── reference.ts              # Reference runs and how to reproduce them
public/observatory/fixtures/          # Reference runs and the expected report
tests/                                # npm test (node --test)
```

## Author

**Risa Koyanagi** — Cambridge Future Scholar

Research areas: space governance, nuclear governance, cyber governance, strategic risk, emerging technology governance, legitimation theory, dual-use governance, authority architecture, international security.

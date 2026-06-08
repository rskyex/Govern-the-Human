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
| **Observatory** | `/observatory` | Tracking ontological transformations — agency displacement, identity classification, selfhood mediation, temporal compression, and normative drift |
| **SelfTrace** | `/selftrace` | Examining mediated identity — reflexive distortion, memory mediation, identity coherence, and affective calibration |
| **Narrative Drift** | `/narrative-drift` | Investigating algorithmic curation — salience manipulation, temporal fragmentation, preference drift, memory substitution, and coherence erosion |

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

- Node.js >= 20

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

The project is configured for static export (`output: 'export'` in `next.config.ts`).

```bash
npm run build
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Home — thesis, framework, suite overview
│   ├── layout.tsx                # Root layout with metadata and fonts
│   ├── globals.css               # Tailwind theme and design tokens
│   ├── observatory/
│   │   ├── page.tsx              # Observatory instrument page
│   │   └── observatory-page.tsx  # Alternative layout variant
│   ├── selftrace/
│   │   ├── page.tsx              # SelfTrace instrument page
│   │   └── selftrace-page.tsx    # Alternative layout variant
│   └── narrative-drift/
│       ├── page.tsx              # Narrative Drift instrument page
│       └── narrative-drift-page.tsx  # Alternative layout variant
├── components/
│   ├── header.tsx                # Fixed navigation header
│   ├── hero.tsx                  # Hero section with full-bleed background
│   ├── thesis.tsx                # Central research question
│   ├── three-layer-model.tsx     # Epistemic / Ontological / Political framework
│   ├── suite.tsx                 # Three instruments overview cards
│   ├── governance-gap.tsx        # Current vs. proposed governance diagram
│   ├── closing.tsx               # Closing statement
│   ├── footer.tsx                # Footer with author bio
│   ├── section-divider.tsx       # Gold gradient divider with logo
│   ├── suite-page-layout.tsx     # Shared suite page components (SuiteHero, ConceptCard, SuiteNav, etc.)
│   └── ui/
│       └── reveal.tsx            # Scroll-triggered Framer Motion animation
└── lib/
    └── images.ts                 # Centralized image asset map
```

## Author

**Risa Koyanagi** — Cambridge Future Scholar

Research areas: space governance, nuclear governance, cyber governance, strategic risk, emerging technology governance, legitimation theory, dual-use governance, authority architecture, international security.

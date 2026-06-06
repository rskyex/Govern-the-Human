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

## Project Structure

```
src/
├── app/
│   ├── page.tsx                      # Home — thesis, framework, suite overview
│   ├── layout.tsx                    # Root layout with metadata
│   ├── globals.css                   # Tailwind theme configuration
│   ├── observatory/
│   │   ├── page.tsx                  # Observatory route (metadata + entry)
│   │   └── observatory-page.tsx      # Observatory instrument content
│   ├── selftrace/
│   │   ├── page.tsx                  # SelfTrace route (metadata + entry)
│   │   └── selftrace-page.tsx        # SelfTrace instrument content
│   └── narrative-drift/
│       ├── page.tsx                  # Narrative Drift route (metadata + entry)
│       └── narrative-drift-page.tsx  # Narrative Drift instrument content
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
    └── images.ts                     # Centralized image asset map
```

## Author

**Risa Koyanagi** — Cambridge Future Scholar

Research areas: space governance, nuclear governance, cyber governance, strategic risk, emerging technology governance, legitimation theory, dual-use governance, authority architecture, international security.

# FrameLab

FrameLab is a design-first language where design systems become executable and compile into production UI.

Instead of handing off static screens, designers define interface structure, layout primitives, states, motion, and interaction intent using a declarative language.

FrameLab compiles those definitions into production UI components.

`Design intent -> FrameLab -> Production UI`

# Why FrameLab Exists

Today product teams work across two disconnected layers:

Design tools define visual systems.  
Engineering frameworks implement UI architecture.

This creates a gap between design intent and shipped code.

Designers produce artifacts.  
Engineers reinterpret them into code.

FrameLab explores a different model.

Design systems should be executable.

Instead of handing off screens, designers define interface architecture in a language that compiles into UI.

# What FrameLab Enables

FrameLab introduces a new layer between design and engineering.

Design  
↓  
FrameLab (design architecture)  
↓  
Production UI

Designers define:

- layout primitives
- component structure
- interaction states
- motion rules
- design tokens
- UI constraints

FrameLab then compiles those rules into real UI components.

# Example Concept

A FrameLab component might describe interface structure like this:

```text
surface
stack
slot
state hover
motion shift
intent trigger
```

These declarations define UI architecture that compiles into framework components.

# What This Repository Contains

This repository contains a marketing site and prototype demo for FrameLab.

Included in this project:

- A Vite + React + TypeScript demo site explaining the FrameLab concept
- A sample compiled component example
- A lightweight reactive runtime prototype
- A demonstration of design-first UI architecture

# Tech Stack

- React
- TypeScript
- Vite
- ESLint

# Getting Started

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

Build for production

```bash
npm run build
```

Preview the production build

```bash
npm run preview
```

# Project Structure

[`src/App.tsx`](src/App.tsx)  
Main landing page and concept explanation

[`src/HelloCard.tsx`](src/HelloCard.tsx)  
Example compiled component used in the demo

[`src/runtime/signals.ts`](src/runtime/signals.ts)  
Minimal reactive runtime primitives

[`src/tokens.css`](src/tokens.css)  
Shared design tokens

[`src/App.css`](src/App.css)  
Page styling

# Creator

FrameLab was created by Daniel (GitHub: FVDEDFOREVR).

FrameLab explores a new approach to design systems where interface architecture can be defined declaratively and compiled into production UI.

This repository represents the early prototype and research exploration of executable design systems.

# Project Origin

FrameLab began as an exploration of how design systems could move beyond documentation and become executable.

Today designers create visual systems while engineers recreate those systems in code.

FrameLab proposes a different approach:

Design systems themselves should be executable.

Instead of handing off static screens, designers define interface structure, layout rules, and behavior as a language that compiles into production UI.

# Vision

FrameLab explores a future where design systems are the source of truth for interface architecture.

In this model:

`Design intent -> FrameLab -> Production UI`

AI systems could generate FrameLab components, while designers maintain control of the system architecture.

# License

FrameLab is open source under the Apache License 2.0.

See the LICENSE file for details.

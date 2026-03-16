# FRAMELAB Site

Marketing site and demo app for FRAMELAB, a design-first language that compiles `.fl` files into React components.

This repo contains a Vite + React + TypeScript single-page site that explains the FRAMELAB pitch, shows a live compiled component example, and includes a lightweight reactive runtime prototype in [`src/runtime/signals.ts`](/Users/tars/Desktop/Framelab_0.1/framelab-demo/src/runtime/signals.ts).

## What it includes

- Landing page sections for the problem, solution, design-system constraints, AI guardrails, compiler pipeline, and feature highlights
- A demo `HelloCard` component presented as live compiled output from `example.fl`
- Custom styling via token and component CSS files
- A small zero-dependency signals runtime prototype for FRAMELAB-style reactivity experiments

## Tech stack

- React 19
- TypeScript
- Vite
- ESLint

## Getting started

### Install dependencies

```bash
npm install
```

### Start the dev server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Project structure

- [`src/App.tsx`](/Users/tars/Desktop/Framelab_0.1/framelab-demo/src/App.tsx): main landing page and demo sections
- [`src/HelloCard.tsx`](/Users/tars/Desktop/Framelab_0.1/framelab-demo/src/HelloCard.tsx): sample compiled component shown in the hero and compiler demo
- [`src/runtime/signals.ts`](/Users/tars/Desktop/Framelab_0.1/framelab-demo/src/runtime/signals.ts): minimal reactive runtime primitives
- [`src/tokens.css`](/Users/tars/Desktop/Framelab_0.1/framelab-demo/src/tokens.css): shared design tokens
- [`src/App.css`](/Users/tars/Desktop/Framelab_0.1/framelab-demo/src/App.css): page-specific styling

## Scripts

- `npm run dev`: start the Vite dev server
- `npm run build`: type-check and create a production build
- `npm run lint`: run ESLint
- `npm run preview`: preview the built app locally

## Repository

GitHub remote: [FVDEDFOREVR/Framelab-Site](https://github.com/FVDEDFOREVR/Framelab-Site)

# Interview Pattern Trainer

A local-first study app for software engineers preparing for coding and system design interviews.

The app focuses on pattern recognition, retrieval practice, JavaScript template fluency, complexity analysis, and interview explanation practice. It is intentionally not a LeetCode clone.

## Features

- DS&A pattern flashcards with signals, templates, complexity, common problems, and interview voice-over explanations
- Problem to pattern quiz with multi-select answers
- JavaScript code template fill-in exercises with alternate accepted answers
- Complexity quiz for time and space complexity
- System design cheatsheets for common interview systems
- System design concept flashcards
- System design tradeoff quiz
- Explain-back mode with model answers and checklists
- Local progress tracking with `localStorage`
- Responsive, playful study-tool UI

## Tech Stack

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- Local state and `localStorage`
- `node:test` for lightweight unit coverage

No backend, auth, database, payments, or AI grading is included.

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the local dev server:

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

If you want to bind explicitly to localhost:

```bash
pnpm dev --hostname 127.0.0.1
```

## Scripts

```bash
pnpm dev        # Start the Next.js dev server
pnpm build      # Build the app locally
pnpm start      # Serve the built app
pnpm typecheck  # Run TypeScript checks
pnpm test       # Run lightweight unit tests
pnpm lint       # Run Next lint
```

## Project Structure

```text
app/          Route pages and global layout/styles
components/   Reusable UI and study-mode components
data/         Static typed study content
lib/          Pure logic and localStorage progress hook
tests/        Lightweight unit tests
```

Key data files:

```text
data/dsaPatterns.ts
data/dsaProblems.ts
data/codeTemplates.ts
data/complexityQuestions.ts
data/systemDesignCheatsheets.ts
data/systemDesignConcepts.ts
data/systemDesignTradeoffs.ts
data/explainBackPrompts.ts
```

## Data Model

Static content is stored as TypeScript arrays. The core types live in:

```text
data/types.ts
```

Code template blanks support alternate accepted answers:

```ts
{
  type: "blank",
  answer: "left++",
  acceptedAnswers: ["left += 1", "left = left + 1"]
}
```

This keeps the exercises flexible without adding a backend or grading service.

## Progress Tracking

Progress is stored in browser `localStorage` under:

```text
interview-pattern-trainer-progress
```

Tracked fields include:

- completed cards
- quiz accuracy
- weak areas
- last studied date
- study streak

The React hook is in `lib/progress.ts`; testable pure logic is in `lib/progressCore.ts`.

## Testing

Run:

```bash
pnpm test
pnpm typecheck
pnpm build
```

Current tests cover:

- quiz answer normalization and order-insensitive comparison
- alternate accepted code template answers
- progress streak updates
- duplicate card completion prevention
- quiz accuracy and weak-area tracking

## Current Scope

This is a client-only study trainer. It does not sync progress across devices and does not grade explain-back answers automatically.

Useful next improvements:

- Search and filtering across patterns and cheatsheets
- Spaced repetition scheduling
- More JavaScript templates and accepted answer variants
- Import/export progress
- More test coverage around UI interactions

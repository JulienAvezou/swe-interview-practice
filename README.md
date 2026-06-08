# Interview Pattern Trainer

A local-first study app for software engineers preparing for coding and system design interviews.

The app focuses on pattern recognition, retrieval practice, JavaScript template fluency, complexity analysis, and interview explanation practice. It emphasizes the core reusable shapes behind interview problems instead of completing thousands of problems without structure.

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

<img width="1495" height="808" alt="Capture d’écran 2026-06-05 à 15 40 49" src="https://github.com/user-attachments/assets/1719e9ff-e7d1-4928-8a0e-b02980016d05" />
<img width="1398" height="718" alt="Capture d’écran 2026-06-05 à 15 41 05" src="https://github.com/user-attachments/assets/306d5389-ec25-4071-a927-acb528cb0799" />
<img width="1260" height="726" alt="Capture d’écran 2026-06-05 à 15 41 20" src="https://github.com/user-attachments/assets/78171884-dca4-44e2-a16b-0aceaedb3da1" />
<img width="1255" height="701" alt="Capture d’écran 2026-06-05 à 15 41 34" src="https://github.com/user-attachments/assets/7cc83632-9248-45cf-ac2a-2202c73a937b" />


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

## Contributing Content

Contributions are welcome through pull requests.

The easiest way to contribute is by adding new flashcards, quiz questions, code templates, cheatsheets, or explain-back prompts to the static data files in `data/`.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for content guidelines, file locations, examples, and the pull request checklist.

## Current Scope

This is a client-only study trainer. It does not sync progress across devices and does not grade explain-back answers automatically.

Useful next improvements:

- Search and filtering across patterns and cheatsheets
- Spaced repetition scheduling
- More JavaScript templates and accepted answer variants
- Import/export progress
- More test coverage around UI interactions

# Architecture

Interview Pattern Trainer is a local-first study application for coding and system design interview preparation. The architecture is intentionally small: the product value comes from structured study workflows, typed content, retrieval practice, and client-side progress tracking rather than backend infrastructure.

This document explains the current architecture and the decisions behind what is included, what is intentionally omitted, and how the project could evolve.

## System Overview

```text
Browser
  |
  | renders static Next.js routes
  v
Next.js App Router
  |
  | imports typed study data
  v
Static TypeScript data files
  |
  | user actions update progress
  v
localStorage
```

The app can run entirely on `localhost` and does not require a networked backend, database, authentication provider, or AI service.

## Frontend

The frontend is the core of the application.

Stack:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Client-side state
- Browser `localStorage`

The route structure separates study areas into focused pages:

```text
app/
  page.tsx
  dsa/
  system-design/
  explain-back/
```

Reusable UI and exercise logic live in `components/`:

```text
components/
  Flashcard.tsx
  QuizQuestion.tsx
  CodeTemplateExercise.tsx
  ComplexityExercise.tsx
  ExplainBackExercise.tsx
  CheatsheetBrowser.tsx
  GroupedStudyLayout.tsx
  StudySidebar.tsx
```

The main frontend design choice is to model study modes as reusable components powered by typed content. For example, the same quiz component supports both DS&A problem-to-pattern questions and system design tradeoff questions because both are represented as structured question data.

### UI Architecture

The UI is organized around study flows rather than a generic content library:

- Dashboard summarizes progress, weak areas, and entry points.
- DS&A pages focus on pattern recognition, code templates, and complexity.
- System design pages focus on concepts, cheatsheets, and tradeoffs.
- Explain-back mode gives prompts, model answers, and checklists.

Navigation is split into:

- Top-level navigation for major product areas.
- Group side navigation for related exercises inside DS&A and system design.

This keeps the app easy to scan while allowing each study mode to stay focused.

## Data Model

All lesson content is static TypeScript data under `data/`.

```text
data/
  dsaPatterns.ts
  dsaProblems.ts
  codeTemplates.ts
  complexityQuestions.ts
  systemDesignCheatsheets.ts
  systemDesignConcepts.ts
  systemDesignTradeoffs.ts
  explainBackPrompts.ts
  types.ts
```

The shared types in `data/types.ts` make the content easy to extend safely. For example:

```ts
export type DSAPattern = {
  id: string;
  name: string;
  explanation: string;
  signals: string[];
  whenToUse: string[];
  commonProblems: string[];
  template?: string;
  complexity: {
    time: string;
    space: string;
  };
  voiceOver: string;
};
```

This structure supports a content-driven architecture:

- Adding a DS&A pattern does not require changing rendering code.
- Adding quiz questions does not require new routes.
- Adding accepted answers for code blanks does not require a grading service.
- The compiler catches missing fields and invalid content shapes.

Current content targets:

- 40 DS&A pattern flashcards
- 30 problem-to-pattern quiz questions
- 20 JavaScript code template exercises
- 20 complexity questions
- 40 system design flashcards
- 20 system design tradeoff questions
- 10 explain-back prompts

## Client-Side Logic

Pure business logic lives in `lib/` so it can be tested without rendering React.

```text
lib/
  codeTemplateCore.ts
  progressCore.ts
  quizCore.ts
  progress.ts
  studyNav.ts
```

Key responsibilities:

- `quizCore.ts`: answer normalization, order-insensitive answer comparison, deterministic option shuffling.
- `codeTemplateCore.ts`: template blank normalization and alternate accepted answers.
- `progressCore.ts`: pure progress updates, streak logic, quiz accuracy, weak areas.
- `progress.ts`: React hook that connects progress logic to `localStorage`.
- `studyNav.ts`: grouped navigation metadata.

Keeping logic outside components makes the project easier to test and extend.

## Progress Tracking

Progress is stored locally in the browser.

Storage key:

```text
interview-pattern-trainer-progress
```

Tracked fields include:

- completed cards
- quiz attempts
- quiz accuracy
- weak areas
- last studied date
- streak count

This is an intentional product decision for the first version. Local progress avoids accounts, synchronization, privacy concerns, backend hosting, and database schema work while still giving users useful feedback.

Tradeoff:

- Pro: simple, private, fast, and deployable as a static-style app.
- Con: progress is tied to one browser/device unless import/export or account sync is added later.

## Backend

There is no backend in the current implementation.

This is intentional. The app does not currently need server-side capabilities because:

- Study content is static.
- Progress is local to the browser.
- There is no authentication.
- There are no shared user resources.
- There is no payment or subscription flow.
- There is no server-side grading.

If the product evolved, a backend would become useful for:

- syncing progress across devices
- user accounts
- shared study plans
- analytics
- content authoring/admin tools
- AI-powered explain-back feedback
- spaced repetition scheduling across sessions

A reasonable future backend shape would be:

```text
Next.js app
  |
  v
API routes or separate API service
  |
  +-- relational database for users/progress/content metadata
  +-- object storage for imported/exported study packs
  +-- queue for AI feedback or content generation jobs
```

## Database

There is no database in the current implementation.

The current source of truth is the repository:

- Static lessons live in TypeScript files.
- User progress lives in browser `localStorage`.

This keeps the project easy to inspect on GitHub because reviewers can see the complete product surface without provisioning infrastructure.

If a database were added, the likely model would include:

- `users`
- `study_sessions`
- `completed_cards`
- `quiz_attempts`
- `weak_areas`
- `study_items`
- `study_packs`

For a production version with accounts, a relational database such as PostgreSQL would be a strong default because progress, attempts, users, and content metadata are naturally relational. Static lesson content could either remain code-owned or move into an admin-managed content table later.

## Authentication

There is no authentication in the current implementation.

That is appropriate for the current local-first scope because:

- No server data is personalized.
- No user account is required to study.
- No private cloud data is stored.

If account sync were added, authentication would become necessary. A practical future approach would be:

- email/social login through a managed auth provider
- authenticated API endpoints for progress sync
- clear guest mode vs signed-in mode behavior
- export/import fallback for users who do not want accounts

The important architectural boundary is that progress logic already exists separately from storage. Today it writes to `localStorage`; later it could write to an API without rewriting the study components.

## AI Integration

There is no AI integration in the current implementation.

Explain-back mode currently uses:

- a prompt
- a freeform user response
- a model answer
- a checklist

This avoids overengineering and keeps the app deterministic. It also avoids pretending that AI grading is reliable without thoughtful evaluation.

A future AI integration could add:

- rubric-based explain-back feedback
- missing-concept detection
- suggested rewrites
- personalized weak-area drills
- generated follow-up questions

The safest future architecture would keep AI feedback asynchronous and bounded:

```text
User explanation
  |
  v
API endpoint
  |
  v
AI feedback service
  |
  v
Structured rubric response
```

The client should still show the checklist and model answer even if AI feedback fails. AI should enhance practice, not block the core learning flow.

## Deployment

The app is currently designed to run locally with:

```bash
pnpm dev
```

It can also be built with:

```bash
pnpm build
```

Because there is no backend, database, or auth provider, deployment is straightforward. Good hosting options include:

- Vercel
- Netlify
- Cloudflare Pages
- any Node-compatible host that can serve a Next.js build

The current deployment footprint is low:

- no environment variables required
- no migrations
- no secrets
- no external services
- no runtime data dependencies

If backend features are added later, deployment complexity would increase to include environment configuration, database migrations, auth secrets, monitoring, and backup strategy.

## Testing Strategy

The project includes lightweight unit coverage for the logic most likely to create subtle product bugs:

- quiz answer normalization
- order-insensitive multi-select answer checking
- deterministic option shuffling
- accepted alternate code-template answers
- local progress updates
- streak behavior
- duplicate completed-card prevention
- quiz accuracy and weak-area tracking

Tests live under:

```text
tests/
  progressCore.test.ts
  quizCore.test.ts
```

Validation commands:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

This testing strategy matches the current risk profile: the app is mostly static content and client-side interactions, so pure logic tests plus TypeScript checks provide a good return without heavy test infrastructure.

## Key Engineering Decisions

### Local-first by default

The app prioritizes immediate usefulness and low operational complexity. Local progress is enough for the first version and keeps the product private and easy to run.

### Typed content instead of ad hoc JSON

TypeScript content files make the learning data self-documenting and compiler-checked. This is useful because the app has many content types with similar but distinct structures.

### Reusable study components

The app avoids one-off page logic where possible. Quizzes, flashcards, template exercises, and explain-back prompts are reusable components driven by data.

### Pure logic separated from React

Core operations are implemented as plain functions in `lib/` and tested directly. This improves maintainability and makes future storage or UI changes easier.

### No AI grading in the first version

Explain-back practice is valuable even without automated grading. The current version uses model answers and checklists, which are reliable, transparent, and cheap to run.

## Future Architecture Roadmap

Potential next steps, in increasing infrastructure complexity:

1. Add search and filters across patterns, prompts, and concepts.
2. Add import/export for local progress.
3. Add spaced repetition scheduling using local progress data.
4. Add richer UI interaction tests.
5. Add optional account sync.
6. Add a backend API for persisted progress.
7. Add AI-assisted explain-back feedback with structured rubrics.
8. Add admin tooling for managing content outside the codebase.

The current architecture intentionally keeps these paths open without requiring them upfront.

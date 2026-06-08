# Contributing

Thanks for contributing to Interview Pattern Trainer.

This project accepts content contributions through GitHub pull requests. The easiest way to contribute is to add or improve static study content in the `data/` directory.

## What You Can Add

- DS&A pattern flashcards
- Problem-to-pattern quiz questions
- JavaScript code template fill-in exercises
- Complexity quiz questions
- System design flashcards
- System design tradeoff quiz questions
- Explain-back prompts

## Where to Add Content

| Content type | File |
| --- | --- |
| DS&A pattern flashcards | `data/dsaPatterns.ts` |
| Problem -> pattern quiz | `data/dsaProblems.ts` |
| Code template fill-ins | `data/codeTemplates.ts` |
| Complexity questions | `data/complexityQuestions.ts` |
| System design cheatsheets | `data/systemDesignCheatsheets.ts` |
| System design flashcards | `data/systemDesignConcepts.ts` |
| System design tradeoff quiz | `data/systemDesignTradeoffs.ts` |
| Explain-back prompts | `data/explainBackPrompts.ts` |

The shared TypeScript types live in `data/types.ts`.

## Content Guidelines

Good contributions should be:

- beginner-friendly but interview-relevant
- concise
- technically accurate
- focused on reusable patterns, tradeoffs, or explanation practice
- written in plain English
- useful for real interview preparation

Avoid:

- duplicate or near-duplicate entries
- vague explanations
- overly academic wording
- unsupported complexity claims
- trivia that does not improve interview readiness
- adding backend, auth, database, payment, or AI features in content-only PRs

## Adding a DS&A Pattern

Add new DS&A pattern flashcards to `data/dsaPatterns.ts`.

Use the `DSAPattern` type from `data/types.ts`:

```ts
type DSAPattern = {
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

A strong DS&A pattern entry should include:

- a stable lowercase `id`
- a clear pattern name
- a short explanation
- signals someone might notice in a prompt
- when to use the pattern
- common related problems
- a JavaScript template when useful
- expected time and space complexity
- an interview voice-over explanation

The voice-over should sound like something a candidate could say out loud in an interview.

Example voice-over:

```text
I am using a hash map because I need constant-time lookup. This lets me avoid checking every pair with nested loops and reduces the time complexity from O(n^2) to O(n).
```

## Adding a Problem-to-Pattern Quiz Question

Add problem-to-pattern questions to `data/dsaProblems.ts`.

Each question should include:

- a short prompt
- multiple plausible pattern options
- one or more correct answers
- an explanation
- common signals
- related problems

Correct answers do not need to be listed first. The app shuffles answer options when rendering quizzes.

## Adding a Code Template Fill-in

Add JavaScript template exercises to `data/codeTemplates.ts`.

Code templates currently support JavaScript only.

Use `text` chunks for visible code and `blank` chunks for user inputs:

```ts
{
  id: "binary-search",
  title: "Binary Search",
  pattern: "Binary Search",
  language: "javascript",
  chunks: [
    { type: "text", value: "while (" },
    { type: "blank", answer: "left <= right", acceptedAnswers: ["right >= left"] },
    { type: "text", value: ") {" }
  ],
  explanation: "The loop continues while the search window is valid."
}
```

Use `acceptedAnswers` when multiple answers are reasonably correct.

Good accepted-answer examples:

- `left++`
- `left += 1`
- `left = left + 1`

Keep blanks focused. A template with a few meaningful blanks is usually better than one with many tiny syntax blanks.

## Adding a Complexity Question

Add complexity questions to `data/complexityQuestions.ts`.

Use one of the existing complexity options:

- `O(1)`
- `O(log n)`
- `O(n)`
- `O(n log n)`
- `O(n^2)`
- `O(2^n)`

If the true complexity is more specific, explain that nuance in the explanation while choosing the closest available option used by the app.

## Adding System Design Content

System design content should be practical and interview-oriented.

For flashcards in `data/systemDesignConcepts.ts`, include:

- plain English explanation
- when the concept matters
- a common interview phrase
- a concrete example usage

For tradeoff questions in `data/systemDesignTradeoffs.ts`, prefer scenario-based questions over definitions.

Good tradeoff topics include:

- SQL vs NoSQL
- cache invalidation
- synchronous vs queued work
- WebSockets vs polling
- strong vs eventual consistency
- horizontal vs vertical scaling
- read-heavy vs write-heavy design

## Adding Explain-Back Prompts

Add explain-back prompts to `data/explainBackPrompts.ts`.

Each prompt should include:

- a focused explanation prompt
- a model answer
- a checklist of key points

The goal is to help users practice saying the answer clearly, not to memorize a script word-for-word.

## Local Setup

Install dependencies:

```bash
pnpm install
```

Run the app locally:

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

## Before Opening a Pull Request

Run:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

If your change is content-only, these commands should still pass because the content is TypeScript-checked.

## Pull Request Checklist

- [ ] I added content to the correct data file.
- [ ] I used the existing TypeScript types.
- [ ] I checked for duplicate or near-duplicate content.
- [ ] Explanations are beginner-friendly and interview-relevant.
- [ ] Code templates are JavaScript only.
- [ ] I added alternate accepted answers where useful.
- [ ] I ran `pnpm lint`.
- [ ] I ran `pnpm typecheck`.
- [ ] I ran `pnpm test`.
- [ ] I ran `pnpm build`.

## Review Expectations

Content PRs are reviewed for:

- technical correctness
- clarity
- consistency with existing tone
- usefulness for interview preparation
- fit with the current local-first scope

Small focused PRs are easier to review than large mixed changes.

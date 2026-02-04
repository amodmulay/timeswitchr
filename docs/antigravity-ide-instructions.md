# Antigravity IDE Instructions: TimeSwitchr Code Review Findings

Use the following instructions in Antigravity IDE to guide refactors, cleanup tasks, and technical debt reductions for the TimeSwitchr codebase.

## Goals
- Reduce duplicated metadata configuration and analytics event wiring.
- Centralize shared constants and styling.
- Simplify repetitive input/gesture handlers.
- Keep UI logic cleanly separated from styling.

## Tasks

### 1) Extract shared metadata builder
- Create a helper that returns consistent `openGraph` and `twitter` metadata blocks.
- Use it in both the root page and slug-based page so image URLs, titles, and descriptions stay in sync.
- Ensure the helper is type-safe with Next.js `Metadata`.

### 2) Move ad styles out of component logic
- Remove inline style objects and injected `<style>` tags used for ad placeholders.
- Create a CSS module or add to global CSS for:
  - Sticky ad visibility (hidden at `min-width: 600px`).
  - Native and sticky ad presentation (border, padding, text color, etc.).
- Update the component to apply only class names.

### 3) Centralize analytics event tracking
- Add a small helper (or a typed event map) that standardizes `action`, `category`, and `label` usage.
- Replace per-component analytics calls with the helper.
- Ensure new helper stays compatible with `lib/analytics.ts`.

### 4) Simplify Wheel input/gesture handlers
- Extract repeated mouse/touch hold logic into a custom hook (e.g., `useHoldToRepeat`).
- Consider using pointer events to unify mouse and touch behavior.
- Keep keyboard and wheel interactions intact.

### 5) Reuse time zone constants for the World Clock
- Replace the hard-coded zone list in the World Clock with a shared constant.
- Prefer referencing a subset of `COMMON_TIMEZONES` from `lib/time`.
- Ensure display labels remain consistent with existing UI.

## Notes
- Keep UX unchanged while refactoring.
- Avoid introducing new dependencies unless they are already in the stack.
- Prefer small, incremental changes per PR.

# Timeswitchr Development Guide

Welcome to the Timeswitchr project! This document is designed to help you, as a developer, understand how this application is built, its architectural choices, and how to contribute to its development.

## 1. Project Overview

**Timeswitchr** is a modern, high-performance time zone conversion tool. It allows users to quickly convert times between different locations, search for time zones by city or country, and see how time differences affect "Next day" or "Previous day" logic.

## 2. Technology Stack

We use a modern React-based stack to ensure speed, type safety, and a premium user experience:

- **Next.js 15+ (App Router)**: Our core framework for routing and server-side rendering.
- **React 19**: Utilizing the latest React features and concurrent rendering.
- **TypeScript**: Ensuring type safety across the entire codebase.
- **Luxon**: Our primary library for date and time manipulation. It handles all the complex time zone logic and IANA names.
- **CSS Modules**: For scoped and maintainable styling, preventing global style leaks.
- **Vanilla CSS**: We prefer custom, premium CSS for maximum design control over generic frameworks.

## 3. Project Structure

Here is a breakdown of the `src` directory:

```text
src/
├── app/            # Next.js App Router (pages and layouts)
│   ├── layout.tsx  # Global layout, fonts, and metadata
│   └── page.tsx    # The main "Home" page entry point
├── components/     # Reusable UI components
│   ├── Converter.tsx       # Main conversion display logic
│   ├── TimePicker.tsx      # The rolling wheel time picker
│   ├── TimeZoneSelector.tsx # Searchable timezone dropdown
│   └── ...                 # Other UI components
├── hooks/          # Custom React hooks
│   └── useHoldToRepeat.ts  # Logic for holding buttons to auto-repeat
├── lib/            # Core business logic and utilities
│   ├── time.ts           # Time conversion, timezone lists, Luxon wrappers
│   ├── timezone-data.ts  # Static timezone mappings and city data
│   ├── analytics.ts      # Typed analytics event tracking
│   └── metadata.ts       # Centralized SEO and social metadata
```

## 4. Architectural Concepts

### Time Handling with Luxon
We do **not** use the native JavaScript `Date` object for major logic. Instead, we use `Luxon` because it handles IANA time zone identifiers (e.g., `America/New_York`) and Daylight Saving Time (DST) changes reliably.
- See `src/lib/time.ts` for functions like `convertTime` and `getAllTimeZones`.

### The "Rolling Wheel" Time Picker
One of the core UX features is the mobile-friendly time picker.
- **Mechanism**: It uses `PointerEvents` (`onPointerDown`, `onPointerMove`, `onPointerUp`) to simulate a physical wheel.
- **State Management**: It tracks `scrollOffset` and `isDragging` to provide smooth animations.
- **Fallback**: It also supports a "Keyboard" mode where users can type the time directly into a native `<input type="time" />`.

### Custom Hook: `useHoldToRepeat`
To improve Desktop and Mobile UX, the up/down buttons on the time picker use a custom hook that fires an action repeatedly if the user holds the button down.

### Searchable Timezones
We don't just search by IANA ID. `src/lib/time.ts` uses a heuristic to map IANA IDs to common city and country names, making the search much more intuitive for users (e.g., searching "Paris" instead of just "Europe/Paris").

## 5. Getting Started

### Local Development
1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Run the dev server**:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
npm run start
```

## 6. Development Best Practices

- **Type Safety**: Always define interfaces for component props and function signatures.
- **CSS Modules**: Use `.module.css` files. Avoid inline styles unless absolutely necessary for dynamic values (like `transform`).
- **Performance**: Be mindful of expensive computations in `getAllTimeZones`. We use basic caching (`allZonesCache`) to prevent re-calculating the entire timezone list on every click.
- **Analytics**: Use the centralized tracking in `src/lib/analytics.ts` to log user interactions consistently.

---

*This guide is updated as the application evolves. If you notice any missing details, please feel free to contribute to this document!*

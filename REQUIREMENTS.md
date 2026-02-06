# Timeswitchr Product Requirements Document (PRD)

## 1. Product Vision
Timeswitchr is a high-performance, aesthetically pleasing web application designed for professionals and global travelers who need to convert times across multiple zones quickly and reliably. The focus is on speed, accuracy, and a premium "native-app" feel.

## 2. Functional Requirements

### 2.1 Time Conversion Engine
- **Accuracy**: All conversions must be handled by `Luxon` to ensure correct handling of IANA time zones and Daylight Saving Time (DST).
- **Directionality**: Users can convert from Zone A to Zone B.
- **Relative Dating**: The system must clearly indicate if the converted time results in a "Next day" or "Previous day" relative to the source time.

### 2.2 Timezone Selection
- **Searchability**: Users must be able to search for time zones by IANA ID (e.g., `Europe/Berlin`), City (e.g., `London`, `Berlin`, `Pune`), or Country (e.g., `India`).
- **Standardization**: Display names should be consistent, showing offset, abbreviation, and keywords.
- **De-duplication**: The system should handle redundant timezone entries gracefully, preferring canonical IDs.

### 2.3 User Interface (Input)
- **Rolling Wheel Picker**: A mobile-first interactive wheel for selecting hours and minutes.
- **Keyboard Mode**: A fallback for power users to type the time directly via a standard time input.
- **12h/24h Toggle**: Users can switch between formats on the fly.
- **Hold-to-Repeat**: Up/Down buttons must support auto-repeat when held down.

### 2.4 World Clock
- **Presets**: Display a set of common "World Clock" timezones (e.g., UTC, CET, IST, ET, PT) for quick reference.

### 2.5 PWA Support
- **Installability**: The application must be installable on mobile and desktop devices.
- **Offline Basic**: Provide a functional "installed" experience even with intermittent connectivity.

## 3. Non-Functional Requirements

### 3.1 Performance
- **Zero-Latency Feel**: UI updates for time transitions must be instantaneous (under 50ms).
- **Efficient Calculation**: The timezone list calculation must be optimized or cached to prevent UI jank.

### 3.2 Visual Identity
- **Premium Design**: Use modern design principles including glassmorphism, subtle gradients, and smooth CSS transitions.
- **Consistency**: All components must use CSS Modules to ensure encapsulated styling.

### 3.3 Accessibility & Compatibility
- **Responsive**: The layout must adapt seamlessly from mobile (320px) to ultra-wide desktops.
- **Browser Support**: Target modern evergreen browsers (Chrome, Safari, Firefox, Edge).

## 4. Technical Stack
- **Framework**: Next.js 15+
- **Library**: Luxon (Time data)
- **Language**: TypeScript (Strict mode)
- **Styling**: Vanilla CSS (Modules)

---

*This document is a living requirement set. Any change to the application's core logic or UX must be reflected here.*

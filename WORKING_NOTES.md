# 🪷 Garden Wedding Project — Working Notes

> **Last updated:** 2026-09-16  
> **Repo:** https://github.com/Rahulsara08/garden-wedding-project  
> **Branch:** `main`  
> **Latest commit:** `f651ea2`  
> **Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS

---

## Project Overview

A luxury Indian garden wedding invitation web app. It runs inside a phone mockup frame on desktop and as a full-screen experience on mobile. The design uses a watercolor/royal Rajasthani aesthetic with dark green (`#1F2921`) and cream/gold palette.

---

### 1. Preloader / Seal Invitation Screen — Inside Phone Frame
**Files:** `src/components/sections/00-Preloader.tsx`, `src/app/page.tsx`
- Moved the `Preloader` seal invitation screen inside the `PhoneMockupFrame` (`absolute inset-0 z-40`)
- Now the initial invitation screen (RadhaKrishna seal, couple names, date, tagline, and "Tap anywhere to enter") displays inside the smartphone frame rather than full screen on desktop

### 2. Hero Section Cleanup
**File:** `src/components/sections/02-HeroWelcome.tsx`
- Removed the animated scroll cue bar (vertical gradient line at the bottom)
- Removed the corner lotus blossom overlay image
- Re-balanced vertical spacing (`pt-10 pb-6`) for a clean, royal look

### 2. Phone Mockup Frame — Top Gap Fix
**File:** `src/components/layout/PhoneMockupFrame.tsx`
- Removed `pt-7` padding from the inner scroll container (now `pt-0 pb-4`)
- Watercolor background extends seamlessly to the top curve under the Dynamic Island pill
- No more empty beige gap at the top of the phone

### 3. Desktop Wallpaper
**File:** `src/components/layout/PhoneMockupFrame.tsx`
**Asset:** `public/assets/watercolor/desktop-ambient-wallpaper.jpg`
- Added a panoramic botanical watercolor wallpaper behind the smartphone frame on desktop
- Features sage washes, water lilies, and royal temple pavilions

### 4. Accommodations Image
**File:** `src/components/sections/11-TravelStay.tsx`
**Asset:** `public/assets/watercolor/royal-palace-suite.jpg`
- Replaced `heritage-fort.jpg` with a grand imperial palace pavilion image
- Features warm sandstone pillars, carved jali screens, and chhatri domes

### 5. Hydration Fix (SSR)
**Files:** `src/hooks/useStorageState.ts`, `src/components/sections/09-BlessingsWall.tsx`
- `useStorageState` hook initializes with `defaultValue` on server, hydrates from `localStorage` in `useEffect` after mount
- Added `suppressHydrationWarning` on the wishes counter `<span>`
- Fixed: `Hydration failed because client (4) !== server (3)` error

### 6. Train Animation — Bidirectional Engine
**File:** `src/components/animations/AnimatedTrainTrack.tsx`
- Train now has **two engines**: a forward-facing front engine and a mirrored rear engine facing backward
- Train layout: `[Rear Engine ←] — [Cart 2] — [Cart 1] — [→ Front Engine]`
- Rear engine uses `scale(-1,1)` to flip horizontally
- 10 wheel refs total, all rotating via `requestAnimationFrame`:
  - Front engine: `eW1Ref`, `eW2Ref`, `eW3Ref`
  - Rear engine: `eRearW1Ref`, `eRearW2Ref`, `eRearW3Ref`
  - Cart 1: `c1W1Ref`, `c1W2Ref`
  - Cart 2: `c2W1Ref`, `c2W2Ref`
- Animation: 4.5s travel across screen + 0.7s pause, scale 0.28, `startX=-270`, `endX=325`
- Track line is 3.5px height

### 7. Track Width
**File:** `src/components/animations/AnimatedTrainTrack.tsx`
- Slimmed track line to 3.5px

---

## Key Technical Details

### File Structure (important files)
```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page
├── components/
│   ├── animations/
│   │   └── AnimatedTrainTrack.tsx   # Train animation (bidirectional)
│   ├── layout/
│   │   └── PhoneMockupFrame.tsx     # Phone chassis + desktop wallpaper
│   └── sections/
│       ├── 02-HeroWelcome.tsx       # Hero welcome section
│       ├── 09-BlessingsWall.tsx     # Blessings/wishes wall
│       └── 11-TravelStay.tsx        # Travel & accommodation info
├── hooks/
│   └── useStorageState.ts           # Hydration-safe localStorage hook
public/
└── assets/watercolor/
    ├── desktop-ambient-wallpaper.jpg  # Desktop background
    └── royal-palace-suite.jpg         # Accommodation image
```

### Design Palette
- **Primary dark:** `#1F2921` (deep forest green)
- **Cream/background:** `#FAF3E4`
- **Gold accents:** various gold/amber tones
- **Style:** Watercolor, royal Rajasthani, botanical

### Important Notes
- Images must NOT be reused across sections — each section needs a unique image
- The app uses `"use client"` directives for interactive components
- SVG train uses raw `setAttribute` in `requestAnimationFrame` for performance (not React state)
- `useStorageState` must remain hydration-safe — never read `localStorage` during SSR

---

## Pending / Future Work

- No outstanding tasks at this time
- All changes are committed and pushed to GitHub
- TypeScript compilation passes with 0 errors
- Dev server runs successfully at http://localhost:3000

---

## How to Run

```bash
npm install
npm run dev
# → http://localhost:3000
```

## How to Deploy / Push

```bash
git add .
git commit -m "your message"
git push origin main
```

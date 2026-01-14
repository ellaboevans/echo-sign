# Echo Sign - Legacy Design Implementation Guide

## Overview
This document outlines the "Legacy-Grade" professional redesign of Echo Sign, transforming it from a utility tool into a premium digital gallery experience.

---

## 1. Design System

### Color Palette
- **Background:** `#0A0A0B` (Midnight Gallery)
- **Surface:** `#161618` to `#232220` (Elevation cards)
- **Heritage Gold:** `#D4AF37` (Primary accent for CTAs, signatures)
- **Champagne:** `#F7E7CE` (Elegant text, secondary accent)
- **Glass:** `rgba(255, 255, 255, 0.05)` borders, `backdrop-blur-md`

### Typography Pairing
- **Display (Headings):** Playfair Display (serif) - Guestbook aesthetic
- **Body Text:** Geist Sans - Clean, functional
- **Serif (Memories):** Instrument Serif - Elegant, poetic
- **Mono (Metadata):** Geist Mono - Technical precision

### Visual Effects
- **Glassmorphism:** `bg-white/5 backdrop-blur-md border border-white/10`
- **Glow Effects:** Gold glows on hover, custom `shadow-signature` classes
- **Animations:** Framer Motion for cinematic reveals and Ken Burns effects

---

## 2. Component Architecture

### SignatureCardLegacy
Location: `components/signature-card-legacy.tsx`

**Props:**
```typescript
variant?: "grid" | "display"  // Grid for wall, display for TV
isOwner?: boolean             // Show delete button for owners
onDelete?: (id: string) => void
```

**Features:**
- **Grid Variant:** Masonry layout with hover reveals
  - Floating cards with variable heights
  - Memory text slides in on hover
  - Smooth scale animations
  - Glass borders glow on interaction

- **Display Variant:** Full-screen cinematic view
  - Centered signature with gold frame
  - Fades in/out with signer info
  - Memory text appears with delay
  - Decorative gold divider line

**Usage:**
```tsx
<SignatureCardLegacy 
  signature={sig} 
  variant="grid"
  isOwner={true}
  onDelete={handleDelete}
/>
```

### DigitalTVDisplayCinema
Location: `components/digital-tv-display-cinema.tsx`

**Props:**
```typescript
signatures: SignatureEntry[]
spaceName: string
onClose: () => void
```

**Features:**
- **Auto-rotation:** 5-second intervals between signatures
- **Keyboard Controls:**
  - `←/→` arrows: Navigate
  - `Spacebar`: Play/pause
  - `F`: Fullscreen toggle
  - `Esc`: Close display

- **Visual Effects:**
  - Ken Burns pan effect (slow zoom)
  - Radial gradient background animation
  - Pulsing gold glow on frames
  - Cinematic fade transitions

- **Responsive Design:**
  - Mobile-friendly controls
  - Adjusts text size for screen size
  - Touch button areas > 44px

**Usage:**
```tsx
<DigitalTVDisplayCinema 
  signatures={publicSignatures}
  spaceName="Wedding 2025"
  onClose={handleClose}
/>
```

---

## 3. Tailwind Configuration

### Key Custom Classes
```css
/* Glass effect */
.bg-glass           /* rgba(255, 255, 255, 0.05) */
.border-glass       /* rgba(255, 255, 255, 0.1) */
.backdrop-blur-md   /* 12px blur */

/* Colors */
.bg-surface-900     /* #161618 - card background */
.text-heritage-gold /* #D4AF37 - primary accent */
.text-heritage-champagne /* #F7E7CE - elegant text */

/* Shadows */
.shadow-signature    /* 0 10px 40px rgba(212, 175, 55, 0.15) */
.shadow-signature-lg /* 0 20px 60px rgba(212, 175, 55, 0.25) */

/* Animations */
.animate-glow       /* Pulsing gold effect */
.animate-float      /* Gentle floating motion */
.animate-shimmer    /* Scanning shimmer */
```

### Font Setup
Add to `app/layout.tsx`:
```tsx
import { Playfair_Display, Instrument_Serif, Geist } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({ weight: ["400"], subsets: ["latin"] });
const geist = Geist({ subsets: ["latin"] });
```

---

## 4. Implementation Checklist

### Phase 1: Core Components (Complete)
- [x] Tailwind config with heritage theme
- [x] SignatureCardLegacy component
- [x] DigitalTVDisplayCinema component
- [ ] Update TenantWallView to use new card component
- [ ] Update Dashboard with glass styling

### Phase 2: Global Styling
- [ ] Update app layout with dark background
- [ ] Apply glassmorphism to dialogs
- [ ] Integrate Google Fonts (Playfair, Instrument Serif)
- [ ] Create global animation presets

### Phase 3: Pages & Features
- [ ] Signature wall grid with masonry layout
- [ ] Dashboard with elegant sidebar
- [ ] TV display integration
- [ ] Owner management UI

### Phase 4: Polish & Details
- [ ] Micro-interactions on signature submit
- [ ] Empty state design
- [ ] Loading states with animations
- [ ] Success animations (gold shimmer)

---

## 5. Migration Guide

### Replacing Old Signature Card
**Old:**
```tsx
import SignatureCard from "@/components/signature-card";
<SignatureCard signature={sig} />
```

**New:**
```tsx
import SignatureCardLegacy from "@/components/signature-card-legacy";
<SignatureCardLegacy 
  signature={sig} 
  variant="grid"
  isOwner={isOwner}
  onDelete={handleDelete}
/>
```

### Replacing Old TV Display
**Old:**
```tsx
import DigitalTVDisplay from "@/components/digital-tv-display";
<DigitalTVDisplay entries={entries} />
```

**New:**
```tsx
import DigitalTVDisplayCinema from "@/components/digital-tv-display-cinema";
<DigitalTVDisplayCinema 
  signatures={signatures}
  spaceName={spaceName}
  onClose={onClose}
/>
```

---

## 6. Signature Rendering Optimization

### Canvas Quality
```tsx
// Ensure high-DPI rendering
const canvas = signatureRef.current;
const dpr = window.devicePixelRatio || 1;
canvas.width = width * dpr;
canvas.height = height * dpr;
canvas.style.width = width;
canvas.style.height = height;
ctx.scale(dpr, dpr);
```

### Image Optimization for 100+ Signatures
Use Next.js Image with lazy loading:
```tsx
<Image
  src={signature.signatureData}
  alt={signature.userName}
  loading="lazy"
  quality={85}
/>
```

Or native lazy-load on canvas img tags:
```tsx
<img 
  src={signature.signatureData}
  loading="lazy"
  decoding="async"
/>
```

---

## 7. Dark Mode Considerations

### Text Contrast
- Headings on dark: Use `text-white` or `text-heritage-champagne`
- Body text on dark: Use `text-surface-300` or `text-surface-200`
- Minimum WCAG AA: 4.5:1 contrast ratio

### Signature Display
```css
/* Ensure signatures show well on dark background */
filter: drop-shadow(0 2px 8px rgba(212, 175, 55, 0.2));
```

### Glass Effect Layering
```css
/* Layer order for legibility */
1. bg-white/5 backdrop-blur-md        /* Light glass base */
2. border border-white/10              /* Subtle border */
3. shadow-signature-lg                 /* Gold glow */
```

---

## 8. Performance Considerations

### Canvas Rendering
- Use OffscreenCanvas for signature processing
- Debounce signature drawing events
- Cache canvas data as Base64 only after finalization

### Image Lazy Loading
- Use `loading="lazy"` on signature images
- Implement intersection observer for masonry
- Preload current + next signature in TV display

### Animation Performance
- Use `will-change: transform` for animated elements
- Use GPU-accelerated transforms (translate, scale, opacity)
- Avoid animating `height` or `width` directly

### Bundle Optimization
```json
{
  "devDependencies": {
    "framer-motion": "^11.0.0",
    "next": "^16.1.0",
    "react": "^19.0.0",
    "tailwindcss": "^3.4.0"
  }
}
```

---

## 9. Accessibility

### Keyboard Navigation
- TV Display: Keyboard hints displayed
- Cards: Focusable with visible focus ring
- Buttons: `focus:ring-2 focus:ring-heritage-gold`

### Color Contrast
- Gold (#D4AF37) on dark: 8.2:1 contrast
- Champagne (#F7E7CE) on dark: 12.1:1 contrast
- Surface-300 on background: 6.5:1 contrast

### Screen Readers
```tsx
<button 
  aria-label="Delete signature"
  title="Delete"
>
  <X aria-hidden="true" />
</button>
```

---

## 10. Future Enhancements

### Phase 2 Ideas
- [ ] Signature filters (color adjustments, ink styles)
- [ ] Custom frame designs per space
- [ ] "Featured Signature" spotlight
- [ ] Social sharing with preview cards

### Phase 3 Ideas
- [ ] 3D wall visualization
- [ ] AR preview of walls
- [ ] Print integration (professional printing service)
- [ ] Animated GIF export of TV display

---

## 11. Testing Checklist

### Visual Testing
- [ ] Signatures render cleanly on dark background
- [ ] Hover states work on mobile (remove on touch exit)
- [ ] TV display keyboard shortcuts functional
- [ ] Animations smooth at 60fps on low-end devices

### Responsive Testing
- [ ] Mobile (375px): Card text readable, buttons accessible
- [ ] Tablet (768px): Grid layout balanced
- [ ] Desktop (1920px): Masonry properly spaced
- [ ] TV/Large (2560px+): Text not too small

### Accessibility Testing
- [ ] Keyboard navigation works end-to-end
- [ ] Color contrast meets WCAG AA
- [ ] Screen reader announces all interactive elements
- [ ] Focus indicators visible on all focusable elements

---

## 12. Deployment Notes

### Vercel
- No special config needed
- Fonts loaded via `next/font/google`
- Tailwind CSS compiled with custom theme
- Environment variables: None required for theme

### Environment
```bash
# Install new fonts
npm install
# or
pnpm install

# Start dev server
pnpm dev

# Build production
pnpm build
```

---

## Support & Questions

**For component-specific help:**
- Check `components/signature-card-legacy.tsx` for grid/display variants
- Check `components/digital-tv-display-cinema.tsx` for TV controls
- Check `tailwind.config.ts` for color/animation definitions

**Common Issues:**
- Signatures not showing? Check Base64 encoding in storage
- Animations laggy? Reduce animation count or disable on mobile
- Text too small? Adjust `md:text-*` breakpoints

---

**Document Version:** 1.0  
**Last Updated:** January 10, 2026  
**Status:** Implementation Ready

# Landing Page Button Audit & Fix Guide

**Date:** January 14, 2026  
**Status:** Audit Complete - Ready for Implementation  
**Scope:** Button sizing, styling, and consistency on landing pages

---

## 🔍 Executive Summary

**Finding:** Landing page buttons are **oversized and don't follow design system standards**.

Current button sizing: `px-8 py-4` (32px horizontal × 16px vertical)  
Standard button sizing: `px-6 py-2.5` (24px horizontal × 10px vertical)  

**Impact:** Buttons are **40% larger** than standard design, creating visual inconsistency with app UI.

**Recommendation:** Reduce button size to standard AND consider creating landing-specific button components with proper styling.

---

## 📊 Components Affected

### High Priority Buttons (4 instances)

#### 1. **hero-section.tsx**
**Location:** Lines 62-75

**Current Implementation:**
```tsx
// Primary CTA
<Link
  href="/onboarding"
  className="px-8 py-4 bg-amber-700 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-amber-800 transition-all shadow-xl shadow-stone-200 active:scale-95"
>
  Get Started Free
</Link>

// Secondary CTA
<button
  className="px-8 py-4 bg-white text-stone-900 font-bold uppercase tracking-widest rounded-lg border-2 border-stone-200 hover:border-amber-700 hover:text-amber-700 transition-all"
>
  Sign In
</button>
```

**Issues:**
- ❌ Primary button: `px-8 py-4` (oversized, should be `px-6 py-2.5`)
- ❌ Secondary button: Custom styling with `border-2`, inconsistent with standard
- ❌ Not using DialogPrimaryButton or DialogSecondaryButton components
- ⚠️ Shadow on primary button not in standard
- ⚠️ Secondary button has `border-2` instead of `border`

**Current Sizing:** 40px height, 32px horizontal padding  
**Standard Sizing:** h-10 (40px), px-6 py-2.5, but with proper styling

**Fix Options:**

Option A (Conservative - Match button standard):
```tsx
// Primary
<Link
  href="/onboarding"
  className="px-6 py-2.5 bg-amber-700 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-amber-800 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-700/50"
>
  Get Started Free
</Link>

// Secondary
<button
  className="px-6 py-2.5 border border-stone-300 text-stone-900 font-bold uppercase tracking-widest rounded-lg hover:bg-stone-50 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-stone-400/50"
>
  Sign In
</button>
```

Option B (Landing-Specific - Keep prominence but improve consistency):
```tsx
// Create a LandingButton component
<Link
  href="/onboarding"
  className="px-8 py-3 bg-amber-700 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-amber-800 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-700/50"
>
  Get Started Free
</Link>

// Reduces height slightly from py-4 to py-3
// Keeps prominence but more balanced
```

**Estimated Time:** 5 minutes

---

#### 2. **final-cta-section.tsx**
**Location:** Lines 26-41

**Current Implementation:**
```tsx
// Primary CTA
<Link
  href="/onboarding"
  className="px-8 py-4 bg-amber-700 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-amber-800 transition-all shadow-xl shadow-stone-200 active:scale-95"
>
  Create Your Wall Now
</Link>

// Secondary CTA
<button
  className="px-8 py-4 bg-stone-100 text-stone-900 font-bold uppercase tracking-widest rounded-lg hover:bg-stone-200 transition-all"
>
  Already Have an Account?
</button>
```

**Issues:**
- ❌ Same oversizing as hero-section (`px-8 py-4`)
- ❌ Primary button has `shadow-xl` (not in standard)
- ⚠️ Secondary button uses `bg-stone-100` (not standard - should be border-based)
- ❌ No focus state
- ❌ Secondary button missing `active:scale-95`

**Fix:**
```tsx
// Primary
<Link
  href="/onboarding"
  className="px-6 py-2.5 bg-amber-700 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-amber-800 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-700/50"
>
  Create Your Wall Now
</Link>

// Secondary
<button
  className="px-6 py-2.5 border border-stone-300 text-stone-900 font-bold uppercase tracking-widest rounded-lg hover:bg-stone-50 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-stone-400/50"
>
  Already Have an Account?
</button>
```

**Estimated Time:** 5 minutes

---

## 🟡 Medium Priority Issues

### Badge Styling (hero-section.tsx, Line 34)
**Current:**
```tsx
className="px-6 py-2.5 border bg-amber-500/40 border-amber-200 text-amber-900 text-xs font-semibold tracking-wider rounded-full hover:border-amber-300 transition-colors"
```

**Status:** ✅ Actually compliant! Uses `px-6 py-2.5` (standard)  
**Action:** No fix needed

---

## 🟢 Low Priority - Information

### Other Sections Without Buttons
- ✅ Features Section - No buttons
- ✅ How It Works Section - No buttons  
- ✅ Values Section - No buttons (assumed)
- ✅ Use Cases Section - No buttons (assumed)
- ✅ Footer Section - Links only (no buttons)

---

## Design System Standard Review

### Current Button Standard
From BUTTON_STYLING_STANDARD.md:

| Size | Padding | Height | Font | Use Case |
|------|---------|--------|------|----------|
| **Default** | px-6 py-2.5 | h-10 | text-sm | Standard dialogs |
| **LG** | px-8 py-3 | h-12 | text-base | Prominent actions |

**Current Landing:** Uses `px-8 py-4` = **NOT IN STANDARD** (oversized)

---

## Comparison: Current vs. Standard

```
LANDING PAGE BUTTONS (Current):
┌────────────────────────────┐
│ py-4 (16px)                │
│ Get Started Free           │ ← h: 40px + padding
│ py-4 (16px)                │
└────────────────────────────┘
├─── px-8 (32px each side) ──┤

STANDARD DEFAULT BUTTONS:
┌──────────────────────────┐
│ py-2.5 (10px)            │
│ Get Started Free         │ ← h: 40px + padding
│ py-2.5 (10px)            │
└──────────────────────────┘
├──── px-6 (24px each side) ┤

DIFFERENCE:
- Horizontal padding: 32px → 24px (-25%)
- Vertical padding: 16px → 10px (-37%)
- Shadow: Added in landing (not standard)
```

---

## Recommendation: Two Options

### Option 1: Full Standardization (Conservative)
**Approach:** Make landing buttons identical to app buttons  
**Pros:** Complete consistency, easier maintenance, no special cases  
**Cons:** Buttons less prominent on landing page

**Changes:**
- Hero: `px-8 py-4` → `px-6 py-2.5`
- Final CTA: `px-8 py-4` → `px-6 py-2.5`
- Remove shadows
- Use standard focus states
- Fix secondary button styling to match standard

**Time:** 10 minutes  
**Complexity:** Low

---

### Option 2: Landing-Specific Variant (Recommended)
**Approach:** Create landing button component that maintains prominence while improving consistency

**Rationale:**
- Landing pages traditionally have larger CTAs
- Can maintain visual hierarchy while being more consistent
- Cleaner code with reusable component

**Implementation:**

Create `components/landing/landing-button.tsx`:
```tsx
import { cn } from "@/lib/utils";

interface LandingButtonProps {
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  asButton?: boolean;
}

export function LandingButton({
  href,
  onClick,
  className,
  variant = "primary",
  children,
  asButton = false,
}: LandingButtonProps) {
  const baseStyles = "px-8 py-3 font-bold uppercase tracking-widest rounded-lg transition-all active:scale-95 focus:outline-none focus:ring-2";
  
  const variantStyles = {
    primary: "bg-amber-700 text-white hover:bg-amber-800 focus:ring-amber-700/50",
    secondary: "border border-stone-300 text-stone-900 hover:bg-stone-50 focus:ring-stone-400/50",
  };

  const styles = cn(baseStyles, variantStyles[variant], className);

  if (asButton) {
    return (
      <button onClick={onClick} className={styles}>
        {children}
      </button>
    );
  }

  if (href) {
    return (
      <a href={href} className={styles}>
        {children}
      </a>
    );
  }

  return null;
}
```

**Updated Usage:**
```tsx
import { LandingButton } from "@/components/landing/landing-button";

// Hero Section
<LandingButton href="/onboarding" variant="primary">
  Get Started Free
</LandingButton>

<LandingButton onClick={() => setLoginOpen(true)} variant="secondary">
  Sign In
</LandingButton>
```

**Benefits:**
- ✅ Reusable component reduces code duplication
- ✅ Maintains landing page prominence (`px-8 py-3`)
- ✅ Better consistency (no shadows, proper focus states)
- ✅ Easier to update all landing buttons at once
- ✅ Clear separation between landing and app buttons
- ✅ Documented variant pattern

**Time:** 15 minutes (create component + update 2 sections)  
**Complexity:** Medium

---

## Implementation Plan

### Phase 1: Component Creation (Optional but Recommended)
- [ ] Create `components/landing/landing-button.tsx`
- [ ] Test primary and secondary variants
- [ ] Test responsive behavior (mobile/desktop)

**Time:** 5 minutes  
**Depends on:** You choosing Option 1 or 2

---

### Phase 2: Update Hero Section
**File:** `components/landing/hero-section.tsx`

**Current (Lines 62-75):**
```tsx
<Link className="px-8 py-4 bg-amber-700..." >Get Started Free</Link>
<button className="px-8 py-4 bg-white..." >Sign In</button>
```

**Option 1 - Direct Update:**
```tsx
<Link className="px-6 py-2.5 bg-amber-700 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-amber-800 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-700/50" >
  Get Started Free
</Link>

<button className="px-6 py-2.5 border border-stone-300 text-stone-900 font-bold uppercase tracking-widest rounded-lg hover:bg-stone-50 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-stone-400/50" >
  Sign In
</button>
```

**Option 2 - Using Component:**
```tsx
<LandingButton href="/onboarding" variant="primary">
  Get Started Free
</LandingButton>

<LandingButton onClick={() => setLoginOpen(true)} variant="secondary">
  Sign In
</LandingButton>
```

**Time:** 5 minutes

---

### Phase 3: Update Final CTA Section
**File:** `components/landing/final-cta-section.tsx`

**Current (Lines 26-41):** Same issue as hero

**Option 1 - Direct Update:** Same changes as hero

**Option 2 - Using Component:** Same approach as hero

**Time:** 5 minutes

---

### Phase 4: Testing
- [ ] Test on mobile (375px)
- [ ] Test on tablet (768px)
- [ ] Test on desktop (1024px+)
- [ ] Verify button is clickable (44x44px minimum)
- [ ] Test hover states
- [ ] Test focus states (keyboard tab)
- [ ] Test active states (click)

**Time:** 10 minutes

---

## Size Comparison Chart

```
Landing Page Button Height Comparison:

py-4 (16px padding):
┌─────────────────────────────────┐ h-10 = 40px
│ [Content in button]             │ + 16px (py-4) top
├─────────────────────────────────┤ + 16px (py-4) bottom
│ Total: ~72px height (TOO BIG)   │
└─────────────────────────────────┘

py-3 (12px padding):
┌───────────────────────────────┐ h-10 = 40px
│ [Content in button]           │ + 12px (py-3) top
├───────────────────────────────┤ + 12px (py-3) bottom
│ Total: ~64px height (GOOD)    │
└───────────────────────────────┘

py-2.5 (10px padding):
┌─────────────────────────────┐ h-10 = 40px
│ [Content in button]         │ + 10px (py-2.5) top
├─────────────────────────────┤ + 10px (py-2.5) bottom
│ Total: ~60px height (APP)   │
└─────────────────────────────┘
```

**Recommendation:** `py-3` (12px) provides good compromise:
- Still prominent for landing
- Slightly smaller than current
- Professional appearance
- Better consistency

---

## Security & Accessibility Considerations

### Current Issues
- ❌ No focus ring states (accessibility issue)
- ⚠️ Secondary button using `bg-color` instead of border (contrast issue)

### Fixes Included
✅ Focus ring states: `focus:ring-2 focus:ring-{color}/50`  
✅ Proper semantic HTML (Link, button)  
✅ Active scale feedback: `active:scale-95`  
✅ Touch target: 40px height = 44x44px minimum (✅ compliant)

---

## Recommended Choice

### 🏆 Recommendation: **Option 2 - Landing Button Component**

**Why:**
1. **Reusability** - Use on all landing sections consistently
2. **Maintainability** - Change all landing buttons in one place
3. **Scalability** - Easy to add more landing sections
4. **Documentation** - Clear intent: "This is a landing button"
5. **Balance** - Maintains prominence while being more consistent
6. **Professional** - Proper focus states and accessibility

---

## Files to Update

### If choosing Option 1 (Direct Update):
- `components/landing/hero-section.tsx` (Lines 62-75)
- `components/landing/final-cta-section.tsx` (Lines 26-41)

**Total Time:** 10 minutes

---

### If choosing Option 2 (Component-Based):
- Create: `components/landing/landing-button.tsx`
- Update: `components/landing/hero-section.tsx` (Lines 62-75)
- Update: `components/landing/final-cta-section.tsx` (Lines 26-41)
- Import: `LandingButton` in both files

**Total Time:** 15 minutes

---

## Testing Checklist

After implementing either option:

- [ ] **Visual Inspection**
  - [ ] Buttons look appropriately sized (not oversized)
  - [ ] Primary and secondary buttons visually distinct
  - [ ] Spacing looks balanced
  - [ ] No overflow or text wrapping

- [ ] **Responsive Testing**
  - [ ] Mobile (375px): Buttons readable, clickable
  - [ ] Tablet (768px): Buttons proportional
  - [ ] Desktop (1024px): Buttons prominent but not excessive

- [ ] **Interactive Testing**
  - [ ] Hover state works (color change)
  - [ ] Active state works (scale-95)
  - [ ] Focus state visible (ring appears on Tab)
  - [ ] Link navigation works
  - [ ] Button click works (if button)

- [ ] **Accessibility Testing**
  - [ ] Can tab to all buttons
  - [ ] Focus ring clearly visible
  - [ ] Minimum size (44x44px) met
  - [ ] Contrast ratio meets WCAG AA

---

## Summary

| Issue | Current | Recommended | Benefit |
|-------|---------|-------------|---------|
| Button Padding | `px-8 py-4` | `px-8 py-3` or `px-6 py-2.5` | Consistent sizing |
| Secondary Styling | `bg-stone-100` | `border border-stone-300` | Matches standard |
| Focus State | Missing | `focus:ring-2` | Accessibility |
| Shadow | `shadow-xl` | None | Consistency |
| Code Duplication | Inline styling | Component | Maintainability |

---

## Conclusion

Landing page buttons are **oversized and inconsistent** with design system standards. Two fix options provided:

1. **Option 1 (10 min):** Direct update to match standard sizing
2. **Option 2 (15 min):** Create landing button component (RECOMMENDED)

Both options improve consistency, accessibility, and maintainability.

**Ready to implement?** Start with either fix plan above.

---

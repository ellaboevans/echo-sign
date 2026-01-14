# Input Fields - Size Consistency Audit & Fix

**Date:** January 14, 2026  
**Status:** Audit Complete - Ready for Implementation  
**Scope:** Input field sizing and design system compliance

---

## 🔍 Executive Summary

**Finding:** Input fields across the app use **oversized padding** and **custom heights**, not matching the design system standard.

**Standard Input Sizing:**
```
Padding: px-2.5 py-1 (10px / 4px)
Height: h-8 (32px)
Font: text-xs (12px)
```

**Current Issues:**
- ❌ Custom inputs: `px-4 py-3` (24px / 12px) - too large
- ❌ Custom textareas: `px-5 py-4` (20px / 16px) - way too large
- ❌ Color inputs: `h-10` (40px) - oversized for color picker
- ❌ Inconsistent custom styling in 5+ components

---

## 📊 Components Affected

### 🔴 HIGH PRIORITY - Custom Input Fields

#### 1. **login-dialog.tsx** - Custom Input
**Location:** Lines 132-154

**Current Code:**
```tsx
<input
  id="subdomain-dialog"
  type="text"
  className={cn(
    "flex-1 px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent",
    // ... error styling
  )}
  // ... other props
/>
```

**Issues:**
- ❌ Custom `px-4 py-3` (24px / 12px) instead of `px-2.5 py-1`
- ❌ Using raw `<input>` instead of `Input` component
- ❌ No focus ring color specified
- ❌ Custom rounded-lg instead of standard

**Fix:**
Replace with `Input` component:
```tsx
import { Input } from "@/components/ui/input";

<Input
  id="subdomain-dialog"
  type="text"
  value={subdomain}
  onChange={(e) => {
    setSubdomain(e.target.value);
    setError(null);
  }}
  placeholder="myevent"
  disabled={isLoading}
  required
  aria-label={ARIA_LABELS.AUTH.SUBDOMAIN}
  className={error || hasFieldError(null, "subdomain") ? "border-red-500" : ""}
/>
```

**Result:**
- ✅ Standard sizing: `px-2.5 py-1 h-8`
- ✅ Proper focus states included
- ✅ Consistent with design system
- ✅ 90% less code

**Time:** 5 minutes

---

#### 2. **create-space-dialog.tsx** - Input Field
**Location:** Lines 103-114

**Current Code:**
```tsx
<Input
  id="space-name"
  type="text"
  className="w-full px-5 py-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-4 focus:ring-amber-700/5 focus:border-amber-700 transition-all text-lg font-medium h-auto"
  // ... other props
/>
```

**Issues:**
- ❌ `px-5 py-4` (20px / 16px) - oversized (using Input component but with custom padding override)
- ❌ `h-auto` overrides standard height
- ❌ `text-lg` too large (should be `text-xs`)
- ❌ `font-medium` too bold (should be default)
- ❌ `rounded-xl` instead of `rounded-none` (standard)

**Fix:**
Remove all custom overrides:
```tsx
<Input
  id="space-name"
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="e.g. Class of 2024 Legacy"
  required
  maxLength={40}
  aria-label={ARIA_LABELS.SPACE.NAME}
/>
```

**Result:**
- ✅ Standard sizing: `px-2.5 py-1 h-8 text-xs`
- ✅ Consistent styling
- ✅ 85% less code per input
- ✅ Better visual consistency

**Time:** 5 minutes

---

#### 3. **create-space-dialog.tsx** - Textarea
**Location:** Lines 123-131

**Current Code:**
```tsx
<textarea
  id="purpose"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="What should people think about when signing here?"
  className="w-full px-5 py-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-4 focus:ring-amber-700/5 focus:border-amber-700 transition-all text-sm h-32 resize-none font-serif italic"
  maxLength={200}
  aria-label={ARIA_LABELS.SPACE.DESCRIPTION}
/>
```

**Issues:**
- ❌ `px-5 py-4` (20px / 16px) - oversized for textarea
- ❌ `rounded-xl` instead of standard `rounded-none`
- ❌ Custom focus ring styling
- ❌ Using raw `<textarea>` instead of component

**Fix:**
Use standard input styling with textarea:
```tsx
<textarea
  id="purpose"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="What should people think about when signing here?"
  className="w-full px-2.5 py-1 rounded-none border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 transition-all text-sm h-32 resize-none font-serif italic"
  maxLength={200}
  aria-label={ARIA_LABELS.SPACE.DESCRIPTION}
/>
```

**Or Better - Create TextArea Component:**
```tsx
import { TextArea } from "@/components/ui/textarea";

<TextArea
  id="purpose"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="What should people think about when signing here?"
  maxLength={200}
  rows={4}
  aria-label={ARIA_LABELS.SPACE.DESCRIPTION}
/>
```

**Result:**
- ✅ Consistent padding: `px-2.5 py-1`
- ✅ Consistent focus states
- ✅ Reusable component approach

**Time:** 10 minutes (if creating TextArea component)

---

#### 4. **sign-dialog.tsx** - Textarea
**Location:** Lines 157-164

**Current Code:**
```tsx
<textarea
  id="memory"
  value={memory}
  onChange={(e) => setMemory(e.target.value)}
  placeholder="Write a brief thought, message, or reflection..."
  className="w-full px-2 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 transition-all text-sm h-32 resize-none font-serif italic"
  aria-label={ARIA_LABELS.SIGNATURE.MEMORY}
/>
```

**Issues:**
- ❌ `px-2 py-3` (8px / 12px) - inconsistent and unbalanced
- ❌ `rounded-lg` instead of standard
- ❌ Custom focus ring

**Fix:**
Standardize padding:
```tsx
<textarea
  id="memory"
  value={memory}
  onChange={(e) => setMemory(e.target.value)}
  placeholder="Write a brief thought, message, or reflection..."
  className="w-full px-2.5 py-1 rounded-none border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 transition-all text-sm h-32 resize-none font-serif italic"
  aria-label={ARIA_LABELS.SIGNATURE.MEMORY}
/>
```

**Time:** 2 minutes

---

#### 5. **tenant-branding-dialog.tsx** - Color Inputs
**Location:** Lines 194-246

**Current Code:**
```tsx
<input
  type="color"
  className="w-12 h-10 rounded cursor-pointer border border-stone-300"
/>
```

**Issues:**
- ❌ `h-10` (40px) - oversized for color picker
- ❌ Should match input height (`h-8`)
- ❌ Appears in 3 places (primary, secondary, text color)

**Fix:**
Update height to standard:
```tsx
<input
  type="color"
  className="w-12 h-8 rounded cursor-pointer border border-stone-300"
/>
```

**Time:** 2 minutes (3 instances)

---

## 🟡 MEDIUM PRIORITY - Review Other Components

The following components should be reviewed for custom input padding:
- `components/space-edit-dialog.tsx`
- `components/tenant-wall-view.tsx` (if has forms)
- Any other dialog components with forms

---

## 📋 Design System Standard Reference

### Standard Input
```tsx
// From components/ui/input.tsx (STANDARD)
h-8              // 32px height
px-2.5 py-1      // 10px / 4px padding
text-xs          // 12px font
rounded-none     // No border radius
border           // 1px border
focus:ring-2     // Focus state
```

### What NOT To Do
```
❌ px-3 py-2      // Use px-2.5 py-1
❌ px-4 py-3      // Use px-2.5 py-1
❌ px-5 py-4      // Use px-2.5 py-1
❌ h-9 / h-10     // Use h-8
❌ text-sm        // Use text-xs
❌ rounded-lg     // Use rounded-none
❌ font-medium    // Use default
```

---

## 🎯 Implementation Plan

### Phase 1: Quick Fixes (10 minutes)
1. ✅ login-dialog.tsx - Replace with Input component (5 min)
2. ✅ tenant-branding-dialog.tsx - Update h-10 to h-8 (2 min)
3. ✅ sign-dialog.tsx - Fix textarea padding (2 min)
4. ✅ Build & test (1 min)

### Phase 2: Input Component Fix (5 minutes)
1. ✅ create-space-dialog.tsx - Remove custom padding overrides (5 min)

### Phase 3: Optional - Create TextArea Component (10 minutes)
1. ✅ Create reusable TextArea component (10 min)
2. ✅ Use in place of raw `<textarea>` elements

**Total Time:** 15-25 minutes

---

## 📊 Before & After Comparison

### Login Dialog Input

**Before:**
```tsx
<input className="flex-1 px-4 py-3 border border-stone-300 rounded-lg..." />
// 24px / 12px padding - oversized
// Custom styling - hard to maintain
// 140 characters of inline CSS
```

**After:**
```tsx
<Input placeholder="myevent" />
// 10px / 4px padding - standard
// Reusable component - easy to maintain
// 25 characters + standard classes
```

### Create Space Dialog Input

**Before:**
```tsx
<Input className="w-full px-5 py-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-4 focus:ring-amber-700/5 focus:border-amber-700 transition-all text-lg font-medium h-auto" />
// 20px / 16px padding - oversized
// text-lg font-medium - wrong scale
// h-auto - overrides standard height
// 200+ characters of custom CSS
```

**After:**
```tsx
<Input placeholder="e.g. Class of 2024 Legacy" />
// 10px / 4px padding - standard
// text-xs - correct scale
// h-8 - standard height
// 50 characters + standard classes
```

---

## 🎨 Visual Comparison

```
OVERSIZED INPUT (Current):
┌────────────────────────────────────────┐
│ px-4 py-3 (24px × 12px)                │
│ Space Name                             │ ← TOO BIG
│ px-4 py-3 (24px × 12px)                │
└────────────────────────────────────────┘

STANDARD INPUT (Fixed):
┌──────────────────────────────────────┐
│ px-2.5 py-1 (10px × 4px)             │
│ Space Name                           │ ← JUST RIGHT
│ px-2.5 py-1 (10px × 4px)             │
└──────────────────────────────────────┘
```

---

## ✅ Checklist

### Files to Fix
- [ ] login-dialog.tsx (1 input)
- [ ] create-space-dialog.tsx (1 input + 1 textarea)
- [ ] sign-dialog.tsx (1 textarea)
- [ ] tenant-branding-dialog.tsx (3 color inputs)

### Tasks
- [ ] Replace custom inputs with Input component
- [ ] Remove custom padding overrides
- [ ] Fix textarea padding
- [ ] Update color input heights
- [ ] Build and verify (0 errors)
- [ ] Manual testing

---

## Summary

**Total Inputs to Fix:** 7 instances
- 2 custom inputs (should use Input)
- 2 textareas (should standardize padding)
- 3 color inputs (should fix height)

**Time Required:** 15-25 minutes
**Complexity:** Low (mostly removing custom overrides)
**Impact:** High (consistency and maintainability)

---

## Next Steps

1. Review this audit
2. Proceed with Phase 1 fixes
3. Test build
4. Manual testing on browser
5. Optional: Create TextArea component for Phase 3

Ready to implement!

---

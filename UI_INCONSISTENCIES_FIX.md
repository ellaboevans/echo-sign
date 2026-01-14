# UI Inconsistencies - Fixing Guide

## Issues Found

### 1. **Font Class Typo**
- **File:** `components/featured-memory.tsx:55`
- **Issue:** `font-serifs` (extra 's') doesn't exist in Tailwind config
- **Fix:** Change to `font-serif`

### 2. **Canvas Color Scheme Mismatch**
- **File:** `components/signature-canvas.tsx:54-65`
- **Issue:** Uses hardcoded `bg-gray-50`, `border-gray-200` instead of theme tokens
- **Fix:** Use `bg-surface-50`, `border-surface-200` to match Heritage Dark theme

### 3. **Raw Button vs Themed Button in DialogTrigger**
- **File:** `components/sign-dialog.tsx:96`
- **Issue:** Uses raw inline styles instead of Button component
- **Fix:** Replace with themed `Button` component

### 4. **Legacy Component Duplication**
- **Files:** 
  - `components/signature-card.tsx` (new)
  - `components/signature-card-legacy.tsx` (old)
- **Issue:** Two versions of same component
- **Action:** Remove legacy version once new one is confirmed working

### 5. **Inconsistent Dialog Button Styling**
- Multiple dialogs use different button patterns
- Need standardized dialog action buttons

### 6. **Missing Component Exports**
- Some components imported but not properly typed

## Priority Fixes

1. ✅ Font typo (quick win)
2. ✅ Canvas colors (quick win)
3. ✅ DialogTrigger button styling
4. ✅ Clean up legacy components
5. ✅ Standardize dialog button patterns

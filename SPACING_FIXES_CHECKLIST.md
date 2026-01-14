# Spacing Consistency Fixes - Implementation Checklist

**Date Started:** January 14, 2026  
**Status:** Ready for Implementation  
**Total Effort:** ~2.6 hours (158 minutes)

---

## Phase 1: High-Impact Quick Wins (30 min)

### 1. featured-memory.tsx ⏳
**Current Issues:**
- Line 51: `p-8 md:p-12` (should be `p-6 md:p-8`)
- Line 75: `p-8 md:p-16` (should be `p-6 md:p-8`)
- Line 52: Badge `px-3 py-1` (should be `px-2.5 py-1`)

**Changes:**
```diff
- className="p-8 md:p-12 flex flex-col justify-center"
+ className="p-6 md:p-8 flex flex-col justify-center"

- className="p-8 md:p-16 flex items-center justify-center"
+ className="p-6 md:p-8 flex items-center justify-center"

- className="px-3 py-1 bg-amber-600/20"
+ className="px-2.5 py-1 bg-amber-600/20"
```

**Estimated Time:** 5 minutes
- [ ] Apply changes
- [ ] Test responsive (mobile, tablet, desktop)
- [ ] Visual verification
- [ ] Commit

---

### 2. signature-card.tsx ⏳
**Current Issues:**
- Line 55: Main container `p-6` (should be `p-4`)
- Line 78: Overlay `p-6` (should be `p-4`)

**Changes:**
```diff
- className="flex flex-col h-full p-6"
+ className="flex flex-col h-full p-4"

- className="p-6 flex items-center justify-center"
+ className="p-4 flex items-center justify-center"
```

**Estimated Time:** 3 minutes
- [ ] Apply changes
- [ ] Verify aspect ratio doesn't break
- [ ] Test hover overlay
- [ ] Commit

---

### 3. login-dialog.tsx ⏳
**Current Issues:**
- Line 132-147: Custom input padding `px-4 py-3` (should be standard Input)
- Line 123: Form uses `space-y-4` (should use FieldSet with `gap-4`)
- Line 122: Wrapper `py-4` (redundant with DialogContent `p-4`)

**Changes:**
```diff
Replace custom form with:
<DialogContent className="sm:max-w-md bg-white">
  <DialogHeader>
    <DialogTitle className="...">Welcome Back</DialogTitle>
    <DialogDescription>...</DialogDescription>
  </DialogHeader>
  
  <FieldSet className="gap-4">
    <Field>
      <FieldLabel htmlFor="subdomain">Your Subdomain</FieldLabel>
      <FieldContent className="gap-0.5">
        <div className="flex items-center gap-2">
          <Input
            id="subdomain"
            type="text"
            value={subdomain}
            onChange={...}
            placeholder="myevent"
            disabled={isLoading}
            required
          />
          <span className="text-sm text-stone-500">.echosign.io</span>
        </div>
        {error && (
          <FieldError>{error}</FieldError>
        )}
      </FieldContent>
    </Field>
  </FieldSet>
  
  <DialogButtonGroup justify="end" gap="normal" className="pt-4">
    <DialogFullWidthButton type="submit" disabled={isLoading}>
      Login
    </DialogFullWidthButton>
  </DialogButtonGroup>
  
  <div className="text-center text-sm text-stone-600">
    Don't have an account?{" "}
    <Link href="/onboarding">Create one now</Link>
  </div>
</DialogContent>
```

**Estimated Time:** 15 minutes
- [ ] Refactor to use standard components
- [ ] Update imports (FieldSet, Field, FieldContent, FieldError)
- [ ] Test form validation
- [ ] Test loading state
- [ ] Verify responsive design
- [ ] Test error display
- [ ] Commit

---

## Phase 2: Dialog Standardization (90 min)

### 4. create-space-dialog.tsx ⏳
**Current Issues:** Need detailed review
- Verify input padding
- Check FieldSet usage
- Verify button group spacing

**Steps:**
1. [ ] Audit current padding values
2. [ ] Document findings
3. [ ] Update inputs to use standard Input component
4. [ ] Replace custom form spacing with FieldSet/Field
5. [ ] Verify button group has `gap-3 pt-4`
6. [ ] Test responsive design
7. [ ] Commit

**Estimated Time:** 15 minutes

---

### 5. space-edit-dialog.tsx ⏳
**Current Issues:** Need detailed review
- Verify dialog padding `p-4`
- Check form field spacing
- Verify button spacing

**Steps:**
1. [ ] Audit current spacing
2. [ ] Ensure DialogContent has `p-4 gap-4`
3. [ ] Verify FieldSet usage with `gap-4`
4. [ ] Verify button group spacing
5. [ ] Test form validation
6. [ ] Test responsive design
7. [ ] Commit

**Estimated Time:** 10 minutes

---

### 6. sign-dialog.tsx ⏳
**Current Issues:** Need detailed review
- Canvas padding
- Form spacing
- Button spacing

**Steps:**
1. [ ] Audit current spacing
2. [ ] Verify dialog padding
3. [ ] Check form field spacing
4. [ ] Verify button group spacing
5. [ ] Test canvas sizing
6. [ ] Test responsive design
7. [ ] Commit

**Estimated Time:** 10 minutes

---

### 7. delete-entry-dialog.tsx ⏳
**Current Issues:** Need verification
- Likely small dialog with button spacing

**Steps:**
1. [ ] Audit current spacing
2. [ ] Verify button group has `gap-3 pt-4`
3. [ ] Confirm standard dialog padding
4. [ ] Test responsive design
5. [ ] Commit

**Estimated Time:** 5 minutes

---

### 8. delete-space-dialog.tsx ⏳
**Current Issues:** Need verification
- Likely small dialog with button spacing

**Steps:**
1. [ ] Audit current spacing
2. [ ] Verify button group has `gap-3 pt-4`
3. [ ] Confirm standard dialog padding
4. [ ] Test responsive design
5. [ ] Commit

**Estimated Time:** 5 minutes

---

### 9. tenant-branding-dialog.tsx ⏳
**Current Issues:** Complex dialog, detailed review needed
- Multiple form sections
- Custom spacing likely

**Steps:**
1. [ ] Detailed audit of all padding
2. [ ] Document all custom values
3. [ ] Update inputs to standard Input component
4. [ ] Replace custom spacing with FieldSet/Field
5. [ ] Verify section spacing
6. [ ] Verify button group spacing
7. [ ] Test form validation
8. [ ] Test responsive design
9. [ ] Commit

**Estimated Time:** 20 minutes

---

## Phase 3: Page Components (55 min)

### 10. landing/hero-section.tsx ⏳
**Current Issues:**
- Custom button styling (should use DialogButton)
- Verify section padding responsive

**Steps:**
1. [ ] Audit current padding
2. [ ] Replace custom button styles with DialogButton component
3. [ ] Verify responsive breakpoints
4. [ ] Update section padding to standard
5. [ ] Test responsive design
6. [ ] Commit

**Estimated Time:** 10 minutes

---

### 11. landing/features-section.tsx ⏳
**Current Issues:**
- `py-24` too large (should be `py-12 md:py-16 lg:py-20`)
- Feature cards `p-8` (should be `p-4 md:p-6`)

**Changes:**
```diff
- className="py-24 px-4"
+ className="py-12 px-4 md:py-16 md:px-6 lg:py-20 lg:px-8"

- className="p-8"
+ className="p-4 md:p-6"
```

**Estimated Time:** 5 minutes
- [ ] Apply changes
- [ ] Test responsive design
- [ ] Verify visual spacing
- [ ] Commit

---

### 12. tenant-wall-view.tsx ⏳
**Current Issues:**
- Section padding inconsistent
- Card padding `p-6` (should be `p-4`)
- Mixed padding values

**Changes:**
```diff
// Section padding
- className="px-4 py-12"
+ className="px-4 py-8 md:px-6 md:py-10"

// Card padding
- className="p-6"
+ className="p-4"
```

**Steps:**
1. [ ] Audit all padding values
2. [ ] Update section padding responsive
3. [ ] Update card padding to `p-4`
4. [ ] Verify grid spacing `gap-4`
5. [ ] Test responsive design
6. [ ] Commit

**Estimated Time:** 15 minutes

---

### 13. dashboard/analytics/page.tsx ⏳
**Current Issues:**
- `pt-6` overrides (should use standard `p-4`)
- Verify grid spacing

**Changes:**
```diff
- className="p-4 pt-6"
+ className="p-4"
```

**Steps:**
1. [ ] Find all `pt-6` overrides
2. [ ] Remove overrides, use standard `p-4`
3. [ ] Verify grid spacing `gap-4`
4. [ ] Test responsive design
5. [ ] Commit

**Estimated Time:** 10 minutes

---

### 14. Audit Remaining Landing Pages ⏳
**Scope:** Check other landing components for consistency

**Steps:**
1. [ ] List all landing page components
2. [ ] Audit each for spacing consistency
3. [ ] Fix any major deviations
4. [ ] Commit

**Estimated Time:** 15 minutes

---

## Phase 4: Testing & QA (30 min)

### Visual Regression Testing
- [ ] Test featured-memory.tsx on mobile/tablet/desktop
- [ ] Test signature-card.tsx on all breakpoints
- [ ] Test login-dialog.tsx responsive form
- [ ] Test all dialog components at mobile width
- [ ] Test featured memory badge visibility
- [ ] Test button sizing in dialogs

**Estimated Time:** 15 minutes

---

### Manual QA Checklist

**Desktop (lg:)**
- [ ] Featured memory spacing correct
- [ ] Cards have consistent padding
- [ ] Section spacing generous (px-8 py-12)
- [ ] No overflow or cutoff

**Tablet (md:)**
- [ ] Forms display correctly
- [ ] Padding scales appropriately
- [ ] Buttons stack/align properly
- [ ] Touch targets 44x44px minimum

**Mobile (base)**
- [ ] Full-width containers work
- [ ] Form fields readable
- [ ] Buttons clickable (44x44px)
- [ ] No horizontal scroll
- [ ] Text doesn't overflow

**Checklist:**
- [ ] All components render without errors
- [ ] No console warnings
- [ ] Layout breaks only at intended breakpoints
- [ ] Buttons properly spaced in groups
- [ ] Forms display correctly
- [ ] Images scale appropriately
- [ ] No unexpected white space

**Estimated Time:** 15 minutes

---

## Phase 5: Documentation (10 min)

### Update Documentation
- [ ] Add implemented components to "✅ Components Following Standard" list
- [ ] Update any exceptions documentation
- [ ] Add PR reference links
- [ ] Share implementation summary with team

**Estimated Time:** 10 minutes

---

## Summary

| Phase | Components | Time | Status |
|-------|-----------|------|--------|
| 1 | featured-memory, signature-card, login-dialog | 30 min | ⏳ |
| 2 | 6 dialog components | 60 min | ⏳ |
| 3 | 4 page/section components | 55 min | ⏳ |
| 4 | Testing & QA | 30 min | ⏳ |
| 5 | Documentation | 10 min | ⏳ |
| **TOTAL** | **13+ components** | **~2.6 hrs** | **⏳** |

---

## Notes for Implementation

### Before You Start
1. Create a feature branch: `feat/spacing-consistency`
2. Keep changes focused per component
3. Test each component before moving to next
4. Reference SPACING_CONSISTENCY_AUDIT.md for specific line numbers

### During Implementation
1. Use SPACING_QUICK_REFERENCE.md for copy-paste patterns
2. Test responsive design frequently
3. Use browser DevTools to verify breakpoints
4. Check console for warnings/errors

### After Each Component
1. Test on mobile/tablet/desktop
2. Verify no layout breaks
3. Commit with descriptive message: `fix: spacing consistency in {component}`

### Example Commit Messages
```
fix: spacing consistency in featured-memory.tsx
- Updated padding from p-8 md:p-12 md:p-16 to p-6 md:p-8
- Standardized badge padding to px-2.5 py-1
- Tested responsive design on all breakpoints

fix: spacing consistency in signature-card.tsx
- Updated container padding from p-6 to p-4
- Updated overlay padding to p-4
- Verified hover animation works correctly

fix: spacing consistency in login-dialog.tsx
- Refactored form to use standard FieldSet + Field components
- Updated input to use standard Input component
- Verified form validation and error display
- Tested responsive design
```

---

## Quick Reference During Implementation

### Most Common Fixes
```
p-6  → p-4              (Cards, containers)
p-8  → p-4 or p-6       (Large sections)
p-12, p-16 → p-6 md:p-8 (Featured components)
space-y-4 → gap-4       (Form spacing)
px-4 py-3 → px-2.5 py-1 (Inputs)
```

### Testing Commands
```bash
# Check responsive at different widths
# Mobile: 375px
# Tablet: 768px  
# Desktop: 1024px+

# Use Firefox DevTools or Chrome DevTools:
# F12 → Toggle responsive design mode → Test widths
```

---

## Progress Tracking

### Phase 1 Progress
- [ ] featured-memory.tsx - 0% → 100%
- [ ] signature-card.tsx - 0% → 100%
- [ ] login-dialog.tsx - 0% → 100%

### Phase 2 Progress
- [ ] create-space-dialog.tsx - 0% → 100%
- [ ] space-edit-dialog.tsx - 0% → 100%
- [ ] sign-dialog.tsx - 0% → 100%
- [ ] delete-entry-dialog.tsx - 0% → 100%
- [ ] delete-space-dialog.tsx - 0% → 100%
- [ ] tenant-branding-dialog.tsx - 0% → 100%

### Phase 3 Progress
- [ ] landing/hero-section.tsx - 0% → 100%
- [ ] landing/features-section.tsx - 0% → 100%
- [ ] tenant-wall-view.tsx - 0% → 100%
- [ ] dashboard/analytics/page.tsx - 0% → 100%
- [ ] Other landing pages - 0% → 100%

### Phase 4 Progress
- [ ] Visual regression testing - 0% → 100%
- [ ] Manual QA - 0% → 100%

### Phase 5 Progress
- [ ] Documentation updates - 0% → 100%

---

## Resources

**Standards Reference:**
- SPACING_QUICK_REFERENCE.md - Copy-paste patterns
- SPACING_AND_PADDING_STANDARD.md - Full spec
- SPACING_VISUAL_GUIDE.md - Diagrams
- SPACING_CONSISTENCY_AUDIT.md - Specific fixes

**Tools:**
- Browser DevTools (F12) - Responsive testing
- VS Code - Find & Replace for bulk changes
- Git - Version control

---

## Questions During Implementation?

1. **Spacing question?** → SPACING_QUICK_REFERENCE.md
2. **Need a pattern?** → SPACING_VISUAL_GUIDE.md
3. **Understanding why?** → SPACING_AND_PADDING_STANDARD.md
4. **Can't find your component?** → SPACING_CONSISTENCY_AUDIT.md
5. **Quick overview?** → CONSISTENCY_IMPLEMENTATION_SUMMARY.md

---

## Sign-Off

✅ Checklist created and ready  
✅ All guidance documents in place  
✅ Effort estimates defined  
✅ Ready to implement

**Next Step:** Begin Phase 1 implementation!

---

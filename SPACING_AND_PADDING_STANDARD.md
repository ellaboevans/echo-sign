# Spacing & Padding Consistency Standard - Echo Sign

**Date:** January 14, 2026  
**Status:** ✅ Establishing Design System  
**Purpose:** Ensure consistent spacing, padding, gaps, and layout across all components

---

## 1. Spacing Scale

Based on Tailwind's default spacing scale (4px increment):

| Name | Value | Tailwind Class | Use Case |
|------|-------|---|----------|
| **XS** | 2px | `px-0.5 py-0.5` | Tightest spacing (rare) |
| **SM** | 4px | `px-1 py-1` | Icon padding, minimal gaps |
| **MD** | 8px | `px-2 py-2` | Default field padding, small gaps |
| **LG** | 12px | `px-3 py-3` / `gap-3` | **Standard gap between elements** |
| **XL** | 16px | `px-4 py-4` / `gap-4` | **Primary internal padding** |
| **2XL** | 24px | `px-6 py-6` | Large sections, prominent spacing |
| **3XL** | 32px | `px-8 py-8` | Outer container padding |

**KEY STANDARDS:**
- **gap-4** (16px) = Default gap between form fields, cards, sections
- **p-4** (16px) = Default padding inside cards, dialogs, containers
- **gap-3** (12px) = Spacing within button groups, tight layouts
- **px-2.5 py-1** (10px / 4px) = Default input padding

---

## 2. Dialog & Container Padding

### DialogContent (Modal)
```tsx
// Current: p-4 (16px on all sides)
<DialogPrimitive.Popup
  className="...p-4 gap-4..."
/>
```

**Standards:**
- **Outer padding:** `p-4` (16px)
- **Internal gaps:** `gap-4` (16px between sections)
- **Max width:** `max-w-[calc(100%-2rem)]` (leaves 16px margin on mobile)
- **Responsive:** Gap remains consistent across breakpoints

### Dialog Sections

| Section | Padding | Gap | Notes |
|---------|---------|-----|-------|
| **DialogContent** | `p-4` | `gap-4` | All dialogs |
| **DialogHeader** | None (inherited) | `gap-1` | Title + description |
| **DialogFooter** | None (inherited) | `gap-2` (mobile), `gap-2` (desktop) | Button container |
| **Form Fields** | Via FieldGroup | `gap-4` | Consistent field spacing |

### Card Components
```tsx
// Current Standards
<Card size="default">
  <CardHeader className="px-4 py-4 gap-4">
    // Title + description
  </CardHeader>
  <CardContent className="px-4 py-4 gap-4">
    // Content
  </CardContent>
  <CardFooter className="p-4 gap-3">
    // Actions
  </CardFooter>
</Card>
```

| Size | Padding | Gap | Use Case |
|------|---------|-----|----------|
| **default** | `py-4 px-4` | `gap-4` | Standard cards |
| **sm** | `py-3 px-3` | `gap-2` | Compact cards |

---

## 3. Form Field Spacing

### FieldSet (Field Container)
```tsx
<FieldSet className="gap-4 has-[>[data-slot=checkbox-group]]:gap-3">
  // Standard gap between form fields
</FieldSet>
```

**Standards:**
- **Default gap:** `gap-4` (16px) between all form fields
- **Checkbox/Radio groups:** `gap-3` (12px) within groups

### Field (Individual Field)
```tsx
<Field className="gap-2">
  <FieldLabel>Label</FieldLabel>
  <FieldContent className="gap-0.5">
    <Input />
    <FieldDescription />
  </FieldContent>
</Field>
```

| Component | Spacing | Purpose |
|-----------|---------|---------|
| **Field** (vertical) | `gap-2` (8px) | Label to input |
| **FieldContent** | `gap-0.5` (2px) | Input to description |
| **FieldGroup** | `gap-5` (20px) | Between field groups |

### Input Padding
```tsx
className="px-2.5 py-1 h-8 text-xs"
```

**Standards:**
- **Horizontal:** `px-2.5` (10px)
- **Vertical:** `py-1` (4px)
- **Height:** `h-8` (32px) minimum
- **Text size:** `text-xs` (12px)

---

## 4. Button & Action Spacing

### Button Padding (Dialog Buttons)

| Button Type | Padding | Height | Font | Use Case |
|------------|---------|--------|------|----------|
| **Primary/Destructive** | `px-6 py-2.5` | `h-10` | `text-sm` | Main actions |
| **Secondary** | `px-6 py-2` | `h-10` | `text-sm` | Cancel/alternative |
| **Small** | `px-4 py-1.5` | `h-8` | `text-xs` | Compact spaces |
| **Full Width** | `w-full px-6 py-3` | `h-10` | `text-sm` | Dialog primary |
| **Ghost** | `px-3 py-1.5` | Auto | `text-xs` | Text-only actions |

### Button Group Spacing
```tsx
<DialogButtonGroup gap="normal">
  <DialogSecondaryButton>Cancel</DialogSecondaryButton>
  <DialogPrimaryButton>Save</DialogPrimaryButton>
</DialogButtonGroup>
```

**Standards:**
- **Gap between buttons:** `gap-3` (12px)
- **Top padding:** `pt-4` (16px) from content
- **Justification:** `justify-end` (right-aligned)
- **Responsive:** Stack vertically on mobile (`flex-col-reverse`), side-by-side on desktop

---

## 5. Grid & Layout Spacing

### Signature Grid (Homepage)
```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
```

**Standards:**
- **Mobile:** 1 column
- **Tablet (md):** 2 columns
- **Desktop (lg):** 3 columns
- **Gap:** `gap-4` (16px) between cards

### Section Margins
```tsx
<section className="px-4 py-8 md:px-8 md:py-12">
```

| Breakpoint | Padding X | Padding Y | Use Case |
|-----------|-----------|-----------|----------|
| **Mobile (base)** | `px-4` (16px) | `py-8` (32px) | Default |
| **Tablet (md)** | `px-6` (24px) | `py-10` (40px) | Medium screens |
| **Desktop (lg)** | `px-8` (32px) | `py-12` (48px) | Large screens |

---

## 6. Component-Specific Spacing

### Signature Card
```tsx
<Card size="default">
  <CardHeader className="px-4 gap-2">
    {/* Signature image - no padding top */}
  </CardHeader>
  <CardContent className="px-4 py-2 gap-3">
    {/* Memory text, username, date */}
  </CardContent>
  <CardFooter className="p-4 gap-2">
    {/* Delete action */}
  </CardFooter>
</Card>
```

**Standards:**
- **Header:** `px-4 gap-2`, no `py` (image bleed)
- **Content:** `px-4 py-2 gap-3`
- **Footer:** `p-4 gap-2`

### Featured Memory
```tsx
<div className="px-6 py-6 gap-4">
  {/* Title, memory, attribution */}
</div>
```

**Standards:**
- **Padding:** `px-6 py-6` (24px)
- **Internal gap:** `gap-4` (16px)
- **Highlight styling** with background and border

### Dialog Buttons (LoginDialog)
```tsx
<DialogContent className="p-4 gap-4">
  <DialogHeader className="gap-1">
    <DialogTitle>Welcome</DialogTitle>
    <DialogDescription>Sign in to continue</DialogDescription>
  </DialogHeader>
  <FieldSet className="gap-4">
    {/* Form fields */}
  </FieldSet>
  <DialogFullWidthButton type="submit" className="pt-2">
    Login
  </DialogFullWidthButton>
</DialogContent>
```

**Standards:**
- **Dialog padding:** `p-4`
- **Header gap:** `gap-1`
- **Form gap:** `gap-4`
- **Button spacing:** `pt-2` (8px top margin before button)

---

## 7. Responsive Spacing Rules

### Mobile First
```tsx
// Base (mobile) - tight spacing
className="px-4 py-4 gap-3"

// Medium screens - moderate spacing
className="px-4 py-4 gap-3 md:px-6 md:py-6 md:gap-4"

// Large screens - generous spacing
className="px-4 py-4 gap-3 md:px-6 md:py-6 md:gap-4 lg:px-8 lg:py-8 lg:gap-5"
```

### Dialog Responsive
```tsx
// Dialog content
className="...max-w-[calc(100%-2rem)] sm:max-w-sm p-4 gap-4..."

// Button groups on mobile
className="flex flex-col-reverse gap-2 sm:flex-row sm:gap-3"
```

**Standards:**
- **Mobile padding:** `p-4` (16px)
- **Desktop padding:** Increase to `p-6` or `p-8` for larger screens
- **Gap scaling:** `gap-3` (mobile) → `gap-4` (desktop)
- **Button groups:** Stack vertically on mobile, horizontal on desktop

---

## 8. Border & Separator Spacing

### Separator Lines
```tsx
className="border-t border-stone-300 mt-4 pt-4"
```

**Standards:**
- **Top margin:** `mt-4` (16px)
- **Top padding:** `pt-4` (16px)
- **Total visual gap:** 32px around separator

### Card Borders
```tsx
<CardFooter className="border-t p-4">
  {/* Footer content */}
</CardFooter>
```

**Standards:**
- **Border:** Top border only
- **Padding:** `p-4` (16px)

---

## 9. Text & Line Height Spacing

### Paragraph Spacing
```tsx
className="text-sm/relaxed gap-2"
```

| Size | Line Height | Gap Below | Use Case |
|------|------------|-----------|----------|
| **xs** | `text-xs/relaxed` | `mb-2` | Labels, descriptions |
| **sm** | `text-sm/relaxed` | `mb-3` | Body text |
| **base** | `text-base/relaxed` | `mb-4` | Large text |

**Standards:**
- **Line height:** `/relaxed` (1.625) for better readability
- **Margin below:** `mb-2` (8px) for xs, `mb-3` for sm, `mb-4` for base
- **Gap between paragraphs:** `gap-3` or `gap-4` in flex containers

---

## 10. Consistency Checklist

### When Creating New Components

- [ ] **Base padding:** Use `p-4` for dialogs, `px-4 py-4` for sections
- [ ] **Internal gaps:** Use `gap-4` for most spacing, `gap-3` for tight layouts
- [ ] **Form fields:** Spacing between fields = `gap-4`
- [ ] **Button groups:** Gap = `gap-3`, top margin = `pt-4`
- [ ] **Cards:** Padding = `p-4`, gaps = `gap-4` (or `gap-2` for compact)
- [ ] **Inputs:** Padding = `px-2.5 py-1`, height = `h-8`
- [ ] **Responsive:** Mobile-first, scale up at breakpoints
- [ ] **Borders:** Separators with `mt-4 pt-4` for visual balance
- [ ] **Typography:** Use `/relaxed` line height, consistent `mb-*` margins

### When Reviewing Components

- [ ] Are all padding values from the scale (XS, SM, MD, LG, XL, 2XL)?
- [ ] Are gaps consistent throughout?
- [ ] Are buttons properly spaced in groups?
- [ ] Is form field spacing uniform?
- [ ] Are dialogs using `p-4 gap-4`?
- [ ] Are responsive breakpoints applied?
- [ ] Does it match existing similar components?

---

## 11. Common Patterns

### Form Dialog
```tsx
<DialogContent className="p-4 gap-4">
  <DialogHeader className="gap-1">
    <DialogTitle>Title</DialogTitle>
    <DialogDescription>Description</DialogDescription>
  </DialogHeader>
  
  <FieldSet className="gap-4">
    <Field>
      <FieldLabel>Label</FieldLabel>
      <FieldContent className="gap-0.5">
        <Input />
        <FieldDescription>Help text</FieldDescription>
      </FieldContent>
    </Field>
  </FieldSet>
  
  <DialogFooter className="gap-2 pt-4">
    <DialogSecondaryButton>Cancel</DialogSecondaryButton>
    <DialogPrimaryButton type="submit">Save</DialogPrimaryButton>
  </DialogFooter>
</DialogContent>
```

### Content Grid
```tsx
<section className="px-4 py-8 md:px-6 md:py-10">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {items.map((item) => (
      <Card key={item.id} size="default">
        {/* Content */}
      </Card>
    ))}
  </div>
</section>
```

### Compact List
```tsx
<FieldSet className="gap-3">
  {items.map((item) => (
    <div key={item.id} className="flex items-center gap-2 p-2">
      {/* Content */}
    </div>
  ))}
</FieldSet>
```

---

## 12. Files to Update

### Priority 1 (Core Components)
- [ ] `components/ui/dialog.tsx` - Ensure `p-4 gap-4`
- [ ] `components/ui/card.tsx` - Verify `px-4` and `gap-4`
- [ ] `components/ui/field.tsx` - Check `gap-4` between fields, `gap-2` within field
- [ ] `components/ui/dialog-buttons.tsx` - Gap spacing in button groups

### Priority 2 (Dialogs)
- [ ] `components/login-dialog.tsx`
- [ ] `components/create-space-dialog.tsx`
- [ ] `components/space-edit-dialog.tsx`
- [ ] `components/sign-dialog.tsx`
- [ ] `components/delete-entry-dialog.tsx`
- [ ] `components/delete-space-dialog.tsx`

### Priority 3 (Feature Components)
- [ ] `components/signature-card.tsx`
- [ ] `components/featured-memory.tsx`
- [ ] `components/sign-wall-dialog.tsx`

### Priority 4 (Containers)
- [ ] `app/page.tsx` - Section padding, grid gaps
- [ ] `components/landing/*` - Consistent section spacing

---

## 13. Implementation Steps

1. **Create spacing tokens file** (optional, for maintainability)
2. **Audit existing components** - Map current padding/spacing
3. **Identify inconsistencies** - List deviations from standard
4. **Update components** - Apply consistent spacing
5. **Test responsiveness** - Verify mobile, tablet, desktop layouts
6. **Document decisions** - Update this file with any exceptions

---

## 14. Exceptions & Special Cases

### Cases Where Standards May Vary

| Component | Exception | Reason |
|-----------|-----------|--------|
| **Icon buttons** | `p-1` or `p-2` | Small icon size |
| **Badges** | `px-2 py-1` | Compact elements |
| **Toast/Alert** | `px-4 py-3` | Quick visual scanning |
| **Avatars** | No padding | Self-contained |

---

## Summary

✅ **Spacing Scale:** `gap-4` and `p-4` are primary units (16px)  
✅ **Dialogs:** Always `p-4 gap-4`  
✅ **Cards:** `p-4` with `gap-4` inside  
✅ **Forms:** `gap-4` between fields, `gap-2` within fields  
✅ **Buttons:** `gap-3` in groups, `pt-4` top margin  
✅ **Responsive:** Mobile-first, scale up at breakpoints  
✅ **Consistency:** Use this standard for all new and updated components

---

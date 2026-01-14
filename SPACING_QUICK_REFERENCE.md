# Spacing Quick Reference - Echo Sign

**Quick lookup for consistent padding & spacing across the app.**

---

## TL;DR - Core Standards

| Component | Padding | Gap | Example |
|-----------|---------|-----|---------|
| **Dialog** | `p-4` | `gap-4` | `<DialogContent className="p-4 gap-4">` |
| **Card** | `p-4` | `gap-4` | `<Card><CardContent className="p-4">` |
| **Section** (mobile) | `px-4 py-8` | - | `<section className="px-4 py-8">` |
| **Section** (desktop) | `px-6 py-10` | - | `<section className="md:px-6 md:py-10">` |
| **Form fields** | - | `gap-4` | `<FieldSet className="gap-4">` |
| **Inputs** | `px-2.5 py-1` | - | `<Input className="px-2.5 py-1">` |
| **Button group** | - | `gap-3` | `<DialogButtonGroup gap="normal">` |
| **Grid cards** | - | `gap-4` | `<div className="grid gap-4">` |

---

## Component Snippets

### Creating a Dialog Form
```tsx
<DialogContent className="p-4 gap-4">
  <DialogHeader className="gap-1">
    <DialogTitle>Title</DialogTitle>
    <DialogDescription>Subtitle</DialogDescription>
  </DialogHeader>
  
  <FieldSet className="gap-4">
    <Field>
      <FieldLabel>Label</FieldLabel>
      <FieldContent className="gap-0.5">
        <Input /> {/* Already has px-2.5 py-1 */}
        <FieldDescription>Help text</FieldDescription>
      </FieldContent>
    </Field>
  </FieldSet>
  
  <DialogButtonGroup justify="end" gap="normal">
    <DialogSecondaryButton>Cancel</DialogSecondaryButton>
    <DialogPrimaryButton type="submit">Save</DialogPrimaryButton>
  </DialogButtonGroup>
</DialogContent>
```

### Creating a Card Container
```tsx
<Card size="default">
  <CardHeader className="px-4 gap-2">
    <CardTitle>Title</CardTitle>
    <CardDescription>Subtitle</CardDescription>
  </CardHeader>
  <CardContent className="px-4 py-4 gap-3">
    {/* Content */}
  </CardContent>
  <CardFooter className="p-4 gap-3">
    {/* Actions */}
  </CardFooter>
</Card>
```

### Creating a Section with Grid
```tsx
<section className="px-4 py-8 md:px-6 md:py-10 lg:px-8 lg:py-12">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {items.map((item) => (
      <Card key={item.id}>
        {/* Card content */}
      </Card>
    ))}
  </div>
</section>
```

---

## Spacing Scale Quick Reference

```
2px   = px-0.5 py-0.5   (XS - rare)
4px   = px-1 py-1       (SM - compact)
8px   = px-2 py-2       (MD - default field)
12px  = px-3 py-3       (LG - gap-3, buttons)
16px  = px-4 py-4       (XL - PRIMARY, gap-4)
24px  = px-6 py-6       (2XL - large)
32px  = px-8 py-8       (3XL - outer)
```

**Remember:** `gap-4` (16px) and `p-4` (16px) are the defaults.

---

## Responsive Breakpoints

### Tailwind Breakpoints Used
- **sm:** 640px (mobile landscape, large phone)
- **md:** 768px (tablet)
- **lg:** 1024px (desktop)

### Standard Scaling
```
Mobile     → md:     → lg:
px-4       → md:px-6 → lg:px-8
py-8       → md:py-10 → lg:py-12
gap-3      → md:gap-4 → lg:gap-4
```

### Example Responsive Class
```tsx
className="px-4 py-8 md:px-6 md:py-10 lg:px-8 lg:py-12 gap-3 md:gap-4"
```

---

## Common Deviations & Exceptions

### Acceptable Exceptions

| Case | Padding | Reason | Example |
|------|---------|--------|---------|
| **Compact buttons** | `px-3 py-1` | Small icon spaces | Small button |
| **Badges** | `px-2.5 py-1` | Status indicators | Featured Memory badge |
| **Avatar container** | No padding | Self-contained | User avatar |
| **Toast/Alert** | `px-4 py-3` | Quick scanning | Notification |

### DO NOT Use (Common Mistakes)

❌ `p-6 md:p-12 md:p-16` - Excessive, inconsistent jumps  
❌ `px-4 py-3` for inputs - Use standard Input component  
❌ `space-y-4` in forms - Use FieldSet with `gap-4`  
❌ `py-20`, `py-24` for sections - Use `py-8 md:py-10 lg:py-12`  
❌ Custom button padding - Use DialogButton components  

---

## Checklist: When Adding a New Component

- [ ] Using existing components (Card, Dialog, Input)?
  - If yes: Padding is already standard ✅
  - If no: Add to the ones below ↓
  
- [ ] Dialog component?
  - Outer container: `p-4 gap-4`
  - Header: `gap-1`
  - Form: `gap-4` between fields
  - Footer buttons: `gap-3`, `pt-4`

- [ ] Card component?
  - Use Card + CardContent
  - Padding: `p-4` automatically applied
  - Gap: Use `gap-4` inside CardContent

- [ ] Form fields?
  - Use FieldSet + Field components
  - FieldSet: `gap-4`
  - Field: `gap-2`
  - FieldContent: `gap-0.5`

- [ ] Section/page container?
  - Mobile: `px-4 py-8`
  - Tablet: `md:px-6 md:py-10`
  - Desktop: `lg:px-8 lg:py-12`

- [ ] Grid of items?
  - Gap: `gap-4`
  - Columns: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

---

## Files with Standard Padding

✅ **Already using correct spacing:**
- `components/ui/card.tsx` - `p-4`
- `components/ui/dialog.tsx` - `p-4 gap-4`
- `components/ui/field.tsx` - `gap-4` between fields
- `components/ui/input.tsx` - `px-2.5 py-1 h-8`
- `components/ui/dialog-buttons.tsx` - button sizing

⚠️ **Need to verify/update:**
- `components/login-dialog.tsx`
- `components/create-space-dialog.tsx`
- `components/featured-memory.tsx`
- `components/signature-card.tsx`
- `components/landing/*`
- Landing pages

---

## Visual Reference

### Dialog Interior Spacing
```
┌─────────────────────────────┐
│  p-4  Padding on all sides  │
│  ┌────────────────────────┐ │
│  │ DialogHeader           │ │
│  │ gap-1 between title   │ │
│  └────────────────────────┘ │
│                             │ gap-4
│  ┌────────────────────────┐ │
│  │ FieldSet gap-4         │ │
│  │ [Input 1]  gap-2 block │ │
│  │ [Input 2]  gap-2 block │ │
│  └────────────────────────┘ │
│                             │ gap-4
│  ┌────────────────────────┐ │
│  │ pt-4                   │ │
│  │ [Cancel] gap-3 [Save] │ │
│  └────────────────────────┘ │
└─────────────────────────────┘
```

### Card Interior Spacing
```
┌────────────────────────────┐
│  px-4  CardHeader          │
│  ┌──────────────────────┐  │
│  │ Title gap-2 Subtext  │  │
│  └──────────────────────┘  │
├────────────────────────────┤
│  px-4 py-4                 │
│  CardContent gap-4         │
│  [Content]                 │
├────────────────────────────┤
│  p-4 CardFooter            │
│  [Footer content]          │
└────────────────────────────┘
```

### Section Interior Spacing
```
Mobile:          Tablet:          Desktop:
px-4 py-8        md:px-6 md:py-10 lg:px-8 lg:py-12

┌──────────────┐  ┌────────────────┐  ┌──────────────────┐
│px-4  Content │  │md:px-6 Content │  │lg:px-8 Content   │
│ py-8         │  │ md:py-10       │  │ lg:py-12         │
│              │  │                │  │                  │
│              │  │                │  │                  │
└──────────────┘  └────────────────┘  └──────────────────┘
```

---

## Migration Path (For Existing Components)

### If you find custom padding:

**Before:**
```tsx
<div className="p-6 gap-5">
  <input className="px-4 py-3" />
</div>
```

**After:**
```tsx
<FieldSet className="gap-4">
  <Field>
    <FieldLabel>Label</FieldLabel>
    <FieldContent className="gap-0.5">
      <Input /> {/* Already has px-2.5 py-1 */}
    </FieldContent>
  </Field>
</FieldSet>
```

---

## Questions?

Refer to:
1. **Full Guide:** `SPACING_AND_PADDING_STANDARD.md`
2. **Audit Details:** `SPACING_CONSISTENCY_AUDIT.md`
3. **Button Standard:** `BUTTON_STYLING_STANDARD.md`

---

## Last Updated
- **Date:** January 14, 2026
- **Status:** Reference guide for new standard
- **Applies to:** All new components and updates

---

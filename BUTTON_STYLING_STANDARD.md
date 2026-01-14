# Button Styling Standard - Echo Sign

**Date:** January 14, 2026  
**Status:** ✅ Implemented and Standardized

---

## Overview

All buttons across dialogs and the application have been standardized for consistent styling, sizing, colors, and interactive states.

---

## Color Palette

### Primary (Amber/Gold - Call to Action)
- **Base:** `bg-amber-700`
- **Hover:** `hover:bg-amber-800`
- **Text:** `text-white`
- **Ring (Focus):** `focus:ring-amber-700/50`
- **Usage:** Submit, Login, Save, Create, Confirm

### Secondary (Stone/Gray - Alternative Actions)
- **Base:** `border border-stone-300`
- **Hover:** `hover:bg-stone-50`
- **Text:** `text-stone-900`
- **Ring (Focus):** `focus:ring-stone-400/50`
- **Usage:** Cancel, Skip, Close, Back

### Destructive (Red - Dangerous Actions)
- **Base:** `bg-red-600`
- **Hover:** `hover:bg-red-700`
- **Text:** `text-white`
- **Ring (Focus):** `focus:ring-red-600/50`
- **Usage:** Delete, Logout, Remove, Confirm Dangerous

---

## Button Sizes

| Size | Padding | Height | Text | Use Case |
|------|---------|--------|------|----------|
| **XS** | px-3 py-1 | h-6 | text-xs | Compact spaces |
| **SM** | px-4 py-2 | h-8 | text-sm | Secondary actions |
| **Default** | px-6 py-2.5 | h-10 | text-sm | Standard dialogs |
| **MD** | px-6 py-2.5 | h-10 | text-sm | Most common |
| **LG** | px-8 py-3 | h-12 | text-base | Prominent actions |
| **Full** | w-full px-6 py-3 | h-10 | text-sm | Full width |

---

## Button Components

### 1. DialogPrimaryButton
**Purpose:** Main call-to-action buttons (Submit, Save, Login, Create)

**Properties:**
- Color: Amber/Gold
- Text: Bold, Uppercase
- Size: Default (px-6 py-2.5)
- Loading support
- Disabled state

**Usage:**
```tsx
<DialogPrimaryButton
  onClick={() => handleSubmit()}
  disabled={isLoading}
  isLoading={isLoading}
  type="submit"
>
  Submit
</DialogPrimaryButton>
```

### 2. DialogSecondaryButton
**Purpose:** Alternative/Cancel actions

**Properties:**
- Color: Stone/Gray with border
- Text: Medium weight
- Size: Default (px-6 py-2)
- No loading state

**Usage:**
```tsx
<DialogSecondaryButton
  onClick={() => handleCancel()}
  disabled={isSubmitting}
>
  Cancel
</DialogSecondaryButton>
```

### 3. DialogDestructiveButton
**Purpose:** Dangerous actions (Delete, Logout, Remove)

**Properties:**
- Color: Red
- Text: Bold, Uppercase
- Size: Default (px-6 py-2.5)
- Loading support
- Warning visual weight

**Usage:**
```tsx
<DialogDestructiveButton
  onClick={() => handleDelete()}
  disabled={isLoading}
  isLoading={isLoading}
>
  Delete
</DialogDestructiveButton>
```

### 4. DialogFullWidthButton
**Purpose:** Single CTA or main action buttons in dialogs

**Properties:**
- Color: Amber/Gold
- Width: Full (w-full)
- Size: Large (px-6 py-3)
- Loading support

**Usage:**
```tsx
<DialogFullWidthButton
  type="submit"
  disabled={isLoading}
  isLoading={isLoading}
>
  Login
</DialogFullWidthButton>
```

### 5. DialogGhostButton
**Purpose:** Minimal, subtle actions

**Properties:**
- No background
- Text only
- Subtle hover
- Small emphasis

**Usage:**
```tsx
<DialogGhostButton
  onClick={() => handleAction()}
>
  Learn More
</DialogGhostButton>
```

### 6. DialogOutlineButton
**Purpose:** Alternative action with accent color

**Properties:**
- Border: Amber
- Text: Amber
- Hover: Light amber background

**Usage:**
```tsx
<DialogOutlineButton
  onClick={() => handleAlternative()}
>
  More Options
</DialogOutlineButton>
```

### 7. DialogSmallButton
**Purpose:** Compact space buttons

**Properties:**
- Smaller padding (px-4 py-1.5)
- Smaller text (text-xs)
- Variants: primary, secondary, destructive

**Usage:**
```tsx
<DialogSmallButton
  variant="secondary"
  onClick={() => handleReset()}
>
  Reset
</DialogSmallButton>
```

### 8. DialogButtonGroup
**Purpose:** Container for button groups with proper spacing

**Properties:**
- Flex layout
- Customizable justification
- Gap spacing options
- PT padding for form spacing

**Usage:**
```tsx
<DialogButtonGroup justify="end" gap="normal">
  <DialogSecondaryButton onClick={handleCancel}>
    Cancel
  </DialogSecondaryButton>
  <DialogPrimaryButton type="submit">
    Save
  </DialogPrimaryButton>
</DialogButtonGroup>
```

---

## Interactive States

### Hover State
- Color deepens by 50-100
- Example: `bg-amber-700` → `hover:bg-amber-800`

### Active/Pressed State
- Scale slightly down: `active:scale-95`
- Provides visual feedback

### Focus State
- Ring appears: `focus:ring-2 focus:ring-{color}/50`
- Keyboard navigation support

### Disabled State
- Opacity reduced: `disabled:opacity-50`
- Cursor changes: `disabled:cursor-not-allowed`
- No hover/active effects

### Loading State
- Button disabled
- Text changes (optional)
- Opacity reduced slightly

---

## Spacing & Layout

### Dialog Button Layout
```
┌─────────────────────────────┐
│  Dialog Content             │
│                             │
├─────────────────────────────┤
│  [Cancel]      [Submit]     │ ← pt-4, gap-3
└─────────────────────────────┘
```

### Multi-Button Groups
- Justified to end: `justify-end`
- Gap between buttons: `gap-3` (12px)
- Padding top: `pt-4` (16px)

---

## Typography

### Button Text
- **Case:** Uppercase for primary/destructive
- **Weight:** Bold for primary/destructive, Medium for secondary
- **Tracking:** Widest (`tracking-widest`) for primary/destructive
- **Font:** Sans-serif (default)

### Loading Text
- Changes to indicate action
- Examples:
  - "Creating..." → "Create Space"
  - "Logging out..." → "Logout"
  - "Saving..." → "Save Changes"

---

## Complete Button Classes Reference

### Primary Button
```tsx
px-6 py-2.5 bg-amber-700 text-white font-bold uppercase tracking-widest 
rounded-lg hover:bg-amber-800 active:scale-95 
focus:outline-none focus:ring-2 focus:ring-amber-700/50 
disabled:opacity-50 disabled:cursor-not-allowed 
transition-all duration-200
```

### Secondary Button
```tsx
px-6 py-2 border border-stone-300 text-stone-900 font-medium rounded-lg 
hover:bg-stone-50 active:scale-95 
focus:outline-none focus:ring-2 focus:ring-stone-400/50 
disabled:opacity-50 disabled:cursor-not-allowed 
transition-all duration-200
```

### Destructive Button
```tsx
px-6 py-2.5 bg-red-600 text-white font-bold uppercase tracking-widest 
rounded-lg hover:bg-red-700 active:scale-95 
focus:outline-none focus:ring-2 focus:ring-red-600/50 
disabled:opacity-50 disabled:cursor-not-allowed 
transition-all duration-200
```

---

## Updated Dialogs

All dialogs have been standardized with new button components:

1. **login-dialog.tsx**
   - Full width primary button for login

2. **create-space-dialog.tsx**
   - Secondary (Cancel) + Primary (Create) button group

3. **space-edit-dialog.tsx**
   - Secondary (Cancel) + Primary (Save) button group

4. **logout-confirmation-dialog.tsx**
   - Secondary (Cancel) + Destructive (Logout) button group

5. **signature-canvas.tsx**
   - Small secondary (Reset) + Full width primary (Preserve Signature)

---

## Best Practices

### Button Naming
- Use action verbs: Submit, Save, Delete, Create, Login, Logout
- Be clear and concise
- Match the action performed

### Button Order
- Secondary (Cancel/Back) on the left
- Primary (Submit/Save/Create) on the right
- In destructive dialogs: Secondary (Cancel) then Destructive (Delete)

### Button States
- Always provide loading state for async operations
- Disable buttons during submission
- Clear loading indication in button text

### Accessibility
- Use proper semantic HTML (`<button>` or `<input type="submit">`)
- Provide `aria-label` for icon-only buttons
- Ensure proper focus states
- Test with keyboard navigation

### Mobile Responsiveness
- Buttons remain clickable on small screens (44x44px minimum)
- Full width for single column layouts
- Side-by-side for wider screens with `gap-3`

---

## Files Changed

### New Files
- `lib/button-styles.ts` - Comprehensive button styling reference
- `components/ui/dialog-buttons.tsx` - Reusable button components

### Modified Files
- `components/login-dialog.tsx`
- `components/create-space-dialog.tsx`
- `components/space-edit-dialog.tsx`
- `components/logout-confirmation-dialog.tsx`
- `components/signature-canvas.tsx`

---

## Migration Guide

### Before (Custom inline styles)
```tsx
<button
  className="px-6 py-2 bg-amber-700 text-white font-bold uppercase..."
  onClick={handleSubmit}
>
  Submit
</button>
```

### After (Standardized component)
```tsx
<DialogPrimaryButton
  onClick={handleSubmit}
  type="submit"
>
  Submit
</DialogPrimaryButton>
```

---

## Testing Checklist

- [ ] All buttons render with correct colors
- [ ] Hover states work on all button types
- [ ] Focus states visible (ring) on keyboard navigation
- [ ] Active/pressed state (scale) works
- [ ] Disabled state shows opacity reduction
- [ ] Loading state disables interaction
- [ ] Button text is clear and actionable
- [ ] Buttons properly sized for their container
- [ ] Button groups have proper spacing
- [ ] Mobile responsive (min 44x44px)
- [ ] Keyboard navigation works (Tab, Enter)
- [ ] Screen reader announces button purpose

---

## Summary

✅ **All buttons standardized**  
✅ **Consistent colors, sizes, and states**  
✅ **Reusable components created**  
✅ **Build successful (0 errors)**  
✅ **Ready for deployment**

---


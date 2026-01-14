# Spacing Visual Guide - Echo Sign

**Visual reference for all spacing and padding patterns used in Echo Sign.**

---

## Dialog Anatomy

```
┌─────────────────────────────────────────────┐
│  p-4 (16px) padding on all sides            │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ DialogHeader                        │   │
│  │ gap-1 (4px) between title & desc   │   │
│  │                                     │   │
│  │ Title                               │   │
│  │ Description subtitle                │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  gap-4 (16px)                              │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ FieldSet gap-4 (16px between)       │   │
│  │                                     │   │
│  │ ┌───────────────────────────────┐  │   │
│  │ │ Field gap-2                   │  │   │
│  │ │ ┌─────────────────────────────┐│  │   │
│  │ │ │ Label                       ││  │   │
│  │ │ └─────────────────────────────┘│  │   │
│  │ │ gap-2                           │  │   │
│  │ │ ┌─────────────────────────────┐│  │   │
│  │ │ │ Input px-2.5 py-1 h-8       ││  │   │
│  │ │ └─────────────────────────────┘│  │   │
│  │ │ gap-0.5                         │  │   │
│  │ │ ┌─────────────────────────────┐│  │   │
│  │ │ │ Help text (optional)        ││  │   │
│  │ │ └─────────────────────────────┘│  │   │
│  │ └───────────────────────────────┘  │   │
│  │                                     │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  gap-4 (16px)                              │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ DialogButtonGroup                   │   │
│  │ pt-4 (16px) top padding             │   │
│  │ gap-3 (12px) between buttons        │   │
│  │                                     │   │
│  │                  [Cancel] [Save]    │   │
│  └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Card Anatomy

```
┌────────────────────────────────────────┐
│ py-4 px-4 CardHeader                   │
│ gap-2 (8px between items)              │
│                                        │
│ ┌──────────────────────────────────┐  │
│ │ Title                            │  │
│ │ (4px gap)                        │  │
│ │ Description subtitle             │  │
│ └──────────────────────────────────┘  │
├────────────────────────────────────────┤
│ py-4 px-4 CardContent                  │
│ gap-4 (16px between items)             │
│                                        │
│ ┌──────────────────────────────────┐  │
│ │ Content Block 1                  │  │
│ └──────────────────────────────────┘  │
│                                        │
│ ┌──────────────────────────────────┐  │
│ │ Content Block 2                  │  │
│ └──────────────────────────────────┘  │
│                                        │
└────────────────────────────────────────┘
```

OR with footer:

```
┌────────────────────────────────────────┐
│ py-4 px-4 CardHeader                   │
├────────────────────────────────────────┤
│ py-4 px-4 CardContent                  │
├────────────────────────────────────────┤
│ p-4 CardFooter                         │
│ gap-3 (12px between items)             │
│                                        │
│                          [Delete]      │
│                                        │
└────────────────────────────────────────┘
```

---

## Signature Card (Example Component)

```
┌──────────────────────────────────┐
│ p-4 (16px all sides)             │
│                                  │
│ ┌──────────────────────────────┐ │
│ │                              │ │
│ │  Image                       │ │
│ │                              │ │
│ │  mb-4 (16px)                │ │
│ │                              │ │
│ └──────────────────────────────┘ │
│                                  │
│ mt-auto (push to bottom)         │
│                                  │
│ ┌──────────────────────────────┐ │
│ │ John Doe                     │ │
│ │ Jan 14, 2026                 │ │
│ └──────────────────────────────┘ │
│                                  │
└──────────────────────────────────┘

OVERLAY (on hover):
┌──────────────────────────────────┐
│ p-4 (16px padding inside)        │
│                                  │
│ "A beautiful moment captured"    │
│                                  │
└──────────────────────────────────┘
```

---

## Section / Container Layout

### Mobile (base)
```
┌─────────────────────────────┐
│ px-4 py-8                   │
│                             │
│ ┌─────────────────────────┐ │
│ │ Content                 │ │ gap-4 (16px)
│ │ Full width              │ │ between items
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ More content            │ │
│ └─────────────────────────┘ │
│                             │
└─────────────────────────────┘
```

### Tablet (md:)
```
┌──────────────────────────────────────┐
│ md:px-6 md:py-10                     │
│                                      │
│ ┌──────────────┐  ┌──────────────┐  │
│ │  Content 1   │  │  Content 2   │  │ gap-4
│ └──────────────┘  └──────────────┘  │
│                                      │
│ ┌──────────────┐  ┌──────────────┐  │
│ │  Content 3   │  │  Content 4   │  │
│ └──────────────┘  └──────────────┘  │
│                                      │
└──────────────────────────────────────┘
```

### Desktop (lg:)
```
┌────────────────────────────────────────────────┐
│ lg:px-8 lg:py-12                               │
│                                                │
│ ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│ │Content 1 │  │Content 2 │  │Content 3 │ gap-4 │
│ └──────────┘  └──────────┘  └──────────┘     │
│                                                │
│ ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│ │Content 4 │  │Content 5 │  │Content 6 │     │
│ └──────────┘  └──────────┘  └──────────┘     │
│                                                │
└────────────────────────────────────────────────┘
```

---

## Button Group Spacing

### Side-by-side (Desktop)
```
┌─────────────────────────────┐
│ DialogButtonGroup           │
│ pt-4 (16px top margin)      │
│ gap-3 (12px between buttons)│
│                             │
│                  [Cancel] [Save] │
│                             │
└─────────────────────────────┘
```

### Stacked (Mobile)
```
┌─────────────────────────────┐
│ DialogButtonGroup           │
│ pt-4 (16px top margin)      │
│ gap-2 or gap-3 (12px)       │
│ flex-col-reverse            │
│                             │
│         ┌───────────────┐   │
│         │ Save Button   │   │
│         └───────────────┘   │
│         (gap-2 or gap-3)     │
│         ┌───────────────┐   │
│         │ Cancel Button │   │
│         └───────────────┘   │
│                             │
└─────────────────────────────┘
```

---

## Featured Memory Layout

```
┌──────────────────────────────────────────────────┐
│ p-6 md:p-8 (rounded-2xl container)               │
│                                                  │
│  ┌────────────────────┐  ┌─────────────────┐   │
│  │ p-6 md:p-8         │  │ p-6 md:p-8      │   │
│  │                    │  │                 │   │
│  │ Badge:             │  │   Featured      │   │
│  │ px-2.5 py-1        │  │   Signature     │   │
│  │ "Daily Featured"   │  │   Image         │   │
│  │                    │  │                 │   │
│  │ space-y-6          │  │                 │   │
│  │ (margin between)   │  │                 │   │
│  │                    │  │                 │   │
│  │ "Reflection..."    │  │                 │   │
│  │ (large text)       │  │                 │   │
│  │                    │  │                 │   │
│  │ pt-2 + space-y-4   │  └─────────────────┘   │
│  │ Author & date      │                        │
│  │                    │                        │
│  └────────────────────┘                        │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## Form Field Spacing

### Vertical Layout
```
┌───────────────────────────────┐
│ FieldSet gap-4                │
│                               │
│ ┌─────────────────────────┐   │
│ │ Field gap-2             │   │
│ │ (vertical)              │   │
│ │                         │   │
│ │ ┌─────────────────────┐ │   │
│ │ │ Label               │ │   │
│ │ └─────────────────────┘ │   │
│ │ gap-2                   │   │
│ │ ┌─────────────────────┐ │   │
│ │ │ Input px-2.5 py-1   │ │   │
│ │ └─────────────────────┘ │   │
│ │ gap-0.5                 │   │
│ │ ┌─────────────────────┐ │   │
│ │ │ Help text           │ │   │
│ │ └─────────────────────┘ │   │
│ └─────────────────────────┘   │
│                               │
│ gap-4 (16px between fields)   │
│                               │
│ ┌─────────────────────────┐   │
│ │ Next Field              │   │
│ │ ...                     │   │
│ └─────────────────────────┘   │
│                               │
└───────────────────────────────┘
```

---

## Grid of Cards

```
Mobile: 1 column
┌─────────────────────────────────┐
│ gap-4 (16px)                    │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Card                        │ │
│ └─────────────────────────────┘ │
│ gap-4                           │
│ ┌─────────────────────────────┐ │
│ │ Card                        │ │
│ └─────────────────────────────┘ │
│                                 │
└─────────────────────────────────┘

Tablet: 2 columns (md:grid-cols-2)
┌───────────────────────────────────┐
│ gap-4                             │
│ ┌────────────┐  ┌────────────┐   │
│ │  Card      │  │  Card      │   │
│ └────────────┘  └────────────┘   │
│ gap-4 (vertical)                  │
│ ┌────────────┐  ┌────────────┐   │
│ │  Card      │  │  Card      │   │
│ └────────────┘  └────────────┘   │
│                                   │
└───────────────────────────────────┘

Desktop: 3 columns (lg:grid-cols-3)
┌────────────────────────────────────────┐
│ gap-4                                  │
│ ┌────────┐  ┌────────┐  ┌────────┐   │
│ │ Card   │  │ Card   │  │ Card   │   │
│ └────────┘  └────────┘  └────────┘   │
│ gap-4 (vertical)                       │
│ ┌────────┐  ┌────────┐  ┌────────┐   │
│ │ Card   │  │ Card   │  │ Card   │   │
│ └────────┘  └────────┘  └────────┘   │
│                                        │
└────────────────────────────────────────┘
```

---

## Spacing Scale Visual

```
2px  ▌ px-0.5   (XS - Rare)
4px  ▌▌ px-1    (SM - Icon padding)
8px  ▌▌▌ px-2   (MD - Field gaps)
12px ▌▌▌▌ gap-3 (LG - Button groups)
16px ▌▌▌▌▌ p-4  (XL - PRIMARY)
24px ▌▌▌▌▌▌ px-6 (2XL - Large)
32px ▌▌▌▌▌▌▌ px-8 (3XL - Outer)
48px ▌▌▌▌▌▌▌▌ p-12 (4XL - Large sections)
```

---

## Common Responsive Patterns

### Pattern 1: Flexible Spacing
```
Base:        px-4 py-8 gap-3
Tablet:      md:px-6 md:py-10 md:gap-4
Desktop:     lg:px-8 lg:py-12 lg:gap-4
```

### Pattern 2: Section Container
```
Base:        px-4 py-8
Tablet:      md:px-6 md:py-10
Desktop:     lg:px-8 lg:py-12
```

### Pattern 3: Dialog / Card
```
All sizes:   p-4 gap-4
(No scaling needed - internal content scales)
```

### Pattern 4: Grid
```
Base:        grid grid-cols-1 gap-4
Tablet:      md:grid-cols-2 md:gap-4
Desktop:     lg:grid-cols-3 lg:gap-4
```

---

## Input Field Sizing

```
Height: h-8 (32px)
│ ┌─────────────────────────────┐
│ │ py-1 (4px padding inside)   │ ← 32px total
│ │ [Input Content Here]        │
│ │ py-1 (4px padding inside)   │
│ └─────────────────────────────┘
│ ├─ px-2.5 (10px each side)
```

---

## Icon & Button Sizing

```
Small Button: h-8 (32px) px-4 py-2
┌───────────────────────┐
│ py-2 (8px each side)  │ ← 32px total
│ [Cancel]              │
│ py-2 (8px each side)  │
└───────────────────────┘

Default Button: h-10 (40px) px-6 py-2.5
┌─────────────────────────────┐
│ py-2.5 (10px each side)     │ ← 40px total
│ [Save Changes]              │
│ py-2.5 (10px each side)     │
└─────────────────────────────┘

Large Button: h-12 (48px) px-8 py-3
┌───────────────────────────────┐
│ py-3 (12px each side)         │ ← 48px total
│ [Create Account]              │
│ py-3 (12px each side)         │
└───────────────────────────────┘
```

---

## Separator / Divider Spacing

```
Before Separator:
Content...
mt-4 (16px)        ← Space above

┌───────────────────────────────┐
│ Border-top: 1px               │
└───────────────────────────────┘

pt-4 (16px)        ← Space below

Content continues...
```

---

## Mobile vs. Desktop Comparison

### Mobile Layout (Full Width)
```
┌─────────────────────────┐
│ px-4 py-8              │
│ Header                  │
├─────────────────────────┤
│ ┌─────────────────────┐ │
│ │ Card gap-4          │ │
│ └─────────────────────┘ │
│ gap-4                   │
│ ┌─────────────────────┐ │
│ │ Card                │ │
│ └─────────────────────┘ │
│ gap-4                   │
│ ┌─────────────────────┐ │
│ │ Card                │ │
│ └─────────────────────┘ │
│ Footer                  │
└─────────────────────────┘
```

### Desktop Layout (3-Column Grid)
```
┌────────────────────────────────────────────┐
│ lg:px-8 lg:py-12                           │
│ Header                                      │
├────────────────────────────────────────────┤
│ ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│ │  Card    │ │  Card    │ │  Card    │ gap│
│ │ lg:p-4   │ │ lg:p-4   │ │ lg:p-4   │-4  │
│ └──────────┘ └──────────┘ └──────────┘    │
│                                             │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│ │  Card    │ │  Card    │ │  Card    │    │
│ │ lg:p-4   │ │ lg:p-4   │ │ lg:p-4   │    │
│ └──────────┘ └──────────┘ └──────────┘    │
│ Footer                                      │
└────────────────────────────────────────────┘
```

---

## Summary Reference

| Use Case | Standard |
|----------|----------|
| **Dialog padding** | `p-4` |
| **Dialog gaps** | `gap-4` between sections |
| **Card padding** | `p-4` |
| **Form field gaps** | `gap-4` between fields |
| **Input padding** | `px-2.5 py-1` |
| **Button group gap** | `gap-3` |
| **Button group top** | `pt-4` |
| **Section mobile** | `px-4 py-8` |
| **Section tablet** | `md:px-6 md:py-10` |
| **Section desktop** | `lg:px-8 lg:py-12` |
| **Grid gap** | `gap-4` |
| **Separator margin** | `mt-4 pt-4` |

---

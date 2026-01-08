# Phase 2 & 3 Roadmap

## 🎯 Phase 2: Space Edit Integration (NOW)

### What's Left
- Space editing component exists conceptually but isn't wired into the dashboard
- Need to add "Edit" button to space cards in `/dashboard/spaces`
- Implement edit dialog that updates space name, description, and visibility

### Implementation Plan

1. **Create `space-settings-dialog.tsx`** (if not exists)
   ```typescript
   - Dialog to edit space name, description, visibility
   - Form with controlled inputs
   - Save button calls store.saveSpace()
   - Cancel/close functionality
   ```

2. **Wire into space cards** (`/dashboard/spaces/page.tsx`)
   ```typescript
   - Add state for edit dialog
   - Add "Edit" button to each space card
   - Pass space data to dialog
   - Refresh spaces list after save
   ```

3. **Update store operation** (`store/store.ts`)
   ```typescript
   - Ensure saveSpace() works for updates (not just creates)
   - Handle updatedAt timestamp
   - Track "edit_space" analytics event
   ```

### Success Criteria
- ✅ Click "Edit" on space card → dialog opens
- ✅ Change name, description, visibility → click Save
- ✅ Space updates immediately in grid
- ✅ Edit tracked in analytics

---

## 🎨 Phase 3: Custom Branding Per Tenant (NEXT)

### Branding Features to Add

**Tenant-level customization** (shown on tenant homepage and space pages)

#### 1. **Cover Image**
   - Hero banner image displayed at top of tenant homepage
   - Used as fallback on space pages
   - Recommended size: 1200x300px
   - Upload/remove functionality in settings

#### 2. **Brand Colors**
   - Primary color (buttons, accents)
   - Secondary color (links, highlights)
   - Text color (for readability)
   - Default fallback colors if not set

#### 3. **Logo**
   - Displayed in tenant homepage header
   - Small, square or rectangular
   - Upload/remove functionality
   - Recommended size: 200x200px

#### 4. **Tagline/Slogan**
   - Short text displayed with tenant name on homepage
   - Optional, for personality
   - Example: "Creative Studio" → "Signature Collection"

#### 5. **Footer Text**
   - Custom message/copyright at bottom of pages
   - Markdown support (optional)
   - Example: "© 2025 Creative Studio. All signatures preserved."

### Type Updates

```typescript
export interface Tenant {
  id: string;
  subdomain: string;
  displayName: string;
  ownerId: string;
  createdAt: number;
  description?: string;
  
  // NEW BRANDING FIELDS
  branding?: {
    coverImage?: string;        // URL to cover image
    logoImage?: string;         // URL to logo
    primaryColor?: string;      // Hex color: #FF5733
    secondaryColor?: string;    // Hex color: #FFC300
    textColor?: string;         // Hex color: #000000
    tagline?: string;           // Short phrase
    footerText?: string;        // Custom footer
  };
}
```

### Components to Build

#### 1. **TenantBrandingDialog** (settings page)
   - Image upload fields (cover, logo)
   - Color pickers for primary/secondary/text
   - Text fields for tagline, footer
   - Preview of changes

#### 2. **Update TenantWallView** (tenant homepage)
   - Display cover image at top (if set)
   - Show logo in header
   - Use primary color for buttons
   - Apply custom text color
   - Show footer text at bottom

#### 3. **Update Space Page** ([slug]/page.tsx)
   - Use tenant's primary color for CTA buttons
   - Fall back to tenant's cover image in header
   - Apply custom font colors

### Implementation Steps

**Step 1: Update Data Model**
- Add `branding` field to Tenant type
- Migrate existing tenants (set to undefined/null)

**Step 2: Create Branding Settings Page**
- Add route: `/dashboard/branding` (or extend settings)
- Image upload handlers
- Color pickers (use shadcn color picker or custom)
- Live preview section

**Step 3: Update Homepage Styling**
- TenantWallView shows cover image header
- Applies brand colors to space cards
- Logo in header
- Footer text

**Step 4: Propagate to Space Pages**
- Apply tenant branding on public space pages
- Color scheme carries over from tenant

**Step 5: Image Storage**
- For MVP: Base64 encode images (like signatures)
- For production: Use Cloudinary or S3

### UI Pattern Example

```jsx
// Tenant Homepage with Branding
<div className="bg-stone-50 min-h-screen">
  {/* Cover Image */}
  {branding?.coverImage && (
    <img 
      src={branding.coverImage} 
      className="w-full h-80 object-cover"
      alt="Cover"
    />
  )}
  
  {/* Header with Logo */}
  <div className="flex items-center gap-4 p-6">
    {branding?.logoImage && (
      <img src={branding.logoImage} className="h-12 w-12 rounded" />
    )}
    <div>
      <h1 className="text-3xl font-bold">{tenant.displayName}</h1>
      {branding?.tagline && (
        <p className="text-sm text-gray-600">{branding.tagline}</p>
      )}
    </div>
  </div>
  
  {/* Spaces Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
    {/* Space cards with custom primary color buttons */}
  </div>
  
  {/* Footer */}
  {branding?.footerText && (
    <footer 
      className="p-6 border-t"
      style={{ color: branding.textColor || '#000' }}
    >
      {branding.footerText}
    </footer>
  )}
</div>
```

### Beauty Features (What Makes It Pop)

1. **Large Hero Cover** - Professional looking header image
2. **Color Cohesion** - Buttons and links match tenant brand
3. **Logo Placement** - Builds brand recognition
4. **Typography** - Custom text color for contrast
5. **Personality** - Tagline + footer show individuality

### Success Criteria
- ✅ Tenant can upload cover image
- ✅ Tenant can set 3 brand colors
- ✅ Tenant can add logo
- ✅ Tenant can set tagline + footer
- ✅ Tenant homepage looks beautiful with branding
- ✅ Space pages reflect tenant branding
- ✅ Colors have good contrast (accessibility)
- ✅ Images are responsive

---

## 📋 Implementation Order

### Phase 2 (This Week)
1. Create/finalize `space-settings-dialog.tsx`
2. Wire into `/dashboard/spaces/page.tsx`
3. Add "Edit" button + action handlers
4. Test edit flow end-to-end

### Phase 3 (Next)
1. Update Tenant type with branding fields
2. Create `tenant-branding-dialog.tsx`
3. Add branding management to `/dashboard/settings` (or new route)
4. Update `TenantWallView` to display branding
5. Update `[slug]/page.tsx` to apply branding
6. Image upload handlers + storage strategy
7. Test branding across multiple tenants

---

## 🧪 Testing Checklist

### Phase 2
- [ ] Edit space name
- [ ] Edit description
- [ ] Change visibility (public → private → unlisted)
- [ ] Cancel edit (no changes)
- [ ] Edit multiple spaces
- [ ] Changes persist on page refresh

### Phase 3
- [ ] Upload cover image (PNG, JPG)
- [ ] Set primary/secondary/text colors
- [ ] Upload logo
- [ ] Add tagline
- [ ] Add footer text
- [ ] Tenant homepage shows all branding
- [ ] Space pages reflect tenant colors
- [ ] Responsive on mobile
- [ ] Second tenant has independent branding
- [ ] Image sizes are optimized

---

**Last Updated:** January 8, 2026
**Status:** Ready to Build

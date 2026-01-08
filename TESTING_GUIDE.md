# Testing Guide - Phase 2 & 3

## 🚀 Quick Start Testing

### Prerequisites
```bash
# Make sure dev server is running
npm run dev

# Visit: http://big2026.lvh.me:3000 (or your test domain)
```

---

## Phase 2: Space Editing

### Test 1: Edit Space Name
1. Go to `/dashboard/spaces`
2. Click "Edit" on any space card
3. Change the space name
4. Click "Save Changes"
5. ✅ Space card title updates immediately

### Test 2: Edit Description
1. Go to `/dashboard/spaces`
2. Click "Edit" on a space
3. Clear description, add new one
4. Click "Save Changes"
5. ✅ Description updates on card

### Test 3: Edit Visibility
1. Go to `/dashboard/spaces`
2. Click "Edit" on a space
3. Change visibility dropdown (PUBLIC → UNLISTED → PRIVATE)
4. Click "Save Changes"
5. ✅ Badge on space card updates

### Test 4: Cancel Edit (No Save)
1. Click "Edit"
2. Change name and description
3. Click "Cancel"
4. ✅ Dialog closes, no changes saved
5. ✅ Space card shows original values

### Test 5: Edit Multiple Spaces
1. Create 3 spaces
2. Edit each one with different names
3. ✅ All changes persist
4. ✅ Each space card shows correct updated values

### Test 6: Persistence on Refresh
1. Edit a space name
2. Press F5 to refresh page
3. ✅ Space name is still updated (in localStorage)

---

## Phase 3: Custom Branding

### Setup: Create Test Tenant
```
1. Go to /onboarding
2. Create account: "Test Brand Corp"
3. Email: test@example.com
4. Subdomain: testbrand
5. Redirect to testbrand.lvh.me/dashboard
```

### Test 1: Upload Cover Image
1. Go to `/dashboard/settings`
2. Scroll to "Customize Branding"
3. Click "Set Up Branding"
4. In Cover Image section, upload an image
   - Try: PNG, JPG, or other formats
   - Large image recommended (1200x300)
5. ✅ Image preview appears in dialog
6. Click "Save Branding"
7. ✅ Success message shows
8. ✅ Cover image preview in settings
9. Go to tenant homepage (testbrand.lvh.me)
10. ✅ Cover image appears as hero banner at top

### Test 2: Upload Logo
1. Open branding dialog
2. Upload logo image (square, e.g., 200x200px)
3. ✅ Logo preview shows in dialog
4. Save branding
5. Go to homepage
6. ✅ Logo appears in header next to tenant name

### Test 3: Set Primary Color
1. Open branding dialog
2. Click primary color picker
3. Select a bright color (e.g., red, blue, green)
4. ✅ Color preview updates
5. Save branding
6. Go to homepage
7. ✅ "View & Sign →" links are your primary color
8. ✅ Hover state on space cards shows primary color border

### Test 4: Set Secondary Color
1. Open branding dialog
2. Click secondary color picker
3. Select a darker shade
4. Save branding
5. Go to homepage
6. ✅ Metadata text (dates, counts) use secondary color
7. ✅ Tagline uses secondary color

### Test 5: Set Text Color
1. Open branding dialog
2. Set text color to dark shade
3. Save branding
4. Go to homepage
5. ✅ Tenant name uses custom text color
6. ✅ Description uses custom text color
7. ✅ Space card titles use custom text color

### Test 6: Color Preview in Dialog
1. Open branding dialog
2. Set primary: #FF5733 (red)
3. Set secondary: #FFB700 (gold)
4. Set text: #1C1917 (dark)
5. ✅ Color preview row shows all three colors
6. ✅ "Sample Text" shows in custom text color

### Test 7: Add Tagline
1. Open branding dialog
2. In Tagline field, enter: "Signature Collection"
3. Save branding
4. Go to homepage
5. ✅ Tagline appears under tenant name in secondary color

### Test 8: Add Footer Text
1. Open branding dialog
2. In Footer Text area, enter: "© 2025 Test Brand. All signatures preserved."
3. Save branding
4. Scroll to bottom of homepage
5. ✅ Footer text appears at bottom in custom text color

### Test 9: Complete Branding Setup
1. Open branding dialog
2. Do ALL of the above (cover, logo, all colors, tagline, footer)
3. Save branding
4. Go to homepage
5. ✅ Everything displays beautifully
6. ✅ Colors are cohesive
7. ✅ Logo, cover, text all aligned

### Test 10: Branding Preview in Settings
1. After saving branding, stay in settings
2. ✅ Cover image preview shows
3. ✅ Logo preview shows
4. ✅ Color swatches show
5. ✅ "Edit Branding" button now visible

### Test 11: Edit Branding
1. Click "Edit Branding" button
2. Change one of the colors
3. Change tagline
4. Save
5. ✅ Changes apply immediately
6. ✅ Settings page preview updates
7. ✅ Homepage updates

### Test 12: Remove Images
1. Open branding dialog
2. Upload cover image
3. Click "Remove Image"
4. ✅ Preview disappears
5. Save
6. Go to homepage
7. ✅ No cover image displayed

### Test 13: Multi-Tenant Branding
1. Create account 1: "Blue Brand" (blue colors)
2. Set up branding with blue color scheme
3. Create account 2: "Red Brand" (red colors)
4. Set up branding with red color scheme
5. Go to bluebrand.lvh.me
6. ✅ Blue colors everywhere
7. Go to redbrand.lvh.me
8. ✅ Red colors everywhere
9. ✅ No color leakage between tenants

### Test 14: Responsive Cover Image
1. Set up cover image
2. View on desktop
3. ✅ Image full width, 320px height, covers nicely
4. Resize browser to mobile width
5. ✅ Image still covers properly
6. ✅ Text readable over image (dark overlay helps)

### Test 15: Responsive Logo
1. Set up logo
2. View on desktop
3. ✅ Logo 64x64px, looks good
4. Resize to mobile
5. ✅ Logo still visible, proportional
6. ✅ Text stacks if needed

### Test 16: Character Limits
1. Open branding dialog
2. Try to type 100 characters in tagline field
3. ✅ Stops at 60 characters (shows hint)
4. Try to type 300 characters in footer
5. ✅ Stops at 200 characters (shows hint)

### Test 17: Hex Color Input
1. Open branding dialog
2. In primary color, clear and type: `#FF5733`
3. ✅ Color updates immediately
4. Try invalid hex: `#XXXXXX`
5. ✅ Falls back to previous valid color

### Test 18: No Branding (Default)
1. Create new tenant, don't set branding
2. Go to homepage
3. ✅ Default colors used (amber-based)
4. ✅ No cover image (just background)
5. ✅ No logo
6. ✅ No tagline
7. ✅ No footer
8. ✅ Still looks good with defaults

---

## 🎨 Visual Testing Checklist

### Color Harmony
- [ ] Primary color visible on buttons/links
- [ ] Secondary color distinct from primary
- [ ] Text color readable on background
- [ ] Colors don't clash

### Image Quality
- [ ] Cover image not blurry when uploaded
- [ ] Logo clear and crisp
- [ ] No pixelation on preview

### Spacing & Layout
- [ ] Cover image doesn't overlap header awkwardly
- [ ] Logo properly sized (16x16)
- [ ] Tagline positioned below name
- [ ] Footer has proper spacing

### Mobile Responsiveness
- [ ] Layout stacks properly on small screens
- [ ] Images don't overflow
- [ ] Text remains readable
- [ ] Buttons still clickable on mobile

---

## 🐛 Edge Cases to Test

### Empty/Minimal Branding
1. Set only cover image, no colors
2. ✅ Should look fine with defaults
3. Set only colors, no images
4. ✅ Should look fine without images

### Large Images
1. Upload 5MB cover image
2. ✅ Should handle gracefully (or show limit)
3. Very wide/tall image
4. ✅ Should scale properly with object-cover

### Special Characters
1. Add special characters in tagline: "My Wall™ 2025"
2. ✅ Should display correctly
3. Add unicode: "签名 Wall"
4. ✅ Should handle different scripts

### Very Long Text
1. Add very long footer (100+ chars, use max 200)
2. ✅ Should wrap properly on mobile

---

## ✅ Success Criteria

### Phase 2 Success
- [ ] Edit button works on all spaces
- [ ] Changes save and persist
- [ ] Analytics tracked correctly
- [ ] Responsive on mobile
- [ ] Cancel doesn't save
- [ ] All form fields editable

### Phase 3 Success
- [ ] Branding dialog opens/closes smoothly
- [ ] All image uploads work
- [ ] Color pickers work
- [ ] Colors display correctly on homepage
- [ ] Multiple tenants have independent branding
- [ ] Responsive across all screen sizes
- [ ] Branding persists on refresh
- [ ] No branding = defaults work fine

---

## 📸 Screenshots to Capture

### Phase 2
- [ ] Space edit dialog open
- [ ] Space card after edit
- [ ] Multiple spaces with different settings

### Phase 3
- [ ] Branding settings page
- [ ] Branding dialog with all fields filled
- [ ] Tenant homepage with cover image
- [ ] Tenant homepage with all branding
- [ ] Mobile view of branded homepage
- [ ] Two different tenant homepages side-by-side

---

## 🔗 Test URLs

```
Onboarding:
  http://localhost:3000/onboarding

Test Tenant Dashboard (adjust subdomain):
  http://testbrand.lvh.me:3000/dashboard
  http://testbrand.lvh.me:3000/dashboard/spaces
  http://testbrand.lvh.me:3000/dashboard/settings

Test Tenant Homepage:
  http://testbrand.lvh.me:3000

Test Space Signing:
  http://testbrand.lvh.me:3000/{space-slug}
```

---

## 📝 Notes

- Use `lvh.me` for local subdomain testing (*.lvh.me → 127.0.0.1)
- localStorage persists between refreshes
- Images are stored as Base64 (increases data size)
- All tests assume you have created tenants and spaces

---

**Happy Testing! Report any issues you find.**

# Echo Sign - Multi-Tenant Architecture

## 🏗️ System Overview

Echo Sign is a multi-tenant signature directory platform where:
- **Tenants** (account owners) create and manage multiple **Spaces** (signature walls)
- **Guests** and **Users** can sign spaces and leave memories
- Each tenant has complete isolation and control over their data
- Architecture supports both subdomain-based and path-based routing

---

## 📊 Data Hierarchy

```
Tenant (owner account)
└── Multiple Spaces
    └── Multiple Signature Entries
        └── Memory + Visibility Settings
```

### Key Entities

**Tenant**
- Represents an account owner (e.g., "Creative Studio")
- Has unique subdomain (e.g., "cs" → cs.echosign.io)
- Owns multiple spaces and users
- Has tenant-level settings and branding

**Space**
- Signature wall within a tenant
- Has name, slug, description, visibility
- Contains multiple signature entries
- Scoped to tenant (isolation)

**SignatureEntry**
- One person's mark + optional memory
- Belongs to one space and one tenant
- Has individual visibility control

---

## 🗺️ URL Structure & Navigation

### Public Routes (No Authentication Required)

| Route | Purpose | View | Context |
|-------|---------|------|---------|
| `{subdomain}/` | **Tenant Homepage** | List all public spaces for this tenant | Tenant context |
| `{subdomain}/{space-slug}` | **Space Page** | Sign and view signatures for one space | Space + Tenant context |
| `/onboarding` | Signup/Create Account | Account creation form | No tenant |
| `/` | **Global Landing** | Marketing page (when no subdomain) | No tenant |

### Authenticated Routes (Tenant Owners Only)

| Route | Purpose | View | Protection |
|-------|---------|------|-----------|
| `{subdomain}/dashboard` | **Dashboard Home** | Stats, quick actions | Tenant owner |
| `{subdomain}/dashboard/spaces` | **Manage Spaces** | Create, edit, delete spaces | Tenant owner |
| `{subdomain}/dashboard/entries` | **Manage Signatures** | View, moderate, delete signatures | Tenant owner |
| `{subdomain}/dashboard/analytics` | **Analytics** | Visitor stats, trends | Tenant owner |
| `{subdomain}/dashboard/settings` | **Tenant Settings** | Profile, branding, invite users | Tenant owner |

---

## 🔄 Navigation Flow

### User Journey: Tenant Owner

```
1. Land on /onboarding
   ↓
2. Sign up with name + email + subdomain
   ↓
3. Redirect to {subdomain}/dashboard
   ↓
4. Dashboard shows spaces grid
   ↓
5. Click "+ New Space" → Create space dialog
   ↓
6. Space appears in list, can view/edit/delete
   ↓
7. Copy link to space and share
```

### User Journey: Guest Signer

```
1. Receive space link: {subdomain}/{space-slug}
   ↓
2. Land on space page (public)
   ↓
3. See existing signatures + "Leave Your Signature" button
   ↓
4. Click button → Sign dialog opens
   ↓
5. Draw signature + optional memory
   ↓
6. Set visibility (public/private/unlisted)
   ↓
7. Submit → Signature saved
   ↓
8. Redirect back to space page to see new signature
```

### User Journey: Browsing Tenant

```
1. Land on {subdomain}/ (tenant homepage)
   ↓
2. See list of all public spaces
   ↓
3. Click on a space → Visit space page
   ↓
4. Browse signatures + optionally sign
```

---

## 🔐 Access Control

### Authentication Levels

```
Public (No Login)
├── View public spaces
├── View public signatures
└── Sign spaces (no account needed)

Authenticated (Tenant Owner)
├── All public access
├── Create spaces
├── Edit/delete own spaces
├── View all signatures (including private)
├── View analytics
└── Manage tenant settings
```

### Data Isolation

- **Tenant Isolation**: All queries filtered by `tenantId`
- **Space Isolation**: Spaces only visible to their tenant + public viewers
- **Signature Visibility**: Controlled per entry (PUBLIC/PRIVATE/UNLISTED)

---

## 🎯 Current Route Implementation

### ✅ Implemented

- `/onboarding` - Signup (simplified: name + email + subdomain)
- `{subdomain}/` - Tenant homepage via `TenantWallView` component
- `{subdomain}/{space-slug}` - Space page via `[slug]/page.tsx`
- `{subdomain}/dashboard` - Dashboard home with stats
- `{subdomain}/dashboard/spaces` - Space management

### ⚠️ Issues to Address

1. **Back Navigation** - Space page back button goes to `{subdomain}/` (correct) but UI unclear
2. **Tenant Homepage** - Currently shows **all public signatures across spaces**
   - Should show: list of spaces instead (or featured spaces)
   - Guests go here to browse and choose a space to sign
3. **Missing Pages**
   - Dashboard entries management
   - Dashboard analytics
   - Dashboard settings
   - Tenant branding/profile

---

## 🏠 Homepage Redesign (HIGH PRIORITY)

### Current `{subdomain}/` Behavior
- Shows: All public signatures for this tenant (mixed from all spaces)
- Purpose: Unclear
- Issue: No way to discover individual spaces

### Proposed `{subdomain}/` Behavior
- Shows: Grid of all spaces for this tenant
- Includes: Space name, description, signature count, visibility badge
- Purpose: **Space discovery and exploration**
- Navigation: Click space → go to `{subdomain}/{space-slug}`

### Implementation
- Rename: Keep `TenantWallView` but change to show spaces instead of signatures
- Or create new: `TenantSpacesView` component
- Show space cards with:
  - Space name + description
  - Signature count
  - Last signed date
  - Visibility (public/unlisted/private)
  - CTA: "View & Sign"

---

## 🔗 Back Button Navigation

### Current Issue
Space page has back button → goes to `{subdomain}/` (tenant home)

### Assessment
- ✅ Correct behavior for guests (back to space list)
- ✅ Shows tenant homepage
- ⚠️ Once homepage shows spaces, this makes perfect sense
- ⚠️ Button label unclear ("← Back" vs "← Back to Wall")

### Solution
1. Update homepage to show spaces (not signatures)
2. Update back button label: "← Back to Spaces" or "← Browse Spaces"
3. Keep navigation: space → home

---

## 📋 Remaining Architecture Work

### Phase 1: Core Navigation (NEXT)
- [ ] Implement tenant homepage to show spaces (not signatures)
- [ ] Update `TenantWallView` to list spaces in grid
- [ ] Fix back button label/UX
- [ ] Test multi-space browsing flow

### Phase 2: Dashboard Features
- [ ] Dashboard entries management (view/moderate/delete signatures)
- [ ] Dashboard analytics (views, signatures, trends per space)
- [ ] Dashboard settings (tenant profile, branding)
- [ ] User management (if enabling collaborators)

### Phase 3: Advanced Features
- [ ] Invite system (share dashboard access)
- [ ] Space templates
- [ ] Custom branding per tenant
- [ ] Export signatures
- [ ] Search/filter in dashboard

---

## 🎨 Component Architecture

### Page Components
- `app/page.tsx` - Router (landing vs tenant homepage)
- `app/onboarding/page.tsx` - Signup flow
- `app/[slug]/page.tsx` - Space signing page
- `app/dashboard/page.tsx` - Dashboard home
- `app/dashboard/spaces/page.tsx` - Space management
- `app/dashboard/entries/page.tsx` - Signature management (TODO)
- `app/dashboard/analytics/page.tsx` - Analytics (TODO)
- `app/dashboard/settings/page.tsx` - Settings (TODO)

### Feature Components
- `CreateSpaceDialog` - Create new space
- `SignWallDialog` - Sign a space
- `SignatureCard` - Display one signature
- `TenantWallView` - **To be refactored** (show spaces, not signatures)

### UI Components (shadcn)
- Dialog, Input, Button, Select, etc.

---

## 🚀 Routing Strategy

### Subdomain-Based (Production)
```
Public: echosign.io/
Tenant: cs.echosign.io/
Space:  cs.echosign.io/graduation-2025
```

### Path-Based (Development)
```
Public: localhost/
Tenant: localhost/tenant/cs
Space:  localhost/tenant/cs/graduation-2025
```

### Implementation
- `proxy.ts` - Middleware to route based on subdomain/path
- Automatic detection in components via `window.location.hostname`

---

## 📚 Store Operations by Context

### Public Context (No Auth)
```typescript
store.getTenantBySubdomain(subdomain)
store.getSpaceBySlug(tenantId, slug)
store.getPublicEntriesBySpace(spaceId)
store.saveEntry(entry) // Guest signature
```

### Authenticated Context (Tenant Owner)
```typescript
store.getCurrentTenant()
store.getSpacesByTenant(tenantId)
store.saveSpace(space)
store.deleteSpace(spaceId)
store.getEntriesByTenant(tenantId)
store.deleteEntry(entryId)
store.track(tenantId, eventType, metadata)
```

---

## 🔄 Multi-Tenant Flow Example

### Scenario: Two Tenants
```
Tenant 1: "Creative Studio" (cs.echosign.io)
├── Space 1: "Graduation 2025"
│   └── Signatures: [Entry 1, Entry 2, ...]
└── Space 2: "Wedding 2025"
    └── Signatures: [Entry 3, Entry 4, ...]

Tenant 2: "Family Legacy" (family.echosign.io)
└── Space 1: "Family Tree 2025"
    └── Signatures: [Entry 5, Entry 6, ...]
```

### Isolation Verification
- User at `cs.echosign.io/dashboard` sees only spaces 1 & 2
- User at `family.echosign.io/dashboard` sees only space 3
- All queries automatically filtered by current tenant's subdomain
- No cross-tenant data leakage

---

## 📝 Next Immediate Tasks

1. **Refactor Tenant Homepage**
   - Modify `TenantWallView` to display spaces (not signatures)
   - Create space card component
   - Test space browsing flow

2. **Navigation Consistency**
   - Verify back buttons work correctly
   - Update labels for clarity
   - Test across public/auth contexts

3. **Test Multi-Tenant**
   - Create test tenants with different data
   - Verify isolation (no data leakage)
   - Test navigation between spaces

---

## 🎯 Success Criteria

- [ ] Homepage shows spaces, not signatures
- [ ] Guest can browse tenant → pick space → sign
- [ ] Owner can create/manage multiple spaces
- [ ] No cross-tenant data visible
- [ ] Back navigation is intuitive
- [ ] All routes work with subdomain + path routing
- [ ] Analytics and settings pages stubbed/planned

---

**Last Updated:** January 8, 2026
**Status:** Architecture Defined - Ready for Implementation

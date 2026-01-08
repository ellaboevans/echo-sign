# Echo Sign - Architecture & Development Guide

## 📖 Start Here

This directory contains the Echo Sign multi-tenant signature wall platform. This document explains the architecture.

### Quick Links
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Complete system design (READ FIRST)
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Cheat sheets and quick lookups
- **[MULTITENANCY_PROGRESS.md](./MULTITENANCY_PROGRESS.md)** - What's been built
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - This session's work

---

## 🚀 Get Started in 2 Minutes

### What is Echo Sign?
A multi-tenant platform where account owners create signature walls, then share links with guests to sign and leave memories.

### Key Concepts
- **Tenant**: Account owner (e.g., "Creative Studio" with subdomain "cs")
- **Space**: A signature wall (e.g., "Graduation 2025")
- **Entry**: One person's signature + optional memory

### Example User Flow
```
1. Jane signs up at /onboarding with subdomain "creative"
2. Goes to creative.echosign.io/dashboard
3. Creates space "Wedding 2025"
4. Gets link: creative.echosign.io/wedding-2025
5. Shares with guests
6. Guests sign using that link
7. Jane monitors from dashboard
8. Jane can create more spaces ("Baby Shower", "Graduation", etc.)
```

---

## 🗺️ Routes

| Route | Purpose | Public? |
|-------|---------|---------|
| `/` | Landing page | Yes |
| `/onboarding` | Sign up | Yes |
| `{subdomain}/` | Tenant's space directory | Yes |
| `{subdomain}/{space-slug}` | Sign a specific space | Yes |
| `{subdomain}/dashboard` | Manage spaces (owner only) | No |
| `{subdomain}/dashboard/spaces` | Space list & management | No |

---

## 🧩 Core Components

### Pages
- `app/page.tsx` - Landing/tenant home router
- `app/onboarding/page.tsx` - Sign up form
- `app/[slug]/page.tsx` - Space page (sign here)
- `app/dashboard/page.tsx` - Owner dashboard
- `app/dashboard/spaces/page.tsx` - Manage spaces

### Features
- `components/create-space-dialog.tsx` - Create new space
- `components/sign-wall-dialog.tsx` - Sign a space
- `components/tenant-wall-view.tsx` - Space directory
- `components/signature-canvas.tsx` - Drawing canvas

### Data
- `store/store.ts` - Local storage (data operations)
- `types/types.ts` - Data model (Tenant, Space, Entry, etc.)

---

## 💾 Data Model

```typescript
// Tenant = account owner
Tenant {
  id: UUID
  subdomain: string          // unique, e.g., "cs"
  displayName: string        // owner's name
  ownerId: UUID             // references User
  createdAt: timestamp
}

// Space = signature wall within a tenant
Space {
  id: UUID
  tenantId: UUID            // which tenant owns this
  name: string              // e.g., "Graduation 2025"
  slug: string              // URL slug, e.g., "graduation-2025"
  description?: string
  visibility: "public" | "private" | "unlisted"
  createdAt: timestamp
  updatedAt?: timestamp
}

// Entry = one person's signature
SignatureEntry {
  id: UUID
  tenantId: UUID           // which tenant
  spaceId: UUID            // which space
  userName: string         // guest name
  signatureData: string    // Base64 or SVG
  memoryText?: string      // optional message
  visibility: "public" | "private" | "unlisted"
  createdAt: timestamp
  deletedAt?: timestamp    // soft delete
}
```

---

## 🔐 Multi-Tenant Isolation

All data operations are filtered by `tenantId`:

✅ **Safe** - Queries automatically limited to current tenant
```typescript
store.getSpacesByTenant(tenant.id)        // Only this tenant's spaces
store.getEntriesByTenant(tenant.id)       // Only this tenant's signatures
store.getSpaceBySlug(tenant.id, slug)     // Checks tenant ownership
```

❌ **Never** cross-tenant contamination because:
1. All operations require explicit `tenantId`
2. Subdomain detection sets tenant context
3. Guest signups store tenantId with entry
4. Dashboard filters by current tenant

---

## 🔧 Common Development Tasks

### Add a New Dashboard Page
1. Create `app/dashboard/newpage/page.tsx`
2. Use `store.getCurrentTenant()` for context
3. Filter all data by tenant ID
4. Add to navigation

### Query Tenant Data
```typescript
const tenant = store.getCurrentTenant()
const spaces = store.getSpacesByTenant(tenant.id)
const entries = store.getEntriesByTenant(tenant.id)
```

### Create New Feature
1. Define types in `types/types.ts`
2. Add store operations in `store/store.ts`
3. Create UI component in `components/`
4. Integrate into page
5. Always filter by tenantId

---

## 🧪 Testing Multi-Tenancy

### Manual Test
```
1. Create account 1 (subdomain: "test1")
   - Create space "Wedding"
   - Create space "Graduation"

2. Create account 2 (subdomain: "test2")
   - Create space "Party"

3. Visit test1.lvh.me/dashboard
   - Verify: See 2 spaces (Wedding, Graduation)
   - Verify: Don't see "Party"

4. Visit test2.lvh.me/dashboard
   - Verify: See 1 space (Party)
   - Verify: Don't see Wedding/Graduation
```

### Debug in Console
```javascript
// See current tenant
store.getCurrentTenant()

// See only this tenant's spaces
const t = store.getCurrentTenant()
store.getSpacesByTenant(t.id)

// Verify isolation - these should differ per tenant
const t1 = store.getTenantBySubdomain("test1")
const t2 = store.getTenantBySubdomain("test2")
store.getSpacesByTenant(t1.id)  // Different from t2!
```

---

## 📊 Architecture Decisions

### Why Spaces Not Just One Wall?
Owners want multiple events (wedding, graduation, anniversary). One wall = limiting. Multiple spaces = flexible.

### Why Simplified Signup?
Asking for space name at signup adds friction. Better to ask during dashboard setup. Separate concerns: account creation vs space management.

### Why Tenant Home Shows Spaces?
Guests need to discover which wall to sign. Showing spaces = clear choice. Showing all signatures mixed = confusing.

### Why Subdomain Routing?
- Production: `cs.echosign.io` (professional, brandable)
- Path fallback: `localhost/tenant/cs` (dev-friendly)
- Single codebase handles both via middleware

---

## 🔄 Current Development Status

### ✅ Phase 1: Navigation (COMPLETE)
- Tenant creation with subdomain
- Multiple spaces per tenant
- Space creation from dashboard
- Tenant homepage shows spaces
- Guest signing works
- Data isolation verified

### ⏳ Phase 2: Dashboard (NEXT)
- Entries management page (view/moderate/delete)
- Analytics page (views, trends, per-space stats)
- Settings page (tenant profile, branding)
- Space edit integration

### 🎯 Phase 3: Advanced Features
- Invite system (share dashboard access)
- Custom branding
- Export signatures
- Search/filter

---

## 📚 File Structure

```
/app
  /onboarding              # Signup flow
  /dashboard              # Owner dashboard
    /spaces               # Space management
  /[slug]                # Space signing page
  page.tsx               # Landing/router

/components
  /ui                    # shadcn components
  create-space-dialog.tsx
  sign-wall-dialog.tsx
  tenant-wall-view.tsx   # Space directory
  signature-canvas.tsx
  ...

/store
  store.ts               # All data operations
  tenant-context.ts

/types
  types.ts               # Data model

/lib
  uuid.ts
  storage.ts
  utils.ts
```

---

## 🚨 Important Notes

1. **Always filter by tenantId** - No global queries
2. **Use store operations** - They handle tenantId automatically
3. **Test isolation** - Create multiple test accounts
4. **Never hardcode IDs** - Use store functions
5. **Track analytics** - Call `store.track()` for events

---

## 📞 Need Help?

### Understanding a Page?
1. Check `ARCHITECTURE.md` for route details
2. Look at similar pages for patterns
3. Debug in console with store functions

### Adding a Feature?
1. Define types in `types/types.ts`
2. Add store operations in `store/store.ts`
3. Create UI component
4. Test tenant isolation
5. Update MULTITENANCY_PROGRESS.md

### Debugging Data Issues?
Use the debugging tips in `QUICK_REFERENCE.md` - check tenant context, space list, entries, etc.

---

**Version:** 1.0 (Jan 8, 2026)  
**Architecture Status:** ✅ Defined & Implemented  
**Ready For:** Phase 2 Development  
**Documentation:** Complete in 4 markdown files

Start with **ARCHITECTURE.md** for complete understanding.

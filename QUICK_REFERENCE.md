# Echo Sign - Quick Reference Guide

## 🗺️ Route Map

### Public Routes (No Auth)
```
/                           → Landing page (if no subdomain)
/onboarding                 → Signup form

{subdomain}/                → Tenant homepage (space directory)
{subdomain}/{space-slug}    → Space page (sign here)
```

### Protected Routes (Tenant Owner Only)
```
{subdomain}/dashboard                    → Dashboard home
{subdomain}/dashboard/spaces             → Manage spaces
{subdomain}/dashboard/entries            → Manage signatures (TODO)
{subdomain}/dashboard/analytics          → View analytics (TODO)
{subdomain}/dashboard/settings           → Tenant settings (TODO)
```

---

## 🧠 Mental Model

```
You create an account with subdomain "myevent"
  ↓
You go to myevent.echosign.io/dashboard
  ↓
You create a space called "Wedding 2025"
  ↓
You get link: myevent.echosign.io/wedding-2025
  ↓
You share this link with guests
  ↓
Guests visit link, see space, can sign
  ↓
You can create another space called "Baby Shower"
  ↓
Link: myevent.echosign.io/baby-shower
```

---

## 📊 Data Model Quick View

```
Tenant: myevent.echosign.io
├─ Owner: Jane Doe (jane@example.com)
├─ Space 1: "Wedding 2025" (VISIBILITY: public)
│  └─ Signatures:
│     ├─ Alice signed (VISIBILITY: public)
│     ├─ Bob signed (VISIBILITY: unlisted)
│     └─ Carol signed (VISIBILITY: private)
└─ Space 2: "Baby Shower" (VISIBILITY: public)
   └─ Signatures:
      ├─ Dave signed (VISIBILITY: public)
      └─ Eve signed (VISIBILITY: public)
```

---

## 🎯 User Flows

### Owner Flow
```
Sign Up → See Dashboard → Create Space → Get Share Link → Share → Monitor Signatures
```

### Guest Flow
```
Get Link → See Space → Sign → Choose Privacy → See Live Wall
```

### Browse Flow
```
Visit Tenant Home → See Space List → Pick Space → Sign Space → Browse More
```

---

## 🔧 Common Tasks

### Create a Space
1. Go to dashboard (`/dashboard`)
2. Click "+ New Space"
3. Fill name, description, visibility
4. Click "Create Space"
5. Copy share link

### Share a Space
1. Go to dashboard
2. Find space card
3. Click "Copy" button next to URL
4. Share URL anywhere

### Sign a Space
1. Receive/visit space link
2. Click "Leave Your Signature"
3. Draw signature on canvas
4. Add optional memory text
5. Choose visibility (who can see it)
6. Click "Save"

### Monitor Signatures
1. Go to dashboard
2. See space cards with signature counts
3. (TODO) Click "View Entries" to see all signatures

---

## 🔐 Visibility Levels

| Level | Visible | Use Case |
|-------|---------|----------|
| **PUBLIC** | Everyone on space page | Default, share publicly |
| **UNLISTED** | Only people who know link | Pseudo-private, share with few |
| **PRIVATE** | Only owner in dashboard | Personal notes, drafts |

---

## 📱 UI Components Map

```
Landing
├─ LandingHero (public home)

Onboarding
├─ SignupForm

Dashboard
├─ Dashboard (home/stats)
├─ Spaces (manage spaces)
│  └─ CreateSpaceDialog (create new)
│  └─ SpaceCard (display space)
├─ Entries (manage signatures) - TODO
├─ Analytics (view stats) - TODO
└─ Settings (tenant config) - TODO

Public Space
├─ Space Page [slug]
│  └─ SignWallDialog (sign interface)
│  └─ SignatureCard (display signature)
│  └─ SignatureCanvas (drawing)

Tenant Home
├─ TenantWallView (space directory)
│  └─ SpaceCard (clickable space)
```

---

## 🛠️ Store Operations Cheat Sheet

```typescript
// Tenant
store.getCurrentTenant()
store.getTenantBySubdomain(subdomain)
store.saveTenant(tenant)

// Spaces
store.getSpacesByTenant(tenantId)
store.getSpaceBySlug(tenantId, slug)
store.saveSpace(space)
store.deleteSpace(spaceId)
store.getSpaceStats(spaceId) // {signatureCount, publicCount}

// Signatures
store.getEntriesBySpace(spaceId)
store.getPublicEntriesBySpace(spaceId)
store.saveEntry(entry)
store.deleteEntry(entryId)

// Analytics
store.track(tenantId, eventType, metadata)
store.getAnalyticsByTenant(tenantId)
```

---

## 🐛 Debug Tips

### Check Current Tenant
```javascript
// In browser console
store.getCurrentTenant()
```

### See All Spaces for Tenant
```javascript
const tenant = store.getCurrentTenant()
store.getSpacesByTenant(tenant.id)
```

### See All Signatures
```javascript
const tenant = store.getCurrentTenant()
store.getEntriesByTenant(tenant.id)
```

### Verify Data Isolation
```javascript
// Should only see this tenant's data
store.getTenants()  // Check subdomain
store.getSpacesByTenant(tenant.id)  // Should be limited
```

---

## 🔗 Subdomain vs Path Routing

### Production (Subdomain)
```
myevent.echosign.io/dashboard
owner.echosign.io/dashboard
creative.echosign.io/dashboard
```

### Development (Path-Based)
```
localhost:3000/tenant/myevent/dashboard
localhost:3000/tenant/owner/dashboard
localhost:3000/tenant/creative/dashboard
```

Both work! Proxy middleware handles routing.

---

## ✅ Phase Checklist

### Phase 1: Navigation ✅ DONE
- [x] Architecture defined
- [x] Tenant home shows spaces
- [x] Space page is functional
- [ ] Multi-space testing

### Phase 2: Dashboard (NEXT)
- [ ] Entries management page
- [ ] Analytics page
- [ ] Settings page
- [ ] Space edit integration

### Phase 3: Features
- [ ] Invite system
- [ ] Custom branding
- [ ] Export options
- [ ] Search/filter

---

**Updated:** January 8, 2026
**Use this** for quick lookups during development
**Read ARCHITECTURE.md** for complete understanding

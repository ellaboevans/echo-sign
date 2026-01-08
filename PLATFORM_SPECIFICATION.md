# Echo Sign - Platform Specification & Feature Guide

**Version:** 1.0  
**Last Updated:** January 8, 2026  
**Status:** MVP Live

---

## 1. Platform Overview

**Echo Sign** is a digital signature collection platform where users create signature walls to preserve memories and build legacies. It enables communities, families, and teams to collect authentic signatures and optional memories in a permanent, beautifully designed digital archive.

### Core Philosophy
- **Authenticity:** Real signatures, real stories. No engagement metrics or social pressure.
- **Permanence:** Signatures are preserved forever (unless deleted by the creator).
- **Privacy:** Users control visibility. Public, private, or unlisted options.
- **Simplicity:** Freeform, no complexity. Just signatures and optional memories.
- **Legacy:** Built for moments that matter—weddings, memorials, graduations, teams.

---

## 2. Target Users

### Primary Users
- **Event organizers** - Weddings, graduations, memorials, corporate events
- **Families** - Creating digital archives of family moments
- **Teams** - Celebrating milestones and departures
- **Communities** - Festivals, fundraisers, meetups

### User Types
1. **Account Owners (Tenants)** - Create spaces, manage settings, view analytics
2. **Guests (Signers)** - Sign spaces without creating accounts
3. **Public Viewers** - Browse public signature spaces (no sign-up required)

---

## 3. Core Features

### 3.1 Multi-Tenant Architecture
- Each account owner gets a unique subdomain (e.g., `wedding2025.echosign.io`)
- Complete data isolation between tenants
- Full control over branding and spaces
- Tenant-level analytics and settings

### 3.2 Signature Spaces
**What is a Space?**
- A signature wall or collection within a tenant's account
- Can be public, private, or unlisted
- Contains multiple signatures and memories
- Each space has a unique slug (e.g., `/graduation-2025`)

**Space Features:**
- Custom name and description
- Visibility controls (who can see/sign)
- Signature count tracking
- Last signed date display
- Easy sharing via URL

### 3.3 Signature Collection
**Signing a Space:**
1. User visits space URL
2. Clicks "Leave Your Signature"
3. Draws signature on canvas
4. (Optional) Adds a memory/message
5. Sets visibility (public/private/unlisted)
6. Signature saved permanently

**What is Captured:**
- Signature image (canvas drawing)
- Optional memory text (up to several hundred words)
- Signer's name
- Timestamp
- Visibility status
- Device/location anonymously tracked

### 3.4 Digital TV Display Mode
**Purpose:** Full-screen presentation mode for events

**Features:**
- Auto-rotating slideshow of signatures
- 5-second interval per signature
- Shows: signature + name + date + memory (if included)
- Keyboard controls:
  - **←/→ arrows:** Manual navigation
  - **Spacebar:** Pause/resume
  - **F key:** Fullscreen toggle
  - **Esc:** Exit
- Mobile and desktop responsive
- Perfect for displaying on TVs, projectors, or large monitors at events

**Use Cases:**
- Event day: Display on TV during wedding/party
- Memorial: Show signatures at tribute event
- Corporate: Company celebration presentation
- Digital frame: Loop on office display

### 3.5 Dashboard (Owner-Only)
**Dashboard Home**
- Space overview grid
- Recent activity summary
- Quick access to all management features

**Space Management**
- Create new spaces
- Edit space details (name, description, visibility)
- View signature count per space
- Delete spaces (with confirmation)

**Signature Management**
- View all signatures in a space
- See who signed, when, and what they said
- Delete individual signatures
- Filter by date or visibility

**Analytics**
- Total spaces created
- Total signatures collected
- Views and sign count per space
- Visitor trends
- Anonymous device/location tracking

**Settings**
- Tenant profile (display name, email)
- Account preferences
- Privacy controls
- Future: Branding customization

### 3.6 Privacy & Visibility Controls

Each signature has visibility status:
- **Public:** Visible to everyone, appears in lists
- **Unlisted:** Only visible via direct link, doesn't appear in lists
- **Private:** Only visible to space owner, hidden from public

Space-level visibility also controlled by owner (public/private/unlisted).

---

## 4. User Journeys

### Journey 1: Event Organizer Creates Space
```
1. Land on landing page (echosign.io)
2. Click "Create Your Wall Now"
3. Sign up → set name, email, subdomain
4. Redirected to subdomain dashboard
5. Create first space → set name, description
6. Get space URL → share with guests
7. Guests start signing
8. Day of event → Click "Digital Display" to show on TV
9. After event → View all signatures, download if needed
```

### Journey 2: Guest Signs Space
```
1. Receive space URL from organizer
2. Open link → see existing signatures
3. Click "Leave Your Signature"
4. Draw signature on canvas
5. Type optional memory
6. Choose visibility (public/private/unlisted)
7. Submit
8. Signature appears on wall immediately
9. Can share link with others
```

### Journey 3: Public Visitor Browses
```
1. Visit echosign.io
2. See marketing information
3. Can view demo or public spaces
4. Click to explore public spaces
5. See all public signatures
6. Optionally sign themselves
```

---

## 5. Data Model

### Tenant
```
{
  id: UUID,
  subdomain: string (unique, e.g., "wedding2025"),
  displayName: string (e.g., "Sarah & John's Wedding"),
  ownerId: string (references User),
  createdAt: timestamp,
  description?: string,
  branding?: {
    coverImage?: URL,
    logoImage?: URL,
    primaryColor?: hex,
    tagline?: string
  }
}
```

### Space
```
{
  id: UUID,
  tenantId: UUID,
  name: string (e.g., "Ceremony"),
  slug: string (URL-friendly, e.g., "ceremony"),
  description?: string,
  visibility: "public" | "private" | "unlisted",
  createdAt: timestamp,
  updatedAt?: timestamp
}
```

### SignatureEntry
```
{
  id: UUID,
  tenantId: UUID,
  spaceId: UUID,
  userId?: UUID (optional, for registered users),
  userName: string (display name, works for guests),
  userEmail?: string,
  signatureData: string (Base64 canvas image),
  memoryText?: string (optional),
  visibility: "public" | "private" | "unlisted",
  createdAt: timestamp,
  deletedAt?: timestamp (soft delete)
}
```

### User
```
{
  id: UUID,
  tenantId: UUID,
  name: string,
  email?: string,
  role: "owner" | "guest",
  createdAt: timestamp
}
```

### AnalyticsEvent
```
{
  id: UUID,
  tenantId: UUID,
  type: string (e.g., "view_space", "sign_space", "view_space_display"),
  timestamp: timestamp,
  metadata: {
    spaceId?: UUID,
    deviceType?: string,
    region?: string,
    visibility?: "public" | "private" | "unlisted"
  }
}
```

---

## 6. Technical Architecture

### Frontend
- **Framework:** Next.js 16 with React 19
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Canvas:** HTML5 Canvas + Signature Pad library
- **UI Components:** Custom + shadcn/ui primitives

### Backend
- **Runtime:** Node.js (Next.js API routes)
- **Database:** In-memory store (expandable to PostgreSQL/Supabase)
- **Auth:** Soft identity (name + email, no passwords)

### Deployment
- **Platform:** Vercel (optimized for Next.js)
- **Storage:** Base64 for signatures (upgradeable to S3)
- **Subdomain Routing:** Vercel middleware

### Architecture Pattern
- Multi-tenant with subdomain isolation
- Client-side rendering with SSR fallback
- Real-time updates via client state
- Analytics event tracking (anonymous)

---

## 7. URL Structure & Navigation

### Public Routes (No Login Required)
```
/                          → Landing page (marketing)
/onboarding                → Signup form
/login                     → Login page
/{space-slug}              → Public space (view & sign)
{subdomain}.echosign.io/   → Tenant homepage (all spaces)
{subdomain}.echosign.io/{space-slug}  → Space on tenant domain
```

### Authenticated Routes (Owner Only)
```
{subdomain}.echosign.io/dashboard              → Dashboard home
{subdomain}.echosign.io/dashboard/spaces       → Manage spaces
{subdomain}.echosign.io/dashboard/entries      → Manage signatures
{subdomain}.echosign.io/dashboard/analytics    → View analytics
{subdomain}.echosign.io/dashboard/settings     → Account settings
```

### Development (Path-based)
```
localhost:3000/tenant/[subdomain]/...  → Subdomain simulation
```

---

## 8. UI Components Library

### Core Components
1. **SignatureCanvas** - Canvas drawing area for signatures
2. **SignatureCard** - Display single signature with metadata
3. **SignWallDialog** - Modal for signing a space
4. **DigitalTVDisplay** - Full-screen slideshow
5. **DigitalTVDialog** - Modal wrapper for TV display
6. **CreateSpaceDialog** - Modal for creating new space
7. **SpaceEditDialog** - Modal for editing space details

### Feature Components
- **TenantWallView** - Tenant homepage showing all spaces
- **DashboardLayout** - Authenticated dashboard wrapper
- **AnalyticsGrid** - Display statistics and trends
- **SpaceGrid** - Grid of space cards

### UI Elements
- Buttons (primary, secondary, danger)
- Input fields (text, email)
- Text areas (for memories)
- Dialogs/Modals
- Progress indicators
- Navigation headers

---

## 9. Key Features in Detail

### Digital TV Display
**What it does:**
- Opens full-screen presentation of all signatures
- Auto-rotates every 5 seconds
- Shows one signature at a time with name, date, memory

**Controls:**
- Mouse: Click previous/next buttons
- Keyboard: Arrow keys, spacebar, F, Esc
- Mobile: Touch buttons

**Perfect for:**
- Live events (wedding reception, party)
- Memorial services
- Team celebrations
- Office displays

**Technical:**
- Canvas rendering
- RequestAnimationFrame for smooth animation
- Responsive to all screen sizes
- No external dependencies beyond React

### Signature Canvas
**What it does:**
- Draw signature with mouse/touch
- Clear and redraw
- Convert to image data

**Uses:**
- Signature Pad library (4.1.7)
- HTML5 Canvas
- Touch events for mobile

### Memory Text
**What it does:**
- Optional personal message from signer
- Displayed on signature card
- Hidden if marked private
- Searchable in admin

**Constraints:**
- Optional (not required to sign)
- Text only (no formatting)
- Up to ~500 characters

---

## 10. Key Workflows

### Creating & Managing a Space

1. **Owner creates space** in dashboard
   - Sets name, slug, description
   - Sets visibility
   - Gets shareable URL

2. **Guests receive link** and sign
   - Open space URL
   - See existing signatures
   - Click "Leave Your Signature"
   - Draw and submit

3. **Signatures appear immediately**
   - Live update on wall
   - Visible to all (if public)
   - Owner can see all (including private)

4. **Event day - Display on TV**
   - Owner clicks "Digital Display"
   - Full-screen slideshow opens
   - Displays on projector/TV
   - Can control with keyboard

5. **After event**
   - Owner reviews all signatures
   - Can delete inappropriate ones
   - Can download if needed (future)
   - Archives permanently

### Analytics & Tracking

**What's tracked (anonymously):**
- View space count
- Sign space count
- Device types
- Regional data (optional)
- Signature visibility distribution

**Privacy:**
- No PII tracked
- No user identification
- Aggregate only
- Visible only to owner

---

## 11. Design System

### Color Palette
- **Primary:** Amber (#b45309, #92400e)
- **Neutral:** Stone (#1f2937, #6b7280, #d1d5db, #f5f3f0)
- **Accents:** Green (success), Red (delete), Blue (info)

### Typography
- **Display Font:** Georgia, serif (headings)
- **Body Font:** Geist Sans, system fonts (body text)
- **Mono Font:** Geist Mono (code)

### Spacing
- Base unit: 4px
- Standard gap: 1rem (16px)
- Padding: 1rem to 2rem
- Margin: 0.5rem to 2rem

### Border Radius
- Small: 4px (buttons, inputs)
- Medium: 8px (cards, dialogs)
- Large: 12px (containers)

### Shadows
- Light: `shadow-sm`
- Medium: `shadow-md`
- Large: `shadow-lg`

### Responsive Breakpoints
- Mobile: < 640px (sm)
- Tablet: 640px - 1024px (md, lg)
- Desktop: > 1024px (xl, 2xl)

---

## 12. Future Roadmap (Post-MVP)

### Phase 2: Enhanced Features
- [ ] Frame templates for exported PDFs
- [ ] Batch download/export signatures
- [ ] Advanced analytics (heatmaps, trends)
- [ ] Collaborative spaces (multiple owners)
- [ ] Custom branding per space
- [ ] Email notifications

### Phase 3: Advanced Features
- [ ] Print partner integration
- [ ] QR codes linking to digital version
- [ ] AI-suggested layouts
- [ ] AR preview (see signatures in real space)
- [ ] Mobile apps (iOS/Android)
- [ ] API for third-party integrations

### Phase 4: Monetization
- [ ] Premium frame templates
- [ ] High-resolution exports
- [ ] Unlimited analytics
- [ ] Priority support
- [ ] Custom domain

---

## 13. Non-MVP Constraints

**Deliberately Not Included (MVP):**
- No likes, comments, or reactions
- No user interactions on signatures
- No search/filter by keyword
- No signature editing after creation
- No bulk actions
- No moderation system (trust-based)
- No theme customization
- No API access
- No duplicate detection

**Rationale:**
These features would complicate the MVP and distract from core use case: preserving authentic memories. Add only when users demand them.

---

## 14. Success Metrics

### Product Metrics
- Spaces created per day
- Average signatures per space
- Signatures per event (by type)
- Digital TV display usage
- Daily active users

### Quality Metrics
- Page load time < 2s
- Canvas drawing responsiveness
- Digital TV smooth animations
- Mobile responsiveness score

### Retention Metrics
- 7-day retention (after space creation)
- 30-day retention
- Signature collection completion rate
- Owner return rate

---

## 15. Accessibility & Performance

### Accessibility
- Keyboard navigation (Digital TV)
- ARIA labels on buttons
- Color contrast WCAG AA minimum
- Mobile touch targets > 44px
- Screen reader compatible

### Performance
- Lazy load images
- Canvas optimization for mobile
- Minimal bundle size
- Smooth animations (60fps target)
- Optimized for 4G networks

---

## 16. Security & Privacy

### Data Protection
- Soft delete (signatures not permanently deleted immediately)
- User controls signature visibility
- No tracking of PII
- HTTPS only
- Subdomain isolation ensures tenant data separation

### Future Security
- Two-factor authentication
- Encryption at rest
- Privacy policy & terms
- GDPR compliance
- Data export on request

---

## 17. Getting Started (Developer)

### Prerequisites
```bash
node v18+
pnpm v10+
```

### Setup
```bash
git clone https://github.com/ellaboevans/echo-sign
cd echo-sign
pnpm install
pnpm dev
```

### Testing
```
# Subdomain: localhost:3000 (no subdomain)
# Space: localhost:3000/[slug]
# Tenant: localhost:3000/tenant/[subdomain]/[slug]
```

### Key Files
```
app/                     → Routes & pages
components/              → React components
lib/                     → Utilities
services/                → Business logic
store/                   → State management
types/                   → TypeScript types
```

---

## 18. Common Questions

**Q: Can signatures be edited?**  
A: No. Signatures are permanent by default. Users can delete their own signature, but not edit.

**Q: What if I want to delete my signature?**  
A: Users can delete their own signatures anytime. Space owners can delete any signature.

**Q: Is this GDPR compliant?**  
A: Planned for Phase 3. Currently, users should be informed that signatures are permanent.

**Q: Can I password-protect a space?**  
A: Not yet. Use "private" or "unlisted" visibility instead. Access control coming in Phase 2.

**Q: How long are signatures stored?**  
A: Forever, unless explicitly deleted. This is by design (permanence is core).

**Q: Can I download all my signatures?**  
A: Planned for Phase 2. Currently, Digital TV display is the presentation option.

**Q: Who owns my data?**  
A: You do. You can delete your space/signatures anytime.

---

## 19. Contact & Support

**Repository:** https://github.com/ellaboevans/echo-sign  
**Author:** Ella Bo Evans  
**Built with:** Next.js, React, Tailwind CSS  

---

**End of Specification**

Signature Directory - Developer Specification (MVP)

1. Overview

A digital signature directory where users can leave signatures + memories in a freeform, user-defined context. Focused on legacy and personal memory, the platform emphasizes simplicity, authenticity, and discovery.

Core Principles:
• Users leave a signature + memory.
• Memories are optional and freeform.
• Users control visibility and sharing.
• Signatures are permanent by default but deletable by users.
• No interaction on signatures; purely visual and archival.

⸻

2. Target Platform
   • Primary: Responsive web (desktop + mobile).
   • Future: Native mobile app.

⸻

3. User Flow
   1. User lands on the homepage.
   2. Homepage displays live feed of recent signatures in a grid/wall layout.
   3. User can create a new space or enter an existing user-created space.
   4. User chooses to sign:
      • Freehand draw signature on canvas.
      • Add optional memory text.
      • Choose visibility (public/private/unlisted).
      • Optionally choose sharing method (link or social platforms).
   5. Signature + memory is saved and displayed in the chosen space.
   6. Users may delete their own memory, but cannot edit after a chosen period (per design: fully editable initially).
   7. Platform tracks detailed anonymous analytics.

⸻

4. Data Model

4.1 User

Field Type Description
id UUID Primary key
name string Alias or display name
email string Optional, for soft identity
created_at datetime Account creation timestamp

4.2 Space

Field Type Description
id UUID Primary key
name string User-created space name
creator_id UUID References User.id
created_at datetime Timestamp
visibility enum public/private/unlisted

4.3 SignatureEntry

Field Type Description
id UUID Primary key
space_id UUID References Space.id
user_id UUID References User.id
signature_data string Base64 or vector data of canvas drawing
memory_text text Optional user memory
visibility enum public/private/unlisted
share_method enum link/social/none
created_at datetime Timestamp
deleted_at datetime Optional deletion timestamp

⸻

5. UI / UX Guidelines
   • Homepage: Live feed grid of latest signatures + memory snippets.
   • Signature canvas: Simple, mobile-friendly drawing area.
   • Memory field: Optional text input.
   • Visibility toggle: Dropdown to select public/private/unlisted.
   • Share options: Optional buttons (link copy / social platforms).
   • Random featured memory: Display one daily in a highlighted section.
   • No likes/comments/reactions — purely archival and visual.

⸻

6. Core Features (MVP)
   1. User onboarding: Soft identity (name + optional email).
   2. Space creation: Users create their own spaces.
   3. Signature entry: Draw signature + optional memory.
   4. Visibility & sharing control per entry.
   5. Live feed grid of recent entries.
   6. Random daily featured memory.
   7. Permanent storage with optional deletion.
   8. Detailed anonymous analytics.

⸻

7. Optional / Future Features
   • Themed spaces or walls.
   • Signature customization (colors, brushes, styles).
   • Search / filter by date or keyword.
   • Collaborative spaces (multiple users contribute to same wall).

⸻

8. Technical Notes
   • Frontend: React / Next.js (SSR possible for SEO), Tailwind CSS for grid layout.
   • Canvas drawing: HTML5 Canvas or third-party library.
   • Backend: Node.js / Express or Next.js API routes.
   • Database: PostgreSQL / Supabase.
   • Storage: Signatures as Base64 or vector SVG in DB or cloud storage.
   • Analytics: Track pageviews, signature count, device, location (anonymous).

⸻

9. Non-MVP Considerations
   • No moderation system for MVP.
   • No interactions (likes/comments) in MVP.
   • No tags/categories for memories.
   • User chooses visibility and sharing; default is user-controlled.

⸻

10. MVP Launch Criteria
    • Users can create spaces and sign with a memory.
    • Live feed displays new signatures in grid layout.
    • Random featured memory updates daily.
    • Users can delete their own entries.
    • Platform tracks basic analytics anonymously.
    • Fully responsive web design.

⸻

End of Specification

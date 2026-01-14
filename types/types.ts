export enum Visibility {
  PUBLIC = "public",
  PRIVATE = "private",
  UNLISTED = "unlisted",
}

export enum UserRole {
  OWNER = "owner",
  GUEST = "guest",
}

// Branding customization for tenant homepage
export interface TenantBranding {
  coverImage?: string; // URL/Base64 image
  logoImage?: string; // URL/Base64 image
  primaryColor?: string; // Hex color: #FF5733
  secondaryColor?: string; // Hex color: #FFC300
  textColor?: string; // Hex color: #000000
  tagline?: string; // Short phrase under tenant name
  footerText?: string; // Custom footer message
}

// Tenant = the wall owner's account
export interface Tenant {
  id: string;
  subdomain: string; // unique, e.g. "cs", "acme"
  displayName: string; // e.g. "Creative Studio"
  ownerId: string; // references User.id
  createdAt: number;
  description?: string;
  branding?: TenantBranding;
}

// Space = a wall or collection within a tenant
export interface Space {
  id: string;
  tenantId: string; // which tenant owns this space
  name: string; // e.g. "Graduation 2025"
  slug: string; // URL-friendly, e.g. "graduation-2025"
  description?: string;
  visibility: Visibility; // public/private/unlisted for the space itself
  createdAt: number;
  updatedAt?: number;
  signatureCount?: number;
  publicCount?: number;
}

// User = either owner or guest who signed
export interface User {
  id: string;
  tenantId: string; // owner belongs to one tenant; guests have null for multi-tenant
  name: string;
  email?: string;
  role: UserRole; // "owner" or "guest"
  createdAt: number;
}

// Signature entry = one person's mark on a space
export interface SignatureEntry {
  id: string;
  tenantId: string; // which tenant
  spaceId: string; // which space/wall they signed
  userId?: string; // owner account ID (null for guests)
  userName: string; // display name (works for both guests & users)
  userEmail?: string; // optional, for guest recovery
  signatureData: string; // Base64 or storage URL
  memoryText?: string;
  visibility: Visibility;
  createdAt: number;
  deletedAt?: number;
}

export interface AnalyticsEvent {
  id: string;
  tenantId: string;
  type: string;
  timestamp: number;
  metadata: unknown & {
    spaceId: string;
  };
}

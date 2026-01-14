import {
  User,
  Tenant,
  Space,
  SignatureEntry,
  Visibility,
  AnalyticsEvent,
} from "@/types/types";
import { generateUUID } from "@/lib/uuid";
import * as storage from "@/lib/storage";

const STORAGE_KEYS = {
  TENANTS: "sig_dir_tenants",
  USERS: "sig_dir_users",
  SPACES: "sig_dir_spaces",
  ENTRIES: "sig_dir_entries",
  ANALYTICS: "sig_dir_analytics",
  CURRENT_TENANT: "sig_dir_current_tenant",
  CURRENT_USER: "sig_dir_current_user",
};

const isClient = typeof globalThis !== "undefined" && typeof globalThis.window !== "undefined";

const get = <T>(key: string, defaultValue: T): T => {
  if (!isClient) return defaultValue;
  const data = storage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const set = <T>(key: string, value: T): void => {
  if (!isClient) return;
  storage.setItem(key, JSON.stringify(value));
};

const remove = (key: string): void => {
  if (!isClient) return;
  storage.removeItem(key);
};

// ============================================
// TENANT OPERATIONS
// ============================================
export const store = {
  // Tenants
  getTenants: () => get<Tenant[]>(STORAGE_KEYS.TENANTS, []),
  
  getTenant: (tenantId: string) => {
    return store.getTenants().find((t) => t.id === tenantId);
  },
  
  getTenantBySubdomain: (subdomain: string) => {
    return store.getTenants().find((t) => t.subdomain === subdomain);
  },
  
  saveTenant: (tenant: Tenant) => {
    const tenants = store.getTenants();
    set(STORAGE_KEYS.TENANTS, [...tenants, tenant]);
    set(STORAGE_KEYS.CURRENT_TENANT, tenant);
  },

  getCurrentTenant: () =>
    get<Tenant | null>(STORAGE_KEYS.CURRENT_TENANT, null),

  setCurrentTenant: (tenant: Tenant) => {
    set(STORAGE_KEYS.CURRENT_TENANT, tenant);
  },

  // ============================================
  // USER OPERATIONS
  // ============================================
  getUsers: () => get<User[]>(STORAGE_KEYS.USERS, []),

  getUsersByTenant: (tenantId: string) => {
    return store.getUsers().filter((u) => u.tenantId === tenantId);
  },

  getUserById: (userId: string) => {
    return store.getUsers().find((u) => u.id === userId);
  },

  saveUser: (user: User) => {
    const users = store.getUsers();
    const existing = users.findIndex((u) => u.id === user.id);
    if (existing >= 0) {
      users[existing] = user;
    } else {
      users.push(user);
    }
    set(STORAGE_KEYS.USERS, users);
  },

  getCurrentUser: () => {
    const user = get<User | null>(STORAGE_KEYS.CURRENT_USER, null);
    
    // Validate that user object has required fields
    if (user && typeof user === 'object' && user.id && user.tenantId) {
      return user;
    }
    
    // If invalid, return null and clear corrupted data
    if (user) {
      remove(STORAGE_KEYS.CURRENT_USER);
    }
    return null;
  },

  setCurrentUser: (user: User) => {
    set(STORAGE_KEYS.CURRENT_USER, user);
  },

  clearCurrentUser: () => {
    remove(STORAGE_KEYS.CURRENT_USER);
  },

  // ============================================
  // SPACE OPERATIONS
  // ============================================
  getSpaces: () => get<Space[]>(STORAGE_KEYS.SPACES, []),

  getSpacesByTenant: (tenantId: string) => {
    return store.getSpaces().filter((s) => s.tenantId === tenantId);
  },

  getSpaceBySlug: (tenantId: string, slug: string) => {
    return store.getSpaces().find((s) => s.tenantId === tenantId && s.slug === slug);
  },

  saveSpace: (space: Space) => {
    const spaces = store.getSpaces();
    const existing = spaces.findIndex((s) => s.id === space.id);
    if (existing >= 0) {
      spaces[existing] = { ...spaces[existing], ...space, updatedAt: Date.now() };
    } else {
      spaces.push(space);
    }
    set(STORAGE_KEYS.SPACES, spaces);
  },

  deleteSpace: (spaceId: string) => {
    const spaces = store.getSpaces();
    set(STORAGE_KEYS.SPACES, spaces.filter((s) => s.id !== spaceId));
  },

  getSpaceStats: (spaceId: string) => {
    const entries = store.getEntriesBySpace(spaceId);
    return {
      signatureCount: entries.length,
      publicCount: entries.filter((e) => e.visibility === Visibility.PUBLIC).length,
    };
  },

  // ============================================
  // SIGNATURE ENTRY OPERATIONS
  // ============================================
  getEntries: () => get<SignatureEntry[]>(STORAGE_KEYS.ENTRIES, []),

  getEntriesByTenant: (tenantId: string) => {
    return store.getEntries().filter((e) => e.tenantId === tenantId);
  },

  getEntriesBySpace: (spaceId: string) => {
    return store.getEntries().filter((e) => e.spaceId === spaceId && !e.deletedAt);
  },

  getPublicEntriesBySpace: (spaceId: string) => {
    return store
      .getEntriesBySpace(spaceId)
      .filter((e) => e.visibility === Visibility.PUBLIC)
      .sort((a, b) => b.createdAt - a.createdAt);
  },

  getPublicEntriesByTenant: (tenantId: string) => {
    return store
      .getEntriesByTenant(tenantId)
      .filter((e) => e.visibility === Visibility.PUBLIC && !e.deletedAt)
      .sort((a, b) => b.createdAt - a.createdAt);
  },

  saveEntry: (entry: SignatureEntry) => {
    const entries = store.getEntries();
    entries.push(entry);
    set(STORAGE_KEYS.ENTRIES, entries);
  },

  deleteEntry: (entryId: string) => {
    const entries = store.getEntries();
    const entry = entries.find((e) => e.id === entryId);
    if (entry) {
      entry.deletedAt = Date.now();
    }
    set(STORAGE_KEYS.ENTRIES, entries);
  },

  // ============================================
  // ANALYTICS
  // ============================================
  getAnalytics: () => get<AnalyticsEvent[]>(STORAGE_KEYS.ANALYTICS, []),

  getAnalyticsByTenant: (tenantId: string) => {
    return store
      .getAnalytics()
      .filter((e) => e.tenantId === tenantId);
  },

  track: (tenantId: string, type: string, metadata: Record<string, unknown> = {}) => {
    if (!isClient) return;
    
    const events = store.getAnalytics();
    const newEvent: AnalyticsEvent = {
      id: generateUUID(),
      tenantId,
      type,
      timestamp: Date.now(),
      metadata: {
        spaceId: "",
        ...metadata,
      },
    };
    set(STORAGE_KEYS.ANALYTICS, [...events, newEvent]);
  },

  // ============================================
  // TENANT STATS (for dashboard)
  // ============================================
  getTenantStats: (tenantId: string) => {
    const entries = store.getEntriesByTenant(tenantId);
    const analytics = store.getAnalyticsByTenant(tenantId);
    
    return {
      totalSignatures: entries.filter((e) => !e.deletedAt).length,
      totalViews: analytics.filter((a) => a.type === "view_wall").length,
      totalSigns: analytics.filter((a) => a.type === "sign_wall").length,
      lastEntry: entries
        .filter((e) => !e.deletedAt)
        .sort((a, b) => b.createdAt - a.createdAt)[0] || null,
    };
  },

  // ============================================
  // FEATURED MEMORY (daily rotation)
  // ============================================
  getFeaturedMemory: (tenantId: string) => {
    const entries = store.getPublicEntriesByTenant(tenantId).filter(e => e.memoryText);
    
    if (entries.length === 0) return null;
    
    // Use date-based seed to show same memory all day
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    const seed = dateString.split('').reduce((acc, char) => acc + (char.codePointAt(0) ?? 0), 0);
    const index = seed % entries.length;
    
    return entries[index] || null;
  },
};

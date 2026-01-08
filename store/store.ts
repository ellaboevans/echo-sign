import {
  User,
  Space,
  SignatureEntry,
  Visibility,
  AnalyticsEvent,
} from "@/types/types";

const STORAGE_KEYS = {
  USERS: "sig_dir_users",
  SPACES: "sig_dir_spaces",
  ENTRIES: "sig_dir_entries",
  ANALYTICS: "sig_dir_analytics",
  CURRENT_USER: "sig_dir_current_user",
};

const get = <T>(key: string, defaultValue: T): T => {
  if (typeof globalThis.window === "undefined") return defaultValue;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const set = <T>(key: string, value: T): void => {
  if (typeof globalThis.window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
};

export const store = {
  getUsers: () => get<User[]>(STORAGE_KEYS.USERS, []),
  saveUser: (user: User) => {
    const users = store.getUsers();
    set(STORAGE_KEYS.USERS, [...users, user]);
    set(STORAGE_KEYS.CURRENT_USER, user);
  },
  getCurrentUser: () => get<User | null>(STORAGE_KEYS.CURRENT_USER, null),
  clearCurrentUser: () => {
    if (typeof globalThis.window !== "undefined") {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },

  getSpaces: () =>
    get<Space[]>(STORAGE_KEYS.SPACES, [
      {
        id: "global-legacy",
        name: "Global Legacy Wall",
        creatorId: "system",
        createdAt: Date.now(),
        visibility: Visibility.PUBLIC,
        description:
          "A shared space for everyone to leave their mark on history.",
      },
    ]),
  saveSpace: (space: Space) => {
    const spaces = store.getSpaces();
    set(STORAGE_KEYS.SPACES, [...spaces, space]);
  },
  getSpace: (id: string) => store.getSpaces().find((s) => s.id === id),

  getEntries: () => get<SignatureEntry[]>(STORAGE_KEYS.ENTRIES, []),
  saveEntry: (entry: SignatureEntry) => {
    const entries = store.getEntries();
    set(STORAGE_KEYS.ENTRIES, [...entries, entry]);
  },
  deleteEntry: (entryId: string) => {
    const entries = store.getEntries().filter((e) => e.id !== entryId);
    set(STORAGE_KEYS.ENTRIES, entries);
  },

  getAnalytics: () => get<AnalyticsEvent[]>(STORAGE_KEYS.ANALYTICS, []),
  track: (type: string, metadata: Record<string, unknown> = {}) => {
    const events = store.getAnalytics();
    const newEvent: AnalyticsEvent = {
      id: crypto.randomUUID(),
      type,
      timestamp: Date.now(),
      metadata: {
        ...metadata,
        userAgent: navigator.userAgent,
        language: navigator.language,
      },
    };
    set(STORAGE_KEYS.ANALYTICS, [...events, newEvent]);
  },
};

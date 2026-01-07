export enum Visibility {
  PUBLIC = "public",
  PRIVATE = "private",
  UNLISTED = "unlisted",
}

export interface User {
  id: string;
  name: string;
  email?: string;
  createdAt: number;
}

export interface Space {
  id: string;
  name: string;
  creatorId: string;
  createdAt: number;
  visibility: Visibility;
  description?: string;
}

export interface SignatureEntry {
  id: string;
  spaceId: string;
  userId: string;
  userName: string;
  signatureData: string; // Base64
  memoryText?: string;
  visibility: Visibility;
  createdAt: number;
  deletedAt?: number;
}

export interface AnalyticsEvent {
  id: string;
  type: string;
  timestamp: number;
  metadata: unknown;
}

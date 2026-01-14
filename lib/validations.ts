import { z } from "zod";
import { Visibility } from "@/types/types";
import { store } from "@/store/store";

/**
 * Validation schemas for all forms in the application
 */

// Subdomain validation - must be URL-safe, 3-30 chars, alphanumeric + dashes
const subdomainSchema = z
  .string()
  .min(3, "Subdomain must be at least 3 characters")
  .max(30, "Subdomain must be no more than 30 characters")
  .regex(
    /^[a-z0-9-]+$/,
    "Subdomain can only contain lowercase letters, numbers, and dashes"
  )
  .refine(
    (val) => !val.startsWith("-") && !val.endsWith("-"),
    "Subdomain cannot start or end with a dash"
  )
  .refine(
    (val) => !val.includes("--"),
    "Subdomain cannot contain consecutive dashes"
  );

// Email validation
const emailSchema = z
  .string()
  .email("Please enter a valid email address")
  .max(255, "Email address is too long")
  .optional()
  .or(z.literal(""));

// Name validation - 1-100 chars, allows most unicode characters
const nameSchema = z
  .string()
  .min(1, "Name is required")
  .max(100, "Name must be no more than 100 characters")
  .trim()
  .refine((val) => val.length > 0, "Name cannot be empty");

// Space name validation - 1-40 chars
const spaceNameSchema = z
  .string()
  .min(1, "Space name is required")
  .max(40, "Space name must be no more than 40 characters")
  .trim()
  .refine((val) => val.length > 0, "Space name cannot be empty");

// Description validation - optional, max 200 chars
const descriptionSchema = z
  .string()
  .max(200, "Description must be no more than 200 characters")
  .optional()
  .or(z.literal(""));

// Memory text validation - optional, max 500 chars
const memoryTextSchema = z
  .string()
  .max(500, "Memory text must be no more than 500 characters")
  .trim()
  .optional()
  .or(z.literal(""));

// Hex color validation - accepts valid hex or empty string
const hexColorSchema = z
  .string()
  .refine(
    (val) => !val || /^#[0-9A-Fa-f]{6}$/.test(val),
    "Must be a valid hex color (e.g., #FF5733)"
  )
  .optional()
  .or(z.literal(""));

// Tagline validation - optional, max 60 chars
const taglineSchema = z
  .string()
  .max(60, "Tagline must be no more than 60 characters")
  .optional()
  .or(z.literal(""));

// Footer text validation - optional, max 200 chars
const footerTextSchema = z
  .string()
  .max(200, "Footer text must be no more than 200 characters")
  .optional()
  .or(z.literal(""));

/**
 * Signup Form Schema
 * Note: Subdomain availability is checked separately in the component
 * since store operations require client-side execution
 */
export const signupSchema = z.object({
  ownerName: nameSchema,
  ownerEmail: emailSchema,
  subdomainName: subdomainSchema,
});

export type SignupFormData = z.infer<typeof signupSchema>;

/**
 * Sign Wall Dialog Schema
 */
export const signWallSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  memory: memoryTextSchema,
  visibility: z.nativeEnum(Visibility, {
    errorMap: () => ({ message: "Please select a visibility option" }),
  }),
  signatureData: z
    .string()
    .min(1, "Please provide a signature")
    .refine(
      (val) => val.startsWith("data:image") || val.length > 100,
      "Please draw your signature before submitting"
    ),
});

export type SignWallFormData = z.infer<typeof signWallSchema>;

/**
 * Create Space Schema
 */
export const createSpaceSchema = z.object({
  name: spaceNameSchema,
  description: descriptionSchema,
  visibility: z.nativeEnum(Visibility, {
    errorMap: () => ({ message: "Please select a visibility option" }),
  }),
});

export type CreateSpaceFormData = z.infer<typeof createSpaceSchema>;

/**
 * Edit Space Schema (same as create)
 */
export const editSpaceSchema = createSpaceSchema;

export type EditSpaceFormData = z.infer<typeof editSpaceSchema>;

/**
 * Settings/Profile Schema
 */
export const settingsSchema = z.object({
  displayName: nameSchema,
  description: descriptionSchema,
  userEmail: emailSchema,
});

export type SettingsFormData = z.infer<typeof settingsSchema>;

/**
 * Tenant Branding Schema
 */
export const brandingSchema = z.object({
  primaryColor: hexColorSchema,
  secondaryColor: hexColorSchema,
  textColor: hexColorSchema,
  tagline: taglineSchema,
  footerText: footerTextSchema,
  coverImage: z
    .string()
    .refine(
      (val) =>
        !val ||
        val.startsWith("data:image") ||
        z.string().url().safeParse(val).success,
      {
        message: "Must be a valid image URL or data URL",
      }
    )
    .optional()
    .or(z.literal("")),
  logoImage: z
    .string()
    .refine(
      (val) =>
        !val ||
        val.startsWith("data:image") ||
        z.string().url().safeParse(val).success,
      {
        message: "Must be a valid image URL or data URL",
      }
    )
    .optional()
    .or(z.literal("")),
});

export type BrandingFormData = z.infer<typeof brandingSchema>;

/**
 * Login Schema
 */
export const loginSchema = z.object({
  subdomain: subdomainSchema,
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Helper function to get field error message
 */
export function getFieldError(
  errors: z.ZodError | null,
  fieldName: string
): string | undefined {
  if (!errors) return undefined;
  const fieldError = errors.errors.find((err) => err.path[0] === fieldName);
  return fieldError?.message;
}

/**
 * Helper function to check if field has error
 */
export function hasFieldError(
  errors: z.ZodError | null,
  fieldName: string
): boolean {
  return !!getFieldError(errors, fieldName);
}

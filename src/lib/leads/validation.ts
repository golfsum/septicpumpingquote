import { z } from "zod";

export const leadAttributionSchema = z.object({
  landingPage: z.string().default(""),
  currentPage: z.string().default(""),
  firstTouchPage: z.string().default(""),
  referrer: z.string().default(""),
  utm_source: z.string().default(""),
  utm_medium: z.string().default(""),
  utm_campaign: z.string().default(""),
  utm_term: z.string().default(""),
  utm_content: z.string().default(""),
  gclid: z.string().default(""),
  fbclid: z.string().default(""),
  sessionId: z.string().default(""),
  visitorId: z.string().default(""),
  deviceType: z
    .enum(["mobile", "desktop", "tablet", "unknown"])
    .default("unknown"),
  gaClientId: z.string().default(""),
  seoPageId: z.string().default(""),
  cityPage: z.string().default(""),
  servicePage: z.string().default(""),
});

function hasValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export const leadCreateSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().max(80).default(""),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .max(40)
    .refine(hasValidPhone, "Enter a valid phone number"),
  email: z.string().trim().email().optional().or(z.literal("")),
  city: z.string().trim().min(1).max(80),
  state: z.string().trim().min(2).max(40),
  zip: z
    .string()
    .trim()
    .regex(/^\d{5}(-\d{4})?$/, "Enter a valid US ZIP code"),
  service: z.string().trim().min(1),
  urgency: z.string().trim().min(1),
  problemDetails: z.record(z.string(), z.any()).default({}),
  freeformNotes: z.string().trim().max(2000).default(""),
  consentContact: z.literal(true, {
    error: "Consent is required to request quotes",
  }),
  honeypot: z.string().max(0).optional().or(z.literal("")),
  attribution: leadAttributionSchema,
});

export type LeadCreatePayload = z.infer<typeof leadCreateSchema>;

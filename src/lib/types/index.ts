export type LeadStatus =
  | "new"
  | "reviewed"
  | "qualified"
  | "contacted"
  | "sent_to_provider"
  | "accepted"
  | "sold"
  | "invalid"
  | "duplicate"
  | "closed";

export type ProviderStatus =
  | "prospect"
  | "contacted"
  | "trial"
  | "active"
  | "paused"
  | "inactive";

export type IndexStatus = "draft" | "noindex" | "indexable";

export type KeywordIntent = "transactional" | "commercial" | "informational";
export type KeywordPriority = "high" | "medium" | "low";

export type DeviceType = "mobile" | "desktop" | "tablet" | "unknown";

export type LeadAttribution = {
  landingPage: string;
  currentPage: string;
  firstTouchPage: string;
  referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
  fbclid: string;
  sessionId: string;
  visitorId: string;
  deviceType: DeviceType;
  gaClientId: string;
  seoPageId: string;
  cityPage: string;
  servicePage: string;
};

export type ProblemDetails = Record<string, string | boolean | string[] | undefined>;

export type Lead = {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  zip: string;
  service: string;
  urgency: string;
  problemDetails: ProblemDetails;
  freeformNotes: string;
  consentContact: boolean;
  status: LeadStatus;
  assignedProviderId: string | null;
  assignedProviderName: string | null;
  adminNotes: string;
  statusHistory: { status: LeadStatus; at: string; note?: string }[];
  attribution: LeadAttribution;
  trafficSource: string;
};

export type LeadCreateInput = Omit<
  Lead,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "status"
  | "assignedProviderId"
  | "assignedProviderName"
  | "adminNotes"
  | "statusHistory"
  | "trafficSource"
> & {
  honeypot?: string;
};

export type Provider = {
  id: string;
  createdAt: string;
  updatedAt: string;
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  website: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  serviceAreaCities: string[];
  serviceAreaZips: string[];
  servicesOffered: string[];
  emergencyService: boolean;
  notes: string;
  active: boolean;
  status: ProviderStatus;
  leadPrice: number | null;
  monthlyCap: number | null;
  dailyCap: number | null;
  preferredContactMethod: "email" | "phone" | "either";
  contactStatus: string;
};

export type ProviderAssignment = {
  id: string;
  leadId: string;
  providerId: string;
  providerName: string;
  sentAt: string;
  acceptedAt: string | null;
  rejectedAt: string | null;
  price: number | null;
  status: "pending" | "sent" | "accepted" | "rejected" | "expired";
  deliveryMethod: "email" | "manual" | "sms";
  notes: string;
};

export type SeoMetricRow = {
  id: string;
  date: string;
  query: string;
  page: string;
  country: string;
  device: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  syncedAt: string;
};

export type KeywordRecord = {
  id: string;
  keyword: string;
  intent: KeywordIntent;
  service: string;
  city: string;
  priority: KeywordPriority;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
  leads: number;
  estimatedValue: number;
  notes: string;
  landingPage: string;
};

export type SiteSettings = {
  consentLanguage: string;
  estimatedLeadValue: number;
  gscProperty: string;
  gscLastSync: string | null;
  ga4MeasurementId: string;
  turnstileEnabled: boolean;
  routingMode: "manual" | "auto_disabled";
};

export type FunnelEvent = {
  id: string;
  createdAt: string;
  sessionId: string;
  visitorId: string;
  event:
    | "quote_form_view"
    | "quote_started"
    | "quote_step_completed"
    | "quote_submitted"
    | "phone_clicked"
    | "service_selected"
    | "location_selected"
    | "cta_clicked"
    | "lead_created";
  step?: string;
  page: string;
  meta?: Record<string, string>;
};

export type OpportunityCategory =
  | "QUICK_WIN"
  | "HIGH_IMPRESSION_LOW_CTR"
  | "RANKING_BUT_NO_LEADS"
  | "LEAD_WINNER"
  | "CONTENT_OPPORTUNITY"
  | "INFORMATIONAL_LOW_VALUE"
  | "MONITOR";

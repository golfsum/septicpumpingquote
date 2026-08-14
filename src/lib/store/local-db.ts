import { promises as fs } from "fs";
import path from "path";
import type {
  FunnelEvent,
  KeywordRecord,
  Lead,
  Provider,
  ProviderAssignment,
  SeoMetricRow,
  SiteSettings,
} from "@/lib/types";

// On Vercel the app filesystem is read-only; use /tmp for the local fallback store.
const DATA_DIR =
  process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME
    ? path.join("/tmp", "septicpumpingquote-data")
    : path.join(process.cwd(), "data");

type LocalDb = {
  leads: Lead[];
  providers: Provider[];
  providerAssignments: ProviderAssignment[];
  seoMetrics: SeoMetricRow[];
  keywords: KeywordRecord[];
  funnelEvents: FunnelEvent[];
  settings: SiteSettings;
  rateLimits: Record<string, number[]>;
};

const defaultSettings: SiteSettings = {
  consentLanguage:
    "I agree to be contacted by phone, text, or email regarding my septic service quote request. Message and data rates may apply. Consent is not a condition of purchase.",
  estimatedLeadValue: 45,
  gscProperty: "sc-domain:septicpumpingquote.com",
  gscLastSync: null,
  ga4MeasurementId: "",
  turnstileEnabled: false,
  routingMode: "manual",
};

const emptyDb = (): LocalDb => ({
  leads: [],
  providers: [],
  providerAssignments: [],
  seoMetrics: [],
  keywords: [],
  funnelEvents: [],
  settings: defaultSettings,
  rateLimits: {},
});

async function ensureDb(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const file = path.join(DATA_DIR, "local-db.json");
  try {
    await fs.access(file);
  } catch {
    await fs.writeFile(file, JSON.stringify(emptyDb(), null, 2), "utf8");
  }
}

async function readDb(): Promise<LocalDb> {
  await ensureDb();
  const file = path.join(DATA_DIR, "local-db.json");
  const raw = await fs.readFile(file, "utf8");
  return { ...emptyDb(), ...JSON.parse(raw) } as LocalDb;
}

async function writeDb(db: LocalDb): Promise<void> {
  await ensureDb();
  const file = path.join(DATA_DIR, "local-db.json");
  await fs.writeFile(file, JSON.stringify(db, null, 2), "utf8");
}

export async function localGetLeads(): Promise<Lead[]> {
  const db = await readDb();
  return db.leads.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function localGetLead(id: string): Promise<Lead | null> {
  const db = await readDb();
  return db.leads.find((l) => l.id === id) || null;
}

export async function localCreateLead(lead: Lead): Promise<Lead> {
  const db = await readDb();
  db.leads.unshift(lead);
  await writeDb(db);
  return lead;
}

export async function localUpdateLead(
  id: string,
  patch: Partial<Lead>,
): Promise<Lead | null> {
  const db = await readDb();
  const idx = db.leads.findIndex((l) => l.id === id);
  if (idx < 0) return null;
  db.leads[idx] = {
    ...db.leads[idx]!,
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  await writeDb(db);
  return db.leads[idx]!;
}

export async function localGetProviders(): Promise<Provider[]> {
  const db = await readDb();
  return db.providers;
}

export async function localCreateProvider(provider: Provider): Promise<Provider> {
  const db = await readDb();
  db.providers.unshift(provider);
  await writeDb(db);
  return provider;
}

export async function localUpdateProvider(
  id: string,
  patch: Partial<Provider>,
): Promise<Provider | null> {
  const db = await readDb();
  const idx = db.providers.findIndex((p) => p.id === id);
  if (idx < 0) return null;
  db.providers[idx] = {
    ...db.providers[idx]!,
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  await writeDb(db);
  return db.providers[idx]!;
}

export async function localGetAssignments(): Promise<ProviderAssignment[]> {
  const db = await readDb();
  return db.providerAssignments;
}

export async function localCreateAssignment(
  assignment: ProviderAssignment,
): Promise<ProviderAssignment> {
  const db = await readDb();
  db.providerAssignments.unshift(assignment);
  await writeDb(db);
  return assignment;
}

export async function localGetSettings(): Promise<SiteSettings> {
  const db = await readDb();
  return db.settings;
}

export async function localUpdateSettings(
  patch: Partial<SiteSettings>,
): Promise<SiteSettings> {
  const db = await readDb();
  db.settings = { ...db.settings, ...patch };
  await writeDb(db);
  return db.settings;
}

export async function localGetSeoMetrics(): Promise<SeoMetricRow[]> {
  const db = await readDb();
  return db.seoMetrics;
}

export async function localSetSeoMetrics(rows: SeoMetricRow[]): Promise<void> {
  const db = await readDb();
  db.seoMetrics = rows;
  await writeDb(db);
}

export async function localGetKeywords(): Promise<KeywordRecord[]> {
  const db = await readDb();
  return db.keywords;
}

export async function localSetKeywords(rows: KeywordRecord[]): Promise<void> {
  const db = await readDb();
  db.keywords = rows;
  await writeDb(db);
}

export async function localAddFunnelEvent(event: FunnelEvent): Promise<void> {
  const db = await readDb();
  db.funnelEvents.push(event);
  await writeDb(db);
}

export async function localGetFunnelEvents(): Promise<FunnelEvent[]> {
  const db = await readDb();
  return db.funnelEvents;
}

export async function localCheckRateLimit(
  key: string,
  max: number,
  windowMs: number,
): Promise<boolean> {
  const db = await readDb();
  const now = Date.now();
  const hits = (db.rateLimits[key] || []).filter((t) => now - t < windowMs);
  if (hits.length >= max) {
    db.rateLimits[key] = hits;
    await writeDb(db);
    return false;
  }
  hits.push(now);
  db.rateLimits[key] = hits;
  await writeDb(db);
  return true;
}

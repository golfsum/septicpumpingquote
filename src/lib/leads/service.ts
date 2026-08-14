import { randomUUID } from "crypto";
import {
  getAdminDb,
  isFirebaseAdminConfigured,
  isFirestoreNotFoundError,
} from "@/lib/firebase/admin";
import {
  localCheckRateLimit,
  localCreateLead,
  localGetLead,
  localGetLeads,
  localUpdateLead,
} from "@/lib/store/local-db";
import type { Lead, LeadCreateInput, LeadStatus } from "@/lib/types";

function deriveTrafficSource(attr: LeadCreateInput["attribution"]): string {
  if (attr.gclid || attr.utm_medium === "cpc" || attr.utm_medium === "paid") {
    return "paid";
  }
  if (attr.utm_source || attr.utm_medium) {
    return attr.utm_source || attr.utm_medium || "campaign";
  }
  const ref = (attr.referrer || "").toLowerCase();
  if (
    ref.includes("google.") ||
    ref.includes("bing.") ||
    ref.includes("yahoo.") ||
    ref.includes("duckduckgo.")
  ) {
    return "organic";
  }
  if (!ref || ref.includes("septicpumpingquote.com")) return "direct";
  return "referral";
}

export async function checkLeadRateLimit(ip: string): Promise<boolean> {
  if (isFirebaseAdminConfigured()) {
    return true;
  }
  return localCheckRateLimit(`lead:${ip}`, 8, 60 * 60 * 1000);
}

export async function createLead(input: LeadCreateInput): Promise<Lead> {
  const now = new Date().toISOString();
  const lead: Lead = {
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
    firstName: input.firstName,
    lastName: input.lastName,
    phone: input.phone,
    email: input.email,
    city: input.city,
    state: input.state,
    zip: input.zip,
    service: input.service,
    urgency: input.urgency,
    problemDetails: input.problemDetails || {},
    freeformNotes: input.freeformNotes || "",
    consentContact: input.consentContact,
    status: "new",
    assignedProviderId: null,
    assignedProviderName: null,
    adminNotes: "",
    statusHistory: [{ status: "new", at: now, note: "Lead created" }],
    attribution: input.attribution,
    trafficSource: deriveTrafficSource(input.attribution),
  };

  try {
    const db = await getAdminDb();
    if (db) {
      await db.collection("leads").doc(lead.id).set(lead);
      return lead;
    }
  } catch (error) {
    console.error("Firestore createLead failed, using local store", error);
    if (!isFirestoreNotFoundError(error)) {
      /* still fall back so quote form works */
    }
  }
  return localCreateLead(lead);
}

export async function listLeads(): Promise<Lead[]> {
  try {
    const db = await getAdminDb();
    if (db) {
      const snap = await db
        .collection("leads")
        .orderBy("createdAt", "desc")
        .get();
      return snap.docs.map((d) => d.data() as Lead);
    }
  } catch (error) {
    console.error("Firestore listLeads failed, using local store", error);
  }
  return localGetLeads();
}

export async function getLead(id: string): Promise<Lead | null> {
  try {
    const db = await getAdminDb();
    if (db) {
      const doc = await db.collection("leads").doc(id).get();
      return doc.exists ? (doc.data() as Lead) : null;
    }
  } catch (error) {
    console.error("Firestore getLead failed, using local store", error);
  }
  return localGetLead(id);
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
  note?: string,
): Promise<Lead | null> {
  const existing = await getLead(id);
  if (!existing) return null;
  const updated: Partial<Lead> = {
    status,
    statusHistory: [
      ...existing.statusHistory,
      { status, at: new Date().toISOString(), note },
    ],
  };
  try {
    const db = await getAdminDb();
    if (db) {
      await db.collection("leads").doc(id).update({
        ...updated,
        updatedAt: new Date().toISOString(),
      });
      return getLead(id);
    }
  } catch (error) {
    console.error("Firestore updateLeadStatus failed, using local store", error);
  }
  return localUpdateLead(id, updated);
}

export async function updateLead(
  id: string,
  patch: Partial<Lead>,
): Promise<Lead | null> {
  try {
    const db = await getAdminDb();
    if (db) {
      await db
        .collection("leads")
        .doc(id)
        .update({ ...patch, updatedAt: new Date().toISOString() });
      return getLead(id);
    }
  } catch (error) {
    console.error("Firestore updateLead failed, using local store", error);
  }
  return localUpdateLead(id, patch);
}

export function leadsToCsv(leads: Lead[]): string {
  const headers = [
    "Date",
    "Name",
    "Phone",
    "Email",
    "City",
    "State",
    "ZIP",
    "Service",
    "Urgency",
    "Source",
    "Landing page",
    "Status",
    "Assigned provider",
  ];
  const rows = leads.map((l) =>
    [
      l.createdAt,
      `${l.firstName} ${l.lastName}`.trim(),
      l.phone,
      l.email,
      l.city,
      l.state,
      l.zip,
      l.service,
      l.urgency,
      l.trafficSource,
      l.attribution.landingPage,
      l.status,
      l.assignedProviderName || "",
    ]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(","),
  );
  return [headers.join(","), ...rows].join("\n");
}

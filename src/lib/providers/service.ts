import { randomUUID } from "crypto";
import { getAdminDb } from "@/lib/firebase/admin";
import {
  localCreateAssignment,
  localCreateProvider,
  localGetAssignments,
  localGetProviders,
  localUpdateProvider,
} from "@/lib/store/local-db";
import type { Lead, Provider, ProviderAssignment } from "@/lib/types";

export type ProviderInput = Omit<Provider, "id" | "createdAt" | "updatedAt">;

export async function listProviders(): Promise<Provider[]> {
  const db = getAdminDb();
  if (db) {
    const snap = await db.collection("providers").orderBy("createdAt", "desc").get();
    return snap.docs.map((d) => d.data() as Provider);
  }
  return localGetProviders();
}

export async function createProvider(input: ProviderInput): Promise<Provider> {
  const now = new Date().toISOString();
  const provider: Provider = {
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
    ...input,
  };
  const db = getAdminDb();
  if (db) {
    await db.collection("providers").doc(provider.id).set(provider);
    return provider;
  }
  return localCreateProvider(provider);
}

export async function updateProvider(
  id: string,
  patch: Partial<Provider>,
): Promise<Provider | null> {
  const db = getAdminDb();
  if (db) {
    await db
      .collection("providers")
      .doc(id)
      .update({ ...patch, updatedAt: new Date().toISOString() });
    const doc = await db.collection("providers").doc(id).get();
    return doc.exists ? (doc.data() as Provider) : null;
  }
  return localUpdateProvider(id, patch);
}

export function matchProvidersForLead(
  lead: Lead,
  providers: Provider[],
): Provider[] {
  const city = lead.city.toLowerCase();
  const zip = lead.zip.slice(0, 5);
  const service = lead.service.toLowerCase();

  return providers.filter((p) => {
    if (!p.active && p.status !== "active" && p.status !== "trial") return false;
    const cityMatch =
      p.serviceAreaCities.some((c) => c.toLowerCase() === city) ||
      p.city.toLowerCase() === city;
    const zipMatch =
      p.serviceAreaZips.length === 0 ||
      p.serviceAreaZips.some((z) => z.startsWith(zip.slice(0, 3)));
    const serviceMatch =
      p.servicesOffered.length === 0 ||
      p.servicesOffered.some(
        (s) =>
          s.toLowerCase() === service ||
          service.includes(s.toLowerCase()) ||
          s.toLowerCase().includes(service),
      );
    return (cityMatch || zipMatch) && serviceMatch;
  });
}

export async function assignLeadToProvider(opts: {
  lead: Lead;
  provider: Provider;
  price?: number | null;
  notes?: string;
}): Promise<ProviderAssignment> {
  const assignment: ProviderAssignment = {
    id: randomUUID(),
    leadId: opts.lead.id,
    providerId: opts.provider.id,
    providerName: opts.provider.companyName,
    sentAt: new Date().toISOString(),
    acceptedAt: null,
    rejectedAt: null,
    price: opts.price ?? opts.provider.leadPrice,
    status: "sent",
    deliveryMethod: "manual",
    notes: opts.notes || "",
  };

  const db = getAdminDb();
  if (db) {
    await db.collection("providerAssignments").doc(assignment.id).set(assignment);
  } else {
    await localCreateAssignment(assignment);
  }
  return assignment;
}

export async function listAssignments(): Promise<ProviderAssignment[]> {
  const db = getAdminDb();
  if (db) {
    const snap = await db
      .collection("providerAssignments")
      .orderBy("sentAt", "desc")
      .get();
    return snap.docs.map((d) => d.data() as ProviderAssignment);
  }
  return localGetAssignments();
}

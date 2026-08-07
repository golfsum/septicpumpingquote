"use client";

import type { DeviceType, LeadAttribution } from "@/lib/types";

const LANDING_KEY = "spq_landing";
const FIRST_TOUCH_KEY = "spq_first_touch";
const SESSION_KEY = "spq_session";
const VISITOR_KEY = "spq_visitor";

function uid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function getParam(name: string): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(name) || "";
}

function detectDevice(): DeviceType {
  if (typeof window === "undefined") return "unknown";
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

function getOrSet(key: string, value: string, storage: Storage): string {
  const existing = storage.getItem(key);
  if (existing) return existing;
  storage.setItem(key, value);
  return value;
}

export function captureAttribution(seoPageId = ""): LeadAttribution {
  if (typeof window === "undefined") {
    return {
      landingPage: "",
      currentPage: "",
      firstTouchPage: "",
      referrer: "",
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_term: "",
      utm_content: "",
      gclid: "",
      fbclid: "",
      sessionId: "",
      visitorId: "",
      deviceType: "unknown",
      gaClientId: "",
      seoPageId,
      cityPage: "",
      servicePage: "",
    };
  }

  const path = window.location.pathname;
  const landing = getOrSet(LANDING_KEY, path, sessionStorage);
  const firstTouch = getOrSet(FIRST_TOUCH_KEY, path, localStorage);
  const sessionId = getOrSet(SESSION_KEY, uid(), sessionStorage);
  const visitorId = getOrSet(VISITOR_KEY, uid(), localStorage);

  const parts = path.split("/").filter(Boolean);
  let cityPage = "";
  let servicePage = "";
  if (parts.length >= 2 && parts[0]?.length === 2) {
    cityPage = `/${parts[0]}/${parts[1]}`;
    if (parts[2]) servicePage = path;
  } else if (parts[0]) {
    servicePage = `/${parts[0]}`;
  }

  let gaClientId = "";
  try {
    const match = document.cookie.match(/_ga=GA\d+\.\d+\.(.+?)(?:;|$)/);
    if (match?.[1]) gaClientId = match[1];
  } catch {
    /* ignore */
  }

  return {
    landingPage: landing,
    currentPage: path,
    firstTouchPage: firstTouch,
    referrer: document.referrer || "",
    utm_source: getParam("utm_source"),
    utm_medium: getParam("utm_medium"),
    utm_campaign: getParam("utm_campaign"),
    utm_term: getParam("utm_term"),
    utm_content: getParam("utm_content"),
    gclid: getParam("gclid"),
    fbclid: getParam("fbclid"),
    sessionId,
    visitorId,
    deviceType: detectDevice(),
    gaClientId,
    seoPageId: seoPageId || path.replace(/^\//, ""),
    cityPage,
    servicePage,
  };
}

export function trackClientEvent(
  event: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return;
  const w = window as Window & {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  };
  if (typeof w.gtag === "function") {
    w.gtag("event", event, params || {});
  }
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}

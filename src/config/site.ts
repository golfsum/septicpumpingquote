export const siteConfig = {
  name: "Septic Pumping Quote",
  domain: "septicpumpingquote.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://septicpumpingquote.com",
  tagline: "Request quotes from septic service professionals in your area.",
  description:
    "Get septic service quotes from local professionals. Compare pumping, repair, inspection, and emergency septic providers serving your area.",
  primaryCta: "Get Septic Quotes",
  secondaryCta: "Find Septic Service Near You",
  email: "hello@septicpumpingquote.com",
  brandColor: "#0F766E",
  brandColorDark: "#115E59",
  accentColor: "#1D4ED8",
} as const;

export const adminNav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/seo", label: "SEO Performance" },
  { href: "/admin/pages", label: "Pages" },
  { href: "/admin/keywords", label: "Keywords" },
  { href: "/admin/locations", label: "Locations" },
  { href: "/admin/providers", label: "Providers" },
  { href: "/admin/routing", label: "Lead Routing" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/settings", label: "Settings" },
] as const;

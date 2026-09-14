import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getIndexableSeoPages } from "@/content/seo-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = getIndexableSeoPages().map((page) => ({
    url: `${siteConfig.url}/${page.slug}`,
    changeFrequency: "weekly" as const,
    priority: page.pageType === "city-service" ? 0.9 : 0.7,
  }));

  const tools: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.url}/tools`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/tools/septic-pumping-frequency-calculator`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}/tools/septic-tank-size-calculator`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/tools/septic-maintenance-schedule`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  return [
    {
      url: siteConfig.url,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/service-areas`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/providers`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/how-it-works`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/about`,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${siteConfig.url}/contact`,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    ...tools,
    ...pages,
  ];
}

import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getIndexableSeoPages } from "@/content/seo-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = getIndexableSeoPages().map((page) => ({
    url: `${siteConfig.url}/${page.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: page.pageType === "city-service" ? 0.9 : 0.7,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/how-it-works`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    ...pages,
  ];
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoPageView } from "@/components/seo/SeoPageView";
import { siteConfig } from "@/config/site";
import {
  getPublishedSeoPages,
  getSeoPage,
} from "@/content/seo-pages";

type Props = { params: Promise<{ slug: string[] }> };

export async function generateStaticParams() {
  return getPublishedSeoPages().map((page) => ({
    slug: page.slug.split("/"),
  }));
}

function cityLabel(value?: string) {
  return (value || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage(slug.join("/"));
  if (!page || !page.published) return {};

  const url = `${siteConfig.url}/${page.slug}`;
  const city = cityLabel(page.city);
  const state = page.state?.toUpperCase();

  let title = page.title.length <= 44 ? `${page.title} | ${siteConfig.name}` : page.title;
  let description = page.metaDescription;

  if (page.pageType === "city" && city && state) {
    title = `Septic Service in ${city}, ${state} | Local Quotes`;
    description = `Find septic pumping, repair, cleaning, installation, and emergency service in ${city}, ${state}. Request quotes from providers serving your area.`;
  } else if (page.pageType === "city-service" && city && state) {
    const service = page.h1.replace(` in ${city}, ${state}`, "");
    title = `${service} in ${city}, ${state} | Local Quotes`;
    description = `Request local ${page.primaryKeyword.toLowerCase()} quotes in ${city}, ${state}. Compare providers serving your area and get help based on access, urgency, and job scope.`;
  }

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots:
      page.indexStatus === "indexable"
        ? { index: true, follow: true }
        : { index: false, follow: false },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
    },
  };
}

export default async function CatchAllSeoPage({ params }: Props) {
  const { slug } = await params;
  const page = getSeoPage(slug.join("/"));
  if (!page || !page.published) notFound();
  return <SeoPageView page={page} />;
}

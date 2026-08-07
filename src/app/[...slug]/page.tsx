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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage(slug.join("/"));
  if (!page || !page.published) return {};
  const url = `${siteConfig.url}/${page.slug}`;
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: url },
    robots:
      page.indexStatus === "indexable"
        ? { index: true, follow: true }
        : { index: false, follow: false },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
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

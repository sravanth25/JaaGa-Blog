import { useEffect } from "react";

interface PageMeta {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

function setMeta(nameOrProperty: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${nameOrProperty}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, nameOrProperty);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function removeMeta(nameOrProperty: string, attr: "name" | "property" = "name") {
  const el = document.querySelector(`meta[${attr}="${nameOrProperty}"]`) as HTMLMetaElement | null;
  if (el) el.remove();
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const DEFAULT_TITLE = "JaaGa Insights";
const DEFAULT_DESCRIPTION = "JaaGa Insights — expert analysis on property documents, land records, and real estate verification in India.";
const DEFAULT_KEYWORDS = "property documents, land records, encumbrance certificate, property verification, India real estate";

export function usePageMeta(meta: PageMeta) {
  useEffect(() => {
    const previousTitle = document.title;

    document.title = meta.title ? meta.title : DEFAULT_TITLE;

    if (meta.description) {
      setMeta("description", meta.description);
    } else {
      removeMeta("description");
    }

    if (meta.keywords) {
      setMeta("keywords", meta.keywords);
    } else {
      removeMeta("keywords");
    }

    if (meta.canonical) {
      setLink("canonical", meta.canonical);
    }

    if (meta.ogTitle) {
      setMeta("og:title", meta.ogTitle, "property");
    } else {
      removeMeta("og:title", "property");
    }

    if (meta.ogDescription) {
      setMeta("og:description", meta.ogDescription, "property");
    } else {
      removeMeta("og:description", "property");
    }

    if (meta.ogImage) {
      setMeta("og:image", meta.ogImage, "property");
    } else {
      removeMeta("og:image", "property");
    }

    if (meta.ogType) {
      setMeta("og:type", meta.ogType, "property");
    } else {
      removeMeta("og:type", "property");
    }

    if (meta.twitterCard) {
      setMeta("twitter:card", meta.twitterCard, "name");
    } else {
      removeMeta("twitter:card");
    }

    if (meta.twitterTitle) {
      setMeta("twitter:title", meta.twitterTitle, "name");
    } else {
      removeMeta("twitter:title");
    }

    if (meta.twitterDescription) {
      setMeta("twitter:description", meta.twitterDescription, "name");
    } else {
      removeMeta("twitter:description");
    }

    if (meta.twitterImage) {
      setMeta("twitter:image", meta.twitterImage, "name");
    } else {
      removeMeta("twitter:image");
    }

    return () => {
      document.title = previousTitle;
    };
  }, [meta.title, meta.description, meta.keywords, meta.canonical, meta.ogTitle, meta.ogDescription, meta.ogImage, meta.ogType, meta.twitterCard, meta.twitterTitle, meta.twitterDescription, meta.twitterImage]);
}

export function useDefaultMeta() {
  usePageMeta({
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    keywords: DEFAULT_KEYWORDS,
  });
}

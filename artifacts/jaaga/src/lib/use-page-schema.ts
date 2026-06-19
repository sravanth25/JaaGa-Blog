import { useEffect } from "react";
import type { Post } from "@/lib/types";

interface FAQItem {
  question: string;
  answer: string;
}

function injectSchema(id: string, data: unknown) {
  const existing = document.getElementById(id) as HTMLScriptElement | null;
  if (existing) {
    existing.remove();
  }
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = id;
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

function removeSchema(id: string) {
  const existing = document.getElementById(id);
  if (existing) existing.remove();
}

function removeAllSchemas() {
  const scripts = document.querySelectorAll('script[type="application/ld+json"]');
  scripts.forEach(s => s.remove());
}

export function useBlogPostSchema(post: Post | null) {
  useEffect(() => {
    if (!post) {
      removeAllSchemas();
      return;
    }

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      image: post.featuredImage
        ? `https://blog.jaaga.ai${post.featuredImage}`
        : undefined,
      author: {
        "@type": "Organization",
        name: "JaaGa Team",
        url: "https://www.jaaga.ai",
      },
      publisher: {
        "@type": "Organization",
        name: "JaaGa",
        logo: {
          "@type": "ImageObject",
          url: "https://ik.imagekit.io/sravanth/Untitled%20design%20(25).png?updatedAt=1773083694403",
        },
      },
      datePublished: new Date(2025, 0, 1).toISOString(),
      url: `https://blog.jaaga.ai/blogs/${post.slug}`,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://blog.jaaga.ai/blogs/${post.slug}`,
      },
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://blog.jaaga.ai/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blogs",
          item: "https://blog.jaaga.ai/blogs",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.metaTitle || post.title,
          item: `https://blog.jaaga.ai/blogs/${post.slug}`,
        },
      ],
    };

    injectSchema("schema-article", articleSchema);
    injectSchema("schema-breadcrumb", breadcrumbSchema);

    return () => {
      removeSchema("schema-article");
      removeSchema("schema-breadcrumb");
    };
  }, [post]);
}

export function useBlogPostFAQSchema(faqs: FAQItem[]) {
  useEffect(() => {
    if (faqs.length === 0) return;

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };

    injectSchema("schema-faq", faqSchema);

    return () => {
      removeSchema("schema-faq");
    };
  }, [faqs]);
}

export function useHomeFAQSchema(faqsLeft: FAQItem[], faqsRight: FAQItem[]) {
  useEffect(() => {
    const allFaqs = [...faqsLeft, ...faqsRight];
    if (allFaqs.length === 0) return;

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: allFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };

    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "JaaGa",
      url: "https://www.jaaga.ai",
      logo: "https://ik.imagekit.io/sravanth/Untitled%20design%20(25).png?updatedAt=1773083694403",
      description:
        "JaaGa provides expert insights and comprehensive services for property audits, legal verification, and digital ownership in India.",
      sameAs: [
        "https://www.jaaga.ai",
        "https://blog.jaaga.ai",
      ],
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "JaaGa Insights",
      url: "https://blog.jaaga.ai/",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://blog.jaaga.ai/blogs?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    };

    injectSchema("schema-faq", faqSchema);
    injectSchema("schema-org", orgSchema);
    injectSchema("schema-website", websiteSchema);

    return () => {
      removeSchema("schema-faq");
      removeSchema("schema-org");
      removeSchema("schema-website");
    };
  }, [faqsLeft, faqsRight]);
}

export function useBreadcrumbSchema(items: { name: string; url: string }[]) {
  useEffect(() => {
    if (items.length === 0) return;

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };

    injectSchema("schema-breadcrumb", breadcrumbSchema);

    return () => {
      removeSchema("schema-breadcrumb");
    };
  }, [items]);
}

export function useWebPageSchema(title: string, description: string) {
  useEffect(() => {
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description: description,
    };

    injectSchema("schema-webpage", webPageSchema);

    return () => {
      removeSchema("schema-webpage");
    };
  }, [title, description]);
}


import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { getPosts } from '@/lib/server/data';
import { blogSEOMap } from '@/lib/blog-seo-data';
import { getPostDate, hasRealPostDate } from '@/lib/utils';

import {categories, services} from '@/lib/data';

import {Badge} from '@/components/ui/badge';
import Link from 'next/link';
import {PostSidebar} from '@/components/blog/post-sidebar';
import {Breadcrumb} from '@/components/common/breadcrumb';
import {Separator} from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { BlogPostCard } from '@/components/blog/blog-post-card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
  params: Promise<{slug: string}>;
};

export async function generateStaticParams() {
  const posts = getPosts();
  console.log("generateStaticParams - found posts:", posts.length, "slugs:", posts.map(p => p.slug));
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const posts = getPosts();
  const awaitedParams = await params;
  const post = posts.find(p => p.slug === awaitedParams.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const seo = blogSEOMap[awaitedParams.slug];
  const pageTitle = seo ? seo.title : post.metaTitle;
  const pageDesc = seo ? seo.description : post.metaDescription;
  const pageKeywords = seo ? seo.keywords : post.keywords;
  const imageAlt = (post as any).featuredImageAlt || pageTitle;

  const images = post.featuredImage
    ? [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ]
    : [
        {
          url: 'https://ik.imagekit.io/jaaga/ChatGPT%20Image%20Jan%205,%202026,%2011_05_39%20AM.png',
          width: 1200,
          height: 630,
          alt: 'JaaGa Insights',
        },
      ];

  return {
    title: {
      absolute: pageTitle,
    },
    description: pageDesc,
    alternates: {
      canonical: `https://blog.jaaga.ai/blogs/${post.slug}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      type: 'article',
      url: `https://blog.jaaga.ai/blogs/${post.slug}`,
      images: images,
      siteName: 'JaaGa',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDesc,
      images: [images[0].url],
    },
  };
}

export default async function BlogPostPage({params}: Props) {
  const posts = getPosts();
  const awaitedParams = await params;
  const post = posts.find(p => p.slug === awaitedParams.slug);

  if (!post) {
    notFound();
  }

  const seo = blogSEOMap[awaitedParams.slug];
  const h1Text = seo ? seo.h1 : post.title;
  const pageDesc = seo ? seo.description : post.metaDescription;
  const pageKeywords = seo ? seo.keywords : post.keywords;
  const imageAlt = (post as any).featuredImageAlt || h1Text;

  const category = categories.find(c => c.slug === post.category);
  const breadcrumbItems = [
    {label: 'Home', href: '/'},
    {label: 'Blogs', href: '/blogs'},
    {label: h1Text, href: `/blogs/${post.slug}`},
  ];

  const relatedPosts = posts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  // Dates: only show a published date when the post ID is a real timestamp.
  const publishedDate = getPostDate(post.id, post.title, post.slug);
  const showPublished = hasRealPostDate(post.id);
  const updatedDate = post.updatedAt ? new Date(post.updatedAt) : null;
  const hasUpdate =
    !!updatedDate && !isNaN(updatedDate.getTime()) &&
    updatedDate.getTime() - publishedDate.getTime() > 24 * 60 * 60 * 1000;
  const modifiedDate = hasUpdate ? updatedDate! : publishedDate;
  const formatDate = (d: Date) =>
    d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' });

  // Official sources: curated per post, plus government links cited in the content.
  const sourceMap = new Map<string, { name: string; url: string }>();
  for (const src of seo?.sources ?? []) sourceMap.set(new URL(src.url).hostname, src);
  for (const m of post.content.matchAll(/<a[^>]+href="(https?:\/\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
    try {
      const host = new URL(m[1]).hostname;
      if (!/\.(gov|nic)\.in$/.test(host) || sourceMap.has(host)) continue;
      const label = m[2].replace(/<[^>]+>/g, '').trim();
      sourceMap.set(host, { name: label && label.length < 80 ? label : host, url: m[1] });
    } catch {}
  }
  const officialSources = [...sourceMap.values()];

  const jaagaAuthor = {
    "@type": "Organization",
    "name": "JaaGa",
    "url": "https://www.jaaga.ai",
    "logo": "https://ik.imagekit.io/jaaga/Untitled%20design%20(2).jpg",
    "description": "JaaGa is an Indian real estate legal intelligence platform that helps owners, buyers and banks access and verify property documents and land records.",
    "sameAs": [
      "https://www.linkedin.com/company/jaagaai/",
      "https://x.com/Jaaga_ai",
      "https://www.instagram.com/jaaga.ai/",
      "https://www.youtube.com/@jaagaapp"
    ]
  };

  // Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": h1Text,
    "description": pageDesc,
    "image": post.featuredImage || 'https://ik.imagekit.io/jaaga/ChatGPT%20Image%20Jan%205,%202026,%2011_05_39%20AM.png',
    "author": jaagaAuthor,
    "publisher": {
      "@type": "Organization",
      "name": "JaaGa",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ik.imagekit.io/jaaga/Untitled%20design%20(2).jpg"
      }
    },
    "datePublished": publishedDate.toISOString().split('T')[0],
    "dateModified": modifiedDate.toISOString().split('T')[0],
    "url": `https://blog.jaaga.ai/blogs/${post.slug}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://blog.jaaga.ai/blogs/${post.slug}`
    },
    "keywords": pageKeywords
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://blog.jaaga.ai${item.href}`
    }))
  };

  // FAQ Schema Logic
  let faqSchema: any = null;
  let extraSchemas: any[] = [];

  if (post.faqs && post.faqs.length > 0) {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": post.faqs.map((f: any) => ({
        "@type": "Question",
        "name": f.question || f.name,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer || f.acceptedAnswer?.text
        }
      }))
    };
  }

  // Handle explicit custom schemas or FAQ schema object if attached
  if ((post as any).schema) {
    extraSchemas.push((post as any).schema);
  }
  if ((post as any).extraSchema) {
    if (Array.isArray((post as any).extraSchema)) {
      extraSchemas.push(...(post as any).extraSchema);
    } else {
      extraSchemas.push((post as any).extraSchema);
    }
  }

  // Extract embedded JSON-LD scripts from post content so they are safely rendered in head/page
  const scriptRegex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
  let scriptMatch;
  while ((scriptMatch = scriptRegex.exec(post.content)) !== null) {
    try {
      const parsed = JSON.parse(scriptMatch[1]);
      extraSchemas.push(parsed);
    } catch (e) {
      console.error("Failed to parse embedded LD+JSON schema:", e);
    }
  }

  const faqEntities = faqSchema?.mainEntity || [];

  // Strip duplicate headers (h1 or similar h2)
  let cleanedContent = post.content.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "");
  const h2Match = cleanedContent.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  if (h2Match) {
    const h2Text = h2Match[1].replace(/<[^>]*>/g, "").trim().toLowerCase();
    const cleanTitle = h1Text.toLowerCase().trim();
    if (
      cleanTitle.includes(h2Text) ||
      h2Text.includes(cleanTitle) ||
      cleanTitle.replace(/[^a-z0-9]/g, "").slice(0, 30) === h2Text.replace(/[^a-z0-9]/g, "").slice(0, 30)
    ) {
      cleanedContent = cleanedContent.replace(/<h2[^>]*>[\s\S]*?<\/h2>/i, "");
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {extraSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      
      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        <article className="lg:col-span-2 bg-background p-4 sm:p-8 rounded-xl shadow-md">
          <header className="space-y-4 mb-8">
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex justify-between items-center">
              <div>
                {category && (
                  <Link href={`/category/${category.slug}`}>
                    <Badge variant="default">{category.name}</Badge>
                  </Link>
                )}
                <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tighter mt-2">
                  {h1Text}
                </h1>
                <p className="mt-3 text-sm text-muted-foreground">
                  By{' '}
                  <Link href="/about" className="font-semibold text-foreground hover:underline">
                    JaaGa
                  </Link>
                  {showPublished && (
                    <>
                      {' · '}Published <time dateTime={publishedDate.toISOString().split('T')[0]}>{formatDate(publishedDate)}</time>
                    </>
                  )}
                  {hasUpdate && (
                    <>
                      {' · '}Updated <time dateTime={updatedDate!.toISOString().split('T')[0]}>{formatDate(updatedDate!)}</time>
                    </>
                  )}
                </p>
              </div>
            </div>
          </header>

          {seo?.quickAnswer && (
            <section
              aria-labelledby="quick-answer-heading"
              className="mb-8 rounded-xl border border-primary/20 border-l-4 border-l-primary bg-primary/5 p-5"
            >
              <h2 id="quick-answer-heading" className="font-headline text-lg font-bold mb-2">
                Quick answer
              </h2>
              <p className="text-foreground leading-relaxed">{seo.quickAnswer}</p>
            </section>
          )}

          {post.featuredImage && !cleanedContent.includes(post.featuredImage) && (
            <div className="relative w-full rounded-xl overflow-hidden mb-8 border border-border shadow-sm bg-muted/10">
              <img
                src={post.featuredImage}
                alt={imageAlt}
                className="w-full h-auto object-contain block"
              />
            </div>
          )}

          <div
              className="prose prose-lg max-w-none text-foreground prose-h2:font-headline prose-h2:font-bold prose-h3:font-headline prose-h3:font-bold prose-a:text-primary hover:prose-a:underline prose-headings:font-headline prose-headings:font-bold prose-p:text-foreground prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: cleanedContent }}
            />

          {officialSources.length > 0 && (
            <section className="mt-12 rounded-xl border border-border bg-muted/30 p-5">
              <h2 className="font-headline text-xl font-bold mb-3">Official sources</h2>
              <ul className="list-disc pl-5 space-y-1">
                {officialSources.map(src => (
                  <li key={src.url}>
                    <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {src.name}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-muted-foreground">
                Government portals change their layouts and rules from time to time. Always confirm details on the official portal before acting.
              </p>
            </section>
          )}
          
          {faqEntities.length > 0 && (
            <section className="mt-12 space-y-6">
              <h2 className="font-headline text-2xl font-bold">FAQs</h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqEntities.map((faq: any, index: number) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border rounded-lg px-4 bg-card shadow-sm border-b-0 transition-all hover:border-primary/20"
                  >
                    <AccordionTrigger className="hover:no-underline text-left font-semibold py-4">
                      {faq.name}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                      {faq.acceptedAnswer.text}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          )}

          <section className="mt-12 flex gap-4 rounded-xl border border-border p-5" aria-label="About the author">
            <img
              src="https://ik.imagekit.io/jaaga/Untitled%20design%20(2).jpg"
              alt="JaaGa logo"
              width={56}
              height={56}
              className="h-14 w-14 shrink-0 rounded-full object-cover"
            />
            <div>
              <p className="font-headline text-lg font-bold">About JaaGa</p>
              <p className="mt-1 text-muted-foreground leading-relaxed">
                JaaGa is an Indian real estate legal intelligence platform. We combine legal expertise with digital tools to help owners, buyers, lawyers and banks get property documents and land records, verify title, and audit properties across Telangana, Andhra Pradesh, Karnataka, Tamil Nadu, Maharashtra and Odisha.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                This guide is for general information and is not legal advice. For a specific property, consult a qualified lawyer.
              </p>
              <Link href="/about" className="mt-2 inline-block text-sm font-semibold text-primary hover:underline">
                More about JaaGa
              </Link>
            </div>
          </section>

          <div className="mt-8">
             <Button asChild className="bg-[#153568] hover:bg-[#0f284f] text-white">
                <Link href="https://www.jaaga.ai/" target="_blank" rel="noopener noreferrer">
                  Visit Our Website
                </Link>
              </Button>
          </div>

          <Separator className="my-12" />

          {relatedPosts.length > 0 && (
            <section className="space-y-8">
              <h2 className="font-headline text-2xl font-bold">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map(rp => (
                  <BlogPostCard key={rp.id} post={rp} />
                ))}
              </div>
            </section>
          )}

          <Separator className="my-12" />

          <section className="space-y-8">
            <h2 className="font-headline text-2xl font-bold">Explore All Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts
                .filter(p => p.slug !== post.slug)
                .sort((a, b) => (b.id || 0) - (a.id || 0))
                .map(op => (
                  <BlogPostCard key={op.id} post={op} />
                ))}
            </div>
          </section>

          <Separator className="my-8" />

          <div className="space-y-2">
            <h3 className="font-headline font-bold text-lg">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </article>

        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-8">
            <PostSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

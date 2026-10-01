
import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { getPosts } from '@/lib/server/data';
import { blogSEOMap } from '@/lib/blog-seo-data';
import { getPostDate } from '@/lib/utils';

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
  params: {slug: string};
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

  // Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": h1Text,
    "description": pageDesc,
    "image": post.featuredImage || 'https://ik.imagekit.io/jaaga/ChatGPT%20Image%20Jan%205,%202026,%2011_05_39%20AM.png',
    "author": {
      "@type": "Organization",
      "name": "JaaGa",
      "url": "https://www.jaaga.ai"
    },
    "publisher": {
      "@type": "Organization",
      "name": "JaaGa",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ik.imagekit.io/jaaga/Untitled%20design%20(2).jpg"
      }
    },
    "datePublished": getPostDate(post.id, post.title, post.slug).toISOString().split('T')[0],
    "dateModified": getPostDate(post.id, post.title, post.slug).toISOString().split('T')[0],
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
              </div>
            </div>
          </header>

          {post.featuredImage && !cleanedContent.includes(post.featuredImage) && (
            <div className="relative w-full aspect-[16/9] max-h-[440px] rounded-xl overflow-hidden mb-8 border border-border shadow-sm">
              <img
                src={post.featuredImage}
                alt={imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div
              className="prose prose-lg max-w-none text-foreground prose-h2:font-headline prose-h2:font-bold prose-h3:font-headline prose-h3:font-bold prose-a:text-primary hover:prose-a:underline prose-headings:font-headline prose-headings:font-bold prose-p:text-foreground prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: cleanedContent }}
            />
          
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

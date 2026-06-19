import { useEffect, useState } from "react";
import BlogListClient from "@/components/blog/blog-list-client";
import { fetchBlogs } from "@/lib/api";
import type { Post } from "@/lib/types";
import { usePageMeta } from "@/lib/use-page-meta";
import { useWebPageSchema } from "@/lib/use-page-schema";

export default function BlogsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  usePageMeta({
    title: "JaaGa Insights: Property Documents & Guides | JaaGa",
    description: "Your source for expert analysis on how to download Encumbrance Certificate (EC), Adangal ROR, FMB Sketch, and other essential land records in India.",
    keywords: "property documents, land records, encumbrance certificate, property guides, India real estate",
    canonical: "https://blog.jaaga.ai/blogs",
    ogTitle: "JaaGa Insights: Property Documents & Guides",
    ogDescription: "Expert analysis on property documents, land records, and real estate verification in India.",
    ogType: "website",
  });

  useWebPageSchema(
    "JaaGa Insights: Property Documents & Guides",
    "Your source for expert analysis on how to download Encumbrance Certificate (EC), Adangal ROR, FMB Sketch, and other essential land records in India."
  );

  useEffect(() => {
    fetchBlogs().then(data => {
      const sorted = [...data].sort((a, b) => (b.id || 0) - (a.id || 0));
      setPosts(sorted);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 md:py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">
          JaaGa Insights: Property Documents & Guides
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Your source for expert analysis on how to download Encumbrance Certificate (EC), Adangal ROR, FMB Sketch, and other essential land records in India.
        </p>
      </div>
      {loading ? (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">Loading articles...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">No blog posts found at the moment. Please check back later.</p>
        </div>
      ) : (
        <BlogListClient posts={posts} />
      )}
    </div>
  );
}

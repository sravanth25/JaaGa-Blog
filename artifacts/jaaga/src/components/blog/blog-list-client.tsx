'use client';

import { useState, useMemo, useEffect } from "react";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X, RotateCcw, Sparkles, Filter } from "lucide-react";
import { searchPosts, POPULAR_SEARCH_TOPICS } from "@/lib/search-utils";
import { categories } from "@/lib/data";
import type { Post } from "@/lib/types";

export default function BlogListClient({ posts }: { posts: Post[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Read ?q= / ?search= after load. Using useSearchParams here would stop the
  // post list from being included in the page HTML that search engines read.
  useEffect(() => {
    const readQuery = () => {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q') ?? params.get('search');
      if (q !== null) setSearchQuery(q);
    };
    readQuery();
    window.addEventListener('popstate', readQuery);
    return () => window.removeEventListener('popstate', readQuery);
  }, []);

  // Post bodies are not sent with the page; load the search text the first
  // time someone searches, then search titles, tags and full text as before.
  const [searchText, setSearchText] = useState<Record<string, string> | null>(null);
  const wantsSearch = searchQuery.trim().length > 0;
  useEffect(() => {
    if (!wantsSearch || searchText) return;
    let cancelled = false;
    fetch("/search-index.json")
      .then(res => (res.ok ? res.json() : {}))
      .then(data => { if (!cancelled) setSearchText(data); })
      .catch(() => { if (!cancelled) setSearchText({}); });
    return () => { cancelled = true; };
  }, [wantsSearch, searchText]);

  const searchablePosts = useMemo(() => {
    if (!searchText) return posts;
    return posts.map(post => ({ ...post, content: searchText[post.slug] ?? post.content }));
  }, [posts, searchText]);

  // 1. Filter by category first if one is selected
  const categoryFilteredPosts = useMemo(() => {
    if (selectedCategory === "all") return searchablePosts;
    return searchablePosts.filter(post => post.category === selectedCategory);
  }, [selectedCategory, searchablePosts]);

  // 2. Apply smart multi-token search with scoring & synonyms
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) {
      return categoryFilteredPosts;
    }
    return searchPosts(searchQuery, categoryFilteredPosts);
  }, [searchQuery, categoryFilteredPosts]);

  const handleClear = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  const handleTopicClick = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="space-y-8">
      {/* Search Input Box */}
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search by topic, state, Act, or keyword (e.g. ULC, 22-A, EC, Property Tax)..."
            className="w-full pl-11 pr-10 h-13 text-base rounded-xl border-border/80 shadow-sm focus-visible:ring-primary/30"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Escape") {
                setSearchQuery("");
              }
            }}
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Clear search"
              aria-label="Clear search query"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Popular Trending Topics */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1 font-medium text-foreground">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            Popular:
          </span>
          {POPULAR_SEARCH_TOPICS.map(topic => (
            <button
              key={topic.query}
              type="button"
              onClick={() => handleTopicClick(topic.query)}
              className={`px-2.5 py-1 rounded-full border transition-colors ${
                searchQuery.toLowerCase().includes(topic.query.toLowerCase())
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/40 hover:bg-muted border-border/60 text-foreground"
              }`}
            >
              {topic.label}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
          <span className="flex items-center gap-1 text-muted-foreground font-medium shrink-0">
            <Filter className="h-3.5 w-3.5" />
            Category:
          </span>
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-lg border font-medium transition-all shrink-0 ${
              selectedCategory === "all"
                ? "bg-foreground text-background border-foreground shadow-sm"
                : "bg-background text-muted-foreground hover:text-foreground border-border/70 hover:bg-muted/50"
            }`}
          >
            All Categories ({posts.length})
          </button>
          {categories.map(cat => {
            const count = posts.filter(p => p.category === cat.slug).length;
            if (count === 0) return null;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-lg border font-medium transition-all shrink-0 ${
                  selectedCategory === cat.slug
                    ? "bg-foreground text-background border-foreground shadow-sm"
                    : "bg-background text-muted-foreground hover:text-foreground border-border/70 hover:bg-muted/50"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Results summary bar when query or category filter is active */}
        {(searchQuery.trim() || selectedCategory !== "all") && (
          <div className="flex items-center justify-between text-sm py-2 px-3 rounded-lg bg-muted/40 border border-border/60">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-muted-foreground">
                Showing <strong>{filteredPosts.length}</strong> {filteredPosts.length === 1 ? "article" : "articles"}
              </span>
              {searchQuery.trim() && (
                <Badge variant="secondary" className="gap-1 font-normal">
                  query: <strong>"{searchQuery.trim()}"</strong>
                  <X
                    className="h-3 w-3 cursor-pointer ml-1 hover:text-foreground"
                    onClick={() => setSearchQuery("")}
                  />
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="gap-1 font-normal">
                  category: <strong>{categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}</strong>
                  <X
                    className="h-3 w-3 cursor-pointer ml-1 hover:text-foreground"
                    onClick={() => setSelectedCategory("all")}
                  />
                </Badge>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-7 text-xs gap-1 text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset all
            </Button>
          </div>
        )}
      </div>

      {/* Blog Cards Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, i) => (
            <BlogPostCard key={post.id || post.slug} post={post} priority={i < 3} />
          ))}
        </div>
      ) : (
        /* Empty State with Helpful Next Steps */
        <div className="text-center py-16 px-4 max-w-lg mx-auto border border-dashed rounded-2xl border-border bg-card/50">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4 text-muted-foreground">
            <Search className="h-6 w-6" />
          </div>
          <h3 className="font-headline text-xl font-bold mb-2">No matching articles found</h3>
          <p className="text-sm text-muted-foreground mb-6">
            We couldn't find any guides matching <strong className="text-foreground">"{searchQuery}"</strong>
            {selectedCategory !== "all" ? ` in ${categories.find(c => c.slug === selectedCategory)?.name}` : ""}.
          </p>

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Try searching for popular property topics:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {POPULAR_SEARCH_TOPICS.slice(0, 5).map(topic => (
                <button
                  key={topic.query}
                  type="button"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery(topic.query);
                  }}
                  className="text-xs px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 transition-colors"
                >
                  {topic.label}
                </button>
              ))}
            </div>

            <div className="pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClear}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Clear search & view all articles
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

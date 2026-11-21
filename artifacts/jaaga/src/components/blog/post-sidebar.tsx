

'use client';

import Link from 'next/link';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Search} from 'lucide-react';
import {categories} from '@/lib/data';
import { useState } from 'react';

export function PostSidebar({ categoryCounts = {} }: { categoryCounts?: Record<string, number> }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Counts are computed at build time and passed in, instead of downloading every post.
  const getCategoryCount = (slug: string) => categoryCounts[slug] ?? 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Full navigation so the Blogs page always starts with this search.
      window.location.href = `/blogs?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <aside className="space-y-8">
      <div className="space-y-2">
        <h3 className="font-headline text-xl font-semibold">Search</h3>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Find an article..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <Button type="submit" size="icon" variant="secondary" title="Search">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </form>
      </div>

      <div className="space-y-3">
        <h3 className="font-headline text-xl font-semibold">Categories</h3>
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category.slug}>
              <Link
                href={`/category/${category.slug}`}
                className="flex justify-between items-center p-2 rounded-md hover:bg-accent/20 transition-colors text-muted-foreground hover:text-primary"
              >
                <span>{category.name}</span>
                <span>({getCategoryCount(category.slug)})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

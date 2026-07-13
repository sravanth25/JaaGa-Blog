import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion, Home, ArrowLeft, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: '404 - Page Not Found | JaaGa Insights',
  description: 'The page you are looking for could not be found. Explore our latest property insights, guides, and land record resources.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center bg-background">
      <div className="max-w-md mx-auto space-y-6">
        {/* Animated icon container */}
        <div className="relative flex items-center justify-center w-24 h-24 mx-auto rounded-full bg-muted text-primary/80 animate-bounce">
          <FileQuestion className="w-12 h-12" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-destructive"></span>
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight font-headline lg:text-5xl text-foreground">
            Page Not Found
          </h1>
          <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
            Error Code: 404 (Soft-404 Mitigation Active)
          </p>
        </div>

        <p className="text-base text-muted-foreground max-w-sm mx-auto">
          The link you followed may be broken, or the article might have been renamed or removed to maintain accuracy.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
          <Button asChild variant="default" className="w-full sm:w-auto font-medium">
            <Link href="/" className="flex items-center justify-center gap-2">
              <Home className="w-4 h-4" />
              Go to Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full sm:w-auto font-medium">
            <Link href="/blogs" className="flex items-center justify-center gap-2">
              <BookOpen className="w-4 h-4" />
              Explore All Blogs
            </Link>
          </Button>
        </div>

        {/* Quick Links Section */}
        <div className="pt-8 border-t border-muted">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
            Popular Guides & Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left text-sm max-w-sm mx-auto">
            <Link href="/blogs/tamil-nadu-land-records-complete-guide" className="p-2.5 rounded-lg hover:bg-muted text-foreground font-medium transition-colors border border-transparent hover:border-muted flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              Tamil Nadu Land Records
            </Link>
            <Link href="/blogs/how-to-research-land-in-telangana" className="p-2.5 rounded-lg hover:bg-muted text-foreground font-medium transition-colors border border-transparent hover:border-muted flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              Telangana Land Research
            </Link>
            <Link href="/blogs/how-to-prove-legal-ownership-of-a-property-complete-guide-india-2025" className="p-2.5 rounded-lg hover:bg-muted text-foreground font-medium transition-colors border border-transparent hover:border-muted flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              Legal Ownership Guide
            </Link>
            <Link href="/blogs/understanding-satbara-7-12-utara-land-records-maharashtra" className="p-2.5 rounded-lg hover:bg-muted text-foreground font-medium transition-colors border border-transparent hover:border-muted flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              Maharashtra 7/12 Satbara
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export function AdsteraAd() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isIframe = window.self !== window.top;
      const isDev = 
        window.location.hostname === 'localhost' || 
        window.location.hostname.includes('127.0.0.1') || 
        window.location.hostname.includes('.run.app') ||
        window.location.hostname.includes('aistudio.google');
      
      // Only load ad if we are in a non-iframe production/staging environment
      if (!isIframe && !isDev) {
        setShouldLoad(true);
      }
    }
  }, []);

  if (!shouldLoad) {
    return (
      <div className="my-8 py-4 px-6 border border-dashed border-muted rounded-lg flex items-center justify-center text-xs text-muted-foreground bg-muted/20">
        [Ad Space - Container Active]
      </div>
    );
  }

  return (
    <div className="my-8 flex justify-center w-full">
      <div id="container-9ad02d1769b89f0b2108560d87d5e33f"></div>
      <Script 
        src="https://pl28784533.effectivegatecpm.com/9ad02d1769b89f0b2108560d87d5e33f/invoke.js"
        strategy="afterInteractive"
        data-cfasync="false"
      />
    </div>
  );
}

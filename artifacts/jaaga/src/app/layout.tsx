import type {Metadata} from 'next';
import './globals.css';
import 'react-quill/dist/quill.snow.css';
import {Header} from '@/components/common/header';
import {Footer} from '@/components/common/footer';
import {Toaster} from '@/components/ui/toaster';
import {AuthProvider} from '@/context/auth-context';
import { ChatbotPopup } from '@/components/chatbot/chatbot-popup';

const pageTitle = 'JaaGa: Download Encumbrance Certificate (EC), Adangal ROR, FMB Sketch Online';
const pageDescription = 'Access property documents online with JaaGa. Learn how to download EC, Adangal ROR, FMB Sketch, 7/12 Utara, and other land records quickly and securely.';
const pageKeywords = [
    'Property Documents Online',
    'Encumbrance Certificate EC',
    'Adangal ROR',
    'FMB Sketch',
    'Tamil Nadu Land Records',
    'Telangana Property Documents',
    'Andhra Pradesh Property Records',
    'Karnataka RTC',
    'Maharashtra 7/12 Utara',
    'Sale Deed Copy',
    'Khata Certificate',
    'Mutation Record',
    'Property Audit Report',
    'Legal Opinion',
    'Property Title Verification',
    'Land Record Search',
    'EC Download',
    'Property Verification Online',
    'Digital Land Records',
    'Kaveri EC',
    'Landeed',
    'EC CC documents',
    'Kaveri Documents',
    'Certified Copy',
    'patta',
    'patta download',
    'patta online',
    'ec telangana',
    'tslr extract',
    'old land records in andhra pradesh',
    'nakal copy',
    'ec for land in tamilnadu online',
    'legal heir certificate online maharashtra',
    'certified true copy of property documents online chennai',
    'pattadar passbook telangana',
    'fmb sketch download',
    'bhu bharati ec',
    'cc copy telangana',
    'a register',
    'adangal andhra pradesh',
    'e khata download',
    'encumbrance certificate ap',
    'ap ec download',
    'ec in telangana',
    'tn land survey village map',
    'igrs telangana',
    'telangana registration',
    'telangana ec search',
    'dharani telangana',
    'lrs telangana',
    'pahani telangana',
    'ror 1b telangana',
    'telangana land records',
    'village map with survey numbers in telangana',
    'telangana land registration',
    'prohibited properties telangana',
    'ec download telangana',
    'igrs telangana ec',
    'telangana land details',
    'sro telangana',
    'encumbrance certificate online telangana',
    'ccla telangana',
    'telangana market value'
];

export const metadata: Metadata = {
  metadataBase: new URL('https://blog.jaaga.ai'),
  title: {
    default: pageTitle,
    template: '%s - JaaGa Insights',
  },
  description: pageDescription,
  keywords: pageKeywords,
  icons: {
    icon: 'https://ik.imagekit.io/jaaga/Untitled%20design%20(2).jpg',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: {
      default: pageTitle,
      template: '%s - JaaGa Insights',
    },
    description: pageDescription,
    url: 'https://blog.jaaga.ai',
    siteName: 'JaaGa',
    images: [
      {
        url: 'https://ik.imagekit.io/jaaga/ChatGPT%20Image%20Jan%205,%202026,%2011_05_39%20AM.png',
        width: 1200,
        height: 630,
        alt: 'JaaGa - Digital Property Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: ['https://ik.imagekit.io/jaaga/ChatGPT%20Image%20Jan%205,%202026,%2011_05_39%20AM.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "JaaGa",
    "url": "https://www.jaaga.ai",
    "logo": "https://ik.imagekit.io/jaaga/Untitled%20design%20(2).jpg",
    "sameAs": [
      "https://www.linkedin.com/company/jaagaai/",
      "https://www.facebook.com/people/JaaGa-AI/61552907515347/",
      "https://x.com/Jaaga_ai",
      "https://www.instagram.com/jaaga.ai/",
      "https://www.youtube.com/@jaagaapp"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-8885166880",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "te", "hi"]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "JaaGa",
    "alternateName": ["Jaaga AI", "Jaaga Insights"],
    "url": "https://blog.jaaga.ai"
  };

  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function shouldSuppress(e) {
                  if (!e) return false;
                  // Suppress generic DOM Events (which serialize to {"isTrusted":true}) from being captured as fatal errors
                  if (typeof Event !== 'undefined' && e instanceof Event && !(typeof ErrorEvent !== 'undefined' && e instanceof ErrorEvent)) {
                    return true;
                  }
                  // Suppress element-level resource load errors (scripts, images, links)
                  if (e.target && e.target !== window && (e.target.tagName || e.srcElement)) {
                    return true;
                  }
                  // Suppress cross-origin Script error
                  if (e.message === 'Script error.' || (e.error && typeof e.error.message === 'string' && e.error.message.includes('Script error'))) {
                    return true;
                  }
                  // Suppress benign ResizeObserver errors
                  if (typeof e.message === 'string' && e.message.includes('ResizeObserver')) {
                    return true;
                  }
                  // Suppress events with isTrusted but no actual error message
                  if (e.isTrusted && !e.message && !e.error) {
                    return true;
                  }
                  return false;
                }

                window.addEventListener('error', function(e) {
                  if (shouldSuppress(e)) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    return true;
                  }
                }, true);

                window.addEventListener('unhandledrejection', function(e) {
                  if (!e) return;
                  var r = e.reason;
                  if (!r || (typeof Event !== 'undefined' && r instanceof Event) || (r && r.isTrusted) || (typeof r === 'string' && r.includes('Script error')) || (r && typeof r.message === 'string' && r.message.includes('Script error'))) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    return true;
                  }
                }, true);
              })();
            `
          }}
        />
        <meta name="google-site-verification" content="DXQ8v30NfhIWCK_BWdbspTx-6Jpi1TjsWvFbTytJhBI" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <ChatbotPopup />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

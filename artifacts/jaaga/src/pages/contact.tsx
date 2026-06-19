import { ProfessionalConnect } from "@/components/ui/get-in-touch";
import { usePageMeta } from "@/lib/use-page-meta";
import { useWebPageSchema } from "@/lib/use-page-schema";

export default function ContactPage() {
  usePageMeta({
    title: "Contact JaaGa | Connect With Us",
    description: "Get in touch with JaaGa for property document services, land records, and real estate verification support in India.",
    keywords: "contact JaaGa, property documents, land records, real estate support",
    canonical: "https://blog.jaaga.ai/contact",
    ogTitle: "Contact JaaGa | Connect With Us",
    ogDescription: "Get in touch with JaaGa for property document services and real estate verification support.",
    ogType: "website",
  });

  useWebPageSchema(
    "Contact JaaGa | Connect With Us",
    "Get in touch with JaaGa for property document services, land records, and real estate verification support in India."
  );

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <ProfessionalConnect />
      </div>
    </div>
  );
}

import { ProfessionalConnect } from "@/components/ui/get-in-touch";
import { usePageMeta } from "@/lib/use-page-meta";
import { useWebPageSchema } from "@/lib/use-page-schema";

export default function ContactUsPage() {
  usePageMeta({
    title: "Contact Us | JaaGa Insights",
    description: "Get in touch with JaaGa for property document services, land records, and real estate verification support in India.",
    keywords: "contact JaaGa, property documents, land records, real estate support",
    canonical: "https://blog.jaaga.ai/contact-us",
    ogTitle: "Contact Us | JaaGa Insights",
    ogDescription: "Get in touch with JaaGa for property document services and real estate verification support.",
    ogType: "website",
  });

  useWebPageSchema(
    "Contact Us | JaaGa Insights",
    "Get in touch with JaaGa for property document services, land records, and real estate verification support in India."
  );

  return (
    <div className="bg-background text-foreground">
      <ProfessionalConnect />
    </div>
  );
}

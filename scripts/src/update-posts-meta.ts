import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const metadata = [
  {
    "slug": "tamil-nadu-land-records-complete-guide",
    "primary_keyword": "Tamil Nadu land records",
    "title_tag": "Tamil Nadu Land Records: Patta Chitta EC and FMB Guide",
    "meta_description": "Learn how Tamil Nadu land records work, including Patta, Chitta, EC, FMB sketch, A-Register, sale deed checks, and property verification steps.",
    "canonical_url": "https://blog.jaaga.ai/blogs/tamil-nadu-land-records-complete-guide",
    "og_title": "Tamil Nadu Land Records: Patta Chitta EC and FMB Guide",
    "og_description": "Learn how Tamil Nadu land records work, including Patta, Chitta, EC, FMB sketch, A-Register, sale deed checks, and property verification steps.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "karnataka-khata-extract-complete-guide-property-owners",
    "primary_keyword": "Karnataka Khata extract",
    "title_tag": "Karnataka Khata Extract: Complete Guide for Property Owners",
    "meta_description": "Learn what a Karnataka Khata Extract is, why it matters for property ownership, and how owners can verify Khata details before a transaction.",
    "canonical_url": "https://blog.jaaga.ai/blogs/karnataka-khata-extract-complete-guide-property-owners",
    "og_title": "Karnataka Khata Extract: Complete Guide for Property Owners",
    "og_description": "Learn what a Karnataka Khata Extract is, why it matters for property ownership, and how owners can verify Khata details before a transaction.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "property-card-online-7-12-download-maharashtra",
    "primary_keyword": "Maharashtra property card download",
    "title_tag": "Maharashtra Property Card and 7/12 Download Guide",
    "meta_description": "Download Maharashtra Property Card, 7/12 Utara, Ferfar, 8A extract, Bhunaksha, village map, CTS records, and EC details online.",
    "canonical_url": "https://blog.jaaga.ai/blogs/property-card-online-7-12-download-maharashtra",
    "og_title": "Maharashtra Property Card and 7/12 Download Guide",
    "og_description": "Download Maharashtra Property Card, 7/12 Utara, Ferfar, 8A extract, Bhunaksha, village map, CTS records, and EC details online.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "how-to-research-land-in-telangana",
    "primary_keyword": "how to research land in Telangana",
    "title_tag": "How to Research Land in Telangana Before Buying Property",
    "meta_description": "Learn how to research land in Telangana, verify ownership, check EC, survey details, land records, legal risks, and avoid property disputes.",
    "canonical_url": "https://blog.jaaga.ai/blogs/how-to-research-land-in-telangana",
    "og_title": "How to Research Land in Telangana Before Buying Property",
    "og_description": "Learn how to research land in Telangana, verify ownership, check EC, survey details, land records, legal risks, and avoid property disputes.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "red-flags-property-documents-lawyers-must-never-miss",
    "primary_keyword": "property document red flags",
    "title_tag": "15 Property Document Red Flags Lawyers Should Never Miss",
    "meta_description": "Review key red flags in property documents, including title gaps, EC issues, survey mismatches, mutation errors, and legal due diligence risks.",
    "canonical_url": "https://blog.jaaga.ai/blogs/red-flags-property-documents-lawyers-must-never-miss",
    "og_title": "15 Property Document Red Flags Lawyers Should Never Miss",
    "og_description": "Review key red flags in property documents, including title gaps, EC issues, survey mismatches, mutation errors, and legal due diligence risks.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "title-search-report-and-legal-opinion-guide",
    "primary_keyword": "title search report legal opinion",
    "title_tag": "Title Search Report and Legal Opinion: 9 Key Checks",
    "meta_description": "Learn how a title search report and legal opinion help lawyers verify ownership, detect encumbrances, reduce risk, and support property deals.",
    "canonical_url": "https://blog.jaaga.ai/blogs/title-search-report-and-legal-opinion-guide",
    "og_title": "Title Search Report and Legal Opinion: 9 Key Checks",
    "og_description": "Learn how a title search report and legal opinion help lawyers verify ownership, detect encumbrances, reduce risk, and support property deals.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "rera-has-become-a-shield-for-defaulting-builders-not-homebuyers-supreme-court-flags-institutional-failure",
    "primary_keyword": "RERA builder default cases",
    "title_tag": "Supreme Court on RERA and Builder Default Cases",
    "meta_description": "Understand the Supreme Court's concerns about RERA, builder defaults, homebuyer protection, and the risks buyers should check before purchase.",
    "canonical_url": "https://blog.jaaga.ai/blogs/rera-has-become-a-shield-for-defaulting-builders-not-homebuyers-supreme-court-flags-institutional-failure",
    "og_title": "Supreme Court on RERA and Builder Default Cases",
    "og_description": "Understand the Supreme Court's concerns about RERA, builder defaults, homebuyer protection, and the risks buyers should check before purchase.",
    "schema_type": "NewsArticle"
  },
  {
    "slug": "download-telangana-ec-ror-pahani-jaaga-app",
    "primary_keyword": "Telangana EC ROR Pahani download",
    "title_tag": "Download Telangana EC ROR and Pahani Using JaaGa App",
    "meta_description": "Learn how to download Telangana EC, RoR, Pahani, and land records using JaaGa, and when each document is needed for property verification.",
    "canonical_url": "https://blog.jaaga.ai/blogs/download-telangana-ec-ror-pahani-jaaga-app",
    "og_title": "Download Telangana EC ROR and Pahani Using JaaGa App",
    "og_description": "Learn how to download Telangana EC, RoR, Pahani, and land records using JaaGa, and when each document is needed for property verification.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "telangana-government-core-urban-act-cure-ghmc-replacement",
    "primary_keyword": "Core Urban Region Economy Telangana",
    "title_tag": "Telangana Core Urban Act CURE: GHMC Replacement Guide",
    "meta_description": "Learn what Telangana's Core Urban Act CURE means, why it may replace GHMC rules, and how it affects urban governance and property owners.",
    "canonical_url": "https://blog.jaaga.ai/blogs/telangana-government-core-urban-act-cure-ghmc-replacement",
    "og_title": "Telangana Core Urban Act CURE: GHMC Replacement Guide",
    "og_description": "Learn what Telangana's Core Urban Act CURE means, why it may replace GHMC rules, and how it affects urban governance and property owners.",
    "schema_type": "NewsArticle"
  },
  {
    "slug": "encumbrance-certificate-guide-india",
    "primary_keyword": "encumbrance certificate",
    "title_tag": "Encumbrance Certificate EC: Complete Guide for Property Buyers",
    "meta_description": "Learn what an Encumbrance Certificate is, why EC matters in property transactions, and how to download EC online across Indian states.",
    "canonical_url": "https://blog.jaaga.ai/blogs/encumbrance-certificate-guide-india",
    "og_title": "Encumbrance Certificate EC: Complete Guide for Property Buyers",
    "og_description": "Learn what an Encumbrance Certificate is, why EC matters in property transactions, and how to download EC online across Indian states.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "how-to-download-encumbrance-certificate-ec-in-telangana",
    "primary_keyword": "EC Telangana",
    "title_tag": "EC Telangana: Download Encumbrance Certificate Online",
    "meta_description": "Download Telangana EC online, check IGRS and Bhu Bharati details, understand what an encumbrance certificate shows, and verify property records.",
    "canonical_url": "https://blog.jaaga.ai/blogs/how-to-download-encumbrance-certificate-ec-in-telangana",
    "og_title": "EC Telangana: Download Encumbrance Certificate Online",
    "og_description": "Download Telangana EC online, check IGRS and Bhu Bharati details, understand what an encumbrance certificate shows, and verify property records.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "adangal-ror-1b-land-records-guide",
    "primary_keyword": "ROR full form",
    "title_tag": "ROR Full Form: Adangal 1B and Land Records Explained",
    "meta_description": "Learn ROR full form, what Adangal and 1B mean in land records, what each document shows, and how to verify ownership details online.",
    "canonical_url": "https://blog.jaaga.ai/blogs/adangal-ror-1b-land-records-guide",
    "og_title": "ROR Full Form: Adangal 1B and Land Records Explained",
    "og_description": "Learn ROR full form, what Adangal and 1B mean in land records, what each document shows, and how to verify ownership details online.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "fmb-sketch-in-tamil-nadu-how-to-view-download-check-fmb-map-online-complete-guide-2026",
    "primary_keyword": "FMB sketch Tamil Nadu",
    "title_tag": "FMB Sketch Tamil Nadu: View Download and Check FMB Map",
    "meta_description": "Learn how to view, download, and verify an FMB sketch in Tamil Nadu, check survey details, and understand what the FMB map shows.",
    "canonical_url": "https://blog.jaaga.ai/blogs/fmb-sketch-in-tamil-nadu-how-to-view-download-check-fmb-map-online-complete-guide-2026",
    "og_title": "FMB Sketch Tamil Nadu: View Download and Check FMB Map",
    "og_description": "Learn how to view, download, and verify an FMB sketch in Tamil Nadu, check survey details, and understand what the FMB map shows.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "what-is-investment-property-selection-and-why-it-matters",
    "primary_keyword": "investment property selection",
    "title_tag": "Investment Property Selection: How to Choose the Right Property",
    "meta_description": "Learn what investment property selection means, why it matters, and how buyers can evaluate risk, location, documents, and long-term returns.",
    "canonical_url": "https://blog.jaaga.ai/blogs/what-is-investment-property-selection-and-why-it-matters",
    "og_title": "Investment Property Selection: How to Choose the Right Property",
    "og_description": "Learn what investment property selection means, why it matters, and how buyers can evaluate risk, location, documents, and long-term returns.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "bhu-aadhaar-ulpin-guide",
    "primary_keyword": "Bhu Aadhaar ULPIN",
    "title_tag": "Bhu Aadhaar ULPIN: 14 Digit Land Parcel ID Explained",
    "meta_description": "Learn what Bhu Aadhaar or ULPIN is, how the 14 digit land parcel ID works, why it matters, and how it supports land record verification.",
    "canonical_url": "https://blog.jaaga.ai/blogs/bhu-aadhaar-ulpin-guide",
    "og_title": "Bhu Aadhaar ULPIN: 14 Digit Land Parcel ID Explained",
    "og_description": "Learn what Bhu Aadhaar or ULPIN is, how the 14 digit land parcel ID works, why it matters, and how it supports land record verification.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "what-is-sale-deed-and-what-is-sale-agreement",
    "primary_keyword": "sale deed vs sale agreement",
    "title_tag": "Sale Deed vs Sale Agreement: Meaning and Key Differences",
    "meta_description": "Understand sale deed and sale agreement meanings, legal differences, types, link documents, and why they matter in property transactions.",
    "canonical_url": "https://blog.jaaga.ai/blogs/what-is-sale-deed-and-what-is-sale-agreement",
    "og_title": "Sale Deed vs Sale Agreement: Meaning and Key Differences",
    "og_description": "Understand sale deed and sale agreement meanings, legal differences, types, link documents, and why they matter in property transactions.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "buying-property-in-parents-name-india",
    "primary_keyword": "buying property in parents name",
    "title_tag": "Buying Property in Parents Name in India: Risks and Tips",
    "meta_description": "Understand legal, tax, inheritance, and ownership risks before buying property in your parents' name in India, plus safer alternatives.",
    "canonical_url": "https://blog.jaaga.ai/blogs/buying-property-in-parents-name-india",
    "og_title": "Buying Property in Parents Name in India: Risks and Tips",
    "og_description": "Understand legal, tax, inheritance, and ownership risks before buying property in your parents' name in India, plus safer alternatives.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "title-verification-legal-opinion-guide",
    "primary_keyword": "title verification legal opinion",
    "title_tag": "Title Verification and Legal Opinion: Property Safety Guide",
    "meta_description": "Learn how title verification and legal opinion reports protect property buyers, what documents are checked, and when to request legal review.",
    "canonical_url": "https://blog.jaaga.ai/blogs/title-verification-legal-opinion-guide",
    "og_title": "Title Verification and Legal Opinion: Property Safety Guide",
    "og_description": "Learn how title verification and legal opinion reports protect property buyers, what documents are checked, and when to request legal review.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "bhu-bharati-portal-scam-telangana",
    "primary_keyword": "Bhu Bharati portal scam Telangana",
    "title_tag": "Bhu Bharati Portal Scam Telangana: What Property Owners Must Know",
    "meta_description": "Understand the Bhu Bharati portal scam in Telangana, how digital land record fraud happens, and what property owners should verify.",
    "canonical_url": "https://blog.jaaga.ai/blogs/bhu-bharati-portal-scam-telangana",
    "og_title": "Bhu Bharati Portal Scam Telangana: What Property Owners Must Know",
    "og_description": "Understand the Bhu Bharati portal scam in Telangana, how digital land record fraud happens, and what property owners should verify.",
    "schema_type": "NewsArticle"
  },
  {
    "slug": "what-is-a-khata-bangalore",
    "primary_keyword": "A Khata Bangalore",
    "title_tag": "A Khata Bangalore: Meaning Eligibility and B Khata Difference",
    "meta_description": "Learn what A Khata means in Bangalore, how it differs from B Khata, eligibility rules, benefits, and why it matters for property owners.",
    "canonical_url": "https://blog.jaaga.ai/blogs/what-is-a-khata-bangalore",
    "og_title": "A Khata Bangalore: Meaning Eligibility and B Khata Difference",
    "og_description": "Learn what A Khata means in Bangalore, how it differs from B Khata, eligibility rules, benefits, and why it matters for property owners.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "how-to-download-maharashtra-8a-agriculture-document-on-jaaga",
    "primary_keyword": "Maharashtra 8A extract download",
    "title_tag": "How to Download Maharashtra 8A Agriculture Document Online",
    "meta_description": "Learn how to download Maharashtra 8A agriculture document using village, division, and survey details, and why the 8A extract matters.",
    "canonical_url": "https://blog.jaaga.ai/blogs/how-to-download-maharashtra-8a-agriculture-document-on-jaaga",
    "og_title": "How to Download Maharashtra 8A Agriculture Document Online",
    "og_description": "Learn how to download Maharashtra 8A agriculture document using village, division, and survey details, and why the 8A extract matters.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "how-to-download-maharashtra-property-card-using-jaaga-app",
    "primary_keyword": "Maharashtra property card",
    "title_tag": "How to Download Maharashtra Property Card Using JaaGa App",
    "meta_description": "Learn how to download a Maharashtra Property Card using JaaGa App, enter city survey details, CTS number, village, and verify records.",
    "canonical_url": "https://blog.jaaga.ai/blogs/how-to-download-maharashtra-property-card-using-jaaga-app",
    "og_title": "How to Download Maharashtra Property Card Using JaaGa App",
    "og_description": "Learn how to download a Maharashtra Property Card using JaaGa App, enter city survey details, CTS number, village, and verify records.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "document-translation-for-property-documents",
    "primary_keyword": "property document translation",
    "title_tag": "Property Document Translation: Certified Legal Translation Guide",
    "meta_description": "Translate sale deeds, property papers, and legal documents accurately for banks, courts, and government offices with certified support.",
    "canonical_url": "https://blog.jaaga.ai/blogs/document-translation-for-property-documents",
    "og_title": "Property Document Translation: Certified Legal Translation Guide",
    "og_description": "Translate sale deeds, property papers, and legal documents accurately for banks, courts, and government offices with certified support.",
    "schema_type": "Service"
  },
  {
    "slug": "what-is-legal-opinion-and-why-its-crucial-for-property-buyers-in-india",
    "primary_keyword": "legal opinion for property",
    "title_tag": "What Is Legal Opinion for Property? 7 Reasons Buyers Need It",
    "meta_description": "Learn what a legal opinion is, why property buyers need it, what lawyers check, and how it reduces ownership and title risks.",
    "canonical_url": "https://blog.jaaga.ai/blogs/what-is-legal-opinion-and-why-its-crucial-for-property-buyers-in-india",
    "og_title": "What Is Legal Opinion for Property? 7 Reasons Buyers Need It",
    "og_description": "Learn what a legal opinion is, why property buyers need it, what lawyers check, and how it reduces ownership and title risks.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "how-to-download-odisha-plot-map-bhunaksha-simple-and-fast-using-jaaga",
    "primary_keyword": "Odisha plot map Bhunaksha",
    "title_tag": "How to Download Odisha Plot Map Bhunaksha Online",
    "meta_description": "Learn how to download Odisha Plot Map or Bhunaksha online using village, Khatiyan, and plot details, and verify land boundaries.",
    "canonical_url": "https://blog.jaaga.ai/blogs/how-to-download-odisha-plot-map-bhunaksha-simple-and-fast-using-jaaga",
    "og_title": "How to Download Odisha Plot Map Bhunaksha Online",
    "og_description": "Learn how to download Odisha Plot Map or Bhunaksha online using village, Khatiyan, and plot details, and verify land boundaries.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "karnataka-khata-extract-how-to-download-khata-online-using-jaaga-portal",
    "primary_keyword": "download Khata online Karnataka",
    "title_tag": "Karnataka Khata Extract: Download Khata Online Using JaaGa",
    "meta_description": "Learn how to download Karnataka Khata Extract online using JaaGa, enter village or division and Khata number, and verify property details.",
    "canonical_url": "https://blog.jaaga.ai/blogs/karnataka-khata-extract-how-to-download-khata-online-using-jaaga-portal",
    "og_title": "Karnataka Khata Extract: Download Khata Online Using JaaGa",
    "og_description": "Learn how to download Karnataka Khata Extract online using JaaGa, enter village or division and Khata number, and verify property details.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "is-your-dream-home-a-legal-trap-how-to-avoid-real-estate-fraud-in-telangana",
    "primary_keyword": "real estate fraud Telangana",
    "title_tag": "Avoid Real Estate Fraud in Telangana Before Buying Property",
    "meta_description": "Learn how to spot land scams and legal traps in Telangana, check property documents, and use a property audit before buying a home.",
    "canonical_url": "https://blog.jaaga.ai/blogs/is-your-dream-home-a-legal-trap-how-to-avoid-real-estate-fraud-in-telangana",
    "og_title": "Avoid Real Estate Fraud in Telangana Before Buying Property",
    "og_description": "Learn how to spot land scams and legal traps in Telangana, check property documents, and use a property audit before buying a home.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "key-points-to-check-before-buying-property-in-telangana",
    "primary_keyword": "buying property in Telangana",
    "title_tag": "Buying Property in Telangana: Key Checks Before You Buy",
    "meta_description": "Check RERA, title, EC, land records, approvals, survey details, and property audit points before buying land, a flat, or villa in Telangana.",
    "canonical_url": "https://blog.jaaga.ai/blogs/key-points-to-check-before-buying-property-in-telangana",
    "og_title": "Buying Property in Telangana: Key Checks Before You Buy",
    "og_description": "Check RERA, title, EC, land records, approvals, survey details, and property audit points before buying land, a flat, or villa in Telangana.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "must-known-facts-before-registering-property-in-telangana-a-complete-guide-by-jaaga",
    "primary_keyword": "property registration Telangana",
    "title_tag": "Property Registration in Telangana: Key Facts Before You Register",
    "meta_description": "Learn key facts before registering property in Telangana, including stamp duty, document verification, legal checks, and ownership safety.",
    "canonical_url": "https://blog.jaaga.ai/blogs/must-known-facts-before-registering-property-in-telangana-a-complete-guide-by-jaaga",
    "og_title": "Property Registration in Telangana: Key Facts Before You Register",
    "og_description": "Learn key facts before registering property in Telangana, including stamp duty, document verification, legal checks, and ownership safety.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "how-to-download-andhra-pradesh-certified-copy-online-using-jaaga",
    "primary_keyword": "Andhra Pradesh certified copy online",
    "title_tag": "Andhra Pradesh Certified Copy: Download Online Using JaaGa",
    "meta_description": "Learn how to download Andhra Pradesh certified copy online using SRO, document number, and registration year, with property record checks.",
    "canonical_url": "https://blog.jaaga.ai/blogs/how-to-download-andhra-pradesh-certified-copy-online-using-jaaga",
    "og_title": "Andhra Pradesh Certified Copy: Download Online Using JaaGa",
    "og_description": "Learn how to download Andhra Pradesh certified copy online using SRO, document number, and registration year, with property record checks.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "tamil-nadu-fmb-sketch-guide",
    "primary_keyword": "Tamil Nadu FMB sketch",
    "title_tag": "Tamil Nadu FMB Sketch: Download via JaaGa and TN e-Services",
    "meta_description": "Learn how to download Tamil Nadu FMB Sketch through JaaGa or TN e-Services using village, land type, survey number, and subdivision details.",
    "canonical_url": "https://blog.jaaga.ai/blogs/tamil-nadu-fmb-sketch-guide",
    "og_title": "Tamil Nadu FMB Sketch: Download via JaaGa and TN e-Services",
    "og_description": "Learn how to download Tamil Nadu FMB Sketch through JaaGa or TN e-Services using village, land type, survey number, and subdivision details.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "jaaga-property-registration-services-one-stop-solution",
    "primary_keyword": "property registration services",
    "title_tag": "Property Registration Services in India: JaaGa One Stop Guide",
    "meta_description": "Learn how JaaGa property registration services support document checks, online coordination, expert guidance, secure payments, and registration.",
    "canonical_url": "https://blog.jaaga.ai/blogs/jaaga-property-registration-services-one-stop-solution",
    "og_title": "Property Registration Services in India: JaaGa One Stop Guide",
    "og_description": "Learn how JaaGa property registration services support document checks, online coordination, expert guidance, secure payments, and registration.",
    "schema_type": "Service"
  },
  {
    "slug": "understanding-satbara-7-12-utara-land-records-maharashtra",
    "primary_keyword": "Satbara 7/12 Maharashtra",
    "title_tag": "Satbara 7/12 Utara Maharashtra: Land Records Explained",
    "meta_description": "Learn what Satbara 7/12 Utara means, how Maharashtra land records work, and how 8A, Ferfar, Bhunaksha, and property cards connect.",
    "canonical_url": "https://blog.jaaga.ai/blogs/understanding-satbara-7-12-utara-land-records-maharashtra",
    "og_title": "Satbara 7/12 Utara Maharashtra: Land Records Explained",
    "og_description": "Learn what Satbara 7/12 Utara means, how Maharashtra land records work, and how 8A, Ferfar, Bhunaksha, and property cards connect.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "transforming-banking-due-diligence-how-jaaga-ends-manual-verification-for-home-loans",
    "primary_keyword": "banking due diligence home loans",
    "title_tag": "Banking Due Diligence for Home Loans: How JaaGa Automates It",
    "meta_description": "Learn how JaaGa automates banking due diligence, mortgage checks, APF reviews, and property verification for faster home loan decisions.",
    "canonical_url": "https://blog.jaaga.ai/blogs/transforming-banking-due-diligence-how-jaaga-ends-manual-verification-for-home-loans",
    "og_title": "Banking Due Diligence for Home Loans: How JaaGa Automates It",
    "og_description": "Learn how JaaGa automates banking due diligence, mortgage checks, APF reviews, and property verification for faster home loan decisions.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "hyderabad-property-valuers-professional-valuation-service",
    "primary_keyword": "Hyderabad property valuers",
    "title_tag": "Hyderabad Property Valuers: Professional Valuation Guide",
    "meta_description": "Learn how professional property valuation in Hyderabad works for homes, commercial property, land, loans, sale, purchase, and legal use.",
    "canonical_url": "https://blog.jaaga.ai/blogs/hyderabad-property-valuers-professional-valuation-service",
    "og_title": "Hyderabad Property Valuers: Professional Valuation Guide",
    "og_description": "Learn how professional property valuation in Hyderabad works for homes, commercial property, land, loans, sale, purchase, and legal use.",
    "schema_type": "Service"
  },
  {
    "slug": "apply-for-property-mutation-in-telangana-complete-guide-2025",
    "primary_keyword": "mutation in Telangana",
    "title_tag": "Mutation in Telangana: Apply Online and Download Certificate",
    "meta_description": "Learn how to apply for mutation in Telangana, update land ownership records, check status, and download mutation certificate online.",
    "canonical_url": "https://blog.jaaga.ai/blogs/apply-for-property-mutation-in-telangana-complete-guide-2025",
    "og_title": "Mutation in Telangana: Apply Online and Download Certificate",
    "og_description": "Learn how to apply for mutation in Telangana, update land ownership records, check status, and download mutation certificate online.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "tamil-nadu-patta-chitta-documents-a-complete-guide",
    "primary_keyword": "Patta Chitta Tamil Nadu",
    "title_tag": "Patta Chitta Tamil Nadu: Apply Verify and Download Online",
    "meta_description": "Learn how to apply, verify, and download Tamil Nadu Patta and Chitta documents online, and check land ownership details safely.",
    "canonical_url": "https://blog.jaaga.ai/blogs/tamil-nadu-patta-chitta-documents-a-complete-guide",
    "og_title": "Patta Chitta Tamil Nadu: Apply Verify and Download Online",
    "og_description": "Learn how to apply, verify, and download Tamil Nadu Patta and Chitta documents online, and check land ownership details safely.",
    "schema_type": "BlogPosting"
  },
  {
    "slug": "how-to-prove-legal-ownership-of-a-property-complete-guide-india-2025",
    "primary_keyword": "prove legal ownership of property",
    "title_tag": "How to Prove Legal Ownership of Property in India",
    "meta_description": "Learn which documents prove legal property ownership in India, including sale deed, EC, tax receipts, mutation records, and title checks.",
    "canonical_url": "https://blog.jaaga.ai/blogs/how-to-prove-legal-ownership-of-a-property-complete-guide-india-2025",
    "og_title": "How to Prove Legal Ownership of Property in India",
    "og_description": "Learn which documents prove legal property ownership in India, including sale deed, EC, tax receipts, mutation records, and title checks.",
    "schema_type": "BlogPosting"
  }
];

const postsPath = path.resolve(__dirname, "../../artifacts/api-server/data/posts.json");

if (!fs.existsSync(postsPath)) {
  console.error("posts.json not found at:", postsPath);
  process.exit(1);
}

try {
  const rawData = fs.readFileSync(postsPath, "utf8");
  const posts = JSON.parse(rawData);

  let updatedCount = 0;
  const metaMap = new Map(metadata.map((item) => [item.slug, item]));

  const updatedPosts = posts.map((post: any) => {
    const meta = metaMap.get(post.slug);
    if (meta) {
      updatedCount++;
      return {
        ...post,
        metaTitle: meta.title_tag,
        metaDescription: meta.meta_description,
        primaryKeyword: meta.primary_keyword,
        canonicalUrl: meta.canonical_url,
        ogTitle: meta.og_title,
        ogDescription: meta.og_description,
        schemaType: meta.schema_type,
      };
    }
    return post;
  });

  fs.writeFileSync(postsPath, JSON.stringify(updatedPosts, null, 2), "utf8");
  console.log(`SUCCESS: Successfully updated ${updatedCount} posts in posts.json!`);
} catch (error) {
  console.error("Error updating posts metadata:", error);
  process.exit(1);
}

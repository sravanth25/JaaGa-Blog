import fs from 'fs';
import path from 'path';

const postsPath = path.resolve('artifacts/api-server/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

const ctaData = [
  {
    slug: "how-to-download-encumbrance-certificate-ec-in-telangana",
    heading: "Get your Telangana Encumbrance Certificate",
    subtext: "Skip the IGRS portal. JaaGa fetches a certified, bank-valid EC for any Telangana property in minutes.",
    button: "Get a Certified EC",
    href: "https://www.jaaga.ai/telangana/ec?utm_source=blog&utm_medium=cta&utm_campaign=ec_telangana"
  },
  {
    slug: "download-telangana-ec-ror-pahani-jaaga-app",
    heading: "Get your Telangana EC, ROR & Pahani",
    subtext: "JaaGa pulls certified Telangana land records — EC, ROR and Pahani — online, ready for banks and registration.",
    button: "Get Certified Records",
    href: "https://www.jaaga.ai/telangana/ec?utm_source=blog&utm_medium=cta&utm_campaign=telangana_ec_ror"
  },
  {
    slug: "encumbrance-certificate-guide-india",
    heading: "Get an Encumbrance Certificate for your state",
    subtext: "JaaGa fetches a certified, bank-valid EC across every Indian state — pick yours and get it online in minutes.",
    button: "Get an EC for Your State",
    href: "https://www.jaaga.ai/states?utm_source=blog&utm_medium=cta&utm_campaign=ec_guide_india"
  },
  {
    slug: "how-to-check-22a-prohibited-land-in-telangana",
    heading: "Check if land is on the 22A prohibited list",
    subtext: "Don't risk a blocked registration. JaaGa checks any Telangana survey number against the Section 22A prohibited-property list.",
    button: "Check 22A Prohibited Land",
    href: "https://www.jaaga.ai/telangana/prohibited-land?utm_source=blog&utm_medium=cta&utm_campaign=prohibited_22a"
  },
  {
    slug: "apply-for-property-mutation-in-telangana-complete-guide-2025",
    heading: "Update your name with a property mutation",
    subtext: "JaaGa handles the mutation end to end — get the new owner's name on the revenue record without the tahsildar runaround.",
    button: "Start Mutation",
    href: "https://www.jaaga.ai/mutation-creation?utm_source=blog&utm_medium=cta&utm_campaign=mutation_telangana"
  },
  {
    slug: "how-to-research-land-in-telangana",
    heading: "Research any Telangana property with JaaGa",
    subtext: "EC, ROR, prohibited-land checks and more — pull every Telangana land record you need from one place.",
    button: "Explore Telangana Documents",
    href: "https://www.jaaga.ai/telangana?utm_source=blog&utm_medium=cta&utm_campaign=research_telangana"
  },
  {
    slug: "key-points-to-check-before-buying-property-in-telangana",
    heading: "Verify before you buy",
    subtext: "Get a full JaaGa property audit — title, ownership, encumbrances and red flags — before you pay an advance.",
    button: "Get a Property Audit",
    href: "https://www.jaaga.ai/title-verification-report?utm_source=blog&utm_medium=cta&utm_campaign=buy_check_telangana"
  },
  {
    slug: "must-known-facts-before-registering-property-in-telangana-a-complete-guide-by-jaaga",
    heading: "Get your Telangana documents before you register",
    subtext: "JaaGa fetches every record you need for a clean registration — EC, market value, prohibited-land check and more.",
    button: "Get Telangana Documents",
    href: "https://www.jaaga.ai/telangana?utm_source=blog&utm_medium=cta&utm_campaign=register_telangana"
  },
  {
    slug: "is-your-dream-home-a-legal-trap-how-to-avoid-real-estate-fraud-in-telangana",
    heading: "Make sure your dream home isn't a legal trap",
    subtext: "JaaGa audits the title, ownership and encumbrances of any Telangana property so you spot fraud before you buy.",
    button: "Verify This Property",
    href: "https://www.jaaga.ai/title-verification-report?utm_source=blog&utm_medium=cta&utm_campaign=fraud_telangana"
  },
  {
    slug: "bhu-bharati-portal-scam-telangana",
    heading: "Get a genuine, certified Telangana EC",
    subtext: "Avoid fake portals. JaaGa fetches a certified, bank-valid Encumbrance Certificate straight from the source.",
    button: "Get a Certified EC",
    href: "https://www.jaaga.ai/telangana/ec?utm_source=blog&utm_medium=cta&utm_campaign=bhu_bharati"
  },
  {
    slug: "tgspdcl-electricity-bill-name-change-hyderabad",
    heading: "Change the name on your electricity bill",
    subtext: "JaaGa handles the TGSPDCL name-change paperwork for you — submit once and track it to completion.",
    button: "Change Bill Name",
    href: "https://www.jaaga.ai/electricity-name-change?utm_source=blog&utm_medium=cta&utm_campaign=tgspdcl_name_change"
  },
  {
    slug: "hyderabad-property-valuers-professional-valuation-service",
    heading: "Get a professional property valuation",
    subtext: "JaaGa delivers an accurate, documented valuation for any Hyderabad property — for loans, sale or disputes.",
    button: "Get a Valuation",
    href: "https://www.jaaga.ai/property-valuation-service?utm_source=blog&utm_medium=cta&utm_campaign=valuation_hyderabad"
  },
  {
    slug: "adangal-ror-1b-land-records-guide",
    heading: "Download your Adangal / 1B land record",
    subtext: "JaaGa pulls your certified Adangal and 1B (Record of Rights) for any survey number — no MeeBhoomi portal hassle.",
    button: "Download Adangal / 1B",
    href: "https://www.jaaga.ai/andhra-pradesh/adangal?utm_source=blog&utm_medium=cta&utm_campaign=adangal_ror_1b"
  },
  {
    slug: "how-to-download-andhra-pradesh-certified-copy-online-using-jaaga",
    heading: "Get your Andhra Pradesh certified copy",
    subtext: "JaaGa fetches certified copies of registered property documents in Andhra Pradesh — online, ready for banks and registration.",
    button: "Get a Certified Copy",
    href: "https://www.jaaga.ai/andhra-pradesh/ec?utm_source=blog&utm_medium=cta&utm_campaign=ap_certified_copy"
  },
  {
    slug: "tamil-nadu-land-records-complete-guide",
    heading: "Get your Tamil Nadu land records",
    subtext: "Patta, Chitta, FMB and more — JaaGa fetches every Tamil Nadu land record you need, certified and online.",
    button: "Get Tamil Nadu Records",
    href: "https://www.jaaga.ai/tamil-nadu?utm_source=blog&utm_medium=cta&utm_campaign=tn_land_records"
  },
  {
    slug: "tamil-nadu-patta-chitta-documents-a-complete-guide",
    heading: "Download your Patta & Chitta",
    subtext: "JaaGa pulls your certified Tamil Nadu Patta and Chitta for any survey number — proof of ownership, online.",
    button: "Download Patta Chitta",
    href: "https://www.jaaga.ai/tamil-nadu/patta-chitta?utm_source=blog&utm_medium=cta&utm_campaign=patta_chitta"
  },
  {
    slug: "fmb-sketch-in-tamil-nadu-how-to-view-download-check-fmb-map-online-complete-guide-2026",
    heading: "Download your Tamil Nadu FMB sketch",
    subtext: "JaaGa fetches the certified FMB (Field Measurement Book) sketch for any Tamil Nadu survey number — clear boundaries, online.",
    button: "Download FMB Sketch",
    href: "https://www.jaaga.ai/tamil-nadu/fmb-sketch?utm_source=blog&utm_medium=cta&utm_campaign=tn_fmb"
  },
  {
    slug: "tamil-nadu-fmb-sketch-guide",
    heading: "Download your Tamil Nadu FMB sketch",
    subtext: "JaaGa fetches the certified FMB (Field Measurement Book) sketch for any Tamil Nadu survey number — clear boundaries, online.",
    button: "Download FMB Sketch",
    href: "https://www.jaaga.ai/tamil-nadu/fmb-sketch?utm_source=blog&utm_medium=cta&utm_campaign=tn_fmb_guide"
  },
  {
    slug: "understanding-satbara-7-12-utara-land-records-maharashtra",
    heading: "Download your 7/12 Utara (Satbara)",
    subtext: "JaaGa fetches your certified Maharashtra 7/12 Utara for any survey number — ownership and crop details, online.",
    button: "Download 7/12 Utara",
    href: "https://www.jaaga.ai/maharashtra/satbara?utm_source=blog&utm_medium=cta&utm_campaign=satbara"
  },
  {
    slug: "property-card-online-7-12-download-maharashtra",
    heading: "Get your Maharashtra Property Card & 7/12",
    subtext: "Skip the Mahabhulekh queue. JaaGa fetches your certified Property Card and 7/12 Utara for any Maharashtra property in minutes.",
    button: "Download Property Card",
    href: "https://www.jaaga.ai/maharashtra/property-card?utm_source=blog&utm_medium=cta&utm_campaign=maharashtra_property_card"
  },
  {
    slug: "how-to-download-maharashtra-property-card-using-jaaga-app",
    heading: "Download your Maharashtra Property Card",
    subtext: "JaaGa fetches your certified Property Card for any Maharashtra property — proof of urban ownership, online.",
    button: "Download Property Card",
    href: "https://www.jaaga.ai/maharashtra/property-card?utm_source=blog&utm_medium=cta&utm_campaign=mh_property_card_app"
  },
  {
    slug: "how-to-download-maharashtra-8a-agriculture-document-on-jaaga",
    heading: "Download your Maharashtra 8A extract",
    subtext: "JaaGa pulls your certified 8A agricultural holding record for any Maharashtra survey number — online, in minutes.",
    button: "Download 8A Document",
    href: "https://www.jaaga.ai/maharashtra/8A?utm_source=blog&utm_medium=cta&utm_campaign=mh_8a"
  },
  {
    slug: "what-is-a-khata-bangalore",
    heading: "Get your BBMP e-Khata",
    subtext: "JaaGa fetches your Bangalore e-Khata (e-Aasthi) — essential for loans, building plans and property tax, online.",
    button: "Get Your e-Khata",
    href: "https://www.jaaga.ai/karnataka/bbmp-ekhata?utm_source=blog&utm_medium=cta&utm_campaign=khata_bangalore"
  },
  {
    slug: "karnataka-khata-extract-complete-guide-property-owners",
    heading: "Download your Karnataka Khata extract",
    subtext: "JaaGa pulls your certified Khata extract for any Karnataka property — proof for loans, tax and transfers, online.",
    button: "Download Khata Extract",
    href: "https://www.jaaga.ai/karnataka/khata-extract?utm_source=blog&utm_medium=cta&utm_campaign=khata_extract"
  },
  {
    slug: "karnataka-khata-extract-how-to-download-khata-online-using-jaaga-portal",
    heading: "Download your Karnataka Khata extract",
    subtext: "JaaGa pulls your certified Khata extract for any Karnataka property — proof for loans, tax and transfers, online.",
    button: "Download Khata Extract",
    href: "https://www.jaaga.ai/karnataka/khata-extract?utm_source=blog&utm_medium=cta&utm_campaign=khata_extract_online"
  },
  {
    slug: "bhoomi-rtc-pahani-karnataka-guide",
    heading: "Download a bank-valid Bhoomi i-RTC",
    subtext: "The free RTC won't pass at the bank. JaaGa fetches the digitally signed, bank-valid i-RTC for any Karnataka survey number.",
    button: "Download Bank-Valid i-RTC",
    href: "https://www.jaaga.ai/karnataka/rtc-pahani?utm_source=blog&utm_medium=cta&utm_campaign=bhoomi_rtc"
  },
  {
    slug: "how-to-download-odisha-plot-map-bhunaksha-simple-and-fast-using-jaaga",
    heading: "Download your Odisha plot map (Bhunaksha)",
    subtext: "JaaGa fetches the Bhunaksha cadastral plot map for any Odisha plot — clear boundaries, online and fast.",
    button: "Download Bhunaksha Map",
    href: "https://www.jaaga.ai/odisha/bhunaksha?utm_source=blog&utm_medium=cta&utm_campaign=odisha_bhunaksha"
  },
  {
    slug: "title-verification-legal-opinion-guide",
    heading: "Get a legal opinion on your property",
    subtext: "JaaGa's title verification checks ownership, the title chain and encumbrances, and delivers a bank-ready legal opinion.",
    button: "Get a Legal Opinion",
    href: "https://www.jaaga.ai/title-verification-report?utm_source=blog&utm_medium=cta&utm_campaign=title_verification"
  },
  {
    slug: "title-search-report-and-legal-opinion-guide",
    heading: "Get a full title search report",
    subtext: "JaaGa traces the title chain and delivers a documented title search report and legal opinion, ready for banks.",
    button: "Get a Title Report",
    href: "https://www.jaaga.ai/title-verification-report?utm_source=blog&utm_medium=cta&utm_campaign=title_search_report"
  },
  {
    slug: "what-is-legal-opinion-and-why-its-crucial-for-property-buyers-in-india",
    heading: "Get a legal opinion before you buy",
    subtext: "JaaGa delivers a lawyer-backed legal opinion on any property — title, ownership and risk, in one clear report.",
    button: "Get a Legal Opinion",
    href: "https://www.jaaga.ai/title-verification-report?utm_source=blog&utm_medium=cta&utm_campaign=legal_opinion"
  },
  {
    slug: "how-to-prove-legal-ownership-of-a-property-complete-guide-india-2025",
    heading: "Prove ownership with a JaaGa audit",
    subtext: "JaaGa gathers every ownership document and verifies the title chain, so you can prove clear ownership with confidence.",
    button: "Verify Ownership",
    href: "https://www.jaaga.ai/title-verification-report?utm_source=blog&utm_medium=cta&utm_campaign=prove_ownership"
  },
  {
    slug: "property-title-search-india-find-locate-property-ownership",
    heading: "Search & verify any property title",
    subtext: "JaaGa locates ownership and traces the full title history of any property in India — before you commit.",
    button: "Search Property Title",
    href: "https://www.jaaga.ai/title-verification-report?utm_source=blog&utm_medium=cta&utm_campaign=title_search_india"
  },
  {
    slug: "red-flags-property-documents-lawyers-must-never-miss",
    heading: "Catch the red flags before you buy",
    subtext: "JaaGa audits every property document for the defects that signal title risk — and flags them in one report.",
    button: "Get a Property Audit",
    href: "https://www.jaaga.ai/title-verification-report?utm_source=blog&utm_medium=cta&utm_campaign=red_flags"
  },
  {
    slug: "what-is-sale-deed-and-what-is-sale-agreement",
    heading: "Get a certified copy of your sale deed",
    subtext: "JaaGa fetches a certified copy of the registered sale deed for any property — proof of transfer, online.",
    button: "Get a Sale Deed Copy",
    href: "https://www.jaaga.ai/telangana/sale-deed?utm_source=blog&utm_medium=cta&utm_campaign=sale_deed"
  },
  {
    slug: "document-translation-for-property-documents",
    heading: "Translate your property documents",
    subtext: "JaaGa provides certified translation of property documents — accurate, accepted for banks and registration.",
    button: "Translate Documents",
    href: "https://www.jaaga.ai/document-translation?utm_source=blog&utm_medium=cta&utm_campaign=doc_translation"
  },
  {
    slug: "bhu-aadhaar-ulpin-guide",
    heading: "Get your land records with JaaGa",
    subtext: "JaaGa fetches certified land records across every Indian state — find your parcel and pull the documents you need.",
    button: "Get Your Land Records",
    href: "https://www.jaaga.ai/states?utm_source=blog&utm_medium=cta&utm_campaign=bhu_aadhaar"
  },
  {
    slug: "buying-property-in-parents-name-india",
    heading: "Verify before you buy — in any name",
    subtext: "Whoever the buyer is, JaaGa audits the property's title, ownership and encumbrances before you pay.",
    button: "Verify Before You Buy",
    href: "https://www.jaaga.ai/title-verification-report?utm_source=blog&utm_medium=cta&utm_campaign=parents_name"
  },
  {
    slug: "telangana-government-core-urban-act-cure-ghmc-replacement",
    heading: "Buying property in Telangana?",
    subtext: "Before you buy under the new urban rules, get a full JaaGa property audit — title, encumbrances and risk in one report.",
    button: "Get a Property Audit",
    href: "https://www.jaaga.ai/title-verification-report?utm_source=blog&utm_medium=cta&utm_campaign=cure_act"
  },
  {
    slug: "rera-has-become-a-shield-for-defaulting-builders-not-homebuyers-supreme-court-flags-institutional-failure",
    heading: "Don't rely on RERA alone — verify the property",
    subtext: "JaaGa audits the title, approvals and encumbrances of any project, so you know the risks before you buy.",
    button: "Get a Property Audit",
    href: "https://www.jaaga.ai/title-verification-report?utm_source=blog&utm_medium=cta&utm_campaign=rera_shield"
  },
  {
    slug: "what-is-investment-property-selection-and-why-it-matters",
    heading: "Pick investment property with confidence",
    subtext: "JaaGa Intelligence reveals a property's history, risk alerts and market trends — with a simple Trust Score out of 100.",
    button: "Check the Trust Score",
    href: "https://www.jaaga.ai/intelligence?utm_source=blog&utm_medium=cta&utm_campaign=investment_selection"
  },
  {
    slug: "transforming-banking-due-diligence-how-jaaga-ends-manual-verification-for-home-loans",
    heading: "Automate property due diligence for home loans",
    subtext: "JaaGa gives lenders AI-assisted due diligence, auto-fetch of EC and prohibitory checks, and bank-ready legal opinions.",
    button: "Explore JaaGa for Banks",
    href: "https://partner.jaaga.ai?utm_source=blog&utm_medium=cta&utm_campaign=banking_dd"
  },
  {
    slug: "jaaga-property-registration-services-one-stop-solution",
    heading: "Register your property end to end",
    subtext: "JaaGa handles the full registration — documents, drafting, appointment and follow-up — in one place.",
    button: "Start Registration",
    href: "https://www.jaaga.ai/registration-service?utm_source=blog&utm_medium=cta&utm_campaign=registration_services"
  }
];

function generateCtaHtml(item) {
  return `<div style="border:1px solid #dfe4ec;border-radius:14px;padding:28px 24px;text-align:center;margin:40px 0;background:#f5f8fc;font-family:inherit;">
  <h3 style="font-size:1.15rem;font-weight:700;margin:0 0 8px;color:#153568;">${item.heading}</h3>
  <p style="color:#55606e;margin:0 0 20px;font-size:0.95rem;">${item.subtext}</p>
  <a href="${item.href}" rel="noopener" style="display:inline-block;background:#153568;color:#ffffff;font-weight:600;padding:14px 28px;border-radius:10px;text-decoration:none;">${item.button} →</a>
</div>`;
}

function insertCtaIntoContent(content, ctaItem) {
  const ctaHtml = generateCtaHtml(ctaItem);
  
  // Clean out any old CTA blocks if already present
  let cleanContent = content.replace(/<div style="border:1px solid #dfe4ec[\s\S]*?<\/div>/g, '');

  // Insertion points strategy:
  // RULES:
  // 2. Insert the CTA block in TWO places, unchanged: (a) immediately after the main "how to download / what it is" section, and (b) just before the conclusion. If the article is short, insert once, near the end.

  // Let's find headings (<h2> or <h3>)
  const headingRegex = /<h[23][^>]*>[\s\S]*?<\/h[23]>/gi;
  const headings = [];
  let match;
  while ((match = headingRegex.exec(cleanContent)) !== null) {
    headings.push({ text: match[0], index: match.index, length: match[0].length });
  }

  if (headings.length === 0) {
    // If no h2/h3 tags, insert at end before last paragraph or at end
    return cleanContent + '\n' + ctaHtml;
  }

  if (headings.length <= 2) {
    // Short article - insert once near the end (before last heading or before conclusion)
    const lastHeading = headings[headings.length - 1];
    return cleanContent.slice(0, lastHeading.index) + ctaHtml + '\n' + cleanContent.slice(lastHeading.index);
  }

  // Find conclusion heading (e.g., Conclusion, Final Thoughts, Summary, or last heading)
  let conclusionIdx = headings.length - 1;
  for (let i = headings.length - 1; i >= 0; i--) {
    if (/conclusion|final thoughts|summary|wrapping up/i.test(headings[i].text)) {
      conclusionIdx = i;
      break;
    }
  }

  // Find main section heading (after position 1 or 2, e.g. "how to download" or "what it is" or 2nd/3rd heading)
  let midIdx = 2; // Default 3rd heading (index 2) or after 2nd heading
  for (let i = 1; i < conclusionIdx; i++) {
    if (/how to|what is|step|download|guide|understanding|meaning/i.test(headings[i].text)) {
      midIdx = i + 1; // Insert AFTER this section (before next heading)
      break;
    }
  }

  if (midIdx >= conclusionIdx) {
    midIdx = Math.floor(conclusionIdx / 2);
  }

  const pos1 = headings[midIdx] ? headings[midIdx].index : Math.floor(cleanContent.length / 2);
  const pos2 = headings[conclusionIdx] ? headings[conclusionIdx].index : cleanContent.length;

  let newContent = cleanContent.slice(0, pos1) + ctaHtml + '\n' + cleanContent.slice(pos1, pos2) + ctaHtml + '\n' + cleanContent.slice(pos2);
  return newContent;
}

let updatedCount = 0;
posts.forEach(post => {
  const ctaItem = ctaData.find(c => c.slug === post.slug);
  if (ctaItem) {
    post.content = insertCtaIntoContent(post.content || '', ctaItem);
    updatedCount++;
  } else {
    console.warn('No CTA data found for slug:', post.slug);
  }
});

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2), 'utf8');
console.log(`Successfully inserted CTA blocks into ${updatedCount} blog posts!`);

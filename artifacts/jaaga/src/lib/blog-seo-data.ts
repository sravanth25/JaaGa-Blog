export interface BlogSEO {
  title: string;
  description: string;
  h1: string;
  keywords: string;
  schemaType: string;
  /** Short answer shown in a box at the top of the post. */
  quickAnswer?: string;
  /** Official government sources the post relies on. */
  sources?: { name: string; url: string }[];
}

export const blogSEOMap: Record<string, BlogSEO> = {
  "telangana-land-resurvey-2026-process-landowners": {
    title: "Telangana Land Resurvey 2026: 6-Phase Process Explained",
    description: "Telangana issued a 6-phase land resurvey procedure on 20 Nov 2026: 4-day notice, on-the-spot measurement, village camps. What changes and how to prepare.",
    h1: "Telangana Land Resurvey 2026: The 6-Phase Process and What Landowners Must Do",
    keywords: "telangana land resurvey, land resurvey telangana 2026, bhu bharati resurvey, land resurvey sop telangana, resurvey notice pattadar, pahani mismatch, village camp tahsildar, survey and boundaries act 1923, bhu bharati act 2025",
    schemaType: "BlogPosting",
    quickAnswer: "On 20 November 2026, Telangana issued a six-phase procedure for resurveying land in every district except Hyderabad. You get notice at least four days before the survey, the measured extent is told to you on the spot, and mismatches go to Tahsildar village camps before the survey is notified in the Gazette and your Bhu Bharati record is updated. Download your current Pahani and ROR 1B now so you can check the results.",
    sources: [
      { name: "Bhu Bharati (Telangana land records)", url: "https://bhubharati.telangana.gov.in" }
    ]
  },
  "ptin-mandatory-property-registration-hyderabad": {
    title: "PTIN Must for Property Registration in Hyderabad | JaaGa",
    description: "Telangana now requires a PTIN or VLTIN to book property registration slots in Hyderabad's CURE limits. What changed, who is affected and how to get a PTIN.",
    h1: "PTIN Now Mandatory for Property Registration in Hyderabad: What Buyers and Sellers Must Know",
    keywords: "PTIN mandatory for property registration, PTIN Hyderabad, VLTIN Hyderabad, property tax identification number, PTIN registration Telangana, CURE property registration, property registration Hyderabad 2026, how to get PTIN Hyderabad, PTIN self assessment, My CURE App, GHMC PTIN, Cyberabad Municipal Corporation property tax, Malkajgiri Municipal Corporation property tax, vacant land tax Hyderabad, PTIN for under construction flat, slot booking property registration Telangana, mutation after registration Hyderabad",
    schemaType: "BlogPosting"
  },
  "power-of-attorney-for-property-india-gpa-spa": {
    title: "Power of Attorney for Property in India: GPA vs SPA | JaaGa",
    description: "Can a GPA holder sell your property? Learn GPA vs SPA, registration and stamp duty in Telangana and AP, NRI rules, and how to verify a POA before you buy.",
    h1: "Power of Attorney for Property in India: GPA vs SPA, Registration and Risks",
    keywords: "power of attorney for property, GPA vs SPA, general power of attorney, special power of attorney, power of attorney registration Telangana, GPA stamp duty Telangana, power of attorney Andhra Pradesh, NRI power of attorney India, can GPA holder sell property, power of attorney cancellation, GPA sale validity, Suraj Lamps judgment, how to verify power of attorney, POA property fraud",
    schemaType: "BlogPosting"
  },
  "telangana-ulc-cases-fast-track-2026": {
    title: "Telangana ULC Cases Fast-Tracked: What It Means in 2026",
    description: "Telangana has ordered a fast-track review of pending Urban Land Ceiling applications. What ULC land is, why it blocks registration, and what owners should do.",
    h1: "Telangana Will Fast-Track Pending Urban Land Ceiling Cases: What It Means for Your Property",
    keywords: "urban land ceiling telangana, ulc land telangana, ulc regularisation, ulc 22a telangana, urban land ceiling act 1976, ulc land registration hyderabad, ceiling surplus land telangana, ulc memo 2026, ulc colonies hyderabad, what is ulc land",
    schemaType: "BlogPosting"
  },
  "ap-property-tax-receipt-download": {
    title: "AP Property Tax: Rates, Receipt & Download Online 2026",
    description: "What property tax is, how Andhra Pradesh calculates it, what your city charges, and how to get your AP property tax receipt as a soft copy from JaaGa.",
    h1: "Property Tax in Andhra Pradesh: What It Is, How It's Calculated, and How to Get Your Receipt",
    keywords: "property tax ap, ap property tax, property tax, andhra pradesh property tax, what is a property tax, cdma property tax, cdma ap property tax, property tax online, online property tax, property tax payment, municipal property tax, municipal tax, house tax, house property tax, property tax receipt, property tax download, search property tax, gvmc property tax, ap property tax payment",
    schemaType: "BlogPosting"
  },
  "telangana-22a-property-registration-valid-approvals-2026": {
    title: "Telangana 22-A Properties Can Now Be Registered: New Rule",
    description: "Telangana now allows registration of 22-A listed plots, houses and flats with valid GHMC, HMDA or DTCP approvals. The link-document rule and how to apply.",
    h1: "Telangana Allows Registration of 22-A Properties That Have Valid Approvals",
    keywords: "22a registration telangana, section 22a new rules 2026, 22a property registration order, register 22a property telangana, 22a valid approvals ghmc hmda dtcp, link document 22a registration, 22a district committee collector, prohibited property list telangana, 22a plots houses flats registration, telangana revenue department 22a order",
    schemaType: "BlogPosting"
  },
  "tgspdcl-electricity-bill-name-change-hyderabad": {
    title: "TGSPDCL Name Change Online: Documents, Steps & Timeline",
    description: "Change the name on your TGSPDCL electricity bill after buying a property in Hyderabad. Documents list, online and office steps, and what delays approval.",
    h1: "TGSPDCL Electricity Bill Name Change in Hyderabad: Documents, Process & Timeline",
    keywords: "TGSPDCL name change, electricity bill name change Hyderabad, TGSPDCL process",
    schemaType: "HowTo",
    quickAnswer: "To change the name on a TGSPDCL electricity bill, apply on the TGSPDCL portal under Name Change / Title Transfer using your Unique Service Number (USC), or at your local sub-division office. Keep the registered sale deed, ID proof, latest electricity bill and house tax receipt ready. After approval, the new name usually appears within one or two billing cycles.",
    sources: [
      { name: "TGSPDCL (Southern Power Distribution Company of Telangana)", url: "https://tgsouthernpower.org" }
    ]
  },
  "how-to-check-22a-prohibited-land-in-telangana": {
    title: "Bhu Bharathi Prohibited Land List: Check 22A by Survey No",
    description: "Check if a Telangana survey number is on the 22A prohibited list using Bhu Bharati or IGRS, step by step. Plus: can you buy 22A land, and how to get it removed.",
    h1: "How to Check 22A Prohibited Land in Telangana Before Buying Property",
    keywords: "22A prohibited land Telangana, Section 22A check, Telangana land records",
    schemaType: "HowTo",
    quickAnswer: "To check 22A prohibited land in Telangana, open the Bhu Bharati portal (bhubharati.telangana.gov.in) or the IGRS Telangana prohibited property search, select your district, mandal and village, and search by survey number. If the survey number is listed under Section 22A, the Sub-Registrar will refuse to register a sale, and banks will not lend against it, so check before you pay any advance.",
    sources: [
      { name: "Bhu Bharati (Telangana land records)", url: "https://bhubharati.telangana.gov.in" },
      { name: "IGRS Telangana (Registration & Stamps)", url: "https://registration.telangana.gov.in" }
    ]
  },
  "tamil-nadu-land-records-complete-guide": {
    title: "Tamil Nadu Land Records: Complete Guide 2026 | Patta, Chitta, FMB",
    description: "Complete guide to Tamil Nadu land records — Patta, Chitta, Adangal, FMB Sketch. How to access, verify, and download documents online.",
    h1: "Tamil Nadu Land Records: Complete Guide to Patta, Chitta, Adangal & FMB Sketch",
    keywords: "Tamil Nadu land records, Patta Chitta, Tamil Nadu property documents",
    schemaType: "Article"
  },
  "karnataka-khata-extract-complete-guide-property-owners": {
    title: "Karnataka Khata Extract: Complete Guide for Property Owners",
    description: "Everything property owners need to know about Karnataka Khata Extract — what it is, how to get it, and why it matters for buying or selling property.",
    h1: "Karnataka Khata Extract: Complete Guide for Property Owners",
    keywords: "Karnataka Khata Extract, Khata certificate Karnataka, BBMP Khata",
    schemaType: "Article"
  },
  "property-card-online-7-12-download-maharashtra": {
    title: "Property Card vs 7/12 Utara Maharashtra: Download & Read",
    description: "Property card or 7/12? Learn which Maharashtra record you need, how to download both through Mahabhulekh and Aapli Chawadi, and how to read Ferfar and 8A.",
    h1: "How to Download Maharashtra Property Card and 7/12 Utara Online",
    keywords: "Maharashtra property card, 7/12 Utara, Maharashtra land records",
    schemaType: "HowTo",
    quickAnswer: "In Maharashtra, the Property Card is the ownership record for urban (CTS) property, while the 7/12 Utara is the record for agricultural land. Both are available online through Mahabhulekh, with related services on Aapli Chawadi. Check the Ferfar (mutation entries) as well to see how ownership changed over time.",
    sources: [
      { name: "Mahabhulekh (Maharashtra land records)", url: "https://bhulekh.mahabhumi.gov.in" },
      { name: "Mahabhumi (Maharashtra Land Records Department)", url: "https://mahabhumi.gov.in" }
    ]
  },
  "how-to-research-land-in-telangana": {
    title: "How to Research Land in Telangana: Records, Portals & Checks",
    description: "A complete guide to researching land in Telangana — checking Pahani, Adangal, EC, mutation records, and prohibited land status before purchase.",
    h1: "How to Research Land in Telangana: A Complete Buyer's Guide",
    keywords: "research land Telangana, Telangana land verification, Dharani portal",
    schemaType: "Article"
  },
  "red-flags-property-documents-lawyers-must-never-miss": {
    title: "Red Flags in Property Documents Lawyers Must Never Miss",
    description: "Critical red flags in property documents that every buyer and lawyer must check — title defects, encumbrances, missing links, and fraudulent records.",
    h1: "Red Flags in Property Documents: What Lawyers and Buyers Must Never Miss",
    keywords: "property document red flags, property fraud India, title defects property",
    schemaType: "Article"
  },
  "title-search-report-and-legal-opinion-guide": {
    title: "Title Search Report & Legal Opinion: Complete Property Guide",
    description: "Understand the difference between a title search report and legal opinion in Indian property transactions. What they cover, who prepares them, and why you need both.",
    h1: "Title Search Report and Legal Opinion: Complete Guide for Property Buyers",
    keywords: "title search report, legal opinion property India, property title verification",
    schemaType: "Article"
  },
  "rera-has-become-a-shield-for-defaulting-builders-not-homebuyers-supreme-court-flags-institutional-failure": {
    title: "RERA Shields Defaulting Builders, Not Homebuyers: Supreme Court",
    description: "Supreme Court flags RERA's institutional failure — how the law meant to protect homebuyers has become a tool for defaulting builders to delay accountability.",
    h1: "RERA Has Become a Shield for Defaulting Builders, Not Homebuyers: Supreme Court Flags Institutional Failure",
    keywords: "RERA Supreme Court, RERA homebuyers, builder default India",
    schemaType: "NewsArticle"
  },
  "download-telangana-ec-ror-pahani-jaaga-app": {
    title: "Telangana Pahani, ROR 1B & EC Download Online (2026)",
    description: "Download Telangana Pahani (Adangal), ROR 1B and Encumbrance Certificate online. What each record shows, which one you need, and how to get certified copies.",
    h1: "How to Download Telangana EC, ROR & Pahani Using JaaGa App",
    keywords: "download Telangana EC, Telangana ROR 1B, Pahani download Telangana",
    schemaType: "HowTo",
    quickAnswer: "Telangana has three key land records: the Pahani (Adangal) shows how agricultural land is used, the ROR 1B shows who owns it, and the Encumbrance Certificate (EC) lists registered transactions such as sales and mortgages. Pahani and ROR 1B come from Bhu Bharati and the EC from IGRS Telangana; JaaGa fetches all three for you online.",
    sources: [
      { name: "Bhu Bharati (Telangana land records)", url: "https://bhubharati.telangana.gov.in" },
      { name: "IGRS Telangana (Registration & Stamps)", url: "https://registration.telangana.gov.in" }
    ]
  },
  "telangana-government-core-urban-act-cure-ghmc-replacement": {
    title: "CURE Act Full Form: The Law Replacing GHMC in Telangana",
    description: "CURE stands for Core Urban Region. Telangana's draft CURE Act 2026 will replace the 70-year-old GHMC Act — what it changes for property owners and buyers.",
    h1: "CURE Act Full Form: The Law Replacing GHMC in Telangana",
    keywords: "cure full form telangana, cure full form, what is cure in ghmc",
    schemaType: "Article"
  },
  "encumbrance-certificate-guide-india": {
    title: "Encumbrance Certificate (EC) Guide India: Meaning, Types & Download",
    description: "Complete guide to Encumbrance Certificate (EC) in India — what it is, types, how to read it, and how to download it state-wise for property verification.",
    h1: "Encumbrance Certificate (EC) Complete Guide: Meaning, Types & How to Download",
    keywords: "encumbrance certificate India, EC property, download EC online India",
    schemaType: "Article"
  },
  "how-to-download-encumbrance-certificate-ec-in-telangana": {
    title: "Telangana EC Download Online (IGRS): Steps & What to Check",
    description: "Download an Encumbrance Certificate in Telangana from IGRS by document or survey number. What to check in the EC, what it does not prove, and common mistakes.",
    h1: "How to Download Encumbrance Certificate (EC) in Telangana Online",
    keywords: "download EC Telangana, encumbrance certificate Telangana, Dharani EC",
    schemaType: "HowTo",
    quickAnswer: "To download an Encumbrance Certificate (EC) in Telangana, go to the IGRS Telangana registration portal, open Encumbrance Certificate services, and search by document number or by property details. A clean EC only shows registered transactions, so always check it together with the sale deed and land records.",
    sources: [
      { name: "IGRS Telangana (Registration & Stamps)", url: "https://registration.telangana.gov.in" }
    ]
  },
  "adangal-ror-1b-land-records-guide": {
    title: "ROR Full Form, Adangal & 1B Meaning (Telangana & AP)",
    description: "ROR full form is Record of Rights. See how ROR, Adangal, 1B and Pahani differ, what each one shows, and how to check them online before buying land.",
    h1: "ROR Full Form in Land Records: Adangal, 1B and Pahani Explained",
    keywords: "ror full form, ror full form in land records, 1b adangal, ror 1b",
    schemaType: "Article",
    quickAnswer: "ROR stands for Record of Rights, the master register of who owns land and on what terms. Adangal (called Pahani in Telangana) records how agricultural land is used, and the 1B lists each pattadar's name, khata number and extent. Check them online on Bhu Bharati in Telangana or MeeBhoomi in Andhra Pradesh, and make sure the owner name, survey number and extent match across all of them.",
    sources: [
      { name: "Bhu Bharati (Telangana land records)", url: "https://bhubharati.telangana.gov.in" },
      { name: "MeeBhoomi (Andhra Pradesh land records)", url: "https://meebhoomi.ap.gov.in" }
    ]
  },
  "bhoomi-rtc-pahani-karnataka-guide": {
    title: "i-RTC Karnataka: Download Bank-Valid Bhoomi RTC (Pahani)",
    description: "Free Bhoomi RTC copies are often rejected by banks. Learn what an i-RTC is, how to download the digitally signed Pahani, and how to read every field on it.",
    h1: "Bhoomi RTC & i-RTC Meaning: Download a Bank-Valid Pahani (Karnataka)",
    keywords: "i rtc, i-rtc, bhoomi rtc, pahani karnataka",
    schemaType: "HowTo",
    quickAnswer: "i-RTC is the digitally signed version of the Bhoomi RTC (Pahani), with a government signature and QR code. Banks, courts and registration offices accept it, while the free RTC you can view on landrecords.karnataka.gov.in is unsigned and often rejected. To get one, use the signed-document option on the Bhoomi portal, enter your district, taluk, hobli, village and survey number, and pay the fee.",
    sources: [
      { name: "Bhoomi (Karnataka land records)", url: "https://landrecords.karnataka.gov.in" }
    ]
  },
  "fmb-sketch-in-tamil-nadu-how-to-view-download-check-fmb-map-online-complete-guide-2026": {
    title: "FMB Sketch Tamil Nadu: How to View & Download FMB Map Online 2026",
    description: "Complete 2026 guide to FMB (Field Measurement Book) Sketch in Tamil Nadu — how to view, download, and verify FMB maps online for land boundary checks.",
    h1: "FMB Sketch in Tamil Nadu: How to View & Download FMB Map Online (2026)",
    keywords: "FMB sketch Tamil Nadu, FMB map download, Field Measurement Book Tamil Nadu",
    schemaType: "HowTo"
  },
  "what-is-investment-property-selection-and-why-it-matters": {
    title: "Investment Property Selection in India: What It Is & Why It Matters",
    description: "What makes a property a good investment in India? Key factors for investment property selection — location, legal status, documentation, and returns.",
    h1: "What Is Investment Property Selection and Why It Matters in India",
    keywords: "investment property India, property selection criteria, real estate investment India",
    schemaType: "Article"
  },
  "bhu-aadhaar-ulpin-guide": {
    title: "Bhu-Aadhaar (ULPIN) Guide: What It Is & How to Get Your Land ID",
    description: "What is Bhu-Aadhaar (ULPIN)? India's unique land parcel identification number explained — how it works, which states have it, and how to apply.",
    h1: "Bhu-Aadhaar (ULPIN): Complete Guide to India's Unique Land Parcel ID",
    keywords: "Bhu-Aadhaar, ULPIN India, unique land parcel identification number",
    schemaType: "Article"
  },
  "what-is-sale-deed-and-what-is-sale-agreement": {
    title: "Sale Deed vs Sale Agreement: Key Differences Explained India",
    description: "What is the difference between a Sale Deed and Sale Agreement in India? Legal significance, when each is used, and what to check before signing.",
    h1: "Sale Deed vs Sale Agreement: Key Differences Every Buyer Must Know",
    keywords: "sale deed India, sale agreement property, difference sale deed agreement",
    schemaType: "Article"
  },
  "buying-property-in-parents-name-india": {
    title: "Buying Property in Parents' Name in India: Tax & Legal Guide",
    description: "Is buying property in your parents' name in India a good idea? Tax benefits, legal implications, gift deed rules, and what documents you need.",
    h1: "Buying Property in Parents' Name in India: Complete Tax and Legal Guide",
    keywords: "buy property parents name India, property gift deed parents, tax benefit property parents",
    schemaType: "Article"
  },
  "title-verification-legal-opinion-guide": {
    title: "Property Title Verification & Legal Opinion Guide India 2026",
    description: "How to verify property title and get a legal opinion in India. What a lawyer checks, documents needed, costs, and how to avoid title fraud.",
    h1: "Property Title Verification and Legal Opinion: Complete Guide for Indian Buyers",
    keywords: "property title verification India, legal opinion property, title search India",
    schemaType: "Article"
  },
  "bhu-bharati-portal-scam-telangana": {
    title: "Bhu Bharati Portal Scam in Telangana: What Buyers Must Know",
    description: "Warning: Fake Bhu Bharati portals are targeting Telangana property buyers. How to identify scams, protect yourself, and use only the official portal.",
    h1: "Bhu Bharati Portal Scam in Telangana: How to Protect Yourself",
    keywords: "Bhu Bharati scam Telangana, fake land portal Telangana, property fraud Telangana",
    schemaType: "Article"
  },
  "what-is-a-khata-bangalore": {
    title: "What Is a Khata in Bangalore? BBMP Khata A, B & E Explained",
    description: "What is Khata in Bangalore? Difference between A Khata, B Khata, and E Khata — why it matters for property ownership, loans, and building plans.",
    h1: "What Is a Khata in Bangalore? A, B & E Khata Explained for Property Owners",
    keywords: "Khata Bangalore, BBMP Khata, A Khata B Khata Bangalore",
    schemaType: "Article"
  },
  "how-to-download-maharashtra-8a-agriculture-document-on-jaaga": {
    title: "Download Maharashtra 8A Agriculture Document on JaaGa",
    description: "How to download the Maharashtra 8A (Agriculture Land Record) using the JaaGa app. Step-by-step guide with screenshots for landowners and buyers.",
    h1: "How to Download Maharashtra 8A Agriculture Document Using JaaGa",
    keywords: "Maharashtra 8A document, agriculture land record Maharashtra, download 8A Maharashtra",
    schemaType: "HowTo"
  },
  "how-to-download-maharashtra-property-card-using-jaaga-app": {
    title: "Maharashtra Property Card Download Online (Malmatta Patrak)",
    description: "Download your Maharashtra Property Card (Malmatta Patrak) online using district, taluka, village and survey or CTS number. Steps plus a fix for 'No Record Found'.",
    h1: "How to Download Maharashtra Property Card Using the JaaGa App",
    keywords: "Maharashtra property card download, Malmatta Patrak, JaaGa Maharashtra",
    schemaType: "HowTo",
    quickAnswer: "To download a Maharashtra Property Card (Malmatta Patrak), select Property Card in the JaaGa app or on Mahabhulekh, choose your district, taluka and village or division, and enter the survey or CTS number. If you see \"No Record Found\", re-check the village selection and enter the number exactly as it appears in your documents.",
    sources: [
      { name: "Mahabhulekh (Maharashtra land records)", url: "https://bhulekh.mahabhumi.gov.in" }
    ]
  },
  "document-translation-for-property-documents": {
    title: "Property Document Translation in India: What You Need to Know",
    description: "When and why to get property documents translated in India — which documents need certified translation, languages covered, and how to avoid errors.",
    h1: "Property Document Translation in India: A Complete Guide",
    keywords: "property document translation India, certified translation property, land record translation",
    schemaType: "Article"
  },
  "what-is-legal-opinion-and-why-its-crucial-for-property-buyers-in-india": {
    title: "Legal Opinion for Property in India: What It Is & Why You Need It",
    description: "What is a legal opinion for property in India? What lawyers check, what's included in the report, cost, and why it's essential before any property purchase.",
    h1: "What Is a Legal Opinion and Why Is It Crucial for Property Buyers in India",
    keywords: "legal opinion property India, property lawyer opinion, legal opinion letter property",
    schemaType: "Article"
  },
  "how-to-download-odisha-plot-map-bhunaksha-simple-and-fast-using-jaaga": {
    title: "Bhunaksha Odisha Plot Map: Download by Khatiyan & Plot No",
    description: "Download your Odisha Bhunaksha plot map online in a few minutes. You need the district, village, khatiyan number and plot ID. Step-by-step guide with fixes.",
    h1: "How to Download Odisha Plot Map (Bhunaksha) Simply and Fast Using JaaGa",
    keywords: "Odisha Bhunaksha download, Odisha plot map, land map Odisha online",
    schemaType: "HowTo",
    quickAnswer: "Bhunaksha is Odisha's digital plot map, showing a plot's shape, boundaries and location. To download it, choose Plot Map / Bhunaksha, select your district and block or village, then enter the khatiyan number and plot ID. Most errors come from a wrong village selection or plot ID, so copy them exactly from your land record.",
    sources: [
      { name: "Bhunaksha Odisha (plot maps)", url: "https://bhunakshaodisha.nic.in" }
    ]
  },
  "karnataka-khata-extract-how-to-download-khata-online-using-jaaga-portal": {
    title: "Download Karnataka Khata Extract Online Using JaaGa Portal",
    description: "Step-by-step guide to download Karnataka Khata Extract online using the JaaGa portal. Get your Khata certificate quickly without visiting government offices.",
    h1: "How to Download Karnataka Khata Extract Online Using the JaaGa Portal",
    keywords: "download Khata extract Karnataka, JaaGa Khata, Karnataka Khata online",
    schemaType: "HowTo"
  },
  "is-your-dream-home-a-legal-trap-how-to-avoid-real-estate-fraud-in-telangana": {
    title: "Avoid Real Estate Fraud in Telangana: Legal Traps to Watch Out For",
    description: "Is your dream home in Telangana a legal trap? Common real estate frauds, how to spot them, and the checks every buyer must do before signing anything.",
    h1: "Is Your Dream Home a Legal Trap? How to Avoid Real Estate Fraud in Telangana",
    keywords: "real estate fraud Telangana, property scam Hyderabad, legal trap property Telangana",
    schemaType: "Article"
  },
  "key-points-to-check-before-buying-property-in-telangana": {
    title: "Key Points to Check Before Buying Property in Telangana (2026)",
    description: "Essential checklist before buying property in Telangana — title verification, EC, Pahani, RERA registration, layout approvals, and prohibited land checks.",
    h1: "Key Points to Check Before Buying Property in Telangana",
    keywords: "buy property Telangana checklist, property checks Telangana, Telangana property buying guide",
    schemaType: "Article"
  },
  "must-known-facts-before-registering-property-in-telangana-a-complete-guide-by-jaaga": {
    title: "Must-Know Facts Before Registering Property in Telangana | JaaGa",
    description: "Complete guide by JaaGa on everything you must know before registering property in Telangana — stamp duty, documents, process, and legal checks.",
    h1: "Must-Know Facts Before Registering Property in Telangana: A Complete Guide",
    keywords: "property registration Telangana, stamp duty Telangana, Telangana registration guide",
    schemaType: "Article"
  },
  "how-to-download-andhra-pradesh-certified-copy-online-using-jaaga": {
    title: "AP Certified Copy (Nakal) Online: Download with Doc Number",
    description: "Get a certified copy (Nakal) of a registered document in Andhra Pradesh online. You only need the SRO, document number and year. Steps, uses and validity.",
    h1: "How to Download Andhra Pradesh Certified Copy Online Using JaaGa",
    keywords: "Andhra Pradesh certified copy, AP property documents download, JaaGa Andhra Pradesh",
    schemaType: "HowTo",
    quickAnswer: "A certified copy (Nakal) is an official copy of a document registered at a Sub-Registrar Office in Andhra Pradesh, and it is legally valid. To get one online, you need three details: the Sub-Registrar Office (SRO) where it was registered, the document number, and the registration year.",
    sources: [
      { name: "IGRS Andhra Pradesh (Registration & Stamps)", url: "https://registration.ap.gov.in" }
    ]
  },
  "tamil-nadu-fmb-sketch-guide": {
    title: "Tamil Nadu FMB Sketch Guide: View, Download & Verify Online",
    description: "How to view, download, and verify FMB (Field Measurement Book) sketches in Tamil Nadu. Official portal steps, what the map shows, and common issues.",
    h1: "Tamil Nadu FMB Sketch Guide: How to View, Download and Verify",
    keywords: "Tamil Nadu FMB sketch, FMB download Tamil Nadu, field measurement book TN",
    schemaType: "Article"
  },
  "jaaga-property-registration-services-one-stop-solution": {
    title: "JaaGa Property Registration Services: One-Stop Solution India",
    description: "JaaGa's end-to-end property registration services in India — document verification, legal opinion, stamp duty guidance, and registration support.",
    h1: "JaaGa Property Registration Services: Your One-Stop Solution",
    keywords: "JaaGa property registration, property registration service India, document verification service",
    schemaType: "Article"
  },
  "understanding-satbara-7-12-utara-land-records-maharashtra": {
    title: "Satbara (7/12 Utara) Land Records Maharashtra: Complete Guide",
    description: "What is Satbara or 7/12 Utara in Maharashtra? How to read, download, and use this land record for property verification, loans, and ownership proof.",
    h1: "Understanding Satbara (7/12 Utara) Land Records in Maharashtra",
    keywords: "Satbara Maharashtra, 7/12 Utara, Maharashtra land record 7 12",
    schemaType: "Article"
  },
  "transforming-banking-due-diligence-how-jaaga-ends-manual-verification-for-home-loans": {
    title: "How JaaGa Transforms Banking Due Diligence for Home Loans",
    description: "How JaaGa eliminates manual property verification for home loans — automated due diligence, faster approvals, and reduced risk for banks and borrowers.",
    h1: "Transforming Banking Due Diligence: How JaaGa Ends Manual Verification for Home Loans",
    keywords: "banking due diligence property, home loan verification, JaaGa banks",
    schemaType: "Article"
  },
  "hyderabad-property-valuers-professional-valuation-service": {
    title: "Hyderabad Property Valuers: Professional Valuation Service Guide",
    description: "How to find reliable property valuers in Hyderabad. What a professional valuation covers, costs, who needs it, and how JaaGa supports the process.",
    h1: "Hyderabad Property Valuers: Your Guide to Professional Property Valuation",
    keywords: "property valuer Hyderabad, property valuation Hyderabad, Hyderabad real estate valuation",
    schemaType: "Article"
  },
  "apply-for-property-mutation-in-telangana-complete-guide-2025": {
    title: "Property Mutation in Telangana: How to Apply — Complete Guide",
    description: "How to apply for property mutation in Telangana — documents required, online and offline process, fees, timeline, and common mistakes to avoid.",
    h1: "How to Apply for Property Mutation in Telangana: Complete Guide",
    keywords: "property mutation Telangana, mutation application Telangana, Dharani mutation",
    schemaType: "HowTo"
  },
  "tamil-nadu-patta-chitta-documents-a-complete-guide": {
    title: "Tamil Nadu Patta & Chitta Documents: Complete Guide 2026",
    description: "What are Patta and Chitta documents in Tamil Nadu? How to download, verify, and use them for property ownership proof and land transactions.",
    h1: "Tamil Nadu Patta and Chitta Documents: A Complete Guide",
    keywords: "Tamil Nadu Patta Chitta, Patta certificate Tamil Nadu, Chitta land record TN",
    schemaType: "Article"
  },
  "how-to-prove-legal-ownership-of-a-property-complete-guide-india-2025": {
    title: "How to Prove Legal Property Ownership in India: Complete Guide",
    description: "How to prove you legally own a property in India — which documents establish ownership, how to handle disputes, and what to do if records are missing.",
    h1: "How to Prove Legal Ownership of a Property: Complete Guide for India",
    keywords: "prove property ownership India, property ownership documents India, legal title property",
    schemaType: "Article"
  },
  "property-title-search-india-find-locate-property-ownership": {
    title: "Property Title Search in India: How Buyers Can Find and Locate Property Ownership Before Buying",
    description: "Learn how to find and locate property ownership, verify the title chain, check the right records, and spot red flags before you buy property in India.",
    h1: "Property Title Search in India: How Buyers Can Find and Locate Property Ownership Before Buying",
    keywords: "property title search, find and locate property, find property by name, locate property ownership, property ownership search, property record search, title verification, land records lookup, check property before buying",
    schemaType: "BlogPosting"
  },
  "telangana-stamp-duty-registration-charges-all-deed-types": {
    title: "Stamp Duty & Registration Charges in Telangana 2026 | All Deed Types",
    description: "Current Telangana stamp duty, transfer duty and registration fee for sale, gift, GPA, mortgage, lease, partition, will and settlement deeds. Verified against IGRS.",
    h1: "Stamp Duty and Registration Charges in Telangana (2026): Rates for Every Deed Type",
    keywords: "telangana stamp duty, registration charges in telangana, stamp duty telangana 2026, sale deed registration charges telangana, gift deed stamp duty telangana",
    schemaType: "BlogPosting"
  },
  "telangana-market-value-check-online-2026": {
    title: "Telangana Market Value 2026: How to Check New Land & Flat Rates",
    description: "Telangana revised property market values from 5 June 2026. How to check the new land and apartment rates on the IGRS portal, how they are calculated, and what they mean for your stamp duty.",
    h1: "Market Value of Property in Telangana (2026): How to Check the New Rates After the June Revision",
    keywords: "telangana market value 2026, market value search telangana, igrs telangana market value, telangana land market value, flat market value hyderabad, telangana revised market values june 2026, stamp duty deficit challan telangana",
    schemaType: "BlogPosting"
  },
  "pattadar-passbook-telangana-bhu-bharati-download-correction": {
    title: "Pattadar Passbook Download on Bhu Bharati (Dharani Replaced)",
    description: "Dharani was replaced by Bhu Bharati in April 2025. Download your Pattadar Passbook by survey or passbook number, get a duplicate, and fix errors. 2026 steps.",
    h1: "Pattadar Passbook in Telangana (2026): How to Download, Correct or Replace It on Bhu Bharati",
    keywords: "pattadar passbook telangana, pattadar passbook download, bhu bharati pattadar passbook, bhu bharati passbook download, duplicate pattadar passbook, pattadar passbook correction, pattadar passbook name correction, eppb download telangana, bhu bharati land details search, dharani passbook",
    schemaType: "BlogPosting",
    quickAnswer: "Telangana land records moved from Dharani to Bhu Bharati on 14 April 2025. To download your Pattadar Passbook, go to bhubharati.telangana.gov.in, open Land Details Search, and search by survey number or passbook number. Passbooks issued under Dharani stay valid; new corrections and duplicates are handled on Bhu Bharati.",
    sources: [
      { name: "Bhu Bharati (Telangana land records)", url: "https://bhubharati.telangana.gov.in" }
    ]
  },
  "ap-freehold-land-registration-ban-lifted-2026": {
    title: "AP Freehold Land Registration Ban Lifted: 9 Lakh Acres",
    description: "Andhra Pradesh has reopened registration for about 9 lakh acres of freehold land. What changed, which lands are still barred, and how to check yours.",
    h1: "Andhra Pradesh Lifts the Freehold Land Registration Ban: What It Means for 9 Lakh Acres",
    keywords: "ap freehold land registration, freehold lands andhra pradesh, assigned land registration ap, ap assigned lands act 1977, webland freehold status, 22a prohibited list andhra pradesh, chukkala dotted lands ap, village service inam lands, d patta land sale ap, ap land registration 2026",
    schemaType: "BlogPosting"
  }
};

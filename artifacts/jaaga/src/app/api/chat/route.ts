import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are JaaGa AI Assistant — a helpful property legal intelligence assistant for JaaGa (jaaga.ai), an Indian real estate platform.

You specialize in:
- Property documents (sale deeds, encumbrance certificates, title reports, legal opinions)
- Indian property law and due diligence
- Land records (Telangana, Andhra Pradesh, and other states)
- Property verification steps for buyers, banks, and NBFCs
- RERA regulations, property registration, stamp duty
- Explaining documents in simple terms

Keep answers clear, concise, and focused on Indian real estate. If a question is outside your domain, politely redirect to property-related topics. Always recommend consulting a qualified lawyer for specific legal advice.

FORMATTING INSTRUCTIONS:
- Keep the language conversational, natural, and simple.
- Use spacing, paragraphs, and lists to make responses easy to read.
- Use simple hyphens (-) or standard numbers (1., 2., etc.) followed by a space for listed points.
- Minimize dense bold text, but when bolding specifically important terms, use double asterisks (**term**).
- Avoid hashing symbols (#) entirely.`;

function getLocalFallbackResponse(query: string): string {
  const lower = query.toLowerCase().trim();

  // Telugu language detection
  const isTelugu = /[\u0c00-\u0c7f]/i.test(query) || lower.includes("telugu") || lower.includes("నమస్తే") || lower.includes("ధర");

  if (isTelugu) {
    if (lower.includes("ధర") || lower.includes("ఫీజు") || lower.includes("ఖర్చు") || lower.includes("cost") || lower.includes("price") || lower.includes("fee")) {
      return `నమస్తే! జాగా (JaaGa) సేవలకు సంబంధించిన ధరల వివరాలు ఇక్కడ ఉన్నాయి:

- దస్తావేజు పరిశీలన (Title Verification): ₹5,999 (కోర్టు కేసులు, మార్టిగేజ్ వివరాలు సహా)
- మ్యుటేషన్ (Mutation): ₹1,999 + ప్రభుత్వ రుసుము (ఆస్తి విలువలో 0.1%)
- ఖాళీ స్థల పన్ను నమోదు (VLTIN): ₹1,999 + ప్రభుత్వ రుసుము
- ఈసీ (Certified Encumbrance Certificate): ₹499 నుండి ₹2,999 వరకు
- డిజిటల్ ల్యాండ్ సర్వే (Digital Survey): ₹9,999

మరిన్ని వివరాల కోసం దయచేసి మా వెబ్‌సైట్ సందర్శించండి:
👉 www.jaaga.ai`;
    }
    return `నమస్తే! నేను జాగా (JaaGa) AI అసిస్టెంట్ ని. నేను మీకు భూమి రికార్డులు, మ్యుటేషన్, ఈసీ, సేల్ డీడ్ దస్తావేజులు మరియు ఇతర ఆస్తి సేవల గురించి సమాచారాన్ని అందించగలను.

మీకు ఏ సేవ గురించి సమాచారం కావాలో అడగండి!
👉 మా వెబ్‌సైట్: www.jaaga.ai
👉 మా యాప్ డౌన్‌లోడ్ చేసుకోండి: https://www.jaaga.ai/app#`;
  }

  // English responder
  if (lower.includes("price") || lower.includes("cost") || lower.includes("fee") || lower.includes("charge") || lower.includes("how much") || lower.includes("pricing")) {
    return `Here are JaaGa's standard service fees (exclusive of government charges where applicable):

- **Mortgage Report** → ₹99
- **Property Valuation** → ₹999
- **Property Monitoring & Alerts** → ₹2,499
- **Court Case Check** → ₹2,999
- **Rectification Deed** → ₹2,999
- **Find / Locate Property** → ₹4,999
- **Legal Opinion / Title Verification** → ₹5,999
- **Digital Land Survey** → ₹9,999
- **Mutation Creation** → ₹1,999 (JaaGa service fee) + Govt. fees (0.1% of property market value)
- **PTIN Creation** → ₹9,999 (JaaGa service fee)
- **VLTIN Creation** → ₹1,999 (JaaGa service fee) + Govt. fees

*For Certified Documents:*
- **Encumbrance Certificate (EC)** → Soft Copy is Free. Certified Copies range from ₹499 (for years 2023-2025) to ₹2,999 (for years 1950-1982).
- **Certified Sale Deed** → Ranges from ₹699 (2014-2025) to ₹2,499 (1950-1989).

👉 For more details or to book a service, please visit: www.jaaga.ai`;
  }

  if (lower.includes("ec") || lower.includes("encumbrance")) {
    return `An **Encumbrance Certificate (EC)** is a crucial document that proves whether a property is free from any legal or financial liabilities (mortgages, title disputes, liens).

**How JaaGa helps:**
- Instant online search and download of digital ECs for Telangana, Andhra Pradesh, Tamil Nadu, and more.
- Certified EC copies with government holograms delivered to your door or property locker.
- Comprehensive chain-of-title verification spanning up to 40+ years.

👉 Search or download EC on JaaGa: www.jaaga.ai`;
  }

  if (lower.includes("mutation") || lower.includes("ptin") || lower.includes("vltin") || lower.includes("tax")) {
    return `JaaGa provides seamless online property registration and tax services:

1. **Mutation & PTIN**: We help register mutation on land and generate PTIN for tax assessments.
2. **Vacant Land Tax (VLTIN)**: Complete creation and tracking for vacant land tax registration.
3. **Utility Bill Payments**: Easily pay Property Tax, Electricity, and Water Bills through our secure gateway.

Our team collects your documents digitally, verifies them with experts, and submits them to the respective government departments on your behalf.

👉 Check out our services: www.jaaga.ai/services`;
  }

  if (lower.includes("document") || lower.includes("locker") || lower.includes("safe") || lower.includes("store")) {
    return `JaaGa offers a secure **Property Locker** service where you can upload, manage, and store all your legal property documents safely.

Our security systems use high-level encryption to ensure your data is always private and accessible whenever you need it. We also offer certified document retrieval (Encumbrance Certificates, Sale Deeds, Adangal/Pahani) directly to your locker.

👉 Try Property Locker today: www.jaaga.ai`;
  }

  if (lower.includes("survey") || lower.includes("map") || lower.includes("measurement")) {
    return `JaaGa offers professional **Digital Land Survey** services for ₹9,999.

Our expert surveyors use advanced high-precision digital equipment and DGPS technology to map boundaries, check encroachment, and resolve land disputes. You receive a fully detailed digital survey map and boundary report.

👉 Learn more or book a survey: www.jaaga.ai`;
  }

  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey") || lower.includes("greetings")) {
    return `Hello! I am your JaaGa AI Assistant. I can help you understand property documents, land laws, JaaGa's services, and pricing in India.

How can I help you today?
- Ask about **Mutation, PTIN, or EC**
- Ask about **Pricing & Fees**
- Ask about **Digital Land Surveys** or **Legal Opinions**

👉 Visit our website: www.jaaga.ai`;
  }

  return `I am JaaGa's AI Assistant, specialized in Indian property laws, land records, and JaaGa services (like mutation, PTIN, certified sale deeds, property lockers, and digital land surveys).

To help you best:
- For pricing, ask **"What are your fees?"**
- For property registration, ask **"How to register mutation?"**
- For land maps, ask **"Tell me about Digital Land Survey"**

👉 Visit our website for a full experience: www.jaaga.ai
👉 Download our official app: https://www.jaaga.ai/app#`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const message = body?.message;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const cleanMessage = message.trim();
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      const reply = getLocalFallbackResponse(cleanMessage);
      return NextResponse.json({ reply });
    }

    const models = ["gemini-2.5-flash", "gemini-1.5-flash"];
    for (const model of models) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    { text: `${SYSTEM_PROMPT}\n\nUser Question: ${cleanMessage}` },
                  ],
                },
              ],
            }),
          }
        );

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            return NextResponse.json({ reply: text });
          }
        }
      } catch (err) {
        console.error(`Gemini fetch error with ${model}:`, err);
      }
    }

    const fallbackReply = getLocalFallbackResponse(cleanMessage);
    return NextResponse.json({ reply: fallbackReply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { reply: "I am JaaGa AI Assistant. How can I help you with property documents, legal verification, or land records today?" },
      { status: 200 }
    );
  }
}

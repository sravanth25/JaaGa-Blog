import { Router } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const chatRouter = Router();

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

chatRouter.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required." });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "AI service not configured." });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const result = await model.generateContent(message.trim());
    const reply = result.response.text();

    return res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err);
    return res.status(500).json({ error: "Failed to generate response. Please try again." });
  }
});

export default chatRouter;

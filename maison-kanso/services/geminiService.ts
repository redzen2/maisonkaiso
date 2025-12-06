import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

const SYSTEM_INSTRUCTION = `
You are Kanso, an expert interior design consultant for 'Maison Kanso', a high-end minimalist home brand.
Your goal is to help customers design serene, wabi-sabi inspired spaces.

Key Traits:
- Tone: Sophisticated, calm, artistic, and helpful.
- Philosophy: You believe in "Less is more", natural materials, and the beauty of imperfection.
- Expertise: Furniture arrangement, color palettes (neutrals, earth tones), and material selection (linen, stone, wood).

Instructions:
- Ask clarifying questions about the user's room (dimensions, lighting, current style).
- Suggest products from the 'Maison Kanso' imaginary catalog: "Kyoto Lounge Chair", "Wabi Sabi Vase", "Akari Lamps", "Linen Throws".
- Keep responses concise and elegant. Do not use emojis.
`;

export const initGemini = () => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is missing");
    return;
  }
  if (!genAI) {
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
};

export const startChat = () => {
  initGemini();
  if (!genAI) throw new Error("Gemini not initialized");

  chatSession = genAI.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    startChat();
  }
  if (!chatSession) {
      return "I apologize, I am currently unable to connect. Please check your configuration.";
  }

  try {
    const response = await chatSession.sendMessage({ message });
    return response.text || "I am reflecting on your request...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I am currently experiencing a moment of silence. Please try again shortly.";
  }
};
"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

interface ChatSectionProps {
  context: {
    tithi: string;
    nakshatra: string;
    paksha: string;
  };
}

export function ChatSection({ context }: ChatSectionProps) {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    {
      role: "ai",
      text: `Namaskaram. You arrived during ${context.tithi} in ${context.nakshatra}. Is there anything you'd like to ask about your cosmic alignment?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const apiKey = (process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY)?.trim();
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        setMessages((prev) => [...prev, { role: "ai", text: "I cannot connect to the cosmos right now (API key not set)." }]);
        setLoading(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are a calm, grounded, and wise guide familiar with Sanatana Dharma cosmic time. 
The user's cosmic birth context is:
Tithi: ${context.tithi}
Nakshatra: ${context.nakshatra}
Paksha: ${context.paksha}

Rules for your response:
- Keep it simple, brief, and grounded. 1-2 short paragraphs maximum.
- Avoid heavy jargon. No predictions, astrology charts, or fear-based language.
- Focus on self-discovery, nature's cycles, and personal reflection.
- Be conversational but respectful.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: userMessage,
        config: {
          systemInstruction,
        }
      });

      if (response.text) {
        setMessages((prev) => [...prev, { role: "ai", text: response.text }]);
      } else {
        setMessages((prev) => [...prev, { role: "ai", text: "I'm having trouble interpreting the cosmic alignment." }]);
      }
    } catch (e: any) {
      setMessages((prev) => [...prev, { role: "ai", text: "Something went wrong feeling the cosmic rhythm. Please check if your API key is valid." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl p-6 md:p-8 border border-stone-200 shadow-[0_4px_20px_rgba(217,119,6,0.05)] mt-12 mb-24">
      <h3 className="font-serif text-2xl mb-6 text-stone-900 underline decoration-saffron/30 decoration-2 underline-offset-4">
        Seek Guidance
      </h3>
      
      <div className="space-y-6 mb-6 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-5 py-3 ${
                msg.role === "user"
                  ? "bg-stone-800 text-white rounded-tr-sm"
                  : "bg-[#FFF9F0] text-stone-800 rounded-tl-sm border border-stone-200/50"
              }`}
            >
              <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#FFF9F0] text-stone-800 rounded-2xl rounded-tl-sm px-5 py-3 flex gap-1 items-center border border-stone-200/50">
              <div className="w-1.5 h-1.5 rounded-full bg-stone-300 animate-bounce"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-stone-300 animate-bounce" style={{ animationDelay: "0.15s" }}></div>
              <div className="w-1.5 h-1.5 rounded-full bg-stone-300 animate-bounce" style={{ animationDelay: "0.3s" }}></div>
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about your birth star..."
          className="w-full bg-[#FDFBF7] border border-stone-200 rounded-lg px-3 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-saffron/30 text-stone-900 placeholder:text-stone-400 transition-all text-sm italic"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 flex items-center text-saffron hover:text-saffron-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-bold text-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

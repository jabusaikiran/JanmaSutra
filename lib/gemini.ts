import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";

export async function generateIdentityInsight(tithi: string, nakshatra: string, paksha: string) {
  const apiKey = (process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY)?.trim();

  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return {
      insight: "Your birth alignment carries a unique cosmic meaning.",
      archetype: "The Seeker",
      coreTrait: "Curious and grounded",
      behavior: "seek truth and balance",
      strength: "Inner resilience"
    };
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `Based on the Sanatana Dharma Panchang system, a person is born under:
Tithi: ${tithi}
Nakshatra: ${nakshatra}
Paksha: ${paksha}

Generate a modern, relatable, and deeply personal "Identity Insight" based on this combination.
The tone should be:
- Calm, respectful, and slightly poetic
- Empathic and emotionally engaging
- Simple English, avoiding heavy Sanskrit jargon, westernized pop-astrology, or predictions.
- Speak about their inherent nature and strengths based on the cosmic rhythm.

Return the response strictly as a JSON object matching this schema:
{
  "insight": "A 3-5 line paragraph explaining their core nature beautifully.",
  "archetype": "A 1-3 word title (e.g. 'The Grounded Creator').",
  "coreTrait": "A short phrase describing their main trait.",
  "behavior": "A short phrase describing how they naturally act (e.g. 'find beauty in the details').",
  "strength": "A short phrase describing their key strength."
}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insight: { type: Type.STRING },
            archetype: { type: Type.STRING },
            coreTrait: { type: Type.STRING },
            behavior: { type: Type.STRING },
            strength: { type: Type.STRING }
          },
          required: ["insight", "archetype", "coreTrait", "behavior", "strength"]
        }
      }
    });

    const jsonStr = response.text || "{}";
    return JSON.parse(jsonStr);
  } catch (error: any) {
    // Return mock data gracefully on error without polluting the server logs
    return {
      insight: "Your birth reflects a calm alignment with nature. You carry an inherent balance between steady growth and creative expression.",
      archetype: "The Gentle Doer",
      coreTrait: "Steadfast and nurturing",
      behavior: "bring harmony to your surroundings",
      strength: "Quiet persistence"
    };
  }
}

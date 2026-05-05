import { GoogleGenAI, Type } from "@google/genai";

/**
 * Gets the Gemini API key from environment variables.
 */
function getApiKey(): string | undefined {
  return (process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY)?.trim();
}

/**
 * Validates if the API key is present and not a placeholder.
 */
function isApiKeyValid(apiKey?: string): boolean {
  return !!apiKey && apiKey !== "MY_GEMINI_API_KEY";
}

export async function generateIdentityInsight(tithi: string, nakshatra: string, paksha: string) {
  const apiKey = getApiKey();
  if (!isApiKeyValid(apiKey)) {
    return {
      insight: "Your birth alignment carries a unique cosmic meaning. You possess an inherent balance between steady growth and creative expression.",
      archetype: "The Seeker",
      coreTrait: "Curious and grounded",
      behavior: "seek truth and balance",
      strength: "Inner resilience"
    };
  }

  const ai = new GoogleGenAI({ apiKey: apiKey! });
  const prompt = `Based on the Sanatana Dharma Panchang system, a person is born under:
Tithi: ${tithi}
Nakshatra: ${nakshatra}
Paksha: ${paksha}

Generate a modern, relatable, and deeply personal "Identity Insight".
Tone: Calm, respectful, poetic, empathic, avoids western pop-astrology.

JSON Request:
{
  "insight": "3-5 line paragraph",
  "archetype": "1-3 word title",
  "coreTrait": "Short phrase",
  "behavior": "Short phrase",
  "strength": "Short phrase"
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

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Identity Insight error:", error);
    return {
      insight: "Your birth reflects a calm alignment with nature. You carry an inherent balance between steady growth and creative expression.",
      archetype: "The Gentle Doer",
      coreTrait: "Steadfast and nurturing",
      behavior: "bring harmony to your surroundings",
      strength: "Quiet persistence"
    };
  }
}

export async function generateTodayInsight(tithi: string, nakshatra: string) {
  const apiKey = getApiKey();
  if (!isApiKeyValid(apiKey)) {
    return { insight: "Today is a day for steady progress. Align your actions with the natural flow of time." };
  }

  const ai = new GoogleGenAI({ apiKey: apiKey! });
  const prompt = `Today's Panchang: Tithi is ${tithi} and Nakshatra is ${nakshatra}. 
  Generate a short 2-3 line reflective "Today's Insight". Calm, poetic, simple English.
  JSON Request: { "insight": "string" }`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: { insight: { type: Type.STRING } },
          required: ["insight"]
        }
      }
    });
    return JSON.parse(response.text || '{"insight": "Embrace the rhythm of the day with grace."}');
  } catch (error) {
    console.error("Gemini Today Insight error:", error);
    return { insight: "Embrace the rhythm of the day with grace and steady focus." };
  }
}

export async function generateFamilyInsight(familyNakshatras: string[]) {
  const apiKey = getApiKey();
  if (!isApiKeyValid(apiKey)) {
    return { insight: "Your family carries a diverse yet harmonious blend of energies. Together, you form a resilient support system." };
  }

  const ai = new GoogleGenAI({ apiKey: apiKey! });
  const prompt = `Family Nakshatras: ${familyNakshatras.join(", ")}.
  Generate a 2-4 line reflective insight on collective family energy. Warm, harmonious.
  JSON Request: { "insight": "string" }`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: { insight: { type: Type.STRING } },
          required: ["insight"]
        }
      }
    });
    return JSON.parse(response.text || '{"insight": "Your family forms a beautiful tapestry of shared strengths."}');
  } catch (error) {
    console.error("Gemini Family Insight error:", error);
    return { insight: "Your family forms a beautiful tapestry of shared strengths and mutual growth." };
  }
}

export async function culturalAI(query: string) {
  const apiKey = getApiKey();
  if (!isApiKeyValid(apiKey)) {
    return { response: "I am here to help you explore Sanatana Dharma. Please ask any cultural question." };
  }

  const ai = new GoogleGenAI({ apiKey: apiKey! });
  const prompt = `Cultural Assistant specialized in Sanatana Dharma. Answer Query: ${query}
  JSON Request: { "response": "string" }`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: { response: { type: Type.STRING } },
          required: ["response"]
        }
      }
    });
    return JSON.parse(response.text || '{"response": "Cultural wisdom is a journey of exploration."}');
  } catch (error) {
    console.error("Gemini Cultural AI error:", error);
    return { response: "Cultural wisdom is a journey of exploration. I'll be here to guide you." };
  }
}

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

export async function generateTodayInsight(tithi: string, nakshatra: string) {
  const apiKey = (process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY)?.trim();
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return { insight: "Today is a day for steady progress. Align your actions with the natural flow of time." };
  }

  const ai = new GoogleGenAI({ apiKey });
  const prompt = `Today's Panchang: Tithi is ${tithi} and Nakshatra is ${nakshatra}. 
  Generate a short 2-3 line reflective "Today's Insight" based on this combination. 
  The tone should be:
  - Calm, respectful, and slightly poetic
  - Focus on how one can align their mindset for the day.
  - Simple English.
  
  Return strictly as a JSON object: { "insight": "string" }`;

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
  } catch {
    return { insight: "Embrace the rhythm of the day with grace and steady focus." };
  }
}

export async function generateFamilyInsight(familyNakshatras: string[]) {
  const apiKey = (process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY)?.trim();
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return { insight: "Your family carries a diverse yet harmonious blend of energies. Together, you form a resilient support system." };
  }

  const ai = new GoogleGenAI({ apiKey });
  const prompt = `A family has members born under these Nakshatras: ${familyNakshatras.join(", ")}.
  Generate a 2-4 line reflective insight on the collective family energy and how they complement each other.
  The tone should be warm, respectful, and focused on harmony.
  
  Return strictly as a JSON object: { "insight": "string" }`;

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
  } catch {
    return { insight: "Your family forms a beautiful tapestry of shared strengths and mutual growth." };
  }
}

export async function culturalAI(query: string) {
  const apiKey = (process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY)?.trim();
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return { response: "I am here to help you explore Sanatana Dharma. Please ask any cultural question." };
  }

  const ai = new GoogleGenAI({ apiKey });
  const prompt = `You are a respectful and knowledgeable Cultural Assistant specializing in Sanatana Dharma, Vedic concepts, and Panchang traditions. 
  Answer the following query clearly, simply, and with deep cultural context.
  Query: ${query}
  
  Return strictly as a JSON object: { "response": "string" }`;

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
  } catch {
    return { response: "Cultural wisdom is a journey of exploration. I'll be here to guide you." };
  }
}

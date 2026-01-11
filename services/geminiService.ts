
import { GoogleGenAI, Type } from "@google/genai";
import { StorageProvider } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const fetchStorageIntelligence = async (query: string): Promise<{providers: StorageProvider[], analysis: string}> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Research and provide a list of data storage platforms and their analogs (alternatives) based on the user's focus: "${query}". 
      Include free platforms, open networking protocols (like IPFS), and traditional cloud providers.
      Format the response with a set of structured provider data and a general analysis of current trends in storage infrastructure.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            providers: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  category: { type: Type.STRING },
                  freeTier: { type: Type.STRING },
                  pros: { type: Type.ARRAY, items: { type: Type.STRING } },
                  cons: { type: Type.ARRAY, items: { type: Type.STRING } },
                  description: { type: Type.STRING },
                  securityRating: { type: Type.NUMBER }
                },
                required: ["id", "name", "category", "description"]
              }
            },
            analysis: { type: Type.STRING }
          },
          required: ["providers", "analysis"]
        }
      }
    });

    const data = JSON.parse(response.text || '{}');
    return data;
  } catch (error) {
    console.error("Error fetching storage intelligence:", error);
    throw error;
  }
};

import { GoogleGenAI, Type } from "@google/genai";
import { AiModel } from "../types";

// NOTE: In a real production app, never expose API keys on the client.
// This is for demonstration purposes as per instructions.
// The user is expected to have process.env.API_KEY available.

const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const generateGraphData = async (text: string, model: AiModel) => {
  const prompt = `Analyze the following regulatory text and generate structured JSON data for 6 graphs.
  The graphs are:
  1. Timeline: Regulatory deadlines (date YYYY-MM-DD, event description, type like US/EU/CN).
  2. ComplianceHeatmap: Regions (North America, Europe, etc), score (0-100), complexity (0-100).
  3. RiskMatrix: List of devices/systems mentioned, their probability (0-100), severity (0-100), category.
  4. TechNetwork: Relationships between concepts (source, target, value 1-10).
  5. Checklist: Compliance phases, progress (0-100), status.
  6. Burden: Metrics (Cost, Time, etc) values for US, EU, CN.
  
  Return ONLY the JSON.
  Text: ${text.substring(0, 30000)}...`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                timeline: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { date: {type: Type.STRING}, event: {type: Type.STRING}, type: {type: Type.STRING} } } },
                complianceHeatmap: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { region: {type: Type.STRING}, score: {type: Type.NUMBER}, complexity: {type: Type.NUMBER} } } },
                riskMatrix: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { id: {type: Type.STRING}, name: {type: Type.STRING}, probability: {type: Type.NUMBER}, severity: {type: Type.NUMBER}, category: {type: Type.STRING} } } },
                techNetwork: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { source: {type: Type.STRING}, target: {type: Type.STRING}, value: {type: Type.NUMBER} } } },
                checklist: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { phase: {type: Type.STRING}, progress: {type: Type.NUMBER}, status: {type: Type.STRING} } } },
                burden: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { metric: {type: Type.STRING}, us: {type: Type.NUMBER}, eu: {type: Type.NUMBER}, cn: {type: Type.NUMBER} } } },
            }
        }
      }
    });
    return response.text ? JSON.parse(response.text) : null;
  } catch (error) {
    console.error("Gemini Graph Gen Error", error);
    throw error;
  }
};

export const chatWithArticle = async (history: {role: string, content: string}[], articleContext: string, model: AiModel) => {
    try {
        const chat = ai.chats.create({
            model: model,
            history: [
                { role: 'user', parts: [{ text: `Context: ${articleContext.substring(0, 25000)}` }] },
                { role: 'model', parts: [{ text: "Understood. I will answer questions based on this medical regulatory text." }] },
                ...history.map(h => ({ role: h.role, parts: [{ text: h.content }] }))
            ]
        });

        // The last message in history provided to this function is the new user message, 
        // but `chats.create` history expects previous turns. 
        // So actually we should reconstruct differently.
        // Simplified: Create chat with context, then send the LAST message.
        
        // Correct approach for this stateless wrapper:
        // We initialize a new chat every time with full history for simplicity in this demo,
        // or we maintain chat instance in React state. Let's do stateless here for safety.
        
        const response = await ai.models.generateContent({
            model: model,
            contents: [
                { role: 'user', parts: [{ text: `System Instruction: You are a MedTech Regulatory Expert. Answer based on the context provided.\n\nContext: ${articleContext.substring(0, 20000)}` }] },
                ...history.map(h => ({ role: h.role, parts: [{ text: h.content }] }))
            ]
        });
        
        return response.text;
    } catch (e) {
        console.error("Chat Error", e);
        throw e;
    }
}

export const runMagicTool = async (toolName: string, text: string, model: AiModel, params?: any) => {
    let prompt = "";
    switch(toolName) {
        case 'summarize':
            prompt = `Summarize this medical regulatory text. Level: ${params?.level || 'Executive'}. Length: ${params?.length || 'Paragraph'}. Text: ${text}`;
            break;
        case 'keywords':
            prompt = `Extract top 10 keywords and concept clusters from this text. Return as JSON list of strings. Text: ${text}`;
            break;
        case 'gap':
            prompt = `Act as a Regulatory Gap Analyzer. Identify compliance gaps based on this text for a generic Class IIb AI device. Text: ${text}`;
            break;
        case 'citation':
            prompt = `Generate citations for this text in APA, IEEE, and Regulatory standard formats. Text: ${text}`;
            break;
        case 'translate':
            prompt = `Translate the following summary of the text into Traditional Chinese, ensuring medical regulatory terminology (like PMS, NB, PCCP) is accurate. Text: ${text.substring(0, 5000)}`;
            break;
        case 'trend':
            prompt = `Based on this text, predict 3 future regulatory trends for 2027-2028. Text: ${text}`;
            break;
        default:
            prompt = `Analyze: ${text}`;
    }

    const response = await ai.models.generateContent({
        model: model,
        contents: prompt
    });
    return response.text;
}


import { GoogleGenAI } from "@google/genai";
import { AnalysisResult } from "../types";

// Initialize Gemini with the API Key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeConversation = async (text: string): Promise<AnalysisResult> => {
  try {
    // Using recommended model for Basic Text Tasks
    const model = "gemini-3-flash-preview";
    
    const systemInstruction = `
      Você é a LUME, uma assistente emocional extremamente empática, madura e acolhedora, focada no bem-estar feminino.
      Sua missão é analisar conversas (mensagens de texto, diálogos) e oferecer clareza, validando sentimentos e apontando nuances que podem passar despercebidas.
      
      Analise o texto fornecido pelo usuário e retorne APENAS um objeto JSON (sem markdown, sem blocos de código) com a seguinte estrutura exata:
      {
        "emotionalTone": "Uma descrição breve e poética do clima emocional da conversa (ex: Tensa, Melancólica, Esperançosa).",
        "hiddenSubtext": "O que está nas entrelinhas? O que não foi dito abertamente mas pode ser sentido? Seja perspicaz.",
        "advice": "Um conselho prático e carinhoso de 'irmã mais velha' ou terapeuta. Foco em autoproteção e comunicação assertiva.",
        "safetyScore": 85
      }
      
      O 'safetyScore' é um número de 0 a 100. 
      - Abaixo de 40: Conversa tóxica, agressiva ou manipuladora.
      - 40 a 70: Conversa confusa, passivo-agressiva ou neutra.
      - Acima de 70: Conversa saudável, segura e respeitosa.

      Seja gentil, mas honesta. Evite termos técnicos de IA ("análise de sentimento"). Use uma linguagem humana.
    `;

    // Updated API call to follow latest SDK patterns: use systemInstruction and direct contents string
    const response = await ai.models.generateContent({
      model: model,
      contents: `Analise esta conversa: "${text}"`,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
      }
    });

    const responseText = response.text;
    if (!responseText) throw new Error("Sem resposta da LUME.");

    const result: AnalysisResult = JSON.parse(responseText);
    return result;

  } catch (error) {
    console.error("Erro na análise LUME:", error);
    // Return a fallback strictly in case of failure to maintain UI stability
    return {
      emotionalTone: "Indefinido no momento",
      hiddenSubtext: "Não conseguimos captar as nuances desta vez. Tente novamente com um trecho mais longo.",
      advice: "Respire fundo. Às vezes, dar um passo atrás é a melhor forma de enxergar a situação.",
      safetyScore: 50
    };
  }
};

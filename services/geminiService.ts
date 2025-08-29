import { GoogleGenAI, Type } from "@google/genai";
import { type Scores, type Recommendations, Category } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function generateRecommendations(scores: Scores, maxScores: Scores): Promise<Recommendations> {
    const prompt = `
        You are an expert PMO (Project Management Office) consultant with a knack for delivering simple, powerful advice.
        A user has completed a PMO maturity quiz. Their scores are as follows:
        - ${Category.Governance}: ${scores[Category.Governance]} out of ${maxScores[Category.Governance]}
        - ${Category.ResourceManagement}: ${scores[Category.ResourceManagement]} out of ${maxScores[Category.ResourceManagement]}
        - ${Category.PerformanceReporting}: ${scores[Category.PerformanceReporting]} out of ${maxScores[Category.PerformanceReporting]}
        - ${Category.StrategicAlignment}: ${scores[Category.StrategicAlignment]} out of ${maxScores[Category.StrategicAlignment]}
        - ${Category.RiskManagement}: ${scores[Category.RiskManagement]} out of ${maxScores[Category.RiskManagement]}

        Your task is to provide concise, actionable feedback for each category, designed to spark internal conversations and guide their next move.

        For each category, provide the following in a single string, with each part on a new line:
        1. **Insight:** A single, sharp sentence summarizing their maturity.
        2. **Follow-up Questions:** One or two thought-provoking questions for their team to discuss.
        3. **Next Step:** The single most impactful action they can take next.

        Use markdown bold for the labels (e.g., "**Insight:**").

        IMPORTANT: If a user scores the maximum for a category, frame the feedback as a "Next Level" challenge. For example, the "Follow-up Questions" could be about leveraging AI, and the "Next Step" could be a cutting-edge practice. Do not just congratulate them.

        Format your entire response as a JSON object where keys are the category names.
    `;
    
    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            [Category.Governance]: { type: Type.STRING, description: "Feedback for Governance, including Insight, Follow-up Questions, and Next Step." },
            [Category.ResourceManagement]: { type: Type.STRING, description: "Feedback for Resource Management, including Insight, Follow-up Questions, and Next Step." },
            [Category.PerformanceReporting]: { type: Type.STRING, description: "Feedback for Performance & Reporting, including Insight, Follow-up Questions, and Next Step." },
            [Category.StrategicAlignment]: { type: Type.STRING, description: "Feedback for Strategic Alignment, including Insight, Follow-up Questions, and Next Step." },
            [Category.RiskManagement]: { type: Type.STRING, description: "Feedback for Risk & Issue Management, including Insight, Follow-up Questions, and Next Step." },
        },
        required: Object.values(Category)
    };

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedResponse = JSON.parse(jsonText);

        // Basic validation
        const isValid = Object.values(Category).every(cat => typeof parsedResponse[cat] === 'string');
        if (!isValid) {
            throw new Error("Invalid JSON structure received from API.");
        }

        return parsedResponse as Recommendations;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get recommendations from AI service.");
    }
}
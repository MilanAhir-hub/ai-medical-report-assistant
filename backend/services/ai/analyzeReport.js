import {
    GoogleGenerativeAI
} from "@google/generative-ai";
import {
    buildMedicalPrompt
} from "./medicalPrompt.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeReport = async (normalizedData, language) => {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
        });

        const prompt = buildMedicalPrompt(normalizedData, language);

        const result = await model.generateContent(prompt);
        const response = result.response.text();

        return response;
    } catch (error) {
        console.error("AI analysis failed:", error.message);
        throw new Error("Failed to analyze medical report");
    }
};

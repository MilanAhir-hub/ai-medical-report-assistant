import {cleanText} from "./cleanText.js";
import {extractMedicalValues} from "./extractMedicalValues.js";

export const normalizeReport = (rawText) => {
    const cleanedText = cleanText(rawText);
    const medicalData = extractMedicalValues(cleanedText);

    return {
        cleanedText,
        medicalData,
    };
};

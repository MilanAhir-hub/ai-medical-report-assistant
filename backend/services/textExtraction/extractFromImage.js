import Tesseract from 'tesseract.js';

export const extractFromImage = async (pathOrUrl) => {
    try {
        const { data: { text } } = await Tesseract.recognize(
            pathOrUrl,
            'eng',
        );
        return text;
    } catch (error) {
        console.error("Image extraction error:", error);
        throw new Error("Failed to extract text from image");
    }
};

import axios from "axios";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export const extractFromPDF = async (fileUrl) => {
    try {
        // Download PDF from Cloudinary
        const response = await axios.get(fileUrl, {
            responseType: "arraybuffer",
        });

        // Parse PDF buffer
        const { PDFParse } = require('pdf-parse');
        const parser = new PDFParse({
            data: response.data,
        });

        const data = await parser.getText();

        return data.text;

    } catch (error) {
        console.error("❌ PDF extraction failed:", error.message);
        throw new Error("Failed to extract text from PDF");
    }
};

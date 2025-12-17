import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export const extractFromPDF = async (localFilePath) => {
    try {
        // 1️⃣ Ensure file exists
        if (!fs.existsSync(localFilePath)) {
            throw new Error("PDF file not found");
        }

        // 2️⃣ Read local PDF as buffer
        const buffer = fs.readFileSync(localFilePath);

        // 3️⃣ Initialize parser with local data
        const { PDFParse } = require('pdf-parse');
        const parser = new PDFParse({
            data: buffer,
        });

        // 4️⃣ Extract text
        const result = await parser.getText();

        return result.text;

    } catch (error) {
        console.error("❌ PDF extraction failed:", error.message);
        throw new Error("Failed to extract text from PDF");
    }
};

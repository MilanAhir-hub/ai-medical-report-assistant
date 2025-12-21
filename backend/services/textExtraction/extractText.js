import {
    extractFromImage
} from "./extractFromImage.js";
import {
    extractFromPDF
} from "./extractFromPDF.js";

export const extractText = async (pathOrUrl, fileType) => {
    let result;

    if (fileType === "pdf") {
        result = await extractFromPDF(pathOrUrl);
    } else if (fileType === "image") {
        result = await extractFromImage(pathOrUrl);
    } else {
        throw new Error("Unsupported file type");
    }

    // 🛡 Always return string
    if (typeof result === "string") {
        return result;
    }

    if (result && typeof result === "object" && result.text) {
        return result.text;
    }

    throw new Error("Text extraction failed: invalid return type");
};

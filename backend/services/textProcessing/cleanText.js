export const cleanText = (text) => {
    return text
        .replace(/\r\n/g, "\n")
        .replace(/[^\x00-\x7F]/g, "")
        .replace(/\s+/g, " ")
        .trim();
};

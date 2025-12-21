export const medicalPatterns = [
    // Complete Blood Count (CBC)
    {
        name: "Hemoglobin",
        regex: /(hb|hgb|hemoglobin)\s*[:\-]?\s*([\d.]+)/i,
        unit: "g/dL",
        normalRange: [13, 17],
    },
    {
        name: "WBC",
        regex: /(wbc|white blood cells?|total\s*leukocyte\s*count)\s*[:\-]?\s*([\d,]+)/i,
        unit: "/cu.mm",
        normalRange: [4000, 11000],
    },
    {
        name: "RBC",
        regex: /(rbc|total\s*rbc\s*count|red\s*blood\s*cells?)\s*[:\-]?\s*([\d.]+)/i,
        unit: "million/cu.mm",
        normalRange: [4.5, 5.9],
    },
    {
        name: "Platelets",
        regex: /(platelet\s*count|platelets?|plt)\s*[:\-]?\s*([\d.]+)/i,
        unit: "lakh/cu.mm",
        normalRange: [1.5, 4.5],
    },

    // Blood Sugar
    {
        name: "Fasting Blood Sugar",
        regex: /(fasting\s*blood\s*sugar|fbs)\s*[:\-]?\s*([\d,]+)/i,
        unit: "mg/dL",
        normalRange: [70, 100],
    },
    {
        name: "Postprandial Blood Sugar",
        regex: /(ppbs|post\s*prandial)\s*[:\-]?\s*([\d,]+)/i,
        unit: "mg/dL",
        normalRange: [70, 140],
    },

    // Liver Function Tests
    {
        name: "SGPT (ALT)",
        regex: /(sgpt|alt)\s*[:\-]?\s*([\d,]+)/i,
        unit: "U/L",
        normalRange: [7, 56],
    },
    {
        name: "SGOT (AST)",
        regex: /(sgot|ast)\s*[:\-]?\s*([\d,]+)/i,
        unit: "U/L",
        normalRange: [10, 40],
    },
    {
        name: "Bilirubin",
        regex: /(bilirubin)\s*[:\-]?\s*([\d.]+)/i,
        unit: "mg/dL",
        normalRange: [0.1, 1.2],
    },

    // Kidney Function Tests
    {
        name: "Creatinine",
        regex: /(creatinine)\s*[:\-]?\s*([\d.]+)/i,
        unit: "mg/dL",
        normalRange: [0.6, 1.3],
    },
    {
        name: "Urea",
        regex: /(urea)\s*[:\-]?\s*([\d.]+)/i,
        unit: "mg/dL",
        normalRange: [7, 20],
    },

    // Lipid Profile
    {
        name: "Total Cholesterol",
        regex: /(total\s*cholesterol)\s*[:\-]?\s*([\d,]+)/i,
        unit: "mg/dL",
        normalRange: [125, 200],
    },
    {
        name: "HDL",
        regex: /(hdl)\s*[:\-]?\s*([\d,]+)/i,
        unit: "mg/dL",
        normalRange: [40, 60],
    },
    {
        name: "LDL",
        regex: /(ldl)\s*[:\-]?\s*([\d,]+)/i,
        unit: "mg/dL",
        normalRange: [0, 100],
    },

    // Inflammatory Markers
    {
        name: "ESR",
        regex: /(esr)\s*[:\-]?\s*([\d,]+)/i,
        unit: "mm/hr",
        normalRange: [0, 20],
    },
];


export const extractMedicalValues = (text) => {
    const results = {};

    medicalPatterns.forEach((test) => {
        const match = text.match(test.regex);

        if (!match) return;

        const value = parseFloat(match[2].replace(/,/g, ""));

        if (isNaN(value)) return;

        let status = "normal";

        if (value < test.normalRange[0]) status = "low";
        else if (value > test.normalRange[1]) status = "high";

        results[test.name] = {
            value,
            unit: test.unit,
            status,
        };
    });

    return results;
};

import MedicalReport from "../../models/MedicalReport.js";
import {
    analyzeReport
} from "../../services/ai/analyzeReport.js";

export const testAnalyzeReport = async (req, res) => {
    try {
        const {
            reportId,
            language = "eng"
        } = req.body;

        // basic validation: reportId must be present
        if (!reportId) {
            return res.status(400).json({
                success: false,
                message: "ReportId is required!",
            });
        }

        // fetch report from database
        const report = await MedicalReport.findById(reportId);

        // if report does not exist
        if (!report) {
            return res.status(400).json({
                success: false,
                message: "Report not found!",
            });
        }

        // normalized data is required first
        if (!report.normalizedData) {
            return res.status(400).json({
                success: false,
                message: "Normalized data not found for this report!",
            });
        }

        // AI analysis

        // retry helper: handles temporary AI server issues
        const retry = async (fn, retries = 3) => {
            try {
                return await fn();
            } catch (err) {
                if (retries === 0) throw err;
                await new Promise((res) => setTimeout(res, 2000));
                return retry(fn, retries - 1);
            }
        };

        // call AI service with retry
        const aiResponse = await retry(() =>
            analyzeReport(report.normalizedData, language)
        );

        // parse AI response safely (AI must return strict JSON)
        let parsedResponse;
        try {
            parsedResponse = JSON.parse(aiResponse);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Invalid AI response format",
            });
        }

        // save AI results into report (no extra logic added)
        report.summary = parsedResponse.summary;
        report.riskLevel = parsedResponse.riskLevel;
        report.confidenceScore = parsedResponse.confidenceScore;

        await report.save();

        // send clean response to frontend
        res.status(200).json({
            success: true,
            summary: parsedResponse.summary,
            riskLevel: parsedResponse.riskLevel,
            confidenceScore: parsedResponse.confidenceScore,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "AI test route failed!",
            error: error.message,
        });
    }
};

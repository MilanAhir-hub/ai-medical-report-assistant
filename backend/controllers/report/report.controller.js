import cloudinary from "../../utils/cloudinary.js";
import MedicalReport from "../../models/MedicalReport.js";
import {
    extractText
} from "../../services/textExtraction/extractText.js";
import fs from "fs";
import {
    normalizeReport
} from "../../services/textProcessing/normalizeReport.js";
import DoctorNote from "../../models/DoctorNote.js";

export const uploadReport = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "File not provided!",
            });
        }

        const {
            reportType
        } = req.body;

        if (!reportType) {
            return res.status(400).json({
                message: "Report type is required!",
            });
        }

        // Upload to Cloudinary (permanent storage)
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "hospital_reports",
            resource_type: "auto", // handles both image & pdf
        });

        const fileType = req.file.mimetype.includes("pdf") ? "pdf" : "image";

        // Extract text ONLY from Cloudinary URL (single source of truth)
        const extractedText = await extractText(
            result.secure_url,
            fileType
        );

        // Normalize extracted text
        const {
            medicalData
        } = normalizeReport(extractedText);

        // Safely remove local temp file
        if (req.file ?.path) {
            fs.unlink(req.file.path, () => {});
        }

        // Save report
        const report = await MedicalReport.create({
            userId: req.user.userId,
            uploadedBy: req.user.role,
            fileUrl: result.secure_url,
            fileType,
            reportType,
            normalizedData: medicalData,
            reportName: req.file.originalname,
            extractedText,
        });

        res.status(201).json({
            success: true,
            report,
        });

    } catch (error) {
        res.status(500).json({
            message: "Report upload failed",
            error: error.message,
        });
    }
};

export const getPatientReportDetails = async(req, res) =>{
    const reportId = req.params.id;

    const report = await MedicalReport.findOne({
        _id: reportId,
        patientId: req.user._id
    }).populate('assignedDoctor', 'name', 'specialization').lean();

    if(!report){
        return res.status(404).json({
            success: false,
            message: 'Report not found!'
        })
    }

    const doctorNotes = await DoctorNote.find({
        reportId: reportId
    }).populate('doctorId', 'name');

    res.status(200).json({
        success: true,
        report,
        doctorNotes
    })
};
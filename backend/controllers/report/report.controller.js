import cloudinary from "../../utils/cloudinary.js";
import MedicalReport from "../../models/MedicalReport.js";
import { extractText } from "../../services/textExtraction/extractText.js";
import fs from 'fs';

export const uploadReport = async(req, res) =>{
    try {
        if(!req.file){
            return res.status(400).json({
                message: 'File not provided!'
            });
        }

        console.log('Uploaded file path: ', req.file.path);


        const {reportType} = req.body;

        if(!reportType){
            return res.status(400).json({
                message: 'Report type is required!'
            });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'hospital_reports',
            resource_type: req.file.mimetype.includes('pdf') ? 'raw' : 'image' // it can be images or pdfs
        });

        const fileType = req.file.mimetype.includes('pdf')? 'pdf' : 'image';

        const extractedText = fileType === "pdf" ? await extractText(req.file.path, "pdf"): await extractText(result.secure_url, "image");

        fs.unlinkSync(req.file.path);
    
        const report = await MedicalReport.create({
            userId: req.user.userId,
            uploadedBy:req.user.role,
            fileUrl: result.secure_url,
            fileType: fileType,
            reportType: reportType,
            reportName: req.file.originalname,
            extractedText: extractedText
        });

        console.log(report);

        res.status(201).json({
            success: true,
            report
        });

    } catch (error) {
            console.log(error.message);
        res.status(500).json({
            message: 'Report upload failed',
            error: error.message,
        })
    }
};
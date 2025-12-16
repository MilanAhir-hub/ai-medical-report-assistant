import cloudinary from "../../utils/cloudinary.js";
import MedicalReport from "../../models/MedicalReport.js";

export const uploadReport = async(req, res) =>{
    try {
        if(!req.file){
            return res.status(400).json({
                message: 'File not provided!'
            });
        }

        const {reportType} = req.body;

        if(!reportType){
            return res.status(400).json({
                message: 'Report type is required!'
            });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'hospital_reports',
            resource_type: 'auto' // it can be images or pdfs
        });

        const report = await MedicalReport.create({
            userId: req.user.userId,
            uploadedBy:req.user.role,
            fileUrl: result.secure_url,
            fileType: req.file.mimetype.includes('pdf')? 'pdf' : 'image',
            reportType: reportType,
            reportName: req.file.originalname
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
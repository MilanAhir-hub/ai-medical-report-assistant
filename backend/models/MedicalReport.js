import mongoose from 'mongoose';

const MedicalReportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model (patient)
        required: true,
    },
    uploadedBy: {
        type: String,
        enum: ['patient', 'doctor'], // Restrict to patient or doctor
        required: true,
    },
    fileUrl: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        enum: ['pdf', 'image'], // Restrict to pdf or image
        required: true,
    },
    summary: {
        type: String,
        default: null, // Can be null if text extraction fails
    },
    extractedText: {
        type: String,
        default: null, // Can be null if text extraction fails
    },
    reportType: {
        type: String,
        required: true, // Example: blood, xray, etc.
    },
    reportName: {
        type: String
    },
    riskLevel: {
        type: String,
        enum: ['low', 'medium', 'high'], // Restrict to low, medium, or high
        default: 'low',
    },
    confidenceScore: {
        type: Number,
        default: null, // Confidence score for AI analysis
    },
    assignedDoctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['processing', 'completed', 'failed'], // Restrict to processing, completed, or failed
        default: 'processing',
    },
    review_status: {
        type: String,
        enum: ['uploaded', 'reviewed'],
        default: 'uploaded'
    },
    normalizedData: {
        type: Object
    },
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    }, // Include createdAt, exclude updatedAt
});

const MedicalReport = mongoose.model('MedicalReport', MedicalReportSchema);

export default MedicalReport;
import mongoose from 'mongoose';

const AiExplanationSchema = new mongoose.Schema({
    reportId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedicalReport', // Reference to the MedicalReport model
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    aiDraftText: {
        type: String,
        required: true,
    },
    finalText: {
        type: String,
        default: null, // Final text can be null initially
    },
    abnormalFindings: [{
        testName: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
        normalRange: {
            type: String,
            required: true,
        },
        meaning: {
            type: String,
            required: true,
        },
    }, ],
    verificationStatus: {
        type: String,
        enum: ['auto', 'approved', 'edited'], // Restrict to auto, approved, or edited
        default: 'auto',
    },
    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model (doctorId)
        default: null, // Null if not verified
    },
    audioUrl: {
        type: String,
        default: null, // Only available after verification
    },
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    }, // Include createdAt, exclude updatedAt
});

AiExplanationSchema.add({
    verifiedAt: {
        type: Date,
        default: null, // Null if not verified
    },
});

const AiExplanation = mongoose.model('AiExplanation', AiExplanationSchema);

export default AiExplanation;
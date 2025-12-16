import mongoose from 'mongoose';

const ChatHistorySchema = new mongoose.Schema({
    reportId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedicalReport', // Reference to the MedicalReport model
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model (doctorId)
        required: true,
    },
    messageFrom: {
        type: String,
        enum: ['patient', 'doctor', 'ai'], // Restrict to patient, doctor, or ai
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    }, // Include createdAt, exclude updatedAt
});

const ChatHistory = mongoose.model('ChatHistory', ChatHistorySchema);

export default ChatHistory;
import mongoose from 'mongoose';

const doctorNoteSchema = new mongoose.Schema({
    reportId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedicalReport'
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    note: {
        type: String
    }
}, {
    timestamps: true
});

export default mongoose.model('DoctorNote', doctorNoteSchema);
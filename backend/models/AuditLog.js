import mongoose from 'mongoose';

// Audit log schema: stores WHO did WHAT, on WHICH data, and WHEN
const AuditLogSchema = new mongoose.Schema({

    // User who performed the action
    actorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    // Role of the user at the time of action
    actorRole: {
        type: String,
        enum: ['patient', 'doctor', 'admin'],
        required: true,
    },

    // Action performed (e.g. APPROVE_REPORT, EDIT_EXPLANATION)
    action: {
        type: String,
        required: true,
    },

    // Type of entity affected by the action
    targetType: {
        type: String,
        enum: ['User', 'MedicalReport', 'AIExplanation'],
        required: true,
    },

    // ID of the affected entity
    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    // Human-readable description for admin review
    description: {
        type: String,
        required: true,
    },

    // IP address from which the action was performed
    ipAddress: {
        type: String,
        required: true,
    },

}, {
    // Only store createdAt (audit logs should never be updated)
    timestamps: {
        createdAt: true,
        updatedAt: false
    },
});

// AuditLog model
const AuditLog = mongoose.model('AuditLog', AuditLogSchema);

export default AuditLog;

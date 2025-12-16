import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['patient', 'doctor', 'admin'], // Restrict to patient, doctor, or admin
        default: 'patient',
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    isMobileVerified: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ['active', 'suspended', 'blocked'], // Restrict to active, suspended, or blocked
        default: 'active',
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const User = mongoose.model('User', UserSchema);

export default User;
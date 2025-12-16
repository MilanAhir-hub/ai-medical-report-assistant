import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }

       const connection = await mongoose.connect(process.env.MONGO_URI);

        console.log(`Database connected: ${connection.connection.host}`);
    } catch (error) {
        console.error('Error occurred while connecting to the database:', error.message);
        process.exit(1); // Exit process with failure
    }
};
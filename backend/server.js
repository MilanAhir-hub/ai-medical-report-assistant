import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config(); //dont need to write it everywhere, you can write only at this server.js

const app = express();

app.use(cors());
app.use(express.json());

import { connectDB } from './config/db.js';
const port = process.env.PORT || 5000;


//routes import
import authRoutes from './routes/auth/auth.routes.js';
import userRoutes from './routes/auth/user.routes.js';




//describe path
app.use('/api/auth', authRoutes);
app.use('/api/auth', userRoutes);



connectDB();
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})
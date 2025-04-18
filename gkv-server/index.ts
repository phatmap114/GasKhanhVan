

import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './src/routers/user'
import cylinderRoutes from './src/routers/cylinderRoutes';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 3001;
const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.dh8fo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL);

        console.log(`Connect to db successfully!!!`);
    } catch (error) {
        console.log(`Can not connect to db ${error}`)
    }
}

app.use('/auth', userRouter);
app.use('/api/cylinders', cylinderRoutes);

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is starting at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    })
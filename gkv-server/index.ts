

import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { error } from 'console';
dotenv.config();

const PORT = process.env.PORT || 3001;
const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}}@cluster0.dh8fo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const app = express();

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL);

        console.log(`Connect to db successfully!!!`);
    } catch (error) {
        console.log(`Can not connect to db ${error}`)
    }
}

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is starting at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    })
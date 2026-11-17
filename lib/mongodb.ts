import mongoose from "mongoose";
export async function connectDB() {
    const url = process.env.MONGODB_URI;
    try {
        if (!url) {
            throw new Error("MONGODB_URI is missing");
        }
        await mongoose.connect(url);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        throw error;
    }

}
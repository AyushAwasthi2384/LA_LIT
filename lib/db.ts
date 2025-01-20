import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://badboy23082004:Sg0VXBcSMRFYh9PM@cluster0.kz65b.mongodb.net/Cluster0";

export async function connectDB() {
    if (mongoose.connection.readyState === 1) return;
    await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");
}

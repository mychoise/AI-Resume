import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        console.log("Connecting to MongoDB...", process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export default dbConnect;
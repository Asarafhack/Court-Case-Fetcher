import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("DB already connected");
      return;
    }

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing");
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected:", conn.connection.host);
  } catch (error) {
    console.error("DB ERROR FULL:", error);
    throw new Error("DB connection failed");
  }
};
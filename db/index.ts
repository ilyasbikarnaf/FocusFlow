import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGO_URL!;

if (!MONGODB_URL) {
  throw new Error("MONGO_URL environment variable is not defined");
}

// Use a cached object, but note it won't persist between Vercel invocations
const cached = (global as any).mongoose || { conn: null, promise: null };

async function connectDB() {
  // Return cached connection if it exists
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // Optimize connection options for serverless
    cached.promise = mongoose
      .connect(MONGODB_URL, {
        bufferCommands: false,
        maxPoolSize: 10, // Adjust based on your Atlas plan
        minPoolSize: 1, // Keep a minimal pool
        connectTimeoutMS: 10000, // Timeout after 10s
        serverSelectionTimeoutMS: 5000, // Faster server selection
      })
      .then((mongoose) => {
        console.log("MongoDB connected");
        return mongoose;
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  (global as any).mongoose = cached;

  return cached.conn;
}

export default connectDB;

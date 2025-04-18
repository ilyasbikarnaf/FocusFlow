import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGO_URL!;

const cached = (global as any).mongoose || { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URL, {
        bufferCommands: false,
      })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  (global as any).mongoose = cached;

  return cached.conn;
}

export default connectDB;

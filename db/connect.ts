import mongoose from "mongoose"

// const mongoUri = process.env.MONGO_URI!
const mongoUri = "mongodb+srv://chukwukadiemma:pyYTt6jsI6bFKLKm@cluster1.lpcsfos.mongodb.net/result-portal?retryWrites=true&w=majority&appName=Cluster1"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cached = (global as any).mongoose;

if (!cached)
    cached = {conn: null, promise: null}

export async function connectDB(uri : string = mongoUri) {
    if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = await mongoose.connect(uri)
    cached.conn = await cached.promise;
    return cached.conn;
  }
}
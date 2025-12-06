import mongoose from "mongoose"
export const ClassSchema = new mongoose.Schema({
  name: {type: String, required: true},
  teacher: { type: String, unique: true },
  subjects: [String],
  createdAt: { type: Date, default: Date.now }
});
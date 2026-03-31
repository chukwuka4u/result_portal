import mongoose from "mongoose"
export const SubjectSchema = new mongoose.Schema({
  title: {type: String, required: true},
  classes: [String],
  createdAt: { type: Date, default: Date.now }
});
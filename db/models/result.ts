import mongoose from "mongoose"
export const SubjectSchema = new mongoose.Schema({
  fullName: {type: String, required: true},
  class: String,
  term: String,
  grades: [
    {
        subject: {type: String, required: true},
        ca1: Number,
        ca2: Number,
        exam: Number,
        total: Number
    }
  ],
  createdAt: { type: Date, default: Date.now }
});
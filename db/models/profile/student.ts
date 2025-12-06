import mongoose from "mongoose"
export const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,

  classLevel: String,
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  dob: String,
  guardianName: String,
  guardianPhone: String,
  admissionNo: String,
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: false },

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },

  createdAt: { type: Date, default: Date.now }
});
import mongoose from "mongoose"
export const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,

  role: {
    type: String,
    enum: ["admin", "teacher", "student"],
    required: true
  },

  // For students
  admissionNumber: String,
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: false },

  // For teachers
  staffId: String,

  createdAt: { type: Date, default: Date.now }
});

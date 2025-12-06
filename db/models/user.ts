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

  studentProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StudentProfile",
    default: null
  },
  teacherProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TeacherProfile",
    default: null
  },
  adminProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdminProfile",
    default: null
  },

  createdAt: { type: Date, default: Date.now }
});
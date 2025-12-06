import mongoose from "mongoose"
export const TeacherSchema = new mongoose.Schema({
  name: String,
  email: String,
  assignedSubjects: {
    type: [String],
    default: null,
  },
  assignedClass: {
    type: String,
    default: null
  },

  staffId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false},

  createdAt: { type: Date, default: Date.now }
});

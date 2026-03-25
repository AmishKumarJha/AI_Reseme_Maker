import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, default: "Untitled Resume" },
  template: { type: String, default: "classic" },
  accent: { type: String, default: "blue" },
  formData: {
    fullName: String,
    email: String,
    phone: String,
    location: String,
    profession: String,
    linkedin: String,
    website: String,
    summary: String,
    experience: String,
    education: String,
    skills: String,
    projects: String,
  },
}, { timestamps: true });

export default mongoose.model("Resume", resumeSchema);
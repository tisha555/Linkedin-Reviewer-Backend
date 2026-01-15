import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  expertId: mongoose.Schema.Types.ObjectId,
  resumeUrl: String,
  linkedinUrl: String,
  status: {
    type: String,
    enum: ["PENDING", "IN_PROGRESS", "COMPLETED"],
    default: "PENDING"
  },
  feedback: String
}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);

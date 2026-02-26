import mongoose from "mongoose";
const jobApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
    targetedEmail: {
      type: String,
      required: true,
    },
    targetedPost: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    generatedEmail: {
      type: String,
    },
    chanceOfInterview: {
      type: Number,
      min: 0,
      max: 100,
    },
    atsScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    matchingSkills: [
      {
        type: String,
      },
    ],
    missingSkills: [
      {
        type: String,
      },
    ],
    aiRecommendation: {
      type: String,
    },
    scoreBreakdown: {
      keywordMatch: {
        type: Number,
        min: 0,
        max: 100,
      },
      experienceRelevance: {
        type: Number,
        min: 0,
        max: 100,
      },
      educationMatch: {
        type: Number,
        min: 0,
        max: 100,
      },
      clarity: {
        type: Number,
        min: 0,
        max: 100,
      },
    },
    status: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },
    targetedRole: {
      type: String,
    },
    saveToDraft: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

jobApplicationSchema.index({ userId: 1, status: 1 });

export const jobApplicationModel = mongoose.model(
  "jobApplicationModel",
  jobApplicationSchema,
);

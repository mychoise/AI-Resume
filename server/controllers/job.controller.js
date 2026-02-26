import { jobApplicationModel } from "../models/jobapplication.model.js";
import { resumeModel } from "../models/resume.model.js";
import { generateJobEmailData } from "../services/gemini.js";
import { userModel } from "./../models/user.model.js";
import { transporter } from "./../config/nodemailer.js";

export const postEmail = async (req, res, next) => {
  const userId = req.user;

  try {
    const { targetedEmail, targetedPost, targetedRole } = req.body;

    // 1. Basic validation
    if (!targetedEmail || !targetedPost || !targetedRole) {
      return res.status(400).json({
        success: false,
        message: "targetedEmail, targetedPost and targetedRole are required",
      });
    }

    // 2. Get resume
    const resumeData = await resumeModel.findOne({ userId });

    if (!resumeData) {
      return res.status(404).json({
        success: false,
        message: "Resume not found. Please create a resume first.",
      });
    }

    // 3. Generate AI email
    const aiResult = await generateJobEmailData(
      resumeData.resumeContent,
      targetedPost,
      targetedRole,
    );

    /**
     * Expected aiResult shape:
     * {
     *   subject,
     *   emailBody,
     *   interviewChance,
     *   atsScore,
     *   matchingSkills,
     *   missingSkills,
     *   scoreBreakdown
     * }
     */

    // 4. Save application
    const jobApplication = await jobApplicationModel.create({
      userId,
      targetedEmail,
      targetedPost,
      targetedRole,
      subject: aiResult.subject,
      generatedEmail: aiResult.emailBody,
      chanceOfInterview: aiResult.interviewChance,
      atsScore: aiResult.atsScore,
      matchingSkills: aiResult.matchingSkills,
      missingSkills: aiResult.missingSkills,
      aiRecommendation: aiResult.aiRecommendation,
      scoreBreakdown: aiResult.scoreBreakdown,
      status: "pending",
    });

    // 5. Response (send extra AI analytics if needed)
    return res.status(201).json({
      result: aiResult,
      applicationId: jobApplication._id,
    });
  } catch (error) {
    console.error("Error in postEmail:", error);
    next(error);
  }
};

export const sendEmail = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user;
    const { email, subject, message } = req.body;

    const user = await userModel.findById(userId);
    const userResume = await resumeModel.findOne({ userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (!userResume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }
    if (!email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Email, subject and message are required",
      });
    }

    console.log("Contact email is", user.contactEmail);

    // Create transporter (server-side credentials recommended)
    await transporter.sendMail({
      from: `"${user.name}" <${process.env.SENDER_EMAIL}>`, // App email but with user’s name
      to: email, // target recipient
      subject,
      text: message,
      html: `<p>${message.replace(/\n/g, "<br />")}</p>`,
      replyTo: user.contactEmail, // replies go to the user
    });

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
      data: {
        from: user.contactEmail,
        to: email,
        subject,
        message,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error sending email:", error.message);
    next(error);
  }
};

export const saveToDraft = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user;
    const { applicationId } = req.params;

    const jobApplication = await jobApplicationModel.findByIdAndUpdate(
      applicationId,
      { saveToDraft: true },
      { new: true },
    );
    if (!jobApplication) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application saved to draft",
      data: jobApplication,
    });
  } catch (error) {
    next(error);
  }
};

export const getFromDraft = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user;
    const jobApplications = await jobApplicationModel
      .find({
        userId,
        saveToDraft: true,
      })
      .sort({ createdAt: -1 })
      .limit(1);
    return res.status(200).json({
      success: true,
      data: jobApplications[0] || null,
    });
  } catch (error) {
    next(error);
  }
};

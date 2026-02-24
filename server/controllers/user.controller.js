import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { resumeModel } from "./../models/resume.model.js";
import pdf from "pdf-parse";
import axios from "axios";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.statusCode = 400;
      throw error;
    }

    const user = await userModel.findOne({ email });
    if (user) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    const newUser = await userModel.create({ email, password });
    const token = generateToken(newUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      path: "/",
    });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error); // 🔥 sends error to centralized handler
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.statusCode = 400;
      throw error;
    }

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    next(error); // 🔥 sends error to centralized handler
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error); // 🔥 sends error to centralized handler
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user;
    const user = await userModel.findById(userId);
    const resume = await resumeModel.findOne({ userId });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        contactEmail: user.contactEmail,
        techStack: user.techStack,
        links: user.links,
        name: user.name,
      },
      resume: resume,
    });
  } catch (error) {
    next(error); // 🔥 sends error to centralized handler
  }
};

export const updateProfile = async (req, res, next) => {
  const userId = req.user;

  try {
    let { name, contactEmail, techStack, links } = req.body;

    // Parse techStack if it comes as string (from FormData)
    if (techStack && typeof techStack === "string") {
      try {
        techStack = JSON.parse(techStack);
      } catch (err) {
        techStack = [];
      }
    }
    // Ensure it's an array
    techStack = Array.isArray(techStack) ? techStack : [];

    // Parse links if it comes as string
    if (links && typeof links === "string") {
      try {
        links = JSON.parse(links);
      } catch (err) {
        links = {};
      }
    }
    links = typeof links === "object" ? links : {};

    if (!name && !contactEmail && techStack.length === 0 && Object.keys(links).length === 0) {
      const error = new Error("No data provided");
      error.statusCode = 400;
      throw error;
    }

    if (techStack.some((t) => !t.name)) {
      const error = new Error("Tech name is required");
      error.statusCode = 400;
      throw error;
    }

    if (!userId) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    let resume = null;

    if (req.file) {
      const pdfUrl = req.file.path;
      const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
      const data = await pdf(response.data);

      const downloadUrl = `${pdfUrl}.pdf`;
      resume = await resumeModel.findOneAndUpdate(
        { userId },
        { resumeLink: downloadUrl, resumeContent: data.text },
        { new: true, upsert: true },
      );
    }

    // Update user (whether resume exists or not)
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        name,
        contactEmail,
        techStack,
        links,
      },
      { new: true },
    );

    // Always respond
    return res.status(200).json({
      success: true,
      user: updatedUser,
      resume: resume,
    });
  } catch (error) {
    console.log(error);
    next(error); // centralized error handler
  }
};

export const test = async(req,res,next) => {
  try {
      const result = await generateAIResponse("Why is sky blue give me a detailed context");
  res.status(200).json({
    success: true,
    message: "Test route working",
    result: result
  });
  } catch (error) {
    next(error);
  }
}

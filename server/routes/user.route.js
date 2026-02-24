import express from "express";
import { getProfile, register, updateProfile,login,logout } from "../controllers/user.controller.js";
import errorHandler from './../middleware/errorHandler.middleware.js';
import { body } from "express-validator";
import protect from "../middleware/protect.js";
import upload from './../config/Image.config.js';

const registerValidation = [
  body("email")
    .isEmail()
    .withMessage("Must be a valid email")
    .trim()
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const router = express.Router();

router.post("/register",registerValidation,register)
router.post("/login",registerValidation,login)
router.get("/profile",protect,getProfile)
router.put("/profile",protect,upload.single("resume"),updateProfile)
router.post("/logout",protect,logout)

router.use(errorHandler)
export default router;
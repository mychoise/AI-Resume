import express from "express";
import { postEmail, sendEmail } from "../controllers/job.controller.js";
import protect from "../middleware/protect.js";

const jobRouter = express.Router();

jobRouter.post("/email", protect,postEmail);
jobRouter.post("/email/send", protect,sendEmail);

export default jobRouter;
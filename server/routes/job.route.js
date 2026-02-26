import express from "express";
import {
  postEmail,
  sendEmail,
  saveToDraft,
  getFromDraft,
} from "../controllers/job.controller.js";
import protect from "../middleware/protect.js";

const jobRouter = express.Router();

jobRouter.post("/email", protect, postEmail);
jobRouter.post("/email/send", protect, sendEmail);
jobRouter.put("/email/draft/:applicationId", protect, saveToDraft);
jobRouter.get("/email/draft", protect, getFromDraft);

export default jobRouter;

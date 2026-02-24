import dotenv from "dotenv";
import express, { json } from "express";
dotenv.config();
import cookieParser from "cookie-parser";
import dbConnect from "./config/dbConnect.js";
import router from "./routes/user.route.js";
import cors from "cors";
import jobRouter from "./routes/job.route.js";
const app = express();

dbConnect();

app.use(json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
const PORT = process.env.PORT || 8000;

app.use("/api/user", router);
app.use("/api/job", jobRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

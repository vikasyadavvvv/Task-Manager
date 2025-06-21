import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/task.route.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/tasks", taskRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log("Server running on port 5000 and mongoDB is connected"));
  })
  .catch((err) => console.log(err));

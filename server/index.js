import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

// Routes
import { userRoutes } from "./routes/userRoutes.js";
import { courseRoutes } from "./routes/courseRoutes.js";
import { roomRoutes } from "./routes/roomRoutes.js";
import { teacherRoutes } from "./routes/teacherRoutes.js";
import { semesterRoutes } from "./routes/semesterRoutes.js";

// Error Handler Middleware

const port = process.env.PORT || 8080;
dotenv.config();

console.log(process.env.NODE_ENV);

const app = express();

app.use(
  cors({
    origin: ["https://timetable-schedular.vercel.app"],
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

const db = process.env.MONGO_URI; // Replace with your MongoDB URL

// Serve static files from the React app's build directoryy
// const buildPath = path.join(process.cwd(), "client", "build");
// app.use(express.static(buildPath));

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });

    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api/users", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/semester", semesterRoutes);

app.listen(port, () => console.log("Running on port " + port));

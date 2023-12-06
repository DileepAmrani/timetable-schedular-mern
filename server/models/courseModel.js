import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  creditHours: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  contantHours: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;

import asyncHandler from "express-async-handler";
import Course from "../models/courseModel.js";

const create = asyncHandler(async (req, res) => {
  try {
    const { name, creditHours, code, contantHours, department } = req.body;
console.log( name, creditHours, code, contantHours, department)
    if (!name && !creditHours && !code && !contantHours && !department) {
      return res.status(400).json({ message: "Please Fill All Fields!" });
    }

    const course = new Course({
      name,
      creditHours,
      code,
      contantHours,
      department,
    });
    await course.save();

    return res.status(201).json({
      message: "Course Created",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

const get = asyncHandler(async (req, res) => {
  try {
    const courses = await Course.find();

    return res.status(200).json({
      courses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

const remove = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params; // Extract the course ID from request parameters

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export { create, get, remove };

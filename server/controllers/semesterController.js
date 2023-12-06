import asyncHandler from "express-async-handler";
import Semester from "../models/semesterModel.js";

const create = asyncHandler(async (req, res) => {
  try {
    const { name, department, courses } = req.body;

    if (!name && !department) {
      return res.status(400).json({ message: "Please Fill All Fields!" });
    }
    const semester = new Semester({
      name,
      department,
      courses,
    });
    await semester.save();

    return res.status(201).json({
      message: "Teacher Created",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

const get = asyncHandler(async (req, res) => {
  try {
    const semesters = await Semester.find().populate("courses");

    return res.status(200).json({
      semesters,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

const remove = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params; // Extract the course ID from request parameters

    const deletedCourse = await Semester.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Semester not found" });
    }

    return res.status(200).json({ message: "Semester deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export { create, get, remove };

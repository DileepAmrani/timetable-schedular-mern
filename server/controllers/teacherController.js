import asyncHandler from "express-async-handler";
import Teacher from "./../models/teacherModel.js";
import Course from "./../models/courseModel.js";

// const existingCourses = await Course.find({ _id: { $in: courses } });
// if (existingCourses.length !== courses.length) {
//   return res.status(404).json({ message: "Some course IDs are invalid." });
// }

const create = asyncHandler(async (req, res) => {
  try {
    const { name, qualification, email, contact, gender, courses } = req.body;
    console.log(name, qualification, email, contact, gender, courses);

    if (!name && !qualification && !email && !contact && !gender) {
      return res.status(400).json({ message: "Please Fill All Fields!" });
    }
    const teacher = new Teacher({
      name,
      qualification,
      email,
      contact,
      gender,
      courses,
    });
    await teacher.save();

    return res.status(201).json({
      message: "Teacher Created",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

const get = asyncHandler(async (req, res) => {
  try {
    const teachers = await Teacher.find().populate("courses");

    return res.status(200).json({
      teachers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

const remove = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params; // Extract the course ID from request parameters

    const deletedCourse = await Teacher.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    return res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export { create, get, remove };

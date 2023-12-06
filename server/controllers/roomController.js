import asyncHandler from "express-async-handler";
import Room from "../models/roomModel.js";

const create = asyncHandler(async (req, res) => {
  try {
    const { name, code, isLab } = req.body;

    if (!name && !code && !isLab) {
      return res.status(400).json({ message: "Please Fill All Fields!" });
    }

    const room = new Room({
      name,
      code,
      isLab,
    });
    await room.save();

    return res.status(201).json({
      message: "Room Created",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

const get = asyncHandler(async (req, res) => {
  try {
    const rooms = await Room.find();

    return res.status(200).json({
      rooms,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

const remove = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params; // Extract the Room ID from request parameters

    const deletedRoom = await Room.findByIdAndDelete(id);

    if (!deletedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    return res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export { create, get, remove };

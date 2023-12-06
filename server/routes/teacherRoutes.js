import express from "express";
import { create, get, remove } from "../controllers/teacherController.js";

const router = express.Router();

router.post("/create", create);
router.get("/get", get);
router.delete("/remove/:id", remove);

export { router as teacherRoutes };

import express from "express";
import {
  getResumes, getResume, createResume, updateResume, deleteResume
} from "../controllers/resumeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getResumes).post(createResume);
router.route("/:id").get(getResume).put(updateResume).delete(deleteResume);

export default router;
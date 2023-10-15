import { Router } from "express";
import {
  getAllCourses,
  createCourse,
} from "../controllers/courseController.js";
const router = Router();

router.route("/").get(getAllCourses); //without lectures
router.route("/").post(createCourse); // only admin can create

//Add lecture
//Delete Lecture
//get course details
//delete lecture

export default router;

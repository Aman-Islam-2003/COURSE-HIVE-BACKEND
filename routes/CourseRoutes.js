import { Router } from "express";
import {
  getAllCourses,
  createCourse,
  getCourseLectures,
  addLecture,
} from "../controllers/courseController.js";
const router = Router();

router.route("/courses").get(getAllCourses); //without lectures
router.route("/createcourse").post(createCourse); // only admin can create

//Add lecture
router.route("/course/:id").get(getCourseLectures).post(addLecture);
//Delete Lecture
//get course details
//delete lecture

export default router;

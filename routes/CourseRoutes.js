import { Router } from "express";
import {
  getAllCourses,
  createCourse,
  getCourseLectures,
  addLecture,
  deleteCourse,
  deleteLecture
} from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/Authenticate.js";
const router = Router();

router.route("/courses").get(getAllCourses); //without lectures
router.route("/createcourse").post(isAuthenticated, authorizeAdmin, singleUpload, createCourse); // only admin can create

//Add lecture and get all lectures and delete course
router.route("/course/:id").get(isAuthenticated, getCourseLectures).post(isAuthenticated, authorizeAdmin, singleUpload, addLecture).delete(isAuthenticated, authorizeAdmin, deleteCourse);
//delete lecture
router.route("/lecture").get(isAuthenticated, authorizeAdmin, deleteLecture)
//get course details
//delete lecture

export default router;

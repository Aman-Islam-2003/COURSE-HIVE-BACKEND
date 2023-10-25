import { Router } from "express";
import {
  getAllCourses,
  createCourse,
  getCourseLectures,
  addLecture,
} from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
const router = Router();

router.route("/courses").get(getAllCourses); //without lectures
router.route("/createcourse").post(singleUpload, createCourse); // only admin can create

//Add lecture and get all lectures
router.route("/course/:id").get(getCourseLectures).post(singleUpload, addLecture);
//Delete Lecture
//router.route("/course/:id").delete(deleteLecture)
//get course details
//delete lecture

export default router;

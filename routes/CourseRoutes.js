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

//Add lecture
<<<<<<< HEAD
//router.route("/:id").post(addLecture); 
=======
router.route("/course/:id").get(getCourseLectures).post(singleUpload, addLecture);
>>>>>>> 5d1876484704cf995cf8ff046d7321ff2edc5162
//Delete Lecture
//router.route("/:id").post(deleteLecture); // only admin can create
//get course details
//delete lecture

export default router;

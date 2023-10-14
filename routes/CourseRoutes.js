import { Router } from "express";
import { getAllCourses, createCourse } from "../controllers/courseController.js";
const router = Router();

  // router.route("/").get(getAllCourses) 
   router.route("/").post(createCourse);


export default router;
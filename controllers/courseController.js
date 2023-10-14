import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Course } from "../models/Course.js";


export const createCourse = catchAsyncError((req,res,next)=>{
   const {title, description, category, createdBy } = req.body;
   const file = req.file;
})

export const getAllCourses = catchAsyncError((req,res,next) => {
   const courses =  Course.find();
   res.status(200).send({
    success: true,
    courses
   })
})
import cookieParser from "cookie-parser";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Course } from "../models/Course.js";
import ErrorHandler from "../utils/errorHandler.js"
import getDataUri from "../utils/dataUri.js";


export const createCourse = catchAsyncError(async (req,res,next)=>{
   const {title, description, category, createdBy } = req.body;
   if(!title || !description || !category || !createdBy){
       return next(new ErrorHandler("Required fields can't be empty", 400))
   }
   const file = req.file;
   
   const fileUri = getDataUri(file);
    await Course.create({
      title,
      description,
      category,
      createdBy,
      poster: {
         public_id: "temp",
         url: "temp"
      }
   });

   res.status(201).json({
      success: "true",
      message: "Course created successfully"
   })
})

export const getAllCourses = catchAsyncError(async (req,res,next) => {
   const courses = await Course.find().select("-lectures");
   res.status(200).send({
    success: true,
    courses
   })
})

export const getCourseLectures = catchAsyncError(async (req,res,next) => {
   const {id} = req.params;
   const course = await Course.findById(id);
   if(!course){
      return next(new ErrorHandler("Course not found", 404))
   }
   course.views += 1;
   await course.save();
   res.status(200).send({
    success: true,
    lectures: course.lectures,
   })
});

export const addLecture = catchAsyncError(async (req,res,next) => {
   const {id} = req.params;
   const {title, description} = req.body;
   //const file = req.file;
   const course = await Course.findById(id);
   if(!course){
      return next(new ErrorHandler("Course not found", 404))
   }
   //upload file here

   course.lectures.push({
      title,
      description,
      video: {
        public_id: "url",
        url: "url" 
      }
   });

   course.numOfVideos = course.lectures.length;

   await course.save();
   res.status(200).send({
    success: true,
    messgae: "Lecture added successfully"
   })
});


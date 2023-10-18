import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import {User} from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";
import bcrypt from "bcrypt";

export const register = catchAsyncError(async (req,res,next)=>{
    const {name, email, password} = req.body;
    //const file = req.file
    if(!name || !email || ! password){
        return next(new ErrorHandler("Required fields can't be empty", 400))
    }
    let user = await User.findOne({email});
    if(user){
        return next(new ErrorHandler("User already exists", 409))
    }
    //upload file n cloudinary
     const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
       name,
       email,
       password: hashedPassword,
       avatar:{
        public_id:"tempid",
        url: "tempurl",
       } 
    });

    sendToken(res, user, "Registered successfully", 201 );

})

export const login = catchAsyncError(async (req,res,next)=>{
    const {email, password} = req.body;
    //const file = req.file
    if(!email || ! password){
        return next(new ErrorHandler("Required fields can't be empty", 400))
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Incorrect email or password", 401))
    }
    const passwordMatched = await bcrypt.compare(password, user.password);

    if(!passwordMatched){
        return next(new ErrorHandler("Incorrect email or password", 401))
    }
    
    sendToken(res, user, `Welcome back! ${user.name}`, 200 );

});

export const logout = catchAsyncError(async (req,res,next)=>{
    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "Logged out successfully" 
    })
})

export const getMyProfile = catchAsyncError(async (req,res,next)=>{
    const user = await User.findById(req.user._id);
    

    res.status(200).json({
        success: true,
        message: "Logged out successfully", 
        user
    })
})
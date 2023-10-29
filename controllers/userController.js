import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/User.js";
import { Course } from "../models/Course.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendToken } from "../utils/sendToken.js";
import cloudinary from "cloudinary";
import bcrypt from "bcrypt";
import getDataUri from "../utils/dataUri.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  //const file = req.file
  if (!name || !email || !password) {
    return next(new ErrorHandler("Required fields can't be empty", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already exists", 409));
  }
  //upload file n cloudinary
  const file = req.file;

  const fileUri = getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  sendToken(res, user, "Registered successfully", 201);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  //const file = req.file
  if (!email || !password) {
    return next(new ErrorHandler("Required fields can't be empty", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Incorrect email or password", 401));
  }
  const passwordMatched = await bcrypt.compare(password, user.password);

  if (!passwordMatched) {
    return next(new ErrorHandler("Incorrect email or password", 401));
  }

  sendToken(res, user, `Welcome back! ${user.name}`, 200);
});

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

export const getMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
    user,
  });
});

export const changePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return next(new ErrorHandler("Required fields can't be empty", 400));
  }
  const user = await User.findById(req.user._id).select("+password");

  const matchPasswords = bcrypt.compare(user.password, oldPassword);
  if (!matchPasswords) {
    return next(new ErrorHandler("Incorrect password", 401));
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
    user,
  });
});

export const updateProfile = catchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;
  const user = await User.findById(req.user._id);

  name = name ? name : user.name;
  email = email ? email : user.email;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});

export const updateProfilePicture = catchAsyncError(async (req, res, next) => {

  const file = req.file;
  const user = await User.findById(req.user._id);

  const fileUri = getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  user.avatar = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  }
  await user.save();
  res.status(200).json({
    success: true,
    message: "Profile Picture updated successfully",
  });
});

export const forgetPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  }

  const resetToken = await user.getResetToken();
  //send token via email
  const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
  const message = `Click on the link ${url} to reset your password`;
  await sendEmail(user.email, "Reset Password", message);

  res.status(200).json({
    success: true,
    message: "Reset token has been sent successfully",
  });
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
    const {token} = req.params;
    


  //cloudinary
  res.status(200).json({
    success: true,
    message: "Profile Picture updated successfully",
    token
  });
});


export const addToPlaylist = catchAsyncError(async (req,res,next)=>{
  const user = await User.findById(req.user._id);

  const course = await Course.findById(req.body.id);
  if(!course){
    return next(new ErrorHandler("Course doesn't exists", 401));
  }

  const itemExist = user.playlist.find((item)=>{
    if(item.course.toString()===course._id.toString()){
        return true;
    }
  })
  if(itemExist){
    return next(new ErrorHandler("Item already exists", 409));
  }
  user.playlist.push({
    course: course._id,
    poster: course.poster.url
  });
  
  await user.save();
  res.status(200).json({
    success: true,
    message: "Added to playlist",
  });  
});

export const removeFromPlaylist = catchAsyncError(async (req,res,next)=>{
    const user = await User.findById(req.user._id);

    const course = await Course.findById(req.query.id);
    if(!course){
      return next(new ErrorHandler("Course doesn't exists", 401));
    }
  
    const newPlayList = user.playlist.filter((item)=>{
      if(item.course.toString() !== course._id.toString()){
          return item;
      }
    })
    
    user.playlist = newPlayList;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Removed from playlist",
    });
})

//Admin Routes
export const getAllUsers = catchAsyncError(async (req,res,next)=>{
  const users = await User.find();

  res.status(200).json({
    success: true,
    message: "Users retrived successfully",
  });
})

export const updateUserRole = catchAsyncError(async (req,res,next)=>{
  const user = await User.findById(req.params.id);
  if(!user){
    return next(new ErrorHandler("user doesn't exists", 401));
  }

  if(user.role != 'admin'){
    user.role = "admin";
  } else{
    user.role = "user"
  }

 await user.save();
  res.status(200).json({
    success: true,
    message: "Role updated successfully",
  });
})

export const deleteUser = catchAsyncError(async (req,res,next)=>{
  const user = await User.findById(req.params.id);
  if(!user){
    return next(new ErrorHandler("user doesn't exists", 401));
  }

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

 await user.remove();
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
})
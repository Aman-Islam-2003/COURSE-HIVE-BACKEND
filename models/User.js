import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"]
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: validator.isEmail
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password must be atleast 6 characters"],
    select: false
  },
  role: {
    type: E,
    required: [true, "Please enter your password"],
    minLength: [6, "Password must be atleast 6 characters"],
    select: false 
  }
})

export const User = mongoose.model("User", userSchema);
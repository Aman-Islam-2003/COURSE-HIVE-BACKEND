import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import validator from "validator";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password must be atleast 6 characters"],
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  playlist: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      poster: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: String,
});

userSchema.pre("save", async function(){
  if(!this.isModified("password")){
      next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

userSchema.method.getJWTToken = function(){
   return jwt.sign({id: this._id}, process.env.JWT_SECRET,{
    expiresIn: "15d",
   })
   //first give payload the data you want to convert
}

userSchema.method.getResetToken = function(){
  const resetToken = crypto.randomBytes(20).toString("hex");
   this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

   this.resetPasswordExpire = Date.now()+15*60*1000;//next 15 mins
  return resetToken;
}
export const User = mongoose.model("User", userSchema);

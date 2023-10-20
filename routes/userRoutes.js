import { Router } from "express";
import {register, login, logout, getMyProfile, changePassword, updateProfile, updateProfilePicture, forgetPassword, resetPassword} from "../controllers/userController.js"
import { isAuthenticated } from "../middlewares/Authenticate.js";
const router = Router();

router.route("/register").post(register);

router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticated, getMyProfile);
router.route("/changePassword").put(isAuthenticated, changePassword);
router.route("/updateProfile").put(isAuthenticated, updateProfile);
router.route("/updateProfilePicture").put(isAuthenticated, updateProfilePicture);
router.route("/forgetpassword").put(isAuthenticated, forgetPassword);
router.route("/resetPassword/:token").put(resetPassword);

export default router;
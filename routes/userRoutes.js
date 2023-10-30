import { Router } from "express";
import {register, login, logout, getMyProfile, changePassword, updateProfile, updateProfilePicture, forgetPassword, resetPassword, addToPlaylist, removeFromPlaylist, getAllUsers, updateUserRole, deleteMyProfile} from "../controllers/userController.js"
import { authorizeAdmin, isAuthenticated } from "../middlewares/Authenticate.js";
import singleUpload from "../middlewares/multer.js";

const router = Router();

router.route("/register").post(singleUpload, register);

router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticated, getMyProfile);
router.route("/changePassword").put(isAuthenticated, changePassword);
router.route("/updateProfile").put(isAuthenticated, updateProfile);
router.route("/updateProfilePicture").put(singleUpload, isAuthenticated, updateProfilePicture);
router.route("/forgetpassword").put(isAuthenticated, forgetPassword);
router.route("/resetPassword/:token").put(resetPassword);

router.route("/addToPlaylist").post(isAuthenticated, addToPlaylist);

router.route("/removeFromPlaylist").post(isAuthenticated, removeFromPlaylist);

//admin routes
router.route("/admin.users").get(isAuthenticated, authorizeAdmin, getAllUsers);
router.route("/admin.user/:id").put(isAuthenticated, authorizeAdmin, updateUserRole).delete(isAuthenticated, authorizeAdmin, deleteUser);

router.route("/admin.user/:id").put(isAuthenticated, authorizeAdmin, updateUserRole).delete(isAuthenticated, authorizeAdmin, deleteUser);

//delete my profile
router.route("/me").delete(isAuthenticated, deleteMyProfile);
export default router;
import { Router } from "express";
import {register, login} from "../controllers/userController.js"
const router = Router();

router.route("/register").post(register);

router.route("/login").post(login);
router.route("/logout").get(logout);
//router.route("/getMyProfile").post(register);

export default router;
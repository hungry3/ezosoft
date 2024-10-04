import express from "express";
const router = express.Router();
import {
  registerUser,
  LoginUser,
  LogoutUser,
  updateAccessToken,
  updateInfo,
  resetPassword,
  forgotPassword,
  updatePassword,
  googleLogin,
  facebookLogin,
} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
router.post("/register", registerUser);
router.post("/login", LoginUser);
router.post("/logout", isAuthenticated, LogoutUser);

router.patch("/update-password", isAuthenticated, updatePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset/:token", resetPassword);

router.patch("/update-info", isAuthenticated, updateInfo);

router.post("/refresh-token", updateAccessToken);
router.post("/google", googleLogin);
router.post("/facebook", facebookLogin);

export default router;

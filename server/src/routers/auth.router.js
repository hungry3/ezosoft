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
import passport from 'passport';
router.post("/register", registerUser);
router.post("/login", LoginUser);
router.post("/logout", isAuthenticated, LogoutUser);

router.patch("/update-password", isAuthenticated, updatePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset/:token", resetPassword);

router.patch("/update-info", isAuthenticated, updateInfo);

router.post("/refresh-token", updateAccessToken);

router.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get("/google/callback", passport.authenticate('google', { failureRedirect: '/login' }), googleLogin);

router.get("/facebook", passport.authenticate('facebook', { scope: ['email'] }));
router.get("/facebook/callback", passport.authenticate('facebook', { failureRedirect: '/login' }), facebookLogin);

export default router;

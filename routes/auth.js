import express from "express";
import passport from "passport";
import multer from "multer";

import * as AuthController from "../controllers/auth.js";
import { isAuthenticate } from "../middlewares/isAuthenticate.js";

const authRouter = express.Router();
const upload = multer();

authRouter.get("/status", isAuthenticate, AuthController.checkIsLogin);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get("/refresh", AuthController.generateNewToken);

authRouter.get(
  "/0auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  (req, res) =>
    res.redirect(
      process.env.ALLOW_ORIGIN + "/login/?user=" + btoa(req.user._id)
    )
);

authRouter.get("/login", AuthController.login);

authRouter.put(
  "/updateProfile",
  isAuthenticate,
  upload.single("avatar"),
  AuthController.updateProfile
);

export default authRouter;

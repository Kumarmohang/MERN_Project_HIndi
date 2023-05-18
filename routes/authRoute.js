import express from "express";
import {
  regularController,
  loginController,
  testController,
} from "../controller/authController.js";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";

// Router Object

const router = express.Router();

// routing
// Registering || Method Post
router.get("/", (req, res) => {
  res.send({ success: true, message: "its working" });
});

router.post("/register", regularController);
router.post("/login", loginController);
router.get("/test", requireSignIn, isAdmin, testController);

// Protected route Auth

router.get("/auth-route", requireSignIn, (req, res) => {
  res.status(200).send({
    success: true,
  });
});

export default router;

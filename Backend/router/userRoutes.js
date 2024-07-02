import express from "express";
const router = express.Router();
import multer from "../middleware/multer.js";
import {
  //Get
  getUserProfile,
  
 
  //Post 
  userAuth,
  registerUser,
  logOut,
  updateProfile, 
  
} from "../controller/userController.js";

import {protect} from "../middleware/authMiddleware.js"



router.post("/auth", userAuth);
router.post("/register", registerUser);
router.post("/logOut", logOut);
router.post("/updateProfile",protect, multer.single("profilePic"), updateProfile);
router.get("/profile",protect, getUserProfile)
      


export default router;

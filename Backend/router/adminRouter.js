import express from "express";
const router = express.Router();


import {
    
    loginAdmin,
    getUserData,
    createUser,
    editUser,
    deleteUser,
} from "../controller/adminController.js";


router.post("/adminLogin", loginAdmin);
router.post("/userData", getUserData);
router.post("/createUser", createUser);
router.post("/editUser/:id", editUser);
router.post("/deleteUser/:id", deleteUser);

export default router
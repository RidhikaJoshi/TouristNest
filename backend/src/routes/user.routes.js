import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { register, loginUser, logout } from "../controllers/user.controller.js"; // this method is used to import the register function from the user.controller.js file

const router = Router(); // this method is used to create a new router object

router.route("/register").post(upload.single("profilePicture"), register); // this method is used to create a new route that will accept the POST request at the /register endpoint
// calling multer function to upload single file and calling register function

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logout);

export default router; // this method is used to export the router object
// Path: backend/src/routes/user.routes.js

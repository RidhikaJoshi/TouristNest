import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router(); // this method is used to create a new router object

router.route("/register").post(upload.single("image"), register); // this method is used to create a new route that will accept the POST request at the /register endpoint
// calling multer function to upload single file and calling register function

export default router; // this method is used to export the router object
// Path: backend/src/routes/user.routes.js

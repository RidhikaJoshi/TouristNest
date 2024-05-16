import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router(); // this method is used to create a new router object
export default router; // this method is used to export the router object

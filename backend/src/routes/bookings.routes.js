import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createNewBooking } from "../controllers/bookings.controller.js";

const router = Router(); // this method is used to create a new router object

router.route("/:hotelId").post(verifyJWT, createNewBooking); // this method is used to create a new route that will accept the POST request at the /booking/:hotelId endpoint
export default router; // this method is used to export the router object

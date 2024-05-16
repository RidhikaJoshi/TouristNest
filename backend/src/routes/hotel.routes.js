import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addHotels,
  getAllHotels,
  updateHotelDetails,
} from "../controllers/hotels.controller.js"; // this method is used to import the addHotels function from the hotels.controller.js file

const router = Router(); // this method is used to create a new router object

router.route("/getAllHotels").get(getAllHotels); // this method is used to create a new route that will accept the GET request at the /getAllHotels endpoint
router.route("/addHotels").post(verifyJWT, upload.single("picture"), addHotels); // this method is used to create a new route that will accept the POST request at the /addHotels endpoint

router.route("/:hotelId").patch(verifyJWT, updateHotelDetails);

export default router; // this method is used to export the router object

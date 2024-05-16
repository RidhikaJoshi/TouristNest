import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import { Hotel } from "../models/hotels.model.js";

const getAllHotels = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skipper = (page - 1) * limit;

  const hotels = await Hotel.find({}).skip(skipper).limit(limit);
  if (!hotels) {
    throw new ApiError(404, "No hotels found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, hotels, "Hotels fetched successfully"));
});

const addHotels = asyncHandler(async (req, res) => {
  const { name, description, tags, price, country, state, location } = req.body;
  if (
    !name ||
    !description ||
    !tags ||
    !price ||
    !country ||
    !state ||
    !location
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const pictureLocalPath = req.file.path;
  if (!pictureLocalPath) {
    throw new ApiError(400, "Picture is required");
  }
  const picture = await uploadOnCloudinary(pictureLocalPath);
  if (!picture) {
    throw new ApiError(500, "Failed to upload picture on cloudinary");
  }
  const newHotel = await Hotel.create({
    picture: picture.url,
    name,
    description,
    tags,
    price,
    country,
    state,
    location,
    owner: req.user._id,
  });
  if (!newHotel) {
    throw new ApiError(
      500,
      "Internal Server error occurred while creating new Hotel in the database"
    );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, newHotel, "Hotel added successfully"));
});

export { addHotels, getAllHotels };

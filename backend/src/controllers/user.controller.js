import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const register = asyncHandler(async (req, res) => {
  const { username, fullName, email, phone, password } = req.body;
  if (!username || !fullName || !email || !phone || !password) {
    throw new ApiError(400, "All fields are rquired");
  }
  if (password.length() < 8) {
    throw new ApiError(400, "Password should be atleast 8 chracters long");
  }
  if (email.includes("@") === false) {
    throw new ApiError(400, "Email should be valid");
  }
  if (phone.length() < 10) {
    throw new ApiError(400, "Phone Number should be valid!");
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(400, "User with same username or email already exists");
  }
  // checking for file
  if (!req.files) {
    throw new ApiError(400, "Profile Picture is required");
  }

  const localProfilePicture = req.files.profilePicture
    ? req.files.profilePicture[0].path
    : null;

  if (!localProfilePicture) {
    throw new ApiError(400, "Profile Picture is required");
  }

  const profilePicture = await uploadOnCloudinary(localProfilePicture);

  if (!profilePicture) {
    throw new ApiError(
      500,
      "Something went wrong in uploading image on cloudinary"
    );
  }
  const user = await User.create({
    username,
    fullName,
    email,
    phone,
    password,
    profilePicture,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "User not created");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User created successfully"));
});

export { register };

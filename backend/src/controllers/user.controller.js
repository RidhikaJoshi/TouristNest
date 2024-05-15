import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const register = asyncHandler(async (req, res) => {
  const { username, fullName, email, phone, password } = req.body;
  //console.log("req.body", req.body);
  // validation - check all fields are filled and correctly filled
  if (
    fullName === "" ||
    email === "" ||
    password === "" ||
    username === "" ||
    phone === ""
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (password.length < 8) {
    throw new ApiError(400, "Password should be atleast 8 chracters long");
  }
  if (email.includes("@") === false) {
    throw new ApiError(400, "Email should be valid");
  }
  if (phone.length < 10) {
    throw new ApiError(400, "Phone Number should be valid!");
  }

  //check if user already exists in the database -using email and username
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  }); // $or is used to check for multiple conditions
  if (existedUser) {
    throw new ApiError(400, "User with username or email already exists");
  }
  // checking for file
  if (!req.file) {
    throw new ApiError(400, "Profile Picture is required");
  }

  const localProfilePicture = req.file.path;
  console.log("localProfilePicture", localProfilePicture);
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
    profilePicture: profilePicture.url,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "User not created.Internal Server Error");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User created successfully"));
});

export { register };

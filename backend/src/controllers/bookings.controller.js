import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Hotel } from "../models/hotels.model.js";
import { Booking } from "../models/bookings.model.js";
import { isValidObjectId } from "mongoose";

const createNewBooking = asyncHandler(async (req, res) => {
  const { hotelId } = req.params;
  if (!hotelId) {
    throw new ApiError(400, "hotelId is required");
  }
  if (!isValidObjectId(hotelId)) {
    throw new ApiError(400, "Invalid hotelId");
  }
  const { checkinDate, checkoutDate, NumberOfRooms } = req.body;
  if (!checkinDate || !checkoutDate || !NumberOfRooms) {
    throw new ApiError(400, "checkIn, checkOut, NumberOfRooms are required");
  }
  const checkIn = new Date(checkinDate);
  const checkOut = new Date(checkoutDate);

  if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
    throw new ApiError(400, "Invalid date format");
  }

  if (checkIn >= checkOut) {
    throw new ApiError(400, "Check-out date must be after check-in date");
  }
  const hotel = await Hotel.findById(hotelId);
  if (!hotel) {
    throw new ApiError(404, "Hotel not found");
  }
  const price = hotel.price;
  const numberOfNights = Math.ceil(
    (checkOut - checkIn) / (1000 * 60 * 60 * 24)
  );

  const totalAmount = price * NumberOfRooms * numberOfNights;

  const newBooking = await Booking.create({
    hotel: hotelId,
    user: req.user._id,
    checkIn,
    checkOut,
    NumberOfRooms,
    totalAmount,
  });
  if (!newBooking) {
    throw new ApiError(500, "Booking failed");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, "Booking successful", newBooking));
});

const getBookingById = asyncHandler(async (req, res) => {});

const getAllBookings = asyncHandler(async (req, res) => {});

const updateBookingById = asyncHandler(async (req, res) => {});

const deleteBookingById = asyncHandler(async (req, res) => {});

export {
  createNewBooking,
  getBookingById,
  getAllBookings,
  updateBookingById,
  deleteBookingById,
};

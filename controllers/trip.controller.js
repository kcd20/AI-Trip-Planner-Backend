import Trip from "../models/trip.model.js";
import User from "../models/user.model.js";
import { randomUUID } from "crypto";

export const getUserTrips = async (req, res) => {
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ clerkUserId });

  const userTrips = await Trip.find({ user: user._id });

  res.status(200).json(userTrips);
};

export const getTrip = async (req, res) => {
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const id = req.params.id;

  const trip = await Trip.findOne({ id });

  res.status(200).json(trip);
};

export const postCreateTrip = async (req, res) => {
  const clerkUserId = req.auth.userId;
  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ clerkUserId });

  if (!user) {
    return res.status(404).json("User not found");
  }

  const id = `${Date.now()}-${randomUUID()}`;

  const newTrip = new Trip({
    user: user._id,
    id: id,
    ...req.body,
    createdOn: Date.now(),
  });
  const trip = await newTrip.save();
  res.status(200).json(trip);
};

export const deletePost = async (req, res) => {
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const trip = await Trip.findOne({ id: req.params.id });
  await Trip.deleteOne(trip);

  res.status(200).json("Post has been deleted");
};

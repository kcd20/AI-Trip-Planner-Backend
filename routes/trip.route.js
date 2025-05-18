import express from "express";
import { deletePost, getTrip, getUserTrips, postCreateTrip } from "../controllers/trip.controller.js";

const router = express.Router();

router.get("/saved", getUserTrips);
router.get("/get/:id", getTrip);
router.post("/create", postCreateTrip);
router.delete("/:id", deletePost)

export default router;

import { Schema } from "mongoose";
import mongoose from "mongoose";

const tripSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    id: {
      type: String,
      required: true,
      unique: true,
    },
    createdOn: {
      type: String,
      required: true,
    },
    destinations: {
      type: [String],
      required: true,
    },
    lengthOfTrip: {
      type: String,
      required: true,
    },
    arrivalAirport: {
      type: String,
    },
    departureAirport: {
      type: String,
    },
    timeOfArrival: {
      type: String,
    },
    timeOfDeparture: {
      type: String,
    },
    tripDetails: {
      type: String,
    },
  },
);

export default mongoose.model("Trip", tripSchema);

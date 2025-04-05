import { Schema } from "mongoose"
import mongoose from "mongoose"

const tripSchema = new Schema(
{
    user: {
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true,
    },
    img: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
}, { 
    timestamps: true 
});

export default mongoose.model("Trip", tripSchema);
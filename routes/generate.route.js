import express from "express";
import { postGenerateTrip } from "../controllers/generate.controller.js";

const router = express.Router();

router.post("/", postGenerateTrip);

export default router;
import express from "express"
import tripRouter from "./routes/trip.route.js"
import generateRouter from "./routes/generate.route.js"
import webhookRouter from "./routes/webhook.route.js"
import connectDB from "./lib/connectDB.js"
import cors from "cors"
import { clerkMiddleware } from "@clerk/express"

const app = express()

app.use(cors(process.env.CLIENT_URL));
app.use(clerkMiddleware());
app.use("/webhooks", webhookRouter);

app.use(express.json());

app.use("/generate", generateRouter)

app.get("/protect", (req, res) => {
    const { userId } = req.auth;
    if(!userId) {
        return res.status(401).json("not authenticated")
    }
    res.status(200).json("content");
})

app.use("/trip", tripRouter)

app.use((error, req, res, next) => {

    res.status(error.status || 500)

    res.json({
        message: error.message || "Something went wrong!",
        status: error.status,
        stack: error.stack
    })
})

app.listen(3000, () => {
    connectDB()
    console.log("server is running at port 3000")
})
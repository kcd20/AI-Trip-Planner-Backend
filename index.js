import express from "express"
import userRouter from "./routes/user.route.js"
import tripRouter from "./routes/trip.route.js"
import connectDB from "./lib/connectDB.js"
import cors from "cors"

const app = express()

app.use(cors(process.env.CLIENT_URL));
app.use(express.json());

app.use("/users", userRouter)
app.use("/trip", tripRouter)

app.listen(3000, () => {
    connectDB()
    console.log("server is running at port 3000")
})
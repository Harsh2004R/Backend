import express, { urlencoded } from "express";
import { } from "dotenv/config";
import cors from "cors";
import dataBaseConnection from './config/db.js';
import userRouter from "./routes/user.routes.js";

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(express.urlencoded({
    extended: true, limit: "1mb",
    parameterLimit: 5000,
}));


app.get("/", () => {
    res.send("server is working ...")
})

// user Routes...
app.use("/api/v1", userRouter)




const PORT = process.env.PORT || 5001

app.listen(PORT, (req, res) => {
    try {

        console.log(`server is listening to ${PORT}`);
        dataBaseConnection();

    } catch (error) {
        console.log("Server is killed");
    }
})
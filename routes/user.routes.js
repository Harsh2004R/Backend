import express from "express";
import { userVerifyController, userRegisterController } from "../controller/user.controller.js"

const userRouter = express.Router();


userRouter.post("/user/verify", userVerifyController);

userRouter.post("/user/register", userRegisterController);


export default userRouter;
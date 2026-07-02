import express from "express";
import { userLoginController, userSignupController } from "../controller/user.controller.js"

const userRouter = express.Router();


userRouter.post("/user/login", userLoginController);

userRouter.post("/user/signup", userSignupController);


export default userRouter;
import express from "express";
import { userVerifyController, userRegisterController, userProfileController, userResetPasswordController, userLogoutController,userProfileUpdateController } from "../controller/user.controller.js"
import { auth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const userRouter = express.Router();


userRouter.post("/user/verify", userVerifyController);

userRouter.post("/user/register", userRegisterController);

userRouter.get("/user/profile", auth, userProfileController);

userRouter.post("/user/reset-password", auth, userResetPasswordController);

userRouter.post("/user/logout", auth, userLogoutController);

userRouter.patch("/user/update/profile", auth, upload.single('avatar'), userProfileUpdateController);






export default userRouter;
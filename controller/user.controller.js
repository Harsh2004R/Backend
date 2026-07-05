import UserModel from "../model/user.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";




const userVerifyController = async (req, res) => {


    res.status(200).json({ message: "login api working..." })
}

const userRegisterController = async (req, res) => {

    const { fullName, email, password } = req.body;
    try {

        if ([fullName, email, password].some((fields) => fields?.trim() === "" || !fields)) {
            throw new ApiError(400, "Required fields are missing form request body")
        }
        const existedUser = await UserModel.findOne({ $or: [{ fullName }, { email }] });
        if (existedUser) {
            throw new ApiError(409, `User Already exist with ${fullName} or ${email}`);
        }

        const user = new UserModel({
            fullName,
            email,
            password
        });
        await user.save();
        const createdUser = await UserModel.findById(user._id).select("-password -refreshToken")
        if (!createdUser) {
            throw new ApiError(400, `User ${fullName} or ${email} not created`);
        }
        return res.status(201).json(
            new ApiResponse(201, "user registered successfully", createdUser)
        )

    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message || `Some error is comming from register user controller`);
    }


}

export { userVerifyController, userRegisterController }


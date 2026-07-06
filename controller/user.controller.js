import UserModel from "../model/user.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"








const getTokens = async (ID) => {

    const user = await UserModel.findById(ID);
    if (!user) {
        throw new ApiError(404, "User not found to assign token");
    }

    const accessToken = user.getAccessToken();
    const refreshToken = user.getRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return {
        accessToken, refreshToken
    }
}



const userVerifyController = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!(email || password)) {
        throw new ApiError(400, "Email and password are required")
    }
    // Find user
    const user = await UserModel.findOne({ email });

    if (!user) {
        throw new ApiError(404, `User not found with ${email}`);
    }
    // password verify
    const correctPassword = user.isPasswordCorrect(password);
    if (!correctPassword) {
        throw new ApiError(401, "Invalid credentials");
    }

    // token assignment
    const { accessToken, refreshToken } = await getTokens(user._id);

    res.status(200).json(
        new ApiResponse(200,
            {
                accessToken,
                refreshToken
            }
            , "Login successful")
    );

})











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


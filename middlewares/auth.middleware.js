import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
const auth = (req, res, next) => {

    try {
        const incommingToken = req.headers.authorization?.split(" ")[1];
        if (!incommingToken) {
            throw new ApiError(400, `Please provide access token`)
        }
        const decoded = jwt.verify(incommingToken, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next()
    } catch (error) {
        throw new ApiError(500, `Somthing went wrong in auth middleware Error : ${error.message}`);
    }

}

export { auth };



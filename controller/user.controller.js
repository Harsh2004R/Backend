import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../model/user.model.js"





const userVerifyController = async (req, res) => {


    res.status(200).json({ message: "login api working..." })
}

const userRegisterController = async (req, res) => {

    res.status(200).json({ message: "signup api working..." })


}

export { userVerifyController, userRegisterController }


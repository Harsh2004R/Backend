import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: {
        required: true, unique: true, type: String, trim: true,
        lowercase: true,
    },
    password: { required: true, type: String, minlength: 8, },
    refreshToken: { type: String, default: null },
    avatar: { type: String, default: "https://api.dicebear.com/10.x/adventurer-neutral/svg?seed=ddddddswwqaxzcfhb" },
    cover: { type: String, default: null },
    history: {
        watched: []
    }
}, {
    timestamps: true
})


// --- user password hasing --- 
userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 10);

});


userSchema.methods.isPasswordCorrect = async function (password) {
    const flag = await bcrypt.compare(password, this.password);
    return flag;
}


userSchema.methods.getAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.fullName,
            email: this.email

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )

}

userSchema.methods.getRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )

}



const UserModel = mongoose.model("User", userSchema);

export default UserModel;


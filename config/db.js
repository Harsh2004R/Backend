import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
const dataBaseConnection = async () => {

    try {
        await mongoose.connect(MONGO_URI);
        console.log("Data Base Connected -----")
    } catch (error) {
        console.log("================== ERROR ========= IN ======== Data Base Connection ==============", error);
        process.exit(1);
    }
}
export default dataBaseConnection;
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";


// cloudinary configurations 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
})




const uploadOnCloudinary = async (localFilePath) => {
    if (!localFilePath) return null;
    try {
        // upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        return response;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return null;
    } finally {
        try {
            console.time("Temporary file deleted.");
            await fs.unlink(localFilePath);
            console.timeEnd("Temporary file deleted.");
        } catch (err) {
            console.error("Failed to delete temporary file:", err.message);
        }
    }
}

export { uploadOnCloudinary };
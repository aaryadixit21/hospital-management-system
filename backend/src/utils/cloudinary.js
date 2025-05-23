import dotenv from "dotenv";
dotenv.config({ path: './.env' });
import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localfilepath) => {
    if(localfilepath){
        try {
            const uploadResult = await cloudinary.uploader.upload(localfilepath);
            console.log("Upload successful:", uploadResult.url);
            fs.unlinkSync(localfilepath)
            return uploadResult;
        } catch (error) {
            fs.unlinkSync(localfilepath)
            console.error("Error uploading image:", error);
            throw error; 
        }
    }
    else{
        return null;
    }
};

export {uploadOnCloudinary}
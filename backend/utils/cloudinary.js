import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
const uploadToCloudinary = async (localFilePath) => {
    if (!localFilePath) {
        console.error('Local file path is missing');
        return new Error("Local file path is missing");
    }

    try {
        const file = await cloudinary.uploader.upload(localFilePath);
        return file;
    } catch (error) {
        console.error(`Error in uploading file to Cloudinary: ${error.message}`);
        throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
};

export {uploadToCloudinary};

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadToCloudinary = async (localFilePath) => {
    if (!localFilePath) {
        console.error('Local file path is missing');
        return new Error("Local file path is missing");
    }

    try {
        const resourceType = 'auto'; 
        const file = await cloudinary.uploader.upload(localFilePath, {
            resource_type: resourceType,
            timeout: 600000,
        });

        fs.unlinkSync(localFilePath); // Delete the file after successful upload
        return file;
    } catch (error) {
        console.error(`Error in uploading file to Cloudinary: ${error.message}`);
        throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
};

export {uploadToCloudinary};

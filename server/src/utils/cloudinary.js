import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localPath, foldername) => {
    try {
        if (!localPath) return null;

        // ? process of uploading on cloudinary
        const response = await cloudinary.uploader.upload(localPath, {
            folder: foldername,
            resource_type: 'auto',
        });

        //! Log the uploaded file URL
        // console.log('File is uploaded on Cloudinary:', response.url);

        //? If file is uploaded successfully, check and unlink from local storage
        if (fs.existsSync(localPath)) {
            fs.unlinkSync(localPath);
            // console.log('Local file deleted:', localPath);
        }

        return response;
    } catch (error) {
        //? In case of error, check and delete the file from local storage
        if (fs.existsSync(localPath)) {
            fs.unlinkSync(localPath);
            // console.log('Local file deleted after error:', localPath);
        }

        console.log('Error occurred while uploading to Cloudinary:', error);
        return null;
    }
};

export { uploadOnCloudinary };

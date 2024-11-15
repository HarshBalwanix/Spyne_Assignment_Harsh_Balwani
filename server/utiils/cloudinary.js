const cloudinary = require('cloudinary').v2
require("dotenv").config();

async function uploadOnCloudinary(file,quality,height){
    const option = {folder:process.env.CLOUDINARY_FOLDER};
    option.resource_type= "auto" ;
    if(quality){
        option.quality=quality;
    }
    if(height){
        option.height=height;
    }
    const result=await cloudinary.uploader.upload(file.tempFilePath , option ,(error)=>{
        if(error)
        console.log("Error while uploading image on cloudinary:::",error);
    })
    return result;
}

module.exports ={uploadOnCloudinary}
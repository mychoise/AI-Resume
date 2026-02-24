import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.config.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
folder: "resume" , // folder name in Cloudinary
    resource_type: "raw",
    allowed_formats: "pdf",  
  },
});
const upload = multer({ storage ,
  limits:{
    fileSize:5*1024*1024 //5mb
  }
});
export default upload;
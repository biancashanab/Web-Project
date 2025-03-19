import cloudinary from "cloudinary";
import multer from "multer";

cloudinary.v2.config({   // Configurare pentru cloudinary.com
  cloud_name: "dckm7bcu7",
  api_key: "778241741463176",
  api_secret: "9eXIP_8ynNKi_Da0bD27hB32cUA",
});

const storage = multer.memoryStorage(); // Stocare în memorie

async function imageUploadUtil(file) {
  const result = await cloudinary.v2.uploader.upload(file, { // Upload în Cloudinary
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

export { upload, imageUploadUtil }; 

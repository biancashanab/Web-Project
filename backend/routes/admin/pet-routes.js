import express from "express";
import { upload } from "../../helpers/cloudinary.js";
import {
    handleImageUpload,
    addPet,
    editPet,
    fetchAllPets,
    deletePet,
    getPetHistory,
    updatePetsStatus
  } from "../../controllers/admin/pets-controller.js";
    
  const router = express.Router();
  
  router.post("/upload-image", upload.single("my_file"), handleImageUpload);
  router.post("/add", addPet);
  router.put("/edit/:id", editPet);
  router.delete("/delete/:id", deletePet);
  router.get("/get", fetchAllPets);
  router.get("/history/:id", getPetHistory);
  router.post("/update-status", updatePetsStatus);
  
  export default router;
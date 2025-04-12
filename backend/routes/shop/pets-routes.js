import express from "express";
import { getFilteredPets, getPetDetails } from "../../controllers/shop/pets-controller.js";
    
const router = express.Router();

router.get("/get", getFilteredPets);
router.get("/get/:id", getPetDetails);

export default router;
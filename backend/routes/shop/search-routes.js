import express from 'express';
import { searchPets } from "../../controllers/shop/search-controller.js";

const router = express.Router();

router.get("/:keyword", searchPets);

export default router;
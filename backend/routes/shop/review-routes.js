import express from 'express';

import {
    addReview,
    getReviews,
} from "../../controllers/shop/review-controller.js";

const router = express.Router();

router.post("/add", addReview);
router.get("/get/:productId", getReviews);

export default router;
import express  from "express";

import {
  submitAdoptionApplication,
  getAllAdoptionOrdersByUser,
  getAdoptionOrderDetails,
  getOrderHistory
} from "../../controllers/shop/adoption_order-controller.js";


const router = express.Router();
  
router.post("/submit-application", submitAdoptionApplication);
router.get("/list/:userId",getAllAdoptionOrdersByUser);
router.get("/details/:id", getAdoptionOrderDetails);
router.get('/history/:userId', getOrderHistory);

export default router;
import express  from "express";

import {
  createAdoptionOrder,
  getAllAdoptionOrdersByUser,
  getAdoptionOrderDetails,
  capturePayment,
  getOrderHistory
} from "../../controllers/shop/adoption_order-controller.js";


const router = express.Router();
  
router.post("/create", createAdoptionOrder);
router.post("/capture", capturePayment);
router.get("/list/:userId",getAllAdoptionOrdersByUser);
router.get("/details/:id", getAdoptionOrderDetails);
router.get('/history/:userId', getOrderHistory);

export default router;
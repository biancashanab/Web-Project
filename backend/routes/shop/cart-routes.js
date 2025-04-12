import express from 'express';

import {
    addToCart,
    fetchCartItems,
    deleteCartItem,
    clearCart,
} from "../../controllers/shop/cart-controller.js";
  
const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.delete("/:userId/:PetId", deleteCartItem);
router.post("/clear", clearCart);

export default router;
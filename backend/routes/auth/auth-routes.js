import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  updateUser,
} from "../../controllers/auth/auth-controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/update-user", authMiddleware, updateUser);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

export default router;

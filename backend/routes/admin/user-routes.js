import express from 'express';
import { getAllUsersForAdmin, deleteUser } from '../../controllers/admin/user-controller.js'; 

const router = express.Router();

router.get('/list', getAllUsersForAdmin);
router.delete('/delete/:userId', deleteUser);

export default router;
import express from 'express';
import { getAllUsersForAdmin } from '../../controllers/admin/user-controller.js'; 

const router = express.Router();

router.get('/list', getAllUsersForAdmin);

export default router;
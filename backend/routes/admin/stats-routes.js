import express from 'express';
import { getDashboardStats } from '../../controllers/admin/stats-controller.js';

const router = express.Router();

router.get('/dashboard', getDashboardStats);

export default router;
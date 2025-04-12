import express from 'express';
import { getAboutContent } from '../../controllers/admin/about-controller.js';

const router = express.Router();

router.get('/content', getAboutContent);

export default router; 
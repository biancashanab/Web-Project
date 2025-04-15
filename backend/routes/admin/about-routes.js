import express from 'express';
import { getAboutContent, updateAboutContent } from '../../controllers/admin/about-controller.js';

const router = express.Router();

router.get('/content', getAboutContent);
router.put('/update', updateAboutContent);

export default router; 
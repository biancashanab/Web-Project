import express from 'express';
import { submitContactForm } from '../../controllers/common/contact-controller.js';

const router = express.Router();

router.post('/submit', submitContactForm);

export default router; 
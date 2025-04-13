import express from 'express';
import { getContactMessages, updateContactStatus } from '../../controllers/common/contact-controller.js';
import { authMiddleware } from '../../controllers/auth/auth-controller.js';

const router = express.Router();

// Test route without authentication
router.get('/test', (req, res) => {
  console.log('Test route called');
  res.json({ message: 'Contact routes are working' });
});

// Check if user is admin
const isAdmin = (req, res, next) => {
  console.log('isAdmin middleware called, user role:', req.user?.role);
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Access denied. Admin role required.' });
  }
  next();
};

router.get('/', authMiddleware, isAdmin, getContactMessages);
router.patch('/:id/status', authMiddleware, isAdmin, updateContactStatus);

export default router; 
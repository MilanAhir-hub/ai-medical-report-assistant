import express from 'express';
import { login, logout, signup } from '../../controllers/auth/auth.controller.js';
import { protect } from '../../middleware/auth/auth.middleware.js';

const router = express.Router();

// routes
router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', protect, logout);

export default router;
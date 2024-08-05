import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

// Use the auth routes
router.use('/auth', authRoutes);

// Use the user routes
router.use('/users', userRoutes);

export default router;

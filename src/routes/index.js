import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import adminRoutes from './adminRoutes.js';
import express from 'express';

const route = express.Router();

route.use('/auth', authRoutes);
route.use('/user', userRoutes);
route.use('/admin', adminRoutes);

export default route;

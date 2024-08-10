import express from 'express';
import { 
    createUser, 
    getUser, 
    getUsers, 
    updateUser, 
    deleteUser 
} from '../controllers/adminControllers.js';
import { 
    createUserValidator, 
    getUserValidator, 
    updateUserValidator, 
    deleteUserValidator 
} from '../validator/adminValidators.js';
import { validate } from '../middleware/validatorMiddleware.js';
import { authenticateToken, isAdmin } from "../middleware/authMiddleware.js";

const route = express.Router();

// Apply authenticateToken middleware to all routes
route.use(authenticateToken);

// Admin routes
route.post('/users', isAdmin, createUserValidator, validate, createUser);
route.get('/users', isAdmin, getUsers);
route.get('/users/:id', isAdmin, getUserValidator, validate, getUser);
route.put('/users/:id', isAdmin, updateUserValidator, validate, updateUser);
route.delete('/users/:id', isAdmin, deleteUserValidator, validate, deleteUser);

export default route;
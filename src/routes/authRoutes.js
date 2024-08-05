import expres from 'express';
import { signup, login } from '../controllers/userController.js';
import { validateSignup  } from '../validators/userSchema.js';

const router = expres.Router();

router.post('/signup', validateSignup, signup);
router.post('/login', login);

export default router;

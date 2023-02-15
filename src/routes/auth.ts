import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { apiLimiter } from '../middleware/expressRateLimit';

const router = Router();

/** Login route with apiLimiter */
router.post('/login', [apiLimiter], AuthController.login);

export default router;

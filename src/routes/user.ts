import { Router } from 'express';
import UserController from '../controllers/UserController';
import checkJwt from '../middleware/checkJwt';

/**
 * This code not defined in task description, just only is created
 * to show how can set JWT token to requests
 */

const router = Router();

/** Add a user */
router.patch('/:id([0-9]+)', [checkJwt], UserController.addUser);

/** Delete a user */
router.delete('/:id([0-9]+)', [checkJwt], UserController.deleteUser);

export default router;

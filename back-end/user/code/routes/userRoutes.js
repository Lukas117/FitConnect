import express from 'express';
import * as userController from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';
const router = express.Router();

router.get('/:id', userController.getUserFromId);
// router.post('/login', authenticate,  userController.login);
router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/addSports', userController.addSportList);

export default router;
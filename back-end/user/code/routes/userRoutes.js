import express from 'express';
import * as userController from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';
const router = express.Router();


  
router.get('/check-auth', authenticate, userController.getUserIdFromJWT); // Add the new route here
router.get('/:id', authenticate, userController.getUserFromId);
router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/addSports', authenticate, userController.addSportList);


export default router;

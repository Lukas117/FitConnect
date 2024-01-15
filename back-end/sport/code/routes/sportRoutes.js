import express from 'express';
import {
	createSport,
	getSportById,
	getSportList,
	updateSport
} from '../controllers/sportController.js';

const router = express.Router();

router.get('/sports', getSportList);

router.get('/sports/:sportId', getSportById);

router.post('/sports', createSport);

router.put('/sports/:sportId', updateSport);

export default router;

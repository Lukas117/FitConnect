import express from 'express';
import {
	createFacility,
	getFacilityById,
	getFacilityList,
	updateFacility
} from '../controllers/facilityController.js';

const router = express.Router();

router.get('/facilities', getFacilityList);

router.get('/facilities/:facilityId', getFacilityById);

router.post('/facilities', createFacility);

router.put('/facilities/:facilityId', updateFacility);

export default router;

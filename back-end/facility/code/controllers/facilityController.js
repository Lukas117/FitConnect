import {
	createFacilityData,
	getFacilityData,
	getFacilityListData,
	updateFacilityData
} from '../adapters/supabaseAdapter.js';

// GET Facility list
export async function getFacilityList(req, res, next) {
	try {
		const facilityList = await getFacilityListData();
		res.status(200).json(facilityList);
	} catch (err) {
		next(err);
	}
}

// GET Facility by id
export async function getFacilityById(req, res, next) {
	try {
		const facility = await getFacilityData(req.params.facilityId);
		if (facility) {
			res.status(200).json(facility);
		} else {
			res.status(404).json({ error: 'Facility not found' });
		}
	} catch (err) {
		next(err);
	}
}

// CREATE Facility
export async function createFacility(req, res, next) {
	try {
		if (req !== null) {
			const event = await createFacilityData(req);
			if (event !== null) {
				res.status(201).json(event);
			} else {
				res.status(404).json({ error: 'Facility could not be created' });
			}
		} else {
			res.status(400).json({ error: 'Facility is null' });
		}
	} catch (err) {
		next(err);
	}
}

// UPDATE Facility
export async function updateFacility(req, res, next) {
	try {
		if (req !== null) {
			const event = await updateFacilityData(req);
			if (event !== null) {
				res.status(201).json(event);
			} else {
				res.status(404).json({ error: 'Facility could not be updated' });
			}
		} else {
			res.status(400).json({ error: 'Facility is null' });
		}
	} catch (err) {
		next(err);
	}
}

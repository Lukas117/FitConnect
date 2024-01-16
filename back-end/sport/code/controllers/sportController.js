import {
	createSportData,
	getSportData,
	getSportListData,
	updateSportData
} from '../adapters/supabaseAdapter.js';

// GET Sport list
export async function getSportList(req, res, next) {
	try {
		const sportList = await getSportListData();
		res.status(200).json(sportList);
	} catch (err) {
		next(err);
	}
}

// GET Sport by id
export async function getSportById(req, res, next) {
	try {
		const sport = await getSportData(req.params.sportId);
		if (sport) {
			res.status(200).json(sport);
		} else {
			res.status(404).json({ error: 'Sport not found' });
		}
	} catch (err) {
		next(err);
	}
}

// CREATE Sport
export async function createSport(req, res, next) {
	try {
		if (req !== null) {
			const sport = await createSportData(req);
			if (sport !== null) {
				res.status(201).json(sport);
			} else {
				res.status(404).json({ error: 'Sport could not be created' });
			}
		} else {
			res.status(400).json({ error: 'Sport is null' });
		}
	} catch (err) {
		next(err);
	}
}

// UPDATE Sport
export async function updateSport(req, res, next) {
	try {
		if (req !== null) {
			const sport = await updateSportData(req);
			if (sport !== null) {
				res.status(201).json(sport);
			} else {
				res.status(404).json({ error: 'Sport could not be updated' });
			}
		} else {
			res.status(400).json({ error: 'Sport is null' });
		}
	} catch (err) {
		next(err);
	}
}

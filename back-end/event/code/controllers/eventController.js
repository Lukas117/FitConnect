import {
	createEventData,
	getEventData,
	getEventListData,
	updateEventData,
	updateEventPlayerListData
} from '../adapters/supabaseAdapter.js';

// GET Events from database
export async function getEventList(req, res, next) {
	try {
		const eventList = await getEventListData();
		res.status(200).json(eventList);
	} catch (err) {
		next(err);
	}
}

// GET Event by id
export async function getEventById(req, res, next) {
	try {
		const event = await getEventData(req.params.eventId);
		if (event) {
			res.status(200).json(event);
		} else {
			res.status(404).json({ error: 'Event not found' });
		}
	} catch (err) {
		next(err);
	}
}

// CREATE Event
export async function createEvent(req, res, next) {
	try {
		if (req !== null) {
			const event = await createEventData(req);
			if (event !== null) {
				res.status(201).json(event);
			} else {
				res.status(404).json({ error: 'Event could not be created' });
			}
		} else {
			res.status(400).json({ error: 'Event is null' });
		}
	} catch (err) {
		next(err);
	}
}

// UPDATE Event
export async function updateEvent(req, res, next) {
	try {
		if (req !== null) {
			const event = await updateEventData(req);
			if (event !== null) {
				res.status(201).json(event);
			} else {
				res.status(404).json({ error: 'Event could not be updated' });
			}
		} else {
			res.status(400).json({ error: 'Event is null' });
		}
	} catch (err) {
		next(err);
	}
}

// UPDATE Player list
export async function updateEventPlayerList(req, res, next) {
	try {
		if (req !== null) {
			const event = await updateEventPlayerListData(req);
			if (event !== null) {
				res.status(201).json(event);
			} else {
				res
					.status(404)
					.json({ error: 'Event player list could not be updated' });
			}
		} else {
			res.status(400).json({ error: 'Event is null' });
		}
	} catch (err) {
		next(err);
	}
}

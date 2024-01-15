import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
dotenv.config({ path: '.env' });

// The Supabase client
const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_KEY
);

/**
 * function to create a facility
 * @returns confirmation
 */
export async function createFacilityData(req) {
	const { response, error } = await supabase.from('Facilities').insert({
		latitude: req.body.latitude,
		longitude: req.body.longitude
		// sport_id: req.body.endDate,
	});
	if (error) {
		console.log('Query error', error);
	} else {
		return response;
	}
}

/**
 * function to get all the facilities
 * @returns an array of events
 */
export async function getFacilityListData() {
	const { data, error } = await supabase.from('Facilities').select('*');
	if (error) {
		console.log('Query error', error);
	} else {
		return data;
	}
}

/**
 * function to get facility by id
 * @returns a specific event
 */
export async function getFacilityData(eventId) {
	const { data, error } = await supabase
		.from('Facilities')
		.select('*')
		.eq('facility_id', eventId)
		.single();
	if (error) {
		console.log('Query error', error);
	} else {
		return data;
	}
}

/**
 * function to update a facility
 * @returns confirmation
 */
export async function updateFacilityData(req) {
	const { response, error } = await supabase
		.from('Facilities')
		.update({
			latitude: req.body.latitude,
			longitude: req.body.longitude
			// sport_id: req.body.endDate,
		})
		.eq('facility_id', req.params.facilityId);
	if (error) {
		console.log('Query error', error);
	} else {
		return response;
	}
}

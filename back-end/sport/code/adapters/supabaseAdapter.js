import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
dotenv.config({ path: '.env' });

// The Supabase client
const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_KEY
);

/**
 * function to create a sport
 * @returns confirmation
 */
export async function createSportData(req) {
	const { response, error } = await supabase.from('Sports').insert({
		sport_name: req.body.sportName
	});
	if (error) {
		console.log('Query error', error);
	} else {
		return response;
	}
}

/**
 * function to get all the sports
 * @returns an array of sports
 */
export async function getSportListData() {
	const { data, error } = await supabase.from('Sports').select('*');
	if (error) {
		console.log('Query error', error);
	} else {
		return data;
	}
}

/**
 * function to get sport by id
 * @returns a specific sport
 */
export async function getSportData(sportId) {
	const { data, error } = await supabase
		.from('Sports')
		.select('*')
		.eq('sport_id', sportId)
		.single();
	if (error) {
		console.log('Query error', error);
	} else {
		return data;
	}
}

/**
 * function to update a sport
 * @returns confirmation
 */
export async function updateSportData(req) {
	const { response, error } = await supabase
		.from('Sports')
		.update({
			sport_name: req.body.sportName
		})
		.eq('sport_id', req.params.sportId);
	if (error) {
		console.log('Query error', error);
	} else {
		return response;
	}
}

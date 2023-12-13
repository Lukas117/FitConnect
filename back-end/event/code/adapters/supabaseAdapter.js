import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
dotenv.config({ path: '.env' });

// The Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

/**
 * function to create an event
 * @returns confirmation
 */
export async function createEventData(req) {
  const { response, error } = await supabase.from('Events')
      .insert({
        event_name: req.body.eventName,
        start_date: req.body.startDate,
        end_date: req.body.endDate,
        event_state: req.body.eventState,
        maximum_players: req.body.maximumPlayers,
        host_id: req.body.hostId, //TODO: current user
        player_list: req.body.playerList, // only host during creation
        facility_id: req.body.facilityId
      });
  if (error) console.log('Query error', error);
  else return response;
}

/**
 * function to get all the events
 * @returns an array of events
 */
export async function getEventListData() {
  const { data, error } = await supabase.from('Events').select('*');
  if (error) console.log('Query error', error);
  else return data;
}

/**
 * function to get event by id
 * @returns a specific event
 */
export async function getEventData(eventId) {
  const { data, error } = await supabase.from('Events').select('*').eq('event_id', eventId).single();
  if (error) console.log('Query error', error);
  else return data;
}

/**
 * function to update an event
 * @returns confirmation
 */
export async function updateEventData(req) {
    const { response, error } = await supabase.from('Events')
        .update({
            event_name: req.body.eventName,
            start_date: req.body.startDate,
            end_date: req.body.endDate,
            event_state: req.body.eventState,
            maximum_players: req.body.maximumPlayers,
            //host_id: req.body.hostId, // cannot change host?
            player_list: req.body.playerList,
            facility_id: req.body.facilityId
        })
        .eq('event_id', req.params.eventId);
    if (error) console.log('Query error', error);
    else return response;
}
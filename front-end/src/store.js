import { writable } from 'svelte/store';

export const showJoinModal = writable(false);

export const showHostModal = writable(false);

export const refreshEvents = writable(false);

export const userLocation = writable({
	latitude: null,
	longitude: null,
	accuracy: null,
	loaded: false
});

export const size = writable({
	s2: 0
});

export const icon = writable({
	svg: ``
});

export const mapCenter = writable(
	{
		lat: 0,
		lng: 0,
	}
);

export const facilities = writable([
	{
		facility_id: null,
		lat: null,
		lng: null
	}
]);

export const event = writable({
	eventName: 'Basketball',
	startDate: '2023-11-20T09:00:00Z',
	eventState: 1,
	maximumPlayers: 10,
	hostId: 1,
	playerList: [1, 2],
	facilityId: 1
	// lat: 51.4555,
	// lng: 3.56655,
	// title: 'Marker 1',
	// content: 'This is marker 1'
});

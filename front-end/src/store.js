import { writable } from 'svelte/store';

export const showJoinModal = writable(false);

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

export const markerList = writable([
	{
		id: 1,
		lat: 51.4555,
		lng: 3.56655,
		title: 'Marker 1',
		content: 'This is marker 1'
	},
	{
		id: 2,
		lat: 51.4565,
		lng: 3.56665,
		title: 'Marker 2',
		content: 'This is marker 2'
	}
]);

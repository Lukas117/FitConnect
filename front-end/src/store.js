import { writable } from "svelte/store";


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
	svg: ``,
});
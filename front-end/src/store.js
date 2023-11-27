import { writable } from "svelte/store";

export const userLocation = writable({
	latitude: null,
	longitude: null,
	accuracy: null,
	loaded: false
});
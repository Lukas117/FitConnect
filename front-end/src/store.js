import { writable } from "svelte/store";

export const userLocation = writable({});

// export const icon =

export const markerList = writable([
    { id: 1, lat: 51.4555, lng: 3.56655, title: "Marker 1", content: "This is marker 1" },
    { id: 2, lat: 51.4565, lng: 3.56665, title: "Marker 2", content: "This is marker 2" }
]);
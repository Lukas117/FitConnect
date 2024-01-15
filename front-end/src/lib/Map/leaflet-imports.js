export async function importLeaflet() {
	const L = await import('leaflet');
	await import('leaflet.locatecontrol');
	await import('leaflet.locatecontrol/dist/L.Control.Locate.min.css');
	return L;
}

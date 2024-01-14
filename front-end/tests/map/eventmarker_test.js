import { expect, test } from '@playwright/test';

test.use({ video: 'on' });

// test('expected path from event marker to join modal', async ({ page }) => {
// 	// give geolocation to app
// 	await page.context().grantPermissions(['geolocation']);
// 	await page.context().setGeolocation({
// 		latitude: 51.4646,
// 		longitude: 3.5687
// 	});
// 	// fake events get request
// 	await page.route('**/events', (route) => {
// 		return route.fulfill({
// 			status: 200,
// 			contentType: 'application/json',
// 			body: JSON.stringify([
// 				{
// 					event_id: 1,
// 					event_name: 'Test Event',
// 					facility_id: 1,
// 					event_state: 1,
// 					maximum_players: 10,
// 					host_id: 1
// 				}
// 			])
// 		});
// 	});
// 	// fake facilities get request
// 	await page.route('**/facilities', (route) => {
// 		return route.fulfill({
// 			status: 200,
// 			contentType: 'application/json',
// 			body: JSON.stringify([
// 				{
// 					facility_id: 1,
// 					latitude: 51.4646,
// 					longitude: 3.5687
// 				}
// 			])
// 		});
// 	});

// 	// Wait for the page to load
// 	await page.goto('/map');
// 	await page.waitForLoadState('networkidle');

// 	// Check if the map container is visible
// 	const mapContainer = await page.locator('#mapContainer');
// 	await expect(mapContainer).toBeVisible();

// 	// Wait for the event marker to be displayed
// 	const eventMarker = await page.locator('img.leaflet-marker-icon');
// 	await page.screenshot({ path: 'screenshot.png' });
// 	await expect(eventMarker).toBeVisible();

// 	// click on the marker
// 	await eventMarker.click();

// 	// find the join match button
// 	const joinButton = await page.locator('#joinButton');
// 	await expect(joinButton).toBeVisible();

// 	// click the join match button
// 	await joinButton.click();

// 	// find the join modal
// 	const joinModal = await page.locator('#joinModal');
// 	await expect(joinModal).toBeVisible();

// 	// take ss of page
// 	await page.screenshot({ path: 'test3.png' });
// });




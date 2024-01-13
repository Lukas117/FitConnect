import { expect, test } from '@playwright/test';

test.use({ video: 'on' });

test('map and UI renders without errors', async ({ page }) => {
	// give geolocation to app
	await page.context().grantPermissions(['geolocation']);
	await page.context().setGeolocation({
		latitude: 51.4646,
		longitude: 3.5687
	});

	// Wait for the page to load
	await page.goto('/map');
	await page.waitForLoadState('load');

	// Check if the map container is visible
	const mapContainer = await page.locator('#mapContainer');
	await expect(mapContainer).toBeVisible();

	// await page.screenshot({ path: 'screenshot.png' });
	// Check if the navigation button is visible

	const navigationButton = await page.locator('#navigation');
	await expect(navigationButton).toBeVisible();

	// Check if the host button is visible
	const hostButton = await page.locator('#host');
	await expect(hostButton).toBeVisible();

	// check if navigation bar is visible
	const navigationBar = await page.locator('#navigationBar');
	await expect(navigationBar).toBeVisible();

	// check if the user marker is visible
	const userMarker = await page.locator('#userIcon');
	await expect(userMarker).toBeVisible();
});

// test('expected path from event marker to join modal', async ({ page }) => {
// 	// give geolocation to app
// 	await page.context().grantPermissions(['geolocation']);
// 	await page.context().setGeolocation({
// 		latitude: 51.4646,
// 		longitude: 3.5687
// 	});
// 	// fake events get request
// 	await page.route('**/api/events', (route) => {
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

test('expected path from map to host modal', async ({ page }) => {
	// give geolocation to app
	await page.context().grantPermissions(['geolocation']);
	await page.context().setGeolocation({
		latitude: 51.4646,
		longitude: 3.5687
	});

	// Wait for the page to load
	await page.goto('/map');
	await page.waitForLoadState('load');

	// find the host button
	const hostButton = await page.locator('#host');
	await expect(hostButton).toBeVisible();

	//click the host button

	await hostButton.click();

	//find the host modal
	const hostModal = await page.locator('#hostModal');
	await expect(hostModal).toBeVisible();

	// take ss of page
	await page.screenshot({ path: 'test4.png' });
});

test('Map loading error + resolving', async ({ page }) => {
	// Wait for the page to load
	await page.goto('/map');
	await page.waitForLoadState('load');

	// find the host button
	const loading = await page.locator('#loading');
	await expect(loading).toBeVisible();

	const loadError = await page.locator('#loadError');
	await expect(loadError).toBeVisible({ timeout: 10000 });

	await page.context().grantPermissions(['geolocation']);
	await page.context().setGeolocation({
		latitude: 51.4646,
		longitude: 3.5687
	});


	const refresh = await page.locator('#refresh');

	await refresh.click();

	// check if the user marker is visible
	const userMarker = await page.locator('#userIcon');
	await expect(userMarker).toBeVisible({ timeout: 50000 });
});

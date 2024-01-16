import { expect, test } from '@playwright/test';

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

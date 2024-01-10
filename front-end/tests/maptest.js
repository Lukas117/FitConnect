import { expect, test } from '@playwright/test';

test('map and UI renders without errors', async ({ page }) => {
	// Wait for the page to load
	await page.goto('/map');
	await page.waitForLoadState('load');

	// Check if the map container is visible
	const mapContainer = await page.locator('#mapContainer');
	await expect(mapContainer).toBeVisible();

	// Check if the navigation button is visible
	await page.waitForSelector('#navigation');
	const navigationButton = await page.locator('#navigation');
	// Wait for 10 seconds
	await expect(navigationButton).toBeVisible({ timeout: 10000 });

	// Check if the host button is visible
	const hostButton = await page.locator('#host');
	await page.waitForSelector('#host', {
		state: 'visible',
		timeout: 10000
	});
	await expect(hostButton).toBeVisible();
});

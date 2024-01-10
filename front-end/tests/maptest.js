import { expect, test } from '@playwright/test';

test('map and UI renders without errors', async ({ page }) => {
	// Wait for the page to load
	await page.goto('/map');
	await page.waitForLoadState('load');

	// Check if the map container is visible
	const mapContainer = await page.locator('#mapContainer');
	await expect(mapContainer).toBeVisible();

	// Check if the navigation button is visible
	await page.waitForSelector('#navigationButton', {
		state: 'visible',
		timeout: 5000
	});
	const navigationButton = await page.locator('#navigationButton');
	await expect(navigationButton).toBeVisible();

	// Check if the host button is visible
	await page.waitForSelector('#hostButton', { 
		state: 'visible', 
		timeout: 5000 
	});
	const hostButton = await page.locator('#hostButton');
	await expect(hostButton).toBeVisible();
});

import { expect, test } from '@playwright/test';

test('map and UI renders without errors', async ({ page }) => {
	await page.goto('/map');

	const mapContainer = await page.locator('#mapContainer');

	// Check if the map container is visible
	await expect(mapContainer).toBeVisible();

	// Check if the navigation button is visible
	await page.waitForSelector('#navigationButton');
	const navigationButton = await page.locator('#navigationButton');
	await expect(navigationButton).toBeVisible();

	// Check if the host button is visible
	await page.waitForSelector('#hostButton');
	const hostButton = await page.locator('#hostButton');
	await expect(hostButton).toBeVisible();
});

// map.test.js
import { expect, test } from '@playwright/test';

test('map component renders without errors', async ({ page }) => {
	await page.goto('/map');

	const mapContainer = await page.$('#mapContainer');

	// Check if the map container is visible
	await expect(mapContainer).toBeVisible();
});

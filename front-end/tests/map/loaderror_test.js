import { expect, test } from '@playwright/test';

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

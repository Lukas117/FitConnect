import { expect, test } from '@playwright/test';

test('cant go to map without loggin in', async ({ page }) => {

	// give geolocation to app
	await page.context().grantPermissions(['geolocation']);
	await page.context().setGeolocation({
		latitude: 51.4646,
		longitude: 3.5687
	});

	// Wait for the page to load
	await page.goto('/map');
	await page.waitForLoadState('load');
	
	const email = await page.locator('#email');

	await expect(email).toBeVisible();
});
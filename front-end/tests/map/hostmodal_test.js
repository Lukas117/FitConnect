import { expect, test } from '@playwright/test';

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
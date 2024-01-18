// import { expect, test } from '@playwright/test';

// test.use({ video: 'on' });

// test('Map loading error + resolving', async ({ page }) => {
// 	// Listen for console events
// 	page.on('console', (msg) => {
// 		for (let i = 0; i < msg.args().length; ++i)
// 			console.log(`${i}: ${msg.args()[i]}`);
// 	});
// 	await page.route('**/*', (route) => {
// 		console.log('Request URL:', route.request().url());
// 		route.continue();
// 	});

// 	// Wait for the page to load
// 	await page.goto('/map');
// 	await page.waitForLoadState('load');

// 	// find the host button
// 	const loading = await page.locator('#loading');
// 	await expect(loading).toBeVisible();

// 	await page.fill('input[type="email"]', 'admin@gmail.com');

// 	// Fill the password field
// 	await page.fill('input[type="password"]', 'adminadmin1!');

// 	// Click the submit button
// 	await page.click('button[type="submit"]');

// 	const loadError = await page.locator('#loadError');
// 	await expect(loadError).toBeVisible({ timeout: 10000 });

// 	await page.context().grantPermissions(['geolocation']);
// 	await page.context().setGeolocation({
// 		latitude: 51.4646,
// 		longitude: 3.5687
// 	});

// 	const refresh = await page.locator('#refresh');

// 	await refresh.click();

// 	// check if the user marker is visible
// 	const userMarker = await page.locator('#userIcon');
// 	await expect(userMarker).toBeVisible({ timeout: 50000 });
// });

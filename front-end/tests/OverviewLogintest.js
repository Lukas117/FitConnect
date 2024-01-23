import { expect, test } from '@playwright/test';

test('cant go to overview without loggin in', async ({ page }) => {

	// Wait for the page to load
	await page.goto('/overview');
	await page.waitForLoadState('load');
	
	const email = await page.locator('#email');

	await expect(email).toBeVisible();
});
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'tests',
	/* eslint-disable security/detect-unsafe-regex */
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	/* eslint-enable security/detect-unsafe-regex */
	outputDir: 'my-test-results'
};

export default config;

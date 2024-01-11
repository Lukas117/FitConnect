module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:svelte/recommended',
		'plugin:svelte/prettier',
		'prettier'
	],
	parser: '@babel/eslint-parser',
	// Add an `overrides` section to add a parser configuration for svelte.
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser'
		}
	],
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	plugins: ['import', 'security', 'svelte'],

	rules: {
		//Indentation and Formatting
		indent: ['error', 'tab'],

		'max-len': ['error', { code: 80 }],

		// svelte
		'svelte/no-dupe-style-properties': 'error',
		'svelte/no-dupe-else-if-blocks': 'error',
		'svelte/no-store-async': 'error',
		'svelte/require-each-key': 'error',
		'svelte/no-unused-svelte-ignore': 'error',
		// 'svelte/no-unused-class-name': 'error',
		'svelte/require-stores-init': 'error',
		'svelte/valid-each-key': 'error',

		// 4. JavaScript
		'no-var': 'error',
		'consistent-return': 'error',
		'no-unused-vars': 'error',

		// Some other rules
		'no-console': 'warn',
		'consistent-this': ['error', 'self'],

		// Security rules
		'security/detect-non-literal-regexp': 'error',
		'security/detect-unsafe-regex': 'error',
		'security/detect-buffer-noassert': 'error',
		'svelte/no-target-blank': 'error',
		'svelte/no-at-html-tags': 'error'
	}
};

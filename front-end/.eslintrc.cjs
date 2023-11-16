module.exports = {
	root: true,
	extends: ['eslint:recommended', 'plugin:svelte/recommended', 'prettier'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	plugins: ['import', 'security'],
	rules: {
		// 1. Indentation and Formatting
		indent: ['error', 2], // Two spaces for indentation
		'max-len': ['error', { code: 80 }], // Limit lines to 80 characters

		// 2. Components
		'svelte3/component-name': ['error', { 'svelte3/ignore-styles': true }], // Use PascalCase for Svelte component names

		// 3. Template Syntax
		'svelte3/template-props-no-multi-spaces': 'error', // Avoid multiple spaces in template props
		'svelte3/no-template-shadow': 'error', // Avoid shadowing in templates
		'svelte3/no-multiple-conditions': 'error', // Limit template conditionals to avoid complexity

		// 4. JavaScript
		'no-var': 'error', // Use let or const, avoid var

		// 5. Event Handling
		'svelte3/event-handler-style': 'error', // Use Svelte's event handling syntax

		// 6. Conditional Rendering
		'svelte3/condition-render-groups': 'error', // Group conditionals for clarity

		// 7. Comments

		// Additional Svelte rules
		'svelte3/no-unused-styles': 'error', // Ensure all styles defined are used
		'svelte3/no-unused-components': 'error', // Ensure all components defined are used

		// Additional JavaScript rules
		'consistent-return': 'error', // Enforce consistent return statements
		'no-unused-vars': 'error', // Avoid unused variables

		// Best Practices
		'no-console': 'error', // Avoid console statements in production code
		'consistent-this': ['error', 'self'], // Ensure consistent usage of 'this'

		// Security rules
		'security/detect-non-literal-regexp': 'error', // Detect non-literal regular expressions
		'security/detect-unsafe-regex': 'error', // Detect potentially unsafe regular expressions
		'security/detect-buffer-noassert': 'error' // Discourage using buffer.noAssert
	}
};

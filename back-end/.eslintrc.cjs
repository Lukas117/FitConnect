module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:prettier/recommended',
		'plugin:node/recommended'
	],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2021
	},
	rules: {
		strict: ['error', 'global'],
		'array-bracket-spacing': ['error', 'never'],
		'object-curly-spacing': ['error', 'always'],
		camelcase: ['error', { properties: 'never' }],
		indent: ['error', 2],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'arrow-spacing': ['error', { before: true, after: true }],
		eqeqeq: ['error', 'always'],
		radix: ['error', 'always'],
		curly: ['error', 'all'],
		'default-case': 'error',
		'eol-last': ['error', 'always']
	}
};

// anaged-by-autotool

/** @type {import('eslint').Linter.Config} */
module.exports = {
	root: true,
	extends: ['@alexaegis/eslint-config-core'],
	rules: {
		'prefer-const': ['error', { destructuring: 'all' }],
		'unicorn/no-array-for-each': 'off', // Gives false errors for any functions called forEach
		'@typescript-eslint/no-unnecessary-condition': 'off',
	},
};

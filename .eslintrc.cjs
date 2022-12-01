module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		project: ['tsconfig.json'],
		extraFileExtensions: ['.json'],
		tsconfigRootDir: __dirname,
	},
	env: {
		browser: true,
		node: true,
	},
	ignorePatterns: ['dist', 'node_modules', 'typedocs', 'coverage', '!.vscode', '!.github'],
	plugins: ['@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	rules: {
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				varsIgnorePattern: '^_',
				argsIgnorePattern: '^_',
			},
		],
		'@typescript-eslint/explicit-member-accessibility': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-parameter-properties': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
	},
	overrides: [
		{
			files: ['*.tsx'],
			rules: {
				'@typescript-eslint/no-unused-vars': 'off',
			},
		},
	],
};

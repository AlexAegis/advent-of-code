module.exports = {
	extends: ['../../../.eslintrc.cjs'],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		project: ['tsconfig.json'],
		tsconfigRootDir: __dirname,
	},
};

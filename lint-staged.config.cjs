// For the glob features check out https://github.com/micromatch/micromatch
module.exports = {
	'*.(ts|tsx|cts|mts)': ['sh -c tsc --noEmit'],
	'*.(ts|tsx|cts|mts|js|jsx|cjs|mjs)': ['eslint --max-warnings=0', 'prettier --check'],
	'*.svelte': ['svelte-check', 'prettier --check'],
	'*.css': ['stylelint', 'prettier --check'],
	'*.scss': ['stylelint --customSyntax=postcss-scss', 'prettier --check'],
	'(*.json|.eslintrc|.prettierrc|.stylelintrc|.markdownlintrc)': [
		'eslint --max-warnings=0',
		'prettier --check',
	],
	'*.md': ["markdownlint --ignore 'CHANGELOG.md' --ignore-path '.gitignore'", 'prettier --check'],
	'*.(yml|yaml)': ['prettier --check'],
	'*.rs': (/** @type {string[]} */ fs) => {
		return [
			`cargo fmt --all --manifest-path solutions/rust/Cargo.toml -- --check ${fs.join(' ')}`,
			'cargo clippy --manifest-path solutions/rust/Cargo.toml -- ',
		];
	},
	'*.py': [
		'sh -c "cd solutions/python && pipenv -v run lint"',
		'sh -c "cd solutions/python && pipenv -v run test"',
	],
};
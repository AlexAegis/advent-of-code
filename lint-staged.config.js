// For the glob features check out https://github.com/micromatch/micromatch
module.exports = {
	'*.ts': ['eslint --max-warnings=0', 'tslint --project tsconfig.json', 'prettier --check'],
	'*.js': ['eslint --max-warnings=0', 'prettier --check'],
	'*.css': ['stylelint', 'prettier --list-different'],
	'*.scss': ['stylelint --syntax=scss', 'prettier --check'],
	'(*.json|.eslintrc|.prettierrc|.stylelintrc|.markdownlintrc)': [('eslint', 'prettier --check')],
	'*.md': ["markdownlint --ignore 'CHANGELOG.md' --ignore-path '.gitignore'", 'prettier --check'],
	'*.(yml|yaml)': ['prettier --check'],
	'*.rs': ['cargo fmt'],
};

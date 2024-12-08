import { DOUBLE_NEWLINE } from '@alexaegis/advent-of-code-lib';

export interface Rule {
	before: number;
	after: number;
}

export interface Update {
	pages: number[];
}

export interface Parsed {
	rules: Rule[];
	updates: Update[];
}

export const createUpdateComparator = (rules: Rule[]) => (a: number, b: number) => {
	const mustBeBefore = rules.filter((rule) => rule.before === a).some((rule) => rule.after === b);
	const mustBeAfter = rules.filter((rule) => rule.after === a).some((rule) => rule.before === b);

	if (mustBeBefore && mustBeAfter) {
		return 0;
	} else if (mustBeBefore) {
		return -1;
	} else {
		return 1;
	}
};

export const parse = (input: string): Parsed => {
	let [rulesText, pagesText] = input.split(DOUBLE_NEWLINE);

	if (rulesText === undefined || pagesText === undefined) {
		throw new Error('Invalid input');
	}

	const rules = rulesText.lines().map((rawRule) => {
		const [before, after] = rawRule.splitToInt({
			delimiter: /\|/,
		});
		if (before === undefined || after === undefined) {
			throw new Error('Invalid number');
		}
		return { before, after };
	});
	const updates = pagesText
		.lines()
		.map((rawRule) => ({ pages: rawRule.splitToInt({ delimiter: /,/ }) }) as Update);

	return { rules, updates };
};

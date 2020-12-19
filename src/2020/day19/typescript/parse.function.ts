export const parse = (
	input: string
): { ruleBook: Map<number, number[][] | string>; words: string[] } => {
	const lines = input.split(/\r?\n/);

	const ruleBook = new Map<number, number[][] | string>();
	const words: string[] = [];
	let parseCases = false;
	for (const line of lines) {
		if (line === '') {
			parseCases = true;
			continue;
		}

		if (!parseCases) {
			const [index, rulesUnsplit] = line.split(': ');
			const rules = rulesUnsplit.split(' | ');
			if (rules[0].startsWith('"') && rules[0].endsWith('"')) {
				ruleBook.set(parseInt(index, 10), rules[0][1]);
			} else {
				ruleBook.set(
					parseInt(index, 10),
					rules.map((c) => c.split(' ').map((n) => parseInt(n, 10)))
				);
			}
		} else {
			words.push(line);
		}
	}
	return { ruleBook, words };
};

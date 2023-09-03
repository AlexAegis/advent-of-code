export const parse = (
	input: string,
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

		if (parseCases) {
			words.push(line);
		} else {
			const [index, rulesUnsplit] = line.splitIntoStringPair(': ');
			const rules = rulesUnsplit.split(' | ');
			if (rules[0]?.startsWith('"') && rules[0].endsWith('"')) {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				ruleBook.set(Number.parseInt(index, 10), rules[0][1]!);
			} else {
				ruleBook.set(
					Number.parseInt(index, 10),
					rules.map((c) => c.split(' ').map((n) => Number.parseInt(n, 10))),
				);
			}
		}
	}
	return { ruleBook, words };
};

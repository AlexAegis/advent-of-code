export const parse = (input: string): { polymer: string; rules: Map<string, string> } => {
	const [polymer, rulesStr] = input.split(/\n\n/);
	const rules = rulesStr.lines().reduce((acc, line) => {
		const [left, right] = line.split(/ -> /);
		return acc.update(left, () => right);
	}, new Map<string, string>());

	return { polymer, rules };
};

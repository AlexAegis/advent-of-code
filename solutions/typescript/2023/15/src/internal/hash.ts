export const hash = (s: string): number => {
	let value = 0;
	for (let i = 0; i < s.length; i++) {
		value += s.codePointAt(i) ?? 0;
		value *= 17;
		value %= 256;
	}
	return value;
};

import { split } from '@lib';

export const parse = (input: string): Record<1 | 2, number[]> => {
	const lines = split(input);
	let nowParsing = 0;
	const cards: Record<1 | 2, number[]> = { '1': [], '2': [] };
	for (const line of lines) {
		if (line.endsWith(':')) {
			nowParsing++;
			continue;
		}
		cards[nowParsing as 1 | 2].push(parseInt(line, 10));
	}
	return cards;
};

export interface Card {
	id: number;
	winningNumbers: number[];
	pulledNumbers: number[];
	rewardCards: Card[];
	count: number;
}

export const parse = (line: string): Card => {
	const [rawCardId, numbers] = line.splitIntoStringPair(': ');
	const [, idString] = rawCardId.splitIntoStringPair(/ +/);
	const [rawWinningNumbers, rawPulledNumbers] = numbers.splitIntoStringPair(' | ');
	const winningNumbers = rawWinningNumbers
		.split(/ +/g)
		.filter((l) => !!l)
		.map((n) => Number.parseInt(n, 10));
	const pulledNumbers = rawPulledNumbers
		.split(/ +/g)
		.filter((l) => !!l)
		.map((n) => Number.parseInt(n, 10));
	return {
		winningNumbers,
		id: Number.parseInt(idString, 10),
		pulledNumbers,
		rewardCards: [],
		count: 1,
	};
};

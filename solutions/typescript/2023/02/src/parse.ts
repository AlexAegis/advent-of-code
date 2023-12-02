export interface Bag {
	red: number;
	green: number;
	blue: number;
}

export interface Game {
	id: number;
	bags: Bag[];
}

const parseBag = (bag: string): Bag => {
	const [c1, c2, c3] = bag.split(', ');
	const [c1v, c1n] = (c1?.trim()?.split(' ') ?? []) as [string, keyof Bag | undefined];
	const [c2v, c2n] = (c2?.trim()?.split(' ') ?? []) as [string, keyof Bag | undefined];
	const [c3v, c3n] = (c3?.trim()?.split(' ') ?? []) as [string, keyof Bag | undefined];

	const bagParsed: Bag = {
		red: 0,
		green: 0,
		blue: 0,
	};

	if (c1n !== undefined) {
		bagParsed[c1n] = c1v.toInt();
	}

	if (c2n !== undefined) {
		bagParsed[c2n] = c2v.toInt();
	}

	if (c3n !== undefined) {
		bagParsed[c3n] = c3v.toInt();
	}

	return bagParsed;
};

export const parse = (line: string): Game => {
	const [rawGameId, data] = line.splitIntoStringPair(': ');
	const [, gameId] = rawGameId.splitIntoStringPair(' ');

	return {
		id: gameId.toInt(),
		bags: data.split('; ').map(parseBag),
	} as Game;
};

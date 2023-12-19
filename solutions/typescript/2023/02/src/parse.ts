import { isNotNullish } from '@alexaegis/advent-of-code-lib';

export interface Bag {
	red: number;
	green: number;
	blue: number;
}

const isCubeColor = (s: string | undefined): s is keyof Bag =>
	s === 'red' || s === 'green' || s === 'blue';

export interface Game {
	id: number;
	bags: Bag[];
}

const parseBag = (bag: string): Bag => {
	const [c1, c2, c3] = bag.split(', ');
	const [c1v, c1n] = c1?.trim()?.split(' ') ?? [];
	const [c2v, c2n] = c2?.trim()?.split(' ') ?? [];
	const [c3v, c3n] = c3?.trim()?.split(' ') ?? [];

	const bagParsed: Bag = {
		red: 0,
		green: 0,
		blue: 0,
	};

	const c1vi = c1v?.toInt();
	if (isCubeColor(c1n) && isNotNullish(c1vi)) {
		bagParsed[c1n] = c1vi;
	}

	const c2vi = c2v?.toInt();
	if (isCubeColor(c2n) && isNotNullish(c2vi)) {
		bagParsed[c2n] = c2vi;
	}

	const c3vi = c3v?.toInt();
	if (isCubeColor(c3n) && isNotNullish(c3vi)) {
		bagParsed[c3n] = c3vi;
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

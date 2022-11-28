import { bench, read } from '@alexaegis/advent-of-code-lib';
import { sum } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.function.js';

export type SpaceCardDecks = Record<1 | 2, number[]>;

export const scoreDecks = (decks: SpaceCardDecks): number => {
	const winnerDeck = decks[1].length === 0 ? decks[2] : decks[1];
	return winnerDeck.map((a, i) => a * (winnerDeck.length - i)).reduce(sum);
};

export const runner = (input: string): number => {
	const decks = parse(input);
	for (;;) {
		const p1card = decks[1].shift()!;
		const p2card = decks[2].shift()!;

		if (p1card > p2card) {
			decks[1].push(p1card);
			decks[1].push(p2card);
		} else if (p2card > p1card) {
			decks[2].push(p2card);
			decks[2].push(p1card);
		}
		if (decks[1].length === 0 || decks[2].length === 0) {
			return scoreDecks(decks);
		}
	}
};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 31455 ~0.06ms
}

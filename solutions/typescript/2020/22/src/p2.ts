import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { scoreDecks, SpaceCardDecks } from './p1.js';
import { parse } from './parse.function.js';

const playGame = (decks: SpaceCardDecks, history = new Set<string>()): number => {
	for (;;) {
		const p1card = decks[1].shift()!;
		const p2card = decks[2].shift()!;

		const deckState = JSON.stringify(decks);
		if (history.has(deckState)) {
			return 1;
		} else {
			history.add(deckState);
		}

		let winner = p1card > p2card ? 1 : p2card > p1card ? 2 : undefined;
		if (decks[1].length >= p1card && decks[2].length >= p2card) {
			winner = playGame({
				'1': decks[1].slice(0, p1card),
				'2': decks[2].slice(0, p2card),
			});
		}

		if (winner === 1) {
			decks[1].push(p1card);
			decks[1].push(p2card);
		} else if (winner === 2) {
			decks[2].push(p2card);
			decks[2].push(p1card);
		}

		if (decks[1].length === 0) {
			return 2;
		} else if (decks[2].length === 0) {
			return 1;
		}
	}
};

export const p2 = (input: string): number => {
	const decks = parse(input);
	playGame(decks);
	return scoreDecks(decks);
};

await task(p2, packageJson.aoc); // 32528 ~1495.10ms

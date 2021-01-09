import { bench, read } from '@lib';
import { day, year } from '.';
import { parse } from './parse.function';
import { scoreDecks, SpaceCardDecks } from './part_one';

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
			winner = playGame({ '1': decks[1].slice(0, p1card), '2': decks[2].slice(0, p2card) });
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

export const runner = (input: string): number => {
	const decks = parse(input);
	playGame(decks);
	return scoreDecks(decks);
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 32528 ~1495.10ms
}

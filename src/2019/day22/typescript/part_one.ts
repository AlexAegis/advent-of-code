import { bench, read } from '@lib';
import { rotateArrayTimes } from '@lib/functions';
import { day, year } from '.';
import { parse } from './parse';

export const runner = (deckSize = 10007) => (input: string): number => {
	const lines = parse(input);
	let deck = [...Array(deckSize).keys()];
	for (const line of lines) {
		const n = parseInt(line.split(' ').pop() as string, 10);
		if (line.startsWith('deal into new stack')) {
			deck = deck.reverse();
		} else if (line.startsWith('cut')) {
			rotateArrayTimes(deck, n);
		} else if (line.startsWith('deal with increment')) {
			const nextDeck = [];
			let i = 0;
			for (const c of deck) {
				nextDeck[i % deck.length] = c;
				i += n;
			}
			deck = nextDeck;
		}
	}
	return deck.indexOf(2019);
};

if (require.main === module) {
	(async () =>
		console.log(`Result: ${await bench(read(year, day, 'example.4.txt'), runner())}`))(); // 6831 ~164ms
}

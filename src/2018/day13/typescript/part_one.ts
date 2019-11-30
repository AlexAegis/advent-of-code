import { bench, read } from '@lib';
import { day, year } from '.';
import { cartSorter } from './functions/cart-sorter.function';
import { interpreter } from './interpreter.function';
import { Coord, Mine } from './model';

export const runner = (input: string): string | undefined => {
	const mine: Mine = interpreter(input);
	let crash: Coord | undefined;
	while (crash === undefined) {
		mine.carts = mine.carts.sort(cartSorter);
		for (const cart of mine.carts) {
			crash = crash || cart.step(mine);
		}
	}
	return crash ? crash.toString() : undefined;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 28,107 ~17ms
}

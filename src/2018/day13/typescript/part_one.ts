import { Coord } from './model/coord.class';
import { Mine } from './model/mine.class';
import { interpreter } from './interpreter.function';
import { bench, reader } from '@root';
import { year, day } from '.';
import { cartSorter } from './functions/cart-sorter.function';

export const runner = (input: string): string | undefined => {
	const mine: Mine = interpreter(input);
	let crash: Coord | undefined = undefined;
	while (crash === undefined) {
		mine.carts = mine.carts.sort(cartSorter);
		for (const cart of mine.carts) {
			crash = crash || cart.step(mine);
		}
	}
	return crash ? crash.toString() : undefined;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(reader(year, day), runner)}`))(); // 28,107 ~340ms
}

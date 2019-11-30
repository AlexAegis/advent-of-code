import { bench, read } from '@root/lib/typescript';
import { day, year } from '.';
import { cartSorter } from './functions/cart-sorter.function';
import { interpreter } from './interpreter.function';
import { Mine } from './model/mine.class';

export const runner = (input: string): string | undefined => {
	const mine: Mine = interpreter(input);
	while (mine.carts.length > 1) {
		mine.carts = mine.carts.sort(cartSorter);
		for (const cart of mine.carts) {
			cart.step(mine);
		}
	}
	return mine.carts.length > 0 ? mine.carts[0].position.toString() : undefined;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 36,123 ~51ms
}

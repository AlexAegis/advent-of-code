import { Mine } from './model/mine.class';
import { cartSorter } from './functions/cart-sorter.function';
import { interpreter } from './interpreter.function';
import { bench, reader } from '@root';
import { year, day } from '.';

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
	(async () => console.log(`Result: ${await bench(reader(year, day), runner)}`))(); // 36,123 ~56ms
}

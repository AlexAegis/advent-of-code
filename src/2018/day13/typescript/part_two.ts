import { bench, read } from '@lib';
import { day, year } from '.';
import { interpreter } from './interpreter.function';
import { Cart, Mine } from './model';

export const runner = (input: string): string | undefined => {
	const mine: Mine = interpreter(input);
	while (mine.carts.length > 1) {
		mine.carts = mine.carts.sort(Cart.compare);
		for (const cart of mine.carts) {
			cart.step(mine);
		}
	}
	return mine.carts.length > 0 ? mine.carts[0].position.toString() : undefined;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 36,123 ~37.45ms
}

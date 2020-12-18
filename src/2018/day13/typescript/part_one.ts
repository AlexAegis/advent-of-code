import { bench, read } from '@lib';
import { Vec2 } from '@lib/model';
import { day, year } from '.';
import { interpreter } from './interpreter.function';
import { Cart, Mine } from './model';

export const runner = (input: string): string | undefined => {
	const mine: Mine = interpreter(input);
	let crash: Vec2 | undefined;
	while (crash === undefined) {
		mine.carts = mine.carts.sort(Cart.compare);
		for (const cart of mine.carts) {
			crash = crash || cart.step(mine);
		}
	}
	return crash ? crash.toString() : undefined;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 28,107 ~8.52ms
}

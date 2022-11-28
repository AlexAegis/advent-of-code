import { bench, read } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { interpreter } from './interpreter.function.js';
import { Cart, Mine } from './model/index.js';

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

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 36,123 ~37.45ms
}

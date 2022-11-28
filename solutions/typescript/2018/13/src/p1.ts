import { bench, read } from '@alexaegis/advent-of-code-lib';
import type { Vec2 } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import { interpreter } from './interpreter.function.js';
import { Cart, Mine } from './model/index.js';

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

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 28,107 ~8.52ms
}

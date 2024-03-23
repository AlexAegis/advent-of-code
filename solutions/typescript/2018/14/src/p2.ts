/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

function shift(window: string, last: number, length: number): string {
	return window.length >= length
		? window.slice(window.length - length + 1, window.length) + last.toString()
		: window + last.toString();
}

export const p2 = (input: string): number => {
	const recipes: number[] = [3, 7];
	let a = 0;
	let b = 1;
	let window = '';
	for (;;) {
		const next = recipes[a]! + recipes[b]!;
		if (next >= 10) {
			recipes.push(Math.floor(next / 10));
			window = shift(window, recipes.at(-1)!, input.length);
			if (window === input) break;
			recipes.push(next % 10);
			window = shift(window, recipes.at(-1)!, input.length);
			if (window === input) break;
		} else {
			recipes.push(next);
			window = shift(window, recipes.at(-1)!, input.length);
			if (window === input) break;
		}
		a = (a + recipes[a]! + 1) % recipes.length;
		b = (b + recipes[b]! + 1) % recipes.length;
	}
	return recipes.length - input.length;
};

await task(p2, packageJson.aoc, { input: '327901' }); // 20229822 ~ 900ms

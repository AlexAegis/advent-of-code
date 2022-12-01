import { benchTask, loadTaskResources, split } from '@alexaegis/advent-of-code-lib';
import { sum } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json' assert { type: 'json' };
import { ADDRESS_LENGTH, parse } from './p1.js';

export const applyMask = (n: number, mask: string): number[] => {
	const result = [[...n.toString(2).padStart(ADDRESS_LENGTH, '0')]];
	for (let i = 0; i < ADDRESS_LENGTH; i++) {
		const maskVal = mask[mask.length - i - 1];
		if (maskVal === '1') {
			for (const binary of result) {
				binary[binary.length - i - 1] = maskVal;
			}
		} else if (maskVal === 'X') {
			const resc = [...result.map((r) => [...r])];
			for (const binary of result) {
				binary[binary.length - i - 1] = '0';
			}
			for (const binary of resc) {
				binary[binary.length - i - 1] = '1';
			}
			result.push(...resc);
		}
	}
	return result.map((r) => parseInt(r.join(''), 2));
};

export const p2 = (input: string): number => {
	const memory = new Map<number, number>();

	let mask = '0'.repeat(36);
	for (const parsed of split(input).map(parse)) {
		if (typeof parsed === 'string') {
			mask = parsed;
		} else {
			for (const address of applyMask(parsed.address, mask)) {
				memory.set(address, parsed.value);
			}
		}
	}
	return [...memory.values()].reduce(sum);
};

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p2, resources)}`); // 4200656704538 ~78.17ms
}

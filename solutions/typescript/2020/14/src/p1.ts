import { split, task, type SizedTuple } from '@alexaegis/advent-of-code-lib';
import { sum } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json';

export const ADDRESS_LENGTH = 36;

export interface Write {
	address: number;
	value: number;
}

export const parse = (line: string): Write | string => {
	const [a, , b] = line.split(' ') as SizedTuple<string, 3>;
	if (line.startsWith('mask')) {
		return b;
	} else {
		const [, m] = a.match(/\w+\[?(\d+)?]?/) ?? [undefined, '0'];
		return { address: Number.parseInt(m, 10), value: Number.parseInt(b, 10) };
	}
};

export const applyMask = (n: number, mask: string): number => {
	const binary = [...n.toString(2).padStart(ADDRESS_LENGTH, '0')];
	for (let i = 0; i < ADDRESS_LENGTH; i++) {
		const maskVal = mask[mask.length - i - 1];
		if (maskVal && maskVal !== 'X') {
			binary[binary.length - i - 1] = maskVal;
		}
	}
	return Number.parseInt(binary.join(''), 2);
};

export const p1 = (input: string): number => {
	const memory = new Map<number, number>();
	let mask = 'X'.repeat(ADDRESS_LENGTH);
	for (const parsed of split(input).map(parse)) {
		if (typeof parsed === 'string') {
			mask = parsed;
		} else {
			memory.set(parsed.address, applyMask(parsed.value, mask));
		}
	}
	return [...memory.values()].reduce(sum);
};

await task(p1, packageJson.aoc); // 7440382076205 ~1.22ms

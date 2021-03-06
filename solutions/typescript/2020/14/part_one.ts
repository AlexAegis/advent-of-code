import { bench, read, split } from '@lib';
import { sum } from '@lib/math';
import { day, year } from '.';

export const ADDRESS_LENGTH = 36;

export interface Write {
	address: number;
	value: number;
}

export const parse = (line: string): Write | string => {
	const [a, , b] = line.split(' ');
	if (line.startsWith('mask')) {
		return b;
	} else {
		const [, m] = a.match(/\w+\[?(\d+)?\]?/) ?? [];
		return { address: parseInt(m, 10), value: parseInt(b, 10) };
	}
};

export const applyMask = (n: number, mask: string): number => {
	const binary = [...n.toString(2).padStart(ADDRESS_LENGTH, '0')];
	for (let i = 0; i < ADDRESS_LENGTH; i++) {
		const maskVal = mask[mask.length - i - 1];
		if (maskVal !== 'X') {
			binary[binary.length - i - 1] = maskVal;
		}
	}
	return parseInt(binary.join(''), 2);
};

export const runner = (input: string): number => {
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

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 7440382076205 ~1.22ms
}

import { bench, read } from '@lib';
import { day, year } from '.';

export const relevantPassportFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
export type Passport = Record<string, string>;

export const runner = (input: string): number => {
	const lines = input.split(/\r?\n/);

	const parseLine = (line: string): Passport => {
		const data = line.split(' ').reduce((acc, e) => {
			const [key, val] = e.split(':');
			return { ...acc, [key]: val };
		}, {});

		return data;
	};

	const batched: Passport[] = [];
	let c = 0;
	for (const line of lines) {
		let passport = batched[c] ?? {};
		batched[c] = passport;
		if (line === '') {
			c++;
		} else {
			passport = { ...passport, ...parseLine(line) };
			batched[c] = passport;
		}
	}

	const res = batched.filter((p) => {
		const hasEveryOther = relevantPassportFields.every((pf) =>
			Object.keys(p).find((k) => k === pf)
		);

		return hasEveryOther;
	}).length;

	return res;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 264 ~6.5ms
}

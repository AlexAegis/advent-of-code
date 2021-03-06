import { bench, read } from '@lib';
import { day, year } from '.';

export enum RelevantField {
	byr = 'byr',
	iyr = 'iyr',
	eyr = 'eyr',
	hgt = 'hgt',
	hcl = 'hcl',
	ecl = 'ecl',
	pid = 'pid',
}

export type Passport = Record<RelevantField, string>;

export const parsePassport = (passport: string): Partial<Passport> =>
	passport.split(' ').reduce((acc, e) => {
		const [key, val] = e.split(':');
		acc[key as RelevantField] = val;
		return acc;
	}, {} as Partial<Passport>);

export const parsePassports = (input: string): Partial<Passport>[] =>
	input
		.split(/\r?\n\r?\n/)
		.map((raw) => raw.replace(/\r?\n/g, ' '))
		.map(parsePassport);

export const isPassport = (passport: Partial<Passport>): passport is Passport =>
	Object.values(RelevantField).every((pf) => Object.keys(passport).find((k) => k === pf));

export const runner = (input: string): number => parsePassports(input).filter(isPassport).length;

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 264 ~5.6ms
}

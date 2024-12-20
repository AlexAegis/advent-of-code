import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

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
	passport.split(' ').reduce<Partial<Passport>>((acc, e) => {
		const [key, val] = e.split(':');
		if (!val) {
			throw new Error('bad passport');
		}
		acc[key as RelevantField] = val;
		return acc;
	}, {});

export const parsePassports = (input: string): Partial<Passport>[] =>
	input
		.split(/\r?\n\r?\n/)
		.map((raw) => raw.replaceAll(/\r?\n/g, ' '))
		.map(parsePassport);

export const isPassport = (passport: Partial<Passport>): passport is Passport =>
	Object.values(RelevantField).every((pf) =>
		(Object.keys(passport) as RelevantField[]).find((k) => k === pf),
	);

export const p1 = (input: string): number => parsePassports(input).count(isPassport);

await task(p1, packageJson.aoc); // 264 ~5.6ms

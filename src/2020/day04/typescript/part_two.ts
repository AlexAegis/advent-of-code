import { bench, read } from '@lib';
import { day, year } from '.';
import { isPassport, parsePassports, Passport, RelevantFields } from './part_one';

export const passportEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

export const passportChecks: Record<RelevantFields, (v: string) => boolean> = {
	byr: (byr: string): boolean => {
		const byrNum = parseInt(byr, 10);
		return byr.length === 4 && byrNum >= 1920 && byrNum <= 2002;
	},
	iyr: (iyr: string): boolean => {
		const iyrNum = parseInt(iyr, 10);
		return iyr.length === 4 && iyrNum >= 2010 && iyrNum <= 2020;
	},
	eyr: (eyr: string): boolean => {
		const eyrNum = parseInt(eyr, 10);
		return eyr.length === 4 && eyrNum >= 2020 && eyrNum <= 2030;
	},
	hgt: (hgt: string): boolean => {
		if (hgt.endsWith('cm')) {
			const hgtNum = parseInt(hgt.split('cm')[0], 10);
			return hgtNum >= 150 && hgtNum <= 193;
		} else if (hgt.endsWith('in')) {
			const hgtNum = parseInt(hgt.split('in')[0], 10);
			return hgtNum >= 59 && hgtNum <= 76;
		} else {
			return false;
		}
	},
	hcl: (hcl: string): boolean => /^#[0-9a-f]{6}$/.test(hcl),
	ecl: (ecl: string): boolean => !!passportEyeColors.find((color) => color === ecl),
	pid: (pid: string): boolean => /^[0-9]{9}$/.test(pid),
};

export const isValidPassport = (passport: Partial<Passport>): passport is Passport =>
	isPassport(passport) &&
	Object.values(RelevantFields).every((f) => passportChecks[f](passport[f]));

export const runner = (input: string): number =>
	parsePassports(input).filter(isValidPassport).length;

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 224 ~7.8ms
}

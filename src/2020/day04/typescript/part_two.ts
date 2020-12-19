import { bench, read } from '@lib';
import { day, year } from '.';
import { isPassport, parsePassports, Passport, RelevantField } from './part_one';

const CM = 'cm';
const IN = 'in';

export const passportEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

export const passportChecks: Record<RelevantField, (v: string) => boolean> = {
	byr: (byr) => byr.toInt()?.isBetween(1920, 2002) ?? false,
	iyr: (iyr) => iyr.toInt()?.isBetween(2010, 2020) ?? false,
	eyr: (eyr) => eyr.toInt()?.isBetween(2020, 2030) ?? false,
	hgt: (hgt) => {
		if (hgt.endsWith(CM)) {
			return hgt.split(CM)[0].toInt()?.isBetween(150, 193) ?? false;
		} else if (hgt.endsWith(IN)) {
			return hgt.split(IN)[0].toInt()?.isBetween(59, 76) ?? false;
		} else {
			return false;
		}
	},
	hcl: (hcl) => /^#[0-9a-f]{6}$/.test(hcl),
	ecl: (ecl) => !!passportEyeColors.find((color) => color === ecl),
	pid: (pid) => /^[0-9]{9}$/.test(pid),
};

export const isValidPassport = (passport: Partial<Passport>): passport is Passport =>
	isPassport(passport) &&
	Object.values(RelevantField).every((f) => passportChecks[f](passport[f]));

export const runner = (input: string): number =>
	parsePassports(input).filter(isValidPassport).length;

// istanbul ignore next
if (require.main === module) {
	bench(read(year, day), runner).then((r) => console.log(`Result: ${r}`)); // 224 ~7.8ms
}

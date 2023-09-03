import { INTERVAL_CLOSED, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { RelevantField, isPassport, parsePassports, type Passport } from './p1.js';

const CM = 'cm';
const IN = 'in';

export const passportEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

const from1920to2002 = (1920).interval(2002, INTERVAL_CLOSED);
const from2010to2020 = (2010).interval(2020, INTERVAL_CLOSED);
const from2020to2030 = (2020).interval(2030, INTERVAL_CLOSED);
const from150to193 = (150).interval(193, INTERVAL_CLOSED);
const from59to76 = (59).interval(76, INTERVAL_CLOSED);

export const passportChecks: Record<RelevantField, (v: string) => boolean> = {
	byr: (byr) => byr.toInt().isContainedIn(from1920to2002),
	iyr: (iyr) => iyr.toInt().isContainedIn(from2010to2020),
	eyr: (eyr) => eyr.toInt().isContainedIn(from2020to2030),
	hgt: (hgt) => {
		if (hgt.endsWith(CM)) {
			return hgt.split(CM)[0]?.toInt()?.isContainedIn(from150to193) ?? false;
		} else if (hgt.endsWith(IN)) {
			return hgt.split(IN)[0]?.toInt()?.isContainedIn(from59to76) ?? false;
		} else {
			return false;
		}
	},
	hcl: (hcl) => /^#[\da-f]{6}$/.test(hcl),
	ecl: (ecl) => passportEyeColors.includes(ecl),
	pid: (pid) => /^\d{9}$/.test(pid),
};

export const isValidPassport = (passport: Partial<Passport>): passport is Passport =>
	isPassport(passport) &&
	Object.values(RelevantField).every((f) => passportChecks[f](passport[f]));

export const p2 = (input: string): number => parsePassports(input).count(isValidPassport);

await task(p2, packageJson.aoc); // 224 ~7.8ms

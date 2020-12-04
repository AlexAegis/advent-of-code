import { bench, read } from '@lib';
import { day, year } from '.';

export type Passport = Record<string, string>;

export const relevantPassportFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

export const byrCheck = (byr: string): boolean => {
	const byrNum = parseInt(byr, 10);
	return byr.length === 4 && byrNum >= 1920 && byrNum <= 2002;
};

export const iyrCheck = (byr: string): boolean => {
	const byrNum = parseInt(byr, 10);
	return byr.length === 4 && byrNum >= 2010 && byrNum <= 2020;
};

export const eyrCheck = (byr: string): boolean => {
	const byrNum = parseInt(byr, 10);
	return byr.length === 4 && byrNum >= 2020 && byrNum <= 2030;
};

export const hgtCheck = (hgt: string): boolean => {
	if (hgt.includes('cm')) {
		const hgtNum = parseInt(hgt.split('cm')[0], 10);
		if (hgtNum < 150 || hgtNum > 193) {
			return false;
		}
		return true;
	} else if (hgt.includes('in')) {
		const hgtNum = parseInt(hgt.split('in')[0], 10);
		if (hgtNum < 59 || hgtNum > 76) {
			return false;
		}
		return true;
	} else {
		return false;
	}
};

export const hclCheck = (hcl: string): boolean => {
	if (
		hcl[0] === '#' &&
		[...(hcl.split('#')[1] || 'x')].every(
			(l) =>
				l === '0' ||
				l === '1' ||
				l === '2' ||
				l === '3' ||
				l === '4' ||
				l === '5' ||
				l === '6' ||
				l === '7' ||
				l === '8' ||
				l === '9' ||
				l === '0' ||
				l === 'a' ||
				l === 'b' ||
				l === 'c' ||
				l === 'd' ||
				l === 'e' ||
				l === 'f'
		)
	) {
		return true;
	} else return false;
};

const eclCheck = (ecl: string): boolean =>
	ecl === 'amb' ||
	ecl === 'blu' ||
	ecl === 'brn' ||
	ecl === 'gry' ||
	ecl === 'grn' ||
	ecl === 'hzl' ||
	ecl === 'oth';

const pidCheck = (pid: string): boolean => /^[0-9]{9}$/.test(pid);

// console.log('byr 2002', byrCheck('2002'));
// console.log('byr 2003', byrCheck('2003'));
// console.log('hgt 60in', hgtCheck('60in'));
// console.log('hgt 190cm', hgtCheck('190cm'));
// console.log('hgt 190in', hgtCheck('190in'));
// console.log('hgt 190', hgtCheck('190'));
// console.log('hcl #123abc', hclCheck('#123abc'));
// console.log('hcl #123abz', hclCheck('#123abz'));
// console.log('hcl 123abc', hclCheck('123abc'));
// console.log('pid 000000001', pidCheck('000000001'));
// console.log('pid 0123456789', pidCheck('0123456789'));

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
		if (!hasEveryOther) {
			return false;
		}

		const byr = p['byr'];
		if (!byrCheck(byr)) {
			return false;
		}

		const iyr = p['iyr'];
		if (!iyrCheck(iyr)) {
			return false;
		}

		const eyr = p['eyr'];
		if (!eyrCheck(eyr)) {
			return false;
		}

		const hgt = p['hgt'];
		if (!hgtCheck(hgt)) {
			return false;
		}

		const hcl = p['hcl'];
		if (!hclCheck(hcl)) {
			return false;
		}

		const ecl = p['ecl'];
		if (!eclCheck(ecl)) {
			return false;
		}

		const pid = p['pid'];
		if (!pidCheck(pid)) {
			return false;
		}

		return true;
	}).length;
	return res;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 224 ~7.8ms
}

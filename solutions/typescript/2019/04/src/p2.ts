import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): number => {
	const [l, h] = input.split('-').map((s) => parseInt(s, 10));
	let count = 0;
	for (let i = l; i <= h; i++) {
		const s = i.toString();
		let m = true;
		let pa = false;
		for (let j = 1; j < s.length && m; j++) {
			m = m && Number(s[j]) >= Number(s[j - 1]);
			pa =
				pa ||
				(s[j] === s[j - 1] &&
					(s[j - 2] === undefined || s[j - 2] !== s[j]) &&
					(s[j + 1] === undefined || s[j + 1] !== s[j]));
		}
		if (m && pa) {
			count++;
		}
	}
	return count;
};

await task(p2, packageJson.aoc); // 1148 ~77ms

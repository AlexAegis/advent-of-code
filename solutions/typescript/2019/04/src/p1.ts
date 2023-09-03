import { numberPair, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

export const p1 = (input: string): number => {
	const [l, h] = numberPair.assert(input.split('-').map((s) => Number.parseInt(s, 10)));
	let count = 0;
	for (let i = l; i <= h; i++) {
		const s = i.toString();
		let m = true;
		let pa = false;
		for (let j = 1; j < s.length && m; j++) {
			m &&= Number(s[j]) >= Number(s[j - 1]);
			pa = pa || s[j] === s[j - 1];
		}
		if (m && pa) {
			count++;
		}
	}
	return count;
};

await task(p1, packageJson.aoc); // 1694 ~62ms

import { bench, read } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const runner = (input: string): number => {
	const [l, h] = input.split('-').map((s) => parseInt(s, 10));
	let count = 0;
	for (let i = l; i <= h; i++) {
		const s = i.toString();
		let m = true;
		let pa = false;
		for (let j = 1; j < s.length && m; j++) {
			m = m && Number(s[j]) >= Number(s[j - 1]);
			pa = pa || s[j] === s[j - 1];
		}
		if (m && pa) {
			count++;
		}
	}
	return count;
};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 1694 ~62ms
}

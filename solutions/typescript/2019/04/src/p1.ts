import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p1 = (input: string): number => {
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
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 1694 ~62ms
}

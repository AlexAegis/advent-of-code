import { benchTask, loadTaskResources, split } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p1 = (input: string): number => {
	const [n, data] = split(input);
	const timestamp = parseInt(n, 10);

	const sort = data
		.split(',')
		.filter((id) => id !== 'x')
		.map((sid) => {
			const id = parseInt(sid, 10);
			const turns = Math.floor(timestamp / id);
			const last = turns * id;
			const next = last + id;
			const diff = next - timestamp;
			return { id, diff };
		})
		.sort((a, b) => a.diff - b.diff);

	return sort[0].id * sort[0].diff;
};

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 136 ~0.22ms
}

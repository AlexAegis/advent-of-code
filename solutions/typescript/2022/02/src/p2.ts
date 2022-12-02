import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';

import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): number => {
	const tape = input.splitToInt();
	console.log(tape);
	return 0;
};

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p2, resources)}`); // 0 ~0ms
}

import { collapse } from './collapse.function.js';

import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): number => {
	const uniqueUnits = [...input].reduce((acc, curr) =>
		acc.includes(curr.toLowerCase()) ? acc.toLowerCase() : acc + curr.toLowerCase()
	);

	let shortestSequence: string | undefined;
	let shortestSequenceRemovedUnit: string | undefined;

	for (const unit of uniqueUnits) {
		const modifiedSequence = [...input].reduce((acc, curr) =>
			curr.toLowerCase() === unit ? acc : acc + curr
		);
		const collapsedSequence = collapse(modifiedSequence);
		if (shortestSequence === undefined || collapsedSequence.length < shortestSequence.length) {
			shortestSequence = collapsedSequence;
			shortestSequenceRemovedUnit = unit;
		}
	}

	console.log(`The removed unit is: ${shortestSequenceRemovedUnit}`);
	return shortestSequence ? shortestSequence.length : 0;
};

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p2, resources)}`); // 6394 ~326ms
}

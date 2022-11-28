import { bench, read } from '@alexaegis/advent-of-code-lib';
import { collapse } from './collapse.function.js';

import packageJson from '../package.json' assert { type: 'json' };

export const runner = (input: string): number => {
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
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 6394 ~326ms
}

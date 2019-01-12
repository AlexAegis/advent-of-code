import * as fs from 'fs';
import { collapse } from './collapse.function';

export const runner = async (input: 'example' | 'input' = 'input') => {
	let sequence = <string>await fs.promises.readFile(`src/2018/day05/${input}.txt`, { encoding: 'UTF-8' }); // Encoding is specified, result is string

	const uniqueUnits = [...sequence].reduce((acc, curr) =>
		acc.includes(curr.toLowerCase()) ? acc.toLowerCase() : acc + curr.toLowerCase()
	);

	let shortestSequence: string;
	let shortestSequenceRemovedUnit: string;

	for (let unit of uniqueUnits) {
		let modifiedSequence = [...sequence].reduce((acc, curr) => (curr.toLowerCase() === unit ? acc : acc + curr));
		let collapsedSequence = collapse(modifiedSequence);
		if (shortestSequence === undefined || collapsedSequence.length < shortestSequence.length) {
			shortestSequence = collapsedSequence;
			shortestSequenceRemovedUnit = unit;
		}
	}

	console.log(`The removed unit is: ${shortestSequenceRemovedUnit}`);
	return shortestSequence.length;
};

if (require.main == module) {
	console.time();
	(async () => {
		console.log(`Shortest sequence is: ${await runner()}`);
		console.timeEnd();
	})(); // 6394 ~361ms
}

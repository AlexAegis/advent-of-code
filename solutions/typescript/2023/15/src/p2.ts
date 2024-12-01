import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parseInstruction } from './internal/parse.js';

interface Lens {
	label: string;
	focalLength: number;
}

export const p2 = (input: string): number => {
	const sequence = input.lines(false).first().split(',').map(parseInstruction);
	const boxMap = new Map<number, Lens[]>();

	for (const instruction of sequence) {
		if (instruction.operator === '-') {
			const lenses = boxMap.get(instruction.box);
			const lenseIndex = lenses?.findIndex((lens) => lens.label === instruction.label) ?? -1;
			if (lenses !== undefined && lenseIndex >= 0) {
				lenses.splice(lenseIndex, 1);
				if (lenses.length === 0) {
					boxMap.delete(instruction.box);
				}
			}
		} else {
			const lenses = boxMap.getOrAdd(instruction.box, (_key) => []);
			const existingLens = lenses.find((lens) => lens.label === instruction.label);
			if (existingLens) {
				existingLens.focalLength = instruction.focalLength;
			} else {
				lenses.push({ focalLength: instruction.focalLength, label: instruction.label });
			}
		}
	}

	return [...boxMap.entries()]
		.flatMap(([box, lenses]) =>
			lenses.map((lens, lenseIndex) => (box + 1) * (lenseIndex + 1) * lens.focalLength),
		)
		.sum();
};

await task(p2, packageJson.aoc); // 245223 ~0.65ms

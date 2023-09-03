import { split } from '@alexaegis/advent-of-code-lib';
import { Bag } from './bag.class.js';

export const parseLine = (line: string): [string, [number, string][] | undefined] => {
	const name = line.match(/^(\w+ \w+)/)?.[0] ?? '';

	const contained = line.match(/(\d+) (\w+ \w+)/g)?.map(
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		([q, ...color]) =>
			[Number.parseInt(q ?? '0', 10), color.join('').trimStart()] as [number, string],
	);

	return [name, contained];
};

export const parse = (input: string): Map<string, Bag> =>
	split(input)
		.map(parseLine)
		.reduce((map, [color, contains]) => {
			const bag = map.getOrAdd(color, Bag.create);
			if (contains)
				for (const [count, contained] of contains)
					bag.canContain.set(map.getOrAdd(contained, Bag.create), count);
			return map;
		}, new Map<string, Bag>());

import { Direction, DirectionCardinalLiteralLetter, split } from '@alexaegis/advent-of-code-lib';
import { type } from 'arktype';

export const parse = (
	input: string,
): {
	direction: Direction;
	count: number;
}[] => {
	const stringPair = type(['string', 'string']);
	return split(input).map((l) => {
		const [dir, rawCount] = stringPair.assert(l.split(' '));
		return {
			direction: Direction.fromMarker(dir as DirectionCardinalLiteralLetter),
			count: Number.parseInt(rawCount, 10),
		};
	});
};

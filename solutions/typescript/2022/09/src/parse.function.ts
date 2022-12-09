import { Direction, DirectionCardinalLiteralLetter, split } from '@alexaegis/advent-of-code-lib';

export const parse = (
	input: string
): {
	direction: Direction;
	count: number;
}[] =>
	split(input).map((l) => {
		const [dir, rawCount] = l.split(' ');
		return {
			direction: Direction.fromMarker(dir as DirectionCardinalLiteralLetter),
			count: parseInt(rawCount, 10),
		};
	});

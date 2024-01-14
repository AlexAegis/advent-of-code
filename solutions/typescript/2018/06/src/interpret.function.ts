import { Vec2, split } from '@alexaegis/advent-of-code-lib';

export const interpret = (input: string): Vec2[] => {
	const points: Vec2[] = [];
	for (const line of split(input)) {
		if (line) {
			const [y, x] = line.splitIntoStringPair(', ');
			points.push(new Vec2(Number.parseInt(x, 10), Number.parseInt(y, 10)));
		}
	}
	return points;
};

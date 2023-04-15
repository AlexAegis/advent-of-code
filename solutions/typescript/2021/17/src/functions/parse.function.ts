import { BoundingBox, Vec2 } from '@alexaegis/advent-of-code-lib/model';
import { type } from 'arktype';

interface Boundary {
	label: string;
	first: number;
	second: number;
}

export const parseBoundary = (input: string): BoundingBox => {
	const stringPair = type(['string', 'string']);
	const numberPair = type(['number', 'number']);

	const [, boundaryString] = stringPair.assert(input.split(': '));
	const [axis1, axis2] = boundaryString.split(', ').map((coord) => {
		const [label, numbers] = stringPair.assert(coord.split('='));
		const [first, second] = numberPair.assert(numbers.split('..').toInt());
		return { label, first, second };
	}) as [Boundary, Boundary];

	let xAxis = axis1;
	let yAxis = axis2;
	if (axis1.label === 'y') {
		xAxis = axis2;
		yAxis = axis1;
	}

	const topLeft = new Vec2({
		x: Math.min(xAxis.first, xAxis.second),
		y: Math.min(yAxis.first, yAxis.second),
	});
	const bottomRight = new Vec2({
		x: Math.max(xAxis.first, xAxis.second),
		y: Math.max(yAxis.first, yAxis.second),
	});
	return BoundingBox.fromVectors([topLeft, bottomRight]);
};

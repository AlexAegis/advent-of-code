import { BoundingBox, Vec2 } from '@alexaegis/advent-of-code-lib/model';

export const parseBoundary = (input: string): BoundingBox => {
	const [, boundaryString] = input.split(': ');
	const [axis1, axis2] = boundaryString.split(', ').map((coord) => {
		const [label, numbers] = coord.split('=');
		const [first, second] = numbers.split('..').toInt();
		return { label, first, second };
	});
	let xAxis = axis1;
	let yAxis = axis2;
	if (axis1.label === 'y') {
		xAxis = axis2;
		yAxis = axis1;
	}
	const topLeft = new Vec2({
		x: Math.min(xAxis.first, xAxis.second),
		y: Math.max(yAxis.first, yAxis.second),
	});
	const bottomRight = new Vec2({
		x: Math.max(xAxis.first, xAxis.second),
		y: Math.min(yAxis.first, yAxis.second),
	});
	return BoundingBox.fromVectors(topLeft, bottomRight);
};

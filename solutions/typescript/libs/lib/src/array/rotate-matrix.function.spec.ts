import { describe, expect, it } from 'vitest';
import { rotateMatrix } from './rotate-matrix.function.js';

const joinMatrix = (matrix: string[][]) => matrix.map((r) => r.join('')).join('\n');

describe('rotateMatrix', () => {
	const matrix = [
		['0', '1', '2'],
		['3', '4', '5'],
		['6', '7', '8'],
	];
	const rightRotatedMatrix = [
		['6', '3', '0'],
		['7', '4', '1'],
		['8', '5', '2'],
	];
	const leftRotatedMatrix = [
		['2', '5', '8'],
		['1', '4', '7'],
		['0', '3', '6'],
	];

	const joinedMatrix = joinMatrix(matrix);
	const joinedRightRotatedMatrix = joinMatrix(rightRotatedMatrix);
	const joinedLeftRotatedMatrix = joinMatrix(leftRotatedMatrix);

	it('should be able to rotate to the right and not mutate the original', () => {
		expect(joinMatrix(rotateMatrix(matrix, 'r'))).toEqual(joinedRightRotatedMatrix);
		expect(joinMatrix(matrix)).toEqual(joinedMatrix);
	});

	it('should be able to rotate to the left and not mutate the original', () => {
		expect(joinMatrix(rotateMatrix(matrix, 'l'))).toEqual(joinedLeftRotatedMatrix);
		expect(joinMatrix(matrix)).toEqual(joinedMatrix);
	});

	it('should be able to rotate one dimensional arrays', () => {
		expect(joinMatrix(rotateMatrix(['1', '2', '3'] as unknown as string[][], 'l'))).toEqual(
			'123',
		);
	});

	it('should be able to rotate rectangles', () => {
		expect(
			joinMatrix(rotateMatrix([['1'], ['2'], ['3']] as unknown as string[][], 'r')),
		).toEqual('321');
	});

	it('should return an empty array for an empty array', () => {
		expect(rotateMatrix([]).length).toEqual(0);
	});
});

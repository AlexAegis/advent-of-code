import { expect } from 'chai';
import { rotateMatrix } from './rotate-matrix.function';

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

	const joinMatrix = (matrix: string[][]) => matrix.map((r) => r.join('')).join('\n');
	const joinedMatrix = joinMatrix(matrix);
	const joinedRightRotatedMatrix = joinMatrix(rightRotatedMatrix);
	const joinedLeftRotatedMatrix = joinMatrix(leftRotatedMatrix);

	it('should be able to rotate to the right and not mutate the original', () => {
		expect(joinMatrix(rotateMatrix(matrix, 'r'))).to.equal(joinedRightRotatedMatrix);
		expect(joinMatrix(matrix)).to.equal(joinedMatrix);
	});

	it('should be able to rotate to the left and not mutate the original', () => {
		expect(joinMatrix(rotateMatrix(matrix, 'l'))).to.equal(joinedLeftRotatedMatrix);
		expect(joinMatrix(matrix)).to.equal(joinedMatrix);
	});

	it('should be able to rotate one dimensional arrays', () => {
		expect(joinMatrix(rotateMatrix((['1', '2', '3'] as unknown) as string[][], 'l'))).to.equal(
			'123'
		);
	});

	it('should be able to rotate rectangles', () => {
		expect(
			joinMatrix(rotateMatrix(([['1'], ['2'], ['3']] as unknown) as string[][], 'r'))
		).to.equal('321');
	});

	it('should return an empty array for an empty array', () => {
		expect(rotateMatrix([]).length).to.equal(0);
	});
});

import { expect } from 'chai';
import { slideWindow } from './slide-window.generator';

describe('slideWindow', () => {
	it('should emit pairs by default', () => {
		const data = [0, 1, 2, 3, 4, 5, 6];
		const result = [...slideWindow(data)];

		expect(result).to.deep.equal([
			[0, 1],
			[1, 2],
			[2, 3],
			[3, 4],
			[4, 5],
			[5, 6],
		]);
	});
});

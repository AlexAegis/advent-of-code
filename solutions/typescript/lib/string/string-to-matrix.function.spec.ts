import { expect } from 'chai';
import { stringToMatrix } from './string-to-matrix.function';

describe('stringToMatrix', () => {
	it('should be able to split a string apart', () => {
		expect(stringToMatrix('123\n542\n')[1][1]).to.equal('4');
	});
});

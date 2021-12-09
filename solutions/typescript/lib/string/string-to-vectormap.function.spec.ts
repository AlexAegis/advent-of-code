import { Vec2 } from '@lib/model';
import { expect } from 'chai';
import { stringToVectorMap } from './string-to-vectormap.function';

describe('stringToVectormap', () => {
	it('should be able to split a string apart', () => {
		const vectorMap = stringToVectorMap('123\n542\n', (s) => s.tryInt());
		expect(vectorMap.get(new Vec2(1, 1).toString())).to.equal(4);
	});
});

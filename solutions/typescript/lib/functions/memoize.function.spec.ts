import { expect } from 'chai';
import { memoize } from './memoize.function';

describe('Memoize', () => {
	it('should call the original function only once', async () => {
		let callCount = 0;
		const add = (a: number, b: number): number => {
			callCount++;
			return a + b;
		};
		const memoizedAdd = memoize(add);
		expect(memoizedAdd(1, 2)).to.equal(3);
		expect(memoizedAdd(1, 2)).to.equal(3);
		expect(callCount).to.equal(1);
	});
});

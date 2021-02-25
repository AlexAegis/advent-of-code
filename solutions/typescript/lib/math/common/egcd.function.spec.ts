import { expect } from 'chai';
import { egcd } from './egcd.function';

describe('Extended Euclidean Algorithm - Greatest Common Divisor', () => {
	it('should return 20 with 120 and -20', async () => {
		expect(egcd(120, -20)[0]).to.equal(20);
	});

	it('should return 3 with 3, 3', async () => {
		expect(egcd(3, 3)[0]).to.equal(3);
	});

	it('should return 12 with 24, 36', async () => {
		expect(egcd(24, 36)[0]).to.equal(12);
	});
});

import { expect } from 'chai';
import { egcd } from './egcd.function';

describe('Clamp', () => {
	it('should return 20 with 120 and -20', async () => {
		expect(egcd(120, -20)[0]).to.equal(20);
	});
});

import { describe, expect, it } from 'vitest';
import { rightSplit } from './right-split.function.js';

describe('rightSplit', () => {
	it('should be able to split a string apart', () => {
		const [a, b] = rightSplit('a b c');
		expect(a).to.equal('a b');
		expect(b).to.equal('c');
	});

	it('should return the original string if the delimiter does not exist', () => {
		const [a, b] = rightSplit('a b c', 'x');
		expect(a).to.equal('a b c');
		expect(b).to.be.undefined;
	});

	it('should return the original string if the delimiter is falsy', () => {
		const [a, b] = rightSplit('a b c', '');
		expect(a).to.equal('a b c');
		expect(b).to.be.undefined;
	});
});

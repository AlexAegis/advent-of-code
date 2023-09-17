import { describe, expect, it } from 'vitest';
import { stringToMatrix } from './string-to-matrix.function.js';

describe('stringToMatrix', () => {
	it('should be able to split a string apart', () => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		expect(stringToMatrix('123\n542\n')[1]![1]).toEqual('4');
	});
});

import { describe, expect, it } from 'vitest';
import { Vec2 } from '../model/vector/vec2.class.js';
import { stringToVectorMap } from './string-to-vectormap.function.js';

describe('stringToVectormap', () => {
	it('should be able to split a string apart', () => {
		const vectorMap = stringToVectorMap('123\n542\n', {
			valueConverter: (s) => Number.parseInt(s, 10),
		});
		expect(vectorMap.get(new Vec2(1, 1).toString())).toEqual(4);
	});
});

import { describe, expect, it } from 'vitest';
import { slideWindow } from './slide-window.function.js';

describe('slideWindow', () => {
	it('should emit pairs by default', () => {
		const data = [0, 1, 2, 3, 4, 5, 6];

		expect(slideWindow(data)).toStrictEqual([
			[0, 1],
			[1, 2],
			[2, 3],
			[3, 4],
			[4, 5],
			[5, 6],
		]);
	});
});

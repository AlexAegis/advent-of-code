import { describe, expect, it } from 'vitest';
import { MonkeyBuilder } from './parse.function.js';

describe('2022 11 parse', () => {
	describe('MonkeyBuilder', () => {
		it('should error out when the monkey is not ready to be built', () => {
			const monkeyBuilder = new MonkeyBuilder();
			expect(() => monkeyBuilder.build()).toThrow('Monkey not buildable!');
		});
	});
});

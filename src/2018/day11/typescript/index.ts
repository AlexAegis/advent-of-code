import { DayInputs, DayResults } from '@lib';

export const year = 2018;
export const day = 11;

export const inputs: DayInputs = {
	one: {
		input: {
			input: 8561
		},
		example: {
			input: 12345
		}
	},
	two: {
		input: {
			input: 8561
		},
		example: {
			input: 12345
		}
	}
};

export const results: DayResults<string> = {
	one: {
		input: '21,37 (30)',
		example: '237,84 (30)'
	},
	two: {
		input: '236,146,12 (160)',
		example: '236,146,12 (160)'
	}
};

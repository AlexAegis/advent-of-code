import { DayResults } from '@root/lib/typescript';

export const year = 2018;
export const day = 13;

export const results: DayResults<string> = {
	one: {
		input: '28,107',
		example1: '7,3',
		example2: '2,0'
	},
	two: {
		input: '36,123',
		example1: undefined, // Example 1 is not applicable here as there is only 2 carts in there
		example2: '6,4'
	}
};

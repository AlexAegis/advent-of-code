import { DayResults } from '@lib';

export const year = 2018;
export const day = 6;

export interface Args {
	limit: number;
}

export const results: DayResults = {
	one: {
		input: 3006,
		example: 17
	},
	two: {
		input: 42998,
		example: 16
	}
};

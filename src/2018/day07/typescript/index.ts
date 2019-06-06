import { DayResults } from '@root';

export const year = 2018;
export const day = 7;

export interface Args {
	workers: number;
}

export const results: DayResults<string, number> = {
	one: {
		input: 'GRTAHKLQVYWXMUBCZPIJFEDNSO',
		example: 'CABDFE'
	},
	two: {
		input: 1115,
		example: 15
	}
};

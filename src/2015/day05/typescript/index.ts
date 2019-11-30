import { DayInputs, DayResults } from '@lib';

export const year = 2015;
export const day = 5;

export const inputs: DayInputs<string> = {
	one: {
		input: {
			input: ''
		},
		example: {
			input: 'ugknbfddgicrmopn'
		},
		example2: {
			input: 'aaa'
		},
		example3: {
			input: 'jchzalrnumimnmhp'
		},
		example4: {
			input: 'haegwjzuvuyypxyu'
		},
		example5: {
			input: 'dvszwmarrgswjxmb'
		}
	},
	two: {
		input: {
			input: ''
		},
		example: {
			input: 'qjhvhtzxzqqjkmpb'
		},
		example2: {
			input: 'xxyxx'
		},
		example3: {
			input: 'uurcxstgmygtbstg'
		},
		example4: {
			input: 'ieodomkazucvgmuy'
		}
	}
};

export const results: DayResults<number | boolean> = {
	one: {
		input: 236
	},
	two: {
		input: 51
	}
};

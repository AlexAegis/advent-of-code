import { DayInputs, DayResults } from '@root';

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
		input: 236,
		example1: true,
		example2: true,
		example3: false,
		example4: false,
		example5: false
	},
	two: {
		input: 0,
		example1: true,
		example2: true,
		example3: false,
		example4: false
	}
};

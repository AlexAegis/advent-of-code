import { Cave } from './model/cave.class';
import { split } from '@root';

export const interpreter = (input: string): Cave | undefined => {
	let cave: Cave | undefined;
	for (const line of split(input)) {
		if (line.startsWith('initial state:')) {
			cave = new Cave(line.split(': ')[1]);
		} else if (line.indexOf('=>') > 0) {
			const split = line.split(' => ');
			if (cave && split[0][2] !== split[1]) {
				cave.rules.push(split[0]);
			}
		}
	}
	return cave;
};

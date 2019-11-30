import { split } from '@root/lib/typescript';
import { Cave } from './model/cave.class';

export const interpreter = (input: string): Cave | undefined => {
	let cave: Cave | undefined;
	for (const line of split(input)) {
		if (line.startsWith('initial state:')) {
			cave = new Cave(line.split(': ')[1]);
		} else if (line.indexOf('=>') > 0) {
			const s = line.split(' => ');
			if (cave && s[0][2] !== s[1]) {
				cave.rules.push(s[0]);
			}
		}
	}
	return cave;
};

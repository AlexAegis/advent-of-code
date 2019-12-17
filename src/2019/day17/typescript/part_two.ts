import { bench, read } from '@lib';
import { IntCodeComputer } from '@lib/intcode';
import { LZW } from '@lib/math/lz/lzw.class';
import { day, year } from '.';
import { parse } from './parse';
import { draw, makeMap, Tile } from './part_one';

export enum MovementFunction {
	A = 'A',
	B = 'B',
	C = 'C'
}

export enum Turn {
	LEFT = 'L',
	RIGHT = 'R'
}

const DELIMITER = '\n';

export const getFullPath = (input: string): string[] => {
	const [map, vacuum] = makeMap(input);
	const path: (Turn | string)[] = [];
	let steps = 0;
	while (true) {
		const checkThere = vacuum.pos.add(vacuum.dir);
		if (map.get(checkThere.toString()) === Tile.SCAFFOLD) {
			vacuum.pos.addMut(vacuum.dir); // step
			steps++;
		} else {
			const checkRight = vacuum.pos.add(vacuum.dir.right());
			const checkLeft = vacuum.pos.add(vacuum.dir.left());
			const hasRight = map.get(checkRight.toString()) === Tile.SCAFFOLD;
			const hasLeft = map.get(checkLeft.toString()) === Tile.SCAFFOLD;

			if (hasRight && !hasLeft) {
				vacuum.dir = vacuum.dir.right();
				if (steps) {
					path.push(steps.toString());
				}
				path.push(Turn.RIGHT);
				steps = 0;
			} else if (!hasRight && hasLeft) {
				vacuum.dir = vacuum.dir.left();
				if (steps) {
					path.push(steps.toString());
				}
				path.push(Turn.LEFT);
				steps = 0;
			} else {
				vacuum.pos.addMut(vacuum.dir); // s
				if (steps) {
					path.push(steps.toString());
				}
				break;
			}
		}

		// draw(map, vacuum);
	}

	return path;
};

export const runner = (input: string): number => {
	const i = new IntCodeComputer(parse(input));
	i.tape.set(0, 2);
	const it = i.iter();

	const fullPath = getFullPath(input);

	console.log(fullPath);

	const asd = new LZW('R,8,R,8,R,4,R,4,R,8,L,6,L,2,R,4,R,4,R,8,R,8,R,8,L,6,L,2'.split(','));
	// BABABABABAABAAA  [204, 141, 98]
	// R,8,R,8,R,4,R,4,R,8,L,6,L,2,R,4,R,4
	//
	const cr = asd.multiPass();
	console.log(cr);
	const reversed = asd.reverse(cr[0]);
	console.log('REVER', reversed);
	console.log('PATH', fullPath);
	return 0;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 4864 ~0ms
}

import { bench, read } from '@lib';
import { Vec2 } from '@lib/model';
import { day, year } from '.';
import { hexagonalAxialDirections, parse } from './parse.function';

export const runner = (input: string): number =>
	parse(input)
		.map((ttf) =>
			ttf
				.reduce((acc, a) => acc.addMut(hexagonalAxialDirections[a]), Vec2.ORIGIN.clone())
				.toString()
		)
		.reduce((blacks, toFlip) => {
			blacks.flip(toFlip.toString());
			return blacks;
		}, new Set<string>()).size;

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day, 'example.1.txt'), runner)}`))(); // 479 ~1.22ms
}

import { bench, read } from '@lib';
import { Vec2 } from '@lib/model';
import { day, year } from '.';
import { hexagonalAxialDirections, parse } from './parse.function';

const getHexNeighbours = (v: Vec2): Vec2[] => {
	return Object.values(hexagonalAxialDirections).map((h) => h.clone().addMut(v));
};

/**
 * TODO: Fix, not working (I think it would be slow anyway)
 */
export const runner = (input: string): number => {
	const blacks = parse(input)
		.map((ttf) =>
			ttf
				.reduce((acc, a) => acc.addMut(hexagonalAxialDirections[a]), Vec2.ORIGIN.clone())
				.toString()
		)
		.reduce((blacks, toFlip) => {
			blacks.flip(toFlip.toString());
			return blacks;
		}, new Set<string>());

	console.log('bn', blacks.size);

	for (let i = 0; i < 10; i++) {
		const blackVecs = [...blacks.values()].map((b) => new Vec2(b));
		const whites = blackVecs.flatMap(getHexNeighbours).filter((w) => !blacks.has(w.toString()));

		const toFlipBlacks = blackVecs.filter((bv) => {
			const bn = getHexNeighbours(bv).count((s) => blacks.has(s.toString()));
			return bn === 0 || bn > 2;
		});

		const toFlipWhites = whites.filter((wv) => {
			const bn = getHexNeighbours(wv).count((s) => blacks.has(s.toString()));
			return bn === 2;
		});

		for (const item of toFlipBlacks) {
			blacks.flip(item.toString());
		}
		for (const item of toFlipWhites) {
			blacks.flip(item.toString());
		}
		console.log('bn', blacks.size);
	}

	return blacks.size;
};
// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day, 'example.1.txt'), runner)}`))(); // 265 ~0.3ms
}

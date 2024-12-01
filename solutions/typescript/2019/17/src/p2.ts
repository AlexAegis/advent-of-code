/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IntCodeComputer } from '@alexaegis/advent-of-code-intcode';
import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { computeMap, parse, Tile } from './parse.js';

export enum MovementFunction {
	A = 'A',
	B = 'B',
	C = 'C',
}

export enum Turn {
	LEFT = 'L',
	RIGHT = 'R',
}

export const getFullPath = (input: string): string[] => {
	const [map, vacuum] = computeMap(input);
	const path: (Turn | string)[] = [];
	let steps = 0;
	for (;;) {
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
				path.push(Turn.LEFT);
				steps = 0;
			} else if (!hasRight && hasLeft) {
				vacuum.dir = vacuum.dir.left();
				if (steps) {
					path.push(steps.toString());
				}
				path.push(Turn.RIGHT);
				steps = 0;
			} else {
				vacuum.pos.addMut(vacuum.dir);
				if (steps) {
					path.push(steps.toString());
				}
				break;
			}
		}
	}

	return path;
};

export const compress = (
	fragments: string[],
	prevRes: string[] = [],
	maxDepth = 3,
): string[] | undefined => {
	const maxLen = 20;
	if (maxDepth <= 0) {
		return undefined;
	}
	if (
		fragments.length > 0 &&
		fragments.every((fragment) => fragment.length < maxLen && fragment === fragments[0])
	) {
		return [fragments[0]!];
	}
	for (let w = 6; w < maxLen; w++) {
		const c = fragments[0]!.slice(0, Math.max(0, w));
		const f = fragments.flatMap((fragment) => fragment.split(c)).filter((fr) => !!fr);
		const result = compress(f, prevRes, maxDepth - 1);
		if (result) {
			return [c, ...result];
		}
	}
	return undefined;
};

const encode = (s: string): number[] => {
	let r = s;
	if (s.endsWith(',')) {
		r = s.slice(0, Math.max(0, s.length - 1));
	}
	r = r + '\n';
	return [...r].map((c) => c.codePointAt(0) ?? 0);
};

export const p2 =
	(video = false) =>
	(input: string): number => {
		const intCode = new IntCodeComputer(parse(input));
		intCode.tape.set(0, 2);
		const fullPath = getFullPath(input);
		let main = fullPath.join(',') + ',';
		const r = compress([main]);
		if (r) {
			for (const [i, fr] of r.entries())
				main = main.replaceAll(new RegExp(fr, 'gi'), String.fromCodePoint(65 + i) + ',');

			intCode.pushInput(...encode(main));
			for (const fn of r) intCode.pushInput(...encode(fn));
			intCode.pushInput((video ? 'y' : 'n').codePointAt(0) ?? 0);
			intCode.pushInput('\n'.codePointAt(0) ?? 9);

			let row = '';
			for (const o of intCode.iter()) {
				const s = String.fromCodePoint(o);
				if (s === '\n') {
					if (video) {
						console.log(row);
					}
					row = '';
				} else if (o < 1000) {
					row += s;
				} else {
					return o;
				}
			}
		}
		return 0;
	};

await task(p2(false), packageJson.aoc); // 840248 ~110ms

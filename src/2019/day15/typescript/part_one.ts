import { bench, read } from '@lib';
import { IntCodeComputer } from '@lib/intcode';
import { Direction, Vec2 } from '@lib/model';
import { day, year } from '.';
import { GridGraph, GridGraphNode } from './graph.class';
import { draw, getMove, Status, Tile } from './meta';
import { parse } from './parse';

export const runner = (print = false) => (input: string) => {
	const i = new IntCodeComputer(parse(input));
	const it = i.iter();
	const p = Vec2.ORIGO.clone();
	const map = new Map<string, Tile>();
	map.set(Vec2.ORIGO.toString(), Tile.DROID);
	const g = new GridGraph();

	const res = g.search(
		[new GridGraphNode(Vec2.ORIGO.clone(), Tile.EMPTY)],
		(dir: Direction) => {
			i.pushInput(getMove(dir));
			const s: Status = it.next().value;
			if (s === Status.FINISHED) {
				console.log('!!!!!!!!!!!!!!!!! FINISHED');
			}
			if (print) {
				if (s === Status.WALL) {
					map.set(p.add(dir).toString(), Tile.WALL);
				} else {
					map.set(p.toString(), Tile.EMPTY);
					p.addMut(dir);
					map.set(p.toString(), s === Status.MOVED ? Tile.DROID : Tile.OXY);
				}
				draw(map);
			}

			return s;
		},
		t => t === Tile.OXY
	);

	return res?.pos.toString();
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner(true))}`))(); // 0 ~0ms
}

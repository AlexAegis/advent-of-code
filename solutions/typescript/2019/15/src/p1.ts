import { benchTask } from '@alexaegis/advent-of-code-lib';
// import { IntCodeComputer } from '@alexaegis/advent-of-code-lib/intcode';
import { Direction, Vec2 } from '@alexaegis/advent-of-code-lib/model';
import { GridGraph, GridGraphNode } from './graph.class.js';
import { draw, Status, Tile } from './meta.js';
// import { parse } from './parse';
import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p1 =
	(print = false) =>
	(_input: string): string => {
		// const i = new IntCodeComputer(parse(input));
		// const it = i.iter();

		const startVec = new Vec2(1, 1);
		const p = startVec.clone();
		const map = new Map<string, Tile>();
		map.set(startVec.toString(), Tile.DROID);
		const g = new GridGraph();

		const start = new GridGraphNode(startVec.clone(), Tile.EMPTY);

		const maze = [
			['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
		];
		maze.push(['#', '.', '#', '#', '.', '.', '.', '.', '.', '#', '.', '.', '.', '#', '.', '#']);
		maze.push(['#', '.', '.', '#', '.', '#', '#', '#', '.', '.', '.', '#', '.', '#', '.', '#']);
		maze.push(['#', '#', '.', '#', '.', '.', '.', '#', '#', '.', '#', '.', '.', '#', '.', '#']);
		maze.push(['#', '.', '.', '.', '.', '#', '.', '#', '.', '.', '#', '.', '#', '.', '.', '#']);
		maze.push(['#', '.', '#', '.', '#', '.', '.', '#', '#', '#', '#', '#', '.', '#', '.', '#']);
		maze.push(['#', '.', '#', '#', '#', '.', '#', '#', '.', '.', '.', '.', '.', '.', '.', '#']);
		maze.push(['#', '.', '.', '.', '#', '#', '#', '.', '.', '#', '.', '#', '.', '#', '#', '#']);
		maze.push(['#', '.', '#', '.', '#', '.', '.', '.', '#', '#', '.', '#', '.', '#', '.', '#']);
		maze.push(['#', '.', '#', '.', '#', '.', '#', '#', '.', '.', '#', '.', '.', '.', '.', '#']);
		maze.push(['#', '.', '#', '.', '#', '.', '.', '.', '#', '.', '#', '#', '.', '#', '#', '#']);
		maze.push(['#', '.', '#', '#', '#', '#', '#', '.', '.', '.', '#', '.', '.', '.', '.', '#']);
		maze.push(['#', '.', '.', '.', '.', '.', '#', '#', '#', '.', '#', '.', '#', '#', '.', '#']);
		maze.push(['#', '#', '#', '.', '#', '.', '#', '.', '#', '.', '#', '.', '#', '.', '.', '#']);
		maze.push(['#', '.', '.', '.', '#', '.', '.', '.', '.', '.', '#', '.', '.', '#', '.', 'O']);
		maze.push(['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#']);

		const res = g.recSearch(
			[start],
			(dir: Direction) => {
				const nextP = p.add(dir);
				const nextTile = maze[nextP.x][nextP.y];
				const s: Status =
					nextTile === Tile.WALL
						? Status.WALL
						: nextTile === Tile.OXY
						? Status.FINISHED
						: Status.MOVED;
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
			(t) => t === Tile.OXY
		);

		return JSON.stringify(res);
	};

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1(true), resources)}`); // '.' ~'.'ms
}

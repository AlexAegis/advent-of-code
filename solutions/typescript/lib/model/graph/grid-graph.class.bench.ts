import { defaultBench } from '@lib/benchmark';
import { add } from 'benny';
import { GridGraph } from '.';
import { Vec2 } from '..';
import { Direction } from '../direction.class';

const mazeStr = `#############
#..##.....#.#
#.#.#.....#.#
#.#.#...#.#.#
#.#.#..#..#.#
#...#.##....#
#...#..#.####
#...#..#....#
#...#..#.##.#
#...#..#..#.#
#......##.#.#
#......#..#.#
#......#..#.#
#############`;

const graph = GridGraph.fromString(mazeStr, {
	connectionDirections: Direction.allDirections,
});
graph.print();
const start = graph.getNode(new Vec2(1, 1))!;
const goal = graph.getNode(new Vec2(11, 12))!;
const p = graph.aStar(start, goal, { weigther: (a, b) => a.p.dist(b.p) });
console.log(graph.toString(p));

defaultBench(
	'Grid Graph',
	add('Dijkstra', () => graph.dijkstra(start, goal)),
	add('Astar', () => graph.aStar(start, goal, { weigther: (a, g) => a.p.dist(g.p) })),
	add('Astar h2', () => graph.aStar(start, goal, { weigther: (a, g) => 140 - a.p.dist(g.p) }))
);

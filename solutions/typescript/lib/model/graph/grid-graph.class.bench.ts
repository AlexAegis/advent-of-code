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
const p = graph.aStar(start, goal, { weighter: (a, b) => a.coordinate.dist(b.coordinate) });
console.log(graph.toString(p));

defaultBench(
	'Grid Graph',
	add('Dijkstra', () => graph.dijkstra(start, goal)),
	add('Astar', () =>
		graph.aStar(start, goal, { weighter: (a, g) => a.coordinate.dist(g.coordinate) })
	),
	add('Astar h2', () =>
		graph.aStar(start, goal, { weighter: (a, g) => 140 - a.coordinate.dist(g.coordinate) })
	)
);

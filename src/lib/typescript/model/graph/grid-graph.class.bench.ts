import { defaultBench } from '@lib/benchmark';
import { add } from 'benny';
import { Vec2 } from '..';
import { Direction } from '../direction.class';
import { GridGraph } from './grid-graph.class';

const matrix = [
	['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
	['#', '.', '.', '#', '#', '.', '.', '.', '.', '.', '#', '.', '#'],
	['#', '.', '#', '.', '#', '.', '.', '.', '.', '.', '#', '.', '#'],
	['#', '.', '#', '.', '#', '.', '.', '.', '#', '.', '#', '.', '#'],
	['#', '.', '#', '.', '#', '.', '.', '#', '.', '.', '#', '.', '#'],
	['#', '.', '.', '.', '#', '.', '#', '#', '.', '.', '.', '.', '#'],
	['#', '.', '.', '.', '#', '.', '.', '#', '.', '#', '#', '#', '#'],
	['#', '.', '.', '.', '#', '.', '.', '#', '.', '.', '.', '.', '#'],
	['#', '.', '.', '.', '#', '.', '.', '#', '.', '#', '#', '.', '#'],
	['#', '.', '.', '.', '#', '.', '.', '#', '.', '.', '#', '.', '#'],
	['#', '.', '.', '.', '.', '.', '.', '#', '#', '.', '#', '.', '#'],
	['#', '.', '.', '.', '.', '.', '.', '#', '.', '.', '#', '.', '#'],
	['#', '.', '.', '.', '.', '.', '.', '#', '.', '.', '#', '.', '#'],
	['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
];

const g = GridGraph.fromMatrix(matrix, {
	connectionDirections: Direction.directions,
});
const start = g.nodes.get(new Vec2(1, 1).toString())!;
const goal = g.nodes.get(new Vec2(11, 12).toString())!;

const p = g.aStar(start, goal, (a, g) => a.p.dist(g.p));
console.log(g.toString(p));

defaultBench(
	'Grid Graph',
	add('Dijkstra', () => g.dijkstra(start, goal)),
	add('Astar', () => g.aStar(start, goal, (a, g) => a.p.dist(g.p))),
	add('Astar h2', () => g.aStar(start, goal, (a, g) => 140 - a.p.dist(g.p)))
);

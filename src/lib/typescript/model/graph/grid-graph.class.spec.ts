import { printMatrix } from '@lib/functions';
import { Vec2 } from '..';
import { GridGraph } from './grid-graph.class';
/*
describe('Grid Graph', () => {
	const matrix = [
		['#', '#', '#', '#', '#', '#', '#'],
		['#', '.', '.', '#', '.', '.', '#'],
		['#', '.', '#', '.', '.', '.', '#'],
		['#', '.', '.', '.', '#', '.', '#'],
		['#', '.', '.', '.', '#', '.', '#'],
		['#', '#', '#', '#', '#', '#', '#'],
	];
	it('should be able to generate a graph from a matrix', () => {
		const g = GridGraph.fromMatrix(matrix);
	});
});*/

const matrix = [
	['#', '#', '#', '#', '#', '#', '#'],
	['#', '.', '.', '#', '.', '.', '#'],
	['#', '.', '#', '.', '.', '.', '#'],
	['#', '.', '.', '.', '#', '.', '#'],
	['#', '.', '.', '.', '#', '.', '#'],
	['#', '#', '#', '#', '#', '#', '#'],
];
const g = GridGraph.fromMatrix(matrix, (a, b) => {
	return a.value !== b.value ? 43 : 1;
});
const start = g.nodes.get(new Vec2(1, 1).toString())!;
const goal = g.nodes.get(new Vec2(5, 4).toString())!;
console.log(start.p, goal.p);
const d = g.dijkstra(start, goal);
console.log(g.toString());
console.log(d.length);

console.log(printMatrix(matrix));
for (const item of d) {
	console.log(item.p.toString());
	matrix[item.p.y][item.p.x] = 'O';
}
console.log(printMatrix(matrix));

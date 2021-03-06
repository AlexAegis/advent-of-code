import { expect } from 'chai';
import { Direction } from '../direction.class';
import { Vec2 } from '../vec2.class';
import { GridGraph } from './grid-graph.class';

describe('Grid Graph', () => {
	const matrix = [
		['#', '#', '#', '#', '#', '#', '#'],
		['#', '.', '.', '#', '.', '.', '#'],
		['#', '.', '#', '.', '.', '.', '#'],
		['#', '.', '.', '.', '#', '.', '#'],
		['#', '.', '.', '.', '#', '.', '#'],
		['#', '#', '#', '#', '#', '#', '#'],
	];
	const start = new Vec2(1, 1);
	const finish = new Vec2(5, 4);
	it('should be able to generate a graph from a matrix', () => {
		const g = GridGraph.fromMatrix(matrix);
		expect([...g.nodes.values()].length).to.equal(matrix.length * matrix[0].length);
	});

	describe('Dijkstra', () => {
		it('should find the shortest path', () => {
			const g = GridGraph.fromMatrix(matrix);
			const path = g.dijkstra(g.getNode(start), g.getNode(finish));
			expect(path.length).to.equal(10);
		});

		it('should find the shortest path with diagonal connections', () => {
			const g = GridGraph.fromMatrix(matrix, { connectionDirections: Direction.directions });
			const path = g.dijkstra(g.getNode(start), g.getNode(finish));
			expect(path.length).to.equal(6);
		});
	});

	describe('A-Star', () => {
		it('should find the shortest path', () => {
			const g = GridGraph.fromMatrix(matrix);
			const goal = g.getNode(finish)!;
			const path = g.aStar(g.getNode(start), goal, {
				heuristic: (a) => a.p.manhattan(goal.p),
			});
			expect(path.length).to.equal(10);
		});

		it('should find the shortest path with diagonal connections', () => {
			const g = GridGraph.fromMatrix(matrix, { connectionDirections: Direction.directions });
			const goal = g.getNode(finish)!;
			const path = g.aStar(g.getNode(start), goal, {
				heuristic: (a) => a.p.manhattan(goal.p),
			});
			expect(path.length).to.equal(6);
		});
	});
});

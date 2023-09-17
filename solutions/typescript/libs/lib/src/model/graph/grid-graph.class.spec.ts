/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { describe, expect, it } from 'vitest';
import { Direction } from '../direction/direction.class.js';
import { Vec2 } from '../vector/vec2.class.js';
import { GridGraph } from './grid-graph.class.js';

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
		expect([...g.nodes.values()].length).toEqual(matrix.length * (matrix[0]?.length ?? 0));
	});

	describe('Dijkstra', () => {
		it('should find the shortest path', () => {
			const g = GridGraph.fromMatrix(matrix);
			const path = g.dijkstra(g.getNode(start), g.getNode(finish));
			expect(path.length).toEqual(10);
		});

		it('should find the shortest path with diagonal connections', () => {
			const g = GridGraph.fromMatrix(matrix, {
				connectionDirections: Direction.allDirections,
			});
			const path = g.dijkstra(g.getNode(start), g.getNode(finish));
			expect(path.length).toEqual(6);
		});
	});

	describe('A-Star', () => {
		it('should find the shortest path', () => {
			const g = GridGraph.fromMatrix(matrix);
			const goal = g.getNode(finish)!;
			const path = g.aStar(g.getNode(start), goal, {
				heuristic: (a) => a.coordinate.manhattan(goal.coordinate),
			});
			expect(path.length).toEqual(10);
		});

		it('should find the shortest path with diagonal connections', () => {
			const g = GridGraph.fromMatrix(matrix, {
				connectionDirections: Direction.allDirections,
			});
			const goal = g.getNode(finish)!;
			const path = g.aStar(g.getNode(start), goal, {
				heuristic: (a) => a.coordinate.manhattan(goal.coordinate),
			});
			expect(path.length).toEqual(6);
		});
	});
});

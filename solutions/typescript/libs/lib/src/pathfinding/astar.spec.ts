/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { describe, expect, it } from 'vitest';
import { Direction } from '../model/direction/direction.class.js';
import { GridGraph } from '../model/graph/grid-graph.class.js';
import { Vec2 } from '../model/vector/vec2.class.js';
import { aStar } from './astar.js';

describe('A Star', () => {
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

	it('should find the shortest path', () => {
		const g = GridGraph.fromMatrix(matrix);
		const goal = g.getNode(finish)!;
		const { path } = g.aStar({
			start: g.getNode(start)!,
			end: goal,
			heuristic: (a) => a.coordinate.manhattan(goal.coordinate),
		});
		expect(path.length).toEqual(10);
	});

	it('should find the shortest path with diagonal connections', () => {
		const g = GridGraph.fromMatrix(matrix, {
			connectionDirections: Direction.allDirections,
		});
		const goal = g.getNode(finish)!;
		const { path } = aStar({
			allNodes: g.nodes,
			start: g.getNode(start)!,
			end: goal,
			heuristic: (a) => a.coordinate.manhattan(goal.coordinate),
		});
		expect(path.length).toEqual(6);
	});
});

import { Heuristic } from './heuristic.type';
import { Node } from './node.class';

export class Graph<T = string, N extends Node<T> = Node<T>> {
	public nodeMap = new Map<string, N>();

	public dijkstra(_start: N, _goal: N): void {
		// for (let _neighbour of start.neighbours) {
		// 	neighbour
		// }
	}

	public aStar(_start: N, _goal: N, _h: Heuristic<T>): void {
		console.log('TODO');
	}
}

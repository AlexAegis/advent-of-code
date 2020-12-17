import { Heuristic } from './heuristic.type';
import { Node } from './node.class';
import { Vertice } from './vertice.type';

export class Graph<T = string, N extends Node<T> = Node<T>> {
	public nodes = new Map<string, N>();
	public vertices = new Set<Vertice<N>>();

	public dijkstra(start: N | undefined, target: N | undefined, _doFull = false): N[] {
		if (!start || !target) {
			return [];
		}
		const q = new Set<N>(this.nodes.values());

		const dist = new Map<N, number>();
		const prev = new Map<N, N>();
		dist.set(start, 0);

		while (q.size) {
			// refactor this to a prio queue
			const umin = [...q.values()].reduce(
				(acc, b) => {
					const u = dist.get(b) ?? Infinity;
					if (!acc.node || u < acc.dist) {
						acc.node = b;
						acc.dist = dist.get(b) ?? Infinity;
					}
					return acc;
				},
				{ node: undefined as N | undefined, dist: Infinity }
			);
			const u = umin.node!;
			if (u === target) {
				break;
			}
			q.delete(u);

			for (const neighbour of u) {
				const alt = umin.dist + (neighbour.weight ?? 1);
				if (alt < (dist.get(neighbour.to) ?? Infinity)) {
					dist.set(neighbour.to, alt);
					prev.set(neighbour.to, u);
				}
			}
		}

		const s: N[] = [];
		let u: N | undefined = target;
		if (start === u || prev.get(u)) {
			while (u) {
				s.unshift(u);
				u = prev.get(u);
			}
		}

		return s;
	}

	/**
	 *
	 * @param start
	 * @param goal
	 * @param h global heuristic function. Should return a monotone value for
	 * better nodes
	 */
	public aStar(start: N | undefined, goal: N | undefined, h: Heuristic<N>, recalc = false): N[] {
		if (!start || !goal) {
			return [];
		}

		const openSet = new Set<N>([start]); // q?
		const cameFrom = new Map<N, N>(); // prev!
		const gScore = new Map<N, number>(); // dist! Infinity
		gScore.set(start, 0);

		const fScore = new Map<N, number>(); // Infinity
		fScore.set(start, h(start, goal));

		while (openSet.size) {
			const umin = [...openSet.values()].reduce(
				(acc, b) => {
					const u = fScore.get(b) ?? Infinity;
					if (!acc.node || u < acc.dist) {
						acc.node = b;
						acc.dist = fScore.get(b) ?? Infinity;
					}
					return acc;
				},
				{ node: undefined as N | undefined, dist: Infinity }
			);
			const current = umin.node!;
			if (current === goal) {
				break;
			}
			openSet.delete(current);

			for (const neighbour of current) {
				const tentativegScore =
					(gScore.get(current) ?? Infinity) +
					(recalc && neighbour.weighter ? neighbour.weighter() : neighbour.weight ?? 1);
				if (tentativegScore < (gScore.get(neighbour.to) ?? Infinity)) {
					cameFrom.set(neighbour.to, current);
					gScore.set(neighbour.to, tentativegScore);
					fScore.set(neighbour.to, tentativegScore + h(neighbour.to, goal));
					if (!openSet.has(neighbour.to)) {
						openSet.add(neighbour.to);
					}
				}
			}
		}

		const s: N[] = [];
		let u: N | undefined = goal;
		if (start === u || cameFrom.get(u)) {
			while (u) {
				s.unshift(u);
				u = cameFrom.get(u);
			}
		}

		return s;
	}
}

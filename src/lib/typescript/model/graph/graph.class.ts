import { Heuristic } from './heuristic.type';
import { Node } from './node.class';
import { Vertice } from './vertice.type';

export class Graph<T = string, N extends Node<T> = Node<T>> {
	public nodes = new Map<string, N>();
	public vertices = new Set<Vertice<N>>();

	public dijkstra(start: N, target: N, _doFull = false): N[] {
		const q = new Set<N>(this.nodes.values());

		const dist = new Map<N, number>();
		const prev = new Map<N, N>();
		dist.set(start, 0);

		while (q.size) {
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
			q.delete(u);
			if (u === target) {
				break;
			}

			for (const neighbour of u) {
				const alt = umin.dist + (neighbour.data ?? 1);
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

	public aStar(_start: N, _goal: N, _h: Heuristic<T>): void {
		console.log('TODO');
	}
}

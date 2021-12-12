import { Direction } from '../direction.class';
import { ToString } from '../to-string.interface';
import { Heuristic, Weighter } from './heuristic.type';
import { Node } from './node.class';
import { Vertice } from './vertice.type';

export interface GraphTraversalOptions<N> {
	/**
	 * When traversing a vertice that doesn't have a node at it's end, how to
	 * generate it? By default it always generates an `undefined` meaning
	 * by default no new nodes will be created and the graph is treated as
	 * complete
	 */
	// generateNode?: (graph: Graph<N>, path: Map<N, N>) => N | undefined;
	verticeGenerator?: (nodeMap: Map<string, N>, from: N, path: N[]) => Generator<Vertice<N>>;
	heuristic?: Heuristic<N>;
	weigther?: Weighter<N>;
	recalc?: boolean; // evaluate need
}

export class Graph<
	T = string,
	Dir extends ToString = Direction,
	N extends Node<T, Dir> = Node<T, Dir>
> {
	public nodes = new Map<string, N>();
	public vertices = new Set<Vertice<N>>();

	private static generatePath<T, Dir extends ToString, N extends Node<T, Dir>>(
		cameFrom: Map<N, N>,
		start: N,
		goal?: N
	): N[] {
		const s: N[] = [];
		if (goal) {
			let u: N | undefined = goal;
			if (start === u || cameFrom.get(u)) {
				while (u) {
					s.unshift(u);
					u = cameFrom.get(u);
				}
			}
		}
		return s;
	}

	public get size(): number {
		return this.nodes.size;
	}

	public forEach(callbackFn: (node: N) => void): void {
		this.nodes.forEach(callbackFn);
	}

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
	 * @param end
	 * @param h global heuristic function. Should return a monotone value for
	 * better nodes
	 */
	public aStar(
		start: N | undefined,
		end: N | ((n: N, path: N[]) => boolean) | undefined,
		options?: GraphTraversalOptions<N>
	): N[] {
		if (!start || !end) {
			return [];
		}

		const openSet = new Set<N>([start]); // q?
		const cameFrom = new Map<N, N>(); // prev!
		const gScore = new Map<N, number>(); // dist! Infinity

		const h = options?.heuristic ?? (() => 1);
		// const weighter = options?.weigther ?? (() => 1);
		const recalc = options?.recalc ?? false;
		const isFinished = typeof end === 'function' ? end : (n: N, _path: N[]) => n === end;
		// const generateNode = options?.generateNode ?? (() => undefined);

		gScore.set(start, 0);

		const fScore = new Map<N, number>(); // Infinity
		fScore.set(start, h(start, cameFrom));

		let goal: N | undefined;

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
			const current = umin.node as N;

			const currentPath = Graph.generatePath(cameFrom, start, current);

			if (isFinished(current, currentPath)) {
				goal = current;
				break;
			}
			openSet.delete(current);

			for (const neighbour of options?.verticeGenerator?.(this.nodes, current, currentPath) ??
				current) {
				const tentativegScore =
					(gScore.get(current) ?? Infinity) +
					(recalc && neighbour.weighter ? neighbour.weighter() : neighbour.weight ?? 1);
				if (tentativegScore < (gScore.get(neighbour.to) ?? Infinity)) {
					cameFrom.set(neighbour.to, current);
					gScore.set(neighbour.to, tentativegScore);
					fScore.set(neighbour.to, tentativegScore + h(neighbour.to, cameFrom));
					if (!openSet.has(neighbour.to)) {
						openSet.add(neighbour.to);
					}
				}
			}
		}

		return Graph.generatePath(cameFrom, start, goal);
	}
}

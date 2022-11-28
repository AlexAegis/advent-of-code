import type { Node } from './node.class.js';
import type { Vertice } from './vertice.class.js';

export interface Graph {
	nodes: Node[];
	vertices: Vertice[];
}

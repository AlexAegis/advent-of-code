import type { Edge } from './edge.class.js';
import type { Node } from './node.class.js';

export interface Graph {
	nodes: Node[];
	edges: Edge[];
}

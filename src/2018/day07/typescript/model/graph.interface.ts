import { Node } from './node.class';
import { Vertice } from './vertice.class';

export interface Graph {
	workers: number;
	nodes: Array<Node>;
	vertices: Array<Vertice>;
}

import { bench, read, split } from '@root';
import { day, year } from '.';

interface Graph {
	nodes: string[];
	vertices: Array<{ from: string; to: string }>;
}

const interpret = async (input: string) => {
	const graph: Graph = { nodes: [], vertices: [] };

	for (const line of split(input)) {
		const splitLine: string[] = line.split(/ /);
		if (!graph.nodes.find(node => node === splitLine[1])) {
			graph.nodes.push(splitLine[1]);
		}
		if (!graph.nodes.find(node => node === splitLine[7])) {
			graph.nodes.push(splitLine[7]);
		}
		graph.vertices.push({ from: splitLine[1], to: splitLine[7] });
	}
	return graph;
};

export const runner = async (input: string): Promise<string> => {
	const graph: Graph = await interpret(input);
	const unprocessedNodes = graph.nodes.sort((a, b) => {
		if (a === b) {
			return 0;
		} else {
			return a > b ? 1 : -1;
		}
	});
	let unprocessedVertices = graph.vertices.sort((a, b) => {
		if (a.from === b.from) {
			if (a.to === b.to) {
				return 0;
			} else {
				return a.to > b.to ? 1 : -1;
			}
		} else {
			return a.from > b.from ? 1 : -1;
		}
	});
	const result: string[] = [];
	while (unprocessedNodes.length !== 0) {
		for (const node of unprocessedNodes) {
			if (unprocessedVertices.filter(vertice => vertice.to === node).length === 0) {
				unprocessedNodes.splice(unprocessedNodes.indexOf(node), 1);
				unprocessedVertices = unprocessedVertices.filter(vertice => vertice.from !== node);
				result.push(node);
				break;
			}
		}
	}
	return result.join('');
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // GRTAHKLQVYWXMUBCZPIJFEDNSO ~1ms
}

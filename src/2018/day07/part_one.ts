import { createReadStream } from 'fs';
import * as rl from 'readline';

interface Graph {
	nodes: Array<string>;
	vertices: Array<{ from: string; to: string }>;
}

const reader = async (input: 'input' | 'example' = 'input') =>
	new Promise<Graph>(res => {
		let graph: Graph = { nodes: [], vertices: [] };

		rl.createInterface({
			input: createReadStream(`src/2018/day07/${input}.txt`)
		})
			.on('line', line => {
				let splitLine: Array<string> = line.split(/ /);
				if (!graph.nodes.find(node => node === splitLine[1])) {
					graph.nodes.push(splitLine[1]);
				}
				if (!graph.nodes.find(node => node === splitLine[7])) {
					graph.nodes.push(splitLine[7]);
				}
				graph.vertices.push({ from: splitLine[1], to: splitLine[7] });
			})
			.on('close', () => res(graph));
	});

export const runner = async (input: 'input' | 'example' = 'input') => {
	const graph: Graph = await reader(input);
	let unprocessedNodes = graph.nodes.sort((a, b) => {
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
	const result: Array<string> = [];
	while (unprocessedNodes.length !== 0) {
		for (let node of unprocessedNodes) {
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

if (require.main == module) {
	console.time();
	(async () => {
		console.log(`Result: ${await runner()}`);
		console.timeEnd();
	})(); // GRTAHKLQVYWXMUBCZPIJFEDNSO ~9ms
}

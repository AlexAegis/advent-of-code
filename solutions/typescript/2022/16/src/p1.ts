import { Graph, GraphNode, memoize, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { parse, type Valve } from './parse.function.js';

const TIME_LIMIT = 30;

const pathBetweenValves = memoize(
	(
		fromValve: string,
		toValve: string,
		graph: Graph<Valve, string>
	): GraphNode<Valve, string>[] => {
		const from = graph.getNode(fromValve);
		const to = graph.getNode(toValve);
		return graph.aStar(from, to);
	}
);

/**
 * A valves score is how much pressure it will release until min30, if we start
 * go there now. (So (30 - currentMin - distance) * flowRate
 *
 * Well, this is at most a heuristic
 */
const scoreValve = (
	currentTime: number,
	openableValvesAfterThis: Valve[],
	openValves: Valve[],
	fromValve: Valve,
	toValve: Valve,
	graph: Graph<Valve, string>,
	depth = 0
): number => {
	if (depth === 0) {
		return 0;
	} else {
		const nextPath = pathBetweenValves(fromValve.name, toValve.name, graph);
		const nextTarget = nextPath.last();
		const distance = nextPath.length - 1;

		const cumulative =
			highestScoreValve(
				currentTime + distance + 1,
				nextTarget.value,
				openValves,
				openableValvesAfterThis,
				graph,
				depth - 1
			)?.score ?? 0;
		// for each unopened worthvile - the fromtarget

		return cumulative + (TIME_LIMIT - currentTime - distance) * toValve.flowRate;
	}
};

const highestScoreValve = (
	currentTime: number,
	fromValve: Valve,
	openValves: Valve[],
	valves: Valve[],
	graph: Graph<Valve, string>,
	depth: number
): { valve: Valve; score: number } | undefined => {
	const openableValves = valves.filter(
		(valve) => valve.flowRate > 0 && !openValves.includes(valve)
	);
	const valvesSortedByScore = openableValves
		.map((valve) => ({
			valve,
			score: scoreValve(
				currentTime,
				openableValves.filter((v) => v !== valve),
				[...openValves, valve],
				fromValve,
				valve,
				graph,
				depth
			),
		}))
		.sort((a, b) => b.score - a.score);

	// console.log(
	// 	'valvesSortedByScore',
	// 	currentTime,
	// 	'from',
	// 	fromValve.name,
	// 	valvesSortedByScore.map((v) => v.valve.name + ': ' + v.score).join('; ')
	// );
	if (valvesSortedByScore.length) {
		return valvesSortedByScore[0];
	} else {
		return undefined;
	}
};

/***
 * Backtracking algorithm is needed
 */
export const p1 = (input: string): number => {
	const valves = parse(input);
	const graph = new Graph<Valve, string>();

	for (const valve of valves) {
		graph.nodes.set(valve.name, new GraphNode(valve.name, valve));
	}

	for (const valve of valves) {
		const from = graph.nodes.get(valve.name)!;
		for (const lead of valve.leadsTo) {
			const to = graph.nodes.get(lead)!;
			from.neighbours.set(lead, { from, to, weight: 0 });
		}
	}

	let pressureReleasedSoFar = 0;
	const valvesWorthOpening = valves.filter((valve) => valve.flowRate > 0);
	const openedValves: Valve[] = [];
	let movingAlongPath: Valve[] | undefined = undefined;
	let currentlyAtValve: Valve = valves.find((valve) => valve.name === 'AA')!; // Start at AA
	let targetValve: Valve | undefined = undefined;
	for (let i = 0; i < TIME_LIMIT; i++) {
		// calc pressure
		const pressureThisRound = openedValves.map((valve) => valve.flowRate).sum();
		pressureReleasedSoFar += pressureThisRound;
		console.log(`\n== Minute ${i + 1} ==`);
		if (openedValves.length) {
			console.log(
				`Valves ${openedValves
					.map((v) => v.name)
					.join(', ')} are open, releasing ${pressureThisRound} pressure.`
			);
		} else {
			console.log('No valves are open.');
		}

		if (!targetValve && openedValves.length < valvesWorthOpening.length) {
			targetValve = highestScoreValve(
				i,
				currentlyAtValve,
				openedValves,
				valves,
				graph,
				4
			)?.valve;

			if (targetValve) {
				console.log('TARGET', targetValve?.name);
				movingAlongPath = pathBetweenValves(
					currentlyAtValve.name,
					targetValve.name,
					graph
				).map((node) => node.value);
				movingAlongPath.shift()!; // get rid of starting value
			} else {
				throw new Error('Should still be able to find an opened valve and target it');
			}
		}
		if (movingAlongPath?.length) {
			currentlyAtValve = movingAlongPath.shift()!;
			console.log(`You move to valve ${currentlyAtValve.name}`);
		} else if (currentlyAtValve === targetValve && !openedValves.includes(currentlyAtValve)) {
			openedValves.push(currentlyAtValve);
			targetValve = undefined;
			console.log(`You open valve ${currentlyAtValve.name}`);
		}
	}
	return pressureReleasedSoFar;
};

await task(p1, packageJson.aoc); // 1580 ~0ms

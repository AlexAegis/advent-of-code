/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Graph, GraphNode, memoize, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { parse, type Valve } from './parse.function.js';

const TIME_LIMIT = 26;

const pathBetweenValves = memoize(
	(
		fromValve: string,
		toValve: string,
		graph: Graph<Valve, string>,
	): GraphNode<Valve, string>[] => {
		const start = graph.getNode(fromValve);
		const end = graph.getNode(toValve);
		if (start === undefined || end === undefined) {
			throw new Error('no start end endpoints are present');
		}
		return graph.aStar({ start, end }).path;
	},
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
	depth = 0,
	elephant: boolean,
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
				depth - 1,
				elephant,
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
	depth: number,
	elephant: boolean,
): { valve: Valve; score: number } | undefined => {
	const openableValves = valves.filter(
		(valve) => valve.flowRate > 0 && !openValves.includes(valve),
	);
	let valvesSortedByScore = openableValves
		.map((valve) => ({
			valve,
			score: scoreValve(
				currentTime,
				openableValves.filter((v) => v !== valve),
				[...openValves, valve],
				fromValve,
				valve,
				graph,
				depth,
				elephant,
			),
		}))
		.sort((a, b) => b.score - a.score);

	if (!elephant) {
		valvesSortedByScore = openableValves
			.map((valve) => ({
				valve,
				score: scoreValve(
					currentTime,
					openableValves.filter(
						(v) => v !== valve && v !== valvesSortedByScore[0]?.valve,
					),
					[...openValves, valve],
					fromValve,
					valve,
					graph,
					depth,
					elephant,
				),
			}))
			.sort((a, b) => b.score - a.score);
	}

	// console.log(
	// 	'valvesSortedByScore',
	// 	currentTime,
	// 	'from',
	// 	fromValve.name,
	// 	valvesSortedByScore.map((v) => v.valve.name + ': ' + v.score).join('; ')
	// );
	return valvesSortedByScore.length > 0 ? valvesSortedByScore[0] : undefined;
};

/***
 * Backtracking algorithm is needed
 */
export const p2 = (input: string): number => {
	const valves = parse(input);
	const graph = new Graph<Valve, string>();

	for (const valve of valves) {
		graph.nodes.set(valve.name, new GraphNode(valve.name, valve));
	}

	for (const valve of valves) {
		const from = graph.nodes.get(valve.name)!;
		for (const lead of valve.leadsTo) {
			const to = graph.nodes.get(lead)!;
			from.neighbours.set(lead, { from, to, weight: 0, direction: lead });
		}
	}

	let pressureReleasedSoFar = 0;
	const valvesWorthOpening = valves.filter((valve) => valve.flowRate > 0);
	const openedValves: Valve[] = [];
	let movingAlongPath: Valve[] | undefined = undefined;
	let currentlyAtValve: Valve = valves.find((valve) => valve.name === 'AA')!; // Start at AA
	let targetValve: Valve | undefined = undefined;

	let elephantMovingAlongPath: Valve[] | undefined = undefined;
	let elephantCurrentlyAtValve: Valve = valves.find((valve) => valve.name === 'AA')!; // Start at AA
	let elephantTargetValve: Valve | undefined = undefined;
	for (let i = 0; i < TIME_LIMIT; i++) {
		// calc pressure
		const pressureThisRound = openedValves.map((valve) => valve.flowRate).sum();
		pressureReleasedSoFar += pressureThisRound;
		console.log(`\n== Minute ${i + 1} ==`);
		if (openedValves.length > 0) {
			console.log(
				`Valves ${openedValves
					.map((v) => v.name)
					.join(', ')} are open, releasing ${pressureThisRound} pressure.`,
			);
		} else {
			console.log('No valves are open.');
		}

		if (!targetValve && openedValves.length < valvesWorthOpening.length) {
			targetValve = highestScoreValve(
				i,
				currentlyAtValve,
				openedValves,
				valves.filter((v) => v !== elephantTargetValve),
				graph,
				4,
				false,
			)?.valve;

			if (targetValve) {
				console.log('TARGET', targetValve.name);
				movingAlongPath = pathBetweenValves(
					currentlyAtValve.name,
					targetValve.name,
					graph,
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

		// ELEPHANT ZONE

		if (!elephantTargetValve && openedValves.length < valvesWorthOpening.length) {
			elephantTargetValve = highestScoreValve(
				i,
				elephantCurrentlyAtValve,
				openedValves,
				valves.filter((v) => v !== targetValve),
				graph,
				4,
				true,
			)?.valve;

			if (elephantTargetValve) {
				console.log('TARGET', elephantTargetValve.name);
				elephantMovingAlongPath = pathBetweenValves(
					elephantCurrentlyAtValve.name,
					elephantTargetValve.name,
					graph,
				).map((node) => node.value);
				elephantMovingAlongPath.shift()!; // get rid of starting value
			} else {
				throw new Error('Should still be able to find an opened valve and target it');
			}
		}
		if (elephantMovingAlongPath?.length) {
			elephantCurrentlyAtValve = elephantMovingAlongPath.shift()!;
			console.log(`The elephant moves to valve ${elephantCurrentlyAtValve.name}`);
		} else if (
			elephantCurrentlyAtValve === elephantTargetValve &&
			!openedValves.includes(elephantCurrentlyAtValve)
		) {
			openedValves.push(elephantCurrentlyAtValve);
			elephantTargetValve = undefined;
			console.log(`The elephant opens valve ${elephantCurrentlyAtValve.name}`);
		}
	}
	console.log('pressureReleasedSoFar', pressureReleasedSoFar);
	return 0;
	// return pressureReleasedSoFar;
};

await task(p2, packageJson.aoc, 'example.1.txt'); // 1580 ~0ms

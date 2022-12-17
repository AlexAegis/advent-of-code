import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parse, Valve } from './parse.function.js';

const OPEN = 'open';
const WAIT = 'wait';
type PathSegment = Valve | typeof OPEN | typeof WAIT;
type Path = PathSegment[];
type Node = {
	path: Path;
	pressureReleasedSoFar: number;
	openValves: Valve[];
	// edgesVisited: string[];
	/**
	 * Not worth going because in that direction everything is either opened
	 * or not worth opening
	 */
	forbiddenEdges: string[];
	forbiddenValves: string[];
};

const normalizeOption = (key: string, valveMap: Map<string, Valve>): PathSegment => {
	if (key === OPEN || key === WAIT) {
		return key;
	} else {
		return valveMap.get(key)!;
	}
};

const isValveSegment = (segment: PathSegment): segment is Valve => {
	return typeof segment === 'object';
};

const serializePath = (path: Path): string => {
	return path.map((segment) => (typeof segment === 'object' ? segment.name : segment)).join(',');
};
/***
 * Backtracking algorithm is needed
 */
export const p1 = (input: string): number => {
	const valves = parse(input);
	const valveMap = new Map<string, Valve>();
	for (const valve of valves) {
		valveMap.set(valve.name, valve);
	}

	const valvesWorthOpening = valves.filter((valve) => valve.flowRate > 0);

	/**
	 * This map contains edges where the keys are paths like "AA,open,CC,II,wait"
	 * To get the previous one, pop one off the path and calculate it's key
	 *
	 * To get destinations calculate it from the last path element
	 *
	 * Once the graph is filled filter out all paths that are marked as end
	 *
	 * And there's some other metadata specific to the task,
	 *
	 * graphSpace cache
	 */
	const solutionGraph = new Map<string, Node>();
	// Start at "AA"
	/**
	 * solutionSpace cache
	 */
	let currentSolution: Node | undefined = {
		path: [valveMap.get('AA')!],
		pressureReleasedSoFar: 0,
		openValves: [],
		forbiddenEdges: [],
		forbiddenValves: [],
	};
	solutionGraph.set('AA', currentSolution);

	const _expectedPathForExample =
		'AA,DD,open,CC,BB,open,AA,II,JJ,open,II,AA,DD,EE,FF,GG,HH,open,GG,FF,EE,open,DD,CC,open,wait,wait,wait...';

	let i = 0;
	console.log('ohboy');
	while (currentSolution) {
		const currentValve = currentSolution.path.findLast(isValveSegment)!;
		const currentPath = currentSolution.path;
		const currentPathSerialized = serializePath(currentSolution.path);
		const currentlyForbiddenEdges = currentSolution.forbiddenEdges;
		const currentlyForbiddenValves = currentSolution.forbiddenValves;

		i++;
		/**
		 *  &&
			currentPathSerialized.startsWith('AA,DD,open,CC,BB,open,AA,II,JJ,open,II,AA')
		 */
		if (
			i % 1 === 0 &&
			currentPathSerialized.startsWith('AA,DD,open,CC,BB,open,AA,II,JJ,open,II,AA')
		) {
			console.log(
				i,
				'Checking solution',
				currentPathSerialized,
				'time passed',
				currentSolution.path.length,
				'openValves',
				currentSolution.openValves.map((v) => v.name).join(','),
				'forbiddenEdges',
				currentSolution.forbiddenEdges.join('; '),
				'pressure released',
				currentSolution.pressureReleasedSoFar
			);
		}

		const nextOptions: string[] = [];

		// It's its worth opening and wasn't already opened this round, or this path wasnt tried
		if (
			currentValve.flowRate > 0 &&
			!currentSolution.openValves.has(currentValve) &&
			!solutionGraph.has(`${currentPathSerialized},${OPEN}`)
		) {
			nextOptions.push(OPEN);
		}

		const nextForbiddenValves = [...currentlyForbiddenValves];
		if (currentSolution.openValves.length === valvesWorthOpening.length) {
			// Everything is open, the only thing left is waiting
			nextOptions.push(WAIT);
		} else {
			const notCoveredValves = currentValve.leadsTo.filterMap((valveKey) => {
				const wouldBeSolution = `${currentPathSerialized},${valveKey}`;
				const graphAlreadyCoversSolution = solutionGraph.has(wouldBeSolution);

				if (!currentlyForbiddenValves.includes(valveKey) && !graphAlreadyCoversSolution) {
					return valveKey;
				} else {
					return undefined;
				}
			});

			const strictNotCoveredEdges = notCoveredValves.filter((valveKey) => {
				const wouldBeEdge = `${currentValve.name},${valveKey}`;
				return !currentPathSerialized.includes(wouldBeEdge);
			});

			if (strictNotCoveredEdges.length) {
				nextOptions.push(...strictNotCoveredEdges);
			} else if (notCoveredValves.length) {
				nextOptions.push(...notCoveredValves);
			} else {
				nextForbiddenValves.push(currentValve.name);
			}
		}

		if (currentPath.length > 30) {
			nextOptions.clear();
		}

		let backtrack = false;

		if (nextOptions.length) {
			// If there is somewhere to go, try the first option
			const nextOption = normalizeOption(nextOptions[0], valveMap);
			const nextPath = [...currentPath, nextOption];
			const nextPathSerialized = serializePath(nextPath);

			//if (isValveSegment(nextOption)) {
			//	const nextEdge = `${currentValve.name},${nextOption.name}`;
			//	// nextAlreadyWalked.push(nextEdge);
			//}

			// release pressure
			const releasedThisRound = currentSolution.openValves
				.map((valve) => valve.flowRate)
				.sum();

			const openValves = [...currentSolution.openValves];
			if (nextOption === OPEN && !openValves.includes(currentValve)) {
				openValves.push(currentValve);
			}

			if (!solutionGraph.has(nextPathSerialized)) {
				const nextSolution: Node = {
					path: nextPath,
					openValves,
					pressureReleasedSoFar:
						currentSolution.pressureReleasedSoFar + releasedThisRound,
					forbiddenEdges: currentlyForbiddenEdges,
					forbiddenValves: nextForbiddenValves,
				};
				solutionGraph.set(nextPathSerialized, nextSolution);
				currentSolution = nextSolution;
			} else {
				backtrack = true;
			}
		} else {
			backtrack = true;
		}

		if (backtrack) {
			// backtrack
			const prev = currentSolution.path.clone();
			prev.pop();
			const prevPathKey = serializePath(prev);
			// If we try to backtrack from the starting, 1 long path, we get an
			// empty key, currentNode gets set to undefined and the while loop breaks
			currentSolution = solutionGraph.get(prevPathKey);
		}
	}

	const finishedSolutions = solutionGraph
		.valueArray()
		.filter((solution) => solution.path.length > 30)
		.sort((a, b) => b.pressureReleasedSoFar - a.pressureReleasedSoFar);
	console.log('finishedSolutions', finishedSolutions.length);
	const solutionWithMostReleasedPressure = finishedSolutions[0];
	const serializedSolutionPath = serializePath(solutionWithMostReleasedPressure.path);
	console.log(
		'solutionWithMostReleasedPressure',
		serializedSolutionPath,
		'is it correct for the exmaple?',
		serializedSolutionPath.startsWith(_expectedPathForExample)
	);

	return finishedSolutions[0].pressureReleasedSoFar;
};

await task(p1, packageJson.aoc, 'example.1.txt'); // 0 ~0ms

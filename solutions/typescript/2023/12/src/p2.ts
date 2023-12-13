import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { parse, type SpringLog } from './parse.js';

interface State {
	rebuiltLog: string;
	currentCriteria: number;
	currentOriginalCriteria: number;
	remainingDamagedLog: string;
	remainingCriteria: number[];
}

const calculateVariations = (state: State, cache: Map<string, number>): number => {
	const key =
		state.remainingCriteria.join(',') +
		';' +
		state.remainingDamagedLog +
		';' +
		state.currentOriginalCriteria +
		';' +
		state.currentCriteria;

	const cachedResult = cache.get(key);
	if (cachedResult !== undefined) {
		return cachedResult;
	}

	let result = cachedResult ?? 0;

	while (state.currentCriteria > 0 && state.remainingDamagedLog.startsWith('#')) {
		state.currentCriteria = state.currentCriteria - 1;
		state.remainingDamagedLog = state.remainingDamagedLog.slice(1);
		state.rebuiltLog = state.rebuiltLog + '#';
	}

	if (
		state.currentCriteria === 0 &&
		state.remainingCriteria.length === 0 &&
		!state.remainingDamagedLog.includes('#')
	) {
		state.rebuiltLog += state.remainingDamagedLog.replaceAll('?', '.');
		return 1;
	}

	while (
		state.currentCriteria === state.currentOriginalCriteria &&
		state.remainingDamagedLog.startsWith('.')
	) {
		state.remainingDamagedLog = state.remainingDamagedLog.slice(1);
		state.rebuiltLog = state.rebuiltLog + '.';
	}

	if (state.currentCriteria > 0 && state.remainingDamagedLog.startsWith('.')) {
		return 0;
	}

	if (state.currentCriteria === 0 && state.remainingDamagedLog.startsWith('#')) {
		return 0;
	}

	if (
		state.currentCriteria === 0 &&
		(state.remainingDamagedLog.startsWith('.') || state.remainingDamagedLog.startsWith('?'))
	) {
		const nextCriteria = state.remainingCriteria.shift();

		if (nextCriteria === undefined) {
			state.currentOriginalCriteria = 0;
		} else {
			state.currentCriteria = nextCriteria;
			state.currentOriginalCriteria = nextCriteria;
		}

		state.rebuiltLog = state.rebuiltLog + '.';
		state.remainingDamagedLog = state.remainingDamagedLog.slice(1);
	}

	while (
		state.currentCriteria === state.currentOriginalCriteria &&
		state.remainingDamagedLog.startsWith('.')
	) {
		state.remainingDamagedLog = state.remainingDamagedLog.slice(1);
		state.rebuiltLog = state.rebuiltLog + '.';
	}

	if (
		state.currentCriteria === 0 &&
		state.remainingDamagedLog.length === 0 &&
		state.remainingCriteria.length === 0
	) {
		return 1;
	}

	if (state.remainingDamagedLog.startsWith('?')) {
		result += calculateVariations(
			{
				...state,
				remainingCriteria: [...state.remainingCriteria],
				remainingDamagedLog: '#' + state.remainingDamagedLog.slice(1),
			},
			cache,
		);

		result += calculateVariations(
			{
				...state,
				remainingCriteria: [...state.remainingCriteria],
				remainingDamagedLog: '.' + state.remainingDamagedLog.slice(1),
			},
			cache,
		);
	} else if (state.currentCriteria > 0 && state.remainingDamagedLog.length > 0) {
		result += calculateVariations(state, cache);
	}
	cache.set(key, result);
	return result;
};

const unfoldEntry =
	(times: number) =>
	(entry: SpringLog): SpringLog => ({
		...entry,
		log: Array.from({ length: times })
			.map(() => entry.log)
			.join('?'),
		criteria: Array.from({ length: times }).flatMap(() => entry.criteria),
	});

export const p2 = (input: string): number =>
	parse(input)
		.map(unfoldEntry(5))
		.map((entry) => {
			const [currentCriteria, ...remainingCriteria] = entry.criteria;
			if (!currentCriteria) {
				throw new Error('no criteria for line');
			}
			return calculateVariations(
				{
					currentCriteria,
					currentOriginalCriteria: currentCriteria,
					rebuiltLog: '',
					remainingCriteria,
					remainingDamagedLog: entry.log,
				},
				new Map(),
			);
		})
		.sum();

await task(p2, packageJson.aoc); // 7030194981795 ~0ms

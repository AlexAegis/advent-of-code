export interface SpringLog {
	log: string;
	criteria: number[];
}

export const parse = (input: string): SpringLog[] => {
	return input.lines(false).map<SpringLog>((line) => {
		const [log, critRaw] = line.splitIntoStringPair(' ');
		const criteria = critRaw.splitToInt({ delimiter: /,/ });
		return {
			log,
			criteria,
		};
	});
};

export interface State {
	rebuiltLog: string;
	currentCriteria: number;
	currentOriginalCriteria: number;
	remainingDamagedLog: string;
	remainingCriteria: number[];
}

export const calculateVariations = (
	state: State,
	cache: Map<string, number> = new Map(),
): number => {
	const key = `${state.remainingCriteria.join(',')};${state.remainingDamagedLog};${state.remainingDamagedLog};${state.currentOriginalCriteria};${state.currentCriteria}`;

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

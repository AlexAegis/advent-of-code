export interface Race {
	time: number;
	distance: number;
}

export const parseAsSeparateRaces = (input: string): Race[] => {
	const races: Race[] = [];
	for (const line of input.lines(false)) {
		const [, ...n] = line.split(/ +/g);
		const values = n.map((n) => Number.parseInt(n, 10));
		if (line.startsWith('Time')) {
			for (const value of values) {
				races.push({ time: value, distance: -1 });
			}
		} else {
			for (let i = 0; i < values.length; i++) {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				races[i]!.distance = values[i]!;
			}
		}
	}
	return races;
};

export const parseAsOneRace = (input: string): Race => {
	const race: Race = {
		distance: -1,
		time: -1,
	};
	for (const line of input.lines(false)) {
		const [, ...n] = line.split(/ +/g);
		if (line.startsWith('Time')) {
			race.time = Number.parseInt(n.join(''), 10);
		} else {
			race.distance = Number.parseInt(n.join(''), 10);
		}
	}
	return race;
};

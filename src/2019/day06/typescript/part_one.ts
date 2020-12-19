import { bench, read } from '@lib';
import { day, year } from '.';
import { Planet } from './model/planet.class';
import { parse } from './parse';

export const runner = (input: string): number => {
	const orbits = parse(input);
	const planets: Map<string, Planet> = new Map();

	for (const orbit of orbits) {
		let innerPlanet = planets.get(orbit.i);
		if (!innerPlanet) {
			innerPlanet = new Planet(orbit.i);
			planets.set(orbit.i, innerPlanet);
		}

		let outerPlanet = planets.get(orbit.o);
		if (!outerPlanet) {
			outerPlanet = new Planet(orbit.o);
			planets.set(orbit.o, outerPlanet);
		}

		innerPlanet.orbiters.push(outerPlanet);
	}

	return [...planets.entries()].reduce((acc, [_, p]) => acc + [...p].length, 0);
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 223251 526ms
}

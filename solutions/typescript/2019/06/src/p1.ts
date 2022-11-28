import { bench, read } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { Planet } from './model/planet.class.js';
import { parse } from './parse.js';

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

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 223251 526ms
}

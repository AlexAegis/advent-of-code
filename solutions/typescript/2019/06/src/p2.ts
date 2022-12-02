import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { Notable, Planet } from './model/planet.class.js';
import { parse } from './parse.js';

export const p2 = (input: string): number => {
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

	const center = planets.get(Notable.CENTER);
	let c = 0;
	if (center) {
		const san = [...center.reach(Notable.SAN)].map((p) => p.name);
		const you = [...center.reach(Notable.YOU)].map((p) => p.name);
		const longer = Math.max(san.length, you.length);

		for (let i = 0; i <= longer; i++) {
			const s = san[i];
			const y = you[i];
			if (s !== y) {
				if (s) c++;
				if (y) c++;
			}
		}
	}

	return c - 2;
};

await task(p2, packageJson.aoc); // 430 ~35ms

import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parseAsSeparateRaces } from './parse.js';
interface RaceResult {
	boatSpeed: number;
	distanceTraveled: number;
	record: number;
}

export const p1 = (input: string): number =>
	parseAsSeparateRaces(input)
		.map(
			(race) =>
				Array.from({ length: race.time })
					.map<RaceResult>((_v, i) => {
						const boatSpeed = i;
						const remainingTime = race.time - boatSpeed;
						const distanceTraveled = remainingTime * boatSpeed;
						return { boatSpeed, distanceTraveled, record: race.distance };
					})
					.filter((result) => result.distanceTraveled > result.record).length,
		)
		.product();

await task(p1, packageJson.aoc); // 160816 ~40μs

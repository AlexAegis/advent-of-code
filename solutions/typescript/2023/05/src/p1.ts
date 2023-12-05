import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { findRange, parse } from './parse.js';

export const p1 = (input: string): number => {
	const data = parse(input);
	return data.seeds
		.map((seed) => {
			const soil = findRange(seed, data.seedToSoilMap);
			const fertilizer = findRange(soil, data.soilToFertilizerMap);
			const water = findRange(fertilizer, data.fertilizerToWaterMap);
			const light = findRange(water, data.waterToLightMap);
			const temperature = findRange(light, data.lightToTemperatureMap);
			const humidity = findRange(temperature, data.temperatureToHumidityMap);
			const location = findRange(humidity, data.humidityToLocationMap);
			return location;
		})
		.min();
};

await task(p1, packageJson.aoc); // 84470622 ~4.36ms

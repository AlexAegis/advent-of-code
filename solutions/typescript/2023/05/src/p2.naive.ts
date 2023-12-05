import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { findRange, parse } from './parse.js';

// Will never terminate for the actual input
export const p2Naive = (input: string): number => {
	const data = parse(input);
	return data.seeds
		.slideWindow(2, 2)
		.flatMap(([seedStart, seedCount]) => {
			const locations: number[] = [];
			for (let seed = seedStart; seed < seedStart + seedCount; seed++) {
				const soil = findRange(seed, data.seedToSoilMap);
				const fertilizer = findRange(soil, data.soilToFertilizerMap);
				const water = findRange(fertilizer, data.fertilizerToWaterMap);
				const light = findRange(water, data.waterToLightMap);
				const temperature = findRange(light, data.lightToTemperatureMap);
				const humidity = findRange(temperature, data.temperatureToHumidityMap);
				const location = findRange(humidity, data.humidityToLocationMap);
				locations.push(location);
			}
			return locations;
		})
		.min();
};

await task(p2Naive, packageJson.aoc, 'example.1.txt'); // 46

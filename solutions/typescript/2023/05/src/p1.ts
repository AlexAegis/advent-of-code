import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { findRange, parse, type Card } from './parse.js';

export const mapSeed =
	(data: Card) =>
	(seed: number): number => {
		const soil = findRange(seed, data.seedToSoilMap);
		const fertilizer = findRange(soil, data.soilToFertilizerMap);
		const water = findRange(fertilizer, data.fertilizerToWaterMap);
		const light = findRange(water, data.waterToLightMap);
		const temperature = findRange(light, data.lightToTemperatureMap);
		const humidity = findRange(temperature, data.temperatureToHumidityMap);
		const location = findRange(humidity, data.humidityToLocationMap);
		return location;
	};

export const p1 = (input: string): number => {
	const data = parse(input);
	return data.seeds.map(mapSeed(data)).min();
};

await task(p1, packageJson.aoc); // 84470622 ~4.36ms

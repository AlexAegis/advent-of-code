import { Interval, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { parse, type Range } from './parse.js';

export const getRangeEnd = (range: Range): number => {
	return range.destinationRange + range.rangeLength;
};

export const refract = (a: Range, b: Range): Range[] => {
	const aTarget = Interval.closed(a.destinationRange, a.destinationRange + a.rangeLength);
	const bSource = Interval.closed(b.sourceRangeStart, b.sourceRangeStart + b.rangeLength);
	const bTarget = Interval.closed(b.destinationRange, b.destinationRange + b.rangeLength);

	const result: Range[] = [];

	if (aTarget.high > bSource.high) {
		const topRefraction: Range = {
			sourceRangeStart: bSource.high,
			destinationRange: bSource.high,
			rangeLength: Math.min(aTarget.high - bSource.high, a.rangeLength),
		};
		result.push(topRefraction);
	}

	if (aTarget.low < bSource.low) {
		const bottomRefraction: Range = {
			sourceRangeStart: aTarget.low,
			destinationRange: aTarget.low,
			rangeLength: Math.min(bSource.low - aTarget.low, a.rangeLength),
		};
		result.push(bottomRefraction);
	}

	aTarget.intersects(bSource);
	// Only if there's an itersection
	if (aTarget.intersects(bSource)) {
		const middleRefractionStartLow = Math.max(aTarget.low, bSource.low);
		const middleRefractionStartHigh = Math.min(aTarget.high, bSource.high);
		const mappingDelta = bTarget.low - bSource.low;
		// Only this one is mapping
		const middleRefraction: Range = {
			sourceRangeStart: middleRefractionStartLow,
			rangeLength: middleRefractionStartHigh - middleRefractionStartLow,
			destinationRange: middleRefractionStartLow + mappingDelta,
		};
		result.push(middleRefraction);
	}

	return result;
};

export const p2 = (input: string): number => {
	const data = parse(input);
	return data.seeds
		.slideWindow(2, 2)
		.flatMap(([seedStart, seedCount]) => {
			const firstRange: Range = {
				sourceRangeStart: seedStart,
				destinationRange: seedStart,
				rangeLength: seedCount,
			};

			const seedToSoilRefraction = data.seedToSoilMap.flatMap((range) =>
				refract(firstRange, range),
			);
			const soilToFertilizerRefraction = seedToSoilRefraction.flatMap((a) =>
				data.soilToFertilizerMap.flatMap((range) => refract(a, range)),
			);
			const fertilizerToWaterRefraction = soilToFertilizerRefraction.flatMap((a) =>
				data.fertilizerToWaterMap.flatMap((range) => refract(a, range)),
			);
			const waterToLightRefraction = fertilizerToWaterRefraction.flatMap((a) =>
				data.waterToLightMap.flatMap((range) => refract(a, range)),
			);
			const lightToTemperatureRefraction = waterToLightRefraction.flatMap((a) =>
				data.lightToTemperatureMap.flatMap((range) => refract(a, range)),
			);
			const temperatureToHumidityRefraction = lightToTemperatureRefraction.flatMap((a) =>
				data.temperatureToHumidityMap.flatMap((range) => refract(a, range)),
			);
			const humidityToLocationRefraction = temperatureToHumidityRefraction.flatMap((a) =>
				data.humidityToLocationMap.flatMap((range) => refract(a, range)),
			);

			return humidityToLocationRefraction.map((range) => range.sourceRangeStart).min();
		})
		.min();
};

await task(p2, packageJson.aoc, 'example.1.txt'); // 84470622 ~4.36ms

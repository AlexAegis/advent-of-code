import { Interval, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { mapSeed } from './p1.js';
import { findRange, parse, type Range } from './parse.js';

export const getRangeEnd = (range: Range): number => {
	return range.destinationRange + range.rangeLength;
};

/**
 * Takes a set of mappings, and reduces the right side to only the effective ones
 *
 *
 */
export const refract = (left: Range[], right: Range[]): Range[] => {
	const middle = Interval.merge(left.map((l) => l.to));
	console.log('middle', middle.toString());
	// first, this is the set of sections that are mapping to another region
	const results = right.flatMap<Range>((r) => {
		const intersecitons = middle.filterMap((m) => Interval.intersection(m, r.from));

		return intersecitons.filterMap((intersection) => {
			const res = intersection
				? {
						from: intersection,
						slope: r.slope,
						sourceRangeStart: intersection.low,
						destinationRange: intersection.low + r.slope,
						rangeLength:
							intersection.length - (intersection.highQualifier === 'closed' ? 1 : 0),
						to: new Interval(intersection.low + r.slope, intersection.high + r.slope, {
							highQualifier: intersection.highQualifier,
							lowQualifier: intersection.lowQualifier,
						}),
				  }
				: undefined;

			console.log(
				'INTERSEC',
				r.from.toString(),
				'->',
				r.to.toString(),
				'intersection:',
				intersection?.toString() ?? 'NONE',
				'=>',
				res?.to.toString(),
			);
			return res;
		});
	});

	const nonMapping = Interval.complement(
		results.map((r) => r.from),
		middle.map((m) => Interval.open(m.low, m.high)),
	).filter((i) => i.isFinite() && i.length > 0);

	console.log(
		'nonMapping',
		nonMapping.map((nm) => nm.toString()),
	);

	results.push(
		...nonMapping.map<Range>((interval) => ({
			from: interval,
			to: interval,
			destinationRange: interval.low,
			rangeLength: interval.length,
			slope: 0,
			sourceRangeStart: interval.low,
		})),
	);
	return results;
};

export const p2 = (input: string): number => {
	const data = parse(input);
	const seedRanges = data.seeds.slideWindow(2, 2).map(([seedStart, seedCount]) => ({
		sourceRangeStart: seedStart,
		destinationRange: seedStart,
		rangeLength: seedCount,
		from: Interval.closed(seedStart, seedStart + seedCount - 1),
		to: Interval.closed(seedStart, seedStart + seedCount - 1),
		slope: 0,
	}));

	console.log(
		'seedRanges\n',
		seedRanges.map((r) => `\t\tfrom: ${r.from.toString()} to: ${r.to.toString()}`).join('\n'),
	);

	const seedToSoilRefraction = refract(seedRanges, data.seedToSoilMap);

	console.log(
		'seedToSoilRefraction\n',
		seedToSoilRefraction
			.map((r) => `\t\tfrom: ${r.from.toString()} to: ${r.to.toString()}`)
			.join('\n'),
	);

	const soilToFertilizerRefraction = refract(seedToSoilRefraction, data.soilToFertilizerMap);

	const fertilizerToWaterRefraction = refract(
		soilToFertilizerRefraction,
		data.fertilizerToWaterMap,
	);

	const waterToLightRefraction = refract(fertilizerToWaterRefraction, data.waterToLightMap);

	const lightToTemperatureRefraction = refract(
		waterToLightRefraction,
		data.lightToTemperatureMap,
	);

	const temperatureToHumidityRefraction = refract(
		lightToTemperatureRefraction,
		data.temperatureToHumidityMap,
	);

	const humidityToLocationRefraction = refract(
		temperatureToHumidityRefraction,
		data.humidityToLocationMap,
	);

	const result = humidityToLocationRefraction.map((range) => range.sourceRangeStart).min();

	const seedMapper = mapSeed(data);
	const mapped = seedMapper(result);
	console.log('result', result, 'mapped', mapped);

	const msoil = findRange(mapped, seedToSoilRefraction);
	const mfertilizer = findRange(msoil, soilToFertilizerRefraction);
	const mwater = findRange(mfertilizer, fertilizerToWaterRefraction);
	const mlight = findRange(mwater, waterToLightRefraction);
	const mtemperature = findRange(mlight, lightToTemperatureRefraction);
	const mhumidity = findRange(mtemperature, temperatureToHumidityRefraction);
	const mlocation = findRange(mhumidity, humidityToLocationRefraction);

	const mrsoil = findRange(mapped, humidityToLocationRefraction);
	const mrfertilizer = findRange(mrsoil, temperatureToHumidityRefraction);
	const mrwater = findRange(mrfertilizer, lightToTemperatureRefraction);
	const mrlight = findRange(mrwater, waterToLightRefraction);
	const mrtemperature = findRange(mrlight, fertilizerToWaterRefraction);
	const mrhumidity = findRange(mrtemperature, soilToFertilizerRefraction);
	const mrlocation = findRange(mrhumidity, seedToSoilRefraction);

	const soil = findRange(result, seedToSoilRefraction);
	const fertilizer = findRange(soil, soilToFertilizerRefraction);
	const water = findRange(fertilizer, fertilizerToWaterRefraction);
	const light = findRange(water, waterToLightRefraction);
	const temperature = findRange(light, lightToTemperatureRefraction);
	const humidity = findRange(temperature, temperatureToHumidityRefraction);
	const location = findRange(humidity, humidityToLocationRefraction);

	const rsoil = findRange(result, humidityToLocationRefraction);
	const rfertilizer = findRange(rsoil, temperatureToHumidityRefraction);
	const rwater = findRange(rfertilizer, lightToTemperatureRefraction);
	const rlight = findRange(rwater, waterToLightRefraction);
	const rtemperature = findRange(rlight, fertilizerToWaterRefraction);
	const rhumidity = findRange(rtemperature, soilToFertilizerRefraction);
	const rlocation = findRange(rhumidity, seedToSoilRefraction);

	console.log(
		'location',
		location,
		rlocation,
		mlocation,
		mrlocation,
		seedMapper(location),
		seedMapper(rlocation),
		seedMapper(mlocation),
		seedMapper(mrlocation),
	);
	return 0;
};

await task(p2, packageJson.aoc, 'example.1.txt'); // 84470622 ~4.36ms

// await task(p2, packageJson.aoc); // 84470622 ~4.36ms
// is too high 4194961753

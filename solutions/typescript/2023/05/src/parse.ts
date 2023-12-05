export interface Card {
	seeds: number[];
	seedToSoilMap: Range[];
	soilToFertilizerMap: Range[];
	fertilizerToWaterMap: Range[];
	waterToLightMap: Range[];
	lightToTemperatureMap: Range[];
	temperatureToHumidityMap: Range[];
	humidityToLocationMap: Range[];
}

export interface Range {
	destinationRange: number;
	sourceRangeStart: number;
	rangeLength: number;
}

enum ParseableData {
	SEEDS = 'seeds',
	SEED_TO_SOIL = 'seed-to-soil',
	SOIL_TO_FERTILIZER = 'soil-to-fertilizer',
	FERTILIZER_TO_WATER = 'fertilizer-to-water',
	WATER_TO_LIGHT = 'water-to-light',
	LIGHT_TO_TEMPERATURE = 'light-to-temperature',
	TEMPERATURE_TO_HUMIDITY = 'temperature-to-humidity',
	HUMIDITY_TO_LOCATION = 'humidity-to-location',
}

const allParseableData = Object.values(ParseableData);

const toRange = (line: string): Range => {
	const [destinationRange, sourceRangeStart, rangeLength] = line.splitToInt();
	if (
		destinationRange === undefined ||
		sourceRangeStart === undefined ||
		rangeLength === undefined
	) {
		throw new Error('corrupt data');
	}
	return {
		destinationRange,
		sourceRangeStart,
		rangeLength,
	};
};
export const parse = (input: string): Card => {
	let parsing: ParseableData = ParseableData.SEEDS;
	let seeds: number[] = [];
	const seedToSoilMap: Range[] = [];
	const soilToFertilizerMap: Range[] = [];
	const fertilizerToWaterMap: Range[] = [];
	const waterToLightMap: Range[] = [];
	const lightToTemperatureMap: Range[] = [];
	const temperatureToHumidityMap: Range[] = [];
	const humidityToLocationMap: Range[] = [];

	for (const line of input.lines(false)) {
		const parseableDataHeader = allParseableData.find((parseableData) =>
			line.startsWith(parseableData),
		);
		if (parseableDataHeader) {
			parsing = parseableDataHeader;
			if (parsing !== ParseableData.SEEDS) {
				continue;
			}
		}

		switch (parsing) {
			case ParseableData.SEEDS: {
				const [, values] = line.splitIntoStringPair(': ');
				seeds = values.split(' ').map((value) => Number.parseInt(value, 10));
				break;
			}
			case ParseableData.SEED_TO_SOIL: {
				seedToSoilMap.push(toRange(line));
				break;
			}
			case ParseableData.SOIL_TO_FERTILIZER: {
				soilToFertilizerMap.push(toRange(line));
				break;
			}
			case ParseableData.FERTILIZER_TO_WATER: {
				fertilizerToWaterMap.push(toRange(line));
				break;
			}
			case ParseableData.WATER_TO_LIGHT: {
				waterToLightMap.push(toRange(line));
				break;
			}
			case ParseableData.LIGHT_TO_TEMPERATURE: {
				lightToTemperatureMap.push(toRange(line));
				break;
			}
			case ParseableData.TEMPERATURE_TO_HUMIDITY: {
				temperatureToHumidityMap.push(toRange(line));
				break;
			}
			case ParseableData.HUMIDITY_TO_LOCATION: {
				humidityToLocationMap.push(toRange(line));
				break;
			}
		}
	}

	return {
		seeds,
		seedToSoilMap,
		soilToFertilizerMap,
		fertilizerToWaterMap,
		waterToLightMap,
		lightToTemperatureMap,
		temperatureToHumidityMap,
		humidityToLocationMap,
	};
};

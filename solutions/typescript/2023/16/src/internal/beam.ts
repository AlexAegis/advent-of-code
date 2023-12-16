import { Direction, GridGraph, Vec2 } from '@alexaegis/advent-of-code-lib';

export const mirrors: Record<string, Record<string, Direction>> = {
	'\\': {
		[Direction.WEST.toString()]: Direction.SOUTH,
		[Direction.NORTH.toString()]: Direction.EAST,
		[Direction.EAST.toString()]: Direction.NORTH,
		[Direction.SOUTH.toString()]: Direction.WEST,
	},
	'/': {
		[Direction.WEST.toString()]: Direction.NORTH,
		[Direction.NORTH.toString()]: Direction.WEST,
		[Direction.EAST.toString()]: Direction.SOUTH,
		[Direction.SOUTH.toString()]: Direction.EAST,
	},
};

export const splitters: Record<string, Record<string, [Direction, Direction] | undefined>> = {
	'|': {
		[Direction.EAST.toString()]: [Direction.NORTH, Direction.SOUTH],
		[Direction.WEST.toString()]: [Direction.SOUTH, Direction.NORTH],
	},
	'-': {
		[Direction.NORTH.toString()]: [Direction.EAST, Direction.WEST],
		[Direction.SOUTH.toString()]: [Direction.WEST, Direction.EAST],
	},
};

export interface Beam {
	position: Vec2;
	direction: Direction;
}

export const energizeMap = (gg: GridGraph, startingBeam: Beam): number => {
	let beams: Beam[] = [startingBeam];
	const beamPathHistory = new Map<string, Set<string>>();
	while (beams.length > 0) {
		const spawnedBeams: Beam[] = [];
		for (const beam of beams) {
			const node = gg.getNode(beam.position);
			if (node) {
				const pathHistory = beamPathHistory.getOrAdd(
					node.coordinate.toString(),
					() => new Set(),
				);

				if (pathHistory.has(beam.direction.toString())) {
					beam.direction = Direction.ZERO;
				} else {
					pathHistory.add(beam.direction.toString());
					const mirroredTo =
						mirrors[node.value.toString()]?.[beam.direction.reverse().toString()];
					const splitter =
						splitters[node.value.toString()]?.[beam.direction.reverse().toString()];
					if (mirroredTo) {
						beam.direction = mirroredTo;
						beam.position = beam.position.add(mirroredTo);
					} else if (splitter) {
						const [dirA, dirB] = splitter;
						beam.direction = dirA;
						beam.position = beam.position.add(dirA);
						spawnedBeams.push({ position: beam.position.add(dirB), direction: dirB });
					} else {
						beam.position = beam.position.add(beam.direction);
					}
				}
			} else {
				beam.direction = Direction.ZERO;
			}
		}
		beams.push(...spawnedBeams);
		spawnedBeams.clear();
		beams = beams.filter((beam) => !beam.direction.equals(Direction.ZERO));
	}
	// gg.print((n) => (beamPathHistory.has(n.coordinate.toString()) ? '#' : n.toString()));
	return beamPathHistory.size;
};

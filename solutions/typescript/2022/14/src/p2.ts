import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { createSandWorld, SandKindComponent } from './sand-world.class.js';

export const p2 = async (input: string): Promise<number> => {
	const world = createSandWorld(input);
	await world.run();
	return world.query(SandKindComponent).length;
};

await task(p2, packageJson.aoc, 'example.1.txt'); // 25434 ~0ms

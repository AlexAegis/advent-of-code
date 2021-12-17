import { bench, read, split } from '@lib';
import { Vec2String } from '@lib/model';
import { day, year } from '.';
import { interpret } from './interpret.function';

export const runner = (input: string): number => {
	const fabric: Map<Vec2String, number[]> = new Map<Vec2String, number[]>(); // Contains each claim for each coordinate
	for (const line of split(input)) {
		const claim = interpret(line);
		for (let i = claim.starting.x; i < claim.starting.x + claim.size.x; i++) {
			for (let j = claim.starting.y; j < claim.starting.y + claim.size.y; j++) {
				const coordKey: Vec2String = `${i},${j}`;
				const claims: number[] = fabric.get(coordKey) || [];
				claims.push(claim.id);
				fabric.set(coordKey, claims);
			}
		}
	}
	return [...fabric].count(([_, v]) => v.length >= 2);
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 116920 ~265ms
}

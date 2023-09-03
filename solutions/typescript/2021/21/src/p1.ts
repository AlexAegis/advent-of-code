import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

export class DeterministicDie {
	totalRolls = 0;
	current = 1;
	*roll(): IterableIterator<number> {
		for (;;) {
			this.totalRolls++;
			yield this.current;
			this.current = this.current.addWithinRange(1, 1, 100);
		}
	}

	static getThree(iterator: IterableIterator<number>): [number, number, number] {
		return [
			iterator.next().value as number,
			iterator.next().value as number,
			iterator.next().value as number,
		];
	}
}

export class Player {
	score = 0;
	constructor(
		public readonly index: number,
		public position: number,
	) {}

	step(roll: number): void {
		this.position = this.position.addWithinRange(roll, 1, 10);
		this.score += this.position;
	}

	roll(diceRoller: IterableIterator<number>): void {
		this.step(DeterministicDie.getThree(diceRoller).sum());
	}

	static getLoser(players: Player[]): Player {
		return [...players].sort((a, b) => a.score - b.score).first();
	}
}

export const parse = (line: string): Player => {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const [a, b] = line.match(/\d/g)!;
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return new Player(Number.parseInt(a, 10), Number.parseInt(b!, 10));
};

export const p1 = (input: string): number => {
	const players = input.lines().map(parse);
	const die = new DeterministicDie();

	const diceRoller = die.roll();

	for (const player of players.repeat((player) => player.score >= 1000)) {
		player.roll(diceRoller);
	}
	const loser = Player.getLoser(players);
	return die.totalRolls * loser.score;
};

await task(p1, packageJson.aoc, 'example.1.txt'); // 752745 ~0.14ms

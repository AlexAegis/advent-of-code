import { bench, read } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export class DeterministicDie {
	totalRolls = 0;
	current = 1;
	*roll(): IterableIterator<number> {
		while (true) {
			this.totalRolls++;
			yield this.current;
			this.current = this.current.addWithinRange(1, 1, 100);
		}
	}

	static getThree(iterator: IterableIterator<number>): [number, number, number] {
		return [iterator.next().value, iterator.next().value, iterator.next().value];
	}
}

export class Player {
	score = 0;
	constructor(public readonly index: number, public position: number) {}

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
	const [a, b] = line.match(/\d/g)!;
	return new Player(parseInt(a, 10), parseInt(b, 10));
};

export const runner = (input: string): number => {
	const players = input.lines().map(parse);
	const die = new DeterministicDie();

	const diceRoller = die.roll();

	for (const player of players.repeat((player) => player.score >= 1000)) {
		player.roll(diceRoller);
	}
	const loser = Player.getLoser(players);
	return die.totalRolls * loser.score;
};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.1.txt');
	console.log(`Result: ${await bench(input, runner)}`); // 752745 ~0.14ms
}

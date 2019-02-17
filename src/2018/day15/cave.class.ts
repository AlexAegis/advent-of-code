import { Creature } from './element/creature/creature.class';
import { Block } from './element/block/block.class';

export class Cave {
	grid: Array<Block> = [];
	units: Array<Creature> = [];
	width: number = 0;
	height: number = 0;

	toString(): string {
		let repr = '';
		for (let y = 0; y < this.height; y++) {
			let row: string = '';
			for (let x = 0; x < this.width; x++) {
				row += this.grid[y * this.height + x].toString();
			}
			repr += row + '\n';
		}
		return repr;
	}
}

import { Creature } from './element/creature/creature.class';
import { Block } from './element/block/block.class';
import { Ground } from './element/block/ground.class';

export class Cave {
	grid: Array<Block> = [];
	width: number = 0;
	height: number = 0;

	/**
	 * Ensures correct order
	 */
	*units(): IterableIterator<Creature> {
		for (let tile of this.grid.filter(tile => tile instanceof Ground && (<Ground>tile).occupant)) {
			yield (<Ground>tile).occupant;
		}
	}

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

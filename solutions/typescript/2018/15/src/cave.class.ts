import type { Block } from './element/block/block.class.js';
import { Ground } from './element/block/ground.class.js';
import type { Creature } from './element/creature/creature.class.js';

export class Cave {
	grid: Block[] = [];
	width = 0;
	height = 0;

	/**
	 * Ensures correct order
	 */
	*units(): IterableIterator<Creature | undefined> {
		for (const tile of this.grid.filter((t) => t instanceof Ground && (t as Ground).occupant)) {
			yield (tile as Ground).occupant;
		}
	}

	toString(): string {
		let repr = '';
		for (let y = 0; y < this.height; y++) {
			let row = '';
			for (let x = 0; x < this.width; x++) {
				row += this.grid[y * this.height + x]?.toString() ?? '';
			}
			repr += row + '\n';
		}
		return repr;
	}
}

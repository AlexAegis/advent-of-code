import type { BoundingBox, Vec2 } from '@alexaegis/advent-of-code-lib';
import { stringToMatrix } from '@alexaegis/advent-of-code-lib/string';
import { Sprite } from '../../renderer/sprite.class.js';
import { SpatialComponent } from '../spatial-component.class.js';

export class AsciiDisplayComponent extends SpatialComponent {
	sprite: Sprite;

	constructor(sprite: Sprite) {
		super();
		this.sprite = sprite;
	}

	area(at: Vec2): BoundingBox[] {
		// TODO: This could be more granular by leaving out empty spaces
		return [this.sprite.boundingBox.clone().moveTopLeftTo(at)];
	}

	static fromSprite(sprite: Sprite): AsciiDisplayComponent {
		return new AsciiDisplayComponent(sprite);
	}

	static fromString(char: string, box?: BoundingBox): AsciiDisplayComponent {
		return new AsciiDisplayComponent(Sprite.fromMatrix(stringToMatrix(char), box));
	}

	static fromMatrix(matrix: string[][], box?: BoundingBox): AsciiDisplayComponent {
		return new AsciiDisplayComponent(Sprite.fromMatrix(matrix, box));
	}
}

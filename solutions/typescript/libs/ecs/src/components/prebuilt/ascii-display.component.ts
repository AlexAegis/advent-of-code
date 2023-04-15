import type { BoundingBox, Vec2 } from '@alexaegis/advent-of-code-lib';
import { stringToMatrix } from '@alexaegis/advent-of-code-lib/string';
import { Sprite, type SpriteOptions } from '../../renderer/sprite.class.js';
import { SpatialComponent } from '../spatial-component.class.js';

export class AsciiDisplayComponent extends SpatialComponent {
	sprite: Sprite;

	constructor(sprite: Sprite) {
		super();
		this.sprite = sprite;
	}

	area(at: Vec2): BoundingBox[] {
		// TODO: This could be more granular by leaving out empty spaces
		return [this.sprite.boundingBox.clone().moveAnchorTo(at)];
	}

	static fromSprite(sprite: Sprite): AsciiDisplayComponent {
		return new AsciiDisplayComponent(sprite);
	}

	static fromString(char: string, spriteOptions?: SpriteOptions): AsciiDisplayComponent {
		return new AsciiDisplayComponent(Sprite.fromMatrix(stringToMatrix(char), spriteOptions));
	}

	static fromMatrix(matrix: string[][], spriteOptions?: SpriteOptions): AsciiDisplayComponent {
		return new AsciiDisplayComponent(Sprite.fromMatrix(matrix, spriteOptions));
	}
}

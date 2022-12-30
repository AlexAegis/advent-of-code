import { stringToMatrix } from '@alexaegis/advent-of-code-lib/string';
import { Sprite } from '../../renderer/sprite.class.js';
import { Component } from '../component.class.js';

export class AsciiDisplayComponent extends Component {
	sprite: Sprite;

	constructor(public matrix: string[][]) {
		super();
		this.sprite = Sprite.fromMatrix(matrix);
	}

	static fromString(char: string): AsciiDisplayComponent {
		return new AsciiDisplayComponent(stringToMatrix(char));
	}

	static fromMatrix(matrix: string[][]): AsciiDisplayComponent {
		return new AsciiDisplayComponent(matrix);
	}
}

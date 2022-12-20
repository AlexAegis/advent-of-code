import { Sprite } from '../../renderer/sprite.class.js';
import { Component } from '../component.class.js';

export class AsciiDisplayComponent extends Component {
	render: Sprite;

	constructor(public displayChar: string) {
		super();
		this.render = Sprite.fromString(displayChar);
	}

	static fromString(char: string): AsciiDisplayComponent {
		return new AsciiDisplayComponent(char);
	}
}

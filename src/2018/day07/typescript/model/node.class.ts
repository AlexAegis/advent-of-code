export class Node {
	public progress: number = 0;
	public finishedOnTick: number = 0;
	constructor(public node: string) {}
	cost = (useLong: boolean = false) => this.node.toLowerCase().charCodeAt(0) + (useLong ? 60 : 0) - 97 + 1; // 60 base cost, -97 unicode offset for lowercase letters, + 1 offset.
	processed = (useBaseCost: boolean = false) => this.progress >= this.cost(useBaseCost);
	available = () => this.progress === 0;
}

export class Node {
	public progress: number = 0;
	public finishedOnTick: number = 0;
	public constructor(public node: string) {}

	public cost(useLong: boolean = false) {
		return this.node.toLowerCase().charCodeAt(0) + (useLong ? 60 : 0) - 97 + 1; // 60 base cost, -97 unicode offset for lowercase letters, + 1 offset.
	}

	public processed(useBaseCost: boolean = false): boolean {
		return this.progress >= this.cost(useBaseCost);
	}

	public available(): boolean {
		return this.progress === 0;
	}
}

import { task } from '@alexaegis/advent-of-code-lib';
import { CircularLinkedList } from '@alexaegis/advent-of-code-lib/linked-list';
import packageJson from '../package.json' assert { type: 'json' };

const mix = (ll: CircularLinkedList<number>): void => {
	const nodes = [...ll.singleIterationNodes()];
	const length = nodes.length;
	for (const node of nodes) {
		const altRel = Math.abs(node.value) % (length - 1);
		if (node.value > 0) {
			const target = node.getInFront(altRel);
			node.eject();
			target.putInFront(node);
		} else if (node.value < 0) {
			const target = node.getInBack(altRel);
			node.eject();
			target.putBehind(node);
		}
	}
};

export const p1 = (input: string): number => {
	const ll = new CircularLinkedList(input.splitToInt());
	mix(ll);

	const zero = ll.find(0);
	const length = ll.length();
	const a = zero.getInFront(1000 % length);
	const b = zero.getInFront(2000 % length);
	const c = zero.getInFront(3000 % length);
	return a.value + b.value + c.value;
};
await task(p1, packageJson.aoc); // 13289 ~75.38ms

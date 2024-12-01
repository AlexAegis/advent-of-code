import { task } from '@alexaegis/advent-of-code-lib';
import { CircularLinkedList } from '@alexaegis/advent-of-code-lib/linked-list';
import packageJson from '../package.json' assert { type: 'json' };

const mix = (ll: CircularLinkedList<number>, rounds = 10): void => {
	const nodes = [...ll.singleIterationNodes()];

	const length = nodes.length;

	for (let r = 0; r < rounds; r++) {
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
	}
};

export const p2 = (input: string): number => {
	const decryptionKey = 811_589_153;

	const lines = input.splitToInt().map((i) => i * decryptionKey);

	const ll = new CircularLinkedList(lines);
	const length = ll.length();
	mix(ll, 10);
	const zero = ll.find(0);

	const a = zero.getInFront(1000 % length);
	const b = zero.getInFront(2000 % length);
	const c = zero.getInFront(3000 % length);
	return a.value + b.value + c.value;
};

await task(p2, packageJson.aoc); // 2865721299243 ~930.06ms

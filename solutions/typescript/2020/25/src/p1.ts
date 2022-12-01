import { benchTask, loadTaskResources, split } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

const magicNumber = 20201227;

export const handshake = (subjectNumber: number, loopSize: number): number => {
	return subjectNumber.modExp(loopSize, magicNumber);
};

export const findLoopsize = (subjectNumber: number, publicKey: number): number => {
	for (let loopsize = 1; loopsize < 20000000; loopsize++) {
		const handshakeResult = handshake(subjectNumber, loopsize);
		if (handshakeResult === publicKey) {
			return loopsize;
		}
	}
	return -1;
};

export const p1 = (input: string): number => {
	const [cardPublicKey, doorPublicKey] = split(input).map((l) => parseInt(l, 10));
	const subjectNumber = 7;
	const cardLoopSize = findLoopsize(subjectNumber, cardPublicKey);
	const doorLoopSize = findLoopsize(subjectNumber, doorPublicKey);

	console.log('cardLoopSize', cardLoopSize); // 8
	console.log('doorLoopSize', doorLoopSize); // 11

	const encryptionKey = handshake(doorPublicKey, cardLoopSize);

	console.log('encryptionKey', encryptionKey); // 14897079
	return encryptionKey;
};

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 12181021 ~100s
}

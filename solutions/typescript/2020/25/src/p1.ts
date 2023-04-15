import { split, task } from '@alexaegis/advent-of-code-lib';
import { type } from 'arktype';
import packageJson from '../package.json';

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
	const numberPair = type(['number', 'number']);
	const [cardPublicKey, doorPublicKey] = numberPair.assert(
		split(input).map((l) => parseInt(l, 10))
	);
	const subjectNumber = 7;
	const cardLoopSize = findLoopsize(subjectNumber, cardPublicKey);
	const doorLoopSize = findLoopsize(subjectNumber, doorPublicKey);

	console.log('cardLoopSize', cardLoopSize); // 8
	console.log('doorLoopSize', doorLoopSize); // 11

	const encryptionKey = handshake(doorPublicKey, cardLoopSize);

	console.log('encryptionKey', encryptionKey); // 14897079
	return encryptionKey;
};

await task(p1, packageJson.aoc); // 12181021 ~100s

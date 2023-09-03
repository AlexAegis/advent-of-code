import { split, task } from '@alexaegis/advent-of-code-lib';
import { type } from 'arktype';
import packageJson from '../package.json';

const magicNumber = 20_201_227;
/**
 *
 * @param subject starts with 7
 * @param loopSize
 */
export const handshake = (subjectNumber: number, loopSize: number): number => {
	return subjectNumber.modExp(loopSize, magicNumber);
};

export const findLoopsize = (subjectNumber: number, publicKey: number): number => {
	for (let loopsize = 1; loopsize < 20_000_000; loopsize++) {
		const handshakeResult = handshake(subjectNumber, loopsize);
		if (handshakeResult === publicKey) {
			return loopsize;
		}
	}
	return -1;
};

export class Agent {
	secretLoopSize: number | undefined;
	constructor(public publicKey: number) {}
}

export const p2 = (input: string): number => {
	const numberPair = type(['number', 'number']);
	const publicKeys = numberPair.assert(split(input).map((l) => Number.parseInt(l, 10)));
	const [cardPublicKey, doorPublicKey] = publicKeys;
	const subjectNumber = 7;
	// for (const publicKey of publicKeys) {
	// 	const result = handshake(publicKey, 7);
	// 	console.log(result);
	// }

	const cardLoopSize = findLoopsize(subjectNumber, cardPublicKey);
	const doorLoopSize = findLoopsize(subjectNumber, doorPublicKey);

	// const cardLoopSize = handshake(subjectNumber, cardPublicKey);
	// const doorLoopSize = handshake(subjectNumber, doorPublicKey);

	console.log('cardLoopSize', cardLoopSize); // 8
	console.log('doorLoopSize', doorLoopSize); // 11

	const encryptionKey = handshake(doorPublicKey, cardLoopSize);
	// const encryptionKey2 = handshake(cardPublicKey, doorLoopSize); // same result as the other

	console.log('encryptionKey', encryptionKey); // 14897079
	// console.log('encryptionKey2', encryptionKey2); // 14897079
	return encryptionKey;
};

await task(p2, packageJson.aoc); // 12181021 ~100s

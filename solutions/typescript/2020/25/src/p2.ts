import { bench, read, split } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

const magicNumber = 20201227;
/**
 *
 * @param subject starts with 7
 * @param loopSize
 */
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

export class Agent {
	secretLoopSize: number | undefined;
	constructor(public publicKey: number) {}
}

export const runner = (input: string): number => {
	const publicKeys = split(input).map((l) => parseInt(l, 10));
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

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 12181021 ~100s
}

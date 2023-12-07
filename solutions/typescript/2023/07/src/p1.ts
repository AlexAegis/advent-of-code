import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import {
	HandType,
	getFiveOfAKind,
	getFourOfAKind,
	getFullHouse,
	getHighCards,
	getOnePair,
	getThreeOfAKind,
	getTwoPairs,
	inOrderComparator,
	parse,
	type Card,
	type Hand,
} from './parse.js';

const cardPowerMap: Record<Card, number> = {
	'2': 2,
	'3': 3,
	'4': 4,
	'5': 5,
	'6': 6,
	'7': 7,
	'8': 8,
	'9': 9,
	T: 10,
	J: 11,
	Q: 12,
	K: 13,
	A: 14,
};

export const getHandType = (hand: Hand): HandType => {
	const handType =
		getFiveOfAKind(hand) ??
		getFourOfAKind(hand) ??
		getFullHouse(hand) ??
		getThreeOfAKind(hand) ??
		getTwoPairs(hand) ??
		getOnePair(hand) ??
		getHighCards(hand);

	if (!handType) {
		throw new Error('cant interpret hand as any kind of hand');
	}

	return handType;
};

export const p1 = (input: string): number =>
	input
		.lines(false)
		.map(parse(cardPowerMap, getHandType))
		.sort(inOrderComparator)
		.map((hand, index) => hand.bid * (index + 1))
		.sum();

await task(p1, packageJson.aoc); // 253954294 ~8.70ms

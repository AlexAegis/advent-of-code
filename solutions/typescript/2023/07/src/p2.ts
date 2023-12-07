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
	J: 1,
	Q: 11,
	K: 12,
	A: 13,
};

const allCardsWithoutJoker: Card[] = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];

export const expandJokers = (hand: Hand): Hand[] => {
	const firstCardVariations = hand[0] === 'J' ? allCardsWithoutJoker : [hand[0]];
	const secondCardVariations = hand[1] === 'J' ? allCardsWithoutJoker : [hand[1]];
	const thirdCardVariations = hand[2] === 'J' ? allCardsWithoutJoker : [hand[2]];
	const fourthCardVariations = hand[3] === 'J' ? allCardsWithoutJoker : [hand[3]];
	const fifthCardVariations = hand[4] === 'J' ? allCardsWithoutJoker : [hand[4]];

	const variations: Hand[] = [];

	for (const firstCardVariation of firstCardVariations) {
		for (const secondCardVariation of secondCardVariations) {
			for (const thirdCardVariation of thirdCardVariations) {
				for (const fourthCardVariation of fourthCardVariations) {
					for (const fifthCardVariation of fifthCardVariations) {
						variations.push([
							firstCardVariation,
							secondCardVariation,
							thirdCardVariation,
							fourthCardVariation,
							fifthCardVariation,
						]);
					}
				}
			}
		}
	}

	return variations;
};

export const getHandType = (hand: Hand): HandType => {
	const expanded = expandJokers(hand);
	const handType =
		expanded.mapFirst((e) => getFiveOfAKind(e)) ??
		expanded.mapFirst((e) => getFourOfAKind(e)) ??
		expanded.mapFirst((e) => getFullHouse(e)) ??
		expanded.mapFirst((e) => getThreeOfAKind(e)) ??
		expanded.mapFirst((e) => getTwoPairs(e)) ??
		expanded.mapFirst((e) => getOnePair(e)) ??
		expanded.mapFirst((e) => getHighCards(e));

	if (!handType) {
		throw new Error('cant interpret hand as any kind of hand');
	}

	return handType;
};

export const p2 = (input: string): number =>
	input
		.lines(false)
		.map(parse(cardPowerMap, getHandType))
		.sort(inOrderComparator)
		.map((hand, index) => hand.bid * (index + 1))
		.sum();

await task(p2, packageJson.aoc); // 254837398 ~40μs

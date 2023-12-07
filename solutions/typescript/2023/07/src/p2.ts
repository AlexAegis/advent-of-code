import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { HandType, isCard, type Card, type Hand } from './parse.js';

export interface HandWithBid {
	cards: Hand;
	handType: HandKind;
	bid: number;
}

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
	Q: 30,
	K: 40,
	A: 50,
};

export const handTypePowerMap: Record<HandType, number> = {
	[HandType.FIVE_OF_A_KIND]: 60,
	[HandType.FOUR_OF_A_KIND]: 50,
	[HandType.FULL_HOUSE]: 40,
	[HandType.THREE_OF_A_KIND]: 30,
	[HandType.TWO_PAIRS]: 20,
	[HandType.ONE_PAIR]: 10,
	[HandType.HIGH_CARD]: 0,
};

export interface FiveOfAKind {
	type: HandType.FIVE_OF_A_KIND;
	fiveOfAKind: Card;
	fiveOfAKindPower: number;
}

export const isFiveOfAKind = (hand: HandKind): hand is FiveOfAKind => {
	return hand.type === HandType.FIVE_OF_A_KIND;
};

export interface FourOfAKind {
	type: HandType.FOUR_OF_A_KIND;
	fourOfAKind: Card;
	fourOfAKindPower: number;
	highCard: Card;
	highCardPower: number;
}

export const isFourOfAKind = (hand: HandKind): hand is FourOfAKind => {
	return hand.type === HandType.FOUR_OF_A_KIND;
};
export interface FullHouse {
	type: HandType.FULL_HOUSE;
	triple: Card;
	triplePower: number;
	pair: Card;
	pairPower: number;
}

export const isFullHouse = (hand: HandKind): hand is FullHouse => {
	return hand.type === HandType.FULL_HOUSE;
};

export interface ThreeOfAKind {
	type: HandType.THREE_OF_A_KIND;
	triple: Card;
	triplePower: number;
	highCards: [Card, Card];
	highCardsPower: number;
}

export const isThreeOfAKind = (hand: HandKind): hand is ThreeOfAKind => {
	return hand.type === HandType.THREE_OF_A_KIND;
};

export interface TwoPairs {
	type: HandType.TWO_PAIRS;
	pairs: [Card, Card];
	pairsPower: number;
	highCard: Card;
	highCardPower: number;
}

export const isTwoPairs = (hand: HandKind): hand is TwoPairs => {
	return hand.type === HandType.TWO_PAIRS;
};

export interface OnePair {
	type: HandType.ONE_PAIR;
	pair: Card;
	pairPower: number;
	highCards: [Card, Card, Card];
	highCardPower: number;
}

export const isOnePair = (hand: HandKind): hand is OnePair => {
	return hand.type === HandType.ONE_PAIR;
};

export interface HighCards {
	type: HandType.HIGH_CARD;
	highCards: [Card, Card, Card, Card, Card];
	highCardPower: number;
}

export const isHighCards = (hand: HandKind): hand is HighCards => {
	return hand.type === HandType.HIGH_CARD;
};

export type HandKind =
	| FiveOfAKind
	| FourOfAKind
	| FullHouse
	| ThreeOfAKind
	| TwoPairs
	| OnePair
	| HighCards;

export const getFiveOfAKind = (hand: Hand): FiveOfAKind | undefined => {
	const first = hand[0];
	return hand.every((card) => card === first)
		? {
				type: HandType.FIVE_OF_A_KIND,
				fiveOfAKind: first,
				fiveOfAKindPower: cardPowerMap[first],
		  }
		: undefined;
};

export const getFourOfAKind = (hand: Hand): FourOfAKind | undefined => {
	const hasFour = hand.find((card) => hand.filter((oc) => card === oc).length === 4);
	const highCard = hasFour ? hand.find((card) => card !== hasFour) : undefined;

	return hasFour && highCard
		? {
				type: HandType.FOUR_OF_A_KIND,
				fourOfAKind: hasFour,
				fourOfAKindPower: cardPowerMap[hasFour],
				highCard,
				highCardPower: cardPowerMap[highCard],
		  }
		: undefined;
};

export const getFullHouse = (hand: Hand): FullHouse | undefined => {
	const hasThree = hand.find((card) => hand.filter((oc) => card === oc).length === 3);
	const hasTwo = hand.find(
		(card) => card !== hasThree && hand.filter((oc) => card === oc).length === 2,
	);

	return hasThree && hasTwo
		? {
				type: HandType.FULL_HOUSE,
				triple: hasThree,
				triplePower: cardPowerMap[hasThree],
				pair: hasTwo,
				pairPower: cardPowerMap[hasTwo],
		  }
		: undefined;
};

export const getThreeOfAKind = (hand: Hand): ThreeOfAKind | undefined => {
	const hasThree = hand.find((card) => hand.filter((oc) => card === oc).length === 3);
	const remaining = hand.filter((card) => card !== hasThree);

	return hasThree && remaining.length === 2 && remaining[0] !== remaining[1]
		? {
				type: HandType.THREE_OF_A_KIND,
				triple: hasThree,
				triplePower: cardPowerMap[hasThree],
				highCards: remaining as [Card, Card],
				highCardsPower: remaining.map((r) => cardPowerMap[r]).sum(),
		  }
		: undefined;
};

export const getTwoPairs = (hand: Hand): TwoPairs | undefined => {
	const hasPair = hand.find((card) => hand.filter((oc) => card === oc).length === 2);
	const hasOtherPair = hand.find(
		(card) => card !== hasPair && hand.filter((oc) => card === oc).length === 2,
	);
	const highCard = hand.find((card) => card !== hasPair && card !== hasOtherPair);

	return hasPair && hasOtherPair && highCard
		? {
				type: HandType.TWO_PAIRS,
				pairs: [hasPair, hasOtherPair],
				pairsPower: cardPowerMap[hasPair] + cardPowerMap[hasOtherPair],
				highCard,
				highCardPower: cardPowerMap[highCard],
		  }
		: undefined;
};

export const getOnePair = (hand: Hand): OnePair | undefined => {
	const hasPair = hand.find((card) => hand.filter((oc) => card === oc).length === 2);
	const remaining = hand.filter((card) => card !== hasPair);

	return hasPair &&
		remaining.length === 3 &&
		// TODO make an isUnique fn
		remaining[0] !== remaining[1] &&
		remaining[0] !== remaining[2] &&
		remaining[1] !== remaining[2]
		? {
				type: HandType.ONE_PAIR,
				pair: hasPair,
				pairPower: cardPowerMap[hasPair],
				highCards: remaining as [Card, Card, Card],
				highCardPower: remaining.map((r) => cardPowerMap[r]).sum(),
		  }
		: undefined;
};

export const getHighCards = (hand: Hand): HighCards | undefined => {
	return hand[0] !== hand[1] &&
		hand[0] !== hand[2] &&
		hand[0] !== hand[3] &&
		hand[0] !== hand[4] &&
		hand[1] !== hand[2] &&
		hand[1] !== hand[3] &&
		hand[1] !== hand[4] &&
		hand[2] !== hand[3] &&
		hand[2] !== hand[4] &&
		hand[3] !== hand[4]
		? {
				type: HandType.HIGH_CARD,
				highCards: hand,
				highCardPower: hand.map((card) => cardPowerMap[card]).sum(),
		  }
		: undefined;
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

export const getHandType = (hand: Hand): HandKind => {
	const expanded = expandJokers(hand);
	const handKind =
		expanded.mapFirst((e) => getFiveOfAKind(e)) ??
		expanded.mapFirst((e) => getFourOfAKind(e)) ??
		expanded.mapFirst((e) => getFullHouse(e)) ??
		expanded.mapFirst((e) => getThreeOfAKind(e)) ??
		expanded.mapFirst((e) => getTwoPairs(e)) ??
		expanded.mapFirst((e) => getOnePair(e)) ??
		expanded.mapFirst((e) => getHighCards(e));

	if (!handKind) {
		throw new Error('cant interpret hand as any kind of hand');
	}

	return handKind;
};

export const inOrderComparator = (a: HandWithBid, b: HandWithBid): number => {
	if (a.handType.type === b.handType.type) {
		for (let i = 0; i < a.cards.length; i++) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const ac = cardPowerMap[a.cards[i]!];
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const bc = cardPowerMap[b.cards[i]!];
			if (ac > bc) {
				return 1;
			} else if (bc > ac) {
				return -1;
			}
		}

		return 0;
	} else {
		return handTypePowerMap[a.handType.type] - handTypePowerMap[b.handType.type];
	}
};

export const handComparator = (a: HandKind, b: HandKind): number => {
	if (isFiveOfAKind(a) && isFiveOfAKind(b)) {
		return a.fiveOfAKindPower - b.fiveOfAKindPower;
	} else if (isFourOfAKind(a) && isFourOfAKind(b)) {
		return a.fourOfAKindPower === b.fourOfAKindPower
			? a.highCardPower - b.highCardPower
			: a.fourOfAKindPower - b.fourOfAKindPower;
	} else if (isFullHouse(a) && isFullHouse(b)) {
		return a.triplePower === b.triplePower
			? a.pairPower - b.pairPower
			: a.triplePower - b.triplePower;
	} else if (isThreeOfAKind(a) && isThreeOfAKind(b)) {
		return a.triplePower === b.triplePower
			? a.highCardsPower - b.highCardsPower
			: a.triplePower - b.triplePower;
	} else if (isTwoPairs(a) && isTwoPairs(b)) {
		return a.pairsPower === b.pairsPower
			? a.highCardPower - b.highCardPower
			: a.pairsPower - b.pairsPower;
	} else if (isOnePair(a) && isOnePair(b)) {
		return a.pairPower === b.pairPower
			? a.highCardPower - b.highCardPower
			: a.pairPower - b.pairPower;
	} else if (isHighCards(a) && isHighCards(b)) {
		return a.highCardPower - b.highCardPower;
	} else {
		return handTypePowerMap[a.type] - handTypePowerMap[b.type];
	}
};

export const parse = (line: string): HandWithBid => {
	const [cards, value] = line.splitIntoStringPair(' ');
	const [c1, c2, c3, c4, c5] = [...cards];
	const bid = Number.parseInt(value, 10);
	console.log(cards, value);
	if (isCard(c1) && isCard(c2) && isCard(c3) && isCard(c4) && isCard(c5)) {
		const cards: Hand = [c1, c2, c3, c4, c5];
		return {
			handType: getHandType(cards),
			cards,
			bid,
		};
	} else {
		throw new Error('corrupted line');
	}
};

export const p2 = (input: string): number =>
	input
		.lines(false)
		.map(parse)
		.sort(inOrderComparator)
		.map((hand, index) => hand.bid * (index + 1))
		.sum();

await task(p2, packageJson.aoc); // 254837398 ~40μs

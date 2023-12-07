export type Card = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';
export type Hand = [Card, Card, Card, Card, Card];

export type HandCardPower = [number, number, number, number, number];

export enum HandType {
	FIVE_OF_A_KIND = 'five-of-a-kind',
	FOUR_OF_A_KIND = 'four-of-a-kind',
	FULL_HOUSE = 'full-house',
	THREE_OF_A_KIND = 'three-of-a-kind',
	TWO_PAIRS = 'two-pairs',
	ONE_PAIR = 'one-pair',
	HIGH_CARD = 'high-card',
}

export interface HandWithBid {
	cards: Hand;
	cardPowers: HandCardPower;
	handType: HandType;
	bid: number;
}

export const isCard = (card: string | undefined): card is Card => {
	return (
		card !== undefined &&
		(card === 'A' ||
			card === 'K' ||
			card === 'Q' ||
			card === 'J' ||
			card === 'T' ||
			card === '9' ||
			card === '8' ||
			card === '7' ||
			card === '6' ||
			card === '5' ||
			card === '4' ||
			card === '3' ||
			card === '2')
	);
};

export const handTypePowerMap: Record<HandType, number> = {
	[HandType.FIVE_OF_A_KIND]: 6,
	[HandType.FOUR_OF_A_KIND]: 5,
	[HandType.FULL_HOUSE]: 4,
	[HandType.THREE_OF_A_KIND]: 3,
	[HandType.TWO_PAIRS]: 2,
	[HandType.ONE_PAIR]: 1,
	[HandType.HIGH_CARD]: 0,
};

export const inOrderComparator = (a: HandWithBid, b: HandWithBid): number => {
	if (a.handType === b.handType) {
		for (let i = 0; i < a.cards.length; i++) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const ac = a.cardPowers[i]!;
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const bc = b.cardPowers[i]!;
			if (ac > bc) {
				return 1;
			} else if (bc > ac) {
				return -1;
			}
		}

		return 0;
	} else {
		return handTypePowerMap[a.handType] - handTypePowerMap[b.handType];
	}
};

export const parse =
	(cardPowerMap: Record<Card, number>, getHandType: (hand: Hand) => HandType) =>
	(line: string): HandWithBid => {
		const [cards, value] = line.splitIntoStringPair(' ');
		const [c1, c2, c3, c4, c5] = [...cards];
		const bid = Number.parseInt(value, 10);
		if (isCard(c1) && isCard(c2) && isCard(c3) && isCard(c4) && isCard(c5)) {
			const cards: Hand = [c1, c2, c3, c4, c5];
			return {
				handType: getHandType(cards),
				cards,
				cardPowers: cards.map((card) => cardPowerMap[card]) as HandCardPower,
				bid,
			};
		} else {
			throw new Error('corrupted line');
		}
	};

export const getFiveOfAKind = (hand: Hand): HandType | undefined => {
	const first = hand[0];
	return hand.every((card) => card === first) ? HandType.FIVE_OF_A_KIND : undefined;
};

export const getFourOfAKind = (hand: Hand): HandType | undefined => {
	const hasFour = hand.find((card) => hand.filter((oc) => card === oc).length === 4);
	const highCard = hasFour ? hand.find((card) => card !== hasFour) : undefined;

	return hasFour && highCard ? HandType.FOUR_OF_A_KIND : undefined;
};

export const getFullHouse = (hand: Hand): HandType | undefined => {
	const hasThree = hand.find((card) => hand.filter((oc) => card === oc).length === 3);
	const hasTwo = hand.find(
		(card) => card !== hasThree && hand.filter((oc) => card === oc).length === 2,
	);

	return hasThree && hasTwo ? HandType.FULL_HOUSE : undefined;
};

export const getThreeOfAKind = (hand: Hand): HandType | undefined => {
	const hasThree = hand.find((card) => hand.filter((oc) => card === oc).length === 3);
	const remaining = hand.filter((card) => card !== hasThree);

	return hasThree && remaining.length === 2 && remaining[0] !== remaining[1]
		? HandType.THREE_OF_A_KIND
		: undefined;
};

export const getTwoPairs = (hand: Hand): HandType | undefined => {
	const hasPair = hand.find((card) => hand.filter((oc) => card === oc).length === 2);
	const hasOtherPair = hand.find(
		(card) => card !== hasPair && hand.filter((oc) => card === oc).length === 2,
	);
	const highCard = hand.find((card) => card !== hasPair && card !== hasOtherPair);

	return hasPair && hasOtherPair && highCard ? HandType.TWO_PAIRS : undefined;
};

export const getOnePair = (hand: Hand): HandType | undefined => {
	const hasPair = hand.find((card) => hand.filter((oc) => card === oc).length === 2);
	const remaining = hand.filter((card) => card !== hasPair);

	return hasPair &&
		remaining.length === 3 &&
		remaining[0] !== remaining[1] &&
		remaining[0] !== remaining[2] &&
		remaining[1] !== remaining[2]
		? HandType.ONE_PAIR
		: undefined;
};

export const getHighCards = (hand: Hand): HandType | undefined => {
	// TODO make an isUnique fn
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
		? HandType.HIGH_CARD
		: undefined;
};

export type Card = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';
export type Hand = [Card, Card, Card, Card, Card];

export enum HandType {
	FIVE_OF_A_KIND = 'five-of-a-kind',
	FOUR_OF_A_KIND = 'four-of-a-kind',
	FULL_HOUSE = 'full-house',
	THREE_OF_A_KIND = 'three-of-a-kind',
	TWO_PAIRS = 'two-pairs',
	ONE_PAIR = 'one-pair',
	HIGH_CARD = 'high-card',
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

import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { parse } from './parse.js';

export const p2 = (input: string): number => {
	const cards = input.lines(false).map(parse);
	cards.forEach((card, cardIndex) => {
		const pulledWinningNumbers = card.pulledNumbers.filter((pulledNumber) =>
			card.winningNumbers.includes(pulledNumber),
		).length;
		for (let i = 1; i <= pulledWinningNumbers; i++) {
			const rewardCard = cards[cardIndex + i];
			if (rewardCard) {
				card.rewardCards.push(rewardCard);
			}
		}
	});

	for (const card of cards) {
		for (const rewardCard of card.rewardCards) {
			rewardCard.count = rewardCard.count + card.count;
		}
	}

	return cards.map((card) => card.count).sum();
};

await task(p2, packageJson.aoc); // 8172507 ~4.57ms

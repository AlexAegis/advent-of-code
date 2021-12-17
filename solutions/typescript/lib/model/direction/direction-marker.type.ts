import { DirectionArrowSymbol, isDirectionArrowSymbol } from './direction-arrow-symbol.enum';
import {
	DirectionCardinalGeographicLetter,
	isDirectionCardinalGeographicLetter,
} from './direction-cardinal-geographic-letter.enum';
import {
	DirectionCardinalLiteralLetter,
	isDirectionCardinalLiteralLetter,
} from './direction-cardinal-literal-letter.enum';

export type DirectionMarker =
	| DirectionArrowSymbol
	| DirectionCardinalGeographicLetter
	| DirectionCardinalLiteralLetter;

export const isDirectionMarker = (marker: string): marker is DirectionMarker =>
	isDirectionArrowSymbol(marker) ||
	isDirectionCardinalGeographicLetter(marker) ||
	isDirectionCardinalLiteralLetter(marker);

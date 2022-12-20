import type { Constructor } from '@alexaegis/advent-of-code-lib';
import type { Component } from './component.class.js';

export type ComponentFilterFn<C extends Component> = (component: C) => boolean;

export interface ComponentFilter<C extends Component> {
	componentType: Constructor<C>;
	filter: ComponentFilterFn<C>;
}

export type ComponentFilterTypeOfTuple<C extends Component[]> = {
	[K in keyof C]: C[K] extends C[number] ? ComponentFilter<C[K]> : never;
};

export type ComponentFilterFnTypeOfTuple<C extends Component[]> = {
	[K in keyof C]: C[K] extends C[number] ? ComponentFilterFn<C[K]> : never;
};

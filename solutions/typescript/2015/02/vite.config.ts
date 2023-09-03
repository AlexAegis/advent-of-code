// managed-by-autotool

import { pakk } from '@alexaegis/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		target: 'es2022',
		lib: {
			entry: [],
			formats: ['es'],
		},
	},
	plugins: [
		pakk({
			dts: false,
		}),
	],
});

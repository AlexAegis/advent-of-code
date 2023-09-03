// managed-by-autotool

import { pakk } from '@alexaegis/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		pakk({
			dts: false,
		}),
	],
});

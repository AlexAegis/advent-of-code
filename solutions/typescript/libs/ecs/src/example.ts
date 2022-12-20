import { TerminalKitControllerBackend } from './controller/terminal-kit-controller-backend.class.js';
import { GridWorld } from './grid-world.class.js';

const world = new GridWorld();
world.createDefaultCameraAndRenderer();

world.addSystem((w) => {
	console.log('number of systems', w.systems.length);
	return false;
});

world.tick();

const controllerBackend = new TerminalKitControllerBackend();
await controllerBackend.start();

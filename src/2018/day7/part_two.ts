import { createReadStream } from 'fs';
import * as rl from 'readline';
import { Observable, interval, Subject, of, ConnectableObservable, Subscription, range, ReplaySubject } from 'rxjs';
import { takeUntil, map, tap, multicast, takeLast, bufferCount, take, bufferTime } from 'rxjs/operators';
import { finished } from 'stream';

class Node {
	node: string;
	progress: number = 0;
	constructor(node: string) {
		this.node = node;
	}
	cost = () => this.node.toLowerCase().charCodeAt(0) + 60 - 97 + 1; // 60 base cost, -97 unicode offset for lowercase letters, + 1 offset.
	processed = () => this.progress >= this.cost(); // shouldn't be bigger but hey, you never know.
	available = () => this.progress === 0;
}

class Vertice {
	from: Node;
	to: Node;
	constructor(from: Node, to: Node) {
		this.from = from;
		this.to = to;
	}
	fulfilled = () => this.from.processed();
}

class Worker {
	id: number;
	subscription: Subscription;
	constructor(id: number, subscription: Subscription) {
		this.id = id;
		this.subscription = subscription;
	}
}

interface Graph {
	nodes: Array<Node>;
	vertices: Array<Vertice>;
}
const read = new Promise<Graph>(res => {
	let graph: Graph = { nodes: [], vertices: [] };

	rl.createInterface({
		input: createReadStream('src/2018/day7/input.txt')
	})
		.on('line', line => {
			let splitLine: Array<string> = line.split(/ /);
			let from: Node = graph.nodes.find(node => node.node === splitLine[1]);
			let to: Node = graph.nodes.find(node => node.node === splitLine[7]);
			if (!from) {
				from = new Node(splitLine[1]);
				graph.nodes.push(from);
			}
			if (!to) {
				to = new Node(splitLine[7]);
				graph.nodes.push(to);
			}
			graph.vertices.push(new Vertice(from, to));
		})
		.on('close', () => {
			graph.nodes = graph.nodes.sort((a, b) => {
				if (a.node === b.node) {
					return 0;
				} else {
					return a.node > b.node ? 1 : -1;
				}
			});
			graph.vertices = graph.vertices.sort((a, b) => {
				if (a.from === b.from) {
					if (a.to === b.to) {
						return 0;
					} else {
						return a.to > b.to ? 1 : -1;
					}
				} else {
					return a.from > b.from ? 1 : -1;
				}
			});

			res(graph);
		});
});

(async () => {
	const graph: Graph = await read;

	const finished$ = new Subject(); // The cue subject when the async job is done.
	const done$ = new ReplaySubject<Node>();
	const workers: Array<Worker> = [];

	// Worker logic
	const worker = (id: number) => {
		let workingOn: Node;
		return (tick: number) => {
			console.log(`${id} - I'm currenty working on: ${JSON.stringify(workingOn)}.`);
			// If not working, pick an avaialble task.
			if (!workingOn) {
				for (let node of graph.nodes) {
					if (
						node.available() &&
						graph.vertices.filter(vertice => !vertice.fulfilled() && vertice.to === node).length === 0
					) {
						workingOn = node;
						console.log(`${id} - ${JSON.stringify(node)} can be worked on.`);
						break; // We need the first one.
					}
				}
				// This means that this worker couldn't find any jobs. Time to retire.

				if (graph.nodes.filter(node => node.available()).length === 0) {
					console.log(`${id} - No more free tasks left. Time to retire.`);
					let meSelf = workers.find(w => w.id === id);
					meSelf.subscription.unsubscribe();
					workers.splice(workers.indexOf(meSelf), 1); // Let myself out.
					// the last one please turn off the light
					if (workers.length === 0) {
						console.log(`${id} - I was the last one. Bye bye!`);
						finished$.next(id);
					}
				}
			}
			// if he's working, then do his work
			if (workingOn && !workingOn.processed()) {
				workingOn.progress++;
				console.log(`${id} - Doing my job! ${JSON.stringify(workingOn)}`);
			}
			// If just finished
			if (workingOn && workingOn.processed()) {
				console.log(`${id} - Finished.`);
				done$.next(workingOn);
				workingOn = undefined;
			}
		};
	};

	const tick$ = <ConnectableObservable<number>>interval().pipe(
		tap((tick: number) => console.log(`tick: ${tick}`)),
		takeUntil(finished$), //  Until it emits, the interval will keep ticking.
		multicast(() => new Subject())
	);

	finished$.subscribe(cue => {
		console.log(`Finished. Last one to finish: ${cue}`);
		done$
			.pipe(
				bufferTime(0),
				take(1)
			)
			.subscribe(nodes => {
				console.log(`Done's are: ${nodes.map(node => node.node).join('')}`);
			});
	});

	done$.subscribe(node => {
		console.log(`Newest done is: ${JSON.stringify(node)}`);
	});

	// Spawn 5 workers
	range(1, 2).forEach(num => {
		workers.push(new Worker(num, tick$.subscribe(worker(num))));
	});

	tick$.connect();
	// The tick$ stream is multicasted. It will only start on a connect and not immediatly at a subscription.
})(); // Completed in 1257 and 1258 ticks is too high

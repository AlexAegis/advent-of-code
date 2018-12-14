import { createReadStream } from 'fs';
import * as rl from 'readline';
import { interval, Subject, ConnectableObservable, Subscription, range, ReplaySubject } from 'rxjs';
import { takeUntil, tap, multicast, take, bufferTime } from 'rxjs/operators';

export interface Result {
	tick: number;
	seq: string;
}
export class Node {
	node: string;
	progress: number = 0;
	finishedOnTick: number = 0;
	constructor(node: string) {
		this.node = node;
	}
	cost = (useLong: boolean = false) => this.node.toLowerCase().charCodeAt(0) + (useLong ? 60 : 0) - 97 + 1; // 60 base cost, -97 unicode offset for lowercase letters, + 1 offset.
	processed = (useBaseCost: boolean = false) => this.progress >= this.cost(useBaseCost); // shouldn't be bigger but hey, you never know.
	available = () => this.progress === 0;
}

export class Vertice {
	from: Node;
	to: Node;
	constructor(from: Node, to: Node) {
		this.from = from;
		this.to = to;
	}
	fulfilled = (useBaseCost: boolean = false) => this.from.processed(useBaseCost);
}

export class Worker {
	id: number;
	workingOn: Node;
	subscription: Subscription;
	constructor(id: number) {
		this.id = id;
	}
	start = (
		tick$: ConnectableObservable<number>,
		graph: Graph,
		file: string,
		done$: Subject<Node>,
		finished$: Subject<number>
	): Worker => {
		this.subscription = tick$.subscribe(this.logic(this.id, graph, file, done$, finished$));
		return this;
	};
	logic = (id: number, graph: Graph, file: string, done$: Subject<Node>, finished$: Subject<number>) => {
		return (tick: number) => {
			//console.log(`${id} - I'm currenty working on: ${JSON.stringify(workingOn)}.`);
			// If not working, pick an avaialble task.
			if (!this.workingOn) {
				for (let node of graph.nodes) {
					if (
						node.available() &&
						graph.vertices.filter(
							vertice =>
								vertice.to === node &&
								(!vertice.fulfilled(file === 'input') || vertice.from.finishedOnTick === tick)
						).length === 0
					) {
						this.workingOn = node;
						//console.log(`${id} - ${JSON.stringify(node)} can be worked on.`);
						break; // We need the first one.
					}
				}
				// This means that this worker couldn't find any jobs. Time to retire.
				if (graph.nodes.filter(node => node.available()).length === 0) {
					//console.log(`${id} - No more free tasks left. Time to retire.`);
					this.subscription.unsubscribe();
					// the last one please turn off the light
					if (graph.nodes.filter(node => !node.processed(file === 'input')).length === 0) {
						//console.log(`${id} - I was the last one, on tick: ${tick}. Bye bye!`);
						finished$.next(tick);
					}
				}
			}
			// if he's working, then do his work
			if (this.workingOn && !this.workingOn.processed(file === 'input')) {
				this.workingOn.progress++;
				//console.log(`${id} - Doing my job! ${JSON.stringify(workingOn)}`);
			}
			// If just finished
			if (this.workingOn && this.workingOn.processed(file === 'input')) {
				//console.log(`${id} - Finished.`);
				this.workingOn.finishedOnTick = tick;
				done$.next(this.workingOn);
				this.workingOn = undefined;
			}
		};
	};
}

export interface Graph {
	nodes: Array<Node>;
	vertices: Array<Vertice>;
}
const read = (file: 'input' | 'example' = 'input') =>
	new Promise<Graph>(res => {
		let graph: Graph = { nodes: [], vertices: [] };

		rl.createInterface({
			input: createReadStream(`src/2018/day7/${file}.txt`)
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

export const runner = async (file: 'input' | 'example' = 'input'): Promise<Result> =>
	new Promise<Result>(async res => {
		const graph: Graph = await read(file);

		const finished$ = new Subject<number>(); // The cue subject when the async job is done.
		const done$ = new ReplaySubject<Node>();
		const workers: Array<Worker> = [];

		const tick$ = <ConnectableObservable<number>>interval().pipe(
			tap((tick: number) => {
				done$
					.pipe(
						bufferTime(0),
						take(1)
					)
					.subscribe(nodes => {
						let seq = nodes.map(node => node.node).join('');

						console.log(
							`| ${tick.toString().padEnd(5)}${workers
								.map(
									worker =>
										'| ' + (worker.workingOn !== undefined ? worker.workingOn.node : '.').padEnd(5)
								)
								.join(``)}| ${seq.padEnd(26)} |`
						);
					});
			}),
			takeUntil(finished$), //  Until it emits, the interval will keep ticking.
			multicast(() => new Subject())
		);

		finished$.subscribe(tick => {
			workers.forEach(worker => worker.subscription.unsubscribe());
			done$
				.pipe(
					bufferTime(0),
					take(1)
				)
				.subscribe(nodes => {
					let seq = nodes.map(node => node.node).join('');
					res({ tick: tick, seq: seq });
				});
		});
		// Spawn 5 workers (Or 2 if you are running the example)
		let header = '|Tick |';
		range(1, file === 'input' ? 5 : 2).forEach(num => {
			header += ` W ${num}  |`;
			workers.push(new Worker(num).start(tick$, graph, file, done$, finished$));
		});
		console.log(` ${header} Done                       |`);

		tick$.connect();
		// The tick$ stream is multicasted. It will only start on a connect and not immediatly at a subscription.
	});

(async () => console.log(await runner()))(); // 1115, GRTZAHVLQKYWXMUBPCIJFEDNSO

import { createReadStream } from 'fs';
import * as rl from 'readline';
import { interval, Subject, ConnectableObservable, Subscription, range, ReplaySubject } from 'rxjs';
import { takeUntil, tap, multicast, take, bufferTime } from 'rxjs/operators';
import { Node } from './node.class';
import { Graph } from './graph.interface';
import { Vertice } from './vertice.class';

export interface Result {
	tick: number;
	seq: string;
}

export class Worker {
	public workingOn: Node;
	public subscription: Subscription;

	constructor(public id: number) {}

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
						break;
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

const reader = (input: 'input' | 'example' = 'input') =>
	new Promise<Graph>(res => {
		let graph: Graph = { nodes: [], vertices: [] };

		rl.createInterface({
			input: createReadStream(`src/2018/day07/${input}.txt`)
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

export const runner = async (file: 'input' | 'example' = 'input'): Promise<number> =>
	new Promise<number>(async res => {
		const graph: Graph = await reader(file);

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
						/*let seq = nodes.map(node => node.node).join('');

						console.log(
							`| ${tick.toString().padEnd(5)}${workers
								.map(
									worker =>
										'| ' + (worker.workingOn !== undefined ? worker.workingOn.node : '.').padEnd(5)
								)
								.join(``)}| ${seq.padEnd(26)} |`
						);*/
					});
			}),
			takeUntil(finished$),
			multicast(() => new Subject())
		);

		finished$.subscribe(tick => {
			workers.forEach(worker => worker.subscription.unsubscribe());
			done$
				.pipe(
					bufferTime(0),
					take(1)
				)
				.subscribe(nodes => res(tick));
		});
		//let header = '|Tick |';
		range(1, file === 'input' ? 5 : 2).forEach(num => {
			// header += ` W ${num}  |`;
			workers.push(new Worker(num).start(tick$, graph, file, done$, finished$));
		});
		// console.log(` ${header} Done                       |`);

		tick$.connect();
	});

if (require.main === module) {
	console.time();
	(async () => {
		console.log(`Result: ${await runner()}`);
		console.timeEnd();
	})(); // 1115 ~1800ms
}

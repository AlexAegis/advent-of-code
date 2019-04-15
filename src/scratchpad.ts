import { of, BehaviorSubject, combineLatest, race, merge } from 'rxjs';
import { mergeScan, mergeAll, filter } from 'rxjs/operators';

const a = new BehaviorSubject<number>(undefined);

a.pipe(filter(a => !!a)).subscribe(console.log);

a.next(1);
a.next(2);
a.next(undefined);
a.next(3);
a.next(0);
a.next(4);

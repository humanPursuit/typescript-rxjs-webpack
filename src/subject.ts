import * as Rx from 'rxjs';

/**
const stream = Rx.Observable.interval(1000)
    .take(10)
    .scan((sum, val) => sum += val, 0);

// every subscription has own Observable execution
stream.subscribe({
    next: value => { console.log('1: ', value); }
});

setTimeout(() => {
    stream.subscribe({
        next: value => { console.log('2: ', value); }
    });
}, 3000);
 */

// Subject all subscription share an Observable execution

const clock$ = Rx.Observable.interval(1000).take(10);

const observerA = {
    next: value => { console.log('1: ', value); }
};

const observerB = {
    next: value => { console.log('2: ', value); }
};

const subject = new Rx.Subject();
// add listener to Subject
subject.subscribe(observerA);

clock$.subscribe(subject);

setTimeout(() => {
    subject.subscribe(observerB)
}, 2000);
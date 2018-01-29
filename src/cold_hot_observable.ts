import * as Rx from 'rxjs';

// const source = Rx.Observable.interval(1000);

// const subscription1 = source.subscribe({
//     next: function (x) { console.log('Observer 1: onNext: ' + x); },
//     error: function (e) { console.log('Observer 1: onError: ' + e.message); },
//     complete: function () { console.log('Observer 1: onCompleted'); },
// });

// let subscription2;

// setTimeout(function () {
//     subscription2 = source.subscribe({
//         next: function (x) { console.log('Observer 2: onNext: ' + x); },
//         error: function (e) { console.log('Observer 2: onError: ' + e.message); },
//         complete: function () { console.log('Observer 2: onCompleted'); },
//     });
// }, 2000);

// setTimeout(function () {
//     subscription1.unsubscribe();
//     subscription2.unsubscribe();
// }, 5000)


const source = Rx.Observable.interval(1000);

const hot = source.publish();

const subscription1 = hot.subscribe({
    next: function (x) { console.log('Observer 1: onNext: ' + x); },
    error: function (e) { console.log('Observer 1: onError: ' + e.message); },
    complete: function () { console.log('Observer 1: onCompleted'); },
});

setTimeout(function () {
    // hot.connect();
    setTimeout(function () {
        const subscription2 = hot.subscribe({
            next: function (x) { console.log('Observer 2: onNext: ' + x); },
            error: function (e) { console.log('Observer 2: onError: ' + e.message); },
            complete: function () { console.log('Observer 2: onCompleted'); },
        });
    }, 3000);
}, 2000);



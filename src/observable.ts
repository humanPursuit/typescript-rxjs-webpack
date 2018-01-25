import * as Rx from 'rxjs';
import * as $ from 'jquery';

const refreshBtn = document.querySelector('.refresh');
const btn1 = document.querySelector('.btn1');
const btn2 = document.querySelector('.btn2');
const btn3 = document.querySelector('.btn3');

const refreshClickStream = Rx.Observable.fromEvent(refreshBtn, 'click');
const closeClickStream1 = Rx.Observable.fromEvent(btn1, 'click');
const closeClickStream2 = Rx.Observable.fromEvent(btn2, 'click');
const closeClickStream3 = Rx.Observable.fromEvent(btn3, 'click');

const requestOnClickStream = refreshClickStream.map(function () {
    var randomOffset = Math.floor(Math.random() * 500);
    return 'https://api.github.com/users?since=' + randomOffset;
});

/******* *******/
// four versions of request stream

const requestStream = refreshClickStream.startWith('startup click')
    .map(function () {
        var randomOffset = Math.floor(Math.random() * 500);
        return 'https://api.github.com/users?since=' + randomOffset;
    });

// const requestStream1 = requestOnClickStream.merge(Rx.Observable.of('https://api.github.com/users'))

// const requestStream2 = requestOnClickStream.startWith('https://api.github.com/users')

// const startUpRequestStream = Rx.Observable.of('https://api.github.com/users');
// const requestStream3 = Rx.Observable.merge(
//     requestOnClickStream,
//     startUpRequestStream
// );

/******* *******/

// avoid callbacks

// requestStream.subscribe(function (requestUrl) {
//     const responseStream = Rx.Observable.create(function (observer) {
//         $.getJSON(requestUrl)
//             .done(function (response) { observer.next(response); })
//             .fail(function (jqXHR, status, error) { observer.error(error); })
//             .always(function () { observer.complete(); })
//     });
//     responseStream.subscribe(function (response) {
//         console.log(response);
//     });
// });

const responseStream = requestStream
    .flatMap(requestUrl => Rx.Observable.fromPromise($.getJSON(requestUrl)));

// const suggestionStream1 = responseStream
//     .merge(refreshClickStream.map(() => null))
//     .startWith(null);

// single button refresh

// combineLatest
// stream A: --a-----------e--------i-------->
// stream B: -----b----c--------d-------q---->
//           vvvvvvvv combineLatest(f) vvvvvvv
//           ----AB---AC--EC---ED--ID--IQ---->

const suggestionStream1 = closeClickStream1.startWith('startup click')
    .combineLatest(responseStream, function (click, listUsers) {
        return listUsers[Math.floor(Math.random() * listUsers.length)];
    })
    .merge(refreshClickStream.map(() => null))
    .startWith(null);

suggestionStream1.subscribe(suggestion => {
    console.group('stream1');
    console.log(suggestion);
    console.groupEnd();
});

// flatMap vs map
// https://namitamalik.github.io/Map-vs-FlatMap/

// let visitors = [
//     "Namita",
//     "Amit",
//     "Rohit",
//     "Neetika"
// ];

// let source = Rx.Observable.from(visitors)
//     .map(x => Rx.Observable.of(x))
//     .mergeAll();

// equal to below

// let source = Rx.Observable.from(visitors)
//     .flatMap(x => Rx.Observable.of(x))

// source.subscribe(x => console.log(x));
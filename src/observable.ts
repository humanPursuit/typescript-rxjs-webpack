import * as Rx from 'rxjs';
import * as $ from 'jquery';

// const requestStream = Rx.Observable.of('https://api.github.com/users');

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

// const clickStream = Rx.Observable.fromEvent(document.body, 'click');

// const stream = clickStream
//     .map(function () { return 1; });

// stream.subscribe(function (x) {
//     console.log(x);
// })

let visitors = [
    "Namita",
    "Amit",
    "Rohit",
    "Neetika"
];

let source = Rx.Observable.from(visitors)
    .map(x => Rx.Observable.of(x))
    .mergeAll();

source.subscribe(x => console.log(x));
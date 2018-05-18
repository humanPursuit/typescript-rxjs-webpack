import * as Rx from "rxjs";

const ajax = url =>
  new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open("GET", url);
    req.responseType = "json";
    req.onload = function() {
      if (req.status == 200) {
        resolve(req.response);
      } else {
        reject(new Error(req.statusText));
      }
    };
    req.onerror = function() {
      reject(new Error("IO Error"));
    };
    req.send();
  });

/**
 *
 * Observable(promise) -------> HTTP call --------> Extact value -------> display price
 *
 */

const csv = str => str.split(/,\s*/);

/* In proxySettings.js change (don't forget to restart the Gulp script):
const yahooProxyOptions = {
  target: 'https://query1.finance.yahoo.com',
  changeOrigin: true,
  pathRewrite: {
    '^/external/yahoo': ''
  }
};
*/

// Proxying around CORS -> 'https://query1.finance.yahoo.com
const makeQuotesUrl = (symbols, fields) =>
  `/external/yahoo/v7/finance/quote\
?lang=en-US\
&region=US\
&corsDomain=finance.yahoo.com\
&symbols=${symbols.join(",")}\
&fields=${fields.join(",")}`;

const requestQuote$ = (symbols, fields) =>
  Rx.Observable.fromPromise(ajax(makeQuotesUrl(symbols, fields))).pluck(
    "quoteResponse",
    "result"
  );

const twoSecond$ = Rx.Observable.interval(2000);
const fetchDataInterval$ = symbol =>
  twoSecond$.mergeMap(() => requestQuote$(symbol));

const symbol$ = Rx.Observable.of("FB", "CTXS", "AAPL");

const ticks$ = symbol$.mergeMap(fetchDataInterval$);

ticks$.subscribe((...args) => {
  console.log(args);
});

const twoSecond$ = Rx.Observable.interval(2000);
const fetchDataInterval$ = symbol =>
  twoSecond$.mergeMap(() => requestQuote$(symbol));

const symbol$ = Rx.Observable.of("FB", "CTXS", "AAPL");

const ticks$ = symbol$.mergeMap(requestQuote$);

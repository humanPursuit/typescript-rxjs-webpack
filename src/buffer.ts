import { Observable } from "rxjs";
import { buffer, bufferCount, bufferWhen } from "rxjs/operators";
import { pluck, debounceTime } from "rxjs/operators";

// Observable.interval(50)
//   .buffer(Observable.timer(500))
//   .subscribe(function(val) {
//     console.log(`Data in buffer: [${val}]`);
//   });

const input = document.querySelector(".input");
const button = document.querySelector(".button");

Observable.fromEvent(input, "keyup")
  // buffers a total of five events
  .bufferCount(5)
  // extract the value of the input box, use the first event's DOM element that received the key input
  .map(events => {
    const target = (<KeyboardEvent>events[0]).target;
    const value = (<HTMLInputElement>target).value;
    return value;
  })
  .map(val => parseInt(val, 10))
  .filter(val => !Number.isNaN(val));
//   .subscribe(amount => {
//     console.log(`Amount: `, amount);
//   });

Observable.fromEvent(input, "keyup")
  .debounceTime(200)
  .pluck("target", "value")
  .filter(val => val !== "")
  .bufferWhen(() => Observable.fromEvent(button, "click"))
  .do(history => {
    return history.pop();
  })
  .subscribe(history => {
    console.log(history);
    let contents = '';
    if (history.length) {
      for (const item of history) {
          contents += `<li>${item}</li>`;
      }
      document.getElementById('history').innerHTML = contents;
    }
  });

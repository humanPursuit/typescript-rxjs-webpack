import { Subject, BehaviorSubject } from 'rxjs';

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

// const clock$ = Rx.Observable.interval(1000).take(10);

// const observerA = {
//     next: value => { console.log('1: ', value); }
// };

// const observerB = {
//     next: value => { console.log('2: ', value); }
// };

// const subject = new Rx.Subject();
// // add listener to Subject
// subject.subscribe(observerA);

// clock$.subscribe(subject);

// setTimeout(() => {
//     subject.subscribe(observerB)
// }, 2000);

// user model
class User {
    static id: number = 0;

    id: number;

    constructor(public name: string, public avatarSrc?: string) {
        this.id = User.id++;
    }
}

// user service
class UserService {
    currentUser: Subject<User> = new BehaviorSubject<User>(null);

    public setCurrentUser(newUser: User): void {
        this.currentUser.next(newUser);
    }
}

const userService = new UserService();

const user1 = new User('1');
const user2 = new User('2');
const user3 = new User('3');

userService.setCurrentUser(user1);

userService.currentUser
    .subscribe((user: User) => {
        console.log('1 currentUser: ', user);
    });

setTimeout(() => {
    userService.setCurrentUser(user2);
    userService.currentUser
        .subscribe((user: User) => {
            console.log('2 currentUser: ', user);
        });
}, 2000)


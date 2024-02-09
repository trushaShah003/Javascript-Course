'use strict';

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.body.addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();

// //IIFE - Imediately Invoked Function Expression
// (function () {
//   console.log('this will run just this once');
// })();
// // the parethisis around the function will count it as an expression
// // and the parenthisis at the end will directly call the function
// //IIFE can also be declared as

// (() => console.log('this will also run just this once'))();

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

/*
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n ${this.options.join('\n')}\n (Write option number) `
      )
    );
    console.log(answer);

    if (answer < this.options.length) {
      this.answers[answer]++;
    } else {
      alert('Wrong option selection!!');
    }
    // console.log(this.answers);
    this.displayResults();
    this.displayResults('string');
  },

  displayResults(type = 'array') {
    if (type === 'array') console.log(this.answers);
    else if (type === 'string') {
      //Poll results are 13, 2, 4, 1
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};
// console.log(poll.answers);
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults();
poll.displayResults('string');

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [5, 2, 3] });
poll.displayResults.call({ answers: [5, 2, 3, 5, 6] }, 'string');
poll.displayResults.call({ answers: [5, 2, 3, 5, 6] });

const lufthansa = {
  airline: 'luftnhansa',
  iatacode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} has booked a flight ${this.iatacode + flightNum} from ${
        this.airline
      }`
    );
    this.bookings.push(
      `${name} has booked a flight ${this.iatacode + flightNum} from ${
        this.airline
      }`
    );
  },
};

lufthansa.book(34, 'Trusha nandola');
lufthansa.book(65, 'Sheldon Cooper');

const swiss = {
  airline: 'Swiss Airlines',
  iatacode: 'SW',
  bookings: [],
};

const book = lufthansa.book; /// this will allocate the book inside lufthansa to book outside

// swiss.book(56, 'mary Cooper'); // this won't work because this keyword has nowhere to point
// CALL method is a method for functions
// It refers an object to point to for this keyword
book.call(swiss, 45, 'Mary Cooper');
book.call(lufthansa, 78, 'George Cooper');

console.log(swiss);
console.log(lufthansa);

// Similar to CALL method we also have APPLY method
//APPLY - it work the same as call but takes an array as an input

const flightData = [34, 'Farah Khan'];

book.apply(swiss, flightData);
// but APPLY is OVERRATED beacause we now have a better alternative

book.call(lufthansa, ...flightData); // this works just the same as the APPLY method

const eurowings = {
  airline: 'Eurowings',
  iatacode: 'EW',
  bookings: [],
};

// BIND method
// instead of just temporarily setting the this keyword to any object, BIND method returns a new function with the this keyword set automaticall
// BIND can be very usefull when we have to book multiple flights with the same airlines

const bookEW = book.bind(eurowings); // now "bookEW" function has a built in this keyword pointed out to eurowings object

bookEW(36, 'John Smith');
console.log(eurowings);

lufthansa.planes = 304;
lufthansa.buyPlanes = function () {
  this.planes++;
  console.log(this.planes);
};
lufthansa.buyPlanes();

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlanes.bind(lufthansa));
console.log(lufthansa);

const addTax = rate => value => console.log(value + value * rate);

// const addGST = addTax.bind(null, 0.18);
// console.log(addGST(500));
// console.log(addGST(100));

const addGST = addTax(0.18);
addGST(100);



// // returning a function within a function
// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting}, ${name} !`);
//   };
// };

// // stroring a function to a variable and making it another function
// const greetHey = greet('hey'); // greet returns a function that is then stored in the variable making it also a function
// greetHey('trusha');
// greetHey('yashvi');

// // similarly we can do this
// greet('Hello')('Trusha');

// doing it all using arrow function
const greet = greeting => name => console.log(`${greeting}, ${name} !`);

const greetHey = greet('hey');
greetHey('trusha');
greetHey('yashvi');
greet('Hello')('Trusha');

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const applyFunction = function (str, fn) {
  console.log(`The original string is : ${str}`);
  console.log(`The Transformed string is : ${fn(str)}`);

  console.log(`converted by : ${fn.name}`);
};

applyFunction('Hello I am trusha', upperFirstWord);
applyFunction('Hello I am trusha', oneWord);

const trusha = {
  name: 'Trusha nandola',
  passport: 265876921,
};
let flight = 'LN45';

const checkedIn = function (fligthNum, passanger) {
  fligthNum = 'LN99';
  passanger.name = 'Ms. ' + passanger.name;

  passanger.passport === 265876921
    ? alert('checked in confirmed...')
    : alert('wrong passport !!!');
};

checkedIn(flight, trusha);

trusha.passport = Math.trunc(Math.random() * 1000000000);

checkedIn(flight, trusha);

const bookings = [];

//Set default values
const createBooking = function (
  flightNum,
  numPassangers = 1,
  price = 199 * numPassangers
) {
  //ES5 way
  // numPassangers = numPassangers|| 1;
  // price = price || 199

  const booking = {
    flightNum,
    numPassangers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking(354);
createBooking(656, 3);
createBooking(63, 44, 34523);
createBooking(63, 87498);
createBooking(564, undefined, 387);

console.log(bookings);
*/

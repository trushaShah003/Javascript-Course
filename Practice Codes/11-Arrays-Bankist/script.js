'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let currentAccount;
let sort = false;

const updateUI = function () {
  // //display movements
  displayMovements(currentAccount.movements);
  //display balance
  calcDisplayBalance(currentAccount);
  //display summary
  displaySummary(currentAccount);
};

const displayMovements = function (movements, sort = false) {
  // first we emty the data that the movements already contains
  // for this we use innerHTML function
  //this funnction can be used to read or manipulate the html code

  containerMovements.innerHTML = '';
  // here this innerHTML function just works the same as .textContent method

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  //will sort in ascending order but we display from bottom to up so will look like descending order

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    // It is good to use template literals for addind an HTML code in the script

    const html = `
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type} </div>
    <div class="movements__value">${mov} €</div>
  </div>`;

    // adding this html code into the html file
    // for this we rtAdjacentHTML function that only inserts new data
    // this has two parameters 1- the position where you want to enter the code
    //2 - the code that you want to enter

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

const displaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((total, mov) => total + mov, 0);
  labelSumIn.textContent = `${incomes} €`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((total, mov) => total + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)} €`;

  const intrests = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1) // only if we want to add only the intrests that are atleast one
    .reduce((acc, int) => acc + int);
  labelSumInterest.textContent = `${intrests} €`;
};

const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsername(accounts);

/// Event Handlers
btnLogin.addEventListener('click', function (e) {
  // to prevent the form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display ui and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    } !`;
    containerApp.style.opacity = 100;
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();

    updateUI();
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance > amount &&
    recieverAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    updateUI();
  } else alert(`Invalid Transfer!!!`);

  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
  inputTransferTo.blur();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    //delete account
    accounts.splice(index, 1);

    // hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov > amount * 0.1)) {
    //add movement
    currentAccount.movements.push(amount);

    // update UI
    updateUI(currentAccount);
  }
});

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sort);
  sort = !sort;
  console.log(sort);
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUSD = 1.1;

/////////////////////////////////////////////////

///Array method practice////

const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, deposit) => acc + deposit, 0);
console.log(bankDepositSum);

// const numDeposit1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;
// console.log(numDeposit1000);

const numDeposit1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => (mov >= 1000 ? ++acc : acc), 0);
console.log(numDeposit1000);

//////////////////////////////////////////////////
// const diceRolls = Array.from(
//   { length: 100 },
//   () => Math.trunc(Math.abs(Math.random() * 6)) + 1
// );
// console.log(diceRolls);

/////////////SORT METHOD/////////////
//// sort method sorts the input array of strings in an ascending order
/// sort method also MUTATES the original array

// const users = ['jonas', 'trusha', 'yashvi', 'abhay'];
// console.log(users.sort());

// // sort method by default considers the input as an array
// // that is why the same statement will not work for numbers
// console.log(movements);
// console.log(movements.sort()); // sorted as if it were strings

// // solution to apply sor() on numbers

// //ascending

// //return <0 A,B (to keep the order)
// //return >0 B,A (to change the order)
// // movements.sort((a, b) => {
// //   if (a < b) return -1;
// //   else if (a >b) return 1;
// // });
// movements.sort((a, b) => a - b); // a-b will return <0 if a<b(keep) and return >0 if a>b(change)
// console.log(movements);

// //descending

// //return <0 A,B (to keep the order)
// //return >0 B,A (to change the order)
// // movements.sort((a, b) => {
// //   if (a > b) return -1;
// //   else if (a < b) return 1;
// // });
// movements.sort((a, b) => b - a);

// console.log(movements);

// //////////FLAT AND FLATMAP METHOD/////////////

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8, 9];
// console.log(arr.flat()); //// flat method flattens a nested array and returns all the entries in an array

// // by default the parameter in flat method is set to 1
// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8, 9];
// // so if you want to flatten a deeply nested array, simply pass the nest level as a parameter in the flat method
// console.log(arrDeep.flat(2));

// ///example

// const overallBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acu, mov) => acu + mov, 0);
// console.log(overallBalance);

// // many times in real life we use map and flat method together
// //as a result flataMap method was defined that basically does the same thing
// //NOTE : flatMap method can only flatten an array to its first level of nesting

// const overallBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acu, mov) => acu + mov, 0);
// console.log(overallBalance);

////////SOME METHOD////////////

//some method loops through an array and returns a boolean value base on the input provided
// we can add and element or a callback function
// similar to includes() method BUT includes only passes an element
// some can also operate on conditions
// it will return true if any one value is true

/////////////// EVERY METHOD/////////////////

// every method is just like some BUT it will only return true if EVERY element of the array satisfies the condition

// /////////FIND METHOD//////////////

// // the find method loops through the array and returns the first element that satisfies the condition
// // we can either pass a value that we want to find or a callback function
// // find method just works the same as the filter method but it return a single value instead of a new array

// const firstwithdrawal = movements.find(mov => mov < 0);
// console.log(firstwithdrawal);

// // FiND is more useful for an array of objects
// console.log(accounts);
// const account = accounts.find(acc => acc.username === 'js');
// console.log(account);

//////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!
1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const calcAdultAvghumanAge = ages =>
//   ages
//     .map(dogAge => (dogAge > 2 ? 16 + dogAge * 4 : 2 * dogAge))
//     .filter(humanAge => humanAge >= 18)
//     .reduce((avg, age, i, arr) => avg + age / arr.length);

// console.log(calcAdultAvghumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAdultAvghumanAge([16, 6, 10, 5, 6, 1, 4]));

// ///////// Method Chaining /////////////

// const totalDepositsUSD = movements
//   .filter(mov => mov > 0) // if there is a bug in this statement,we can use arr parameter to print
//   //bug code
//   // .map((mov, i, arr) => {
//   //   console.log(arr);
//   //   return mov * eurToUSD;
//   // })
//   .map(mov => mov * eurToUSD)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);

// ///////////////////////////////////////
// // Coding Challenge #2

// /*
// Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

// 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
// 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
// 4. Run the function for both test datasets

// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

// GOOD LUCK 😀
// */

// const calcAverageHumanAge = function (ages) {
//   console.log(`ages : ${ages}`);
//   /// 1.
//   //detailed calcHumanAge
//   // const calcHumanAge = function (dogAge) {
//   //   if (dogAge <= 2) return 2 * dogAge;
//   //   else return 16 + dogAge * 4;
//   // };
//   //SImplified calHumanAge
//   const calcHumanAge = dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4);

//   const allHumanAges = ages.map(calcHumanAge);
//   console.log(`human ages of all the dogs : ${allHumanAges}`);

//   //2.
//   const adultHumanAges = allHumanAges.filter(age => age >= 18);
//   console.log(`human ages of dogs above 18 : ${adultHumanAges}`);

//   //3. correct

//   const avgAdultHumanAges = adultHumanAges.reduce(
//     (avg, age, i, arr) => avg + age / arr.length
//   );
//   console.log(`the average human age of adult dogs  : ${avgAdultHumanAges}`);
// };
// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// console.log('=======================');
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

//   //3.
//   const calcAdultAvghumanAge = function (dages) {
//     console.log(`-------------`);

//     const adultDogAges = dages.filter(dogAge => dogAge >= 3);
//     console.log(`the dog ages of all the adult dogs : ${adultDogAges}`);

//     const adultHumanAges = adultDogAges.map(calcHumanAge);
//     console.log(`the human age of all adult dogs : ${adultHumanAges}`);

//     const avg =
//       adultHumanAges.reduce((acc, cur) => acc + cur, 0) / adultDogAges.length;
//     return avg;
//   };
//   console.log(
//     `the average human age of adult dogs  : ${calcAdultAvghumanAge(ages)}`
//   );
// };
// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// console.log('=======================');
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// //////// REDUCE //////////

// // the reduce method passes two parameter 1- callback function 2- initial value of accumulator
// // the callback function has 4 parameters
// //1- accumulator: it stores the accumulated value of each iteration (snowball)
// //2- the current element
// //3- the index
// //4- the entire array
// // NOTE : reduce method only returns a single value NOT an array
// console.log(movements);

// // using simple function
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`iteration ${i} : ${acc}`); // to see the process
//   return acc + cur;
// }, 0);

// // using arrow function
// // const balance = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(balance);

// //detailed
// // const max = movements.reduce(function (acc, cur) {
// //   if (acc >= cur) return acc;
// //   else if (acc < cur) return cur;
// // }, movements[0]);

// // simplified
// const max = movements.reduce(
//   (acc, cur) => (acc >= cur ? acc : cur),
//   movements[0]
// );

// console.log(max);

//////FILTER///////////

// // in this deposits array we only want the positive value ( values that are deposited)
// const deposits = movements.filter(function (mov) {
//   // the only elements for which this function returns true, will get stored into the deposits array
//   return mov > 0;
// });

// const withdrawals = movements.filter(mov => mov < 0);

// console.log(movements);
// console.log(deposits);
// console.log(withdrawals);

///////////MAP///////////

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUSD;
// });

// const movementsUSD = movements.map(mov => mov * eurToUSD);

// console.log(movements);
// console.log(movementsUSD);

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const checkDogs = function (dogsJulia, dogsKatie) {
//   const dogsJuliaCorrected = dogsJulia.slice().splice(1, dogsJulia.length - 3);

//   const dogsTotal = [...dogsJuliaCorrected, ...dogsKatie];

//   dogsTotal.forEach(function (dogAge, i, arr) {
//     if (dogAge >= 3) {
//       console.log(
//         `Dog number ${i + 1} is an adult, and is ${dogAge} years old`
//       );
//     } else if (dogAge < 3) {
//       console.log(`Dog number ${i + 1} is still a puppy 🐶`);
//     }
//   });
// };
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

/*
const arr = ['a', 'b', 'c', 'd', 'e'];

/// ARRAY METHODS ////

/// SLICE ///
// just like on a string slice cuts the array
// slice DOES NOT MUTATE the original array

console.log(arr.slice(2));
console.log(arr.slice(1, 3));
console.log(arr.slice(-1));
console.log(arr);

/// SPLICE ///
//it works just as the splice method but it DOES MUTATE the original array
// the second parameter in splice is deleteCount it deletes that many elements from the index given

// console.log(arr.splice(2));
console.log(arr.splice(2, 2));
console.log(arr);

//// REVERSE ////
// reverse method reverses the array elements
// it DOES MUTATE the original array

const arr2 = ['j', 'i', 'h', 'g', 'f'];

console.log(arr2.reverse());
console.log(arr2);


*/

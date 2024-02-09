'use strict';

// Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainCourseIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainCourseIndex]];
  },
};

const x = restaurant.order(1, 0);
console.log(x);

// object decunstruction
//we can only make variables with the same name as the object for it to identify it properly and deconstruct it
// const { name, mainMenu, openingHours } = restaurant;
// console.log(name, mainMenu, openingHours);

// if we want to change the name of the deconstructed variables
const { name: restaurantName, mainMenu: menu } = restaurant;
console.log(restaurantName, menu);

// spread operator - spreads the content of the array by comma
// it is similar to destructuring => helps get elements out of the array
// diffrence = spread operator takes all the elements of the array and it does not automatically creat new variable to store it
const arr = [7, 8, 9];
const badNewArray = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArray);

const newArray = [1, 2, ...arr];
console.log(newArray);

console.log(...newArray);

const newMenu = [...restaurant.mainMenu, 'DalBati'];
console.log(newMenu);

// two imp use cases of spread operator
//1. to make shallow copies of arrays
const mainmenuCopy = [...restaurant.mainMenu];
// similar to object.assign() used to make shallow copies of object

//2. to merge two or more arrays together
const menu3 = [...restaurant.starterMenu, ...restaurant.mainMenu];

// spread operator can be used on all iterables
//iterables = strings, maps, arrays, sets but NOT objects
//  spread operator can only be used to make a new array or in functions to pass arguments
// it can only be used where values are expected to be seperated by comma
// `${...array}` will not work

// since es2018 we can use spread operator for objects
// this makes it easier to shallow copy an object and change only a few properties

// SPREAD , becuase it is on the riight side
const arr1 = [1, 2, ...[3, 5, 4]];

//REST , when it is on left side (while destructuring)
// REST = it takes multiple values and packs them into an array
const [a, b, ...others] = [1, 2, 3, 4, 5, 6, 7];
console.log(a, b, others);

// rest can only be used as the end element and it can only be used once
// rest and spread can both be used at the same time

const [dish1, dish2, ...otherFood] = [
  ...restaurant.starterMenu,
  ...restaurant.mainMenu,
];
console.log(dish1, dish2, otherFood);

// REST for Objects

const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// REST for functions
// it can take any arbitary number of input value
const add = function (...numbers) {
  // console.log(...numbers);
  console.log(numbers);
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
  return sum;
};
add(2, 3);
add(2, 3, 4, 5, 6, 7);

// && and || operators can also be used for short cicuiting
// || wil return the first truthy value or the last elemnt if all are falsy
// && will return the first falsy value or the last element if all are truthy
// || cannot work if the value defined is 0 ar '' and not falsy
// that is why nullish operator(??) was introduced in es2020
// ?? works just as || but does not consider 0 and '' as falsy values

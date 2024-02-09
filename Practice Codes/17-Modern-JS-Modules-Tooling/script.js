// import './shoppingCart.js';
console.log('this is main script');

// import { addToCart, totalPrice as price, qt } from './shoppingCart.js';

// console.log('Total : ');
// console.log(shippingCost * cartItem);

// addToCart('apples', 5);
// console.log(price, qt);

import * as ShoppingCart from './shoppingCart.js';

// import add from './shoppingCart.js';
// add('pizzas', 2);

// top level await blocks the execution
// console.log('start.....');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('end.....');

// const getLastPosts = async function () {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();
//   return { title: data.at(-1).title, body: data.at(-1).body };
// };

// // const last = getLastPosts(); // this won't work because it will get called before the fetch executes
// const last = await getLastPosts(); // in such cases top level await can be help ful
// console.log(last);

// Modern Pattern

// we use an iife to make sure that the function we use is called only once
const shoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 20;
  const totalPrice = 400;
  const totalQuantity = 3;
  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} are added to cart.`);
  };
  const orderStocks = function (product, quantity) {
    // cartItem.push({ product, quantity });
    console.log(`${quantity} ${product} are ordered.`);
  };

  return {
    cart,
    totalPrice,
    totalQuantity,
    addToCart,
  };
})();

// shoppingCart2.addToCart('breads', 5);
// shoppingCart2.addToCart('pizzas', 3);
// shoppingCart2.addToCart('apples', 5);
// console.log(shoppingCart2);
// console.log(shoppingCart2.totalPrice);
// console.log(shoppingCart2.shippingCost);

import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
// import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 3 },
    { product: 'pizza', quantity: 2 },
  ],
  user: { loggedIn: true },
};

const cloneState = Object.assign({}, state); // object.assign does live cloning => any change in the original file after cloning will also reflect on the clone
const deepCloneState = cloneDeep(state);
state.user.loggedIn = false;
console.log(state);
// console.log(cloneState);
console.log(deepCloneState);
// state.cart.push({ product: 'apples', quantity: 3 });
// state.cart.push({ product: 'oranges', quantity: 3 });

// if (module.hot) {
//   module.hot.accept();
// }

class Person {
  greeting = 'hey';
  constructor(name) {
    this.name = name;
    console.log(this.greeting, this.name);
  }
}

const trusha = new Person('trusha');

console.log('trusha' ?? null);

console.log(state.cart.find(el => el.quantity <= 2));

import 'core-js/stable';

// for pollifilling async functions
import 'regenerator-runtime/runtime.js';

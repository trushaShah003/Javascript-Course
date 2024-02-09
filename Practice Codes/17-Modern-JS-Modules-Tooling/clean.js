class Budget {
  constructor(value, description, user) {}
}

const budget = [
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
];

// makes this array immutable
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

const getLimit = user => spendingLimits?.[user] ?? 0;
const addExpenses = function (value, description, user = 'jonas') {
  user = user.toLowerCase();

  // const lim;
  // if (spendingLimits[user]) {
  //   lim = spendingLimits[user];
  // } else {
  //   lim = 0;
  // }
  // const lim = spendingLimits[user] ? spendingLimits[user] : 0;
  // const limit = spendingLimits?.[user] ?? 0;

  if (value <= getLimit(user)) {
    budget.push({ value: -value, description: description, user: user });
  }
};
addExpenses(10, 'Pizza 🍕');
addExpenses(100, 'Going to movies 🍿', 'Matilda');
addExpenses(200, 'Stuff', 'Jay');

const check = function () {
  //   for (const el of budget) {
  //     const lim;
  //     if (spendingLimits[el.user]) {
  //       lim = spendingLimits[el.user];
  //     } else {
  //       lim = 0;
  //     }

  //     if (el.value < -lim) {
  //       el.flag = 'limit';
  //     }
  //   }
  budget.forEach(entry =>
    entry.value < -getLimit(entry.user) ? (entry.flag = 'limit') : ''
  );
};

// console.log(budget);

const bigExpenses = function (bigLimit) {
  let output = '';
  for (const el of budget) {
    output += el.value <= -bigLimit ? `${el.description.slice(-2)} / ` : '';
  }
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
};
// budget.filter(entry => {
//   entry.value <= -bigLimit
// })

console.log(budget);
check();
bigExpenses(500);

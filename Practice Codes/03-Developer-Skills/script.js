// Remember, we're gonna use strict mode in all scripts now!
"use strict";

// PROBLEM 1:
// We work for a company building a smart home thermometer. Our most recent task is this: "Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error."
/*
const temperatures = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];

const calcTempAmplitude = function (arr) {
  let max = arr[0];
  let min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (typeof arr[i] !== "number") continue;
    if (max < arr[i]) max = arr[i];
    if (arr[i] < min) min = arr[i];
  }
  console.log(max, min);

  return max - min;
};
console.log(temperatures);
console.log(calcTempAmplitude(temperatures));


// PROBLEM 2:
// Function should now receive 2 arrays of temps

const calcTempAmplitude2 = function (t1, t2) {
  for (let i = 0; i < t2.length; i++) {
    t1.push(t2[i]);
  }
  let max = t1[0];
  let min = t1[0];
  for (let i = 1; i < t1.length; i++) {
    if (typeof t1[i] !== "number") continue;
    if (max < t1[i]) max = t1[i];
    if (t1[i] < min) min = t1[i];
  }
  console.log(max, min);

  return max - min;
};
const temps1 = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];
const temps2 = [7, -8, -6, -1, "error", 3, 23, 87, 55, 14, 19, 5];

console.log(calcTempAmplitude2(temps1, temps2));

*/

///////////////////////////////////////
// Coding Challenge #1

/*
Given an array of forecasted maximum temperatures, the thermometer displays a string with these temperatures.

Example: [17, 21, 23] will print "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."

Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console.

Use the problem-solving framework: Understand the problem and break it up into sub-problems!

TEST DATA 1: [17, 21, 23]
TEST DATA 2: [12, 5, -5, 0, 4]
*/

// this was NOT the intended solution
/*
const printForecast = function (arr) {
  let forecast = "";
  let max = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }

    forecast += `... ${max}℃ in ${i + 1} days `;
  }
  console.log(forecast);
};
*/
const printForecast = function (arr) {
  let forecast = "... ";
  for (let i = 0; i < arr.length; i++) {
    forecast += ` ${arr[i]}℃ in ${i + 1} days ...`;
  }
  console.log(forecast);
};

console.log([17, 21, 23]);
printForecast([17, 21, 23]);
console.log([12, 5, -5, 0, 4]);
printForecast([12, 5, -5, 0, 4]);

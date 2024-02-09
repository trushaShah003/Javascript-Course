"use strict"

/*
let js = "sss";
if ( js == "sss") alert("ttttttttt");

console.log(41+85-60);
console.log("jonas");
console.log(41);


const wMark = 85;
const hMark = 1.67;
const wJohn = 65;
const hJohn = 1.55;

const bmiMark = wMark / hMark **2;
const bmiJohn = wJohn / hJohn **2;

const markHigherBMI = bmiMark > bmiJohn;
const markNotHigherBMI = bmiMark < bmiJohn;

console.log("the weight and height of mark are" + wMark, hMark);
console.log("the weight and height of john are" + wJohn, hJohn);
console.log(bmiMark, bmiJohn);
console.log(markHigherBMI, markNotHigherBMI);

if(markHigherBMI)
console.log(`Mark has a higher BMI of ${bmiMark} than John's being ${bmiJohn}.`);
else
console.log(`John has a higher BMI of ${bmiJohn} than Mark's being ${bmiMark}.`);


CODING CHALLENGE #3

There are two gymnastics teams: Dolphins and Koalas. They compete against each other 3 times. The winner with the highest average score wins a trophy!

Your tasks:

1. Calculate the average score for each team, using the test data included below. The average score for Dolphins should be assigned to the scoreDolphins variable, and the average score of Koalas should be assigned to the scoreKoalas variable.

2. Compare the team's average scores to determine the winner of the competition, and print to the console:

"C" if Dolphins win, or

"Koalas win the trophy" if Koalas win, or

"Both win the trophy" if their average scores are equal.



TEST DATA: Dolphins scored 96, 108, and 89. Koalas scored 88, 91, and 110.



const scoreDolphins = (20 + 91 + 110) / 3;
const scoreKoalas = (20 + 91 + 110) / 3;

console.log(scoreDolphins, scoreKoalas)

if (scoreDolphins > scoreKoalas && scoreDolphins>100)
console.log("Dolphins win the trophy !!");
else if (scoreDolphins < scoreKoalas && scoreKoalas>100)
console.log("koalas win the tropfy !!");

if (scoreDolphins === scoreKoalas && scoreDolphins>100 && scoreKoalas>100)
console.log("the match is draw. ");
else 
console.log ("no one wins.😢");



let day = 'thuxdrsday';

switch(day)
{
    case 'monday':
        console.log("It is monday.");
        break;
    

        case 'tuesday':
            console.log("It is tuesday.");
            break;

        case 'wednesday':
        case 'thursday':
            console.log("It is wednesday or thursday.");
            break;
        
        case 'friday':
            console.log("It is friday.");
            break;
        
        case 'saturday':
        case 'sunday':
            console.log("It is the weekend✨`");
            break;
        
        default :
            console.log("Not a valid weekday!");
            break;
}



let day = 'saturday';

if(day==='monday') console.log("It is monday.");
else if(day==='tuesday') console.log("It is tuesday.");
else if(day==='wednesday' || day === 'thursday')
console.log("It is wednesday or thursday.");
else if (day==='friday') console.log("It is friday");
else if(day==='saturday' || day === 'sunday')
console.log("It is the weekend.");
else
console.log("Not a valid day!!");



// Coding Challenge #4

const bill_1 = 275;
let tip_1 = bill_1<=300 && bill_1>=50 ? (bill_1 * 15) / 100: (bill_1 * 20) / 100;
let tbill_1 = bill_1 + tip_1;
console.log(`The bill of customer 1 was ${bill_1} and tip calculated was ${tip_1}, So the total bill is ${tbill_1}.`);

const bill_2 = 40;
let tip_2 = bill_2<=300 && bill_2>=50 ? (bill_2 * 15) / 100: (bill_2 * 20) / 100;
let tbill_2 = bill_2 + tip_2;
console.log(`The bill of customer 2 was ${bill_2} and tip calculated was ${tip_2}, So the total bill is ${tbill_2}.`);

const bill_3 = 430 ;
let tip_3 = bill_3<=300 && bill_3>=50 ? (bill_3 * 15) / 100: (bill_3 * 20) / 100;
let tbill_3 = bill_3 + tip_3;
console.log(`The bill of customer 3 was ${bill_3} and tip calculated was ${tip_3}, So the total bill is ${tbill_3}.`);


// Function DeclaraTION

function ageCalc(BirthYear){
    return 2023 - BirthYear;
}
const age1 = ageCalc(2003);
console.log(age1);

// Function Expression

let age = function (BirthYear) {
    return 2024 - BirthYear;
}
const age3 = age(2003)
console.log(age3);

// Arrow Function

const age2 = BirthYear => 2025 - BirthYear;
const age4 = age2(2003);
 console.log(age4);


// Functions Calling Functions

const cutFruits = fruit => fruit * 4;
const fruitprocessor = function(apples, oranges)
{
    const appleP = cutFruits(apples);
    const orangeP = cutFruits(oranges);

    const juice = `Processor produces a juice with ${appleP} pieces of apple and ${orangeP} pieces of orange.`;
    return juice;
}
console.log(fruitprocessor(3,4));


// Coding Challeng #1 Sec-2

Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new gymnastics discipline, which works differently. Each team competes 3 times, and then the average of the 3 scores is calculated (so one average score per team).
A team only wins if it has at least double the average score of the other team. Otherwise, no team wins!

Your tasks:
1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
2. Use the function to calculate the average for both teams
3. Create a function 'checkWinner' that takes the average score of each team as parameters ('avgDolhins' and 'scoreKoalas'), and then logs the winner to the console, together with the victory points, according to the rule above. Example: "Koalas win (30 vs. 13)"
4. Use the 'checkWinner' function to determine the winner for both Data 1 and Data 2
5. Ignore draws this time

Test data:
Data 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
Data 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27



function calcAVG(value1, value2, value3) {
    return (value2 + value3 + value1) / 3;
}
 //test1 
let scoreDolphins = calcAVG(44,23,71);
let scoreKoalas = calcAVG(85, 54, 41);

console.log(scoreDolphins, scoreKoalas);

function checkWinner (avgDolhins,scoreKoalas)
{
        if(avgDolhins >= 2*scoreKoalas)
        console.log(`Dolphins win !!! (${scoreDolphins} vs ${scoreKoalas})`);
        else if(scoreKoalas >= 2*avgDolhins)
        console.log(`Koalas win !!! (${scoreKoalas} vs ${scoreDolphins})`);
    else
    console.log("No team wins...");
    
}

console.log(checkWinner(scoreDolphins,scoreKoalas));

// test 2

scoreDolphins = calcAVG(85, 54, 41);
scoreKoalas = calcAVG(23, 34, 27);

console.log(checkWinner(scoreDolphins,scoreKoalas));



//Coding Exercise #6

function calcTip(bill)
{
    if(bill >= 50 && bill <= 300){
        return bill * 0.15;
    }else{
        return bill * 0.20;
    }
}

const bills = [125,555,44 ];


const tips = [];
for(let i=0; i<bills.length; i++){
    tips.push(calcTip(bills[i]));
}

console.log(bills, tips);

const total = [];
for(let i=0; i<bills.length; i++){
    total.push(bills[i] + tips[i]);
}

console.log('the total bill values are ' + total);

const amy = {
    firstName: 'amy',
    lastName: 'green',
    job: 'nurse',
    age: 2032 - 1998,
    friends: ['penny', 'sheldon', 'raj']
}

console.log(amy);
console.log(amy.age);
console.log(amy['friends']);

console.log(`${amy.firstName} has ${amy.friends.length} friends, and her BestFriend is ${amy.friends[0]}`)


const amy = {
    firstName: 'amy',
    lastName: 'green',
    job: 'nurse',
    birthYear: 2003,
    hasFriends: true,
    friends: ['penny', 'sheldon', 'raj'],

    // not a dry way of coding
    // calcAge: function (birthYear){
     //   return 2023 - birthYear;
    // }

    // to print this code

    // console.log(amy.calcAge(2003);
    // console.log(amy['calcAge'(2003)]); 

    // a better way
    //    calcAge: function (){
     //   return 2023 - this.birthYear;
    // } 

    // the efficient way
    calcAge: function ()    {
        this.age = 2023 - this.birthYear;
        return this.age;
    },

    // lecture challenge
    getSummary: function() 
    {
        return `${this.firstName} ${this.lastName} is a ${this.calcAgeage()} years old ${this.job}, who ${this.hasFriends ? 'does' : "doesn't"} have ${this.hasFriends ? this.friends.length : "any"} friends. ( ${this.friends} ) `;
    }

};

console.log(amy.calcAge());
console.log(amy.age); 
console.log(amy.getSummary());

// coding CHALLENGE #7


Let's go back to Mark and John comparing their BMIs!

This time, let's use objects to implement the calculations! Remember: BMI = mass / (height * height) (mass in kg and height in meters).

Your tasks:

For each of them, create an object with properties for their full name, mass, and height (Mark Miller and John Smith). Name these objects as mark and john, and their properties exactly as fullName, mass and height.

Create a calcBMI method on each object to calculate the BMI (the same method on both objects). Assign the BMI value to a property, and also return it from the method.

Log to the console who has the higher BMI, together with the full name and the respective BMI. Example: "John Smith's BMI (28.3) is higher than Mark Miller's (23.9)!".

TEST DATA: Marks weighs 78 kg and is 1.69 m tall. John weighs 92 kg and is 1.95 m tall.



const mark = {
    fullName: "Mark Miller",
    mass: 78,
    height: 1.69,
    calcBMI: function(){
        this.BMI = this.mass / (this.height ** 2);
        return this.BMI;
    }
}

const john = {
    fullName: "John Smith",
    mass: 92,
    height:1.55,
    calcBMI: function(){
        this.BMI = this.mass / (this.height ** 2);
        return this.BMI;
    }
}

console.log(mark.calcBMI());
console.log(john.calcBMI());

// Not DRY
//   console.log(`${mark.calcBMI()>john.calcBMI() ? mark.fullName : john.fullName} has a higher BMI (${mark.BMI>john.BMI ? mark.BMI : john.BMI}) than ${mark.BMI>john.BMI ? john.fullName : mark.fullName} (${mark.BMI>john.BMI ? john.BMI : mark.BMI}) `)

if(mark.BMI>john.BMI) 
{
    console.log(`${mark.fullName} has a higher BMI (${mark.BMI}) than ${john.fullName} (${john.BMI}).`);
}
else if(john.BMI>mark.BMI)
{
    console.log(`${john.fullName} has a higher BMI (${john.BMI}) than ${mark.fullName} (${mark.BMI}).`);
}


const amy = [
     'amy',
    'green',
     2003,
     'nurse',
     true,
     ['penny', 'sheldon', 'raj']
]
for(let i=0; i<amy.length; i++)
{    
    console.log(amy[i], typeof amy[i]);
}
const types = [];
console.log(types);

for(let i=0; i<amy.length; i++)
{
    types[i] = typeof amy[i];

}

/// Continue and Break Statements ////

/// Continue - continue (in an iteration) skips the next code and directly jumps to the next iteration when true

console.log("-------ONLY STRINGS------")
for(let i=0; i<amy.length; i++)
{
    if(typeof amy[i] !== 'string' ) continue;

    console.log(amy[i], typeof amy[i]);

}

 /// break - break exits the loop upon becoming true

console.log("-------BREAK WITH NUMBER------")
for(let i=0; i<amy.length; i++)
{
    if(typeof amy[i] === 'number' ) break;

    console.log(amy[i], typeof amy[i]);

}

let dice = Math.trunc((Math.random() * 6) + 1);

while(dice!==6)
{
    console.log(`you rolled ${dice}.`);   
    dice = Math.trunc((Math.random() * 6) + 1) // without this line the loop will run infinitely

    if(dice===6) console.log(" the loop is about to end....") // the dice is assigned 6 in loop and the next iteration won't execute

}

// thw FOR loop is good to use ewhen we KNOW HOW MANY ITERATION TO PERFORM
// therefor for ARRAYS it is good to use FOR loop
// WHEN WE DON'T KNOW THE EXACT VALUE OF ITERATIONS it is good to use WHEN loop
// such as the case above


// CODING EXERCISE #8

Let's improve Steven's tip calculator even more, this time using loops!

Your tasks:

Create an array called bills containing all 10 test bill values.

Create empty arrays for the tips and the totals (tips and totals)

Use the calcTip function we wrote before (included in the starter code) to calculate tips and total values (bill + tip) for every bill value in the bills array. Use a for loop to perform the 10 calculations!



TEST DATA: 22, 295, 176, 440, 37, 105, 10, 1100, 86, and 52.



BONUS:

Write a function calcAverage which takes an array called arr as an argument. This function calculates the average of all numbers in the given array. This is a DIFFICULT challenge (we haven't done this before)! Here is how to solve it if you feel like it:

First, you will need to add up all values in the array. To do the addition, start by creating a variable sum that starts at 0. Then loop over the array using a for loop. In each iteration, add the current value to the sum variable. This way, by the end of the loop, you have all values added together.

To calculate the average, divide the sum you calculated before by the length of the array (because that's the number of elements).

Call the function with the totals array.
*/

const calcTip = bill => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;

/*
function calcTip(bill)
{
    if(bill >= 50 && bill <= 300){
        return bill * 0.15;
    }else{
        return bill * 0.20;
    }
}
*/

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];


const tips = [];
const total = [];

for(let i=0; i<bills.length; i++){
    tips.push(calcTip(bills[i]));
    total.push(bills[i] + tips[i]);
}

console.log(bills , tips, total);

const calcAVG = function(arr)
{
    let sum = 0;
    for(let i=0; i < arr.length; i++){
        
        //sum = sum + arr[i];
        sum += arr[i];
    }

    return sum / arr.length;
}

console.log(`The average of the bills is ${calcAVG(bills)}.`);
console.log(`The average of the tips is ${calcAVG(tips)}.`);
console.log(`The average of the total is ${calcAVG(total)}.`);
'use strict';

/*
// CONSTRUCTER FUNCTION
const Person = function (fn, bd) {
  this.firstname = fn;
  this.birthdate = bd;

  // if we want to a a method to this object class constructor
  //we should not define it directly here
  // instead we can use prototypal inheritane
};

//calling a constructor function
const trusha = new Person('trusha', '2003');
const yashvi = new Person('yashvi', '2001');
const jack = new Person('Jack', '2015');

console.log(trusha, yashvi, jack);

// now to add a method to all the instances of Person
Person.prototype.calcAge = function () {
  console.log(2024 - this.birthdate);
};

console.log(trusha instanceof Person);
trusha.calcAge();
yashvi.calcAge();
jack.calcAge();

///Prototype

console.log(Person.prototype === trusha.__proto__);
//meaning person.prototype is the prototype of instances of person
// not a prototype to person constructor itself
// let's check this theory
console.log(Person.prototype.isPrototypeOf(trusha)); //true
console.log(Person.prototype.isPrototypeOf(yashvi)); //true

// create a new property in instances of person
Person.prototype.species = 'Homo Sapien';

//now each instance of person can access species property
console.log(trusha.species);
console.log(yashvi.species);
console.log(jack.species);

// but when we look at details the instance object does not own the species property
console.log(trusha); // but its prototype owns species property

// we can check for the same using
console.log(trusha.hasOwnProperty('species')); //false
console.log(trusha.hasOwnProperty('firstname')); //true

///////////////////////////////////////////////////////////////
/*
/////////////// CODING CHALLENGE #1 ///////////////////

/////////Your tasks:
1. Use a constructor function to implement a 'Car'. A car has a 'make' and a 
'speed' property. The 'speed' property is the current speed of the car in 
km/h
2. Implement an 'accelerate' method that will increase the car's speed by 10, 
and log the new speed to the console
3. Implement a 'brake' method that will decrease the car's speed by 5, and log 
the new speed to the console
4. Create 2 'Car' objects and experiment with calling 'accelerate' and 
'brake' multiple times on each of them

///////Test data:
§ Data car 1: 'BMW' going at 120 km/h
§ Data car 2: 'Mercedes' going at 95 km/h

GOOD LUCK �



const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(
    `The speed of ${this.make} was accelerated to ${this.speed} km/h`
  );
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`The speed of ${this.make} was decreased to ${this.speed} km/h`);
};

const bmw = new Car('BMW', 50);
const mercedes = new Car('Mercedes', 60);

console.log(bmw);
console.log(mercedes);

bmw.accelerate();
mercedes.brake();
bmw.accelerate();
mercedes.accelerate();
mercedes.accelerate();


//////////////////////////////////////////////
/// class

//classes can be declared just like functions

//class expression
// const PersonCl = class {}

// class declaration
class PersonCl {
  constructor(fn, by) {
    this.firstname = fn;
    this.birthyear = by;
  }

  // now everything outside the constructor will add it to the prototype
  calcAge() {
    console.log(2024 - this.birthyear);
  }
  greet() {
    console.log(`Hey ${this.firstname}!!`);
  }
}

const trusha = new PersonCl('Trusha', 2003);
const yashvi = new PersonCl('Yashvi', 2001);

trusha.calcAge();

console.log(trusha);
trusha.greet();

const trusha1 = {
  owner: 'Trusha',
  movements: [200, 150, 130, 256, 321],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(trusha1.latest);
console.log(trusha1.movements);
trusha1.latest = 300;
console.log(trusha1.movements);

///////////////////////////////////////
// Coding Challenge #2


1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀


class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  get status() {
    console.log(`'${this.make}' is going at ${this.speed} km/h`);
  }

  get speedUS() {
    console.log(`'${this.make}' is going at ${this.speed / 1.6} mi/h`);
  }

  set speedUS(speedus) {
    this.speed = speedus * 1.6;
  }
}

const ford = new CarCl('Ford', 200);
const bmw = new CarCl('BMW', 150);

console.log(ford);
ford.speedUS;
ford.speedUS = 200;

console.log(ford);
*/

//////////////////////////////////////////

// INHERITANCE BETWEEN CLASSES : constructer function //

// const Person = function (fn, by) {
//   this.firstname = fn;
//   this.birthYear = by;
// };
// Person.prototype.calcAge = function () {
//   console.log(2024 - this.birthYear);
// };

// const Student = function (fn, by, course) {
//   Person.call(this, fn, by);
//   this.course = course;
// };

// //Linking prototype chain
// Student.prototype = Object.create(Person.prototype);

// Student.prototype.intro = function () {
//   console.log(`Hello, I am ${this.firstname} and I study ${this.course}.`);
// };

// const trusha = new Student('trusha', 2003, 'IT');
// trusha.intro();
// trusha.calcAge();
// console.log(trusha.__proto__);

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀


const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(
    `The speed of ${this.make} was accelerated to ${this.speed} km/h`
  );
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`The speed of ${this.make} was decreased to ${this.speed} km/h`);
};

const ElectricCar = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

ElectricCar.prototype = Object.create(Car.prototype);

ElectricCar.prototype.chargeTo = function (chargeto) {
  this.charge = chargeto;
  return this.charge;
};
ElectricCar.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `The speed of ${this.make} was accelerated to ${this.speed} km/h and charging is ${this.charge}`
  );
};

ElectricCar.prototype.constructor = ElectricCar;

const tesla = new ElectricCar('Tesla', 100, 90);
console.log(tesla);
tesla.accelerate();
console.log(tesla.chargeTo(80));
tesla.brake();


/// NHERITANCE BETWEEN CLASSES : classes ////

class PersonCl {
  constructor(fn, by) {
    this.fullname = fn;
    this.birthyear = by;
  }

  // now everything outside the constructor will add it to the prototype
  calcAge() {
    console.log(2024 - this.birthyear);
  }
  greet() {
    console.log(`Hey ${this.fullname}!!`);
  }

  set fullname(fn) {
    if (fn.includes(' ')) this._fullname = fn;
  }

  get fullname() {
    return this._fullname;
  }
}

class StudentCl extends PersonCl {
  constructor(fn, by, course) {
    // super needs to be defined first as it sets the this keyword
    //without super we cannot use this keyword properly
    super(fn, by);
    this.course = course;
  }

  intro() {
    console.log(`hello! I'm ${this.fullname} and i study ${this.course}.`);
  }
}

const trusha = new StudentCl('Trusha Nandola', 2003, 'IT');

console.log(trusha);
trusha.intro();
trusha.calcAge();



////////////////////////////////////////////////////////////

/// JS CLASSES COUNTINUED /////

// Encapsulation in JS
//1 - public fields
//2- private fields
//3- public methods
//4- private methods

class Account {
  //1- public fields
  locale = navigator.language;

  //2- Private fields
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // this.movements = [];
    // this.locale = navigator.language;
    console.log(`Thanks for creating an account ${owner}`);
  }

  // 3- public methods
  viewMov() {
    console.log(this.#movements);
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this.#acceptLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved!`);
      return this;
    }
  }

  //4- private methods
  #acceptLoan(val) {
    return true;
  }
}

const acc1 = new Account('Trusha', 'Rupees', 1111);

acc1.deposit(200);
acc1.deposit(202);
acc1.deposit(203);
acc1.withdraw(604);
acc1.withdraw(685);

acc1.requestLoan(400);
console.log(acc1);
acc1.viewMov();

acc1
  .deposit(200)
  .deposit(600)
  .withdraw(300)
  .deposit(100)
  .requestLoan(25100)
  .withdraw(5000)
  .viewMov();

*/

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(
      `The speed of ${this.make} was accelerated to ${this.speed} km/h`
    );
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log(
      `The speed of ${this.make} was decreased to ${this.speed} km/h`
    );
    return this;
  }
}

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeTo(chargeto) {
    this.#charge = chargeto;
    return this;
  }

  viewCharge() {
    console.log(this.#charge);
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `The speed of ${this.make} was accelerated to ${
        this.speed
      } km/h and charging is ${this.#charge}`
    );
    return this;
  }
}

const tesla = new EVCl('Tesla', 200, 50);

console.log(tesla);
tesla
  .accelerate()
  .accelerate()
  .brake()
  .brake()
  .accelerate()
  .viewCharge()
  .chargeTo(100)
  .viewCharge();

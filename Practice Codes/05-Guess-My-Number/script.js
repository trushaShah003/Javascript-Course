'use strict';
// lecture one
// for a CLASS we use .classname
// for an ID we use #id
/*
console.log(document.querySelector('.message').textContent);
*/

// lecture 2 element selection & DOM manipulation

// textContent - is used to bring the text content of the element
// it is necessory to specify what we want to manipulate
// that is why in the next line the text CANNOT be manipulated without the textContent part

/*
document.querySelector('.message').textContent = ' CORRECT !!';
console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = '#';

//value key retreives the value of the input element

document.querySelector('.score').textContent = 30;
console.log(document.querySelector('.score').textContent);

document.querySelector('.guess').value = 4;
console.log(document.querySelector('.guess').value);
*/

///////////////////////////////////////////////
//  006 Handling Click Events

// always execute the no input or false input scenario first while developing anything

let secretNumber = Math.trunc(Math.random() * 20) + 1;

let score = 20;
let highScore = 0;
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// on click function for check
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  // when no input
  if (!guess) {
    // document.querySelector('.message').textContent = ' ⛔ NO NUMBER !';
    displayMessage('⛔ NO NUMBER !');
  }

  // when guess is incorrect
  else if (guess !== secretNumber) {
    if (score > 1) {
      // document.querySelector('.message').textContent =
      //   guess > secretNumber ? '😥 TOO HIGH...' : ' 😥 TOO LOW...';
      displayMessage(
        guess > secretNumber ? '😥 TOO HIGH...' : ' 😥 TOO LOW...'
      );
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.score').textContent = 0;
      // document.querySelector('.message').textContent = '💥 You Lost !';
      displayMessage('💥 You Lost !');
    }
  }

  //////// WAS NOT DRY ///////////////////

  //   // when guess is too low
  //   else if (guess < secretNumber) {
  //     if (score > 1) {
  //       document.querySelector('.message').textContent = ' 😥 TOO LOW...';
  //       score--;
  //       document.querySelector('.score').textContent = score;
  //     } else {
  //       document.querySelector('.score').textContent = 0;
  //       document.querySelector('.message').textContent = '💥 You Lost !';
  //     }
  //   }

  //   // when guess is too low
  //   else if (guess > secretNumber) {
  //     if (score > 1) {
  //       document.querySelector('.message').textContent = ' 😥 TOO HIGH...';
  //       score--;
  //       document.querySelector('.score').textContent = score;
  //     } else {
  //       document.querySelector('.score').textContent = 0;
  //       document.querySelector('.message').textContent = '💥 You Lost !';
  //     }
  //   }

  // when guess is correct
  else if (guess === secretNumber) {
    // document.querySelector('.message').textContent = '🥳 YOU WON !!';
    displayMessage('🥳 YOU WON !!');

    // CHANGING STYLES OF CSS IN DOM
    //we must call STYLE
    //we must note the attribute in camelCase notation
    //we must pass the value of the attrribute as a STRING

    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;

    if (score > highScore) highScore = score;
    document.querySelector('.highscore').textContent = highScore;
  }
});

// on click function for again

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  document.querySelector('.score').textContent = score;
  // document.querySelector('.message').textContent = 'Start guessing...';
  displayMessage('Start guessing...');
  document.querySelector('.guess').value = '';

  document.querySelector('.number').textContent = '?';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';

  console.log(secretNumber);
});

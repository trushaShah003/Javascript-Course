'use strict';

// selecting elements

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const scoreEl0 = document.getElementById('score--0');
const scoreEl1 = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const currentScoreEl0 = document.querySelector('#current--0');
const currentScoreEl1 = document.querySelector('#current--1');
const btnroll = document.querySelector('.btn--roll');
const btnnew = document.querySelector('.btn--new');
const btnhold = document.querySelector('.btn--hold');

let scores, curScore, player, playing;

const init = function () {
  // To start a new game
  //2. variables neutralize
  curScore = 0;
  player = 0;
  playing = true;
  scores = [0, 0];
  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  currentScoreEl0.textContent = 0;
  currentScoreEl1.textContent = 0;

  //1. css change
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};

const switchPlayer = function () {
  document.getElementById(`current--${player}`).textContent = 0;
  player = player === 0 ? 1 : 0;
  curScore = 0;

  //  toggle - it will toggle the active player value
  // if it is active then removes it and vice versa
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
init();

btnroll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a rolled dice number
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    //2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;

    //3. checking if the roll is 1
    if (diceRoll !== 1) {
      curScore += diceRoll;
      document.getElementById(`current--${player}`).textContent = curScore;
    } else if (diceRoll === 1) {
      //  switch the player

      // document.getElementById(`current--${player}`).textContent = 0;
      // player = player === 0 ? 1 : 0;
      // curScore = 0;

      // //  toggle - it will toggle the active player value
      // // if it is active then removes it and vice versa
      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active');
      switchPlayer();
    }
  }
});

btnhold.addEventListener('click', function () {
  if (playing) {
    scores[player] += curScore;
    document.getElementById(`score--${player}`).textContent = scores[player];
    if (scores[player] < 20) {
      switchPlayer();
    } else if (scores[player] >= 20) {
      //FInish the game
      playing = false;
      document
        .querySelector(`.player--${player}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${player}`)
        .classList.remove('player--active');
    }
  }
});

btnnew.addEventListener('click', init);

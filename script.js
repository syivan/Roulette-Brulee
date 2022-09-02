'use strict';

// Selecting elements
const player0_element = document.querySelector('.player--0');
const player1_element = document.querySelector('.player--1');
const score0_element = document.querySelector('#score--0');
const score1_element = document.getElementById('score--1');
const dice_element = document.querySelector('.dice');
const current_score0 = document.querySelector('#current--1');
const current_score1 = document.querySelector('#current--0');

// selecting buttons
const roll_button = document.querySelector('.btn--roll');
const reset_element = document.querySelector('.btn--new');
const hold_button = document.querySelector('.btn--hold');

let playing, scores, current_score, activePlayer;
let targetScore = 100;

//Starting conditions
const init = function () {
  scores = [0, 0];
  current_score = 0;
  activePlayer = 0;
  playing = true;

  score0_element.textContent = 0;
  score1_element.textContent = 0;
  current_score0.textContent = 0;
  current_score1.textContent = 0;

  dice_element.classList.add('hidden');
  player0_element.classList.add('player--active');
  player1_element.classList.remove('player--active');
  player0_element.classList.remove('player--winner');
  player1_element.classList.remove('player--winner');
};

init();

/**
 * player rolls dice
 * rolling 1-6 addings to their current score
 * rolling the 7 transfers current score to the opponent's total score
 */
roll_button.addEventListener('click', function () {
  if (playing) {
    const dice_value = Math.trunc(Math.random() * 7) + 1;
    const image_name = `dice-${dice_value}.png`;
    dice_element.classList.remove('hidden');
    dice_element.src = image_name;

    if (dice_value != 7) {
      current_score += dice_value;
      document.getElementById(`current--${activePlayer}`).textContent =
        current_score;
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      let temp = activePlayer === 0 ? 1 : 0;
      scores[temp] += current_score;
      switchPlayer();
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];
      if (scores[activePlayer] >= targetScore) {
        victoryInit();
      }
    }
  }
});

/**
 * transfers all current score to the user's point total
 * turn is transferred to the opponent
 */
hold_button.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += current_score;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[`${activePlayer}`];
    if (scores[activePlayer] >= targetScore) {
      victoryInit();
    }
    switchPlayer();
  }
});

/**
 * resets the game
 */
reset_element.addEventListener('click', function () {
  init();
});

/**
 * escape key restarts the game
 */
document.querySelector('body').addEventListener('keydown', function (event) {
  console.log(event);
  if (event.key === 'Escape') init();
});

/**
 * switches the active user of the game
 */
function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0_element.classList.toggle('player--active');
  player1_element.classList.toggle('player--active');
  current_score = 0;
}

/**
 * once the target score is reached, game ends and app goes into victory phase
 */
const victoryInit = () => {
  playing = false;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  dice_element.classList.add('hidden');
};

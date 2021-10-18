'use strict'

// Nodes
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const currentScore0 = document.querySelector('#current--0')
const currentScore1 = document.querySelector('#current--1')
const score0El = document.querySelector('#score--0')
const score1El = document.querySelector('#score--1')
const diceEl = document.querySelector('.dice')
const buttonNew = document.querySelector('.btn--new')
const buttonRoll = document.querySelector('.btn--roll')
const buttonHold = document.querySelector('.btn--hold')

let currentScore
let activePlayer
let gameOnAir
let scores

// Functions
const initialisation = function()
{
    // Starting parametres
    currentScore = 0
    activePlayer = 0
    gameOnAir = true
    scores = [0, 0]

    score0El.textContent = 0;
    score1El.textContent = 0;

    currentScore0.textContent = 0
    currentScore1.textContent = 0
    diceEl.classList.add('hidden')
    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
}

const switchPlayer = function()
{
    document.querySelector(`#current--${activePlayer}`).textContent = 0
    activePlayer = activePlayer === 0 ? 1 : 0
    currentScore = 0
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}

// 1 - Starting game
initialisation()

// 2 - Rolling Dice
buttonRoll.addEventListener('click', function()
{
    if (gameOnAir)
    {
    const diceNumber = Math.trunc(Math.random() * 6) + 1

    diceEl.classList.remove('hidden')
    diceEl.src = `dice-${diceNumber}.png`

    if(diceNumber !== 1)
    {
    currentScore = currentScore + diceNumber
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore
    }
    else
    {
    switchPlayer()
    }
    }
})

// 3 - Hold Button
buttonHold.addEventListener('click', function()
{
    if(gameOnAir)
    {
    scores[activePlayer] += currentScore
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer]

    if(scores[activePlayer] >= 100)
    {
    gameOnAir = false
    diceEl.classList.add('hidden')
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
    }
    else
    {
    switchPlayer()
    }
    }
})

// 4 - Reset game
buttonNew.addEventListener('click', initialisation)

// 010000010110110001100101011110000110010101111001

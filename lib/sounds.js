const blackjackSound1 = new Audio('sounds/blackjack1.mp3');
const blackjackSound2 = new Audio('sounds/blackjack2.mp3');
const blackjackSound3 = new Audio('sounds/blackjack3.mp3');
const blackjackSound4 = new Audio('sounds/blackjack4.mp3');
const blackjackSound5 = new Audio('sounds/blackjack5.mp3');
const blackjackSound6 = new Audio('sounds/blackjack6.mp3');
const blackjackSound7 = new Audio('sounds/blackjack7.mp3');

const doubleDownSound1 = new Audio('sounds/letItRide.mp3');
const doubleDownSound2 = new Audio('sounds/letItRide.mp3');

const blackjackSoundArray = [
  blackjackSound1,
  blackjackSound2,
  blackjackSound3,
  blackjackSound4,
  blackjackSound5,
  blackjackSound6,
  blackjackSound7,
]

const doubleDownSoundArray = [
  doubleDownSound1,
  doubleDownSound2
]

export const blackjackSound = blackjackSoundArray[Math.floor(Math.random() * blackjackSoundArray.length)];
export const doubleDownSound = doubleDownSoundArray[Math.floor(Math.random() * doubleDownSoundArray.length)];
export const cardSound = new Audio('sounds/cardDeal.mp3');
export const winSound = new Audio('sounds/cashRegister.mov');
export const chipsSound = new Audio('sounds/chips.mp3');

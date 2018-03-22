const Shoe = require('./shoe');
const Card = require('./card');
const Player = require('./player');
const Dealer = require('./dealer');
const Hand = require('./hand');
const Game = require('./game');

window.addEventListener('load', () => {
  const game = new Game;
  game.shoe.shuffle();
  game.dealCards();

  console.log(game);
});

import Shoe from './lib/shoe';
import Card from './lib/card';
import Player from './lib/player';
import Dealer from './lib/dealer';
import Hand from './lib/hand';
import Game from './lib/game';

window.addEventListener('load', () => {
  const game = new Game;
  game.shoe.shuffle();
  game.dealCards();

  document.getElementById('hitButton').addEventListener('click', () => {
    game.player.hit(game.shoe);
  });

  document.getElementById('stayButton').addEventListener('click', () => {
    game.player.stay();
  });

  document.getElementById('doubleDownButton').addEventListener('click', () => {
    game.player.doubleDown(game.shoe);
  });

  document.getElementById('splitButton').addEventListener('click', () => {
    game.player.split();
  });

});

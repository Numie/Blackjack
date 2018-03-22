import Shoe from './lib/shoe';
import Card from './lib/card';
import Player from './lib/player';
import Dealer from './lib/dealer';
import Hand from './lib/hand';
import Game from './lib/game';
import { renderBankrolls, renderBet, playRound } from './lib/util.js';

window.addEventListener('load', () => {
  const game = new Game;
  game.shoe.shuffle();
  game.dealCards();
  renderBankrolls(game);
  playRound(game);

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

  document.getElementById('bet25').addEventListener('click', () => {
    game.player.bet = 25;
    renderBet(game);
  });

  document.getElementById('bet100').addEventListener('click', () => {
    game.player.bet = 100;
    renderBet(game);
  });

  document.getElementById('bet500').addEventListener('click', () => {
    game.player.bet = 500;
    renderBet(game);
  });

  document.getElementById('betAllIn').addEventListener('click', () => {
    game.player.bet = game.player.bankroll;
    renderBet(game);
  });

});

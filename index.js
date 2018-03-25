import Shoe from './lib/shoe';
import Card from './lib/card';
import Player from './lib/player';
import Dealer from './lib/dealer';
import Hand from './lib/hand';
import Game from './lib/game';
import { renderBankrolls, startRound, startHand } from './lib/util.js';

window.addEventListener('load', () => {
  const game = new Game;
  game.shoe.shuffle();
  renderBankrolls(game);

  startRound(game);

  document.getElementById('hit-button').addEventListener('click', () => {
    game.player.hit(game, game.shoe);
  });

  document.getElementById('stay-button').addEventListener('click', () => {
    game.player.stay(game);
  });

  document.getElementById('double-down-button').addEventListener('click', () => {
    game.player.doubleDown(game, game.shoe);
  });

  document.getElementById('split-button').addEventListener('click', () => {
    game.player.split(game);
  });

  document.getElementById('bet25').addEventListener('click', () => {
    game.player.placeBet(game.player.currentHand, 25);
    startHand(game);
  });

  document.getElementById('bet100').addEventListener('click', () => {
    game.player.placeBet(game.player.currentHand, 100);
    startHand(game);
  });

  document.getElementById('bet500').addEventListener('click', () => {
    game.player.placeBet(game.player.currentHand, 500);
    startHand(game);
  });

  document.getElementById('betAllIn').addEventListener('click', () => {
    game.player.placeBet(game.player.currentHand, game.player.bankroll);
    startHand(game);
  });

});

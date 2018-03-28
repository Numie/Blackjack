import Shoe from './lib/shoe';
import Card from './lib/card';
import Player from './lib/player';
import Dealer from './lib/dealer';
import Hand from './lib/hand';
import Game from './lib/game';
import { renderBankrolls, startRound, startHand } from './lib/util.js';
import { printError, clearError } from './lib/messages.js';
import { chipsSound } from './lib/sounds';

window.addEventListener('load', () => {
  const game = new Game;
  game.shoe.shuffle();
  renderBankrolls(game);

  startRound(game);

  document.getElementById('hit-button').addEventListener('click', () => {
    clearError();
    game.player.hit(game, game.shoe);
  });

  document.getElementById('stay-button').addEventListener('click', () => {
    clearError();
    game.player.stay(game);
  });

  document.getElementById('double-down-button').addEventListener('click', () => {
    clearError();
    if (game.player.bankroll < game.player.currentHand.bet) {
      printError('Your bankroll is too low to double!');
    } else {
      chipsSound.play();
      game.player.doubleDown(game, game.shoe);
    }
  });

  document.getElementById('split-button').addEventListener('click', () => {
    clearError();
    if (game.player.bankroll < game.player.currentHand.bet) {
      printError('Your bankroll is too low to split!');
    } else {
      chipsSound.play();
      game.player.split(game);
    }
  });

  document.getElementById('clear-bet').addEventListener('click', () => {
    game.player.clearBet();
    Array.from(document.getElementsByClassName('alternate-bet-buttons')).forEach(button => button.style.display = 'none');
  });

  document.getElementById('bet25').addEventListener('click', () => {
    chipsSound.play();
    game.player.placeBet(game.player.currentHand, 25);
    betButtonAction(game);
  });

  document.getElementById('bet100').addEventListener('click', () => {
    chipsSound.play();
    game.player.placeBet(game.player.currentHand, 100);
    betButtonAction(game);
  });

  document.getElementById('bet500').addEventListener('click', () => {
    chipsSound.play();
    game.player.placeBet(game.player.currentHand, 500);
    betButtonAction(game);
  });

  document.getElementById('betAllIn').addEventListener('click', () => {
    chipsSound.play();
    game.player.placeBet(game.player.currentHand, game.player.bankroll);
    betButtonAction(game);
  });

  document.getElementById('deal').addEventListener('click', () => {
    startHand(game);
  });

  document.getElementById('play-again-button').addEventListener('click', () => {
    const game = new Game;
    game.shoe.shuffle();
    renderBankrolls(game);
    startRound(game);
  });

  const betButtonAction = game => {
    document.getElementById('bet-button-title').style.display = 'none';
    const playerBet = document.getElementById('player-bet');
    if (playerBet) {
      playerBet.innerHTML = `$${game.player.bet}`;
    } else {
      const bet = document.createElement('h1');
      bet.id = 'player-bet';
      bet.innerHTML = `$${game.player.bet}`;
      document.getElementById('bet-buttons').prepend(bet);
    }
    Array.from(document.getElementsByClassName('alternate-bet-buttons')).forEach(button => button.style.display = 'initial');
  };

});

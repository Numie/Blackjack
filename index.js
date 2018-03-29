import Shoe from './lib/shoe';
import Card from './lib/card';
import Player from './lib/player';
import Dealer from './lib/dealer';
import Hand from './lib/hand';
import Game from './lib/game';
import { renderBankrolls, startRound, startHand, resetGame } from './lib/util.js';
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
    game.player.clearBet(game);
    Array.from(document.getElementsByClassName('alternate-bet-buttons')).forEach(button => button.style.display = 'none');
    renderBankrolls(game);
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
    resetGame(game);
    startRound(game);
  });

  const showCountButton = document.getElementById('show-count-button');
  document.getElementById('show-count-button').addEventListener('click', () => {
    document.getElementById('count').classList.toggle('active');

    if (showCountButton.getAttribute("data-text-swap") == showCountButton.innerHTML) {
      showCountButton.innerHTML = showCountButton.getAttribute("data-text-original");
    } else {
      showCountButton.setAttribute("data-text-original", showCountButton.innerHTML);
      showCountButton.innerHTML = showCountButton.getAttribute("data-text-swap");
    }
  });

  const showBasicStrategyButton = document.getElementById('show-basic-strategy-button');
  document.getElementById('show-basic-strategy-button').addEventListener('click', () => {
    document.getElementById('basic-strategy').classList.toggle('active');

    if (showBasicStrategyButton.getAttribute("data-text-swap") == showBasicStrategyButton.innerHTML) {
      showBasicStrategyButton.innerHTML = showBasicStrategyButton.getAttribute("data-text-original");
    } else {
      showBasicStrategyButton.setAttribute("data-text-original", showBasicStrategyButton.innerHTML);
      showBasicStrategyButton.innerHTML = showBasicStrategyButton.getAttribute("data-text-swap");
    }
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
    document.getElementById('bet-buttons-container').style.display = 'initial';

    renderBankrolls(game);
  };

});

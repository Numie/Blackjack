import Hand from './hand';
import {Dealer} from './player';
import {Player} from './player';
import Game from './game';

export const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const renderCard = (card, hand, player) => {
  if (player === 'player') {
    document.getElementById('player-card-container').appendChild(createCard(card, hand, player));
  } else {
    document.getElementById('dealer-card-container').appendChild(createCard(card, hand, player));
  }
};

const createCard = (card, hand, player) => {
  const newCard = document.createElement('div');
  card.suit === 'h' || card.suit === 'd' ? newCard.className = 'card red-card' : newCard.className = 'card black-card';

  if (player === 'player') {
    const cardNumber = hand.cards.length - 1;
    newCard.style.bottom = `${15 * cardNumber}px`;
    newCard.style.left = `${-70 * cardNumber}px`;
  }

  const cardRankTop = document.createElement('div');
  cardRankTop.className = 'card-rank card-rank-top';
  cardRankTop.innerHTML = card.rank;

  const cardSuit = document.createElement('div');
  cardSuit.className = 'card-suit';
  if (card.suit === 'h') {
    cardSuit.innerHTML = `&hearts;`;
  } else if (card.suit === 'd') {
    cardSuit.innerHTML = `&diams;`;
  } else if (card.suit === 's') {
    cardSuit.innerHTML = `&spades;`;
  } else {
    cardSuit.innerHTML = `&clubs;`;
  }

  const cardRankBottom = document.createElement('div');
  cardRankBottom.className = 'card-rank card-rank-bottom';
  cardRankBottom.innerHTML = card.rank;

  newCard.appendChild(cardRankTop);
  newCard.appendChild(cardSuit);
  newCard.appendChild(cardRankBottom);

  return newCard;
};

export const renderBankrolls = game => {
  document.getElementById('player-bankroll').innerHTML = `Bankroll: $${game.player.bankroll}`;
  document.getElementById('dealer-bankroll').innerHTML = `Bankroll: $${game.dealer.bankroll}`;
};

export const startRound = game => {
  resetRound(game);
  renderBet(game);
  requestBet(game);
};

const requestBet = game => {
  document.getElementById('bet-buttons').style.display = 'initial';
};

export const startHand = async game => {
  renderBet(game);
  renderBankrolls(game);
  game.dealCards();

  document.getElementById('bet-buttons').style.display = 'none';
  await sleep(2000);
  document.getElementById('action-buttons').style.display = 'initial';

  renderHandValue(game.player);

  game.player.hands.forEach(hand => {
    if (hand.checkForBlackjack()) {
      hand.isBlackjack = true;
    }
  });

  if (game.player.currentHand.isBlackjack) {
    debugger
    game.player.nextHand(game);
  }
};

export const renderBet = game => {
  document.getElementById('player-bet').innerHTML = `Bet: $${game.player.bet}`;
};

export const renderHandValue = player => {
  if (player instanceof Dealer) {
    document.getElementById('dealer-hand-value').innerHTML = player.hand.value;
  } else {
    document.getElementById('player-hand-value').innerHTML = player.currentHand.value;
  }
};

export const checkTurnStatus = (game, player) => {
  const hand = game.player.currentHand;
  if (hand.isBusted()) {
    hand.busted = true;
    game.dealer.bankroll += hand.bet;
    renderBankrolls(game);
    player.checkIfBusted();
    player.nextHand(game);
  }
};

export const endTurn = game => {
  document.getElementById('action-buttons').style.display = 'none';
  game.dealer.playTurn(game, game.shoe);
};

export const payBets = game => {
  payBets(game);
};

const resetRound = game => {
  game.player.hands = [new Hand];
  game.player.bet = 0;
  game.player.currentHandIndex = 0;
  game.player.currentHand = game.player.hands[game.player.currentHandIndex];
  game.player.isBusted = false;

  game.dealer.hand = new Hand;

  Array.from(document.getElementsByClassName('card-container')).forEach(cardContainer => {
    while (cardContainer.firstChild) {
      cardContainer.removeChild(cardContainer.firstChild);
    }
  });

  Array.from(document.getElementsByClassName('hand-value')).forEach(div => {
    div.innerHTML = null;
  });

};

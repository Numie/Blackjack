import Hand from './hand';
import {Dealer} from './player';
import {Player} from './player';
import Game from './game';

export const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const renderCard = (card, hand, type, double) => {
  if (type === 'player') {
    const container = document.getElementById('player-card-container');
    if (double) {
      container.appendChild(createPlayerCard(card, hand, double));
    } else {
      container.appendChild(createPlayerCard(card, hand));
    }
  } else {
    document.getElementById('dealer-card-container').appendChild(createDealerCard(card, hand, type));
  }
};

const createPlayerCard = (card, hand, double) => {
  const newCard = document.createElement('div');
  card.suit === 'h' || card.suit === 'd' ? newCard.className = 'player-card red-card' : newCard.className = 'player-card black-card';

  if (double) {
    newCard.style.transform = 'rotate(90deg)';
    newCard.style.bottom = '80px';
    newCard.style.left = '-120px';
  } else {
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

const createDealerCard = (card, hand, type) => {
  const flippedCardContainer = document.createElement('div');
  flippedCardContainer.className = 'flipped-card-container';

  const newCard = document.createElement('div');
  newCard.className = 'card';
  if (type === 'dealer-facedown') {
    newCard.id = 'flipped';
  }

  const cardFront = document.createElement('figure');
  card.suit === 'h' || card.suit === 'd' ? cardFront.className = 'front red-card' : cardFront.className = 'front black-card';

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

  const cardBack = document.createElement('figure');
  cardBack.className = 'back';

  cardFront.appendChild(cardRankTop);
  cardFront.appendChild(cardSuit);
  cardFront.appendChild(cardRankBottom);

  newCard.appendChild(cardFront);
  newCard.appendChild(cardBack);

  flippedCardContainer.appendChild(newCard);

  return flippedCardContainer;
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
  renderHandValue(game.player);

  if (game.dealer.hasBlackjack()) {
    game.dealer.playTurn(game, game.shoe);
  } else {
    document.getElementById('action-buttons').style.display = 'initial';

    game.player.hands.forEach(hand => {
      if (hand.checkForBlackjack()) {
        hand.isBlackjack = true;
      }
    });

    if (game.player.currentHand.isBlackjack) {
      game.player.nextHand(game);
    }

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
  } else if (hand.isDoubled) {
    player.nextHand(game);
  }
};

export const endTurn = game => {
  document.getElementById('action-buttons').style.display = 'none';
  game.dealer.playTurn(game, game.shoe);
};

// export const payBets = game => {
//   payBets(game);
// };

const resetRound = game => {
  game.player.hands = [new Hand];
  game.player.bet = 0;
  game.player.currentHandIndex = 0;
  game.player.currentHand = game.player.hands[game.player.currentHandIndex];
  game.player.isBusted = false;

  game.dealer.hand = new Hand;

  document.getElementById('double-down-button').style.display = 'initial';

  Array.from(document.getElementsByClassName('card-container')).forEach(cardContainer => {
    while (cardContainer.firstChild) {
      cardContainer.removeChild(cardContainer.firstChild);
    }
  });

  Array.from(document.getElementsByClassName('hand-value')).forEach(div => {
    div.innerHTML = null;
  });

};

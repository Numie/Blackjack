import Hand from './hand';
import {Dealer} from './player';
import {Player} from './player';
import Game from './game';
import Shoe from './shoe';
import { flashPayout, flashBustMessage, flashBlackjackMessage, flashShuffleMessage } from './messages';
import { blackjackSound } from './sounds';

export const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const createPlayerHand = (currentHandIndex, split) => {
  const hand = document.createElement('div');

  hand.id = `player-card-container-${currentHandIndex}`;
  hand.className = 'player-card-container';
  document.getElementById('player-card-area').appendChild(hand);

  if (split) {
    const cardContainers = Array.from(document.getElementsByClassName('player-card-container')).reverse();
    cardContainers.forEach((container, idx) => {
      container.id = `player-card-container-${idx}`;
    });
  }
};

export const renderCard = (card, hand, type, double, currentHandIndex) => {
  if (type === 'player') {
    const container = document.getElementById(`player-card-container-${currentHandIndex}`);
    if (double) {
      container.appendChild(createPlayerCard(card, hand, double));
    } else {
      container.appendChild(createPlayerCard(card, hand));
    }
  } else {
    document.getElementById('dealer-card-container').appendChild(createDealerCard(card, hand, type));
  }
};

export const renderCardsAfterSplit = (game, hands) => {
  clearPlayerCards();
  hands.forEach((hand, idx) => {
    hand.cards.forEach((card, cardIdx) => {
      if (hand.isDoubled && cardIdx === 2) {
        renderCard(card, hand, 'player', 'doubled', idx);
      } else {
        renderCard(card, hand, 'player', null, idx);
      }
    });
    createBet(idx);
    renderBet(game, idx);
  });
};

const createPlayerCard = (card, hand, double) => {
  const newCard = document.createElement('div');
  card.suit === 'h' || card.suit === 'd' ? newCard.className = 'player-card red-card' : newCard.className = 'player-card black-card';

  if (double) {
    newCard.style.transform = 'rotate(90deg)';
    newCard.style.bottom = '70px';
    newCard.style.left = '-120px';
  } else {
    const cardNumber = hand.cards.lastIndexOf(card);
    newCard.style.bottom = `${15 * cardNumber}px`;
    newCard.style.left = `${-70 * cardNumber}px`;
  }

  const cardRankTop = document.createElement('div');
  cardRankTop.className = 'card-rank card-rank-top';
  cardRankTop.innerHTML = card.rank;
  if (card.rank === '10') {
    cardRankTop.style.left = '2px';
  }

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
  if (card.rank === '10') {
    cardRankBottom.style.right = '2px';
  }

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
  document.getElementById('player-bankroll').innerHTML = `$${game.player.bankroll}`;
  document.getElementById('dealer-bankroll').innerHTML = `$${game.dealer.bankroll}`;
};

export const startRound = async game => {
  resetRound(game);

  if (game.shoe.cards.length < 100) {
    flashShuffleMessage();
    game.shoe = new Shoe;
    await sleep(2000);
    game.shoe.shuffle();
    game.count = 0;
    const count = game.countToString();
    const decks = Math.round(parseFloat(game.shoe.cards.length / 52));
    let trueCount = Math.round(parseFloat(count / decks));
    trueCount = trueCount > 0 ? `+${trueCount}` : trueCount;
    document.getElementById('count').innerHTML = `${count}`;
    document.getElementById('decks-remaining').innerHTML = `${decks}`;
    document.getElementById('true-count').innerHTML = `${trueCount}`;
  }

  createPlayerHand(game.player.currentHandIndex);
  createBet(game.player.currentHandIndex);
  requestBet(game);
};

const requestBet = game => {
  document.getElementById('bet-buttons').style.display = 'initial';
};

export const startHand = async game => {
  renderBet(game, game.player.currentHandIndex);
  renderBankrolls(game);
  game.dealCards();

  document.getElementById('bet-buttons').style.display = 'none';
  await sleep(2000);
  renderHandValue(game.player);

  game.player.hands.forEach(hand => {
    if (hand.checkForBlackjack()) {
      hand.isBlackjack = true;
    }
  });

  if (game.dealer.hasBlackjack()) {
    game.dealer.playTurn(game, game.shoe);
  } else {
    if (game.player.currentHand.cards[0].rank !== game.player.currentHand.cards[1].rank || game.player.currentHand.cards.length !== 2) {
      document.getElementById('split-button').style.display = 'none';
    }
    document.getElementById('action-buttons').style.display = 'block';

    game.player.hands.forEach(hand => {
      if (hand.isBlackjack) {
        flashBlackjackMessage();
      }
    });

    if (game.player.currentHand.isBlackjack) {
      blackjackSound.play();
      game.player.nextHand(game);
    }

  }
};

export const createBet = handIndex => {
  const playerBet = document.createElement('div');
  playerBet.className = 'player-bet';
  playerBet.id = `player-bet-${handIndex}`;
  document.getElementById(`player-card-container-${handIndex}`).appendChild(playerBet);
};

export const renderBet = (game, handIndex) => {
  document.getElementById(`player-bet-${handIndex}`).innerHTML = `Bet: $${game.player.hands[handIndex].bet}`;
};

export const renderHandValue = player => {
  if (player instanceof Dealer) {
    const dealerHandValue = Array.from(document.getElementsByClassName('dealer-hand-value'))[0];
    dealerHandValue.innerHTML = player.hand.value;
    dealerHandValue.style.display = 'initial';
  } else {
    let playerHandValue = document.getElementById(`player-hand-value-${player.currentHandIndex}`);
    if (!playerHandValue) {
      playerHandValue = document.createElement('div');
      playerHandValue.className = 'player-hand-value hand-value';
      playerHandValue.id = `player-hand-value-${player.currentHandIndex}`;
    }
    playerHandValue.innerHTML = player.currentHand.value;
    playerHandValue.style.border = '1px solid white';
    document.getElementById(`player-card-container-${player.currentHandIndex}`).appendChild(playerHandValue);
  }
};

export const renderHandValuesAfterSplit = hands => {
  const handContainers = Array.from(document.getElementsByClassName('player-card-container')).reverse();

  handContainers.forEach((hand, idx) => {
    let playerHandValue = document.createElement('div');
    playerHandValue.className = 'player-hand-value hand-value';
    playerHandValue.id = `player-hand-value-${idx}`;
    playerHandValue.innerHTML = hands[idx].value;
    hand.appendChild(playerHandValue);
  });
};

export const checkTurnStatus = async (game, player) => {
  const hand = game.player.currentHand;
  if (hand.isBusted()) {
    document.getElementById('basic-strategy-text').innerHTML = 'Waiting For Your Turn...';
    document.getElementById('basic-strategy').innerHTML = '';
    hand.busted = true;
    flashBustMessage();
    document.getElementById('action-buttons').style.display = 'none';
    await sleep(1000);
    document.getElementById(`player-bet-${player.currentHandIndex}`).style.color = 'red';
    document.getElementById(`player-hand-value-${player.currentHandIndex}`).style.color = 'red';
    flashPayout('dealer', hand.bet, '+');
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
  document.getElementById('basic-strategy-text').innerHTML = 'Waiting For Your Turn...';
  document.getElementById('basic-strategy').innerHTML = '';
  game.dealer.playTurn(game, game.shoe);
};

const resetRound = game => {
  game.player.hands = [new Hand];
  game.player.bet = 0;
  game.player.currentHandIndex = 0;
  game.player.currentHand = game.player.hands[game.player.currentHandIndex];
  game.player.isBusted = false;

  game.dealer.hand = new Hand;

  document.getElementById('message').innerHTML = '';
  document.getElementById('double-down-button').style.display = 'initial';
  document.getElementById('split-button').style.display = 'initial';
  document.getElementById('bet-button-title').style.display = 'block';
  document.getElementById('play-again-button').style.display = 'none';
  const playerBet = document.getElementById('player-bet');
  if (playerBet) {
    playerBet.remove();
  }

  Array.from(document.getElementsByClassName('alternate-bet-buttons')).forEach(button => button.style.display = 'none');
  document.getElementById('bet-buttons-container').style.display = 'initial';

  Array.from(document.getElementsByClassName('card-container')).forEach(cardContainer => {
    while (cardContainer.firstChild) {
      cardContainer.removeChild(cardContainer.firstChild);
    }
  });

  const playerCardArea = document.getElementById('player-card-area');
  while (playerCardArea.firstChild) {
    playerCardArea.removeChild(playerCardArea.firstChild);
  }

  document.getElementById('dealer-hand-value').innerHTML = null;
};

export const resetGame = game => {
  resetRound(game);
  game.dealer = new Dealer('Dealer');
  game.player = new Player('Player');
  game.shoe = new Shoe;
  game.count = 0;
  const count = game.countToString();
  const decks = Math.round(parseFloat(game.shoe.cards.length / 52));
  let trueCount = Math.round(parseFloat(count / decks));
  trueCount = trueCount > 0 ? `+${trueCount}` : trueCount;
  document.getElementById('count').innerHTML = `${count}`;
  document.getElementById('decks-remaining').innerHTML = `${decks}`;
  document.getElementById('true-count').innerHTML = `${trueCount}`;

  game.shoe.shuffle();
  renderBankrolls(game);
};

export const clearPlayerCards = () => {
  Array.from(document.getElementsByClassName('player-card-container')).forEach(cardContainer => {
    while (cardContainer.firstChild) {
      cardContainer.removeChild(cardContainer.firstChild);
    }
  });
};

export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

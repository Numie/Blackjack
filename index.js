const Shoe = require('./lib/shoe');
const Card = require('./lib/card');
const Player = require('./lib/player');
const Dealer = require('./lib/dealer');
const Hand = require('./lib/hand');
const Game = require('./lib/game');

window.addEventListener('load', () => {
  const game = new Game;
  game.shoe.shuffle();
  game.dealCards();

  document.getElementById('hitButton').addEventListener('click', () => {
    const card = game.player.hit(game.shoe);
    renderCard(card, game.player);
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

renderCard = (card, player) => {
  const playerCardArea = document.getElementById('player-card-container');
  playerCardArea.appendChild(createCard(card));
}

createCard = card => {
  const newCard = document.createElement('div');
  card.suit === 'h' || card.suit === 'd' ? newCard.className = 'card red-card' : newCard.className = 'card';

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
}

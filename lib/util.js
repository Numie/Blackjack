export const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const renderCard = (card, player) => { 
  if (player === 'player') {
    document.getElementById('player-card-container').appendChild(createCard(card));
  } else {
    document.getElementById('dealer-card-container').appendChild(createCard(card));
  }
};

const createCard = card => {
  const newCard = document.createElement('div');
  card.suit === 'h' || card.suit === 'd' ? newCard.className = 'card red-card' : newCard.className = 'card black-card';

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

const renderBet = game => {
  const playerBet = document.getElementById('player-bet');
  playerBet.innerHTML = `Bet: $${game.player.bet}`;
};

const requestBet = game => {
  document.getElementById('bet-buttons').style.display = 'initial';
};

export const startHand = game => {
  renderBet(game);
  renderBankrolls(game);
  game.dealCards();

  document.getElementById('bet-buttons').style.display = 'none';
  document.getElementById('action-buttons').style.display = 'initial';
};


export const playRound = game => {
  requestBet(game);
};

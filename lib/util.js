export const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const renderCard = (card, player) => {
  const playerCardArea = document.getElementById('player-card-container');
  const dealerCardArea = document.getElementById('dealer-card-container');

  if (player === 'player') {
    playerCardArea.appendChild(createCard(card));
  } else {
    dealerCardArea.appendChild(createCard(card));
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
  const playerBankroll = document.getElementById('player-bankroll');
  const dealerBankroll = document.getElementById('dealer-bankroll');
  playerBankroll.innerHTML = `Bankroll: $${game.player.bankroll}`;
  dealerBankroll.innerHTML = `Bankroll: $${game.dealer.bankroll}`;
};

export const receiveBet = () => {
  
};

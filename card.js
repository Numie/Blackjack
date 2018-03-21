const SUITS = {
  'h': 'h',
  'd': 'd',
  's': 's',
  'c': 'c'
};

const RANKS = {
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '10': '10',
  'J': '10',
  'Q': '10',
  'K': '10',
  'A': '11'
};


class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  };

  rank() {
    return this.rank;
  }

  value() {
    return parseInt(RANKS[this.rank]);
  }

  static suits() {
    return Object.keys(SUITS);
  }

  static ranks() {
    return Object.keys(RANKS);
  }

  static values() {
    return Object.values(RANKS);
  }
}


module.exports = Card;

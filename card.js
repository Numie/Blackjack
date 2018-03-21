const SUITS = {
  'h': 'h',
  'd': 'd',
  's': 's',
  'c': 'c'
};

const RANKS_VALUES = {
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
  'A': '1'
};


class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  };

  value() {
    return parseInt(this.value);
  }

  static suits() {
    Object.keys(SUITS)
  }

  static ranks() {
    Object.keys(RANKS)
  }

  static values() {
    Object.values(RANKS)
  }
}


module.exports = Card;

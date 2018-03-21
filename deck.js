const Card = require ('./card');

class Deck {
  constructor() {

  };

  static createShoe() {
    const deck = [];

    Card.ranks.forEach(ranks => {
      Card.suits.forEach(suit => {
        deck.push(new Card(rank, suit))
      });
    });

    return deck;
  }
}

module.exports = Deck;
